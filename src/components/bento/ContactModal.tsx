import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Copy, Mail, Send, X } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  locale: 'en' | 'vi'
}

export function ContactModal({ isOpen, onClose, locale }: ContactModalProps) {
  const [copied, setCopied] = useState(false)
  const email = 'cuongnsm@gmail.com'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-[#121214] border border-white/15 rounded-[28px] p-6 sm:p-7 shadow-2xl z-10"
          >
            <button
              type="button"
              role="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Mail size={22} />
            </div>

            <h3 id="contact-modal-title" className="text-xl font-bold text-white mb-2">
              {locale === 'en' ? "Let's connect" : 'Liên hệ với mình'}
            </h3>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
              {locale === 'en'
                ? "Whether you have an inquiry about mobile applications, web engineering, or AI agents, my inbox is always open."
                : 'Dù bạn muốn trao đổi về dự án di động, nền tảng web hay AI agents, mình luôn sẵn sàng kết nối.'}
            </p>

            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between mb-4">
              <span className="text-xs sm:text-sm font-mono text-white/90 truncate mr-2 select-all">
                {email}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
                title={locale === 'en' ? 'Copy email' : 'Sao chép email'}
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <Send size={14} />
                <span>{locale === 'en' ? 'Send Email' : 'Gửi email'}</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer"
              >
                <span>{locale === 'en' ? 'Done' : 'Đóng'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
