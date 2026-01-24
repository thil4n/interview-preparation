class StateManager {
    constructor() {
        this.state = {
            folders: {},
            currentFolder: null,
            currentFile: null,
            searchQuery: '',
            isLoading: false,
            error: null,
            theme: 'dark'
        };
        this.listeners = new Set();
    }

    getState() {
        return { ...this.state };
    }

    setState(updates) {
        const prevState = this.state;
        this.state = { ...this.state, ...updates };
        this.notifyListeners(prevState);
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    notifyListeners(prevState) {
        this.listeners.forEach(listener => {
            try {
                listener(this.state, prevState);
            } catch (error) {
                console.error('State listener error:', error);
            }
        });
    }

    // Selectors for specific state slices
    getCurrentPath() {
        const { currentFolder, currentFile } = this.state;
        return currentFolder && currentFile ? `${currentFolder}/${currentFile}` : null;
    }

    getFolders() {
        return this.state.folders;
    }

    isFileActive(folder, file) {
        return this.state.currentFolder === folder && this.state.currentFile === file;
    }
}

// Singleton instance
const stateManager = new StateManager();
export default stateManager;
