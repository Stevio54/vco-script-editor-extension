import * as vscode from 'vscode';

export class VroItem extends vscode.TreeItem {
    
    constructor(
		public readonly label: string,
		private Path: string,
		public itemType: string,
		public script: string,
		public iconPath: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}-${this.Path}`;
	}

	get description(): string {
		return this.Path;
	}

	contextValue = 'Workflow';
}
