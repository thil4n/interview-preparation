import stateManager from './state.js';

class UIRenderer {
    constructor() {
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
            sidebarOverlay: document.getElementById('sidebar-overlay'),
            themeToggle: document.getElementById('theme-toggle')
        };
    }

    renderSidebar() {
        const state = stateManager.getState();
        const folders = Object.keys(state.folders).sort();

        this.elements.sidebarNav.innerHTML = folders.map(folder => {
            const files = state.folders[folder];
            const filteredFiles = this.filterFiles(files, state.searchQuery);

            if (state.searchQuery && filteredFiles.length === 0) return '';

            const isOpen = state.currentFolder === folder || state.searchQuery.length > 0;
            const displayFiles = state.searchQuery ? filteredFiles : files;

            return `
        <div class="nav-folder">
          <div class="folder-header ${isOpen ? 'open' : ''}" data-folder="${folder}">
            <svg class="folder-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
            <svg class="folder-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
            </svg>
            <span class="folder-name">${this.formatFolderName(folder)}</span>
            <span class="folder-count">${files.length}</span>
          </div>
          <div class="folder-files ${isOpen ? 'open' : ''}">
            ${displayFiles.map(file => `
              <a href="#/${folder}/${file}" 
                 class="file-link ${stateManager.isFileActive(folder, file) ? 'active' : ''}" 
                 data-folder="${folder}" 
                 data-file="${file}">
                <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
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
      <article class="markdown-content markdown-body">
        ${html}
      </article>
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
      <div class="error-screen">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h2>Content Not Found</h2>
        <p>${this.escapeHtml(message)}</p>
      </div>
    `;
    }

    renderWelcome() {
        const state = stateManager.getState();
        const totalFolders = Object.keys(state.folders).length;
        const totalFiles = Object.values(state.folders).reduce((sum, files) => sum + files.length, 0);

        this.elements.contentContainer.innerHTML = `
      <div class="welcome-screen">
        <div class="welcome-header">
          <svg class="welcome-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          <h1>Interview Preparation</h1>
          <p class="welcome-subtitle">Your comprehensive knowledge base for acing technical interviews</p>
        </div>
        
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">${totalFolders}</span>
            <span class="stat-label">Topics</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">${totalFiles}</span>
            <span class="stat-label">Documents</span>
          </div>
        </div>
        
        <p class="welcome-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Select a topic from the sidebar to start learning
        </p>
      </div>
    `;
    }

    updateBreadcrumb(folder, file) {
        if (!folder || !file) {
            this.elements.breadcrumb.innerHTML = `
        <a href="#/" class="breadcrumb-home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          Home
        </a>
      `;
            return;
        }

        this.elements.breadcrumb.innerHTML = `
      <a href="#/" class="breadcrumb-home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
      </a>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-folder">${this.formatFolderName(folder)}</span>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-file">${this.formatFileName(file)}</span>
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
        document.body.classList.toggle('sidebar-open');
    }

    closeMobileMenu() {
        this.elements.sidebar.classList.remove('open');
        this.elements.sidebarOverlay.classList.remove('open');
        document.body.classList.remove('sidebar-open');
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

const renderer = new UIRenderer();
export default renderer;
