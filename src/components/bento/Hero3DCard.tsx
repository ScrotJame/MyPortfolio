import { useState, useRef, Suspense, lazy } from 'react'
import { Sparkles, Compass } from 'lucide-react'
import type { BentoTrack } from '../../data/bentoData'

// Lazy load Spline to prevent SSR / WebGL blocking
const Spline = lazy(() => import('@splinetool/react-spline'))

interface Hero3DCardProps {
  track: BentoTrack
  locale: 'en' | 'vi'
  splineSceneUrl?: string
}

export function Hero3DCard({ track, locale, splineSceneUrl }: Hero3DCardProps) {
  const isApp = track === 'app'
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [splineFailed, setSplineFailed] = useState(!splineSceneUrl)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Calculate rotation angles (max +/- 25 degrees)
    const rotateX = (-y / (rect.height / 2)) * 25
    const rotateY = (x / (rect.width / 2)) * 25
    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-between h-full min-h-[460px] lg:min-h-[540px] bg-[#121214]/90 border border-white/10 rounded-[28px] p-6 overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300"
    >
      {/* Top Ambient Aura Glow */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-64 blur-3xl pointer-events-none transition-all duration-700 opacity-60 group-hover:opacity-90 ${
          isApp
            ? 'bg-gradient-to-b from-emerald-500/30 via-cyan-500/20 to-transparent'
            : 'bg-gradient-to-b from-purple-500/35 via-amber-500/20 to-transparent'
        }`}
      />

      {/* Dot Matrix Background */}
      <div className="absolute inset-0 dot-matrix-bg opacity-40 pointer-events-none" />

      {/* Top Controls / Meta Pill */}
      <div className="flex items-center justify-between z-10 w-full">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-white/70">
          <span
            className={`w-2 h-2 rounded-full ${
              isApp ? 'bg-cyan-400' : 'bg-purple-400'
            } animate-pulse`}
          />
          <span>{isApp ? 'TRACK // 01 · APP ENGINE' : 'TRACK // 02 · GAME ENGINE'}</span>
        </div>

        <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
          3D INTERACTIVE
        </div>
      </div>

      {/* Center 3D Digital Pass Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 min-h-[280px]">
        {splineSceneUrl && !splineFailed ? (
          <Suspense fallback={<FallbackDigitalPass rotate={rotate} isHovered={isHovered} isApp={isApp} />}>
            <div className="w-full h-full absolute inset-0">
              <Spline
                scene={splineSceneUrl}
                onError={() => setSplineFailed(true)}
              />
            </div>
          </Suspense>
        ) : (
          <FallbackDigitalPass rotate={rotate} isHovered={isHovered} isApp={isApp} />
        )}
      </div>

      {/* Bottom Status & Instructions */}
      <div className="flex flex-col items-center text-center z-10 pt-2 border-t border-white/[0.06]">
        <h2 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
          <span>Digital Pass</span>
          <Sparkles size={14} className={isApp ? 'text-emerald-400' : 'text-purple-400'} />
        </h2>
        <p className="text-[11px] text-white/40 font-medium mt-0.5">
          {locale === 'en' ? 'Move cursor to rotate & interact' : 'Rê chuột để xoay và tương tác'}
        </p>
      </div>
    </article>
  )
}

function FallbackDigitalPass({
  rotate,
  isHovered,
  isApp
}: {
  rotate: { x: number; y: number }
  isHovered: boolean
  isApp: boolean
}) {
  return (
    <div
      className="relative w-48 sm:w-56 h-72 sm:h-80 select-none cursor-grab active:cursor-grabbing transition-transform duration-150 ease-out"
      style={{
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D Lanyard Clip Top */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-7 bg-neutral-800 border border-white/20 rounded-md flex items-center justify-center shadow-lg z-20">
        <div className="w-4 h-2 bg-neutral-950 rounded-sm border border-white/10" />
      </div>

      {/* Main Glass Pass Body */}
      <div
        className={`w-full h-full rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl border transition-all duration-300 shadow-2xl ${
          isApp
            ? 'bg-gradient-to-br from-neutral-900/90 via-neutral-950/95 to-[#0b1b15]/90 border-emerald-500/30 shadow-[0_20px_50px_rgba(16,185,129,0.15)]'
            : 'bg-gradient-to-br from-neutral-900/90 via-neutral-950/95 to-[#1a0f26]/90 border-purple-500/30 shadow-[0_20px_50px_rgba(168,85,247,0.15)]'
        }`}
      >
        {/* Holographic Specular Sheen Reflection */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
          style={{
            background: isHovered
              ? `linear-gradient(${105 + rotate.y * 2}deg, transparent 20%, rgba(255, 255, 255, 0.25) 50%, transparent 80%)`
              : 'none'
          }}
        />

        {/* Top of pass: Chip and Hologram */}
        <div className="flex items-center justify-between z-10">
          <div className="w-8 h-6 rounded bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
            <div className="w-5 h-3 border border-amber-400/60 rounded-xs" />
          </div>
          <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
            NFC · PASS
          </span>
        </div>

        {/* Center of pass: Monogram / Hologram Symbol */}
        <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center border transition-colors duration-500 mb-2 ${
              isApp
                ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-purple-500/10 border-purple-400/40 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
            }`}
          >
            <Compass size={28} className="animate-spin-slow" />
          </div>
          <div className="text-xs font-black tracking-wider text-white uppercase">
            CUONG NGUYEN
          </div>
          <div className="text-[10px] text-white/60 font-mono mt-0.5">
            {isApp ? 'MOBILE · WEB · AI' : 'GAME · UNITY · 3D'}
          </div>
        </div>

        {/* Bottom of pass: Barcode lines */}
        <div className="z-10 pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-1 h-5 items-end">
            <span className="w-0.5 h-full bg-white/40" />
            <span className="w-1 h-full bg-white/60" />
            <span className="w-0.5 h-4 bg-white/30" />
            <span className="w-1.5 h-full bg-white/70" />
            <span className="w-0.5 h-3 bg-white/40" />
            <span className="w-1 h-full bg-white/50" />
            <span className="w-0.5 h-full bg-white/60" />
          </div>
          <span className="text-[9px] font-mono text-white/40">#2026-PASS</span>
        </div>
      </div>
    </div>
  )
}

