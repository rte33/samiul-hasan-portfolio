# Updating Your Portfolio

This website uses a simple, structured JSON-based content system. You can update any text, education history, research publications, technical skills, case studies, or timeline milestones simply by editing files in the `content/` folder. You do not need to touch any React or TypeScript code.

---

## Quick Reference: Where Everything Lives

| Content Section | File to Edit | Key Fields |
| :--- | :--- | :--- |
| **Site SEO & Meta** | `content/portfolio.json` | `site.title`, `site.description`, `site.author` |
| **Hero & Profile** | `content/portfolio.json` | `profile.name`, `profile.tagline`, `profile.summary`, `profile.portrait`, `profile.cv` |
| **Education History** | `content/portfolio.json` | `academics` (list of degrees, institutions, and GPA) |
| **Technical Skills** | `content/portfolio.json` | `skills` (categories, tools, and methods) |
| **Publications** | `content/portfolio.json` | `publications` (papers, citations, venues), `coursework` |
| **Contact & Social** | `content/portfolio.json` | `contact.email`, `contact.links` |
| **Case Studies** | `content/projects.json` | `slug`, `title`, `summary`, `objectives`, `methods`, `results`, `tools` |
| **Updates Timeline** | `content/updates.json` | `now` (current focus), `entries` (dated milestones) |

---

## Standard Update Workflow

1. Open the relevant file in the `content/` folder (`portfolio.json`, `projects.json`, or `updates.json`) in your editor.
2. Edit the text between the quotation marks `""`.
3. Keep commas between list items and avoid leaving a trailing comma after the last item.
4. In your terminal, run:
   ```powershell
   npm run check
   ```
   *(This checks for syntax errors, missing required fields, broken file paths, and leftover `[placeholder]` tags).*
5. Preview your changes locally:
   ```powershell
   npm run dev
   ```
   *(Changes will hot-reload in your browser automatically at http://localhost:8080).*

---

## Replacing Files (CV, Portrait Photo, Images)

All downloadable files and images can be placed in the `public/` directory.

- **Replacing your CV**:
  1. Save your compiled CV PDF into the `public/` folder (for example, `public/CV_Samiul_Hasan.pdf`).
  2. In `content/portfolio.json`, update `profile.cv`:
     ```json
     "cv": "/CV_Samiul_Hasan.pdf"
     ```
- **Replacing your Portrait Photo**:
  1. Put your image in the `public/` folder (for example, `public/portrait.png`).
  2. In `content/portfolio.json`, update `profile.portrait`:
     ```json
     "portrait": "/portrait.png",
     "portraitAlt": "Portrait of Samiul Hasan"
     ```
- **Adding Project Images**:
  1. Put the image in `public/` or `src/assets/`.
  2. In `content/projects.json`, update the project's `"image"` attribute:
     - For images in `public/`: use `"/my-diagram.jpg"`.
     - Built-in bundle shortcuts: `"case-soc"`, `"case-rf"`, `"case-fault"`.

---

## Adding or Editing Sections

### 1. Education / Academics (`portfolio.json`)
Copy one object inside the `academics` array, paste it, and adjust:
```json
{
  "period": "2021 — 2024",
  "degree": "M.Eng., Electrical Engineering",
  "institution": "Aldermere Institute of Technology",
  "details": "Thesis: Adaptive MPPT control for heterogeneous solar arrays. GPA 3.9 / 4.0."
}
```

### 2. Technical Skills (`portfolio.json`)
Each item in `skills` contains a category name and a description string:
```json
{
  "category": "Hardware",
  "description": "PCB design (KiCad), FPGA (VHDL), power electronics, oscilloscope & VNA measurement."
}
```

### 3. Publications & Coursework (`portfolio.json`)
Add a publication object to `publications`:
```json
{
  "num": "[1]",
  "authors": "Okafor, D. R. & Lindqvist, M.",
  "year": "2024",
  "title": "Adaptive MPPT for Heterogeneous Solar Arrays",
  "venue": "J. of Power Systems, 41(3)",
  "url": "https://example.com/doi"
}
```
*Note: If `url` is empty `""`, the title will display as plain text.*

Update `coursework` with a summary of advanced courses taken:
```json
"coursework": "Advanced Control, Power Electronics, DSP, Electromagnetics, Embedded Systems."
```

### 4. Contact & Social Links (`portfolio.json`)
Update your contact email and social profiles:
```json
"contact": {
  "heading": "Contact",
  "description": "Available for research collaborations and full-time roles in power systems or embedded systems.",
  "email": "d.okafor@aldermere.edu",
  "links": [
    { "label": "GitHub", "url": "https://github.com/..." },
    { "label": "ORCID", "url": "https://orcid.org/..." },
    { "label": "LinkedIn", "url": "https://linkedin.com/in/..." }
  ]
}
```

---

## Case Studies (`content/projects.json`)

Each case study in `projects.json` generates its own dedicated URL at `/projects/<slug>`.

To add a new project, copy an existing entry:
```json
{
  "slug": "custom-embedded-sensing",
  "fig": "Fig. 04",
  "year": "2025",
  "title": "Substation Optical Current Sensing",
  "summary": "FPGA-based interferometric sensor with sub-microsecond latency.",
  "image": "case-rf",
  "caption": "Sensor PCB prototype and optical test setup.",
  "objectives": [
    "Design a low-latency digital signal processing pipeline on an FPGA.",
    "Achieve < 1 µs phase calculation under variable ambient temperature."
  ],
  "methods": [
    "Simulated optical fringe patterns in MATLAB.",
    "Wrote pipelined VHDL demodulator for Artix-7 FPGA."
  ],
  "results": [
    { "metric": "Latency", "value": "620 ns" },
    { "metric": "Resolution", "value": "14 bit" }
  ],
  "resultNotes": "Validated against laboratory current transformer standards.",
  "tools": ["VHDL", "Vivado", "MATLAB", "KiCad"]
}
```
*Note: If `projects.json` is set to an empty list `[]`, the Research & Projects section on the homepage will gracefully hide itself.*

---

## Activity Timeline (`content/updates.json`)

The updates page (`/updates`) and navigation link are generated from `content/updates.json`:

1. **`updated`**: Date you last updated the file (`YYYY-MM-DD`).
2. **`now`**: The "Currently" highlight box at the top of the timeline:
   ```json
   "now": {
     "date": "Now",
     "tag": "In progress",
     "title": "Grid-scale battery storage control — MSc thesis extension",
     "detail": "Refining the model-predictive control strategy for frequency regulation."
   }
   ```
3. **`entries`**: Chronological milestone log (newest items first):
   ```json
   {
     "date": "Sep 2026",
     "time": "14:00",
     "tag": "Publication",
     "title": "Submitted conference paper on embedded sensing latency",
     "detail": "Co-authored submission to IEEE Sensors on low-latency distributed sensing."
   }
   ```

---

## Content Checker (`npm run check`)

Run `npm run check` before deploying or pushing your changes. It automatically verifies:
- All 3 JSON files are valid and free of syntax errors.
- Required identity fields (`name`, `summary`, `cv`, `email`) are present.
- Files referenced in `public/` (like your CV and portrait) actually exist on disk.
- Project slugs are unique and URL-safe.
- Date formats match standard conventions.
- Unfilled `[placeholder]` markers are highlighted so you never publish draft notes by accident.
