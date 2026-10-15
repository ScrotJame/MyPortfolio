import { BookOpen, Check, Home, MessageSquare, Route, Sparkles } from 'lucide-react'
import type { Locale } from '../data/content'
import type { Project } from '../data/projects'

export function ProjectCover({ id, locale }: { id: Project['id']; locale: Locale }) {
  const text = locale === 'en' ? {
    explorer: 'WORD EXPLORER', progress: 'A little progress, every day.', learn: 'Learn. Grow. Repeat.',
    support: 'Connected support', together: 'AI + human, together.', question: 'One question. Any channel.',
    conversation: 'A seamless conversation.', connected: 'HANOI / CONNECTED', everything: 'Everything, in one place.',
  } : {
    explorer: 'KHÁM PHÁ TỪ VỰNG', progress: 'Mỗi ngày, một bước tiến.', learn: 'Học hỏi. Tiến bộ. Lặp lại.',
    support: 'Hỗ trợ kết nối', together: 'AI + con người, cùng nhau.', question: 'Một câu hỏi. Mọi kênh hỗ trợ.',
    conversation: 'Cuộc hội thoại liền mạch.', connected: 'HÀ NỘI / KẾT NỐI', everything: 'Mọi thứ, trong một ứng dụng.',
  }
  if (id === 'dungeonary') return <div className="project-cover cover-dungeonary" aria-hidden="true"><span className="cover-wordmark">dungeonary<span>✦</span></span><span className="cover-orbit" /><div className="vocab-card"><span className="vocab-meta"><BookOpen size={14} /> {text.explorer}</span><span className="vocab-word">Adventure.</span><span className="vocab-definition">/ədˈventʃər/ · noun</span><span className="vocab-line" /><span className="vocab-footer">{text.progress}<span>↗</span></span></div><div className="word-chip"><Sparkles size={13} /> {text.learn}</div><span className="cover-index">01 / MOBILE</span></div>
  if (id === 'carx') return <div className="project-cover cover-carx" aria-hidden="true"><span className="cover-wordmark">car x<span>ev</span></span><div className="conversation"><div className="conversation-top"><span className="carx-avatar"><MessageSquare size={19} /></span><div><b>{text.support}</b><span>{text.together}</span></div><span className="green-dot" /></div><div className="chat-line chat-user">{text.question}</div><div className="chat-line chat-ai"><Sparkles size={13} /> {text.conversation}</div><div className="channels"><span>Inbox</span><span>Portal</span><span>WebChat</span></div></div><span className="cover-index">02 / WEB + AI</span></div>
  if (id === 'dispatch') return <div className="project-cover cover-dispatch" aria-hidden="true"><span className="cover-wordmark">in motion<span><Route size={20} /></span></span><svg className="route-art" viewBox="0 0 500 250" fill="none"><path className="map-road" d="M-20 75L140 75 140 200 310 200 310 -10M60 280V135H400V260M-20 30H220V110H520M230 280V-10M390 -10V70H520" /><path d="M70 182H140V75H310V142H407" stroke="#f87736" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="70" cy="182" r="10" fill="#f87736" stroke="#fff" strokeWidth="4" /><circle cx="407" cy="142" r="10" fill="#f87736" stroke="#fff" strokeWidth="4" /><circle cx="310" cy="75" r="20" fill="#f87736" fillOpacity=".13" /><circle cx="310" cy="75" r="6" fill="#f87736" /></svg><span className="dispatch-label"><span className="green-dot" /> {text.connected}</span><span className="cover-index">03 / WEB + AI</span></div>
  return <div className="project-cover cover-rentify" aria-hidden="true"><span className="cover-wordmark">rentify<span><Home size={21} /></span></span><div className="house-art"><div className="house-roof" /><div className="house-body"><div className="house-window" /><div className="house-window" /><div className="house-door" /></div></div><div className="rentify-chip"><Check size={14} /> {text.everything}</div><span className="cover-index">04 / MOBILE + WEB</span></div>
}
