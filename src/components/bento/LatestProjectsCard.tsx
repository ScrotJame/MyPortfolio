import { ArrowUpRight } from 'lucide-react'
import { bentoProjects, type BentoProject, type BentoTrack } from '../../data/bentoData'

interface LatestProjectsCardProps {
  track: BentoTrack
  locale: 'en' | 'vi'
  onSelectProject: (project: BentoProject) => void
}

export function LatestProjectsCard({ track, locale, onSelectProject }: LatestProjectsCardProps) {
  const isApp = track === 'app'
  const projects = bentoProjects[track]

  return (
    <article className="flex flex-col justify-between h-full min-h-[280px] bg-[#121214]/90 border border-white/10 rounded-[28px] p-5 relative overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300">
      {/* Header exactly like aximoris: clean "Latest projects" */}
      <div className="flex items-center justify-between z-10 mb-2.5">
        <h2 className="text-[13px] font-semibold text-white/90 tracking-tight">
          {locale === 'en' ? 'Latest projects' : 'Dự án tiêu biểu'}
        </h2>
        <span className="text-[10px] font-mono text-white/40">
          {projects.length} {locale === 'en' ? 'cases' : 'dự án'}
        </span>
      </div>

      {/* Vertical Project List with app icons styled after aximoris */}
      <div className="space-y-1.5 flex-1 overflow-y-auto pr-1 scrollbar-thin">
        {projects.map((proj) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => onSelectProject(proj)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all duration-200 text-left group/item cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* App Icon Thumbnail */}
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${proj.iconGradient} flex items-center justify-center text-white font-extrabold text-[11px] shrink-0 shadow-md group-hover/item:scale-105 transition-transform`}
              >
                {proj.title.en.slice(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0">
                <div className={`text-xs font-semibold text-white transition-colors truncate ${
                  isApp ? 'group-hover/item:text-emerald-300' : 'group-hover/item:text-purple-300'
                }`}>
                  {proj.title[locale]}
                </div>
                <div className="text-[10px] text-white/45 truncate mt-0.5">
                  {proj.category[locale]}
                </div>
              </div>
            </div>

            <ArrowUpRight
              size={14}
              className="text-white/30 group-hover/item:text-white group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0 ml-2"
            />
          </button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-2 text-center text-[10px] text-white/40 font-mono border-t border-white/[0.06] mt-2">
        {locale === 'en' ? 'Click case to expand full spec' : 'Bấm vào dự án để xem chi tiết'}
      </div>
    </article>
  )
}
