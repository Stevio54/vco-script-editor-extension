
    
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ActionItem } from './providerItems/actionItem';
import * as rp from 'request-promise';
import * as _ from 'lodash';
import { ActionServer } from './providerItems/actionServer';
import { BehaviorSubject } from 'rxjs';
import { Encrypt } from '../../common/Encrypt';
import { UrlOptions, UriOptions } from 'request';
import { RequestOptions } from 'https';
import { TreeObject } from '../../common/TreeObject';
import { constants } from 'os';
import { Commands } from '../../common/constants';

export class ActionProvider implements vscode.TreeDataProvider<TreeObject> {
    
    private vro_servers: ActionServer[] = [];

    private decryptAuth(authString: string) {
        return Encrypt.get('AS$%^&*&*', authString);
    }
    constructor(private context: vscode.ExtensionContext, private vcs: BehaviorSubject<any>) {
        this.vcs.subscribe((_vcs) => {
            for (var _vc of _vcs) {
                if (!_.find(this.vro_servers, (item) => {
                    return item.label === _vc.vc;
                })) {
                    this.vro_servers.push(new ActionServer(_vc.vc, this.decryptAuth(_vc.enc), this.context.asAbsolutePath("dep/server2.svg"), vscode.TreeItemCollapsibleState.Collapsed, null, null));
                }
            }

            // look for removals
            for (var _item of this.vro_servers) {
                if (!_.find(_vcs, (i) => {
                    return i.vc === _item.label;
                })) {
                    _.remove(this.vro_servers, (itm) => {
                        return itm.label === _item.label;
                    });
                }
            }

            this._onDidChangeTreeData.fire(null); // trigger update
        });
	}
    
    private _onDidChangeTreeData: vscode.EventEmitter<TreeObject> = new vscode.EventEmitter<TreeObject>();

    onDidChangeTreeData?: vscode.Event<TreeObject> = this._onDidChangeTreeData.event; 
    
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
            if (!element) {
                // this means initial load, so load the servers first
                return new Promise((res, rej) => {
                    return res(this.vro_servers);
                });
            } else {
                // check to see if chilren are there first
                if (element.children) {
                    return new Promise((res, rej) => {
                        return res(element.children);
                    });
                }  else {
                    let options = {};
                    let serv = "";
                    let auth = "";
                    if (element && element.itemType === "ScriptModuleCategory") {
                        if (element.children) {
                            return new Promise((res, rej) => {
                                return res(element.children);
                            });
                        } 
                        // one of the items was clicked
                        serv = element.serverAddr;
                        auth = element.auth;
                        options = {
                            method: "GET",
                            uri: `https://${serv}/vco/api/categories/${element.Path}`,
                            headers: {
                            "User-Agent": "Request-Promise",
                            "Authorization": `Basic ${auth}`
                            },
                            insecure: true,
                            rejectUnauthorized: false,
                            json: true
                        };
                    } else {
                        // its a ActionServer item
                        serv = element.label;
                        auth = element.authString;
                        options = {
                            method: "GET",
                            uri: `https://${serv}/vco/api/categories?categoryType=ScriptModuleCategory&isRoot=true`,
                            headers: {
                            "User-Agent": "Request-Promise",
                            "Authorization": `Basic ${auth}`
                            },
                            insecure: true,
                            rejectUnauthorized: false,
                            json: true
                        };
                    }

                    return new Promise((res, rej) => {
                        rp(<(UriOptions & rp.RequestPromiseOptions) | (UrlOptions & rp.RequestPromiseOptions)>options).then(result => {
                            let items = [];
                            if (result.relations && !result.script) {
                                // this is the list of actions
                                result.relations.link.forEach(element => {
                                    if (element.rel !== "permissions") {
                                        let id = _.find(element.attributes, y => y.name === "id").value;
                                        let name = _.find(element.attributes, y => y.name === "name").value;
                                        let _type = _.find(element.attributes, y => y.name === "type").value;
                                        if (element.rel === "down") {
                                            items.push(new ActionItem(name, id, _type, null, this.context.asAbsolutePath("dep/file.svg"), vscode.TreeItemCollapsibleState.None, {
                                                title: '',
                                                command: 'vro.openAction',
                                                arguments: [id, serv, auth, this]
                                            }, serv, auth));
                                        }
                                    }
                                });
                            }  else {
                                // always will be a module name
                                result.link.forEach(element => {
                                    let id = _.find(element.attributes, y => y.name === "id").value;
                                    let name = _.find(element.attributes, y => y.name === "name").value;
                                    let _type = _.find(element.attributes, y => y.name === "type").value;
                                    if (element.rel === "down") {
                                        items.push(new ActionItem(name, id, _type, null, this.context.asAbsolutePath("dep/folder.svg"), vscode.TreeItemCollapsibleState.Collapsed,null, serv, auth));
                                    }
                                });
                            }
                            element.children = items;
                            res(items);
                        }).catch(error => {
                            element.children = [];
                            res([]);
                        });
                    });
                }
                
            }
            
    }

}