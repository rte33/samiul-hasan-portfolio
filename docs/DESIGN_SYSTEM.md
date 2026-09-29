# Nordic Editorial — Design System & Engineering Guidelines

This document serves as the official design specification and rulebook for the **Nordic Editorial** portfolio theme. All developers, contributors, and AI assistants (LLMs) must strictly adhere to these guidelines to maintain visual coherence, high typography standards, and responsive integrity across all screen sizes.

---

## 1. Immutable Rules for AI Assistants (LLMs)

> [!CRITICAL]
> **RULE 1: STRICT PRESERVATION OF THEME, COLORS & TYPOGRAPHY**
> - **DO NOT CHANGE** the website theme, color palette, design tokens, CSS styling, or font families (`IBM Plex Sans` and `IBM Plex Mono`) unless the user **specifically and explicitly** requests a change in their prompt.
> - Defaulting to "redesigning" or "refreshing" the theme when asked to perform unrelated feature additions, content updates, or bug fixes is strictly prohibited.

> [!CRITICAL]
> **RULE 2: MANDATORY USER CONFIRMATION BEFORE THEME ALTERATIONS**
> - Even if the user asks to change or experiment with the website's theme, colors, or fonts, the agent **MUST NOT** apply changes immediately to production files.
> - The agent **MUST FIRST** explicitly ask for confirmation:
>   > *"Are you sure you want to change the website theme/color scheme from Nordic Editorial? This will modify the visual identity across the entire website."*
> - Only proceed if the user affirmatively confirms this intent.

> [!CRITICAL]
> **RULE 3: STRICT HARMONY FOR ANY NEW SECTION, BLOCK, OR ELEMENT**
> - Any new section, card, modal, badge, button, table, or block added to the website **MUST** strictly follow the existing **Nordic Editorial** theme tokens.
> - Never introduce arbitrary inline styles or conflicting Tailwind color utilities (e.g. `bg-purple-600`, `text-emerald-400`, `bg-amber-100`) unless explicitly designated as semantic status badges.
> - Always use the semantic CSS variables and design tokens documented below.

---

## 2. Color System & Semantic Tokens

The website implements an OKLCH-based color system with persistent Light and Dark viewing modes.

### Light Mode (Default Theme: Nordic Editorial)
| Token | CSS Variable | Value / Hex Equivalent | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Drafting Paper** | `--paper` / `--background` | `oklch(0.985 0.004 247)` (`#f8fafc`) | Canvas background |
| **Card Surface** | `--surface` / `--card` | `oklch(1 0 0)` (`#ffffff`) | Crisp white card surface |
| **Frosted Panel** | `.panel` utility | `color-mix(in oklab, var(--surface) 92%, transparent)` | Frosted glass card with 24px blur |
| **Primary Ink** | `--ink` / `--foreground` | `oklch(0.14 0.005 285)` (`#09090b`) | Main headings & body text |
| **Muted Ink** | `--inksoft` / `--muted-foreground` | `oklch(0.55 0.025 257)` (`#64748b`) | Subtitles, labels, descriptions |
| **Nordic Slate** | `--blueprint` / `--primary` | `oklch(0.18 0.02 260)` (`#0f172a`) | Primary accent & active badges |
| **Hairline Border** | `--line` / `--border` | `oklch(0.91 0.008 247)` (`#e2e8f0`) | Card borders, dividers, outlines |
| **Card Outline** | `--outline` | `oklch(0.14 0.005 285 / 8%)` | Subtle box-shadow ring |

### Dark Mode (Zinc Obsidian)
| Token | CSS Variable | Value / Hex Equivalent | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Obsidian Paper** | `--paper` / `--background` | `oklch(0.14 0.005 285)` (`#09090b`) | Deep zinc canvas |
| **Elevated Surface**| `--surface` / `--card` | `oklch(0.21 0.006 285)` (`#18181b`) | Elevated card background |
| **Primary Ink** | `--ink` / `--foreground` | `oklch(0.985 0.002 247)` (`#fafafa`) | High-contrast white text |
| **Muted Ink** | `--inksoft` / `--muted-foreground` | `oklch(0.72 0.01 260)` (`#a1a1aa`) | Zinc silver metadata text |
| **Electric Cyan** | `--blueprint` / `--primary` | `oklch(0.78 0.14 235)` (`#38bdf8`) | Technical cyan accent |
| **Subtle Border** | `--line` / `--border` | `oklch(1 0 0 / 10%)` | Dark mode translucent border |

