import { Gamepad2, Sparkles, Play } from 'lucide-react'

export interface GameDevPageProps {
  locale: 'en' | 'vi'
}

/**
 * Module giao diện chính cho Không gian Game Development (Game Dev Page).
 * Cắm module này vào App.tsx khi bạn sẵn sàng ra mắt các dự án game!
 */
export function GameDevPage({ locale }: GameDevPageProps) {
  const isVi = locale === 'vi'

  return (
    <div className="container" style={{ paddingBlock: '40px 100px' }}>
      {/* Game Dev Hero */}
      <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '60px' }}>
        <div style={{ maxWidth: '720px' }}>
          <span className="eyebrow">
            <Gamepad2 size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            {isVi ? 'KHÔNG GIAN GAME DEVELOPMENT' : 'GAME DEVELOPMENT HUB'}
          </span>
          <h1 className="hero-title" style={{ marginTop: '16px', fontSize: 'clamp(32px, 5vw, 54px)' }}>
            {isVi ? 'Thế giới Game & Trải nghiệm Tương tác' : 'Interactive Worlds & Game Experiments'}
          </h1>
          <p className="hero-bio" style={{ marginTop: '16px', fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)' }}>
            {isVi
              ? 'Nơi trưng bày các sản phẩm game indie, cơ chế gameplay, đồ họa shader và thế giới ảo phát triển trên nền tảng Unity & C#.'
              : 'Showcasing indie games, custom gameplay mechanics, shaders, and interactive virtual worlds built with Unity & C#.'}
          </p>
        </div>
      </section>

      {/* Placeholder Showcase Grid cho Game Dev */}
      <section aria-labelledby="game-projects-heading">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <span className="eyebrow">{isVi ? 'DỰ ÁN TIÊU BIỂU' : 'FEATURED GAMES'}</span>
            <h2 id="game-projects-heading" style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px' }}>
              {isVi ? 'Sản phẩm thử nghiệm & Game Indie' : 'Prototypes & Indie Releases'}
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Card mẫu 1 */}
          <article className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              height: '180px',
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.15), rgba(76, 29, 149, 0.25))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <Play size={40} style={{ color: 'var(--orange)', opacity: 0.8 }} />
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 8px',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                borderRadius: '6px',
                color: '#fff'
              }}>
                Unity 3D
              </span>
            </div>
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                {isVi ? 'Dự án Game Prototype #1' : 'Game Prototype #1'}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, flex: 1 }}>
                {isVi
                  ? 'Trải nghiệm gameplay thử nghiệm với hệ thống vật lý tùy chỉnh, camera động và đồ họa low-poly.'
                  : 'Action prototype featuring custom physics, dynamic camera controller, and stylized low-poly aesthetics.'}
              </p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <span className="skill-chip">C#</span>
                <span className="skill-chip">Unity</span>
                <span className="skill-chip">Blender</span>
              </div>
            </div>
          </article>

          {/* Card mẫu 2 */}
          <article className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              height: '180px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <Sparkles size={40} style={{ color: 'var(--blue)', opacity: 0.8 }} />
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 8px',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                borderRadius: '6px',
                color: '#fff'
              }}>
                Shader / VFX
              </span>
            </div>
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                {isVi ? 'Custom Shader Graph & VFX' : 'Custom Shader Graph & VFX'}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, flex: 1 }}>
                {isVi
                  ? 'Bộ shader nước, tương tác cỏ và hiệu ứng hạt hạt tương tác cho môi trường game thời gian thực.'
                  : 'Real-time stylized water, interactive foliage, and procedural particle effects built for performance.'}
              </p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <span className="skill-chip">URP</span>
                <span className="skill-chip">Shader Graph</span>
                <span className="skill-chip">VFX</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
