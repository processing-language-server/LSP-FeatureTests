import * as vscode from 'vscode';
import { parse } from 'java-ast'

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "processing-extension" is now active!');

	const ast = parse(`class Sample{\nvoid setup() {\n} \n void draw() {\n}\n}`);

	let disposable = vscode.commands.registerCommand('extension.processing', () => {
		// Test pop-up
		vscode.window.showInformationMessage('Processing Language Server Activated.!');

		vscode.window.showInformationMessage(ast.toStringTree());

		// finds the starting index of `setup` in the abstract syntax tree
		vscode.window.showInformationMessage(ast.toStringTree().search('setup').toString());

		// returns 2nd children - here `setup`
		vscode.window.showInformationMessage(ast.getChild(0).text);

		// // returns total number of children - 0 to 11 -> 12
		vscode.window.showInformationMessage(ast.childCount.toString());

		// vscode.languages.registerDefinitionProvider(`plaintext`, new ProcessingDefinitionProvider())

		vscode.languages.registerReferenceProvider(`plaintext`, new ProcessingReferenceProvider())

		let uri = vscode.Uri.file(`/Users/furlenco/Documents/vscode-runtime/just.txt`);

		vscode.commands.executeCommand('editor.action.findReferences', uri, new vscode.Position(1,1));

	});

	context.subscriptions.push(disposable);
}

class ProcessingDefinitionProvider implements vscode.DefinitionProvider {
	provideDefinition(document: vscode.TextDocument, 
		position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition> {
		return new vscode.Location(document.uri, new vscode.Range(0,0,0,3))
	}
}

class ProcessingReferenceProvider implements vscode.ReferenceProvider {
	provideReferences(document: vscode.TextDocument, position: vscode.Position, context: vscode.ReferenceContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Location[]> {
		return [
			new vscode.Location(document.uri, new vscode.Range(0,0,0,3))
		]
	}
	
}

export function deactivate() {}
