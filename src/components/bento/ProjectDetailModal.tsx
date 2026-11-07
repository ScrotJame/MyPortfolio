import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ExternalLink, X } from 'lucide-react'
import type { BentoProject } from '../../data/bentoData'
import { Github } from '../SocialIcons'

interface ProjectDetailModalProps {
  project: BentoProject | null
  onClose: () => void
  locale: 'en' | 'vi'
}

export function ProjectDetailModal({ project, onClose, locale }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Dialog Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-xl bg-[#121214] border border-white/15 rounded-[28px] p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto scrollbar-thin"
          >
            {/* Close Button */}
            <button
              type="button"
              role="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Header with Project Icon */}
            <div className="flex items-center gap-3.5 mb-5">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.iconGradient} flex items-center justify-center text-white font-extrabold text-base shadow-lg`}
              >
                {project.title.en.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="text-[11px] font-mono font-medium text-emerald-400 uppercase tracking-wider block">
                  {project.category[locale]}
                </span>
                <h3 id="project-modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
                  {project.title[locale]}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed text-white/80 mb-6">
              {project.description[locale]}
            </p>

            {/* Tech Stack Pills */}
            <div className="mb-6">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider block mb-2">
                {locale === 'en' ? 'Core Technologies' : 'Công nghệ sử dụng'}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-white/90 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Contributions & Solutions */}
            <div className="mb-6">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider block mb-3">
                {locale === 'en' ? 'Key Contributions' : 'Đóng góp & Điểm nhấn'}
              </span>
              <ul className="space-y-2.5">
                {project.details[locale].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 leading-relaxed">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Action Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/15 transition-all"
                >
                  <Github size={16} />
                  <span>{locale === 'en' ? 'View Source' : 'Mã nguồn'}</span>
                  <ExternalLink size={13} className="opacity-60" />
                </a>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-bold hover:bg-neutral-200 transition-all shadow-md"
                >
                  <span>{locale === 'en' ? 'Live Demo' : 'Trải nghiệm trực tiếp'}</span>
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

