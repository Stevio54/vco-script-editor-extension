import * as vscode from 'vscode';
import { Command } from './command';
import { Commands } from '../common/constants';
import { Encrypt } from '../Common/Encrypt';
import { TreeObject } from '../Common/TreeObject';
import { BehaviorSubject } from 'rxjs';
import _ = require('lodash');

export class AddServerConnection extends Command {

    register(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<TreeObject>, vCenterRegistry: BehaviorSubject<any>): void {
        super.register(context, provider, vCenterRegistry);
    }

    get commandId(): string {
        return Commands.AddServerConnection;
    }   

    async execute(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<TreeObject>, vCenterRegistry: BehaviorSubject<any>): Promise<void> {
        const _vc = context.globalState.get('_vc') as any[]; // pull existing list of _vc connections
        
        const fqdn = await vscode.window.showInputBox({ ignoreFocusOut: true, prompt: "Enter Orchestrator FQDN/IP:" });

        if (fqdn) {
            const user = await vscode.window.showInputBox({ ignoreFocusOut: true, prompt: "Enter Username:"});

            if (user) {
                const pass = await vscode.window.showInputBox({ ignoreFocusOut: true, password: true, prompt: "Enter Password:"});

                if (pass) {
                    const port = await vscode.window.showInputBox({ ignoreFocusOut: true, prompt: "Enter Port:", value: '443' });

                    const YeorNe = await vscode.window.showQuickPick(['Yes', 'No'], { canPickMany: false, placeHolder: 'Save credentials?' });

                    // base64 encrypt auth string
                    const buffedAuth = (new Buffer(user + ":" + pass)).toString('base64');
                    // encrypt all with server
                    const encryPass = Encrypt.set('AS$%^&*&*', buffedAuth);

                    if (YeorNe === "Yes") {
                        _vc.push({ vc: fqdn, port: (port ? port : 443), enc: encryPass, save: true });
                        context.globalState.update('_vc', _.filter(_vc, (item) => item.save ));
                        vCenterRegistry.next(_vc);
                        vscode.window.showInformationMessage(`You saved the connection: ${fqdn}:${(port ? port : 443)} globally`);
                    } else {
                        _vc.push({ vc: fqdn, port: (port ? port : 443), enc: encryPass, save: false });
                        vCenterRegistry.next(_vc);
                        vscode.window.showInformationMessage(`You added the connection: ${fqdn}:${(port ? port : 443)} to your current session`);
                    }
                }
            }
        }
    }


}