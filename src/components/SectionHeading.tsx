import type { ReactNode } from 'react'

export function SectionHeading({ label, title, accent, intro, children, id }: {
  label: string; title: string; accent: string; intro?: string; children?: ReactNode; id?: string
}) {
  return <div className="section-heading">
    <p className="eyebrow">{label}</p>
    <h2 id={id}>{title}{' '}<br /><span className="muted-heading">{accent}</span></h2>
    {intro && <p className="section-intro">{intro}</p>}
    {children}
  </div>
}
