import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import { Github } from './SocialIcons'
import type { Copy, Locale } from '../data/content'
import { projects } from '../data/projects'
import type { Category, Project } from '../data/projects'
import { SectionHeading } from './SectionHeading'
import { ProjectCover } from './ProjectCover'

function ProjectCard({ project, c, locale, index }: { project: Project; c: Copy; locale: Locale; index: number }) {
  const [expanded, setExpanded] = useState(false)
  return <article className="project-card">
    <div className="cover-wrapper"><ProjectCover id={project.id} locale={locale} /><span className="cover-caption">{c.illustration}</span></div>
    <div className="project-info"><div className="project-meta"><span>{project.role[locale]}</span><span>{project.status?.[locale] ?? `0${index + 1}`}</span></div><h3>{project.name}<ArrowDownRight size={25} aria-hidden="true" /></h3><p className="project-description">{project.description[locale]}</p><div className="project-tech flex flex-wrap gap-2">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div><button className="project-toggle" aria-expanded={expanded} aria-controls={`${project.id}-details`} onClick={() => setExpanded(!expanded)}>{expanded ? c.closeProject : c.explore}<ChevronDown className={expanded ? 'rotate-180' : ''} size={17} aria-hidden="true" /></button></div>
    <div id={`${project.id}-details`} className="project-details" hidden={!expanded}><p className="eyebrow">{c.contributions}</p><p className="project-date">{project.date[locale]}</p><ul>{project.details[locale].map(detail => <li key={detail}>{detail}</li>)}</ul>{project.repo && <a className="text-link" href={project.repo} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" />{c.source}<ArrowUpRight size={16} aria-hidden="true" /></a>}</div>
  </article>
}

export function Projects({ c, locale }: { c: Copy; locale: Locale }) {
  const [category, setCategory] = useState<Category>('All')
  const filtered = projects.filter(project => category === 'All' || project.categories.includes(category))
  return <section id="projects" className="section projects-section" aria-label={c.projectsRegion}>
    <div className="container"><div className="heading-row"><SectionHeading label={c.projectsLabel} title={c.projectsTitle} accent={c.projectsAccent} /><p className="section-intro">{c.projectsIntro}</p></div>
      <div className="project-toolbar"><div className="project-filters" role="group" aria-label={locale === 'en' ? 'Project category' : 'Danh mục dự án'}>{(['All', 'Mobile', 'Web', 'AI'] as const).map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === 'All' ? c.all : c.categories[item]}</button>)}</div><span className="result-count" aria-live="polite">{String(filtered.length).padStart(2, '0')} {c.projectCount}</span></div>
      <div className="projects-grid">{filtered.map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} c={c} locale={locale} />)}</div>
      {filtered.length === 0 && <p>{c.noProjects}</p>}
    </div>
  </section>
}
