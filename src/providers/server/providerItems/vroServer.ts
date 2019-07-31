import * as vscode from 'vscode';
import { TreeObject } from '../../../Common/TreeObject';

export class VroServer extends TreeObject{
	public itemType = "Server";
	private _isGlobal = false;

    constructor(
		readonly label: string,
		readonly authString: string,
		iconPath: string,
		readonly collapsibleState: vscode.TreeItemCollapsibleState,
		readonly command?: vscode.Command,
		children?: TreeObject[],
		public global?: boolean,
		public port: number = 443
	) {
		super(label, iconPath, collapsibleState, "Server", command, label, authString, children);
		this.isGlobal = global;
	}

	get tooltip(): string {
		return this.label;
	}

	get description(): string {
		return `${this.label}:${this.port}`;
	}

	get isGlobal(): boolean {
		return this._isGlobal;
	}

	set isGlobal(isGlobal: boolean) {
		this._isGlobal = isGlobal;
		this.contextValue = `Server${this.isGlobal ? '-global' : ''}`;
	}
	
	contextValue = `Server${this.isGlobal ? '-global' : ''}`;
}
