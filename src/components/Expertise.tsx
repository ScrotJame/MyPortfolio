import { ArrowUpRight, Layers3, Monitor, Smartphone } from 'lucide-react'
import type { Copy } from '../data/content'
import { SectionHeading } from './SectionHeading'

const icons = [Smartphone, Monitor, Layers3]
export function Expertise({ c }: { c: Copy }) {
  return <section id="expertise" className="section expertise-section container">
    <div className="heading-row"><SectionHeading label={c.expertiseLabel} title={c.expertiseTitle} accent={c.expertiseAccent} /><p className="section-intro">{c.expertiseIntro}</p></div>
    <div className="expertise-grid">
      {c.expertise.map((item, i) => {
        const Icon = icons[i]
        return <article className="expertise-card" key={item.title}><div className="expertise-top"><Icon size={31} strokeWidth={1.5} aria-hidden="true" /><span>0{i + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="expertise-bottom"><span>{item.detail}</span><ArrowUpRight size={20} aria-hidden="true" /></div></article>
      })}
    </div>
  </section>
}
