import * as vscode from 'vscode';
import { Command } from './command';
import { Commands } from '../common/constants';
import { Encrypt } from '../Common/Encrypt';
import { TreeObject } from '../Common/TreeObject';
import { BehaviorSubject } from 'rxjs';
import _ = require('lodash');

export class SelectActiveServer extends Command {

    register(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<TreeObject>, activeServer: BehaviorSubject<any>): void {
        super.register(context, provider, activeServer);
    }

    get commandId(): string {
        return Commands.SelectServer;
    }   

    async execute(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<TreeObject>, activeServer: BehaviorSubject<any>, ac: any): Promise<void> {
       activeServer.next(ac); // simply pass to observable to others can react.
    }


}