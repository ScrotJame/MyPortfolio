import { useState, useEffect, useRef, memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Calendar, Star, Tag, Smartphone, Gamepad2, Clock } from 'lucide-react'
import type { BlogPost } from '../../utils/blog'

export interface BlogReaderProps {
  post: BlogPost
  locale: 'en' | 'vi'
  onBack: () => void
}

export const BlogReader = memo(function BlogReader({ post, locale, onBack }: BlogReaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const isVi = locale === 'vi'

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const total = scrollHeight - clientHeight
      if (total <= 0) {
        setScrollProgress(100)
      } else {
        setScrollProgress(Math.min(100, Math.round((scrollTop / total) * 100)))
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Approximate reading time (words / 200)
  const wordCount = post.content.split(/\s+/).length
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="relative flex flex-col h-full max-h-[82vh] overflow-hidden rounded-[26px] bg-[#101114]/90 border border-white/10 backdrop-blur-2xl">
      {/* 1. Top Reading Progress Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-white/[0.05] z-30">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] z-20 bg-[#101114]/80 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-semibold text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft size={14} className="text-emerald-400" />
          <span>{isVi ? '← Quay lại Thư viện' : '← Back to Archives'}</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-white/50">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-white/40" />
            <span>{readMinutes} {isVi ? 'phút đọc' : 'min read'}</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-emerald-400 font-bold">{scrollProgress}%</span>
        </div>
      </div>

      {/* 3. Article Content Area (Scrollable) */}
      <div ref={contentRef} className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-16 py-8 scrollbar-thin">
        <header className="max-w-3xl mx-auto mb-8 pb-6 border-b border-white/10">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                post.category === 'game'
                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}
            >
              {post.category === 'game' ? <Gamepad2 size={13} /> : <Smartphone size={13} />}
              <span>{post.category === 'game' ? (isVi ? 'Trò chơi' : 'Game') : isVi ? 'Ứng dụng' : 'App'}</span>
            </span>

            {post.platform && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/70">
                <Tag size={12} className="text-white/40" />
                <span>{post.platform}</span>
              </span>
            )}

            {post.rating && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-bold">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{post.rating}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-5">
            <Calendar size={13} />
            <time dateTime={post.date}>{post.date}</time>
          </div>

          {post.summary && (
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal bg-white/[0.02] border-l-2 border-emerald-400/60 pl-4 py-2 rounded-r-xl">
              {post.summary}
            </p>
          )}
        </header>

        {/* Markdown Rendered Body */}
        <article className="max-w-3xl mx-auto prose prose-invert prose-emerald prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-li:text-white/80 prose-code:text-emerald-300 prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-pre:bg-[#08080a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-blockquote:border-emerald-400/50 prose-blockquote:bg-white/[0.02] prose-blockquote:rounded-r-xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  )
})
