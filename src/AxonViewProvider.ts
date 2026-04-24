import * as vscode from 'vscode';

export class AxonViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'axon.mainView';
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(_webview: vscode.Webview): string {
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
        <div class="placeholder-icon">⚡</div>
        <div>No skills yet.</div>
        <div>Skills will appear here when available.</div>
      </div>
    </div>

    <div id="agents-content" class="tab-content">
      <div class="placeholder">
        <div class="placeholder-icon">🤖</div>
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
}