# 📚 Interview Preparation

A modern, production-ready documentation website for technical interview preparation. Built with modular JavaScript architecture following SOLID principles.


![Interview Prep Website](https://img.shields.io/badge/Topics-29-blue) ![Files](https://img.shields.io/badge/Documents-73-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

- 📁 **Auto-Discovery** - Add folders and files, they appear automatically
- 🎨 **GitHub Theme** - Clean, professional dark/light mode
- 🔍 **Smart Search** - Filter topics with `⌘K` shortcut
- 📱 **Responsive** - Works on desktop and mobile
- ⚡ **Fast** - Static site with markdown caching

---

## 🚀 Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/PramithaMJ/interview-preparation.git
cd interview-preparation

# Start a local server (required for fetch API)
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

---

## 📝 Adding New Topics

### Step 1: Create a folder with markdown files

```bash
# Create a new topic folder
mkdir kubernetes

# Add markdown files
echo "# Kubernetes Basics

## What is Kubernetes?
Kubernetes is a container orchestration platform...

## Key Concepts
- Pods
- Services
- Deployments
" > kubernetes/basics.md
```

### Step 2: Run the build script

```bash
node scripts/build.js
```

This auto-discovers all folders and generates `structure.json`.

### Step 3: Commit and push

```bash
git add -A
git commit -m "Add kubernetes topic"
git push
```

GitHub Actions will automatically deploy your changes! 🎉

---

## 🌐 Deploying to GitHub Pages

### First-time Setup

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment", set **Source** to **GitHub Actions**
4. Wait ~1 minute for the first deployment

### Automatic Deployment

Every push to `main` branch triggers automatic deployment:

1. GitHub Actions runs `scripts/build.js` to discover folders
2. Uploads all files to GitHub Pages
3. Site is live at `https://<username>.github.io/interview-preparation/`

---

## 🏗️ Project Architecture

```
interview-preparation/
├── js/                    # Modular JavaScript (ES Modules)
│   ├── config.js         # App configuration
│   ├── state.js          # Pub/sub state management  
│   ├── discovery.js      # Auto-discover folders
│   ├── markdown.js       # Fetch & parse markdown
│   ├── router.js         # Hash-based navigation
│   ├── renderer.js       # DOM manipulation
│   ├── app.js            # Application controller
│   └── main.js           # Entry point
├── scripts/
│   └── build.js          # Auto-discovery build script
├── .github/workflows/
│   └── deploy.yml        # GitHub Actions deployment
├── index.html            # Main HTML
├── styles.css            # GitHub-inspired theme
└── structure.json        # Auto-generated structure
```

---

## 📂 Current Topics

| Category | Topics |
|----------|--------|
| **Languages** | Java, JavaScript, Python, Ballerina |
| **Frameworks** | Spring, React, Node |
| **Data** | Database, Data Structures, Algorithms |
| **System Design** | Microservices, Design Patterns, System Design |
| **DevOps** | Cloud, Docker, Git, DevOps, Linux |
| **Concepts** | OOP, Networking, Security, Cryptography |
| **Interview** | HR, Agile, Testing, Soft Skills |

---

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `node scripts/build.js` | Discover folders and generate structure.json |

---

## 📄 License

MIT License - feel free to use this for your own interview prep!
