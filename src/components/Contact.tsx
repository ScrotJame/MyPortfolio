import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { Github, Linkedin } from './SocialIcons'
import { profile } from '../data/content'
import type { Copy } from '../data/content'

export function Contact({ c }: { c: Copy }) {
  return <>
    <section id="contact" className="section container contact-section"><p className="eyebrow">{c.contactLabel}</p><div className="contact-layout"><div><h2>{c.contactTitle}<br /><span>{c.contactAccent}</span><ArrowUpRight className="contact-arrow" aria-hidden="true" /></h2><p className="contact-intro">{c.contactIntro}</p></div><div className="contact-links"><a className="button button-primary contact-cta" href={`mailto:${profile.email}`}><Mail size={19} aria-hidden="true" />{c.emailLabel}<ArrowUpRight size={20} aria-hidden="true" /></a><a className="email-address" href={`mailto:${profile.email}`}>{profile.email}</a><p className="eyebrow elsewhere">{c.elsewhere}</p><div className="flex gap-5"><a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" />GitHub<ArrowUpRight size={15} aria-hidden="true" /></a><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} aria-hidden="true" />LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a></div></div></div></section>
    <footer className="site-footer"><div className="container footer-top"><a className="brand-link" href="home" aria-label={c.home} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}><img className="brand-icon" src={`${import.meta.env.BASE_URL}icons_svg/logo.svg`} alt="" width="36" height="36" /><span className="wordmark">cuong<span>.</span><span className="wordmark-note">NGUYEN</span></span></a><p>{c.footer}</p><a className="back-top" href="home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>{c.backTop}<ArrowUp size={16} aria-hidden="true" /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Nguyễn Sỹ Mạnh Cường</span><span>{c.footerLocation} <span className="footer-dot" aria-hidden="true">●</span></span></div></footer>
  </>
}
