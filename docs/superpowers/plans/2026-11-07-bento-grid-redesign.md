# Bento Grid Dark Mode Redesign & Vinyl Track Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build a high-craft Bento Grid Dark Mode Portfolio Dashboard inspired by the "Digital Pass" aesthetic by Max (@aximoris), featuring a 3-column desktop layout, interactive 3D Hero card, ambient glow, and an interactive Vinyl Music Disc switcher to toggle between App Dev and Game Dev with a left-to-right color wipe and bottom-to-top content transition.

**Architecture:** A fixed responsive Bento Grid container (`BentoLayout`) housing 4 primary cards: IntroCard, Hero3DCard (Spline with CSS 3D fallback), SocialHubCard (hexagonal radial layout), and LatestProjectsCard (vertical list with slide-over detail modal). State is controlled by `devMode` ('app' | 'game') triggered by `VinylTrackSwitcher`, orchestrating a smooth CSS/Framer Motion color wipe and content cross-fade.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Framer Motion, @splinetool/react-spline, Lucide React, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-07-bento-grid-redesign.md`

## Global Constraints

- Working on branch: `feature/ui-redesign`
- Dark Mode first: Base canvas `#09090b` / `#0d0d0d`, cards `#121214`/85 with `border border-white/10` and `rounded-[28px]`.
- App Dev palette: Emerald `#10b981`, Cyan `#06b6d4`, Dark Slate.
- Game Dev palette: Neon Violet `#a855f7`, Cyber Amber `#f59e0b`, Deep Indigo.
- Vinyl Disc: Continuous slow rotation, distinct border color shifting by mode, circular mock disk ready for SVG swap.
- Color transition: Left-to-right gradient sweep; Content transition: fade + slide-up from bottom (`y: 20 -> 0`).
- Local time: Always calculate Hanoi GMT+7 (`Asia/Bangkok`).
- Maintain existing English & Vietnamese locale switching and Blog route compatibility.

---

### Task 1: Dependencies Installation & Base Styling Configuration

**Files:**
- Modify: `package.json`
- Modify: `src/styles.css`
- Test: `npm test`

**Interfaces:**
- Produces: CSS animation utilities (`animate-spin-slow`, `.bento-glow`, `.dot-matrix-bg`, `.color-wipe-overlay`), packages installed (`framer-motion`, `@splinetool/react-spline`, `@splinetool/runtime`).

- [x] **Step 1: Install `framer-motion`, `@splinetool/react-spline`, and `@splinetool/runtime`**

Run:
```bash
npm install framer-motion @splinetool/react-spline @splinetool/runtime
```

- [x] **Step 2: Add CSS utility classes in `src/styles.css`**

Add keyframe animations for vinyl spinning, dot-matrix pattern, and theme wipe variables in `src/styles.css`:
```css
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.dot-matrix-bg {
  background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

- [x] **Step 3: Verify build and test suite run cleanly**

Run: `npm test`  
Expected: All existing tests pass.

- [x] **Step 4: Commit**

```bash
git add package.json package-lock.json src/styles.css
git commit -m "chore: install framer-motion and spline runtime, configure bento styling utilities"
```

---

### Task 2: Bento Content & Multi-Track Data Architecture

**Files:**
- Create: `src/data/bentoData.ts`
- Create: `src/data/__tests__/bentoData.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  export type BentoTrack = 'app' | 'game'
  export interface BentoProject {
    id: string
    title: { en: string; vi: string }
    category: { en: string; vi: string }
    description: { en: string; vi: string }
    iconGradient: string
    tech: string[]
    link?: string
    repo?: string
    details: { en: string[]; vi: string[] }
  }
  export interface BentoProfile {
    handle: string
    status: { en: string; vi: string }
    title: { en: string; vi: string }
    bio: { en: string; vi: string }
    skills: string[]
  }
  export const bentoContent: Record<BentoTrack, Record<'en' | 'vi', BentoProfile>>
  export const bentoProjects: Record<BentoTrack, BentoProject[]>
  export function getHanoiTime(date?: Date): { timeString: string; timeZone: string }
  ```

- [x] **Step 1: Write test for `bentoData` & `getHanoiTime`**

Create `src/data/__tests__/bentoData.test.ts`:
```typescript
import { describe, expect, it } from 'vitest'
import { bentoContent, bentoProjects, getHanoiTime } from '../bentoData'

