const Config = {
    // Base path for GitHub Pages
    basePath: '',

    // Sidebar grouping. Folders keep their real paths on disk; categories are a
    // display-only concern. Any folder not listed here falls into "More".
    categories: [
        { name: 'Languages & Frameworks', folders: ['java', 'javascript', 'node', 'python', 'react', 'spring', 'ballerina'] },
        { name: 'Algorithms & Data', folders: ['algorithms', 'data-structures', 'database'] },
        { name: 'System Design', folders: ['system-design', 'microservices', 'api', 'design-patterns', 'concurrency'] },
        { name: 'DevOps & Cloud', folders: ['cloud', 'devops', 'git', 'linux'] },
        { name: 'CS Fundamentals', folders: ['oop', 'networking', 'security', 'cryptography', 'ml'] },
        { name: 'Interview Prep', folders: ['interview-questions', 'hr', 'agile', 'testing', 'soft-skills'] }
    ],

    // Get file path with base path support
    getFilePath(folder, file) {
        const base = this.basePath ? `${this.basePath}/` : '';
        return `${base}${folder}/${file}`;
    },

    // Group the discovered folder keys into ordered categories. Only folders that
    // actually exist are included; unmapped folders are collected under "More".
    getCategorized(folderKeys) {
        const available = new Set(folderKeys);
        const grouped = [];

        for (const category of this.categories) {
            const folders = category.folders.filter(f => available.has(f));
            if (folders.length) {
                grouped.push({ name: category.name, folders });
                folders.forEach(f => available.delete(f));
            }
        }

        // Anything left over (e.g. a newly added folder) still shows up.
        const leftover = [...available].sort();
        if (leftover.length) {
            grouped.push({ name: 'More', folders: leftover });
        }

        return grouped;
    }
};

// Freeze config to prevent mutations
Object.freeze(Config);

export default Config;
