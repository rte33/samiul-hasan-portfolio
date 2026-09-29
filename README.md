# EEE Academic Portfolio — Samiul Hasan

A modern, accessible, high-aesthetic academic and engineering portfolio for an Electrical & Electronic Engineering graduate. Built with **TanStack Start**, **Vite**, **React 19**, and **Tailwind CSS**, styled with the **Nordic Editorial** design system, and powered by a clean JSON-based content architecture.

---

## 🎨 Design System & Theme Policy

The visual identity of this portfolio is governed by the **Nordic Editorial** theme:
- **Palette**: Clean titanium drafting paper canvas (`#f8fafc`), deep Nordic slate ink (`#09090b` / `#0f172a`), hairline borders (`#e2e8f0`), and frosted glass panels (`.panel`).
- **Typography**: `IBM Plex Sans` for narrative/headings and `IBM Plex Mono` for technical schematics, metrics, and tags.
- **Viewing Modes**: Persistent Light Mode (default) and Zinc Obsidian Dark Mode with electric cyan accents.

> [!CRITICAL]
> ### Rules for AI Assistants & LLMs
> 1. **Do Not Alter Theme or Typography**: Never modify or replace the website theme, color variables, CSS styles, or font families unless the user **specifically and explicitly** requests a theme change.
> 2. **Mandatory Confirmation**: Always ask for explicit confirmation (e.g., *"Are you sure you want to change the website theme from Nordic Editorial? This will modify the visual identity across the entire site."*) before executing any theme alterations.
> 3. **Strict Visual Conformance**: Any new section, block, card, or element added to the website must strictly adhere to the Nordic Editorial color tokens and IBM Plex typography.
> 4. **Cross-Screen Consistency**: Test all changes across mobile (< 640px) and desktop (≥ 1024px), avoiding horizontal overflow and unbounded flex stretching.

📖 **For full styling specifications and component recipes, read [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).**

---

## 📝 Content Editing

All site content is separated cleanly from presentation code. You do not need to touch React or TypeScript code to update your portfolio.

- **`content/portfolio.json`**: Profile, academics, technical skills, publications, coursework, focus areas, and contact links.
- **`content/projects.json`**: Dedicated engineering case studies with objectives, methods, quantitative results, and tools.
- **`content/updates.json`**: Current focus ("Now") and dated research/activity timeline.
- **`public/`**: CV PDF (`CV_Samiul_Hasan.pdf`), portrait image (`portrait.png`), institution crest (`iub-logo.png`), and custom assets.

📖 **For detailed, step-by-step editing instructions, please read [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).**

---

## 🚀 Quick Start & Verification

### 1. Check Content Validity
Before publishing or committing, run the built-in content checker:
```sh
npm run check
```
*Validates JSON syntax, required profile fields, and referenced assets in `public/`.*

### 2. Local Development
Start the local development server:
```sh
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) to preview changes in real time.

### 3. Production Build
```sh
npm run build
```
Generates optimized client assets, SSR bundles, and Nitro server output.
