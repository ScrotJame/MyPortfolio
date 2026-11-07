import { ArrowUpRight, FolderGit2 } from 'lucide-react'
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
    <article className="flex flex-col justify-between h-full min-h-[280px] bg-[#121214]/90 border border-white/10 rounded-[28px] p-5 lg:p-6 relative overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between z-10 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
          <FolderGit2 size={13} className={isApp ? 'text-emerald-400' : 'text-purple-400'} />
          {locale === 'en' ? 'Latest Projects' : 'Dự án tiêu biểu'}
        </span>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-white/60">
          {projects.length} {locale === 'en' ? 'CASES' : 'DỰ ÁN'}
        </span>
      </div>

      {/* Vertical Project List */}
      <div className="space-y-2 flex-1 overflow-y-auto pr-1 scrollbar-thin">
        {projects.map((proj) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => onSelectProject(proj)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/20 transition-all duration-200 text-left group/item cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Gradient avatar with project initials */}
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${proj.iconGradient} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md group-hover/item:scale-105 transition-transform`}
              >
                {proj.title.en.slice(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0">
                <div className="text-xs font-bold text-white group-hover/item:text-emerald-300 transition-colors truncate">
                  {proj.title[locale]}
                </div>
                <div className="text-[10px] text-white/50 truncate font-mono">
                  {proj.category[locale]}
                </div>
              </div>
            </div>

            <ArrowUpRight
              size={15}
              className="text-white/40 group-hover/item:text-white group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0 ml-2"
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