describe('bentoData', () => {
  it('provides bilingual profiles for app and game tracks', () => {
    expect(bentoContent.app.en.skills.length).toBeGreaterThan(0)
    expect(bentoContent.app.vi.bio).toBeDefined()
    expect(bentoContent.game.en.skills).toContain('Unity')
  })

  it('provides categorized projects for app and game tracks', () => {
    expect(bentoProjects.app.length).toBeGreaterThan(0)
    expect(bentoProjects.game.length).toBeGreaterThan(0)
  })

  it('formats Hanoi local time in GMT+7 correctly', () => {
    const fixedDate = new Date('2026-11-06T12:00:00Z') // UTC 12:00 -> Hanoi 19:00
    const { timeString, timeZone } = getHanoiTime(fixedDate)
    expect(timeString).toContain('19:00')
    expect(timeZone).toBe('GMT+7')
  })
})
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test src/data/__tests__/bentoData.test.ts`  
Expected: FAIL ("Cannot find module '../bentoData'")

- [x] **Step 3: Implement `src/data/bentoData.ts`**

Create `src/data/bentoData.ts` with complete data for App Dev and Game Dev in both EN and VI:
- App Dev skills: `Flutter`, `React`, `TypeScript`, `Dart`, `FastAPI`, `AI Agents`, `SQLite`, `PostgreSQL`
- Game Dev skills: `Unity`, `C#`, `C++`, `Gameplay Programming`, `3D Math`, `Shader Graph`, `iOS Platform Channels`
- Full project listings for both tracks (VSF EV Dispatch, CarX AI, Dungeonary, Rentify for App Dev; Enspire Unity-iOS, IMSOFT Game Intern, 3D prototypes for Game Dev).
- `getHanoiTime` implementation using `Intl.DateTimeFormat` with `timeZone: 'Asia/Bangkok'`.

- [x] **Step 4: Run test to verify it passes**

Run: `npm test src/data/__tests__/bentoData.test.ts`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/data/bentoData.ts src/data/__tests__/bentoData.test.ts
git commit -m "feat: add bento data model and Hanoi time helper for dual tracks"
```

---

### Task 3: Vinyl Music Disc Switcher Component

**Files:**
- Create: `src/components/bento/VinylTrackSwitcher.tsx`
- Create: `src/components/bento/__tests__/VinylTrackSwitcher.test.tsx`

**Interfaces:**
- Consumes: `BentoTrack` from `src/data/bentoData.ts`
- Produces:
  ```typescript
  interface VinylTrackSwitcherProps {
    currentTrack: BentoTrack
    onTrackChange: (track: BentoTrack) => void
    locale: 'en' | 'vi'
  }
  export function VinylTrackSwitcher(props: VinylTrackSwitcherProps): React.JSX.Element
  ```

- [x] **Step 1: Write failing test for `VinylTrackSwitcher`**

Create `src/components/bento/__tests__/VinylTrackSwitcher.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { VinylTrackSwitcher } from '../VinylTrackSwitcher'

describe('VinylTrackSwitcher', () => {
  it('renders rotating disc and displays current track label', () => {
    render(<VinylTrackSwitcher currentTrack="app" onTrackChange={vi.fn()} locale="en" />)
    expect(screen.getByRole('button', { name: /switch track/i })).toBeInTheDocument()
    expect(screen.getByText(/app/i)).toBeInTheDocument()
  })

  it('triggers onTrackChange when clicked', async () => {
    const handleTrackChange = vi.fn()
    render(<VinylTrackSwitcher currentTrack="app" onTrackChange={handleTrackChange} locale="en" />)
    await userEvent.click(screen.getByRole('button', { name: /switch track/i }))
    expect(handleTrackChange).toHaveBeenCalledWith('game')
  })
})
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test src/components/bento/__tests__/VinylTrackSwitcher.test.tsx`  
Expected: FAIL

- [x] **Step 3: Implement `VinylTrackSwitcher`**

Create `src/components/bento/VinylTrackSwitcher.tsx`:
- Render circular vinyl disk with concentric groove SVG styling.
- Center circular label displaying current mode (`APP DEV` / `GAME DEV`) with musical note or disc icon.
- Border styled with dynamic glow depending on track:
  - App: `border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]`
  - Game: `border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]`
- Add accessibility attributes: `role="button"`, `aria-label="Switch track between App and Game"`, keyboard accessible (`onKeyDown`).

- [x] **Step 4: Run test to verify it passes**

Run: `npm test src/components/bento/__tests__/VinylTrackSwitcher.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/components/bento/VinylTrackSwitcher.tsx src/components/bento/__tests__/VinylTrackSwitcher.test.tsx
git commit -m "feat: implement interactive vinyl track switcher dock"
```

---

### Task 4: Intro Card Component (Left Column)

**Files:**
- Create: `src/components/bento/IntroCard.tsx`
- Create: `src/components/bento/__tests__/IntroCard.test.tsx`

**Interfaces:**
- Consumes: `BentoTrack` from `src/data/bentoData.ts`, `bentoContent`, `getHanoiTime`
- Produces:
  ```typescript
  interface IntroCardProps {
    track: BentoTrack
    locale: 'en' | 'vi'
    onContactClick: () => void
  }
  export function IntroCard(props: IntroCardProps): React.JSX.Element
  ```

- [x] **Step 1: Write failing test for `IntroCard`**

Create `src/components/bento/__tests__/IntroCard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { IntroCard } from '../IntroCard'

