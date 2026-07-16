# 📚 Interview Preparation

A clean, self-hosted documentation site for technical interview prep. Drop in markdown files, run one build step, and they show up automatically — organized, searchable, and readable in dark or light mode.

![Topics](https://img.shields.io/badge/Topics-29-blue) ![Documents](https://img.shields.io/badge/Documents-71-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

> Originally built while preparing for software engineering interviews, and shared to help others do the same.

---

## ✨ Features

- 📁 **Auto-discovery** — add a folder with markdown files, run the build, and it appears
- 🗂️ **Grouped navigation** — topics are organized into categories in the sidebar
- 🔍 **Instant search** — filter topics with the `⌘K` / `Ctrl+K` shortcut
- 🎨 **Dark / light theme** — GitHub-inspired, remembers your choice
- 📱 **Responsive** — works on desktop and mobile
- ⚡ **Static & fast** — no framework, no bundler; markdown is fetched and cached client-side

---

## 🚀 Quick Start

```bash
git clone https://github.com/thil4n/interview-preparation.git
cd interview-preparation

# A local server is required (the app fetches markdown via the Fetch API)
python3 -m http.server 8080

# then open http://localhost:8080
```

Opening `index.html` directly with `file://` will **not** work — browsers block `fetch` of local files. Always serve over HTTP.

---

## 📝 Adding New Topics

**1. Create a folder with markdown files**

```bash
mkdir kubernetes
echo "# Kubernetes Basics

## What is Kubernetes?
A container orchestration platform..." > kubernetes/basics.md
```

**2. Regenerate the structure index**

```bash
node scripts/build.js
```

This scans every topic folder and rewrites `structure.json` — the single source of truth the site reads.

**3. Commit and push**

```bash
git add -A
git commit -m "Add kubernetes topic"
git push
```

GitHub Actions rebuilds `structure.json` and redeploys automatically.

> **Tip:** to place a new folder under a specific sidebar category, add its name to the matching group in [`js/config.js`](js/config.js). Unlisted folders still appear automatically under a **More** group.

---

## 🏗️ Architecture

A small, dependency-light ES-module app. Content lives in topic folders at the repo root; the app shell lives in `js/`.

```
interview-preparation/
├── index.html            # App shell (entry point)
├── styles.css            # GitHub-inspired theme (dark/light)
├── structure.json        # Auto-generated topic index (source of truth)
├── js/
│   ├── main.js           # Entry point
│   ├── app.js            # Application controller + events
│   ├── config.js         # Base path + sidebar category map
│   ├── state.js          # Pub/sub state store
│   ├── discovery.js      # Loads structure.json (with fallback)
│   ├── markdown.js       # Fetch + parse + cache markdown
│   ├── router.js         # Hash-based navigation (#/folder/file)
│   └── renderer.js       # DOM rendering (sidebar, content, welcome)
├── scripts/
│   └── build.js          # Discovers folders → writes structure.json
├── .github/workflows/
│   └── deploy.yml         # GitHub Pages deployment
└── <topic folders>/      # The actual content (java/, algorithms/, ...)
```

Third-party libraries ([marked](https://github.com/markedjs/marked) for markdown, [highlight.js](https://github.com/highlightjs/highlight.js) for code) are loaded from CDN with pinned versions.

---

## 🌐 Deploying to GitHub Pages

**First-time setup:** Repository → **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.

After that, every push to `main` runs `scripts/build.js` and publishes the site to
`https://<username>.github.io/interview-preparation/`.

---

## 📂 Topic Categories

| Category | Topics |
|----------|--------|
| **Languages & Frameworks** | Java, JavaScript, Node, Python, React, Spring, Ballerina |
| **Algorithms & Data** | Algorithms, Data Structures, Database |
| **System Design** | System Design, Microservices, API, Design Patterns, Concurrency |
| **DevOps & Cloud** | Cloud, DevOps, Git, Linux |
| **CS Fundamentals** | OOP, Networking, Security, Cryptography, Machine Learning |
| **Interview Prep** | Interview Questions, HR, Agile, Testing, Soft Skills |

---

## 🎯 Suggested Study Paths

- **Backend / SWE** — OOP → Data Structures → Algorithms → Databases → System Design → Microservices
- **Frontend** — JavaScript → React → Algorithms → OOP → frontend system design
- **DevOps / SRE** — System Design → Cloud → DevOps → Networking → Security
- **Everyone** — the **Interview Questions** bank collects real questions asked in past interviews; the **HR** and **Soft Skills** sections cover the behavioral round.

---

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `node scripts/build.js` | Discover topic folders and regenerate `structure.json` |

---

## 📄 License

MIT — feel free to use this for your own interview prep and to contribute improvements.
