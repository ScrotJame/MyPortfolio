# Bento Blog Redesign (Digital Library Card Vault) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Blog view from traditional HTML cards into a dark luxury "Digital Library Card Vault" with 3D collectible cards (pure black border, green hover border, "Xem chi tiết" CTA), shelf-based catalog filtering, and a dedicated Bento reader with reading progress bar.

**Architecture:** Create modular blog components under `src/components/blog/` (`BlogVaultLayout`, `BlogCard3D`, `BlogShelfFilter`, `BlogReader`). Replace the legacy `Header`, `SubHeader`, and `BlogPage` in `src/App.tsx` with `BlogVaultLayout`, which embeds the Bento tablet slate frame, ambient mesh glow, and clean routing without the vinyl switcher dock.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Lucide React, React Markdown, Vitest, React Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-07-bento-blog-redesign-design.md`

## Global Constraints

- Card default styling: Pure dark/black background (`bg-[#121214]`), dark border (`border-white/10`), no colorful borders by default.
- Card hover styling: Bright green glow border (`hover:border-emerald-400` / `shadow-[0_0_24px_rgba(16,185,129,0.22)]`).
- Remove all artificial top tag lines (`#APP-001`, `#GAME-001`).
- Card action button copy: Exactly "Xem chi tiết →" in Vietnamese and "View Details →" in English.
- No `VinylTrackSwitcher` dock on Blog page.
- Category navigation modeled after library shelves (`All Archives`, `Shelf 01: Dev Apps`, `Shelf 02: Gaming`) with search.
- Reading screen: Dedicated Bento reader in slate frame with top reading progress bar and "← Quay lại Thư viện" back button.

---

### Task 1: Create `BlogShelfFilter` Component

**Files:**
- Create: `src/components/blog/BlogShelfFilter.tsx`
- Test: `src/components/blog/__tests__/BlogShelfFilter.test.tsx`

**Interfaces:**
- Consumes: `locale: 'en' | 'vi'`, `activeCategory: 'all' | 'app' | 'game'`, `counts: { all: number; app: number; game: number }`, `searchQuery: string`
- Produces: `onCategoryChange: (category: 'all' | 'app' | 'game') => void`, `onSearchChange: (query: string) => void`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/blog/__tests__/BlogShelfFilter.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlogShelfFilter } from '../BlogShelfFilter'

