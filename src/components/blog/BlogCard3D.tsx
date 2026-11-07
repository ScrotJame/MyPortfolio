import { useState, useCallback, memo } from 'react'
import { ArrowUpRight, Calendar, Star, Tag, Smartphone, Gamepad2 } from 'lucide-react'
import type { BlogPost } from '../../utils/blog'

export interface BlogCard3DProps {
  post: BlogPost
  locale: 'en' | 'vi'
  onSelect: () => void
}

export const BlogCard3D = memo(function BlogCard3D({ post, locale, onSelect }: BlogCard3DProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const isVi = locale === 'vi'

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -9
    const rotateY = ((x - centerX) / centerX) * 9
    setRotate({ x: rotateX, y: rotateY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 })
  }, [])

  const ctaLabel = isVi ? 'Xem chi tiết →' : 'View Details →'

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-[1000px] h-full"
    >
      <article
        onClick={onSelect}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative flex flex-col justify-between h-full bg-[#121214] border border-white/10 hover:border-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.22)] rounded-[24px] p-5.5 sm:p-6 cursor-pointer overflow-hidden backdrop-blur-xl transition-[border-color,box-shadow] duration-300 select-none"
      >
        {/* Subtle top glare sheen on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* 1. Header: Meta details (Category, Platform & Rating) - NO #APP-001 taglines */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                post.category === 'game'
                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}
            >
              {post.category === 'game' ? <Gamepad2 size={12} /> : <Smartphone size={12} />}
              <span>{post.category === 'game' ? (isVi ? 'Trò chơi' : 'Game') : isVi ? 'Ứng dụng' : 'App'}</span>
            </span>

            {post.platform && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-white/50">
                <Tag size={11} className="text-white/40" />
                <span className="truncate max-w-[120px]">{post.platform}</span>
              </span>
            )}
          </div>

          {post.rating && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-bold shrink-0">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{post.rating}</span>
            </div>
          )}
        </div>

        {/* 2. Visual Graphic Thumbnail Area */}
        <div className="relative z-10 w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-white/15 transition-colors">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${
              post.category === 'game'
                ? 'bg-gradient-to-tr from-purple-600 to-amber-500 text-white'
                : 'bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white'
            }`}
          >
            {post.title.slice(0, 2).toUpperCase()}
          </div>
          <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* 3. Text Info: Title & 2-Line Summary */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-2">
              {post.title}
            </h3>
            <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">{post.summary}</p>
          </div>

          {/* 4. Footer: Date & "Xem chi tiết →" Button */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40">
              <Calendar size={12} />
              <time dateTime={post.date}>{post.date}</time>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelect()
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.05] group-hover:bg-emerald-500/15 group-hover:text-emerald-300 border border-white/10 group-hover:border-emerald-400/40 text-xs font-semibold text-white/80 transition-all cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </article>
    </div>
  )
})
