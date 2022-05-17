// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { default: axios } = require('axios');
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dummy users" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('dummy-users.dummyUsers', async function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const users = res.data.map((r)=>{
			return {
				label: r.title + " - "+ r.id,
				detail: r.title 
			}
		});
		console.log(users)
		const udata = await vscode.window.showQuickPick(users, {
			matchOnDetail: true
		})
		console.log(udata);
		
		vscode.window.showInformationMessage('Hello from dummy-users!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
