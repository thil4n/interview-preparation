#!/usr/bin/env node
/**
 * Build Script - Auto-discover folders and markdown files
 * Generates structure.json for the frontend to consume
 * 
 * Usage: node scripts/build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

// Folders to exclude
const EXCLUDED_FOLDERS = new Set([
    '.git', '.github', '.vscode', 'node_modules',
    'js', 'css', 'view', 'assets', 'dist', 'build', 'scripts'
]);

// Files to exclude from listing
const EXCLUDED_FILES = new Set([
    'README.md', 'README-NEW.md', 'LICENSE.md', 'CHANGELOG.md'
]);

function discoverFolders() {
    const structure = {};

    const items = fs.readdirSync(ROOT_DIR, { withFileTypes: true });

    for (const item of items) {
        if (!item.isDirectory()) continue;
        if (EXCLUDED_FOLDERS.has(item.name)) continue;
        if (item.name.startsWith('.')) continue;

        const folderPath = path.join(ROOT_DIR, item.name);
        const files = discoverMarkdownFiles(folderPath);

        if (files.length > 0) {
            structure[item.name] = files;
        }
    }

    // Also check for root-level markdown files in special folders
    const rootFiles = discoverMarkdownFiles(ROOT_DIR);
    if (rootFiles.length > 0) {
        // Group root markdown files under special category if needed
    }

    return structure;
}

function discoverMarkdownFiles(folderPath) {
    const files = [];

    try {
        const items = fs.readdirSync(folderPath, { withFileTypes: true });

        for (const item of items) {
            if (!item.isFile()) continue;
            if (!item.name.endsWith('.md')) continue;
            if (EXCLUDED_FILES.has(item.name)) continue;

            files.push(item.name);
        }
    } catch (error) {
        console.error(`Error reading ${folderPath}:`, error.message);
    }

    return files.sort();
}

function main() {
    console.log(' Discovering folders and markdown files...\n');

    const structure = discoverFolders();

    // Count totals
    const folderCount = Object.keys(structure).length;
    const fileCount = Object.values(structure).reduce((sum, files) => sum + files.length, 0);

    // Write structure.json
    const outputPath = path.join(ROOT_DIR, 'structure.json');
    fs.writeFileSync(outputPath, JSON.stringify(structure, null, 2));

    console.log(' Discovered folders:');
    for (const [folder, files] of Object.entries(structure).sort()) {
        console.log(`   ${folder}/ (${files.length} files)`);
    }

    console.log(`\n Generated structure.json`);
    console.log(`    ${folderCount} folders, ${fileCount} files total\n`);
}

main();
