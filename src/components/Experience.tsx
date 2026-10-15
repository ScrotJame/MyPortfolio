import { ArrowUpRight, GraduationCap } from 'lucide-react'
import type { Copy } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function Experience({ c }: { c: Copy }) {
  return <>
    <section id="experience" className="section container experience-section" aria-label={c.experienceHeading}>
      <div className="experience-layout"><div><SectionHeading label={c.experienceLabel} title={c.experienceTitle} accent={c.experienceAccent} intro={c.experienceIntro} /><span className="experience-flower" aria-hidden="true">✳</span></div>
        <div className="timeline"><h3 className="sr-only">{c.experienceHeading}</h3>{c.experiences.map((experience, i) => <article className="timeline-item" key={experience.company}><span className={`timeline-dot ${i === 0 ? 'is-current' : ''}`} aria-hidden="true" /><div className="timeline-meta"><span>{experience.date}</span>{i === 0 && <span className="current-badge">{c.current}</span>}</div><h4>{experience.company}</h4><p className="timeline-role">{experience.role}</p><p className="body-copy">{experience.description}</p></article>)}</div>
      </div>
    </section>
    <section className="section education-section" id="education"><div className="container"><div className="heading-row"><SectionHeading label={c.educationLabel} title={c.educationTitle} accent={c.educationAccent} /><GraduationCap className="education-icon" size={64} strokeWidth={1} aria-hidden="true" /></div><div className="education-grid"><article className="education-card"><p className="eyebrow">{c.education}</p><h3>{c.university}</h3><p>{c.degree}</p><span className="education-year">2021 — 2025</span><p className="language-note">{c.languages}</p></article><article className="education-card"><p className="eyebrow">{c.certificates}</p><a className="certificate" href="https://coursera.org/share/7f39518521a27a56e6fa3cbafba8e8c2" target="_blank" rel="noreferrer" aria-label={`Google Data Analytics — ${c.certificateView}`}><div><h3>Google Data Analytics</h3><p>Google / Coursera · 2024</p></div><ArrowUpRight size={23} aria-hidden="true" /></a><a className="certificate" href="https://coursera.org/share/c3170c141f6f632d01c2ffb1791e8856" target="_blank" rel="noreferrer" aria-label={`Google Advanced Data Analytics — ${c.certificateView}`}><div><h3>Google Advanced Data Analytics</h3><p>Google / Coursera · 2026</p></div><ArrowUpRight size={23} aria-hidden="true" /></a></article></div></div></section>
  </>
}
