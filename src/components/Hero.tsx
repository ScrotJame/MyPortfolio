import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Atom, Code2, Download, Sparkles } from 'lucide-react'
import { Github, Linkedin } from './SocialIcons'
import { profile } from '../data/content'
import type { Copy } from '../data/content'

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export function Hero({ c }: { c: Copy }) {
  const heroArtRef = useRef<HTMLDivElement>(null)
  const orbitOneRef = useRef<HTMLDivElement>(null)
  const orbitTwoRef = useRef<HTMLDivElement>(null)
  const flutterRef = useRef<HTMLDivElement>(null)
  const reactRef = useRef<HTMLDivElement>(null)
  const isOrbitingRef = useRef(false)
  const [isOrbiting, setIsOrbiting] = useState(false)
  const animFrameId = useRef<number | null>(null)

  const triggerOrbit = useCallback(() => {
    if (isOrbitingRef.current) return
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const heroArt = heroArtRef.current
    const flutterEl = flutterRef.current
    const reactEl = reactRef.current
    if (!heroArt || !flutterEl || !reactEl) return

    isOrbitingRef.current = true
    setIsOrbiting(true)

    const w = heroArt.clientWidth
    const orbitOne = orbitOneRef.current
    const orbitTwo = orbitTwoRef.current

    const r1 = orbitOne && orbitOne.offsetWidth > 0 ? orbitOne.offsetWidth / 2 : w * 0.475
    const r2 = orbitTwo && orbitTwo.offsetWidth > 0 ? orbitTwo.offsetWidth / 2 : w * 0.525

    const s1 = 0.89
    const a1 = -25 * Math.PI / 180
    const phi0_1 = 240 * Math.PI / 180

    const s2 = 0.71
    const a2 = 29 * Math.PI / 180
    const phi0_2 = 355 * Math.PI / 180

    const calcPos = (r: number, s: number, a: number, phi: number) => {
      const u = r * Math.cos(phi)
      const v = r * s * Math.sin(phi)
      return {
        x: u * Math.cos(a) - v * Math.sin(a),
        y: u * Math.sin(a) + v * Math.cos(a),
      }
    }

    const p0_1 = calcPos(r1, s1, a1, phi0_1)
    const p0_2 = calcPos(r2, s2, a2, phi0_2)

    const startTime = performance.now()
    const duration = 2600

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      const phi1 = phi0_1 + ease * 2 * Math.PI
      const phi2 = phi0_2 + ease * 2 * Math.PI

      const cur1 = calcPos(r1, s1, a1, phi1)
      const cur2 = calcPos(r2, s2, a2, phi2)

      const dx1 = cur1.x - p0_1.x
      const dy1 = cur1.y - p0_1.y
      const rot1 = -7 + 10 * Math.sin(ease * 2 * Math.PI)

      const dx2 = cur2.x - p0_2.x
      const dy2 = cur2.y - p0_2.y
      const rot2 = 8 + 10 * Math.sin(ease * 2 * Math.PI)

      flutterEl.style.transform = `translate3d(${dx1.toFixed(2)}px, ${dy1.toFixed(2)}px, 0) rotate(${rot1.toFixed(2)}deg)`
      reactEl.style.transform = `translate3d(${dx2.toFixed(2)}px, ${dy2.toFixed(2)}px, 0) rotate(${rot2.toFixed(2)}deg)`

      if (progress < 1) {
        animFrameId.current = requestAnimationFrame(step)
      } else {
        flutterEl.style.transform = ''
        reactEl.style.transform = ''
        isOrbitingRef.current = false
        setIsOrbiting(false)
        animFrameId.current = null
      }
    }

    animFrameId.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current)
      }
    }
  }, [])

  return <section id="home" className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="tiny-star" aria-hidden="true">✳</span>{c.hello}</p>
      <p className="hero-role">{c.role}</p>
      <h1 id="hero-title">{c.hero[0]}{' '}<br /><span className="hero-middle">{c.hero[1]} <ArrowDownRight aria-hidden="true" /></span>{' '}<br /><span className="hero-accent">{c.hero[2]}</span></h1>
      <p className="hero-intro">{c.intro}</p>
      <div className="hero-actions flex flex-wrap items-center gap-3">
        <a className="button button-primary" href="#projects">{c.viewWork}<ArrowUpRight size={19} aria-hidden="true" /></a>
        <a
          className="button button-outline"
          href={`${import.meta.env.BASE_URL}cv/Nguyen_Sy_Manh_Cuong_CV_Flutter.pdf`}
          download="Nguyen_Sy_Manh_Cuong_CV_Flutter.pdf"
          target="_blank"
          rel="noreferrer"
        >
          {c.download}
          <Download size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="hero-socials">
        <span className="short-rule" aria-hidden="true" />
        <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={20} aria-hidden="true" /></a>
        <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={19} aria-hidden="true" /></a>
        <span className="social-note">{c.discFocus}</span>
      </div>
    </div>
    <div
      ref={heroArtRef}
      className={`hero-art ${isOrbiting ? 'is-orbiting' : ''}`}
      aria-hidden="true"
      onMouseEnter={triggerOrbit}
      onClick={triggerOrbit}
    >
      <div ref={orbitOneRef} className="orbit orbit-one" />
      <div ref={orbitTwoRef} className="orbit orbit-two" />
      <div className="hero-disc portrait-disc">
        <div className="disc-grid" />
        <span className="disc-top">{c.discRoles}</span>
        <span className="monogram">mc<span>.</span></span>
        <span className="disc-bottom">NGUYỄN SỸ MẠNH CƯỜNG</span>
        <img
          className="hero-portrait"
          src={`${import.meta.env.BASE_URL}images/avatar.jpg`}
          alt=""
          width="640"
          height="640"
          fetchPriority="high"
          onError={event => { event.currentTarget.hidden = true }}
        />
      </div>
      <div ref={flutterRef} className="float-tag tag-flutter">
        <Code2 size={21} />
        <span>Flutter <span className="tag-sub">+ Dart</span></span>
      </div>
      <div ref={reactRef} className="float-tag tag-react">
        <Atom size={25} />
        <span>React <span className="tag-sub">+ TypeScript</span></span>
      </div>
      <div className="float-note"><Sparkles size={16} /><span>{c.heroNote}</span></div>
      <span className="art-cross cross-one">+</span><span className="art-cross cross-two">+</span>
      <span className="coordinate">21.0285° N · 105.8542° E</span>
    </div>
    <a className="scroll-note" href="#about"><span className="scroll-circle"><ArrowDown size={16} aria-hidden="true" /></span>{c.scroll}</a>
  </section>
}
