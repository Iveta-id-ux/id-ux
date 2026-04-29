# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on `http://localhost:8080` (host `::`, HMR overlay disabled). The port may auto-bump to 8081/8082 if occupied.
- `npm run build` — production build
- `npm run build:dev` — build with Vite `development` mode (keeps `lovable-tagger` plugin active)
- `npm run preview` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm test` — Vitest single run
- `npm run test:watch` — Vitest watch mode
- Run a single test file: `npx vitest run src/path/to/file.test.ts`
- Filter by name: `npx vitest run -t "partial test name"`

There is no separate typecheck script; `npx tsc --noEmit` works.

## Architecture

Vite + React 18 + TypeScript + Tailwind + shadcn/ui (Radix primitives in `src/components/ui/`). MDX-backed content with Zod-validated frontmatter.

**Routing (`src/App.tsx`)** — `/` → `Index`, `/work` → `Work` index, `/work/:slug` → `CaseStudy`, `*` → `NotFound`. Catch-all stays last; the comment in the file marks the spot.

**Page composition**
- `Index` is not a "real" page; it stacks `Hero`, `Philosophy` (`id="about"`), `Contact` (`id="contact"`).
- `Work` is the case-studies index — header + filter pills + grid of `<CaseStudyCard />`. Filters are derived from the union of each case study's `taxonomy`, `scope.industry`, and `scope.role`. Filter selection is multi-select **OR** match, URL-synced via `useSearchParams` (`/work?filter=travel&filter=senior_ux`). Sort is `featured: true` first, then `order` ascending.
- `CaseStudy` resolves `:slug` via `getCaseStudy()` and falls through to `<NotFound />` on miss. Layout is `<CaseStudyLayout>` (top bar + header + grid shell with sticky left rail on desktop / `<details>` accordion on mobile, driven by `IntersectionObserver` reading `<h2>` IDs in the rendered MDX).

**Cross-page nav caveat** — `#about`/`#contact` anchors only work from `/`. Don't link to them from `/work` or `/work/[slug]` without a scroll-to-anchor handler on landing.

**MDX content pipeline (`vite.config.ts`)** — `@mdx-js/rollup` runs `enforce: "pre"` so it transforms `*.mdx` before the React SWC plugin. Remark plugins: `remark-frontmatter` + `remark-mdx-frontmatter` (frontmatter becomes a named export), `remark-gfm` (tables, strikethrough, autolinks). Rehype: `rehype-slug` (auto h2 IDs the left rail consumes).

**Content discovery (`src/content/case-studies.ts`)** — uses `import.meta.glob<{...}>("/content/case-studies/*.mdx", { eager: true })`. Each module's frontmatter is validated against the Zod schema in `src/content/types.ts`; failure throws on module load with the slug + the field that failed. The exported `caseStudies` array is sorted (featured → order); `caseStudiesBySlug` is a Map; `getCaseStudy(slug)` is the lookup. Adding a new case study is one MDX file — no manifest to edit.

**Frontmatter schema** — see `src/content/types.ts` (canonical) and `content/case-studies/SCHEMA.md` (human-readable). Fields the rest of the system depends on: `slug` (route), `status` (pill color), `case_study_number` (kicker), `hero_image` (with placeholder fallback), `scope.{role,industry,duration,year,team_size?}`, `stack[]`, `punchline` (sans-serif card paragraph), `metrics[]` (auto-hides when empty), `taxonomy[]` (filters), `order`, `featured`.

**Path aliases** — `@/` → `./src`, `@content/` → `./content`. Configured in `vite.config.ts`, `vitest.config.ts`, `tsconfig.app.json`, and (for `@/`) `components.json`. Use them consistently. Note that `import.meta.glob` paths must be string literals — pass the absolute path (`/content/case-studies/*.mdx`), not the alias.

**Design system (`src/index.css`)** — Dark theme via HSL CSS variables under `:root`. Color tokens: `--background` (`220 18% 8%` — slightly warm near-black), `--card`, `--accent` (cyan/teal), `--text-display/body/code`, `--muted-foreground`, `--terminal-green` (140°), `--terminal-yellow` (45°), `--terminal-purple` (270°). **Don't introduce new accent colors** — reuse the terminal-* tokens for emphasis. Custom utility classes: `.code-comment` (auto `// ` prefix), `.discipline-tag`, `.profile-frame`, `.glow-button`, `.cursor-blink`, `.text-link`, `.code-block`, `.section-divider`, `.divider-mono` (ASCII `─── // … ───────` bracket divider), `.case-study-prose` (h2 with `## ` pseudo-prefix, terminal-yellow blockquote bar, mono headings + sans body). Reuse before re-styling.

