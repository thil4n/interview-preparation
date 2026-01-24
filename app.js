/* ============================================
   Interview Prep - Production-Ready Application
   ============================================
   
   Architecture follows SOLID principles:
   - Single Responsibility: Each class/module has one job
   - Open/Closed: Easy to extend with new features
   - Liskov Substitution: Interchangeable components
   - Interface Segregation: Minimal dependencies
   - Dependency Inversion: High-level modules don't depend on low-level
*/

// ============================================
// Configuration Module (Single Responsibility)
// ============================================
const Config = {
  // Base path for GitHub Pages (empty for root, or '/repo-name' for project sites)
  basePath: '',

  // All topic folders with their markdown files
  folders: {
    'agile': ['questions.md'],
    'algorithms': ['coding-problems.md', 'complexity.md', 'questions.md', 'recursion.md', 'sorting.md'],
    'api': ['concepts.md', 'graphql.md', 'kafka.md', 'rest.md', 'soap.md', 'streaming.md'],
    'ballerina': ['questions.md'],
    'cloud': ['concepts.md', 'docker.md', 'kubernetes.md'],
    'concurrency': ['concepts.md'],
    'cryptography': ['concepts.md', 'rsa.md'],
    'data-structures': ['array.md', 'heap.md', 'stack.md'],
    'database': ['acid.md', 'concepts.md', 'indexing.md', 'normalization.md', 'nosql.md', 'scenario.md', 'sql.md'],
    'design-patterns': ['basics.md'],
    'devops': ['concepts.md', 'ci-cd.md', 'monitoring.md'],
    'git': ['basics.md', 'commands.md', 'advanced.md'],
    'hr': ['questions.md'],
    'java': ['java-collections-advanced.md', 'java-collections.md', 'java-data-types.md', 'java-exceptions.md', 'java-keywords.md', 'java-oop.md', 'java-strings.md', 'java-threading.md'],
    'javascript': ['questions.md'],
    'linux': ['questions.md'],
    'ml': ['concepts.md'],
    'networking': ['http.md', 'osi.md', 'ssh.md', 'ssl.md', 'tcp.md'],
    'node': ['questions.md'],
    'oop': ['abstraction.md', 'basics.md', 'encapsulation.md', 'inheritance.md', 'polymorphism.md'],
    'python': ['questions.md', 'advanced.md'],
    'react': ['react.md', 'hooks.md', 'state-management.md'],
    'security': ['concepts.md', 'owasp.md'],
    'spring': ['questions.md'],
    'system-design': ['concepts.md', 'patterns.md'],
    'testing': ['questions.md']
  },

  // Get file path with base path support
  getFilePath(folder, file) {
    return `${this.basePath}/${folder}/${file}`.replace(/^\/+/, '') || `${folder}/${file}`;
  }
};

// ============================================
// State Manager (Single Responsibility)
// ============================================
class StateManager {
  constructor() {
    this.state = {
      currentFolder: null,
      currentFile: null,
      searchQuery: '',
      isLoading: false,
      error: null
    };
    this.listeners = [];
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// ============================================
// Markdown Service (Single Responsibility)
// ============================================
class MarkdownService {
  constructor(config) {
    this.config = config;
    this.cache = new Map();
  }

  async fetchMarkdown(folder, file) {
    const cacheKey = `${folder}/${file}`;

    // Return cached content if available (can be disabled for dev)
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const filePath = this.config.getFilePath(folder, file);

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const markdown = await response.text();
      const html = this.parseMarkdown(markdown);

      // Cache the result
      this.cache.set(cacheKey, html);

      return html;
    } catch (error) {
      console.error(`Failed to fetch ${filePath}:`, error);
      throw new Error(`Unable to load ${file}. ${error.message}`);
    }
  }

  parseMarkdown(markdown) {
    if (typeof marked === 'undefined') {
      console.error('marked.js not loaded');
      return `<pre>${this.escapeHtml(markdown)}</pre>`;
    }
    return marked.parse(markdown);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  clearCache() {
    this.cache.clear();
  }

  invalidateCache(folder, file) {
    this.cache.delete(`${folder}/${file}`);
  }
}

// ============================================
// Router Service (Single Responsibility)
// ============================================
class RouterService {
  constructor(stateManager, config) {
    this.stateManager = stateManager;
    this.config = config;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRouteChange());
    // Handle initial route
    this.handleRouteChange();
  }

  handleRouteChange() {
    const hash = window.location.hash.slice(1); // Remove #

    if (!hash || hash === '/') {
      this.stateManager.setState({
        currentFolder: null,
        currentFile: null
      });
      return;
    }

    const parts = hash.split('/').filter(p => p);
    if (parts.length >= 2) {
      const folder = parts[0];
      const file = parts.slice(1).join('/');

      if (this.config.folders[folder]) {
        this.stateManager.setState({
          currentFolder: folder,
          currentFile: file
        });
      }
    }
  }

  navigate(folder, file) {
    window.location.hash = `#/${folder}/${file}`;
  }

  goHome() {
    window.location.hash = '#/';
  }
}

// ============================================
// UI Renderer (Single Responsibility)
// ============================================
class UIRenderer {
  constructor(stateManager, config) {
    this.stateManager = stateManager;
    this.config = config;
    this.elements = {};
  }

