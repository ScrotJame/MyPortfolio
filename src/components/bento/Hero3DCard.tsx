import { useState, useRef, useEffect } from 'react'
import { Sparkles, Compass, RotateCw, CheckCircle } from 'lucide-react'
import type { BentoTrack } from '../../data/bentoData'

interface Hero3DCardProps {
  track: BentoTrack
  locale: 'en' | 'vi'
  splineSceneUrl?: string
  rotate?: { x: number; y: number }
  onRotateChange?: (rotate: { x: number; y: number }) => void
}

export function Hero3DCard({
  track,
  locale,
  rotate: controlledRotate,
  onRotateChange
}: Hero3DCardProps) {
  const isApp = track === 'app'
  const cardRef = useRef<HTMLDivElement>(null)

  // Internal rotation state for responsive 60-120fps animation
  const [rotate, setRotate] = useState(() => controlledRotate ?? { x: 8, y: -12 })
  const [prevControlled, setPrevControlled] = useState(controlledRotate)
  const rotateRef = useRef(rotate)

  if (
    controlledRotate &&
    (controlledRotate.x !== prevControlled?.x || controlledRotate.y !== prevControlled?.y)
  ) {
    setPrevControlled(controlledRotate)
    setRotate(controlledRotate)
  }

  useEffect(() => {
    rotateRef.current = rotate
  }, [rotate])

  const [isHovered, setIsHovered] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const rafId = useRef<number | null>(null)
  const pendingDelta = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 })

  const applyPendingRotation = () => {
    const { dx, dy } = pendingDelta.current
    if (dx !== 0 || dy !== 0) {
      setRotate((prev) => ({
        x: Math.max(-55, Math.min(55, prev.x - dy * 0.55)),
        y: prev.y + dx * 0.85
      }))
      pendingDelta.current = { dx: 0, dy: 0 }
    }
    rafId.current = null
  }

  // Virtual Trackball — Hover & move mouse directly rotates card in 3D without clicking or holding
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true)
    lastPosRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipping) return
    if (!lastPosRef.current) {
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      return
    }

    const deltaX =
      typeof e.movementX === 'number' && e.movementX !== 0
        ? e.movementX
        : e.clientX - lastPosRef.current.x
    const deltaY =
      typeof e.movementY === 'number' && e.movementY !== 0
        ? e.movementY
        : e.clientY - lastPosRef.current.y

    lastPosRef.current = { x: e.clientX, y: e.clientY }

    pendingDelta.current.dx += deltaX
    pendingDelta.current.dy += deltaY

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(applyPendingRotation)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    lastPosRef.current = null
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      applyPendingRotation()
    }
    // Sync final orientation state to parent so it's preserved across vinyl track switches!
    onRotateChange?.(rotateRef.current)
  }

  // Touch screen support for mobile/tablets
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isFlipping || !touchStartRef.current || e.touches.length === 0) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }

    pendingDelta.current.dx += deltaX
    pendingDelta.current.dy += deltaY

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(applyPendingRotation)
    }
  }

  const handleTouchEnd = () => {
    touchStartRef.current = null
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      applyPendingRotation()
    }
    onRotateChange?.(rotateRef.current)
  }

  // Mouse wheel rotation adds momentum to Y axis
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isFlipping) return
    if (Math.abs(e.deltaY) > 5 || Math.abs(e.deltaX) > 5) {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      setRotate((prev) => {
        const next = {
          ...prev,
          y: prev.y + (delta > 0 ? 25 : -25)
        }
        onRotateChange?.(next)
        return next
      })
    }
  }

  // Determine current orientation face
  const normalizedY = ((Math.round(rotate.y) % 360) + 360) % 360
  const isBackFacing = normalizedY > 90 && normalizedY < 270

  const toggleFlip = () => {
    setIsFlipping(true)
    const nextRotate = {
      x: 0,
      y: isBackFacing ? 0 : 180
    }
    setRotate(nextRotate)
    onRotateChange?.(nextRotate)
    setTimeout(() => {
      setIsFlipping(false)
    }, 550)
  }

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="relative flex flex-col justify-between h-full min-h-[480px] lg:min-h-[560px] bg-[#121214]/90 border border-white/10 rounded-[28px] p-6 lg:p-7 overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300 select-none cursor-crosshair will-change-transform"
    >
      {/* Dual Ambient Corner Glows */}
      <div
        className={`absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-50 group-hover:opacity-80 ${isApp ? 'bg-emerald-500/35' : 'bg-purple-500/35'
          }`}
      />
      <div
        className={`absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-40 group-hover:opacity-75 ${isApp ? 'bg-blue-600/30' : 'bg-amber-500/30'
          }`}
      />

      {/* Dot Matrix Background */}
      <div className="absolute inset-0 dot-matrix-bg opacity-45 pointer-events-none" />

      {/* Top Controls / Meta Pill & Quick Flip/Reset Button */}
      <div className="flex items-center justify-between z-10 w-full">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-white/70">
          <span
            className={`w-2 h-2 rounded-full ${isApp ? 'bg-cyan-400' : 'bg-purple-400'
              } animate-pulse`}
          />
          <span>{isApp ? 'TRACK // 01 · APP ENGINE' : 'TRACK // 02 · GAME ENGINE'}</span>
        </div>

      </div>

      {/* Center 3D Digital Pass Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 min-h-[320px]">
        <TwoSidedDigitalPass
          rotate={rotate}
          isHovered={isHovered}
          isFlipping={isFlipping}
          isApp={isApp}
        />
      </div>



    </article>
  )
}

interface TwoSidedDigitalPassProps {
  rotate: { x: number; y: number }
  isHovered: boolean
  isFlipping: boolean
  isApp: boolean
}

function TwoSidedDigitalPass({
  rotate,
  isHovered,
  isFlipping,
  isApp
}: TwoSidedDigitalPassProps) {
  const avatarSrc = `${import.meta.env.BASE_URL}images/avatar.jpg`

  return (
    <div
      className={`relative w-52 sm:w-60 h-80 sm:h-92 select-none pointer-events-none will-change-transform ${isFlipping ? 'transition-transform duration-500 ease-out' : 'transition-none'
        }`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
      }}
    >
      {/* 3D Lanyard Clip Top */}
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-7 bg-neutral-800 border border-white/25 rounded-md flex items-center justify-center shadow-lg z-30 pointer-events-none"
        style={{ transform: 'translateZ(12px)' }}
      >
        <div className="w-4 h-2 bg-neutral-950 rounded-sm border border-white/10" />
      </div>

      {/* 3D Volumetric Side Rim / Core */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-white/10 bg-neutral-950/80 shadow-2xl pointer-events-none"
        style={{
          transform: 'translateZ(0px)',
          boxShadow: isApp
            ? '0 0 30px rgba(16,185,129,0.2), inset 0 0 10px rgba(255,255,255,0.08)'
            : '0 0 30px rgba(168,85,247,0.2), inset 0 0 10px rgba(255,255,255,0.08)'
        }}
      />

      {/* =========================================================================
          FACE 1: FRONT (MẶT TRƯỚC - AVATAR CHIẾM 2/3 PHÍA TRÊN & ĐỊNH DANH)
      ========================================================================= */}
      <div
        className={`absolute inset-0 w-full h-full rounded-2xl flex flex-col justify-between overflow-hidden border transition-colors duration-300 shadow-2xl ${isApp
          ? 'bg-[#0b0c0e] border-emerald-500/35 shadow-[0_20px_60px_rgba(16,185,129,0.2)]'
          : 'bg-[#0b0c0e] border-purple-500/35 shadow-[0_20px_60px_rgba(168,85,247,0.2)]'
          }`}
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(5px)'
        }}
      >
        {/* Holographic Specular Sheen Reflection */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 ${isHovered ? 'opacity-35' : 'opacity-10'
            } bg-gradient-to-tr from-transparent via-white/15 to-transparent`}
        />

        {/* Top 2/3: Expansive Avatar Photo Section */}
        <div className="relative w-full h-[66%] overflow-hidden bg-neutral-900">
          <img
            src={avatarSrc}
            alt="Nguyen Sy Manh Cuong"
            className="w-full h-full object-cover object-top filter contrast-[1.05]"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />

          {/* Top Header Tags over photo */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[9px] font-mono text-white/90 shadow-sm">
              <span className={`w-1.5 h-1.5 rounded-full ${isApp ? 'bg-emerald-400' : 'bg-purple-400'} animate-ping`} />
              <span>PASS // 01</span>
            </div>
            <span className="text-[9px] font-mono font-bold tracking-wider text-white/80 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10 uppercase">
              DEV PASS
            </span>
          </div>

          {/* Bottom gradient fade into lower info section */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/60 to-transparent pointer-events-none" />

          {/* Verified Badge on bottom-right of photo */}
          <div
            className={`absolute bottom-2.5 right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-lg border border-white/20 z-10 ${isApp ? 'bg-emerald-500 text-black' : 'bg-purple-500 text-white'
              }`}
          >
            <CheckCircle size={14} strokeWidth={2.5} />
          </div>
        </div>

        {/* Bottom 1/3: Identity & Role Specs */}
        <div className="h-[34%] p-3.5 sm:p-4 flex flex-col justify-between bg-[#0b0c0e] relative z-10">
          <div>
            <h3 className="text-sm sm:text-base font-black tracking-wider text-white uppercase leading-tight">
              CƯỜNG NGUYỄN
            </h3>
            <p className="text-[11px] font-mono text-white/60 mt-0.5 flex items-center gap-1.5">
              <span className={isApp ? 'text-emerald-400 font-semibold' : 'text-purple-400 font-semibold'}>
                @cuongnsm
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/50">{isApp ? 'Mobile & AI' : 'Game & 3D'}</span>
            </p>
          </div>

          {/* Bottom Metas */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
            <span className="font-semibold text-emerald-400/90 tracking-wider">#VERIFIED</span>
            <span className="text-white/40">#HANOI-VN</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FACE 2: BACK (MẶT SAU - CHỨC DANH, KỸ THUẬT & NFC CHIP)
      ========================================================================= */}
      <div
        className={`absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden border transition-colors duration-300 shadow-2xl ${isApp
          ? 'bg-gradient-to-br from-[#121316] via-[#090a0c] to-[#091f17] border-emerald-500/35 shadow-[0_20px_60px_rgba(16,185,129,0.2)]'
          : 'bg-gradient-to-br from-[#121316] via-[#090a0c] to-[#1e0e2e] border-purple-500/35 shadow-[0_20px_60px_rgba(168,85,247,0.2)]'
          }`}
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg) translateZ(5px)'
        }}
      >
        {/* Holographic Specular Sheen Reflection */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-35' : 'opacity-10'
            } bg-gradient-to-tr from-transparent via-white/15 to-transparent`}
        />

        {/* Top of Face 2: NFC Chip & Spec Code */}
        <div className="flex items-center justify-between z-10">
          <div className="w-8 h-6 rounded bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shadow-inner">
            <div className="w-5 h-3.5 border border-amber-300/60 rounded-xs grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-amber-300/40 rounded-xs" />
              <div className="bg-amber-300/40 rounded-xs" />
            </div>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
            NFC · PASS
          </span>
        </div>

        {/* Center of Face 2: Luminous Monogram Emblem */}
        <div className="flex flex-col items-center justify-center my-auto z-10">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500 shadow-xl ${isApp
              ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
              : 'bg-purple-500/10 border-purple-400/40 text-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)]'
              }`}
          >
            <Compass size={28} className="animate-pulse" />
          </div>

          <div className="mt-3.5 text-center">
            <h3 className="text-sm sm:text-base font-black tracking-wider text-white uppercase">
              CUONG NGUYEN
            </h3>
            <p className="text-[10px] font-mono tracking-widest text-white/60 uppercase mt-0.5">
              {isApp ? 'SOFTWARE ENGINEER' : 'GAME DEVELOPER'}
            </p>
            <p className="text-[9px] font-mono text-white/40 mt-1">
              {isApp ? 'MOBILE · WEB · AI' : '3D · ENGINE · PHYSICS'}
            </p>
          </div>
        </div>

        {/* Bottom of Face 2: Barcode & Pass Serial */}
        <div className="z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
          {/* Barcode Graphic */}
          <div className="flex items-center gap-[2px] h-3.5 opacity-70">
            <span className="w-0.5 h-full bg-white" />
            <span className="w-1 h-full bg-white" />
            <span className="w-[1px] h-full bg-white" />
            <span className="w-1.5 h-full bg-white" />
            <span className="w-0.5 h-full bg-white" />
            <span className="w-1 h-full bg-white" />
            <span className="w-[1px] h-full bg-white" />
            <span className="w-0.5 h-full bg-white" />
          </div>
          <span className="font-semibold tracking-wider">#2026-PASS</span>
        </div>
      </div>
    </div>
  )
}
