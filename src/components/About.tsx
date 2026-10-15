import { ArrowUpRight, Braces, MapPin } from 'lucide-react'
import { skills } from '../data/content'
import type { Copy } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function About({ c }: { c: Copy }) {
  return <section id="about" className="section about-section">
    <div className="container about-grid">
      <div>
        <SectionHeading label={c.aboutLabel} title={c.aboutTitle} accent={c.aboutAccent} />
        <div className="about-symbol" aria-hidden="true"><Braces strokeWidth={1.2} /><span>{c.codeNote[0]}<br />{c.codeNote[1]}</span><ArrowUpRight size={26} /></div>
      </div>
      <div className="about-content">
        <p className="about-lead">{c.aboutIntro}</p>
        <p className="body-copy">{c.aboutBody}</p>
        <p className="about-current"><span className="status-dot" aria-hidden="true" />{c.aboutNote}</p>
        <div className="about-meta"><div><span>{c.based}</span><p><MapPin size={15} aria-hidden="true" />{c.location}</p></div><div><span>{c.focus}</span><p>{c.focusValue}</p></div></div>
      </div>
    </div>
    <div className="container skill-groups">
      {skills.map((group, i) => <div className="skill-group" key={group.name}><h3><span>0{i + 1}</span>{c.skillNames[i]}</h3><div className="flex flex-wrap gap-2">{group.items.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}</div></div>)}
    </div>
  </section>
}