**Fonts** — Inter and JetBrains Mono, both loaded as **variable fonts** (full `wght` axis 100–900 / 100–800) via Google Fonts in `index.html`. Tailwind exposes them as `font-sans` / `font-mono`. Use `.text-mono-{light,regular,medium,bold,italic}` utilities (in `src/index.css`) when you want explicit `font-variation-settings` rather than Tailwind's `font-{weight}` classes — both work; the variation-settings form is preferred for the strong typographic moments (hero `text-mono-bold`, kicker `text-mono-italic`).

**Per-route document title/description** — `src/lib/useDocumentMeta.ts` is a tiny hook each page calls once. It updates `document.title` and the `<meta name="description">` tag. Base values in `index.html` are the `/` defaults; sub-routes override on mount.

**Site-wide chrome (mounted in `src/App.tsx`)**
- `<StatusBar />` — sticky 28px bar across all routes. Format: `// status: {status} · last_updated: {ISO} · location: {city}`. On `/work/:slug` the status segment morphs to `// section: {current h2}` driven by `useActiveSection()` (`src/lib/useActiveSection.ts`), the same hook the case-study left rail consumes.
- `<CommandPalette />` — global `⌘K` / `Ctrl+K` listener; `cmdk` via shadcn `CommandDialog`. Commands: navigate, open each case study by title, copy email, open LinkedIn, download CV. Theme toggle omitted (dark only).

**Site meta (`content/site-meta.ts`)** — single source of truth for `name`, `email`, `linkedin`, `location`, `productionUrl`, `copyrightYear`, `status`. Anything that needs Iveta's contact info imports from here, not inline strings. `__BUILD_DATE__` is a Vite-injected constant (declared in `src/types/build.d.ts`, set in `vite.config.ts` `define`); the StatusBar reads it for `last_updated`.

**View Transitions (`src/lib/navigateWithTransition.ts`, `src/components/TransitionLink.tsx`)** — `<TransitionLink>` is a `<Link>` drop-in that wraps the navigation in `document.startViewTransition` where supported. Currently applied only to `/work` ↔ `/work/[slug]` (CaseStudyCard, breadcrumb). Falls back to plain navigate on Firefox/Safari. CSS keyframes in `src/index.css` give a subtle crossfade; reduced-motion overrides them.

**Scroll-driven motion**
- `useCountUp(target, enabled)` (`src/lib/useCountUp.ts`) — RAF with easeOutCubic. Reduced-motion → return target immediately.
- `MetricsStrip` uses `framer-motion` `useInView({ once: true })` to flip enabled. The component parses the leading numeric portion of `value` (e.g. `"60K"` → animates to 60, reattaches `K`); strings without leading numerics render static.
- `<DecodingText>` (`src/components/DecodingText.tsx`) — one-shot character cycle on first paint. Uses `sessionStorage` (key per `cacheKey` prop) to skip replay on refocus / SPA back-nav. Reduced-motion → skip entirely. `aria-label` exposes the settled string.

**shadcn/ui** — components in `src/components/ui/`, configured via `components.json` (style: default, baseColor: slate, CSS variables enabled). `cmdk` `CommandDialog` is the basis for the command palette. Add new shadcn components via the CLI; don't hand-author them.

**Lovable integration** — this repo originated from Lovable. `vite.config.ts` conditionally loads `lovable-tagger` only in `development` mode (DOM data-attributes for the Lovable editor). Production builds exclude it. `src/components/tailwind.config.lov.json` is a Lovable artifact.

**Testing** — Vitest + jsdom + Testing Library. Globals on; no need to import `describe`/`it`/`expect`. Setup in `src/test/setup.ts` (jest-dom matchers). Test files: `src/**/*.{test,spec}.{ts,tsx}`.

**Animations** — `framer-motion` is used directly in section components for entry transitions; no shared animation utilities. Copy the local pattern when adding new sections.

## Editing-pass markers

The Amadeus All Fares case study at `content/case-studies/amadeus-all-fares.mdx` is a structured draft. Each section ends with `> // TODO: user to refine` — these render as visible terminal-yellow blockquotes on the page so the editing pass can't miss them. Don't strip them silently.

## Phased work

The portfolio is being rebuilt in seven phases per the plan at `/home/gokaroth/.claude/plans/nested-jingling-hanrahan.md`. The user pauses at each phase boundary for review. Don't roll forward without explicit go-ahead.
