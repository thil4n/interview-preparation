import stateManager from './state.js';
import markdownService from './markdown.js';
import renderer from './renderer.js';
import router from './router.js';
import folderDiscovery from './discovery.js';

class AppController {
    constructor() {
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;

        // Initialize renderer
        renderer.init();

        // Discover folders
        const folders = await folderDiscovery.discoverFolders();
        stateManager.setState({ folders });

        // Setup event listeners
        this.setupEventListeners();

        // Subscribe to state changes
        this.subscribeToStateChanges();

        // Initial render
        renderer.renderSidebar();

        // Handle initial route
        router.handleRouteChange();

        this.initialized = true;

        // Expose for debugging
        if (window.location.hostname === 'localhost') {
            window.__app = this;
            window.__state = stateManager;
        }
    }

    setupEventListeners() {
        // Folder toggle
        renderer.elements.sidebarNav.addEventListener('click', (e) => {
            const header = e.target.closest('.folder-header');
            if (header) {
                e.preventDefault();
                renderer.toggleFolder(header.dataset.folder);
            }
        });

        // Search input
        renderer.elements.searchInput.addEventListener('input', (e) => {
            stateManager.setState({ searchQuery: e.target.value });
            renderer.renderSidebar();
        });

        // Clear search on Escape
        renderer.elements.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.target.value = '';
                stateManager.setState({ searchQuery: '' });
                renderer.renderSidebar();
            }
        });

        // Mobile menu
        renderer.elements.mobileMenuBtn?.addEventListener('click', () => {
            renderer.toggleMobileMenu();
        });

        renderer.elements.sidebarOverlay?.addEventListener('click', () => {
            renderer.closeMobileMenu();
        });

        // Refresh button
        document.getElementById('refresh-btn')?.addEventListener('click', () => {
            this.refresh();
        });

        // File link clicks - close mobile menu
        renderer.elements.sidebarNav.addEventListener('click', (e) => {
            if (e.target.closest('.file-link')) {
                renderer.closeMobileMenu();
            }
        });

        // Theme toggle
        renderer.elements.themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search focus
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                renderer.elements.searchInput.focus();
            }
        });
    }

    subscribeToStateChanges() {
        stateManager.subscribe(async (state, prevState) => {
            // Only reload content if folder/file changed
            if (state.currentFolder !== prevState.currentFolder ||
                state.currentFile !== prevState.currentFile) {

                renderer.renderSidebar();
                renderer.updateBreadcrumb(state.currentFolder, state.currentFile);

                if (!state.currentFolder || !state.currentFile) {
                    renderer.renderWelcome();
                    return;
                }

                // Open the folder in sidebar
                renderer.openFolder(state.currentFolder);

                // Load content
                await this.loadContent(state.currentFolder, state.currentFile);
            }
        });
    }

    async loadContent(folder, file) {
        renderer.renderLoading();

        try {
            const html = await markdownService.fetchMarkdown(folder, file);
            renderer.renderContent(html);
        } catch (error) {
            renderer.renderError(error.message);
        }
    }

    async refresh() {
        const state = stateManager.getState();
        if (state.currentFolder && state.currentFile) {
            markdownService.invalidateCache(state.currentFolder, state.currentFile);
            await this.loadContent(state.currentFolder, state.currentFile);
        }
    }

    toggleTheme() {
        const state = stateManager.getState();
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        stateManager.setState({ theme: newTheme });
        localStorage.setItem('theme', newTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        stateManager.setState({ theme: savedTheme });
    }
}

const app = new AppController();
export default app;
