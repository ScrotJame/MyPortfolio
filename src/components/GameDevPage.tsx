import { ArrowUpRight, Smartphone } from 'lucide-react'

interface GameDevPageProps {
  locale: 'en' | 'vi'
  onSwitchToAppDev: () => void
  onNavigateBlog: () => void
}

export function GameDevPage({ locale, onSwitchToAppDev, onNavigateBlog }: GameDevPageProps) {
  const t = {
    eyebrow: locale === 'vi' ? 'KHÔNG GIAN GAME DEVELOPMENT' : 'GAME DEVELOPMENT SPACE',
    title: locale === 'vi' ? 'Trang đang được xây dựng' : 'Under Construction',
    desc:
      locale === 'vi'
        ? 'Góc chia sẻ các dự án game, sản phẩm Unity và các thử nghiệm đồ họa đang trong quá trình phát triển và hoàn thiện. Hãy quay lại sớm nhé!'
        : 'The showcase for game projects, Unity prototypes, and graphics experiments is currently in the works. Please check back soon!',
    switchApp: locale === 'vi' ? 'Xem dự án App Dev' : 'Switch to App Dev',
    readBlog: locale === 'vi' ? 'Đọc review Game trên Blog' : 'Read Game Reviews on Blog',
  }

  return (
    <section className="construction-section container" aria-labelledby="construction-heading">
      <div className="construction-content">
        <div className="construction-illustration-wrapper">
          <img
            src={`${import.meta.env.BASE_URL}images/had_build.svg`}
            alt=""
            width="420"
            height="420"
            className="construction-illustration"
          />
        </div>

        <span className="eyebrow">{t.eyebrow}</span>
        <h1 id="construction-heading" className="construction-title">{t.title}</h1>
        <p className="construction-desc">{t.desc}</p>

        <div className="construction-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={onSwitchToAppDev}
          >
            <Smartphone size={17} aria-hidden="true" />
            <span>{t.switchApp}</span>
          </button>

          <button
            type="button"
            className="button button-outline"
            onClick={onNavigateBlog}
          >
            <span>{t.readBlog}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
