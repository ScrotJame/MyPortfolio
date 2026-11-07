import { useState, useMemo } from 'react'
import { ArrowLeft, BookOpen, Globe2 } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '../../utils/blog'
import { BlogShelfFilter } from './BlogShelfFilter'
import { BlogCard3D } from './BlogCard3D'
import { BlogReader } from './BlogReader'

export interface BlogVaultLayoutProps {
  locale: 'en' | 'vi'
  activeSlug: string | null
  onLocaleChange: (locale: 'en' | 'vi') => void
  onSelectPost: (slug: string | null) => void
  onNavigateHome: () => void
}

export function BlogVaultLayout({
  locale,
  activeSlug,
  onLocaleChange,
  onSelectPost,
  onNavigateHome,
}: BlogVaultLayoutProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'app' | 'game'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const isVi = locale === 'vi'
  const posts = useMemo(() => getAllPosts(), [])
  const activePost = activeSlug ? getPostBySlug(activeSlug) : null

  const counts = useMemo(
    () => ({
      all: posts.length,
      app: posts.filter((p) => p.category === 'app').length,
      game: posts.filter((p) => p.category === 'game').length,
    }),
    [posts]
  )

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory = activeCategory === 'all' || post.category === activeCategory
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [posts, activeCategory, searchQuery])

  return (
    <div className="relative min-h-screen bg-[#09090b] text-white overflow-x-hidden selection:bg-emerald-500/30 selection:text-white flex flex-col justify-between">
      {/* 1. Ambient Background Multi-Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[120px] bg-emerald-500 opacity-25 transform-gpu will-change-transform" />
        <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] rounded-full blur-[120px] bg-cyan-600 opacity-20 transform-gpu will-change-transform" />
        <div className="absolute -bottom-32 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] bg-purple-600 opacity-20 transform-gpu will-change-transform" />
      </div>

      {/* 2. Top Floating Glass Header */}
      <header className="relative z-20 w-full max-w-[1400px] xl:max-w-[1480px] 2xl:max-w-[1560px] mx-auto pt-3 sm:pt-4 px-4 sm:px-6">
        <nav className="flex items-center justify-between py-2.5 px-4 sm:px-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase">
              CƯỜNG NGUYỄN <span className="text-white/40 font-mono font-normal">// DIGITAL ARCHIVES</span>
            </span>
          </div>

          {/* Quick Actions: Back to Home & Language Switch */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} className="text-emerald-400" />
              <span>{isVi ? 'Về Portfolio' : 'Back to Home'}</span>
            </button>

            <button
              type="button"
              onClick={() => onLocaleChange(locale === 'en' ? 'vi' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
              title={locale === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
            >
              <Globe2 size={13} className="text-cyan-400" />
              <span>{locale.toUpperCase()}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* 3. Main Bento Tablet Slate Container */}
      <main className="relative z-10 w-full max-w-[1400px] xl:max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 my-auto py-4 sm:py-6 flex flex-col justify-center flex-1">
        <div className="w-full rounded-[32px] sm:rounded-[38px] bg-[#0c0d10]/90 border border-white/[0.08] p-4 sm:p-6 lg:p-7 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex-1">
          {activePost ? (
            <BlogReader
              post={activePost}
              locale={locale}
              onBack={() => onSelectPost(null)}
            />
          ) : (
            <div>
              {/* Library Shelf Filter & Search */}
              <BlogShelfFilter
                locale={locale}
                activeCategory={activeCategory}
                counts={counts}
                searchQuery={searchQuery}
                onCategoryChange={setActiveCategory}
                onSearchChange={setSearchQuery}
              />

              {/* Card Deck Gallery Grid */}
              {posts.length === 0 ? (
                <div className="py-20 sm:py-28 flex flex-col items-center justify-center text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {isVi ? 'Kho lưu trữ đang chuẩn bị ra mắt' : 'Archives Coming Soon'}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 max-w-md leading-relaxed font-normal">
                    {isVi
                      ? 'Các bài viết phân tích chuyên sâu về ứng dụng và game sẽ sớm được phát hành tại đây. Hãy đón đọc nhé!'
                      : 'In-depth reflections, app reviews, and game analysis will be published here soon. Stay tuned!'}
                  </p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="py-20 text-center text-white/40 font-mono text-sm">
                  {isVi ? 'Không tìm thấy thẻ bài hồ sơ phù hợp.' : 'No archive cards found.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
                  {filteredPosts.map((post) => (
                    <div key={post.slug} className="min-h-[420px]">
                      <BlogCard3D
                        post={post}
                        locale={locale}
                        onSelect={() => onSelectPost(post.slug)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer spacer (No VinylTrackSwitcher dock on Blog page) */}
      <footer className="relative z-10 py-3 text-center text-[10px] font-mono text-white/30">
        © 2026 Cuong Nguyen · Digital Library Archive
      </footer>
    </div>
  )
}
