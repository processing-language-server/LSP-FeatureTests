import * as vscode from 'vscode';
import { parse } from 'java-ast'

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "processing-extension" is now active!');

	const ast = parse(`void setup() {\n} \n void draw() {\n}`);

	let disposable = vscode.commands.registerCommand('extension.processing', () => {
		// Test pop-up
		vscode.window.showInformationMessage('Processing Language Server Activated.!');

		// finds the starting index of `setup` in the abstract syntax tree
		vscode.window.showInformationMessage(ast.toStringTree().search('setup').toString());

		// returns 2nd children - here `setup`
		vscode.window.showInformationMessage(ast.getChild(1).text);

		// returns total number of children - 0 to 11 -> 12
		vscode.window.showInformationMessage(ast.childCount.toString());
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}
