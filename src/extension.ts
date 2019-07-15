'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { VroProvider } from './vroProvider';
import { VroItem } from './Models/vroItem';
import * as ppr from 'paper';
import * as path from 'path';
import { fstat, readFileSync, readFile, readdir } from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: any) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vro-script-editor" is now active!');
    console.log(context.globalStoragePath);

    
    let provider = new VroProvider(context);
    vscode.window.registerTreeDataProvider('vroDeveloperview', provider);
    vscode.commands.registerCommand("vro.openScript", (scriptText: string, scriptName: string) => provider.openScript(scriptText, scriptName));
    vscode.workspace.onDidSaveTextDocument((e: vscode.TextDocument) => {
        vscode.window.showInputBox({
            value: "Yes",
            placeHolder: "Choose yes or no",
            prompt: "Do you want to send changes to the server?"
        }).then((choice: string) => {
            vscode.window.showInformationMessage(`You chose: ${choice}`);
        });
    });
    
}

// this method is called when your extension is deactivated
export function deactivate() {
}