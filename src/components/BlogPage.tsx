import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Calendar, Gamepad2, Smartphone, Star, Tag } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '../utils/blog'

interface BlogPageProps {
  locale: 'en' | 'vi'
  activeSlug: string | null
  devMode?: 'app' | 'game'
  onSelectPost: (slug: string | null) => void
  onNavigateHome: () => void
}

export function BlogPage({ locale, activeSlug, devMode, onSelectPost, onNavigateHome }: BlogPageProps) {
  const [filterOverride, setFilterOverride] = useState<'all' | 'app' | 'game' | null>(null)
  const [prevDevMode, setPrevDevMode] = useState(devMode)

  if (prevDevMode !== devMode) {
    setPrevDevMode(devMode)
    setFilterOverride(null)
  }

  const activeFilter = filterOverride ?? devMode ?? 'all'

  const posts = useMemo(() => getAllPosts(), [])
  const activePost = activeSlug ? getPostBySlug(activeSlug) : null

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') return posts
    return posts.filter((p) => p.category === activeFilter)
  }, [posts, activeFilter])

  const t = {
    all: locale === 'vi' ? 'Tất cả' : 'All',
    apps: locale === 'vi' ? 'Ứng dụng' : 'Apps',
    games: locale === 'vi' ? 'Trò chơi' : 'Games',
    eyebrow: locale === 'vi' ? 'GÓC CẢM NGHĨ & ĐÁNH GIÁ' : 'THOUGHTS & REVIEWS',
    title: locale === 'vi' ? 'Góc Review App & Game' : 'App & Game Reviews',
    intro:
      locale === 'vi'
        ? 'Chia sẻ những trải nghiệm thực tế, cảm nghĩ cá nhân và đánh giá chi tiết về các sản phẩm công nghệ, ứng dụng và tựa game đáng chú ý.'
        : 'Personal reflections, hands-on impressions, and thoughtful reviews on noteworthy software, apps, and games.',
    backToHome: locale === 'vi' ? '← Về Trang chủ Portfolio' : '← Back to Portfolio',
    backToList: locale === 'vi' ? '← Quay lại danh sách Blog' : '← Back to all posts',
    readMore: locale === 'vi' ? 'Đọc bài viết' : 'Read review',
    ratingLabel: locale === 'vi' ? 'Đánh giá:' : 'Rating:',
    platformLabel: locale === 'vi' ? 'Nền tảng:' : 'Platform:',
    empty: locale === 'vi' ? 'Chưa có bài viết nào trong mục này.' : 'No reviews in this category yet.',
  }

  // If a post is active, show the detail view
  if (activePost) {
    return (
      <div className="blog-container container">
        <div className="blog-nav-bar">
          <button
            type="button"
            className="blog-back-btn"
            onClick={() => onSelectPost(null)}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{t.backToList}</span>
          </button>
        </div>

        <article className="blog-article-card">
          <header className="blog-article-header">
            <div className="blog-meta-tags">
              <span className={`blog-category-badge ${activePost.category}`}>
                {activePost.category === 'game' ? (
                  <Gamepad2 size={14} aria-hidden="true" />
                ) : (
                  <Smartphone size={14} aria-hidden="true" />
                )}
                {activePost.category === 'game' ? t.games : t.apps}
              </span>

              {activePost.platform && (
                <span className="blog-platform-badge">
                  <Tag size={13} aria-hidden="true" />
                  {activePost.platform}
                </span>
              )}

              {activePost.rating && (
                <span className="blog-rating-badge">
                  <Star size={13} fill="currentColor" aria-hidden="true" />
                  <span>{activePost.rating}</span>
                </span>
              )}
            </div>

            <h1 className="blog-article-title">{activePost.title}</h1>

            <div className="blog-article-date">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={activePost.date}>{activePost.date}</time>
            </div>

            {activePost.summary && (
              <p className="blog-article-lead">{activePost.summary}</p>
            )}
          </header>

          <hr className="blog-divider" />

          <div className="blog-article-content">
            <ReactMarkdown>{activePost.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    )
  }

  // Otherwise, show the Blog listing
  return (
    <div className="blog-container container">
      <div className="blog-nav-bar">
        <button
          type="button"
          className="blog-back-btn"
          onClick={onNavigateHome}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{t.backToHome}</span>
        </button>
      </div>

      <header className="blog-header-section">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className="blog-main-title">{t.title}</h1>
        <p className="blog-main-intro">{t.intro}</p>

        {/* Filter buttons */}
        <div className="blog-filter-bar" role="group" aria-label="Lọc bài viết">
          <button
            type="button"
            className={`blog-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setFilterOverride('all')}
          >
            {t.all} ({posts.length})
          </button>
          <button
            type="button"
            className={`blog-filter-btn ${activeFilter === 'game' ? 'active' : ''}`}
            onClick={() => setFilterOverride('game')}
          >
            <Gamepad2 size={15} aria-hidden="true" />
            {t.games} ({posts.filter((p) => p.category === 'game').length})
          </button>
          <button
            type="button"
            className={`blog-filter-btn ${activeFilter === 'app' ? 'active' : ''}`}
            onClick={() => setFilterOverride('app')}
          >
            <Smartphone size={15} aria-hidden="true" />
            {t.apps} ({posts.filter((p) => p.category === 'app').length})
          </button>
        </div>
      </header>

      {filteredPosts.length === 0 ? (
        <p className="blog-empty-state">{t.empty}</p>
      ) : (
        <div className="blog-post-grid">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="blog-card">
              <div className="blog-meta-tags">
                <span className={`blog-category-badge ${post.category}`}>
                  {post.category === 'game' ? (
                    <Gamepad2 size={13} aria-hidden="true" />
                  ) : (
                    <Smartphone size={13} aria-hidden="true" />
                  )}
                  {post.category === 'game' ? t.games : t.apps}
                </span>

                {post.platform && (
                  <span className="blog-platform-badge">
                    <Tag size={12} aria-hidden="true" />
                    {post.platform}
                  </span>
                )}

                {post.rating && (
                  <span className="blog-rating-badge">
                    <Star size={12} fill="currentColor" aria-hidden="true" />
                    <span>{post.rating}</span>
                  </span>
                )}
              </div>

              <h2 className="blog-card-title">
                <button
                  type="button"
                  className="blog-card-title-btn"
                  onClick={() => onSelectPost(post.slug)}
                >
                  {post.title}
                </button>
              </h2>

              <p className="blog-card-summary">{post.summary}</p>

              <div className="blog-card-footer">
                <div className="blog-article-date">
                  <Calendar size={13} aria-hidden="true" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <button
                  type="button"
                  className="blog-read-btn"
                  onClick={() => onSelectPost(post.slug)}
                >
                  {t.readMore} →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
