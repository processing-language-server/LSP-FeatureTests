import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "processing-extension" is now active!');

	let disposable = vscode.commands.registerCommand('extension.processing', () => {
		// Test Pop-up
		vscode.window.showInformationMessage('Processing Language Server Activated.!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
