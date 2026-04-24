"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));

// src/AxonViewProvider.ts
var AxonViewProvider = class {
  constructor(_extensionUri) {
    this._extensionUri = _extensionUri;
  }
  _extensionUri;
  static viewType = "axon.mainView";
  _view;
  resolveWebviewView(webviewView, _context, _token) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }
  _getHtmlForWebview(_webview) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axon</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      color: var(--vscode-foreground);
      background-color: var(--vscode-sideBar-background);
    }

    .tab-bar {
      display: flex;
      border-bottom: 1px solid var(--vscode-panel-border, rgba(255,255,255,0.1));
    }

    .tab {
      flex: 1;
      padding: 8px 16px;
      text-align: center;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--vscode-tab-inactiveForeground, rgba(255,255,255,0.5));
      background-color: var(--vscode-tab-inactiveBackground, transparent);
      border-bottom: 2px solid transparent;
      transition: all 0.15s ease;
      user-select: none;
    }

    .tab:hover {
      color: var(--vscode-tab-activeForeground, rgba(255,255,255,0.8));
      background-color: var(--vscode-list-hoverBackground, rgba(255,255,255,0.05));
    }

    .tab.active {
      color: var(--vscode-tab-activeForeground, #ffffff);
      border-bottom-color: var(--vscode-focusBorder, #007acc);
      background-color: var(--vscode-tab-activeBackground, transparent);
    }

    .content {
      padding: 12px;
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    .placeholder {
      color: var(--vscode-descriptionForeground, rgba(255,255,255,0.4));
      text-align: center;
      padding: 24px 12px;
      font-size: 12px;
      line-height: 1.6;
    }

    .placeholder-icon {
      font-size: 32px;
      margin-bottom: 8px;
      opacity: 0.5;
    }
  </style>
</head>
<body>
  <div class="tab-bar">
    <div class="tab active" data-tab="skills">Skills</div>
    <div class="tab" data-tab="agents">Agents</div>
  </div>

  <div class="content">
    <div id="skills-content" class="tab-content active">
      <div class="placeholder">
        <div class="placeholder-icon">\u26A1</div>
        <div>No skills yet.</div>
        <div>Skills will appear here when available.</div>
      </div>
    </div>

    <div id="agents-content" class="tab-content">
      <div class="placeholder">
        <div class="placeholder-icon">\u{1F916}</div>
        <div>No agents yet.</div>
        <div>Agents will appear here when available.</div>
      </div>
    </div>
  </div>

  <script>
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const targetContent = document.getElementById(target + '-content');
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  </script>
</body>
</html>`;
  }
};

// src/extension.ts
function activate(context) {
  console.log('Congratulations, your extension "axon" is now active!');
  const axonViewProvider = new AxonViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(AxonViewProvider.viewType, axonViewProvider)
  );
  const disposable = vscode.commands.registerCommand("axon.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from axon!");
  });
  context.subscriptions.push(disposable);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
