import { ArrowDown, ArrowDownRight, ArrowUpRight, Atom, Code2, Download, Sparkles } from 'lucide-react'
import { Github, Linkedin } from './SocialIcons'
import { profile } from '../data/content'
import type { Copy } from '../data/content'

export function Hero({ c }: { c: Copy }) {
  return <section id="home" className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="tiny-star" aria-hidden="true">✳</span>{c.hello}</p>
      <p className="hero-role">{c.role}</p>
      <h1 id="hero-title">{c.hero[0]}{' '}<br /><span className="hero-middle">{c.hero[1]} <ArrowDownRight aria-hidden="true" /></span>{' '}<br /><span className="hero-accent">{c.hero[2]}</span></h1>
      <p className="hero-intro">{c.intro}</p>
      <div className="hero-actions flex flex-wrap items-center gap-3">
        <a className="button button-primary" href="#projects">{c.viewWork}<ArrowUpRight size={19} aria-hidden="true" /></a>
        <a className="button button-outline" href={`${import.meta.env.BASE_URL}CV_NguyenSyManhCuong.pdf`} download>{c.download}<Download size={17} aria-hidden="true" /></a>
      </div>
      <div className="hero-socials">
        <span className="short-rule" aria-hidden="true" />
        <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={20} aria-hidden="true" /></a>
        <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={19} aria-hidden="true" /></a>
        <span className="social-note">{c.discFocus}</span>
      </div>
    </div>
    <div className="hero-art" aria-hidden="true">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="hero-disc portrait-disc"><div className="disc-grid" /><span className="disc-top">{c.discRoles}</span><span className="monogram">mc<span>.</span></span><span className="disc-bottom">NGUYỄN SỸ MẠNH CƯỜNG</span><img className="hero-portrait" src={`${import.meta.env.BASE_URL}images/avatar.jpg`} alt="" width="640" height="640" fetchPriority="high" onError={event => { event.currentTarget.hidden = true }} /></div>
      <div className="float-tag tag-flutter"><Code2 size={21} /><span>Flutter <span className="tag-sub">+ Dart</span></span></div>
      <div className="float-tag tag-react"><Atom size={25} /><span>React <span className="tag-sub">+ TypeScript</span></span></div>
      <div className="float-note"><Sparkles size={16} /><span>{c.heroNote}</span></div>
      <span className="art-cross cross-one">+</span><span className="art-cross cross-two">+</span>
      <span className="coordinate">21.0285° N · 105.8542° E</span>
    </div>
    <a className="scroll-note" href="#about"><span className="scroll-circle"><ArrowDown size={16} aria-hidden="true" /></span>{c.scroll}</a>
  </section>
}
