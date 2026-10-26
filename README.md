# Nguyễn Sỹ Mạnh Cường — Portfolio

A bilingual English/Vietnamese software engineering portfolio built with React, Vite, TypeScript, and Tailwind CSS. The visual direction follows the supplied reference: spacious sections, bold type, orange accents, and light/dark themes.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

The local URL is printed in the terminal, normally http://127.0.0.1:5173/.

```sh
npm test
npm run lint
npm run build
npm run preview
```

## Content and design

- `src/data/content.ts`: complete English/Vietnamese copy, contact links, skills, and experience.
- `src/data/projects.ts`: project categories, summaries, contributions, dates, and verified source URLs.
- `src/styles.css`: semantic theme colors, responsive layouts, and typography.
- `public/images/avatar.jpg`: owner-provided portrait, displayed in the hero with a monogram fallback if it cannot load.
- `public/icons_svg/logo.svg`: owner-provided logo, used in the header, footer, and favicon.
- `src/components/ProjectCover.tsx`: original concept illustrations, explicitly labeled as illustrations. Replace with genuine product screenshots when available.
- `public/cv/Nguyen_Sy_Manh_Cuong_CV_Flutter.pdf`: downloadable CV supplied by the owner.

English is the default. Language and theme are stored in browser localStorage; switching remains usable if storage is blocked. All navigation uses section anchors, so there is no client-router fallback requirement. Project categories and expanded details stay intact when switching languages. Site copy is based on the supplied CV; metrics preserve their benchmark context.

## GitHub Pages

The workflow `.github/workflows/deploy.yml` validates, builds, and deploys every push to `main`. The deploy job runs only after all checks and the production build succeed. **Run workflow** remains available for manual deployment.

1. In repository **Settings → Pages**, select **GitHub Actions** as the build source.
2. Push your changes to `main`, or open **Actions → Verify and deploy portfolio → Run workflow** and select `main` to deploy manually.
3. Wait for the `build` and `deploy` jobs to succeed.
4. Open the website URL shown by the `github-pages` environment or **Settings → Pages**.

Future pushes to `main` automatically publish the new version after verification succeeds. The repository must support Pages hosting, for example a public repository on GitHub Free.

Vite derives its production base from `GITHUB_REPOSITORY`: a project repository gets `/<repository>/`, while a `username.github.io` repository gets `/`. Custom-domain hosting can use the `VITE_BASE_PATH=/` environment override in the build step.

To verify a project subpath locally in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/MyPortfolio/'
npm run build
Remove-Item Env:VITE_BASE_PATH
npm run preview -- --base /MyPortfolio/ --port 4173
```

Open http://127.0.0.1:4173/MyPortfolio/ and verify the CV download and font/icon assets.

## Accessibility and verification

Semantic sections, keyboard navigation, visible focus, a skip link, accessible disclosure controls, language metadata, and reduced motion support are included. Tests cover language/theme persistence, filters across locale changes, unavailable storage, menu dismissal, project details, and the CV URL. Responsive checks target 375px, 768px, and 1440px in English/Vietnamese and light/dark themes.

## Assets

Manrope is self-hosted through Fontsource (SIL Open Font License). Interface icons use Lucide (ISC). GitHub/LinkedIn SVG paths are from Simple Icons v11 (CC0); brand marks remain subject to their owners' brand policies. The portrait and logo were supplied in the project folder by the owner. The monogram fallback and concept illustrations are HTML/CSS/SVG artwork created for this portfolio.

## Design documents

The approved design and implementation checklist are kept locally in `docs/superpowers/`. The owner’s `.gitignore` excludes `docs/` from publication.