describe('IntroCard', () => {
  it('renders profile title, skills, and CTA buttons', () => {
    render(<IntroCard track="app" locale="en" onContactClick={vi.fn()} />)
    expect(screen.getByText(/hello!/i)).toBeInTheDocument()
    expect(screen.getByText(/hanoi, vn/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact me/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /cv/i })).toBeInTheDocument()
  })
})
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test src/components/bento/__tests__/IntroCard.test.tsx`  
Expected: FAIL

- [x] **Step 3: Implement `IntroCard`**

Create `src/components/bento/IntroCard.tsx`:
- Render username badge `@cuongnsm` and pulse dot `Open to opportunities`.
- Large bold headline: `Hello! I'm Cuong` (or Vietnamese equivalent).
- Dynamic bio text based on `track`.
- Skill pills wrapped in flex container with hover highlight.
- Mini Map Widget with vector radar lines, live Hanoi GMT+7 clock updating every 10 seconds, and pulsing locator dot.
- Action buttons: "Contact me" (prominent rounded white button) and "CV" (glassmorphic pill button linking to PDF).

- [x] **Step 4: Run test to verify it passes**

Run: `npm test src/components/bento/__tests__/IntroCard.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/components/bento/IntroCard.tsx src/components/bento/__tests__/IntroCard.test.tsx
git commit -m "feat: implement intro bento card with live hanoi radar clock"
```

---

### Task 5: Hero 3D Card (Center Column) with Spline & Graceful Fallback

**Files:**
- Create: `src/components/bento/Hero3DCard.tsx`
- Create: `src/components/bento/__tests__/Hero3DCard.test.tsx`

**Interfaces:**
- Consumes: `BentoTrack`
- Produces:
  ```typescript
  interface Hero3DCardProps {
    track: BentoTrack
    locale: 'en' | 'vi'
  }
  export function Hero3DCard(props: Hero3DCardProps): React.JSX.Element
  ```

- [x] **Step 1: Write failing test for `Hero3DCard`**

Create `src/components/bento/__tests__/Hero3DCard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero3DCard } from '../Hero3DCard'

describe('Hero3DCard', () => {
  it('renders dot matrix container and digital pass label', () => {
    render(<Hero3DCard track="app" locale="en" />)
    expect(screen.getByText(/digital pass/i)).toBeInTheDocument()
  })
})
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test src/components/bento/__tests__/Hero3DCard.test.tsx`  
Expected: FAIL

- [x] **Step 3: Implement `Hero3DCard` with Spline Loader and Interactive 3D Fallback**

Create `src/components/bento/Hero3DCard.tsx`:
- Outer container: `rounded-[28px] border border-white/10 bg-[#121214]/90 overflow-hidden relative`.
- Dot matrix pattern overlay (`dot-matrix-bg`).
- Top ambient gradient aura:
  - App track: `from-emerald-500/25 via-cyan-500/15 to-transparent`
  - Game track: `from-purple-500/30 via-amber-500/15 to-transparent`
- Embedded `@splinetool/react-spline` component wrapped in an error boundary & loading state.
- Interactive CSS 3D Digital Pass fallback that tracks mouse position (`perspective: 1000px`, `rotateX`, `rotateY`) so that if Spline is loading or unavailable, the user still experiences an ultra-sleek 3D card experience.
- Bottom subtitle: `"Digital Pass · Interactive 3D"`.

