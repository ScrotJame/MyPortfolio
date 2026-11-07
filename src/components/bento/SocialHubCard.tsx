import { motion } from 'framer-motion'
import { BookOpen, Mail, Orbit } from 'lucide-react'
import type { BentoTrack } from '../../data/bentoData'
import { profile } from '../../data/content'
import { Figma, Github, Linkedin, Youtube } from '../SocialIcons'

interface SocialHubCardProps {
  track: BentoTrack
  locale: 'en' | 'vi'
  onBlogClick?: () => void
}

export function SocialHubCard({ track, locale, onBlogClick }: SocialHubCardProps) {
  const isApp = track === 'app'

  const links = [
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://youtube.com',
      icon: <Youtube size={17} />,
      positionClass: 'top-2.5 left-1/2 -translate-x-1/2'
    },
    {
      id: 'figma',
      label: 'Figma',
      href: 'https://figma.com',
      icon: <Figma size={16} />,
      positionClass: 'top-9 right-6'
    },
    {
      id: 'blog',
      label: 'Blog',
      onClick: onBlogClick,
      icon: <BookOpen size={16} />,
      positionClass: 'bottom-9 right-6'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: profile.linkedin,
      icon: <Linkedin size={16} />,
      positionClass: 'bottom-2.5 left-1/2 -translate-x-1/2'
    },
    {
      id: 'github',
      label: 'GitHub',
      href: profile.github,
      icon: <Github size={17} />,
      positionClass: 'bottom-9 left-6'
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:cuongnsm@gmail.com',
      icon: <Mail size={16} />,
      positionClass: 'top-9 left-6'
    }
  ]

  return (
    <article className="flex flex-col justify-between h-full min-h-[250px] bg-[#121214]/90 border border-white/10 rounded-[28px] p-5 relative overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
          <Orbit size={13} className={isApp ? 'text-emerald-400' : 'text-purple-400'} />
          {locale === 'en' ? 'Social Hub' : 'Kết nối mạng xã hội'}
        </span>
        <span className="text-[9px] font-mono text-white/40">6 CHANNELS</span>
      </div>

      {/* Hexagonal / Radial Orbital Container */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto my-2 flex items-center justify-center">
        {/* Concentric Orbit Ring Guide */}
        <div className="absolute inset-2.5 rounded-full border border-white/[0.08] pointer-events-none" />
        <div className="absolute inset-9 rounded-full border border-white/[0.05] pointer-events-none" />

        {/* Central Core Orb */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`w-14 h-14 rounded-full flex items-center justify-center z-10 border transition-colors duration-500 shadow-xl ${
            isApp
              ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/30 border-emerald-400/40 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
              : 'bg-gradient-to-br from-purple-500/20 to-amber-500/30 border-purple-400/40 text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.25)]'
          }`}
        >
          <span className="text-xs font-black tracking-tighter">mc.</span>
        </motion.div>

        {/* 6 Radial Satellite Items */}
        {links.map((item) => {
          const content = (
            <motion.div
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 hover:border-white/30 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer"
            >
              {item.icon}
            </motion.div>
          )

          if (item.onClick) {
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                title={item.label}
                onClick={item.onClick}
                className={`absolute ${item.positionClass} z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-full`}
              >
                {content}
              </button>
            )
          }

          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              title={item.label}
              className={`absolute ${item.positionClass} z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-full`}
            >
              {content}
            </a>
          )
        })}
      </div>

      {/* Bottom Subtitle */}
      <div className="text-center text-[10px] text-white/40 font-mono">
        {locale === 'en' ? 'Click to open channels & links' : 'Bấm để mở các kênh liên kết'}
      </div>
    </article>
  )
}
