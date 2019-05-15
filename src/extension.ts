'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { VroProvider } from './vroProvider';
import { VroItem } from './Models/vroItem';
import * as ppr from 'paper';
import * as path from 'path';
import { fstat, readFileSync, readFile } from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: any) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vro-script-editor" is now active!');
    console.log(context.globalStoragePath);

    
    let provider = new VroProvider(context);
    vscode.window.registerTreeDataProvider('vroDeveloperview', provider);
    vscode.commands.registerCommand("vro.openScript", (scriptText: string, scriptName: string) => provider.openScript(scriptText, scriptName));
    vscode.workspace.onDidSaveTextDocument((e: vscode.TextDocument) => {
        vscode.window.showInputBox({
            value: "Yes",
            placeHolder: "Choose yes or no",
            prompt: "Do you want to send changes to the server?"
        }).then((choice: string) => {
            vscode.window.showInformationMessage(`You chose: ${choice}`);
        });
    });
    vscode.commands.registerCommand("vro.canvas", () => {
        const panel = vscode.window.createWebviewPanel("Test", "Cat Coding", vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true
        });

        // Local path to main script run in the webview
        const scriptPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, 'src', 'main.js'));

        const scriptPathNodeJS = vscode.Uri.file(path.join(context.extensionPath, 'node_modules', 'paper', 'dist', 'paper-full.js'));

        const scriptMediaImage = vscode.Uri.file(path.join(context.extensionPath, 'media', 'icons', 'scriptable_task_white.svg'));

        const scriptData = vscode.Uri.file(path.join(context.extensionPath, 'media', 'task.js'));


        // And the uri we use to load this script in the webview
        const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
        const paperUri = scriptPathNodeJS.with({ scheme: 'vscode-resource' });
        const imageUri = scriptMediaImage.with({ scheme: 'vscode-resource' });
        const dataUri = scriptData.with({ scheme: 'vscode-resource' });

        panel.webview.html = `<html>
        <head>
            <title>Test Window</title>
        </head>
        <body style="width: 100%;">
            <div stye="width: 100%">
                Welcome! Gringo!
                <button onClick="sendMessage()" type="button">Click Here</button>
            </div>
            
            <div stye="width: 100%">
                <canvas style="border: 2px solid white;" id="myCanvas" resize></canvas>
            </div>
            
            <img src="${imageUri}" id="scrip" style="display: none;" />
            <script src="${dataUri}"></script>
            <script src="${scriptUri}"></script>
            <script src="${paperUri}"></script>
        </body>
        </html>`;

        console.log(panel.webview.html);

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'alert':
                    vscode.window.showInformationMessage(message.text);
                    return;
            }
        }, null, null);
        //console.log(cv);
        //const canvas = cv.createCanvas(200, 200);
    //     const ctx = canvas.getContext('2d');

    //     // Write "Awesome!"
    //     ctx.font = '30px Impact';
    //     ctx.rotate(0.1);
    //     ctx.fillText('Awesome!', 50, 100);

    //     // Draw line under text
    //     var text = ctx.measureText('Awesome!');
    //     ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    //     ctx.beginPath();
    //     ctx.lineTo(50, 102);
    //     ctx.lineTo(50 + text.width, 102);
    //     ctx.stroke();

    //     // Draw cat with lime helmet
    //     loadImage('examples/images/lime-cat.jpg').then((image) => {
    //     ctx.drawImage(image, 50, 0, 70, 70);

    //     console.log('<img src="' + canvas.toDataURL() + '" />');
    //     });
    });
    
}

// this method is called when your extension is deactivated
export function deactivate() {
}