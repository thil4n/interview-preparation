import stateManager from './state.js';

class RouterService {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
    }

    handleRouteChange() {
        const hash = window.location.hash.slice(1);

        if (!hash || hash === '/') {
            stateManager.setState({
                currentFolder: null,
                currentFile: null
            });
            return;
        }

        const parts = hash.split('/').filter(p => p);
        if (parts.length >= 2) {
            const folder = parts[0];
            const file = parts.slice(1).join('/');
            const folders = stateManager.getFolders();

            if (folders[folder]) {
                stateManager.setState({
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

    getCurrentRoute() {
        return window.location.hash.slice(1);
    }
}

const router = new RouterService();
export default router;