- [x] **Step 4: Run test to verify it passes**

Run: `npm test src/components/bento/__tests__/Hero3DCard.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/components/bento/Hero3DCard.tsx src/components/bento/__tests__/Hero3DCard.test.tsx
git commit -m "feat: implement hero 3d bento card with spline and interactive fallback"
```

---

### Task 6: Social Hub Card (Top Right Column)

**Files:**
- Create: `src/components/bento/SocialHubCard.tsx`
- Create: `src/components/bento/__tests__/SocialHubCard.test.tsx`

**Interfaces:**
- Consumes: `BentoTrack`, `locale`
- Produces:
  ```typescript
  interface SocialHubCardProps {
    track: BentoTrack
    locale: 'en' | 'vi'
    onBlogClick?: () => void
  }
  export function SocialHubCard(props: SocialHubCardProps): React.JSX.Element
  ```

- [x] **Step 1: Write failing test for `SocialHubCard`**

Create `src/components/bento/__tests__/SocialHubCard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SocialHubCard } from '../SocialHubCard'

describe('SocialHubCard', () => {
  it('renders social orbital links', () => {
    render(<SocialHubCard track="app" locale="en" />)
    expect(screen.getByLabelText(/github/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument()
  })
})
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test src/components/bento/__tests__/SocialHubCard.test.tsx`  
Expected: FAIL

- [x] **Step 3: Implement `SocialHubCard`**

Create `src/components/bento/SocialHubCard.tsx`:
- Render central glowing core with personal monogram / glowing orb.
- 6 orbital social buttons arranged in hexagonal geometry: GitHub, LinkedIn, Email, Figma, Blog, YouTube.
- Magnetic hover micro-interactions using Framer Motion (`whileHover={{ scale: 1.15 }}`).
- Accessible tooltips and labels.

- [x] **Step 4: Run test to verify it passes**

Run: `npm test src/components/bento/__tests__/SocialHubCard.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/components/bento/SocialHubCard.tsx src/components/bento/__tests__/SocialHubCard.test.tsx
git commit -m "feat: implement hexagonal radial social hub card"
```

---

### Task 7: Latest Projects Card & Project Detail Modal (Bottom Right Column)

**Files:**
- Create: `src/components/bento/LatestProjectsCard.tsx`
- Create: `src/components/bento/ProjectDetailModal.tsx`
- Create: `src/components/bento/__tests__/ProjectsCard.test.tsx`

**Interfaces:**
- Consumes: `BentoProject` from `src/data/bentoData.ts`
- Produces:
  ```typescript
  interface LatestProjectsCardProps {
    track: BentoTrack
    locale: 'en' | 'vi'
    onSelectProject: (project: BentoProject) => void
  }
  export function LatestProjectsCard(props: LatestProjectsCardProps): React.JSX.Element
  export function ProjectDetailModal(props: { project: BentoProject | null; onClose: () => void; locale: 'en' | 'vi' }): React.JSX.Element
  ```

- [x] **Step 1: Write failing test for `LatestProjectsCard` & `ProjectDetailModal`**

Create `src/components/bento/__tests__/ProjectsCard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { bentoProjects } from '../../data/bentoData'
import { LatestProjectsCard } from '../LatestProjectsCard'
import { ProjectDetailModal } from '../ProjectDetailModal'

describe('LatestProjectsCard & Modal', () => {
  it('renders project list items according to track', () => {
    render(<LatestProjectsCard track="app" locale="en" onSelectProject={vi.fn()} />)
    expect(screen.getByText(/latest projects/i)).toBeInTheDocument()
    expect(screen.getByText(bentoProjects.app[0].title.en)).toBeInTheDocument()
  })

  it('renders project detail modal with repo link when opened', () => {
    const project = bentoProjects.app[0]
    render(<ProjectDetailModal project={project} onClose={vi.fn()} locale="en" />)
    expect(screen.getByText(project.title.en)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })
})
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test src/components/bento/__tests__/ProjectsCard.test.tsx`  
Expected: FAIL

- [x] **Step 3: Implement `LatestProjectsCard` and `ProjectDetailModal`**

