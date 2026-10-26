import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import type { Copy, Locale, Theme } from '../data/content'

export function Header({ c, locale, setLocale, theme, setTheme, currentView = 'home', onViewChange }: {
  c: Copy; locale: Locale; setLocale: (locale: Locale) => void; theme: Theme; setTheme: (theme: Theme) => void
  currentView?: 'home' | 'blog'; onViewChange?: (view: 'home' | 'blog') => void
}) {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return <header className="site-header">
    <div className="container header-inner">
      <a className="brand-link" href="#home" aria-label={c.home} onClick={() => onViewChange?.('home')}><img className="brand-icon" src={`${import.meta.env.BASE_URL}icons_svg/logo.svg`} alt="" width="36" height="36" /><span className="wordmark">cuong<span>.</span><span className="wordmark-note">NGUYEN</span></span></a>
      <nav className="desktop-nav" aria-label={locale === 'en' ? 'Main navigation' : 'Điều hướng chính'}>
        {(['about', 'expertise', 'projects', 'experience'] as const).map(id => (
          <a key={id} href={`#${id}`} onClick={() => onViewChange?.('home')}>{c.nav[id]}</a>
        ))}
      </nav>
      <div className="header-tools">
        <div className="view-switch" role="group" aria-label={locale === 'en' ? 'Page navigation' : 'Chuyển trang'}>
          <button
            type="button"
            aria-pressed={currentView !== 'blog'}
            onClick={() => onViewChange?.('home')}
          >
            {locale === 'en' ? 'Portfolio' : 'Trang chủ'}
          </button>
          <button
            type="button"
            aria-pressed={currentView === 'blog'}
            onClick={() => onViewChange?.('blog')}
          >
            Blog
          </button>
        </div>
        <div className="language-switch" role="group" aria-label={locale === 'en' ? 'Language' : 'Ngôn ngữ'}>
          <button aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button><span aria-hidden="true">/</span>
          <button aria-label="Tiếng Việt" aria-pressed={locale === 'vi'} onClick={() => setLocale('vi')}>VI</button>
        </div>
        <button className="icon-button theme-button" aria-label={theme === 'light' ? c.themeDark : c.themeLight} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
        </button>
        <a className="header-contact" href="#contact" onClick={() => onViewChange?.('home')}>{c.nav.contact}<ArrowUpRight size={15} aria-hidden="true" /></a>
        <button ref={toggle} className="icon-button menu-toggle" aria-label={open ? c.closeMenu : c.openMenu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label={locale === 'en' ? 'Mobile navigation' : 'Điều hướng di động'}>
      <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', marginBottom: '12px' }}>
        <div className="view-switch" style={{ width: '100%', justifyContent: 'center' }}>
          <button
            type="button"
            style={{ flex: 1, textAlign: 'center', padding: '8px 12px' }}
            aria-pressed={currentView !== 'blog'}
            onClick={() => { onViewChange?.('home'); setOpen(false); }}
          >
            {locale === 'en' ? 'Portfolio' : 'Trang chủ'}
          </button>
          <button
            type="button"
            style={{ flex: 1, textAlign: 'center', padding: '8px 12px' }}
            aria-pressed={currentView === 'blog'}
            onClick={() => { onViewChange?.('blog'); setOpen(false); }}
          >
            Blog
          </button>
        </div>
      </div>
      {Object.entries(c.nav).map(([id, text]) => (
        <a key={id} href={`#${id}`} onClick={() => { onViewChange?.('home'); setOpen(false); }}>{text}<ArrowUpRight size={16} aria-hidden="true" /></a>
      ))}
    </nav>
  </header>
}