  init() {
    this.elements = {
      sidebar: document.getElementById('sidebar'),
      sidebarNav: document.getElementById('sidebar-nav'),
      contentContainer: document.getElementById('content-container'),
      searchInput: document.getElementById('search-input'),
      breadcrumb: document.getElementById('breadcrumb'),
      mobileMenuBtn: document.getElementById('mobile-menu-btn'),
      sidebarOverlay: document.getElementById('sidebar-overlay')
    };
  }

  renderSidebar() {
    const state = this.stateManager.getState();
    const folders = Object.keys(this.config.folders).sort();

    this.elements.sidebarNav.innerHTML = folders.map(folder => {
      const files = this.config.folders[folder];
      const filteredFiles = this.filterFiles(files, state.searchQuery);

      if (state.searchQuery && filteredFiles.length === 0) return '';

      const isOpen = state.currentFolder === folder || state.searchQuery.length > 0;
      const displayFiles = state.searchQuery ? filteredFiles : files;

      return `
        <div class="nav-folder">
          <div class="folder-header ${isOpen ? 'open' : ''}" data-folder="${folder}">
            <span class="folder-icon">▶</span>
            <span class="folder-name">${this.formatFolderName(folder)}</span>
            <span class="folder-count">${files.length}</span>
          </div>
          <div class="folder-files ${isOpen ? 'open' : ''}">
            ${displayFiles.map(file => `
              <a href="#/${folder}/${file}" 
                 class="file-link ${state.currentFolder === folder && state.currentFile === file ? 'active' : ''}" 
                 data-folder="${folder}" 
                 data-file="${file}">
                <span class="file-icon">📄</span>
                <span class="file-name">${this.formatFileName(file)}</span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  renderContent(html) {
    this.elements.contentContainer.innerHTML = `
      <div class="markdown-content">
        ${html}
      </div>
    `;
    this.highlightCode();
  }

  renderLoading() {
    this.elements.contentContainer.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
        <span class="loading-text">Loading content...</span>
      </div>
    `;
  }

  renderError(message) {
    this.elements.contentContainer.innerHTML = `
      <div class="welcome-screen">
        <div class="welcome-icon">⚠️</div>
        <h2>Content Not Found</h2>
        <p>${this.escapeHtml(message)}</p>
      </div>
    `;
  }

  renderWelcome() {
    this.elements.contentContainer.innerHTML = `
      <div class="welcome-screen">
        <div class="welcome-icon">📚</div>
        <h2>Interview Preparation</h2>
        <p>Select a topic from the sidebar to start learning. Your knowledge base for acing technical interviews.</p>
      </div>
    `;
  }

  updateBreadcrumb(folder, file) {
    if (!folder || !file) {
      this.elements.breadcrumb.innerHTML = 'Home';
      return;
    }

    this.elements.breadcrumb.innerHTML = `
      <span>${this.formatFolderName(folder)}</span>
      <span>›</span>
      <span>${this.formatFileName(file)}</span>
    `;
  }

  highlightCode() {
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('.markdown-content pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
  }

  toggleFolder(folder) {
    const header = document.querySelector(`.folder-header[data-folder="${folder}"]`);
    if (header) {
      header.classList.toggle('open');
      header.nextElementSibling.classList.toggle('open');
    }
  }

  openFolder(folder) {
    const header = document.querySelector(`.folder-header[data-folder="${folder}"]`);
    if (header && !header.classList.contains('open')) {
      header.classList.add('open');
      header.nextElementSibling.classList.add('open');
    }
  }

  toggleMobileMenu() {
    this.elements.sidebar.classList.toggle('open');
    this.elements.sidebarOverlay.classList.toggle('open');
  }

  closeMobileMenu() {
    this.elements.sidebar.classList.remove('open');
    this.elements.sidebarOverlay.classList.remove('open');
  }

  filterFiles(files, query) {
    if (!query) return files;
    const lowerQuery = query.toLowerCase();
    return files.filter(file =>
      file.toLowerCase().includes(lowerQuery) ||
      this.formatFileName(file).toLowerCase().includes(lowerQuery)
    );
  }

  formatFolderName(name) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  formatFileName(name) {
    return name
      .replace('.md', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// ============================================
// Application Controller (Dependency Inversion)
// ============================================
class AppController {
  constructor() {
    this.stateManager = new StateManager();
    this.markdownService = new MarkdownService(Config);
    this.renderer = new UIRenderer(this.stateManager, Config);
    this.router = new RouterService(this.stateManager, Config);
  }

  init() {
    this.renderer.init();
    this.setupEventListeners();
    this.subscribeToStateChanges();
    this.renderer.renderSidebar();

    // Configure marked.js
    if (typeof marked !== 'undefined') {
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
      });
    }
  }

  setupEventListeners() {
    // Folder toggle
    this.renderer.elements.sidebarNav.addEventListener('click', (e) => {
      const header = e.target.closest('.folder-header');
      if (header) {
        this.renderer.toggleFolder(header.dataset.folder);
      }
    });

    // Search input
    this.renderer.elements.searchInput.addEventListener('input', (e) => {
      this.stateManager.setState({ searchQuery: e.target.value });
      this.renderer.renderSidebar();
    });

    // Mobile menu
    this.renderer.elements.mobileMenuBtn?.addEventListener('click', () => {
      this.renderer.toggleMobileMenu();
    });

    this.renderer.elements.sidebarOverlay?.addEventListener('click', () => {
      this.renderer.closeMobileMenu();
    });

    // Refresh button
    document.getElementById('refresh-btn')?.addEventListener('click', () => {
      this.refresh();
    });

    // File link clicks - close mobile menu
    this.renderer.elements.sidebarNav.addEventListener('click', (e) => {
      if (e.target.closest('.file-link')) {
        this.renderer.closeMobileMenu();
      }
    });
  }

  subscribeToStateChanges() {
    this.stateManager.subscribe(async (state) => {
      const { currentFolder, currentFile } = state;

      this.renderer.renderSidebar();
      this.renderer.updateBreadcrumb(currentFolder, currentFile);

      if (!currentFolder || !currentFile) {
        this.renderer.renderWelcome();
        return;
      }

      // Open the folder in sidebar
      this.renderer.openFolder(currentFolder);

      // Load content
      await this.loadContent(currentFolder, currentFile);
    });
  }

  async loadContent(folder, file) {
    this.renderer.renderLoading();

    try {
      const html = await this.markdownService.fetchMarkdown(folder, file);
      this.renderer.renderContent(html);
    } catch (error) {
      this.renderer.renderError(error.message);
    }
  }

  async refresh() {
    const state = this.stateManager.getState();
    if (state.currentFolder && state.currentFile) {
      // Clear cache for this file and reload
      this.markdownService.invalidateCache(state.currentFolder, state.currentFile);
      await this.loadContent(state.currentFolder, state.currentFile);
    }
  }
}

// ============================================
// Initialize Application
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();

  // Expose for debugging in development
  if (window.location.hostname === 'localhost') {
    window.__app = app;
  }
});