describe('BlogShelfFilter', () => {
  it('renders shelf tabs with counts and responds to category change', async () => {
    const user = userEvent.setup()
    const handleCategoryChange = vi.fn()
    const handleSearchChange = vi.fn()

    render(
      <BlogShelfFilter
        locale="vi"
        activeCategory="all"
        counts={{ all: 4, app: 2, game: 2 }}
        searchQuery=""
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
    )

    expect(screen.getByRole('button', { name: /tất cả/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ứng dụng/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /trò chơi/i })).toBeInTheDocument()

    const appBtn = screen.getByRole('button', { name: /ứng dụng/i })
    await user.click(appBtn)
    expect(handleCategoryChange).toHaveBeenCalledWith('app')
  })

  it('triggers search query callback when user types in search box', async () => {
    const user = userEvent.setup()
    const handleSearchChange = vi.fn()

    render(
      <BlogShelfFilter
        locale="en"
        activeCategory="all"
        counts={{ all: 2, app: 1, game: 1 }}
        searchQuery=""
        onCategoryChange={vi.fn()}
        onSearchChange={handleSearchChange}
      />
    )

    const searchInput = screen.getByPlaceholderText(/search archives/i)
    await user.type(searchInput, 'Cursor')
    expect(handleSearchChange).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/blog/__tests__/BlogShelfFilter.test.tsx`
Expected: FAIL with module not found or import error.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/blog/BlogShelfFilter.tsx
import { memo } from 'react'
import { Search, Sparkles, Smartphone, Gamepad2, X } from 'lucide-react'

export interface BlogShelfFilterProps {
  locale: 'en' | 'vi'
  activeCategory: 'all' | 'app' | 'game'
  counts: { all: number; app: number; game: number }
  searchQuery: string
  onCategoryChange: (category: 'all' | 'app' | 'game') => void
  onSearchChange: (query: string) => void
}

export const BlogShelfFilter = memo(function BlogShelfFilter({
  locale,
  activeCategory,
  counts,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: BlogShelfFilterProps) {
  const isVi = locale === 'vi'

  const shelves: Array<{ id: 'all' | 'app' | 'game'; label: string; count: number; icon: React.ReactNode }> = [
    {
      id: 'all',
      label: isVi ? 'Tất cả Kệ' : 'All Archives',
      count: counts.all,
      icon: <Sparkles size={14} className="text-emerald-400" />,
    },
    {
      id: 'app',
      label: isVi ? 'Kệ 01: Ứng dụng' : 'Shelf 01: Dev Apps',
      count: counts.app,
      icon: <Smartphone size={14} className="text-emerald-400" />,
    },
    {
      id: 'game',
      label: isVi ? 'Kệ 02: Trò chơi' : 'Shelf 02: Gaming',
      count: counts.game,
      icon: <Gamepad2 size={14} className="text-purple-400" />,
    },
  ]

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
      {/* Shelf Catalog Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {shelves.map((shelf) => {
          const isActive = activeCategory === shelf.id
          return (
            <button
              key={shelf.id}
              type="button"
              onClick={() => onCategoryChange(shelf.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white/10 text-white border border-white/20 shadow-sm shadow-black/40'
                  : 'bg-white/[0.02] text-white/50 hover:text-white/80 hover:bg-white/[0.06] border border-white/5'
              }`}
            >
              {shelf.icon}
              <span>{shelf.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                }`}
              >
                {shelf.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Real-time Keyword Search */}
      <div className="relative w-full md:w-64">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={isVi ? 'Tìm kiếm hồ sơ lưu trữ...' : 'Search archives...'}
          className="w-full pl-8.5 pr-8 py-2 rounded-xl bg-white/[0.03] border border-white/10 focus:border-emerald-400/60 focus:bg-white/[0.06] text-xs text-white placeholder:text-white/35 focus:outline-none transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>
    </div>
  )
})
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/blog/__tests__/BlogShelfFilter.test.tsx`
Expected: PASS (2 tests passed)

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/BlogShelfFilter.tsx src/components/blog/__tests__/BlogShelfFilter.test.tsx
git commit -m "feat(blog): add BlogShelfFilter component for library shelves navigation"
```

---

### Task 2: Create `BlogCard3D` Component

**Files:**
- Create: `src/components/blog/BlogCard3D.tsx`
- Test: `src/components/blog/__tests__/BlogCard3D.test.tsx`

**Interfaces:**
- Consumes: `post: BlogPost` (from `src/utils/blog`), `locale: 'en' | 'vi'`, `onSelect: () => void`
- Produces: Interactive 3D tilt collectible card with pure black default border, green hover border, no tag lines, and "Xem chi tiết →" action button.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/blog/__tests__/BlogCard3D.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlogCard3D } from '../BlogCard3D'
import type { BlogPost } from '../../../utils/blog'

const mockPost: BlogPost = {
  slug: 'review-cursor',
  title: 'Trải nghiệm Cursor AI Editor',
  date: '2026-10-25',
  category: 'app',
  platform: 'macOS / Windows',
  rating: '9.0/10',
  summary: 'Đánh giá chi tiết trình soạn thảo mã nguồn tích hợp AI đa mô hình.',
  content: '## Nội dung bài viết...',
}

describe('BlogCard3D', () => {
  it('renders title, summary, rating, and View Details button without hashtag tagline', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    render(<BlogCard3D post={mockPost} locale="vi" onSelect={handleSelect} />)

    expect(screen.getByText('Trải nghiệm Cursor AI Editor')).toBeInTheDocument()
    expect(screen.getByText(/Đánh giá chi tiết trình soạn thảo/i)).toBeInTheDocument()
    expect(screen.getByText('9.0/10')).toBeInTheDocument()
    expect(screen.getByText('macOS / Windows')).toBeInTheDocument()

    // Must NOT have artificial taglines like #APP-001
    expect(screen.queryByText(/#app-/i)).not.toBeInTheDocument()

    // Must have "Xem chi tiết →" button
    const ctaBtn = screen.getByRole('button', { name: /xem chi tiết/i })
    expect(ctaBtn).toBeInTheDocument()

    await user.click(ctaBtn)
    expect(handleSelect).toHaveBeenCalled()
  })

  it('renders English label for CTA button when locale is en', () => {
    render(<BlogCard3D post={mockPost} locale="en" onSelect={vi.fn()} />)
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/blog/__tests__/BlogCard3D.test.tsx`
Expected: FAIL with module not found or import error.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/blog/BlogCard3D.tsx
import { useState, useCallback, memo } from 'react'
import { ArrowUpRight, Calendar, Star, Tag, Smartphone, Gamepad2 } from 'lucide-react'
import type { BlogPost } from '../../utils/blog'

export interface BlogCard3DProps {
  post: BlogPost
  locale: 'en' | 'vi'
  onSelect: () => void
}

export const BlogCard3D = memo(function BlogCard3D({ post, locale, onSelect }: BlogCard3DProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const isVi = locale === 'vi'

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -9
    const rotateY = ((x - centerX) / centerX) * 9
    setRotate({ x: rotateX, y: rotateY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 })
  }, [])

  const ctaLabel = isVi ? 'Xem chi tiết →' : 'View Details →'

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-[1000px] h-full"
    >
      <article
        onClick={onSelect}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative flex flex-col justify-between h-full bg-[#121214] border border-white/10 hover:border-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.22)] rounded-[24px] p-5.5 sm:p-6 cursor-pointer overflow-hidden backdrop-blur-xl transition-[border-color,box-shadow] duration-300 select-none"
      >
        {/* Subtle top glare sheen on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* 1. Header: Meta details (Category, Platform & Rating) - NO #APP-001 taglines */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                post.category === 'game'
                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}
            >
              {post.category === 'game' ? <Gamepad2 size={12} /> : <Smartphone size={12} />}
              <span>{post.category === 'game' ? (isVi ? 'Trò chơi' : 'Game') : isVi ? 'Ứng dụng' : 'App'}</span>
            </span>

            {post.platform && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-white/50">
                <Tag size={11} className="text-white/40" />
                <span className="truncate max-w-[120px]">{post.platform}</span>
              </span>
            )}
          </div>

          {post.rating && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-bold shrink-0">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{post.rating}</span>
            </div>
          )}
        </div>

        {/* 2. Visual Graphic Thumbnail Area */}
        <div className="relative z-10 w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-white/15 transition-colors">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${
              post.category === 'game'
                ? 'bg-gradient-to-tr from-purple-600 to-amber-500 text-white'
                : 'bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white'
            }`}
          >
            {post.title.slice(0, 2).toUpperCase()}
          </div>
          <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* 3. Text Info: Title & 2-Line Summary */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-2">
              {post.title}
            </h3>
            <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">{post.summary}</p>
          </div>

          {/* 4. Footer: Date & "Xem chi tiết →" Button */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40">
              <Calendar size={12} />
              <time dateTime={post.date}>{post.date}</time>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelect()
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.05] group-hover:bg-emerald-500/15 group-hover:text-emerald-300 border border-white/10 group-hover:border-emerald-400/40 text-xs font-semibold text-white/80 transition-all cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </article>
    </div>
  )
})
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/blog/__tests__/BlogCard3D.test.tsx`
Expected: PASS (2 tests passed)

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/BlogCard3D.tsx src/components/blog/__tests__/BlogCard3D.test.tsx
git commit -m "feat(blog): add BlogCard3D collectible card component with pure black border and green hover glow"
```

---

### Task 3: Create `BlogReader` Component

**Files:**
- Create: `src/components/blog/BlogReader.tsx`
- Test: `src/components/blog/__tests__/BlogReader.test.tsx`

**Interfaces:**
- Consumes: `post: BlogPost`, `locale: 'en' | 'vi'`, `onBack: () => void`
- Produces: Dedicated Bento Reader with top reading progress bar, metadata banner, formatted markdown body, and back navigation.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/blog/__tests__/BlogReader.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlogReader } from '../BlogReader'
import type { BlogPost } from '../../../utils/blog'

const mockPost: BlogPost = {
  slug: 'review-cursor',
  title: 'Trải nghiệm Cursor AI Editor',
  date: '2026-10-25',
  category: 'app',
  platform: 'macOS / Windows',
  rating: '9.0/10',
  summary: 'Đánh giá chi tiết trình soạn thảo mã nguồn tích hợp AI đa mô hình.',
  content: '## Ấn tượng ban đầu\n\nCursor mang lại cảm giác cực kỳ thân thuộc.',
}

describe('BlogReader', () => {
  it('renders article title, rating, platform, and back button', async () => {
    const user = userEvent.setup()
    const handleBack = vi.fn()

    render(<BlogReader post={mockPost} locale="vi" onBack={handleBack} />)

    expect(screen.getByRole('heading', { level: 1, name: 'Trải nghiệm Cursor AI Editor' })).toBeInTheDocument()
    expect(screen.getByText('9.0/10')).toBeInTheDocument()
    expect(screen.getByText(/ấn tượng ban đầu/i)).toBeInTheDocument()

    const backBtn = screen.getByRole('button', { name: /quay lại thư viện/i })
    expect(backBtn).toBeInTheDocument()

    await user.click(backBtn)
    expect(handleBack).toHaveBeenCalled()
  })

  it('renders English back label when locale is en', () => {
    render(<BlogReader post={mockPost} locale="en" onBack={vi.fn()} />)
    expect(screen.getByRole('button', { name: /back to archives/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/blog/__tests__/BlogReader.test.tsx`
Expected: FAIL with module not found or import error.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/blog/BlogReader.tsx
import { useState, useEffect, useRef, memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Calendar, Star, Tag, Smartphone, Gamepad2, Clock } from 'lucide-react'
import type { BlogPost } from '../../utils/blog'

export interface BlogReaderProps {
  post: BlogPost
  locale: 'en' | 'vi'
  onBack: () => void
}

export const BlogReader = memo(function BlogReader({ post, locale, onBack }: BlogReaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const isVi = locale === 'vi'

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const total = scrollHeight - clientHeight
      if (total <= 0) {
        setScrollProgress(100)
      } else {
        setScrollProgress(Math.min(100, Math.round((scrollTop / total) * 100)))
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Approximate reading time (words / 200)
  const wordCount = post.content.split(/\s+/).length
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="relative flex flex-col h-full max-h-[82vh] overflow-hidden rounded-[26px] bg-[#101114]/90 border border-white/10 backdrop-blur-2xl">
      {/* 1. Top Reading Progress Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-white/[0.05] z-30">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] z-20 bg-[#101114]/80 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-semibold text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft size={14} className="text-emerald-400" />
          <span>{isVi ? '← Quay lại Thư viện' : '← Back to Archives'}</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-white/50">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-white/40" />
            <span>{readMinutes} {isVi ? 'phút đọc' : 'min read'}</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-emerald-400 font-bold">{scrollProgress}%</span>
        </div>
      </div>

      {/* 3. Article Content Area (Scrollable) */}
      <div ref={contentRef} className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-16 py-8 scrollbar-thin">
        <header className="max-w-3xl mx-auto mb-8 pb-6 border-b border-white/10">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                post.category === 'game'
                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}
            >
              {post.category === 'game' ? <Gamepad2 size={13} /> : <Smartphone size={13} />}
              <span>{post.category === 'game' ? (isVi ? 'Trò chơi' : 'Game') : isVi ? 'Ứng dụng' : 'App'}</span>
            </span>

            {post.platform && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/70">
                <Tag size={12} className="text-white/40" />
                <span>{post.platform}</span>
              </span>
            )}

            {post.rating && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-bold">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{post.rating}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-5">
            <Calendar size={13} />
            <time dateTime={post.date}>{post.date}</time>
          </div>

          {post.summary && (
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal bg-white/[0.02] border-l-2 border-emerald-400/60 pl-4 py-2 rounded-r-xl">
              {post.summary}
            </p>
          )}
        </header>

        {/* Markdown Rendered Body */}
        <article className="max-w-3xl mx-auto prose prose-invert prose-emerald prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-li:text-white/80 prose-code:text-emerald-300 prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-pre:bg-[#08080a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-blockquote:border-emerald-400/50 prose-blockquote:bg-white/[0.02] prose-blockquote:rounded-r-xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  )
})
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/blog/__tests__/BlogReader.test.tsx`
Expected: PASS (2 tests passed)

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/BlogReader.tsx src/components/blog/__tests__/BlogReader.test.tsx
git commit -m "feat(blog): add BlogReader dedicated reading view with progress bar"
```

---

### Task 4: Create `BlogVaultLayout` Component & Integrate with `App.tsx`

**Files:**
- Create: `src/components/blog/BlogVaultLayout.tsx`
- Modify: `src/App.tsx:73-97`
- Test: `src/Blog.test.tsx`

**Interfaces:**
- Consumes: `locale: 'en' | 'vi'`, `activeSlug: string | null`, `onLocaleChange: (l: 'en' | 'vi') => void`, `onSelectPost: (slug: string | null) => void`, `onNavigateHome: () => void`
- Produces: Complete Digital Library Card Vault view with floating header, central slate frame, category filtering, search, cards grid, reader switch, and NO vinyl switcher dock.

- [ ] **Step 1: Write the failing test**

Update `src/Blog.test.tsx`:
```tsx
// src/Blog.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlogVaultLayout } from './components/blog/BlogVaultLayout'

describe('BlogVaultLayout', () => {
  it('renders library header, shelf filters, card deck, and navigates to reader view', async () => {
    const user = userEvent.setup()
    const handleSelectPost = vi.fn()
    const handleNavigateHome = vi.fn()

    const { rerender } = render(
      <BlogVaultLayout
        locale="vi"
        activeSlug={null}
        onLocaleChange={vi.fn()}
        onSelectPost={handleSelectPost}
        onNavigateHome={handleNavigateHome}
      />
    )

    // Verify Header and Shelf filters
    expect(screen.getByText(/digital archives/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tất cả kệ/i })).toBeInTheDocument()

    // Verify "Xem chi tiết" buttons on cards
    const viewButtons = screen.getAllByRole('button', { name: /xem chi tiết/i })
    expect(viewButtons.length).toBeGreaterThan(0)

    // Click "Xem chi tiết" on the first card
    await user.click(viewButtons[0])
    expect(handleSelectPost).toHaveBeenCalled()

    // Rerender with active post slug to simulate reader mode
    rerender(
      <BlogVaultLayout
        locale="vi"
        activeSlug="review-cursor"
        onLocaleChange={vi.fn()}
        onSelectPost={handleSelectPost}
        onNavigateHome={handleNavigateHome}
      />
    )

    expect(screen.getByRole('button', { name: /quay lại thư viện/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/Blog.test.tsx`
Expected: FAIL with module not found or import error.

- [ ] **Step 3: Write `BlogVaultLayout.tsx` and update `App.tsx`**

```tsx
// src/components/blog/BlogVaultLayout.tsx
import { useState, useMemo } from 'react'
import { ArrowLeft, BookOpen, Globe2 } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '../../utils/blog'
import { BlogShelfFilter } from './BlogShelfFilter'
import { BlogCard3D } from './BlogCard3D'
import { BlogReader } from './BlogReader'

export interface BlogVaultLayoutProps {
  locale: 'en' | 'vi'
  activeSlug: string | null
  onLocaleChange: (locale: 'en' | 'vi') => void
  onSelectPost: (slug: string | null) => void
  onNavigateHome: () => void
}

export function BlogVaultLayout({
  locale,
  activeSlug,
  onLocaleChange,
  onSelectPost,
  onNavigateHome,
}: BlogVaultLayoutProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'app' | 'game'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const isVi = locale === 'vi'
  const posts = useMemo(() => getAllPosts(), [])
  const activePost = activeSlug ? getPostBySlug(activeSlug) : null

  const counts = useMemo(
    () => ({
      all: posts.length,
      app: posts.filter((p) => p.category === 'app').length,
      game: posts.filter((p) => p.category === 'game').length,
    }),
    [posts]
  )

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory = activeCategory === 'all' || post.category === activeCategory
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [posts, activeCategory, searchQuery])

  return (
    <div className="relative min-h-screen bg-[#09090b] text-white overflow-x-hidden selection:bg-emerald-500/30 selection:text-white flex flex-col justify-between">
      {/* 1. Ambient Background Multi-Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[120px] bg-emerald-500 opacity-25 transform-gpu will-change-transform" />
        <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] rounded-full blur-[120px] bg-cyan-600 opacity-20 transform-gpu will-change-transform" />
        <div className="absolute -bottom-32 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] bg-purple-600 opacity-20 transform-gpu will-change-transform" />
      </div>

      {/* 2. Top Floating Glass Header */}
      <header className="relative z-20 w-full max-w-[1400px] xl:max-w-[1480px] 2xl:max-w-[1560px] mx-auto pt-3 sm:pt-4 px-4 sm:px-6">
        <nav className="flex items-center justify-between py-2.5 px-4 sm:px-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase">
              CƯỜNG NGUYỄN <span className="text-white/40 font-mono font-normal">// DIGITAL ARCHIVES</span>
            </span>
          </div>

          {/* Quick Actions: Back to Home & Language Switch */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} className="text-emerald-400" />
              <span>{isVi ? 'Về Portfolio' : 'Back to Home'}</span>
            </button>

            <button
              type="button"
              onClick={() => onLocaleChange(locale === 'en' ? 'vi' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
              title={locale === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
            >
              <Globe2 size={13} className="text-cyan-400" />
              <span>{locale.toUpperCase()}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* 3. Main Bento Tablet Slate Container */}
      <main className="relative z-10 w-full max-w-[1400px] xl:max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 my-auto py-4 sm:py-6 flex flex-col justify-center flex-1">
        <div className="w-full rounded-[32px] sm:rounded-[38px] bg-[#0c0d10]/90 border border-white/[0.08] p-4 sm:p-6 lg:p-7 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex-1">
          {activePost ? (
            <BlogReader
              post={activePost}
              locale={locale}
              onBack={() => onSelectPost(null)}
            />
          ) : (
            <div>
              {/* Library Shelf Filter & Search */}
              <BlogShelfFilter
                locale={locale}
                activeCategory={activeCategory}
                counts={counts}
                searchQuery={searchQuery}
                onCategoryChange={setActiveCategory}
                onSearchChange={setSearchQuery}
              />

              {/* Card Deck Gallery Grid */}
              {filteredPosts.length === 0 ? (
                <div className="py-20 text-center text-white/40 font-mono text-sm">
                  {isVi ? 'Không tìm thấy thẻ bài hồ sơ phù hợp.' : 'No archive cards found.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
                  {filteredPosts.map((post) => (
                    <div key={post.slug} className="min-h-[420px]">
                      <BlogCard3D
                        post={post}
                        locale={locale}
                        onSelect={() => onSelectPost(post.slug)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer spacer (No VinylTrackSwitcher dock on Blog page) */}
      <footer className="relative z-10 py-3 text-center text-[10px] font-mono text-white/30">
        © 2026 Cuong Nguyen · Digital Library Archive
      </footer>
    </div>
  )
}
```

Now update `src/App.tsx`:
Replace lines 73-96 in `src/App.tsx`:
```tsx
      {isBlog ? (
        <BlogVaultLayout
          locale={preferences.locale}
          activeSlug={activeSlug}
          onLocaleChange={preferences.onLocaleChange}
          onSelectPost={handleSelectPost}
          onNavigateHome={() => handleViewChange('home')}
        />
      ) : (
        <main id="main-content">
          <BentoLayout
            locale={preferences.locale}
            onLocaleChange={preferences.onLocaleChange}
            onViewBlog={() => handleViewChange('blog')}
            devMode={devMode}
            onDevModeChange={setDevMode}
          />
        </main>
      )}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/Blog.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/BlogVaultLayout.tsx src/App.tsx src/Blog.test.tsx
git commit -m "feat(blog): mount BlogVaultLayout with library shelf card vault in App"
```

---

### Task 5: End-to-End Verification & Test Suite Green

**Files:**
- Modify: `src/App.test.tsx` (ensure blog navigation test tests the new Bento Library Vault)
- Test: All tests via `npm test` and build via `npm run build`

- [ ] **Step 1: Check and update `src/App.test.tsx` for blog navigation**

Ensure `src/App.test.tsx` test case "navigates to blog and returns to home" checks for "DIGITAL ARCHIVES" and "Về Portfolio" / "Back to Home".

- [ ] **Step 2: Run all tests**

Run: `npm test`
Expected: All tests pass.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: TypeScript compile and Vite build succeed with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.test.tsx
git commit -m "test(blog): verify end-to-end bento blog navigation flow"
```
