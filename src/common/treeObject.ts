import * as vscode from 'vscode';

export class TreeObject extends vscode.TreeItem {
    
    constructor(
		public readonly label: string,
		public iconPath: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly itemType: string,
		public readonly command?: vscode.Command,
		public readonly serverAddr?: string,
		public readonly auth?: string,
		public children?: vscode.TreeItem[]
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}`;
	}

	get description(): string {
		return this.label;
	}

	contextValue = 'TreeItem';
}
