
    
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { VroItem } from './Models/vroItem';
import * as rp from 'request-promise';
import * as _ from 'lodash';

export class VroProvider implements vscode.TreeDataProvider<VroItem> {
    
    constructor(private context: vscode.ExtensionContext) {
        
	}
    
    onDidChangeTreeData?: vscode.Event<any>;    
    
    private createDir = (dir) => {
        // This will create a dir given a path such as './folder/subfolder' 
        const splitPath = dir.split('/');
        splitPath.reduce((path, subPath) => {
          let currentPath;
          if(subPath !== '.'){
            currentPath = path + '/' + subPath;
            if (!fs.existsSync(currentPath)){
              fs.mkdirSync(currentPath);
            }
          }
          else{
            currentPath = subPath;
          }
          return currentPath;
        }, '');
    }
    openScript(scriptText: string, scriptName: string): void {
        let filePath = `${(this.context as any).globalStoragePath}/${scriptName}.js`;
        
        // create directory if not already there
        this.createDir(`${(this.context as any).globalStoragePath}/`);

        fs.writeFile(filePath, scriptText, (err: NodeJS.ErrnoException) => {
            vscode.workspace.openTextDocument(filePath).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        });
    }

    getTreeItem(element: any): vscode.TreeItem {
        return element;
    }
    getChildren(element?: any): vscode.ProviderResult<any[]> {
        // pull root if element not supplied, default option.
        let options = {
            method: "GET",
            uri: "https://skeleton.kpsc.io/vco/api/categories?categoryType=WorkflowCategory&isRoot=true",
            headers: {
              "User-Agent": "Request-Promise",
              "Authorization": "Basic c2Nhcm5lc0Brb3ZhcnVzLmNvbTpJbG92ZW15d2lmZTE5ODQ="
            },
            insecure: true,
            rejectUnauthorized: false,
            json: true
        };

        if (element && element.itemType !== "Workflow") {
            // one of the items was clicked
            options = {
                method: "GET",
                uri: `https://skeleton.kpsc.io/vco/api/categories/${element.Path}`,
                headers: {
                  "User-Agent": "Request-Promise",
                  "Authorization": "Basic c2Nhcm5lc0Brb3ZhcnVzLmNvbTpJbG92ZW15d2lmZTE5ODQ="
                },
                insecure: true,
                rejectUnauthorized: false,
                json: true
              };
        } else if(element && element.itemType === "Workflow") {
            // its a workflow
            options = {
                method: "GET",
                uri: `https://skeleton.kpsc.io/vco/api/workflows/${element.Path}/content`,
                headers: {
                  "User-Agent": "Request-Promise",
                  "Authorization": "Basic c2Nhcm5lc0Brb3ZhcnVzLmNvbTpJbG92ZW15d2lmZTE5ODQ="
                },
                insecure: true,
                rejectUnauthorized: false,
                json: true
              };
        }
        
        console.log(options);

          return new Promise((res, rej) => {
            rp(options).then(result => {
                let items = [];
                if (result.relations) {
                    // this is a sub child and not root
                    result.relations.link.forEach(element => {
                        if (element.rel !== "permissions") {
                            let id = _.find(element.attributes, y => y.name === "id").value;
                            let name = _.find(element.attributes, y => y.name === "name").value;
                            let _type = _.find(element.attributes, y => y.name === "type").value;
                            if (element.rel === "down") {
                                items.push(new VroItem(name, id, _type, null, (_type === "Workflow") ? this.context.asAbsolutePath("dep/layers.svg") : this.context.asAbsolutePath("dep/folder.svg"), vscode.TreeItemCollapsibleState.Collapsed));
                            }
                        }
                    });
                } else if (result['workflow-item']) {
                    // working with workflows
                    result['workflow-item'].forEach(element => {
                        if (element.type === "task" && element.script) {
                            items.push(new VroItem(element['display-name'], element.name, "task", element.script.value, this.context.asAbsolutePath("dep/file.svg"), vscode.TreeItemCollapsibleState.None, {
                                title: '',
                                command: 'vro.openScript',
                                arguments: [element.script.value, element['display-name']]
                            }));
                        }
                    });
                } else {
                    result.link.forEach(element => {
                        let id = _.find(element.attributes, y => y.name === "id").value;
                        let name = _.find(element.attributes, y => y.name === "name").value;
                        let _type = _.find(element.attributes, y => y.name === "type").value;
                        if (element.rel === "down") {
                            items.push(new VroItem(name, id, _type, null, (_type === "Workflow") ? this.context.asAbsolutePath("dep/layers.svg") : this.context.asAbsolutePath("dep/folder.svg"), vscode.TreeItemCollapsibleState.Collapsed));
                        }
                    });
                }
                res(items);
            }).catch(error => {
                console.log(element);
                res([]);
            });
          });
        
        // console.log(element);
        // let items = [];
        // items.push(new VroItem("Item 1", "Items\Item 1", vscode.TreeItemCollapsibleState.Collapsed));
        // items.push(new VroItem("Item 2", "Items\Item 2", vscode.TreeItemCollapsibleState.Collapsed));
        // return Promise.resolve(items);
    }

}