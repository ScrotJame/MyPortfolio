import { Gamepad2, Smartphone } from 'lucide-react'

export type DevMode = 'app' | 'game'

interface SubHeaderProps {
  locale: 'en' | 'vi'
  devMode: DevMode
  onDevModeChange: (mode: DevMode) => void
  currentView?: 'home' | 'blog'
}

export function SubHeader({ locale, devMode, onDevModeChange }: SubHeaderProps) {
  return (
    <div className="sub-header-bar" role="region" aria-label={locale === 'en' ? 'Specialization track' : 'Chuyên môn'}>
      <div className="container sub-header-container">
        <div className="dev-mode-switch" role="group" aria-label={locale === 'en' ? 'Development track' : 'Chế độ chuyên môn'}>
          <button
            type="button"
            className={`dev-mode-pill ${devMode === 'app' ? 'active' : ''}`}
            aria-pressed={devMode === 'app'}
            onClick={() => onDevModeChange('app')}
          >
            <Smartphone size={14} aria-hidden="true" />
            <span>{locale === 'en' ? 'App Dev' : 'App Dev'}</span>
          </button>

          <button
            type="button"
            className={`dev-mode-pill ${devMode === 'game' ? 'active' : ''}`}
            aria-pressed={devMode === 'game'}
            onClick={() => onDevModeChange('game')}
          >
            <Gamepad2 size={14} aria-hidden="true" />
            <span>{locale === 'en' ? 'Game Dev' : 'Game Dev'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
