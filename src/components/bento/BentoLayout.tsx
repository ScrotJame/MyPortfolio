import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Globe2 } from 'lucide-react'
import type { BentoProject, BentoTrack } from '../../data/bentoData'
import { IntroCard } from './IntroCard'
import { Hero3DCard } from './Hero3DCard'
import { SocialHubCard } from './SocialHubCard'
import { LatestProjectsCard } from './LatestProjectsCard'
import { VinylTrackSwitcher } from './VinylTrackSwitcher'
import { ProjectDetailModal } from './ProjectDetailModal'
import { ContactModal } from './ContactModal'

interface BentoLayoutProps {
  locale: 'en' | 'vi'
  onLocaleChange: (locale: 'en' | 'vi') => void
  onViewBlog: () => void
  devMode: BentoTrack
  onDevModeChange: (track: BentoTrack) => void
}

export function BentoLayout({
  locale,
  onLocaleChange,
  onViewBlog,
  devMode,
  onDevModeChange
}: BentoLayoutProps) {
  const [selectedProject, setSelectedProject] = useState<BentoProject | null>(null)
  const [isContactOpen, setIsContactOpen] = useState(false)
  // Preserves 3D card orientation state across music track changes
  const [cardRotation, setCardRotation] = useState({ x: 8, y: -12 })
  const isApp = devMode === 'app'

  return (
    <div className="relative min-h-screen bg-[#09090b] text-white overflow-x-hidden selection:bg-emerald-500/30 selection:text-white flex flex-col justify-between">
      {/* 1. Ambient Background Multi-Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[150px] transition-colors duration-1000 opacity-35 ${
            isApp ? 'bg-emerald-500' : 'bg-purple-600'
          }`}
        />
        <div
          className={`absolute top-1/4 -right-32 w-[650px] h-[650px] rounded-full blur-[160px] transition-colors duration-1000 opacity-30 ${
            isApp ? 'bg-cyan-600' : 'bg-amber-600'
          }`}
        />
        <div
          className={`absolute -bottom-32 -right-20 w-[600px] h-[600px] rounded-full blur-[160px] transition-colors duration-1000 opacity-25 ${
            isApp ? 'bg-blue-600' : 'bg-pink-600'
          }`}
        />
        <div
          className={`absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 opacity-20 ${
            isApp ? 'bg-teal-600' : 'bg-violet-600'
          }`}
        />
      </div>

      {/* 2. Color Wipe Transition Sweep (Transform from left to right) */}
      <AnimatePresence>
        <motion.div
          key={`wipe-${devMode}`}
          initial={{ x: '-100%', opacity: 0.85 }}
          animate={{ x: '100%', opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 pointer-events-none z-30 bg-gradient-to-r ${
            isApp
              ? 'from-transparent via-emerald-400/25 to-transparent'
              : 'from-transparent via-purple-400/30 to-transparent'
          }`}
        />
      </AnimatePresence>

      {/* 3. Top Floating Glass Header */}
      <header className="relative z-20 w-full max-w-[1400px] xl:max-w-[1480px] 2xl:max-w-[1560px] mx-auto pt-3 sm:pt-4 px-4 sm:px-6">
        <nav className="flex items-center justify-between py-2.5 px-4 sm:px-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase">
              CƯỜNG NGUYỄN <span className="text-white/40 font-mono font-normal">// PORTFOLIO</span>
            </span>
          </div>

          {/* Quick Actions: Blog Link & Language Switch */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onViewBlog}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <BookOpen size={13} className="text-emerald-400" />
              <span>{locale === 'en' ? 'Blog' : 'Bài viết'}</span>
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

      {/* 4. Main Bento Grid Container styled exactly like aximoris.com */}
      <main className="relative z-10 w-full max-w-[1400px] xl:max-w-[1480px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 my-auto py-3 sm:py-5 flex flex-col justify-center">
        {/* Unified Tablet Slate Frame */}
        <div className="w-full rounded-[32px] sm:rounded-[38px] bg-[#0c0d10]/90 border border-white/[0.08] p-3 sm:p-4 lg:p-5 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5 items-stretch lg:h-[600px] xl:h-[640px]">
            {/* Column 1 (Left): Intro Card (Col 4) */}
            <div className="lg:col-span-4 h-full flex flex-col">
              <div className="h-full flex flex-col flex-1">
                <IntroCard
                  track={devMode}
                  locale={locale}
                  onContactClick={() => setIsContactOpen(true)}
                />
              </div>
            </div>

            {/* Column 2 (Center): Hero 3D Card (Preserves 3D rotation across track changes) */}
            <div className="lg:col-span-5 h-full flex flex-col">
              <div className="h-full flex flex-col flex-1">
                <Hero3DCard
                  track={devMode}
                  locale={locale}
                  rotate={cardRotation}
                  onRotateChange={setCardRotation}
                />
              </div>
            </div>

            {/* Column 3 (Right): Stack of Social Hub & Projects (Col 3) */}
            <div className="lg:col-span-3 flex flex-col gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5 h-full">
              <div className="h-[240px] xl:h-[250px] shrink-0">
                <SocialHubCard
                  track={devMode}
                  locale={locale}
                  onBlogClick={onViewBlog}
                />
              </div>

              <div className="flex-1 min-h-[280px] lg:min-h-0 flex flex-col">
                <LatestProjectsCard
                  track={devMode}
                  locale={locale}
                  onSelectProject={setSelectedProject}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Floating Vinyl Track Switcher Dock */}
      <VinylTrackSwitcher
        currentTrack={devMode}
        onTrackChange={onDevModeChange}
        locale={locale}
      />

      {/* 6. Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        locale={locale}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        locale={locale}
      />
    </div>
  )
}
