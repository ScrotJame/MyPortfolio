# Bilingual portfolio implementation plan

> **For agentic workers:** Use executing-plans to implement this plan task-by-task in this session. The user selected the empty directory D:\VIN.AI\MyPortfolio and approved publishing to GitHub Pages.

**Goal:** Build and publish the approved bilingual engineering portfolio.

**Architecture:** Static React application with typed bilingual data, local component state for project filtering, and shared persisted language/theme preferences. Native anchor navigation supports GitHub Pages without route rewrites.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, Lucide SVG icons, Vitest and React Testing Library.

**Spec:** ../specs/2026-10-15-portfolio-design.md

## Global Constraints

- Project directory: D:\VIN.AI\MyPortfolio.
- Default English, with complete Vietnamese translations and remembered language/theme.
- Match the supplied image's orange accent, spacious hierarchy, and light/dark themes.
- All professional claims derive from the supplied CV; use monogram and illustrative covers until genuine project imagery exists.
- Static hosting, no backend, no empty links or fabricated testimonials.
- Keyboard support, reduced motion, responsive 375/768/1440px layouts, correct asset paths under a Pages repository subpath.

## Task 1: Visitor interaction contract and setup

Files: package.json, vite.config.ts, tsconfig files, eslint.config.js, index.html, src/test/setup.ts, src/App.test.tsx.

- [x] Install runtime and development dependencies and commit the lockfile.
- [x] Run `npm test` against the blank App to observe expected failures for missing visitor behavior.
- [x] Implement preference state and document language/theme effects in src/hooks/usePreferences.ts.

The test contract uses real DOM interactions, for example:

```tsx
await user.click(screen.getByRole('button', { name: 'Tiếng Việt' }))
expect(document.documentElement.lang).toBe('vi')
expect(screen.getByRole('heading', { name: /Xây dựng trải nghiệm/ })).toBeVisible()
```

## Task 2: Complete the portfolio

Files: src/data/content.ts, src/data/projects.ts, src/hooks/usePreferences.ts, src/components/*.tsx, src/App.tsx, src/styles.css, public/favicon.svg, public/CV_NguyenSyManhCuong.pdf.

Interfaces: content keyed by Locale (`en | vi`); typed Project data with stable id, category list, localized copy, tech stack and optional verified repo URL. usePreferences exposes locale, setLocale, theme and setTheme. Section components receive locale or translated content.

- [x] Add the complete translated data from the CV, including project contributions and benchmark context.
- [x] Implement Header, Hero, About, Expertise, Projects, Experience, Education, Contact and Footer using semantic HTML.
- [x] Implement filtering with `category === 'All' || project.categories.includes(category)` and expansion using native accessible disclosure buttons.
- [x] Apply shared Tailwind/CSS tokens and responsive layouts; add local font, monogram and illustrative project covers.
- [x] Run `npm test`, `npm run lint`, `npm run build`; resolve observed failures.
- [x] Start preview and visually inspect desktop/mobile and light/dark EN/VI; check CV and asset paths under `/MyPortfolio/`.

## Task 3: Publish and verify

Files: .github/workflows/deploy.yml, README.md.

- [x] Document local development, content editing, asset replacement, Pages setup and verification commands.
- [x] Add Actions workflow with Node 24, npm ci, lint, tests, build, and dist deployment to GitHub Pages.
- [x] Review tracked files and diff for unexpected files, credentials and factual errors; run final tests/build.
- [x] Commit the reviewed application locally.
- [ ] Authenticate the user's GitHub account if needed, create an appropriate public repository without overwriting any existing repository, push the commit and configure workflow-based Pages.
- [ ] Verify Actions deployment and the public homepage/CV asset. Record the actual repository and Pages URLs.
