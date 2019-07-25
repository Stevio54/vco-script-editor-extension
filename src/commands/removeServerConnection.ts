import * as vscode from 'vscode';
import { Command } from './command';
import { Commands } from '../common/constants';
import { TreeObject } from '../Common/TreeObject';
import { BehaviorSubject } from 'rxjs';
import _ = require('lodash');

export class RemoveServerConnection extends Command {

    register(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<TreeObject>, vCenterRegistry: BehaviorSubject<any>): void {
        super.register(context, provider, vCenterRegistry);
    }

    get commandId(): string {
        return Commands.RemoveServerConnection;
    }   

    async execute(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<TreeObject>, vCenterRegistry: BehaviorSubject<any>, input: any): Promise<void> {
        const _vc = context.globalState.get('_vc') as any[]; // pull existing list of _vc connections

        _.remove(_vc, (itm: any) => {
            return itm.vc === input.label;
        });

        context.globalState.update('_vc', _.filter(_vc, (item) => item.save ));
        vCenterRegistry.next(_vc);
    }


}