- `LatestProjectsCard.tsx`:
  - Vertical list of case study cards with individual gradient avatar icons, title, subtitle, and `ArrowUpRight` icon.
  - Slim custom scrollbar if the list overflows.
  - Hover glow effect on each row.
- `ProjectDetailModal.tsx`:
  - Framer Motion `AnimatePresence` backdrop overlay with `backdrop-blur-md`.
  - Slide-over card from right (or centered dialog on mobile) with full project problem statement, technical solution, tech tags, and GitHub/Live demo button.

- [x] **Step 4: Run test to verify it passes**

Run: `npm test src/components/bento/__tests__/ProjectsCard.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/components/bento/LatestProjectsCard.tsx src/components/bento/ProjectDetailModal.tsx src/components/bento/__tests__/ProjectsCard.test.tsx
git commit -m "feat: implement latest projects card and slide-over detail modal"
```

---

### Task 8: BentoLayout Assembly & Left-to-Right Color Wipe Choreography

**Files:**
- Create: `src/components/bento/BentoLayout.tsx`
- Create: `src/components/bento/ContactModal.tsx`
- Create: `src/components/bento/__tests__/BentoLayout.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: All `src/components/bento/*` components
- Produces:
  ```typescript
  interface BentoLayoutProps {
    locale: 'en' | 'vi'
    onLocaleChange: (locale: 'en' | 'vi') => void
    onViewBlog: () => void
  }
  export function BentoLayout(props: BentoLayoutProps): React.JSX.Element
  ```

- [x] **Step 1: Write failing test for `BentoLayout`**

Create `src/components/bento/__tests__/BentoLayout.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BentoLayout } from '../BentoLayout'

describe('BentoLayout', () => {
  it('renders all 4 bento cards and vinyl switcher', () => {
    render(<BentoLayout locale="en" onLocaleChange={vi.fn()} onViewBlog={vi.fn()} />)
    expect(screen.getByText(/hello!/i)).toBeInTheDocument()
    expect(screen.getByText(/digital pass/i)).toBeInTheDocument()
    expect(screen.getByText(/latest projects/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch track/i })).toBeInTheDocument()
  })

  it('switches track when vinyl switcher is clicked and preserves container layout', async () => {
    render(<BentoLayout locale="en" onLocaleChange={vi.fn()} onViewBlog={vi.fn()} />)
    const switchBtn = screen.getByRole('button', { name: /switch track/i })
    await userEvent.click(switchBtn)
    expect(screen.getByText(/game/i)).toBeInTheDocument()
  })
})
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test src/components/bento/__tests__/BentoLayout.test.tsx`  
Expected: FAIL

- [x] **Step 3: Implement `BentoLayout` with Color Wipe and Content Transition**

Create `src/components/bento/BentoLayout.tsx`:
- Fixed 3-column desktop container (`grid-cols-12`) / 1-column mobile.
- Left-to-right gradient color wipe:
  - Framer motion overlay with clip-path or gradient sweep transitioning from left to right on track change.
- Content AnimatePresence:
  - Keyed by `currentTrack`: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}`.
- Top subtle utility bar: Quick language switch (`EN | VI`), quick Blog link.
- ContactModal with email, copy email action, and direct mailto.

- [x] **Step 4: Connect `BentoLayout` into `src/App.tsx`**

Integrate `BentoLayout` into `src/App.tsx` as the main view when `!isBlog`, preserving the `/blog` and `/blog/:slug` markdown reader routes.

- [x] **Step 5: Run tests to verify all pass**

Run: `npm test`  
Expected: ALL PASS

- [x] **Step 6: Commit**

```bash
git add src/components/bento/BentoLayout.tsx src/components/bento/ContactModal.tsx src/components/bento/__tests__/BentoLayout.test.tsx src/App.tsx
git commit -m "feat: assemble complete bento grid dashboard with vinyl track switcher"
```

---

### Task 9: Full Build Verification, Visual Check & Polish

**Files:**
- Modify: `src/styles.css` (if any micro-adjustments needed)
- Test: Full test suite + production build

- [x] **Step 1: Run linter and typecheck**

Run:
```bash
npm run lint
npm run build
```
Expected: 0 errors, production build succeeds.

- [x] **Step 2: Run all unit & integration tests**

Run:
```bash
npm test
```
Expected: All tests pass.

- [x] **Step 3: Final Commit**

```bash
git add -A
git commit -m "refactor: polish bento grid layout, responsive breakpoints, and transitions"
```

