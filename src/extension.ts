import * as vscode from 'vscode';
import { parse } from 'java-ast'

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "processing-extension" is now active!');

	let disposable = vscode.commands.registerCommand('extension.processing', () => {
		// Test pop-up
		vscode.window.showInformationMessage('Processing Language Server Activated.!');

		const ast = parse(`void setup() {\n} \n void draw() {\n}`);
		// finds the starting index of `setup` in the abstract syntax tree
		vscode.window.showInformationMessage(ast.toStringTree().search('setup').toString());

	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}
