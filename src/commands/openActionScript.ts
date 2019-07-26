import * as vscode from 'vscode';
import { Command } from './command';
import { Commands } from '../common/constants';
import * as fs from 'fs';
import { UrlOptions, UriOptions } from 'request';
import * as rp from 'request-promise';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

export class OpenActionScript extends Command {

    activeDocumentUri: any[] = [];

    register(context: vscode.ExtensionContext, foldingRegistry: BehaviorSubject<any>): void {
        super.register(context, foldingRegistry);
    }

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

    prepareFillerData(dataType: string) {
        const isArray = dataType.indexOf('Array') !== -1;
        dataType = dataType.replace(/Array\//gi, '');

        let ret = "";
        switch(dataType.toLowerCase()) {
            case 'string':
                ret = "''";
                break;
            case 'number':
                ret = "0";
                break;
            case 'boolean':
                ret = "false";
                break;
            case 'any':
                ret = "null";
                break;
            case 'regexp':
                ret = "//gim";
                break;
            case 'encryptedstring':
                ret = "''";
                break;
            case 'text':
                ret = "''";
                break;
            case 'path':
                ret = "''";
                break;
            case 'date':
                ret = "new Date()";
                break;
            default:
                ret = "{}";
                break;
        }

        if (isArray) {
            return `[${ret}]`;
        }

        return ret;
    }
    prependParams(scriptText: string, inputs: any[], foldingRegistry: BehaviorSubject<any>, scriptPath: string) : any {
        if (!inputs) {
            return { pre: '', updated: scriptText };
        }

        let prependedText = `//#region Inputs
/**********************************************
* DO NOT EDIT THIS SECTION
* THIS IS ONLY TO VISUALIZE THE INPUTS OF THIS ACTION
* MAKING CHANGES HERE WILL NOT BE SAVED
**********************************************/
`;

        for (var input of inputs) {
            if (input.description) {
                prependedText += `/*
* ${input.description}
*/
`;
            }
            
            prependedText += `const ${input.name} = ${this.prepareFillerData(input.type)}; // ${input.type}
`;
        }

        prependedText += `/**********************************************
* END OF READ-ONLY SECTION
**********************************************/
//#endregion

`;
        scriptText = prependedText + scriptText;
        // register a folding provider
        //foldingRegistry.next({ sel: { pattern: `${scriptPath}` }, prov: new InputsFoldingProvider(0, prependedText.split(/\r\n|\r|\n/).length) })
        return { pre: prependedText, updated: scriptText };
    }

    openScript(scriptText: string, scriptName: string, inputs: any[], context: vscode.ExtensionContext, foldingRegistry: BehaviorSubject<any>): void {
        let filePath = `${(context as any).globalStoragePath}/vro-code/actions/${scriptName}.js`;
        
        // create directory if not already there
        this.createDir(`${(context as any).globalStoragePath}/vro-code/actions/`);

        // get prepended text result with inputs if there  are any
        const prependResult = this.prependParams(scriptText, inputs, foldingRegistry, filePath);

        fs.writeFile(filePath, prependResult.updated, (err: NodeJS.ErrnoException) => {
            vscode.workspace.openTextDocument(filePath).then(doc => {
                vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside).then((editor) => {
                    if(prependResult.pre !== '') {
                         // set the range object of the prepend
                        const preAnchor = new vscode.Position(0, 0);
                        let preActive = new vscode.Position(0, 0);
                        preActive = new vscode.Position(prependResult.pre.split(/\r\n|\r|\n/).length - 1, prependResult.pre.split(/\r\n|\r|\n/).reverse()[1].length);
                        let preRange = new vscode.Range(preAnchor, preActive);

                        // set the selection to the input to fold
                        editor.selection = new vscode.Selection(preAnchor, preActive);
    
                        // fold the selection
                        vscode.commands.executeCommand("editor.fold");
    
                        // reset selection
                        editor.selection = new vscode.Selection(0,0,0,0);

                        this.activeDocumentUri.push({
                            uri: doc.uri.path,
                            preRange: preRange
                        });
                    }
                });
                
                vscode.workspace.onDidSaveTextDocument((e: vscode.TextDocument) => {
                    vscode.window.showInputBox({
                        value: "Yes",
                        placeHolder: "Choose yes or no",
                        prompt: "Do you want to send changes to the server?"
                    }).then((choice: string) => {
                        vscode.window.showInformationMessage(`You chose: ${choice}`);
                    });
                });
            });
        });
    }

    get commandId(): string {
        return Commands.OpenActionScript;
    }    
    
    execute(context: vscode.ExtensionContext, foldingRegistry: BehaviorSubject<any>, scriptId: string, scriptServer: string, scriptAuth: string): void | Promise<void> {
        const options = {
            method: "GET",
            uri: `https://${scriptServer}/vco/api/actions/${scriptId}`,
            headers: {
            "User-Agent": "Request-Promise",
            "Authorization": `Basic ${scriptAuth}`
            },
            insecure: true,
            rejectUnauthorized: false,
            json: true
        };

        rp(<(UriOptions & rp.RequestPromiseOptions) | (UrlOptions & rp.RequestPromiseOptions)>options).then(result => {
            // working with Actions
            // in this case, we just need to execute the openScript command with the needed parameters
            this.openScript(result.script, result.name, result['input-parameters'], context, foldingRegistry);
            // set so you cannot edit the inputs
            vscode.workspace.onDidChangeTextDocument(function (e: vscode.TextDocumentChangeEvent) {
                // look for active document
                const found = _.find(this.activeDocumentUri, (itm) => itm.uri === e.document.uri.path);
                if (found) {
                    if ((this as any).pre !== '') {
                        for(var change of e.contentChanges) {
                            if (found.preRange.contains(change.range) || change.range.contains(found.preRange)) {
                                vscode.commands.executeCommand("undo"); // perform an undo
                                break;
                            }
                        }
                    }
                }
            }, this);

            vscode.workspace.onDidCloseTextDocument((e: vscode.TextDocument) => {
                // just remove the item if it is there
                _.remove(this.activeDocumentUri, (itm) => itm.uri === e.uri.path);
            });

        }).catch(error => {
            
        });
    }

}