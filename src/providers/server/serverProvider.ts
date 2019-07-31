
    
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as rp from 'request-promise';
import * as _ from 'lodash';
import { VroServer } from './providerItems/vroServer';
import { BehaviorSubject } from 'rxjs';
import { Encrypt } from '../../common/Encrypt';
import { UrlOptions, UriOptions } from 'request';
import { RequestOptions } from 'https';
import { TreeObject } from '../../common/TreeObject';
import { constants } from 'os';
import { Commands } from '../../common/constants';

export class ServerSelectionProvider implements vscode.TreeDataProvider<TreeObject> {
    
    private vro_servers: VroServer[] = [];

    private decryptAuth(authString: string) {
        return Encrypt.get('AS$%^&*&*', authString);
    }
    constructor(private context: vscode.ExtensionContext, private vcs: BehaviorSubject<any>) {
        this.vcs.subscribe((_vcs) => {
            for (var _vc of _vcs) {
                if (!_.find(this.vro_servers, (item) => {
                    return item.label === _vc.vc;
                })) {
                    this.vro_servers.push(new VroServer(_vc.vc, this.decryptAuth(_vc.enc), this.context.asAbsolutePath("dep/server2.svg"), vscode.TreeItemCollapsibleState.None,{
                        title: '',
                        command: 'vro.selectServer',
                        arguments: [_vc, this]
                    }, null, _vc.save, _vc.port));
                }
            }

            // look for removals
            for (var _item of this.vro_servers) {
                if (!_.find(_vcs, (i) => {
                    return i.vc === _item.label;
                })) {
                    _.remove(this.vro_servers, (itm) => {
                        return itm.label === _item.label;
                    });
                }
            }

            this._onDidChangeTreeData.fire(null); // trigger update
        });
	}
    
    private _onDidChangeTreeData: vscode.EventEmitter<TreeObject> = new vscode.EventEmitter<TreeObject>();

    onDidChangeTreeData?: vscode.Event<TreeObject> = this._onDidChangeTreeData.event; 
    
    getTreeItem(element: any): vscode.TreeItem {
        return element;
    }
    
    getChildren(element?: any): vscode.ProviderResult<any[]> {
            if (!element) {
                // this means initial load, so load the servers first
                return new Promise((res, rej) => {
                    return res(this.vro_servers);
                });
            } 
            // there will be no other children, this is single pane of glass
            
    }

}