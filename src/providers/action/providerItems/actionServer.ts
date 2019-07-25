import * as vscode from 'vscode';
import { TreeObject } from '../../../Common/TreeObject';

export class ActionServer extends TreeObject{
	public itemType = "Server";
	
    constructor(
		readonly label: string,
		readonly authString: string,
		iconPath: string,
		readonly collapsibleState: vscode.TreeItemCollapsibleState,
		readonly command?: vscode.Command,
		children?: TreeObject[]
	) {
		super(label, iconPath, collapsibleState, "Server", command, label, authString, children);
	}

	get tooltip(): string {
		return this.label;
	}

	get description(): string {
		return this.label;
	}

	contextValue = 'Server';
}
