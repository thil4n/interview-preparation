import Config from './config.js';

class MarkdownService {
    constructor() {
        this.cache = new Map();
    }

    async fetchMarkdown(folder, file) {
        const cacheKey = `${folder}/${file}`;

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const filePath = Config.getFilePath(folder, file);

        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const markdown = await response.text();
            const html = this.parseMarkdown(markdown);

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

        // Configure marked for GitHub-style markdown
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });

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

const markdownService = new MarkdownService();
export default markdownService;
