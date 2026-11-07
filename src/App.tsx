import { useEffect, useState } from 'react'
import { usePreferences } from './hooks/usePreferences'
import { BentoLayout } from './components/bento/BentoLayout'
import { BlogPage } from './components/BlogPage'
import { Header } from './components/Header'
import { SubHeader } from './components/SubHeader'
import { content } from './data/content'
import type { BentoTrack } from './data/bentoData'

export default function App() {
  const preferences = usePreferences()
  const c = content[preferences.locale]
  const [devMode, setDevMode] = useState<BentoTrack>('app')

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

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main-content')?.scrollIntoView()
        }}
      >
        {c.skip}
      </a>

      {isBlog ? (
        <>
          <Header
            c={c}
            {...preferences}
            currentView="blog"
            onViewChange={handleViewChange}
          />
          <SubHeader
            locale={preferences.locale}
            devMode={devMode}
            onDevModeChange={setDevMode}
            currentView="blog"
          />
          <main id="main-content">
            <BlogPage
              locale={preferences.locale}
              activeSlug={activeSlug}
              devMode={devMode}
              onSelectPost={handleSelectPost}
              onNavigateHome={() => handleViewChange('home')}
            />
          </main>
        </>
      ) : (
        <main id="main-content">
          <BentoLayout
            locale={preferences.locale}
            onLocaleChange={preferences.setLocale}
            onViewBlog={() => handleViewChange('blog')}
            devMode={devMode}
            onDevModeChange={setDevMode}
          />
        </main>
      )}
    </>
  )
}
