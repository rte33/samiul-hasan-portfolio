<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Guidelines & AI Agent Rules

> [!CRITICAL]
> **STRICT THEME, COLOR & TYPOGRAPHY PRESERVATION RULE FOR ALL LLMs**:
> 1. **DO NOT ALTER THE THEME OR FONTS**: Never change, tweak, replace, or "redesign" the website's theme, color palette, design tokens (`--paper`, `--surface`, `--ink`, `--blueprint`, `--line`, `--border`, etc.), CSS styles, or font families (`IBM Plex Sans`, `IBM Plex Mono`) unless the user **specifically and explicitly** requests a theme or font change in their prompt.
> 2. **MANDATORY USER CONFIRMATION REQUIRED**: If the user does ask to change the website theme, color scheme, or typography, you MUST NOT apply the change immediately. You MUST first ask for explicit confirmation (e.g., *"Are you sure you want to change the website theme from Nordic Editorial? This will modify the visual identity across the entire site."*) and ONLY apply modifications once the user confirms with certainty.
> 3. **STRICT HARMONY FOR ANY NEW SECTION, BLOCK, OR ELEMENT**: Any new section, card, block, button, modal, or element added to the website MUST strictly follow the existing **Nordic Editorial** design system, color palette, and typography. Never introduce rogue hex colors, conflicting Tailwind color classes (e.g., arbitrary purples, yellows, or neon tints), or mismatched fonts. All new UI elements must use the established semantic tokens (`bg-card`, `panel`, `text-foreground`, `text-muted-foreground`, `font-sans`, `font-mono`, `border-border`).

---

## 1. Design System & Styling Guidelines

### Active Theme: Nordic Editorial
The site uses a clean, high-contrast, editorial engineering aesthetic with persistent Light/Dark support:

- **Light Mode (Default)**:
  - Drafting paper background: `var(--paper)` / `bg-background` (`oklch(0.985 0.004 247)` / `#f8fafc`)
  - Elevated surfaces / Cards: `var(--surface)` / `bg-card` / `panel` (`#ffffff` crisp white with frosted blur)
  - Primary text / Ink: `var(--ink)` / `text-foreground` (`oklch(0.14 0.005 285)` / `#09090b`)
  - Subtext & Muted: `var(--inksoft)` / `text-muted-foreground` (`oklch(0.55 0.025 257)` / `#64748b`)
  - Accent / Slate Blueprint: `var(--blueprint)` / `text-primary` (`oklch(0.18 0.02 260)` / `#0f172a`)
  - Borders: `var(--line)` / `border-border` (`oklch(0.91 0.008 247)` / `#e2e8f0`)

- **Dark Mode**:
  - Obsidian Zinc background: `var(--paper)` (`oklch(0.14 0.005 285)` / `#09090b`)
  - Elevated cards: `var(--surface)` / `bg-card` (`oklch(0.21 0.006 285)` / `#18181b`)
  - Pure white ink: `var(--ink)` (`oklch(0.985 0.002 247)` / `#fafafa`)
  - Secondary zinc text: `var(--inksoft)` (`oklch(0.72 0.01 260)` / `#a1a1aa`)
  - Accent Blueprint: `var(--blueprint)` (`oklch(0.78 0.14 235)` / `#38bdf8` electric cyan)

- **Typography**:
  - Headings & Prose: `font-sans` (`"IBM Plex Sans"`, system-ui, sans-serif)
  - Schematics, metadata, badges, dates, metrics: `font-mono` (`"IBM Plex Mono"`, monospace)

- **Component Standard**:
  - Standard cards: `panel p-5 md:p-6 border border-border/80 rounded-xl`
  - Subtle technical labels: `font-mono text-xs tracking-wider uppercase text-muted-foreground`
  - Section headings: `font-sans font-semibold tracking-tight text-foreground`

---

## 2. Cross-Screen & Responsive Design Rules

> [!IMPORTANT]
> **Cross-Screen Visual Consistency**: Whenever modifying any component, styling, or layout, ensure that the UI renders as intended across all screen viewports (mobile, tablet, desktop, ultra-wide) before completing any task.

1. **Flexbox & Column Layouts (`flex-col` / Mobile)**:
   - In flex column layouts (especially mobile viewports), child items default to `align-items: stretch`.
   - Never allow fixed-width cards, profile photos, or standalone badges to unintentionally stretch across the full screen.
   - Always apply `w-fit`, `self-start`, `self-center`, or explicit responsive container constraints (e.g., `w-fit`, `max-w-xs`, `sm:w-auto`) to prevent extra empty border boxes or broken padding.

2. **Mobile Viewport Check (< 640px)**:
   - Verify that elements do not cause horizontal scrolling (`overflow-x`).
   - Check that headers, titles, and buttons wrap naturally without clipping.
   - Keep touch targets accessible with appropriate touch padding.
   - On mobile, the hero portrait photo sits inline with the title/name in the header row (`lg:hidden`).

3. **Desktop & Wide Screen Check (≥ 1024px)**:
   - Ensure multi-column grids (`lg:grid-cols-3`, `lg:flex-row`) balance properly with the corresponding text blocks and whitespace.
   - Verify alignment relationships between text baselines, images, and action buttons.
   - The desktop portrait photo sits on the right (`hidden lg:block size-44`).

---

## 3. Content Architecture & Integrity

- **Theme Storage**: Theme selection uses a root `dark` class and the `portfolio-theme-v2` local-storage key so all routes share one persistent preference (defaults to light mode).
- **Content Separation**: All user content (biography, academics, projects, publications, updates) resides in `content/*.json`. Never hardcode user content in React TSX files if a JSON field exists or can be added to the schema.
- **Verification**: Run `npm run check` and `npm run build` after editing to ensure 0 lint or build regressions.
