
    
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ActionItem } from './providerItems/actionItem';
import * as rp from 'request-promise';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Encrypt } from '../../common/Encrypt';
import { UrlOptions, UriOptions } from 'request';
import { RequestOptions } from 'https';
import { TreeObject } from '../../common/TreeObject';
import { constants } from 'os';
import { Commands } from '../../common/constants';
import { VroServer } from '../server/providerItems/vroServer';
import { runInThisContext } from 'vm';

export class ActionProvider implements vscode.TreeDataProvider<TreeObject> {
    
    private vro_server: VroServer;

    private decryptAuth(authString: string) {
        return Encrypt.get('AS$%^&*&*', authString);
    }
    constructor(private context: vscode.ExtensionContext, public activeVCS: BehaviorSubject<any>) {
        this.activeVCS.subscribe((_vcs) => {
            if (_vcs) {
                this.vro_server = new VroServer(_vcs.vc, this.decryptAuth(_vcs.enc), this.context.asAbsolutePath("dep/server2.svg"), vscode.TreeItemCollapsibleState.Collapsed, null, null,_vcs.save, _vcs.port);
                this._onDidChangeTreeData.fire(null); // trigger update
            }
        });
	}
    
    private _onDidChangeTreeData: vscode.EventEmitter<TreeObject> = new vscode.EventEmitter<TreeObject>();

    onDidChangeTreeData?: vscode.Event<TreeObject> = this._onDidChangeTreeData.event; 

    getTreeItem(element: any): vscode.TreeItem {
        return element;
    }
    
    getChildren(element?: any): vscode.ProviderResult<any[]> {
            if (!element && this.vro_server) {
                element = this.vro_server;
            }  else if (!element && !this.vro_server) {
                return new Promise((res) => res([]));
            }

            // check to see if chilren are there first
            if (element.children) {
                return new Promise((res, rej) => {
                    return res(element.children);
                });
            }  else {
                let options = {};
                let serv = "";
                let auth = "";
                let port = 443;
                if (element && element.itemType === "ScriptModuleCategory") {
                    if (element.children) {
                        return new Promise((res, rej) => {
                            return res(element.children);
                        });
                    } 
                    // one of the items was clicked
                    serv = element.serverAddr;
                    auth = element.auth;
                    port = element.port;
                    options = {
                        method: "GET",
                        uri: `https://${serv}:${port}/vco/api/categories/${element.Path}`,
                        headers: {
                        "User-Agent": "Request-Promise",
                        "Authorization": `Basic ${auth}`
                        },
                        insecure: true,
                        rejectUnauthorized: false,
                        json: true
                    };
                } else {
                    // its a ActionServer item
                    serv = element.label;
                    auth = element.authString;
                    port = element.port;
                    options = {
                        method: "GET",
                        uri: `https://${serv}:${port}/vco/api/categories?categoryType=ScriptModuleCategory&isRoot=true`,
                        headers: {
                        "User-Agent": "Request-Promise",
                        "Authorization": `Basic ${auth}`
                        },
                        insecure: true,
                        rejectUnauthorized: false,
                        json: true
                    };
                }

                return new Promise((res, rej) => {
                    rp(<(UriOptions & rp.RequestPromiseOptions) | (UrlOptions & rp.RequestPromiseOptions)>options).then(result => {
                        let items = [];
                        if (result.relations && !result.script) {
                            // this is the list of actions
                            result.relations.link.forEach(element => {
                                if (element.rel !== "permissions") {
                                    let id = _.find(element.attributes, y => y.name === "id").value;
                                    let name = _.find(element.attributes, y => y.name === "name").value;
                                    let _type = _.find(element.attributes, y => y.name === "type").value;
                                    if (element.rel === "down") {
                                        items.push(new ActionItem(name, id, _type, null, this.context.asAbsolutePath("dep/file.svg"), vscode.TreeItemCollapsibleState.None, {
                                            title: '',
                                            command: 'vro.openAction',
                                            arguments: [id, serv, auth, port, this]
                                        }, serv, auth, port));
                                    }
                                }
                            });
                        }  else {
                            // always will be a module name
                            result.link.forEach(element => {
                                let id = _.find(element.attributes, y => y.name === "id").value;
                                let name = _.find(element.attributes, y => y.name === "name").value;
                                let _type = _.find(element.attributes, y => y.name === "type").value;
                                if (element.rel === "down") {
                                    items.push(new ActionItem(name, id, _type, null, this.context.asAbsolutePath("dep/folder.svg"), vscode.TreeItemCollapsibleState.Collapsed,null, serv, auth, port));
                                }
                            });
                        }
                        element.children = items;
                        res(items);
                    }).catch(error => {
                        element.children = [];
                        res([]);
                    });
                });
            }
            
    }

}