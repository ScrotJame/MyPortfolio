import { useEffect, useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Download, Mail, MapPin } from 'lucide-react'
import { bentoContent, getHanoiTime, type BentoTrack } from '../../data/bentoData'

interface IntroCardProps {
  track: BentoTrack
  locale: 'en' | 'vi'
  onContactClick: () => void
}

export const IntroCard = memo(function IntroCard({ track, locale, onContactClick }: IntroCardProps) {
  const profile = bentoContent[track][locale]
  const [hanoiTime, setHanoiTime] = useState(() => getHanoiTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setHanoiTime(getHanoiTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const cvHref = `${import.meta.env.BASE_URL}cv/Nguyen_Sy_Manh_Cuong_CV_Flutter.pdf`

  return (
    <article className="flex flex-col justify-between h-full bg-[#121214]/90 border border-white/10 rounded-[28px] p-6 lg:p-7 relative overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all duration-300">
      {/* Subtle top-left aura light */}
      <div className="absolute -top-16 -left-16 w-44 h-44 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={track}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between h-full flex-1"
        >
          {/* Top Header: Username handle with live indicator */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-mono font-semibold text-white/45 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                {profile.handle}
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                {profile.title[locale]}
              </span>
            </div>

            {/* Main Headline formatted like aximoris.com */}
            <h1 className="text-4xl sm:text-5xl lg:text-[44px] xl:text-[48px] font-black text-white tracking-tight leading-[1.05] mt-3 mb-3 max-w-[260px]">
              {locale === 'en' ? "Hello! I'm Cuong" : 'Xin chào! Mình là Cường'}
            </h1>

            {/* Bio Copy */}
            <p className="text-xs sm:text-[13px] leading-relaxed text-white/60 mb-5 font-normal">
              {profile.bio[locale]}
            </p>

            {/* Skill Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full bg-white/[0.04] text-white/75 border border-white/10 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Section: Location Radar Card & CTA Actions */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            {/* Hanoi Radar Map Card styled after aximoris dark map */}
            <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group/map">
              <div className="flex items-center gap-2.5 z-10">
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/80 border border-white/10">
                  <MapPin size={15} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">
                    {locale === 'en' ? 'Hanoi, VN' : 'Hà Nội, VN'}
                  </div>
                  <div className="text-[10px] text-white/50 font-mono">
                    {hanoiTime.timeString} · {hanoiTime.timeZone} {locale === 'en' ? 'Local time' : 'Giờ địa phương'}
                  </div>
                </div>
              </div>

              {/* Dark night-mode city map vector */}
              <div className="relative w-20 h-11 overflow-hidden rounded-lg bg-black/40 border border-white/5">
                <svg viewBox="0 0 100 55" className="w-full h-full stroke-white/20 fill-none">
                  <path d="M 0 15 Q 30 20 60 10 T 100 25" strokeWidth="1" strokeDasharray="3 2" />
                  <path d="M 10 50 Q 35 30 70 45 T 100 15" strokeWidth="1.2" />
                  <path d="M 40 0 L 45 55" strokeWidth="0.8" strokeDasharray="2 2" stroke="rgba(255,255,255,0.15)" />
                  <path d="M 75 0 L 70 55" strokeWidth="0.8" stroke="rgba(255,255,255,0.15)" />
                  <circle cx="58" cy="28" r="5" className="fill-emerald-400/30 animate-ping" />
                  <circle cx="58" cy="28" r="2.5" className="fill-emerald-400 shadow-[0_0_8px_#34d399]" />
                </svg>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onContactClick}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#e6e6e8] hover:bg-white !text-neutral-950 text-xs sm:text-sm font-extrabold active:scale-95 transition-all duration-200 shadow-md cursor-pointer"
              >
                <Mail size={15} className="!text-neutral-950 shrink-0" />
                <span className="!text-neutral-950 font-bold">{locale === 'en' ? 'Contact me' : 'Liên hệ'}</span>
              </button>

              <a
                href={cvHref}
                download="Nguyen_Sy_Manh_Cuong_CV_Flutter.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 text-xs sm:text-sm font-semibold active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Download size={14} />
                <span>{locale === 'en' ? 'CV' : 'Tải CV'}</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </article>
  )
})
