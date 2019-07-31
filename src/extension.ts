'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Observable, BehaviorSubject } from 'rxjs';
import * as providers from './providers';
import { Encrypt } from './common/Encrypt';
import { AddServerConnection, RemoveServerConnection, OpenWorkflowScript, SaveServerConnection, OpenActionScript } from './commands';
import * as fs from 'fs';
import _ = require('lodash');
import { SelectActiveServer } from './commands/selectActiveServer';

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

    // folding observable
    let foldObs = new BehaviorSubject(null);

    // active server observable
    let activeObs = new BehaviorSubject(null);

    foldObs.subscribe((prov) => {
        if (prov) {
            vscode.languages.registerFoldingRangeProvider(prov.sel, prov.prov);
        }
    });


    let serverProvider = new providers.ServerSelectionProvider(context, vcObs);
    vscode.window.registerTreeDataProvider('vroServerSelection', serverProvider);

    let provider = new providers.WorkflowProvider(context, activeObs);
    vscode.window.registerTreeDataProvider('vroDeveloperview', provider);

    let actionProvider = new providers.ActionProvider(context, activeObs);
    vscode.window.registerTreeDataProvider('vroActionview', actionProvider);

    const addServerConnection = new AddServerConnection();
    addServerConnection.register(context, provider, vcObs);

    const openWorkflowScript = new OpenWorkflowScript();
    openWorkflowScript.register(context);

    const openActionScript = new OpenActionScript();
    openActionScript.register(context, foldObs);

    const removeServerConnection = new RemoveServerConnection();
    removeServerConnection.register(context, serverProvider, vcObs);

    const saveServerConnection = new SaveServerConnection();
    saveServerConnection.register(context, serverProvider, vcObs);

    const selectServer = new SelectActiveServer();
    selectServer.register(context, serverProvider, activeObs);
    
    const views = vscode.extensions.all;
    for(var v of views) {
        console.log(v.id);
    }
    //console.log(`views: ${views}`);
    //console.log(views);
}

// this method is called when your extension is deactivated
export function deactivate() {
}