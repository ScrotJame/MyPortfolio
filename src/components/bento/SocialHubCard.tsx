import { memo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Mail } from 'lucide-react'
import type { BentoTrack } from '../../data/bentoData'
import { profile } from '../../data/content'
import { Figma, Github, Linkedin, Youtube } from '../SocialIcons'

interface SocialHubCardProps {
  track: BentoTrack
  locale: 'en' | 'vi'
  onBlogClick?: () => void
}

export const SocialHubCard = memo(function SocialHubCard({ track, locale, onBlogClick }: SocialHubCardProps) {
  const isApp = track === 'app'

  const links = [
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://youtube.com',
      icon: <Youtube size={16} />,
      positionClass: 'top-2.5 left-1/2 -translate-x-1/2'
    },
    {
      id: 'blog',
      label: 'Blog',
      onClick: onBlogClick,
      icon: <BookOpen size={15} />,
      positionClass: 'top-9 right-6'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: profile.linkedin,
      icon: <Linkedin size={15} />,
      positionClass: 'bottom-9 right-6'
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:cuongnsm@gmail.com',
      icon: <Mail size={15} />,
      positionClass: 'bottom-2.5 left-1/2 -translate-x-1/2'
    },
    {
      id: 'github',
      label: 'GitHub',
      href: profile.github,
      icon: <Github size={16} />,
      positionClass: 'bottom-9 left-6'
    },
    {
      id: 'figma',
      label: 'Figma',
      href: 'https://figma.com',
      icon: <Figma size={15} />,
      positionClass: 'top-9 left-6'
    }
  ]

  return (
    <article className="flex flex-col items-center justify-center h-full min-h-[220px] bg-[#121214]/90 border border-white/10 rounded-[28px] p-4 relative overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300">
      {/* Background subtle radial ambient glow */}
      <div
        className={`absolute inset-0 opacity-20 pointer-events-none transition-colors duration-700 ${
          isApp
            ? 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]'
            : 'bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]'
        }`}
      />

      {/* Hexagonal / Radial Orbital Container exactly as aximoris */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center select-none">
        {/* Outer and Inner Concentric Orbit Ring Guides */}
        <div className="absolute inset-2.5 rounded-full border border-white/[0.06] pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-white/[0.04] pointer-events-none" />

        {/* Central Core Gradient Orb (like aximoris multicolor sphere) */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full flex items-center justify-center z-10 border border-white/20 shadow-[0_0_24px_rgba(129,140,248,0.35)] cursor-default bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500"
        >
          <div className="w-5 h-5 rounded-full bg-white/25 backdrop-blur-sm shadow-inner" />
        </motion.div>

        {/* 6 Radial Sockets */}
        {links.map((item) => {
          const content = (
            <motion.div
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-2xl bg-[#18181b]/90 hover:bg-white/[0.12] border border-white/10 hover:border-white/30 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer"
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
                className={`absolute ${item.positionClass} z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-2xl`}
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
              className={`absolute ${item.positionClass} z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-2xl`}
            >
              {content}
            </a>
          )
        })}
      </div>

      <span className="sr-only">{locale === 'en' ? 'Social Network Hub' : 'Kết nối mạng xã hội'}</span>
    </article>
  )
})
