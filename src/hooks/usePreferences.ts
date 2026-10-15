import { useEffect, useState } from 'react'
import type { Locale, Theme } from '../data/content'

function readPreference(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

export function usePreferences() {
  const [locale, setLocale] = useState<Locale>(() => readPreference('portfolio-locale') === 'vi' ? 'vi' : 'en')
  const [theme, setTheme] = useState<Theme>(() => readPreference('portfolio-theme') === 'dark' ? 'dark' : 'light')

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = locale === 'en' ? 'Cuong Nguyen — Software Engineer' : 'Nguyễn Sỹ Mạnh Cường — Kỹ sư phần mềm'
    const description = locale === 'en'
      ? 'Nguyen Sy Manh Cuong — Software Engineer building mobile and web experiences with Flutter, React, and AI integrations.'
      : 'Portfolio Nguyễn Sỹ Mạnh Cường — Kỹ sư phần mềm phát triển ứng dụng di động, web và tích hợp AI.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    try { localStorage.setItem('portfolio-locale', locale) } catch { /* Preferences are optional. */ }
  }, [locale])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#191a19' : '#faf9f6')
    try { localStorage.setItem('portfolio-theme', theme) } catch { /* Keep the current session usable. */ }
  }, [theme])

  return { locale, setLocale, theme, setTheme }
}
