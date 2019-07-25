import * as vscode from 'vscode';
import { TreeObject } from '../../../Common/TreeObject';

export class ActionItem extends TreeObject {
    
    constructor(
		readonly label: string,
		private Path: string,
		itemType: string,
		script: string,
		iconPath: string,
		readonly collapsibleState: vscode.TreeItemCollapsibleState,
		readonly command?: vscode.Command,
		readonly serverAddr?: string,
		readonly auth?: string,
		children?: ActionItem[]
	) {
		super(label, iconPath, collapsibleState, itemType, command, serverAddr, auth, children);
	}

	get tooltip(): string {
		return `${this.label}-${this.Path}`;
	}

	get description(): string {
		return this.Path;
	}

	contextValue = 'Workflow';
}
