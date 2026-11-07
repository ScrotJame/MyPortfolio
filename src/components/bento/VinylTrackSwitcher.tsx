import { Disc3, Music2 } from 'lucide-react'
import type { BentoTrack } from '../../data/bentoData'

interface VinylTrackSwitcherProps {
  currentTrack: BentoTrack
  onTrackChange: (track: BentoTrack) => void
  locale: 'en' | 'vi'
}

export function VinylTrackSwitcher({ currentTrack, onTrackChange, locale }: VinylTrackSwitcherProps) {
  const isApp = currentTrack === 'app'
  const nextTrack: BentoTrack = isApp ? 'game' : 'app'

  const handleToggle = () => {
    onTrackChange(nextTrack)
  }

  const tooltipText = locale === 'en'
    ? `Switch to ${isApp ? 'Game Dev' : 'App Dev'} Track`
    : `Chuyển sang bản nhạc ${isApp ? 'Game Dev' : 'App Dev'}`

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-[9px] uppercase font-bold tracking-widest text-white/40">
          {locale === 'en' ? 'Now Spinning' : 'Đang phát'}
        </span>
        <span className="text-[11px] font-semibold text-white/80">
          {isApp ? 'App · Mobile & AI' : 'Game · 3D & Physics'}
        </span>
      </div>

      <button
        type="button"
        role="button"
        aria-label="Switch track between App and Game"
        title={tooltipText}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleToggle()
          }
        }}
        className={`group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full cursor-pointer p-0.5 transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          isApp
            ? 'border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] focus-visible:ring-emerald-400'
            : 'border-2 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.35)] focus-visible:ring-purple-400'
        }`}
      >
        {/* Vinyl Disc Body with concentric groove lines */}
        <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden animate-spin-slow">
          {/* Concentric Groove SVG Mock */}
          <svg
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="41" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="36" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="31" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="26" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="21" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          </svg>

          {/* Vinyl Vinyl Vinyl Sheen Shimmer Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

          {/* Center Label (Spindle Hub) */}
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex flex-col items-center justify-center transition-colors duration-500 z-10 ${
              isApp
                ? 'bg-emerald-500 text-black shadow-inner shadow-emerald-700'
                : 'bg-purple-500 text-white shadow-inner shadow-purple-800'
            }`}
          >
            {isApp ? (
              <Disc3 size={11} className="animate-spin" />
            ) : (
              <Music2 size={11} className="animate-pulse" />
            )}
            <span className="text-[6px] font-black uppercase tracking-tighter leading-none mt-0.5">
              {isApp ? 'APP' : 'GAME'}
            </span>
          </div>
        </div>

        {/* Outer Glow Pulse Effect on Hover */}
        <div
          className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
            isApp ? 'bg-emerald-400/20 blur-md' : 'bg-purple-400/20 blur-md'
          }`}
        />
      </button>
    </div>
  )
}
