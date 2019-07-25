import * as vscode from 'vscode';
import { Command } from './command';
import { Commands } from '../common/constants';
import * as fs from 'fs';

export class OpenWorkflowScript extends Command {

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

    openScript(scriptText: string, scriptName: string, context: vscode.ExtensionContext): void {
        let filePath = `${(context as any).globalStoragePath}/${scriptName}.js`;
        
        // create directory if not already there
        this.createDir(`${(context as any).globalStoragePath}/`);

        fs.writeFile(filePath, scriptText, (err: NodeJS.ErrnoException) => {
            vscode.workspace.openTextDocument(filePath).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        });
    }

    get commandId(): string {
        return Commands.OpenWorkflowScript;
    }    
    
    execute(context: vscode.ExtensionContext, scriptText: string, scriptName: string): void | Promise<void> {
        this.openScript(scriptText, scriptName, context); // open the script via the provider code.
    }

}