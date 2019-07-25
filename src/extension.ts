'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Observable, BehaviorSubject } from 'rxjs';
import * as providers from './providers';
import { Encrypt } from './common/Encrypt';
import { AddServerConnection, RemoveServerConnection, OpenWorkflowScript } from './commands';
import * as fs from 'fs';
import _ = require('lodash');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: any) {
    // get the vrealize tools extension
    const ext: vscode.Extension<any> = vscode.extensions.getExtension('vmware-pscoe.vrealize-developer-tools');
    // active it so we can use its features
    ext.activate();

    // kick off hint collection
    vscode.commands.executeCommand('vrdev.triggerServerCollection');

     // get vcenters that were saved
    let _vc = context.globalState.get('_vc') || [];
    let vcObs = new BehaviorSubject(_vc);


    let provider = new providers.WorkflowProvider(context, vcObs);
    vscode.window.registerTreeDataProvider('vroDeveloperview', provider);

    const addServerConnection = new AddServerConnection();
    addServerConnection.register(context, provider, vcObs);

    const openWorkflowScript = new OpenWorkflowScript();
    openWorkflowScript.register(context);

    const removeServerConnection = new RemoveServerConnection();
    removeServerConnection.register(context, provider, vcObs);
    
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