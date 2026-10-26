import { useEffect, useState } from 'react'
import { ArrowUpRight, Smartphone } from 'lucide-react'
import { content } from './data/content'
import { usePreferences } from './hooks/usePreferences'
import { Header } from './components/Header'
import { SubHeader, type DevMode } from './components/SubHeader'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Expertise } from './components/Expertise'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { BlogPage } from './components/BlogPage'
import { UnderConstruction } from './components/UnderConstruction'
import { GameDevPage } from './components/GameDevPage'

// 🔌 PLUG & PLAY CHO GAME DEV:
// false = Đang cắm module UnderConstruction (had_build.svg)
// true  = Tháo UnderConstruction, cắm module GameDevPage (UI thực tế)
export const IS_GAME_DEV_READY = false

export default function App() {
  const preferences = usePreferences()
  const c = content[preferences.locale]
  const [devMode, setDevMode] = useState<DevMode>('app')

  // Extract clean relative path without any leading '#' or base URL
  const getRelativePath = () => {
    if (typeof window === 'undefined') return ''
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    let pathname = window.location.pathname
    if (base && pathname.startsWith(base)) {
      pathname = pathname.slice(base.length)
    }
    pathname = pathname.replace(/^\/+/, '')
    const hash = window.location.hash.replace(/^#\/?/, '')
    return pathname || hash
  }

  const [currentPath, setCurrentPath] = useState(getRelativePath)

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(getRelativePath())
    }
    window.addEventListener('popstate', handleNavigation)
    window.addEventListener('hashchange', handleNavigation)
    return () => {
      window.removeEventListener('popstate', handleNavigation)
      window.removeEventListener('hashchange', handleNavigation)
    }
  }, [])

  const isBlog = currentPath.startsWith('blog')
  const activeSlug = currentPath.startsWith('blog/') ? currentPath.replace(/^blog\//, '') : null

  const handleViewChange = (view: 'home' | 'blog') => {
    const targetUrl = view === 'blog' ? `${import.meta.env.BASE_URL}blog` : import.meta.env.BASE_URL
    window.history.pushState(null, '', targetUrl)
    setCurrentPath(getRelativePath())
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSelectPost = (slug: string | null) => {
    const targetUrl = slug ? `${import.meta.env.BASE_URL}blog/${slug}` : `${import.meta.env.BASE_URL}blog`
    window.history.pushState(null, '', targetUrl)
    setCurrentPath(getRelativePath())
  }

  return <>
    <a
      className="skip-link"
      href="main-content"
      onClick={(e) => {
        e.preventDefault()
        document.getElementById('main-content')?.scrollIntoView()
      }}
    >
      {c.skip}
    </a>
    <Header
      c={c}
      {...preferences}
      currentView={isBlog ? 'blog' : 'home'}
      onViewChange={handleViewChange}
    />
    <SubHeader
      locale={preferences.locale}
      devMode={devMode}
      onDevModeChange={setDevMode}
      currentView={isBlog ? 'blog' : 'home'}
    />
    <main id="main-content">
      {isBlog ? (
        <BlogPage
          locale={preferences.locale}
          activeSlug={activeSlug}
          devMode={devMode}
          onSelectPost={handleSelectPost}
          onNavigateHome={() => handleViewChange('home')}
        />
      ) : devMode === 'game' ? (
        /* 🔌 PLUG & PLAY CHO GAME DEV:
         * - Khi chưa xong: Cắm module <UnderConstruction /> (dùng had_build.svg)
         * - Khi xây xong: Cắm module <GameDevPage />
         */
        !IS_GAME_DEV_READY ? (
          <UnderConstruction
            eyebrow={preferences.locale === 'vi' ? 'KHÔNG GIAN GAME DEVELOPMENT' : 'GAME DEVELOPMENT SPACE'}
            title={preferences.locale === 'vi' ? 'Trang đang được xây dựng' : 'Under Construction'}
            desc={
              preferences.locale === 'vi'
                ? 'Góc chia sẻ các dự án game, sản phẩm Unity và các thử nghiệm đồ họa đang trong quá trình phát triển và hoàn thiện. Hãy quay lại sớm nhé!'
                : 'The showcase for game projects, Unity prototypes, and graphics experiments is currently in the works. Please check back soon!'
            }
            primaryAction={{
              label: preferences.locale === 'vi' ? 'Xem dự án App Dev' : 'Switch to App Dev',
              onClick: () => setDevMode('app'),
              icon: Smartphone,
            }}
            secondaryAction={{
              label: preferences.locale === 'vi' ? 'Đọc review Game trên Blog' : 'Read Game Reviews on Blog',
              onClick: () => handleViewChange('blog'),
              icon: ArrowUpRight,
            }}
          />
        ) : (
          <GameDevPage locale={preferences.locale} />
        )
      ) : (
        <>
          <Hero c={c} />
          <About c={c} />
          <Expertise c={c} />
          <Projects c={c} locale={preferences.locale} />
          <Experience c={c} />
          <Contact c={c} />
        </>
      )}
    </main>
  </>
}
