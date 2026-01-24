const Config = {
    // Base path for GitHub Pages
    basePath: '',

    // Get file path with base path support
    getFilePath(folder, file) {
        const base = this.basePath ? `${this.basePath}/` : '';
        return `${base}${folder}/${file}`;
    }
};

// Freeze config to prevent mutations
Object.freeze(Config);

export default Config;
