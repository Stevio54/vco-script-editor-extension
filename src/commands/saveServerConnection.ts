import * as vscode from 'vscode';
import { Command } from './command';
import { Commands } from '../common/constants';
import { Encrypt } from '../Common/Encrypt';
import { TreeObject } from '../Common/TreeObject';
import { BehaviorSubject } from 'rxjs';
import _ = require('lodash');

export class SaveServerConnection extends Command {

    register(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<TreeObject>, vCenterRegistry: BehaviorSubject<any>): void {
        super.register(context, provider, vCenterRegistry);
    }

    get commandId(): string {
        return Commands.SaveServerConnection;
    }   

    async execute(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<TreeObject>, vCenterRegistry: BehaviorSubject<any>, input: any): Promise<void> {
        const _vc = context.globalState.get('_vc') as any[]; // pull existing list of _vc connections

        const itm = _.find(_vc, (itm: any) => {
            return itm.vc === input.label;
        });

        itm.save = true; // set to save
        input.isGlobal = true;

        // set the global state with item.
        context.globalState.update('_vc', _.filter(_vc, (item) => item.save ));
        vCenterRegistry.next(_vc);

        vscode.window.showInformationMessage(`You saved the connection: ${input.label} globally`);
    }


}