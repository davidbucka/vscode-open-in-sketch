// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const open = require("open");
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "open-in-sketch" is now active!'
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "extension.openSketch",
        function() {
            // The code you place here will be executed every time your command is executed
            const allowedFileTypes = [
                "svg",
                "pdf",
                "eps",
                "jpg",
                "tiff",
                "webp"
            ];
            // Display a message box to the user
            const currentlyOpenTabfilePath =
                vscode.window.activeTextEditor.document.fileName;
            const fileType = currentlyOpenTabfilePath.split("/");
            const fileName = fileType[fileType.length - 1].split(".")[1];
            const allowed = allowedFileTypes.filter(type => type === fileName);

            console.log(fileName);
            if (allowed.length > 0) {
                vscode.window.showInformationMessage("Opening Sketch!");
                open(currentlyOpenTabfilePath, "sketch");
            } else {
                vscode.window.showInformationMessage(
                    "Sketch can't handle this file! :("
                );
            }
        }
    );

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
