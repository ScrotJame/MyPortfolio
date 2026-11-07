import { useEffect, useState } from 'react'
import { ArrowUpRight, Download, Mail, MapPin } from 'lucide-react'
import { bentoContent, getHanoiTime, type BentoTrack } from '../../data/bentoData'

interface IntroCardProps {
  track: BentoTrack
  locale: 'en' | 'vi'
  onContactClick: () => void
}

export function IntroCard({ track, locale, onContactClick }: IntroCardProps) {
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

      {/* Top Header: Username and Status Badge */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <span className="text-xs font-semibold text-white/50 tracking-wider">
            {profile.handle}
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{profile.status[locale]}</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold text-white tracking-tight leading-[1.1] mb-2">
          {locale === 'en' ? "Hello! I'm Cuong" : 'Xin chào! Mình là Cường'}
        </h1>

        <p className="text-xs sm:text-sm font-semibold text-white/60 mb-3.5 tracking-wide uppercase">
          {profile.title[locale]}
        </p>

        {/* Bio Copy */}
        <p className="text-xs sm:text-sm leading-relaxed text-white/70 mb-5 font-normal">
          {profile.bio[locale]}
        </p>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.04] text-white/80 border border-white/10 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Section: Location Radar Card & CTA Actions */}
      <div className="space-y-4 pt-4 border-t border-white/[0.08]">
        {/* Hanoi Radar Map Card */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-2.5 z-10">
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/80 border border-white/10">
              <MapPin size={16} className="text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {locale === 'en' ? 'Hanoi, VN' : 'Hà Nội, VN'}
              </div>
              <div className="text-[11px] text-white/50 font-mono">
                {hanoiTime.timeString} · {hanoiTime.timeZone}
              </div>
            </div>
          </div>

          {/* Mini Radar vector map simulation */}
          <div className="relative w-16 h-10 overflow-hidden rounded-lg opacity-60">
            <svg viewBox="0 0 80 50" className="w-full h-full stroke-white/20 fill-none">
              <path d="M 10 10 Q 30 20 50 15 T 75 35" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 5 35 Q 25 25 55 40 T 78 15" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="45" cy="22" r="3" className="fill-emerald-400 animate-ping" />
              <circle cx="45" cy="22" r="2.5" className="fill-emerald-400" />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onContactClick}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white !text-neutral-950 text-xs sm:text-sm font-extrabold hover:bg-neutral-200 active:scale-98 transition-all duration-200 shadow-md cursor-pointer"
          >
            <Mail size={15} className="!text-neutral-950 shrink-0" />
            <span className="!text-neutral-950 font-bold">{locale === 'en' ? 'Contact me' : 'Liên hệ'}</span>
          </button>

          <a
            href={cvHref}
            download="Nguyen_Sy_Manh_Cuong_CV_Flutter.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs sm:text-sm font-bold active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <Download size={15} />
            <span>{locale === 'en' ? 'CV' : 'Tải CV'}</span>
            <ArrowUpRight size={14} className="opacity-60" />
          </a>
        </div>
      </div>
    </article>
  )
}
