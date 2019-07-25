/*!
 * Copyright 2019-2020 Steven Allen Carnes
 * SPDX-License-Identifier: MIT
 */

import * as vscode from 'vscode';
import * as _ from 'lodash';

export abstract class Command {
    register(context: vscode.ExtensionContext, ...args): void {
        // Logger.get("Command").debug(`Registering command '${this.commandId}'`)

        const disposable: vscode.Disposable = vscode.commands.registerCommand(this.commandId, (...a) =>
            this.execute(context, ...(args && a ? _.union(args, a) : args ? args : a)) // pass given registered args and new ones if provided
        );

        context.subscriptions.push(disposable);
    }

    abstract get commandId(): string

    abstract execute(context: vscode.ExtensionContext, ...args): Promise<void> | void;
}