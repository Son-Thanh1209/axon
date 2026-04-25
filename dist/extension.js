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
var vscode2 = __toESM(require("vscode"));

// src/AxonViewProvider.ts
var vscode = __toESM(require("vscode"));
var SKILLS = [
  { id: "algorithmic-art", name: "Algorithmic Art", description: "Generate algorithmic and generative art programmatically", icon: "\u{1F3A8}", url: "https://github.com/anthropics/skills/tree/main/skills/algorithmic-art" },
  { id: "brand-guidelines", name: "Brand Guidelines", description: "Create and enforce brand guidelines for projects", icon: "\u{1F4CB}", url: "https://github.com/anthropics/skills/tree/main/skills/brand-guidelines" },
  { id: "canvas-design", name: "Canvas Design", description: "Design interactive canvas-based visualizations", icon: "\u{1F58C}\uFE0F", url: "https://github.com/anthropics/skills/tree/main/skills/canvas-design" },
  { id: "claude-api", name: "Claude API", description: "Work with the Claude API across multiple languages", icon: "\u{1F916}", url: "https://github.com/anthropics/skills/tree/main/skills/claude-api" },
  { id: "doc-coauthoring", name: "Doc Coauthoring", description: "Collaborate on document writing and editing", icon: "\u{1F4DD}", url: "https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring" },
  { id: "docx", name: "DOCX", description: "Create and manipulate Word documents", icon: "\u{1F4C4}", url: "https://github.com/anthropics/skills/tree/main/skills/docx" },
  { id: "frontend-design", name: "Frontend Design", description: "Build beautiful and responsive frontend interfaces", icon: "\u{1F310}", url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design" },
  { id: "internal-comms", name: "Internal Comms", description: "Draft internal communications and announcements", icon: "\u{1F4AC}", url: "https://github.com/anthropics/skills/tree/main/skills/internal-comms" },
  { id: "mcp-builder", name: "MCP Builder", description: "Build Model Context Protocol servers and tools", icon: "\u{1F527}", url: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder" },
  { id: "pdf", name: "PDF", description: "Create and manipulate PDF documents", icon: "\u{1F4D1}", url: "https://github.com/anthropics/skills/tree/main/skills/pdf" },
  { id: "pptx", name: "PPTX", description: "Create and manipulate PowerPoint presentations", icon: "\u{1F4CA}", url: "https://github.com/anthropics/skills/tree/main/skills/pptx" },
  { id: "skill-creator", name: "Skill Creator", description: "Create new skills with proper structure and guidelines", icon: "\u26A1", url: "https://github.com/anthropics/skills/tree/main/skills/skill-creator" },
  { id: "slack-gif-creator", name: "Slack GIF Creator", description: "Create GIF animations for Slack communications", icon: "\u{1F3AC}", url: "https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator" },
  { id: "theme-factory", name: "Theme Factory", description: "Create and customize VS Code themes", icon: "\u{1F3AD}", url: "https://github.com/anthropics/skills/tree/main/skills/theme-factory" },
  { id: "web-artifacts-builder", name: "Web Artifacts Builder", description: "Build interactive web artifacts and components", icon: "\u{1F3D7}\uFE0F", url: "https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder" },
  { id: "webapp-testing", name: "Webapp Testing", description: "Test web applications with automated strategies", icon: "\u{1F9EA}", url: "https://github.com/anthropics/skills/tree/main/skills/webapp-testing" },
  { id: "xlsx", name: "XLSX", description: "Create and manipulate Excel spreadsheets", icon: "\u{1F4C8}", url: "https://github.com/anthropics/skills/tree/main/skills/xlsx" }
];
var AxonViewProvider = class {
  constructor(_extensionUri) {
    this._extensionUri = _extensionUri;
  }
  _extensionUri;
  static viewType = "axonSidebar";
  _view;
  resolveWebviewView(webviewView, _context, _token) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };
    webviewView.webview.html = this._getHtmlForWebview();
    webviewView.webview.onDidReceiveMessage(
      (message) => {
        if (message.command === "openLink") {
          vscode.env.openExternal(vscode.Uri.parse(message.url));
        }
      }
    );
  }
  _getHtmlForWebview() {
    const skillsJson = JSON.stringify(SKILLS);
    let cardsHtml = "";
    for (const s of SKILLS) {
      cardsHtml += '<div class="skill-card" data-url="' + s.url + '"><div class="skill-icon">' + s.icon + '</div><div class="skill-info"><div class="skill-name">' + s.name + '</div><div class="skill-description">' + s.description + "</div></div></div>";
    }
    const htmlParts = [
      "<!DOCTYPE html>",
      '<html lang="en">',
      "<head>",
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';">`,
      "<title>Axon</title>",
      "<style>",
      "* { margin: 0; padding: 0; box-sizing: border-box; }",
      "body { font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, sans-serif); font-size: var(--vscode-font-size, 13px); color: var(--vscode-foreground); background-color: var(--vscode-sideBar-background); height: 100vh; display: flex; flex-direction: column; overflow: hidden; }",
      ".tab-bar { display: flex; border-bottom: 1px solid var(--vscode-panel-border, rgba(255,255,255,0.1)); flex-shrink: 0; }",
      ".tab { flex: 1; padding: 8px 0; text-align: center; cursor: pointer; font-size: 12px; font-weight: 500; color: var(--vscode-tab-inactiveForeground, rgba(255,255,255,0.5)); border-bottom: 2px solid transparent; transition: all 0.15s ease; user-select: none; }",
      ".tab:hover { color: var(--vscode-tab-activeForeground, rgba(255,255,255,0.8)); }",
      ".tab.active { color: var(--vscode-tab-activeForeground, #ffffff); border-bottom-color: var(--vscode-focusBorder, #007acc); }",
      ".content-area { flex: 1; overflow-y: auto; display: none; }",
      ".content-area.active { display: flex; flex-direction: column; }",
      ".search-bar { padding: 8px 12px; flex-shrink: 0; }",
      ".search-input { width: 100%; padding: 6px 8px; font-size: 12px; border: 1px solid var(--vscode-input-border, rgba(255,255,255,0.15)); background-color: var(--vscode-input-background, rgba(255,255,255,0.05)); color: var(--vscode-input-foreground, #cccccc); border-radius: 3px; outline: none; font-family: inherit; }",
      ".search-input:focus { border-color: var(--vscode-focusBorder, #007acc); }",
      ".search-input::placeholder { color: var(--vscode-input-placeholderForeground, rgba(255,255,255,0.3)); }",
      ".skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 4px 12px 12px; }",
      ".skill-card { background-color: var(--vscode-editorWidget-background, rgba(255,255,255,0.04)); border: 1px solid var(--vscode-panel-border, rgba(255,255,255,0.08)); border-radius: 6px; padding: 12px 8px; cursor: pointer; transition: all 0.15s ease; display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }",
      ".skill-card:hover { background-color: var(--vscode-list-hoverBackground, rgba(255,255,255,0.08)); border-color: var(--vscode-focusBorder, #007acc); }",
      ".skill-card.hidden { display: none; }",
      ".skill-icon { font-size: 24px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background-color: var(--vscode-editor-background, rgba(0,0,0,0.2)); border-radius: 8px; }",
      ".skill-info { width: 100%; min-width: 0; }",
      ".skill-name { font-size: 11px; font-weight: 600; color: var(--vscode-foreground, #e0e0e0); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }",
      ".skill-description { font-size: 9px; color: var(--vscode-descriptionForeground, rgba(255,255,255,0.5)); line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-top: 2px; }",
      ".no-results { text-align: center; padding: 32px 12px; color: var(--vscode-descriptionForeground, rgba(255,255,255,0.4)); font-size: 12px; display: none; }",
      ".skills-count { font-size: 10px; color: var(--vscode-descriptionForeground, rgba(255,255,255,0.4)); padding: 4px 12px; }",
      ".placeholder { color: var(--vscode-descriptionForeground, rgba(255,255,255,0.4)); text-align: center; padding: 32px 12px; font-size: 12px; line-height: 1.8; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }",
      ".placeholder-icon { font-size: 36px; margin-bottom: 8px; opacity: 0.5; }",
      ".placeholder-title { font-size: 14px; font-weight: 600; color: var(--vscode-foreground, rgba(255,255,255,0.8)); margin-bottom: 4px; }",
      "</style>",
      "</head>",
      "<body>",
      '<div class="tab-bar">',
      '<div class="tab active" data-tab="skills">Skills</div>',
      '<div class="tab" data-tab="agents">Agents</div>',
      "</div>",
      '<div id="skills-content" class="content-area active">',
      '<div class="search-bar">',
      '<input type="text" class="search-input" id="searchInput" placeholder="Search skills..." />',
      "</div>",
      '<div class="skills-count" id="skillsCount">17 skills available</div>',
      '<div class="skills-grid" id="skillsGrid">',
      cardsHtml,
      "</div>",
      '<div class="no-results" id="noResults">No skills found matching your search.</div>',
      "</div>",
      '<div id="agents-content" class="content-area">',
      '<div class="placeholder">',
      '<div class="placeholder-icon">&#x1F916;</div>',
      '<div class="placeholder-title">No agents yet</div>',
      "<div>Agents will appear here when available.</div>",
      "</div>",
      "</div>",
      "<script>",
      "var vscodeApi = acquireVsCodeApi();",
      "var allSkills = " + skillsJson + ";",
      'var skillsGrid = document.getElementById("skillsGrid");',
      'var searchInput = document.getElementById("searchInput");',
      'var skillsCount = document.getElementById("skillsCount");',
      'var noResults = document.getElementById("noResults");',
      'var allTabs = document.querySelectorAll(".tab");',
      'var allContents = document.querySelectorAll(".content-area");',
      "for (var i = 0; i < allTabs.length; i++) {",
      '  allTabs[i].addEventListener("click", function() {',
      '    var target = this.getAttribute("data-tab");',
      '    for (var j = 0; j < allTabs.length; j++) { allTabs[j].classList.remove("active"); }',
      '    for (var j = 0; j < allContents.length; j++) { allContents[j].classList.remove("active"); }',
      '    this.classList.add("active");',
      '    var el = document.getElementById(target + "-content");',
      '    if (el) { el.classList.add("active"); }',
      "  });",
      "}",
      'searchInput.addEventListener("input", function() {',
      "  var filter = this.value.toLowerCase();",
      '  var cards = skillsGrid.querySelectorAll(".skill-card");',
      "  var visible = 0;",
      "  for (var i = 0; i < cards.length; i++) {",
      "    var name = allSkills[i].name.toLowerCase();",
      "    var desc = allSkills[i].description.toLowerCase();",
      "    if (name.indexOf(filter) !== -1 || desc.indexOf(filter) !== -1) {",
      '      cards[i].classList.remove("hidden"); visible++;',
      '    } else { cards[i].classList.add("hidden"); }',
      "  }",
      '  skillsCount.textContent = visible + " skill" + (visible !== 1 ? "s" : "") + (filter ? " found" : " available");',
      '  noResults.style.display = visible === 0 ? "block" : "none";',
      '  skillsGrid.style.display = visible === 0 ? "none" : "grid";',
      "});",
      'var cards = skillsGrid.querySelectorAll(".skill-card");',
      "for (var i = 0; i < cards.length; i++) {",
      '  cards[i].addEventListener("click", function() {',
      '    var url = this.getAttribute("data-url");',
      '    if (url) { vscodeApi.postMessage({ command: "openLink", url: url }); }',
      "  });",
      "}",
      "</script>",
      "</body>",
      "</html>"
    ];
    return htmlParts.join("\n");
  }
};

// src/extension.ts
function activate(context) {
  const provider = new AxonViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode2.window.registerWebviewViewProvider(AxonViewProvider.viewType, provider)
  );
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
