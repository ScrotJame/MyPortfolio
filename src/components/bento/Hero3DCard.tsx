import { useState, useRef, Suspense, lazy } from 'react'
import { Sparkles, Compass, RotateCw, CheckCircle, ShieldCheck } from 'lucide-react'
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
  const [isFlipped, setIsFlipped] = useState(false)
  const [splineFailed, setSplineFailed] = useState(!splineSceneUrl)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Calculate rotation angles (max +/- 22 degrees)
    const rotateX = (-y / (rect.height / 2)) * 22
    const rotateY = (x / (rect.width / 2)) * 22
    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-between h-full min-h-[480px] lg:min-h-[560px] bg-[#121214]/90 border border-white/10 rounded-[28px] p-6 lg:p-7 overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300"
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

      {/* Top Controls / Meta Pill & Flip Button */}
      <div className="flex items-center justify-between z-10 w-full">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-white/70">
          <span
            className={`w-2 h-2 rounded-full ${
              isApp ? 'bg-cyan-400' : 'bg-purple-400'
            } animate-pulse`}
          />
          <span>{isApp ? 'TRACK // 01 · APP ENGINE' : 'TRACK // 02 · GAME ENGINE'}</span>
        </div>

        {/* Quick Flip Toggle Button */}
        <button
          type="button"
          onClick={toggleFlip}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.07] hover:bg-white/[0.15] border border-white/15 text-[11px] font-semibold text-white/90 transition-all active:scale-95 cursor-pointer shadow-sm"
          title={locale === 'en' ? 'Click to flip card' : 'Bấm để lật thẻ 2 mặt'}
        >
          <RotateCw size={12} className={`transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>{isFlipped ? (locale === 'en' ? 'Front' : 'Mặt trước') : (locale === 'en' ? 'Back' : 'Mặt sau')}</span>
        </button>
      </div>

      {/* Center 3D Digital Pass Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 min-h-[320px]">
        {splineSceneUrl && !splineFailed ? (
          <Suspense fallback={<TwoSidedDigitalPass rotate={rotate} isHovered={isHovered} isApp={isApp} isFlipped={isFlipped} onFlip={toggleFlip} locale={locale} />}>
            <div className="w-full h-full absolute inset-0">
              <Spline
                scene={splineSceneUrl}
                onError={() => setSplineFailed(true)}
              />
            </div>
          </Suspense>
        ) : (
          <TwoSidedDigitalPass
            rotate={rotate}
            isHovered={isHovered}
            isApp={isApp}
            isFlipped={isFlipped}
            onFlip={toggleFlip}
            locale={locale}
          />
        )}
      </div>

      {/* Bottom Status & Instructions */}
      <div className="flex flex-col items-center text-center z-10 pt-2 border-t border-white/[0.06]">
        <h2 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
          <span>Digital Pass</span>
          <Sparkles size={14} className={isApp ? 'text-emerald-400' : 'text-purple-400'} />
        </h2>
        <p className="text-[11px] text-white/40 font-medium mt-0.5">
          {locale === 'en'
            ? 'Hover to tilt · Click card to flip 360°'
            : 'Rê chuột để xoay · Nhấp vào thẻ để lật 2 mặt'}
        </p>
      </div>
    </article>
  )
}

interface TwoSidedDigitalPassProps {
  rotate: { x: number; y: number }
  isHovered: boolean
  isApp: boolean
  isFlipped: boolean
  onFlip: () => void
  locale: 'en' | 'vi'
}

function TwoSidedDigitalPass({
  rotate,
  isHovered,
  isApp,
  isFlipped,
  onFlip,
  locale
}: TwoSidedDigitalPassProps) {
  const avatarSrc = `${import.meta.env.BASE_URL}images/avatar.jpg`

  return (
    <div
      onClick={onFlip}
      className="relative w-52 sm:w-60 h-80 sm:h-92 select-none cursor-pointer transition-transform duration-500 ease-out"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg)`
      }}
    >
      {/* 3D Lanyard Clip Top */}
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-7 bg-neutral-800 border border-white/25 rounded-md flex items-center justify-center shadow-lg z-30 pointer-events-none"
        style={{ transform: 'translateZ(15px)' }}
      >
        <div className="w-4 h-2 bg-neutral-950 rounded-sm border border-white/10" />
      </div>

      {/* =========================================================================
          FACE 1: FRONT (MẶT TRƯỚC - AVATAR & PERSONAL IDENTIFIER)
      ========================================================================= */}
      <div
        className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden backdrop-blur-2xl border transition-all duration-300 shadow-2xl ${
          isApp
            ? 'bg-gradient-to-br from-neutral-900/95 via-neutral-950/98 to-[#091f17]/95 border-emerald-500/35 shadow-[0_20px_60px_rgba(16,185,129,0.2)]'
            : 'bg-gradient-to-br from-neutral-900/95 via-neutral-950/98 to-[#1e0e2e]/95 border-purple-500/35 shadow-[0_20px_60px_rgba(168,85,247,0.2)]'
        }`}
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {/* Holographic Specular Sheen Reflection */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
          style={{
            background: isHovered
              ? `linear-gradient(${105 + rotate.y * 2}deg, transparent 20%, rgba(255, 255, 255, 0.22) 50%, transparent 80%)`
              : 'none'
          }}
        />

        {/* Top Header of Face 1 */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-[9px] font-mono text-white/80">
            <span className={`w-1.5 h-1.5 rounded-full ${isApp ? 'bg-emerald-400' : 'bg-purple-400'} animate-ping`} />
            <span>DEV PASS</span>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
            FRONT // 01
          </span>
        </div>

        {/* Center of Face 1: Large Avatar with Holographic Frame */}
        <div className="flex flex-col items-center justify-center my-auto z-10">
          <div
            className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 border-2 transition-all duration-500 shadow-xl ${
              isApp
                ? 'border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.35)]'
                : 'border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.35)]'
            }`}
          >
            <img
              src={avatarSrc}
              alt="Nguyen Sy Manh Cuong"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                // If avatar fails, show sleek monogram
                e.currentTarget.style.display = 'none'
              }}
            />
            {/* Verified badge icon on avatar */}
            <div
              className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
                isApp ? 'bg-emerald-500 text-black' : 'bg-purple-500 text-white'
              }`}
            >
              <CheckCircle size={14} strokeWidth={2.5} />
            </div>
          </div>

          <div className="mt-3 text-center">
            <h3 className="text-sm sm:text-base font-black tracking-wider text-white uppercase">
              CƯỜNG NGUYỄN
            </h3>
            <p className="text-[11px] font-mono text-white/60">
              @cuongnsm
            </p>
          </div>
        </div>

        {/* Bottom of Face 1: Hint to flip */}
        <div className="z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
          <span className="flex items-center gap-1 text-emerald-400">
            <RotateCw size={10} />
            {locale === 'en' ? 'Tap to flip' : 'Chạm để lật'}
          </span>
          <span>#HANOI-VN</span>
        </div>
      </div>

      {/* =========================================================================
          FACE 2: BACK (MẶT SAU - CHỨC DANH, KỸ THUẬT & NFC CHIP)
      ========================================================================= */}
      <div
        className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden backdrop-blur-2xl border transition-all duration-300 shadow-2xl ${
          isApp
            ? 'bg-gradient-to-br from-neutral-900/95 via-neutral-950/98 to-[#091f17]/95 border-emerald-500/35 shadow-[0_20px_60px_rgba(16,185,129,0.2)]'
            : 'bg-gradient-to-br from-neutral-900/95 via-neutral-950/98 to-[#1e0e2e]/95 border-purple-500/35 shadow-[0_20px_60px_rgba(168,85,247,0.2)]'
        }`}
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
        }}
      >
        {/* Holographic Specular Sheen Reflection */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
          style={{
            background: isHovered
              ? `linear-gradient(${105 - rotate.y * 2}deg, transparent 20%, rgba(255, 255, 255, 0.22) 50%, transparent 80%)`
              : 'none'
          }}
        />

        {/* Top of Face 2: NFC Chip & Spec Code */}
        <div className="flex items-center justify-between z-10">
          <div className="w-8 h-6 rounded bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shadow-inner">
            <div className="w-5 h-3 border border-amber-400/70 rounded-xs" />
          </div>
          <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
            ROLE // 02
          </span>
        </div>

        {/* Center of Face 2: Role, Title & Engineering Specs */}
        <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center border transition-colors duration-500 mb-2.5 ${
              isApp
                ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-purple-500/15 border-purple-400/40 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
            }`}
          >
            <Compass size={24} className="animate-spin-slow" />
          </div>

          <div className="text-[10px] uppercase font-mono tracking-widest text-white/50 mb-1">
            {locale === 'en' ? 'PROFESSIONAL TITLE' : 'CHỨC DANH CHUYÊN MÔN'}
          </div>

          <div className="text-sm sm:text-base font-extrabold tracking-wide text-white">
            {isApp
              ? (locale === 'en' ? 'SOFTWARE ENGINEER' : 'KỸ SƯ PHẦN MỀM')
              : (locale === 'en' ? 'GAME DEVELOPER' : 'LẬP TRÌNH VIÊN GAME')}
          </div>

          <div
            className={`text-[10px] font-semibold mt-1 px-2.5 py-0.5 rounded-full border ${
              isApp
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                : 'bg-purple-500/10 text-purple-300 border-purple-500/25'
            }`}
          >
            {isApp ? 'FLUTTER · REACT · AI AGENTS' : 'UNITY · C# · 3D MATH'}
          </div>
        </div>

        {/* Bottom of Face 2: Barcode & Verified Seal */}
        <div className="z-10 pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-1 h-5 items-end">
            <span className="w-0.5 h-full bg-white/40" />
            <span className="w-1 h-full bg-white/60" />
            <span className="w-0.5 h-3.5 bg-white/30" />
            <span className="w-1.5 h-full bg-white/70" />
            <span className="w-0.5 h-2.5 bg-white/40" />
            <span className="w-1 h-full bg-white/50" />
            <span className="w-0.5 h-full bg-white/60" />
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono text-white/50">
            <ShieldCheck size={11} className="text-emerald-400" />
            <span>VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  )
}
