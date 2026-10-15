import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import type { Copy, Locale, Theme } from '../data/content'

export function Header({ c, locale, setLocale, theme, setTheme }: {
  c: Copy; locale: Locale; setLocale: (locale: Locale) => void; theme: Theme; setTheme: (theme: Theme) => void
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
      <a className="brand-link" href="#home" aria-label={c.home}><img className="brand-icon" src={`${import.meta.env.BASE_URL}icons_svg/logo.svg`} alt="" width="36" height="36" /><span className="wordmark">cuong<span>.</span><span className="wordmark-note">NGUYEN</span></span></a>
      <nav className="desktop-nav" aria-label={locale === 'en' ? 'Main navigation' : 'Điều hướng chính'}>
        {(['about', 'expertise', 'projects', 'experience'] as const).map(id => <a key={id} href={`#${id}`}>{c.nav[id]}</a>)}
      </nav>
      <div className="header-tools">
        <div className="language-switch" role="group" aria-label={locale === 'en' ? 'Language' : 'Ngôn ngữ'}>
          <button aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button><span aria-hidden="true">/</span>
          <button aria-label="Tiếng Việt" aria-pressed={locale === 'vi'} onClick={() => setLocale('vi')}>VI</button>
        </div>
        <button className="icon-button theme-button" aria-label={theme === 'light' ? c.themeDark : c.themeLight} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
        </button>
        <a className="header-contact" href="#contact">{c.nav.contact}<ArrowUpRight size={15} aria-hidden="true" /></a>
        <button ref={toggle} className="icon-button menu-toggle" aria-label={open ? c.closeMenu : c.openMenu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label={locale === 'en' ? 'Mobile navigation' : 'Điều hướng di động'}>
      {Object.entries(c.nav).map(([id, text]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{text}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
    </nav>
  </header>
}
