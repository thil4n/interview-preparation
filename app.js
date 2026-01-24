/* ============================================
   Interview Prep - Dynamic Markdown Application
   ============================================ */

// Configuration - Define all topic folders and their markdown files
const FOLDERS = {
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
};

// State management
let currentFolder = null;
let currentFile = null;
let searchQuery = '';

// DOM Elements
let sidebar, sidebarNav, contentContainer, searchInput, breadcrumb, mobileMenuBtn, sidebarOverlay;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initElements();
  renderSidebar();
  setupEventListeners();
  handleHashChange();
});

// Initialize DOM element references
function initElements() {
  sidebar = document.getElementById('sidebar');
  sidebarNav = document.getElementById('sidebar-nav');
  contentContainer = document.getElementById('content-container');
  searchInput = document.getElementById('search-input');
  breadcrumb = document.getElementById('breadcrumb');
  mobileMenuBtn = document.getElementById('mobile-menu-btn');
  sidebarOverlay = document.getElementById('sidebar-overlay');
}

// Render the sidebar navigation
function renderSidebar() {
  const folders = Object.keys(FOLDERS).sort();
  
  sidebarNav.innerHTML = folders.map(folder => {
    const files = FOLDERS[folder];
    const filteredFiles = filterFiles(files, searchQuery);
    
    if (searchQuery && filteredFiles.length === 0) return '';
    
    const isOpen = currentFolder === folder || searchQuery.length > 0;
    const displayFiles = searchQuery ? filteredFiles : files;
    
    return `
      <div class="nav-folder">
        <div class="folder-header ${isOpen ? 'open' : ''}" data-folder="${folder}">
          <span class="folder-icon">▶</span>
          <span class="folder-name">${formatFolderName(folder)}</span>
          <span class="folder-count">${files.length}</span>
        </div>
        <div class="folder-files ${isOpen ? 'open' : ''}">
          ${displayFiles.map(file => `
            <a href="#/${folder}/${file}" 
               class="file-link ${currentFolder === folder && currentFile === file ? 'active' : ''}" 
               data-folder="${folder}" 
               data-file="${file}">
              <span class="file-icon">📄</span>
              <span class="file-name">${formatFileName(file)}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// Format folder name for display
function formatFolderName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Format file name for display
function formatFileName(name) {
  return name
    .replace('.md', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Filter files based on search query
function filterFiles(files, query) {
  if (!query) return files;
  const lowerQuery = query.toLowerCase();
  return files.filter(file => 
    file.toLowerCase().includes(lowerQuery) ||
    formatFileName(file).toLowerCase().includes(lowerQuery)
  );
}

// Setup event listeners
function setupEventListeners() {
  // Folder toggle
  sidebarNav.addEventListener('click', (e) => {
    const folderHeader = e.target.closest('.folder-header');
    if (folderHeader) {
      const folder = folderHeader.dataset.folder;
      toggleFolder(folder);
    }
  });

  // Search
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderSidebar();
  });

  // Hash change (navigation)
  window.addEventListener('hashchange', handleHashChange);

  // Mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleMobileMenu);
  }

  // Refresh button
  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (currentFolder && currentFile) {
        loadMarkdownFile(currentFolder, currentFile);
      }
    });
  }
}

// Toggle folder open/close
function toggleFolder(folder) {
  const folderHeader = document.querySelector(`.folder-header[data-folder="${folder}"]`);
  const folderFiles = folderHeader.nextElementSibling;
  
  folderHeader.classList.toggle('open');
  folderFiles.classList.toggle('open');
}

// Handle URL hash changes
function handleHashChange() {
  const hash = window.location.hash.slice(1); // Remove the #
  
  if (!hash || hash === '/') {
    showWelcomeScreen();
    return;
  }
  
  const parts = hash.split('/').filter(p => p);
  if (parts.length >= 2) {
    const folder = parts[0];
    const file = parts.slice(1).join('/');
    
    if (FOLDERS[folder] && FOLDERS[folder].includes(file)) {
      currentFolder = folder;
      currentFile = file;
      loadMarkdownFile(folder, file);
      renderSidebar();
      
      // Ensure folder is open
      const folderHeader = document.querySelector(`.folder-header[data-folder="${folder}"]`);
      if (folderHeader && !folderHeader.classList.contains('open')) {
        folderHeader.classList.add('open');
        folderHeader.nextElementSibling.classList.add('open');
      }
    }
  }
}

// Show welcome screen
function showWelcomeScreen() {
  currentFolder = null;
  currentFile = null;
  breadcrumb.innerHTML = 'Home';
  
  contentContainer.innerHTML = `
    <div class="welcome-screen">
      <div class="welcome-icon">📚</div>
      <h2>Interview Preparation</h2>
      <p>Select a topic from the sidebar to start learning. Your knowledge base for acing technical interviews.</p>
    </div>
  `;
  
  renderSidebar();
}

// Load and render markdown file
async function loadMarkdownFile(folder, file) {
  // Show loading state
  contentContainer.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <span class="loading-text">Loading content...</span>
    </div>
  `;
  
  // Update breadcrumb
  breadcrumb.innerHTML = `
    <span>${formatFolderName(folder)}</span>
    <span>›</span>
    <span>${formatFileName(file)}</span>
  `;
  
  try {
    const response = await fetch(`${folder}/${file}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.status}`);
    }
    
    const markdownText = await response.text();
    const htmlContent = marked.parse(markdownText);
    
    contentContainer.innerHTML = `
      <div class="markdown-content">
        ${htmlContent}
      </div>
    `;
    
    // Apply syntax highlighting to code blocks
    document.querySelectorAll('.markdown-content pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
    
    // Close mobile menu if open
    if (sidebar.classList.contains('open')) {
      toggleMobileMenu();
    }
    
  } catch (error) {
    console.error('Error loading markdown:', error);
    contentContainer.innerHTML = `
      <div class="welcome-screen">
        <div class="welcome-icon">⚠️</div>
        <h2>Content Not Found</h2>
        <p>Unable to load ${file}. The file may not exist or there was a network error.</p>
      </div>
    `;
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('open');
}

// Configure marked.js options
if (typeof marked !== 'undefined') {
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
  });
}
