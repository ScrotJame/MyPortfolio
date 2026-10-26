import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, Home, Menu, Moon, Sun, X } from 'lucide-react'
import type { Copy, Locale, Theme } from '../data/content'

export function Header({
  c,
  locale,
  setLocale,
  theme,
  setTheme,
  currentView = 'home',
  onViewChange,
}: {
  c: Copy
  locale: Locale
  setLocale: (locale: Locale) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  currentView?: 'home' | 'blog'
  onViewChange?: (view: 'home' | 'blog') => void
}) {
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const drawerToggle = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)

  // Close mobile nav on escape
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  // Close left drawer on outside click or escape
  useEffect(() => {
    if (!drawerOpen) return
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        drawerToggle.current &&
        !drawerToggle.current.contains(event.target as Node)
      ) {
        setDrawerOpen(false)
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false)
        drawerToggle.current?.focus()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [drawerOpen])

  return (
    <>
      {/* Left sliding sidebar drawer (no backdrop blur) */}
      <aside
        ref={drawerRef}
        className={`left-sidebar-drawer ${drawerOpen ? 'open' : ''}`}
        aria-label={locale === 'en' ? 'Spaces' : 'Không gian trang'}
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-header">
          <div className="drawer-brand">
            <span className="eyebrow">{locale === 'en' ? 'SPACES' : 'KHÔNG GIAN'}</span>
            <span className="drawer-subtitle">
              {locale === 'en' ? 'Switch view' : 'Chuyển không gian'}
            </span>
          </div>
          <button
            type="button"
            className="icon-button drawer-close-btn"
            aria-label={locale === 'en' ? 'Close menu' : 'Đóng menu'}
            onClick={() => setDrawerOpen(false)}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav className="drawer-nav">
          <button
            type="button"
            className={`drawer-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => {
              onViewChange?.('home')
              setDrawerOpen(false)
            }}
          >
            <div className="drawer-item-icon">
              <Home size={18} aria-hidden="true" />
            </div>
            <div className="drawer-item-text">
              <strong className="drawer-item-title">Portfolio</strong>
              <small className="drawer-item-desc">
                {locale === 'en' ? 'Profile & Selected Work' : 'Hồ sơ năng lực & Dự án'}
              </small>
            </div>
            {currentView === 'home' && <span className="drawer-active-dot" aria-hidden="true" />}
          </button>

          <button
            type="button"
            className={`drawer-item ${currentView === 'blog' ? 'active' : ''}`}
            onClick={() => {
              onViewChange?.('blog')
              setDrawerOpen(false)
            }}
          >
            <div className="drawer-item-icon">
              <BookOpen size={18} aria-hidden="true" />
            </div>
            <div className="drawer-item-text">
              <strong className="drawer-item-title">Blog</strong>
              <small className="drawer-item-desc">
                {locale === 'en' ? 'App & Game Reviews' : 'Cảm nghĩ & Review App / Game'}
              </small>
            </div>
            {currentView === 'blog' && <span className="drawer-active-dot" aria-hidden="true" />}
          </button>
        </nav>

        <div className="drawer-footer">
          <p className="drawer-footer-author">Nguyễn Sỹ Mạnh Cường</p>
          <p className="drawer-footer-role">
            {locale === 'en' ? 'Software Engineer' : 'Kỹ sư phần mềm'}
          </p>
        </div>
      </aside>

      <header className="site-header">
        <div className="container header-inner">
          <div className="header-left-cluster">
            {/* List Icon at left corner */}
            <button
              ref={drawerToggle}
              type="button"
              className="icon-button left-drawer-btn"
              aria-label={locale === 'en' ? 'Open navigation menu' : 'Mở menu danh mục'}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <img
                src={`${import.meta.env.BASE_URL}icons_svg/list_svg.svg`}
                alt=""
                width="20"
                height="20"
                className="left-drawer-svg-icon"
              />
            </button>

            <a
              className="brand-link"
              href="#home"
              aria-label={c.home}
              onClick={() => onViewChange?.('home')}
            >
              <img
                className="brand-icon"
                src={`${import.meta.env.BASE_URL}icons_svg/logo.svg`}
                alt=""
                width="36"
                height="36"
              />
              <span className="wordmark">
                cuong<span>.</span>
                <span className="wordmark-note">NGUYEN</span>
              </span>
            </a>
          </div>

          <nav
            className="desktop-nav"
            aria-label={locale === 'en' ? 'Main navigation' : 'Điều hướng chính'}
          >
            {(['about', 'expertise', 'projects', 'experience'] as const).map((id) => (
              <a key={id} href={`#${id}`} onClick={() => onViewChange?.('home')}>
                {c.nav[id]}
              </a>
            ))}
          </nav>

          <div className="header-tools">
            <div
              className="language-switch"
              role="group"
              aria-label={locale === 'en' ? 'Language' : 'Ngôn ngữ'}
            >
              <button
                aria-label="English"
                aria-pressed={locale === 'en'}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                aria-label="Tiếng Việt"
                aria-pressed={locale === 'vi'}
                onClick={() => setLocale('vi')}
              >
                VI
              </button>
            </div>
            <button
              className="icon-button theme-button"
              aria-label={theme === 'light' ? c.themeDark : c.themeLight}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? (
                <Moon size={18} aria-hidden="true" />
              ) : (
                <Sun size={18} aria-hidden="true" />
              )}
            </button>
            <a className="header-contact" href="#contact" onClick={() => onViewChange?.('home')}>
              {c.nav.contact}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              ref={toggle}
              className="icon-button menu-toggle"
              aria-label={open ? c.closeMenu : c.openMenu}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className="mobile-nav"
          hidden={!open}
          aria-label={locale === 'en' ? 'Mobile navigation' : 'Điều hướng di động'}
        >
          {Object.entries(c.nav).map(([id, text]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => {
                onViewChange?.('home')
                setOpen(false)
              }}
            >
              {text}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </header>
    </>
  )
}
