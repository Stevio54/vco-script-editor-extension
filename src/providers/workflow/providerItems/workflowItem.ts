import * as vscode from 'vscode';
import { TreeObject } from '../../../common/TreeObject';

export class WorkflowItem extends TreeObject {
    
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
		readonly port?: number,
		children?: WorkflowItem[]
	) {
		super(label, iconPath, collapsibleState, itemType, command, serverAddr, auth, children);
	}

	get tooltip(): string {
		return `${this.label}-${this.Path}`;
	}

	get description(): string {
		return null; // don't need a description here
	}

	contextValue = 'Workflow';
}
