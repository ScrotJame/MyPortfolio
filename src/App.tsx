import { useEffect, useState } from 'react'
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

export default function App() {
  const preferences = usePreferences()
  const c = content[preferences.locale]
  const [currentHash, setCurrentHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''))
  const [devMode, setDevMode] = useState<DevMode>('app')

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const isBlog = currentHash.startsWith('#/blog') || currentHash === '#blog'
  const activeSlug = currentHash.startsWith('#/blog/') ? currentHash.replace('#/blog/', '') : null

  const handleViewChange = (view: 'home' | 'blog') => {
    if (view === 'blog') {
      window.location.hash = '#/blog'
    } else {
      window.location.hash = '#home'
    }
  }

  const handleSelectPost = (slug: string | null) => {
    if (slug) {
      window.location.hash = `#/blog/${slug}`
    } else {
      window.location.hash = '#/blog'
    }
  }

  return <>
    <a className="skip-link" href="#main-content">{c.skip}</a>
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