---

## 3. Typography System

The portfolio uses an intentional pairing of two Google Fonts:

### 1. `IBM Plex Sans` (`font-sans`)
- **Usage**: Page titles, section headings, narrative paragraphs, biographies, and descriptions.
- **Classes**:
  - Main Hero Name: `font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-foreground`
  - Section Headings: `font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground`
  - Card Titles: `font-sans text-base sm:text-lg font-medium text-foreground`
  - Body Copy: `font-sans text-sm sm:text-base leading-relaxed text-muted-foreground`

### 2. `IBM Plex Mono` (`font-mono`)
- **Usage**: Technical schematics, figure labels (`FIG. 01 — RESEARCH`), dates, GPA metrics, skills, tags, button labels, and code.
- **Classes**:
  - Figure / Section Label: `font-mono text-xs uppercase tracking-wider text-muted-foreground`
  - Badges & Tags: `font-mono text-xs font-medium px-2 py-0.5 rounded-md`
  - Metrics / Numerical Data: `font-mono text-sm sm:text-base font-semibold text-foreground`

---

## 4. Reusable Component Recipes

When constructing any new UI component, section, or widget, compose with the following patterns:

### 1. Standard Content Card
```tsx
<div className="panel p-5 md:p-6 border border-border/80 rounded-xl space-y-4">
  <div className="flex items-center justify-between gap-3">
    <h3 className="font-sans text-lg font-semibold text-foreground">Card Title</h3>
    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Status Tag</span>
  </div>
  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
    Detailed content explaining the research, tool, or engineering methodology.
  </p>
</div>
```

### 2. Section Header
```tsx
<div className="space-y-1.5 mb-6">
  <div className="flex items-center gap-2">
    <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
      FIG. 0X — SECTION_NAME
    </span>
  </div>
  <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
    Section Title
  </h2>
  <p className="font-sans text-sm text-muted-foreground">
    Contextual subtext providing background or overview.
  </p>
</div>
```

### 3. Metric / Stat Card
```tsx
<div className="panel p-4 rounded-xl border border-border/80 flex flex-col gap-1">
  <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">Metric Label</span>
  <span className="font-mono text-xl sm:text-2xl font-semibold text-foreground">3.95 / 4.00</span>
  <span className="font-sans text-xs text-muted-foreground">Supporting context note</span>
</div>
```

### 4. Technical Badge / Pill
```tsx
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-muted/60 text-foreground border border-border/80">
  <span className="size-1.5 rounded-full bg-primary" />
  COMSOL Multiphysics
</span>
```

### 5. Primary Action Button
```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm">
  <Download className="size-4" />
  <span>Download CV</span>
</button>
```

---

## 5. Responsive Design Standards

Always test and verify layouts against these responsive breakpoints:

1. **Mobile Viewport (< 640px)**:
   - Elements must never trigger horizontal scrolling (`overflow-x: hidden`).
   - Cards, images, and badges inside `flex-col` must have `w-fit`, `self-start`, or container constraints to avoid stretching awkwardly across 100% width.
   - Profile photo on mobile must be rendered inline in the header row (`lg:hidden`).
2. **Tablet Viewport (640px - 1023px)**:
   - Use `grid grid-cols-1 sm:grid-cols-2` for balance.
3. **Desktop Viewport (≥ 1024px)**:
   - Desktop portrait photo is displayed on the right side of the hero row (`hidden lg:block size-44`).
   - Grid layouts expand to `md:grid-cols-2` or `lg:grid-cols-3`.

---

## 6. Pre-Commit Verification Checklist

Before finalizing any changes to code or components:
- [ ] No hardcoded foreign colors (use semantic classes: `text-foreground`, `bg-card`, `border-border`).
- [ ] No font alterations outside `font-sans` (IBM Plex Sans) and `font-mono` (IBM Plex Mono).
- [ ] Responsive check completed for mobile (< 640px) and desktop (≥ 1024px).
- [ ] `npm run check` runs cleanly with 0 errors.
- [ ] `npm run build` bundles successfully.
