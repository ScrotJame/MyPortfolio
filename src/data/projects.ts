import type { Locale } from './content'

export type Category = 'All' | 'Mobile' | 'Web' | 'AI'
export type Localized<T = string> = Record<Locale, T>
export interface Project {
  id: 'dungeonary' | 'carx' | 'dispatch' | 'rentify'
  name: string
  label: Localized
  description: Localized
  role: Localized
  date: Localized
  categories: Category[]
  tech: string[]
  details: Localized<string[]>
  repo?: string
  status?: Localized
}

export const projects: Project[] = [
  {
    id: 'dungeonary', name: 'Dungeonary',
    label: { en: 'Vocabulary, with a sense of adventure.', vi: 'Học từ vựng với tinh thần phiêu lưu.' },
    description: { en: 'A local-first vocabulary app that pairs spaced repetition with evolving companions.', vi: 'Ứng dụng học từ vựng local-first, kết hợp ôn tập ngắt quãng và bạn đồng hành tiến hóa.' },
    role: { en: 'Personal project · Mobile development', vi: 'Dự án cá nhân · Phát triển di động' },
    date: { en: 'Apr 2026 — Present', vi: '04/2026 — Hiện tại' },
    categories: ['Mobile'], tech: ['Flutter', 'Dart', 'BLoC', 'Drift / SQLite'],
    details: {
      en: ['Designed a local-first database with 10+ relational tables, foreign keys, and cascade deletion.', 'Built evolving pet/plant companions and a spaced-repetition vocabulary review workflow.', 'Separated Domain, Data, and Presentation using Clean Architecture and repositories.', 'Connected native Android alarm scheduling to Flutter through Kotlin MethodChannels for review reminders.'],
      vi: ['Thiết kế database local-first với hơn 10 bảng quan hệ, khóa ngoại và cascade delete.', 'Xây dựng bạn đồng hành pet/plant tiến hóa và luồng ôn từ vựng bằng spaced repetition.', 'Tách Domain, Data và Presentation bằng Clean Architecture cùng Repository Pattern.', 'Kết nối lịch nhắc ôn tập Android native với Flutter qua Kotlin MethodChannel.'],
    }, repo: 'https://github.com/ScrotJame/App_1',
  },
  {
    id: 'carx', name: 'Car X EV',
    label: { en: 'One conversation. Every channel.', vi: 'Một cuộc hội thoại. Nhiều kênh hỗ trợ.' },
    description: { en: 'A multi-channel support platform connecting AI agents, customers, and human support.', vi: 'Nền tảng hỗ trợ đa kênh kết nối AI agent, khách hàng và nhân viên chăm sóc.' },
    role: { en: 'Full-Stack Engineer', vi: 'Kỹ sư Full-Stack' },
    date: { en: 'Jul — Sep 2026', vi: '07 — 09/2026' },
    categories: ['Web', 'AI'], tech: ['React', 'FastAPI', 'PostgreSQL', 'WebSocket'],
    details: {
      en: ['Built Staff Inbox, Customer Portal, and Guest WebChat with React/Vite, Redux Toolkit, and React Query.', 'Delivered streaming AI responses via NDJSON and live updates through WebSocket.', 'Developed asynchronous FastAPI services and a 24-table PostgreSQL schema using async SQLAlchemy.', 'Connected agent tools to backend data and implemented AI-to-human handoff within the same inbox.'],
      vi: ['Xây dựng Staff Inbox, Customer Portal và Guest WebChat bằng React/Vite, Redux Toolkit và React Query.', 'Triển khai phản hồi AI streaming qua NDJSON và cập nhật trực tiếp bằng WebSocket.', 'Phát triển service FastAPI bất đồng bộ và schema PostgreSQL 24 bảng bằng async SQLAlchemy.', 'Kết nối công cụ agent với dữ liệu backend và triển khai chuyển tiếp AI sang nhân viên trong cùng inbox.'],
    },
  },
  {
    id: 'dispatch', name: 'EV Driver Coordination',
    label: { en: 'A clearer view of city-wide dispatch.', vi: 'Góc nhìn rõ ràng hơn về điều phối.' },
    description: { en: '', vi: '' },
    role: { en: 'Team contribution · VSF internship', vi: 'Đóng góp trong nhóm · Thực tập VSF' },
    date: { en: 'Sep 2026 — Present', vi: '09/2026 — Hiện tại' },
    categories: ['Web', 'AI'], tech: ['React', 'TypeScript', 'FastAPI', 'TomTom'],
    details: {
      en: ['Built a dashboard with 2D/3D maps for drivers, routes, and dispatch proposals; integrated TomTom traffic and routing through FastAPI.', 'Implemented suggestions every 15 minutes with notifications and synchronized results for operator approval.', 'Built a 6,000-driver simulation comparing GMV, completed trips, and income with and without dispatch.', 'Reduced interval processing from 90.06s to 22.36s (about 75%) in a documented local benchmark with two worlds and memory tracing enabled; added pytest and Vitest coverage.'],
      vi: ['Xây dựng dashboard bản đồ 2D/3D cho tài xế, tuyến đường và đề xuất điều phối; tích hợp giao thông, định tuyến TomTom qua FastAPI.', 'Triển khai đề xuất mỗi 15 phút, thông báo và đồng bộ kết quả để điều hành viên phê duyệt.', 'Xây dựng mô phỏng 6.000 tài xế, so sánh GMV, chuyến hoàn thành và thu nhập giữa hai phương án.', 'Giảm thời gian xử lý từ 90,06s xuống 22,36s (khoảng 75%) trong benchmark local được ghi nhận, bật hai world và memory tracing; bổ sung test pytest và Vitest.'],
    },
  },
  {
    id: 'rentify', name: 'Rentify',
    label: { en: 'Rental management, brought together.', vi: 'Quản lý cho thuê, trong một ứng dụng.' },
    description: { en: 'A cross-platform rental management application for rooms, contracts, and invoices.', vi: 'Ứng dụng quản lý cho thuê đa nền tảng cho phòng, hợp đồng và hóa đơn.' },
    role: { en: 'Personal project · Mobile & backend', vi: 'Dự án cá nhân · Mobile & backend' },
    date: { en: 'Feb 2025 — Paused', vi: '02/2025 — Tạm dừng' },
    categories: ['Mobile', 'Web'], tech: ['Flutter', 'Laravel', 'BLoC', 'REST API'],
    status: { en: 'Paused', vi: 'Tạm dừng' },
    details: {
      en: ['Built a cross-platform Android/iOS rental management application with Clean Architecture.', 'Used BLoC/Cubit to manage room, contract, and invoice state with immediate UI updates.', 'Designed relational data and Laravel REST APIs with authentication and data validation.'],
      vi: ['Xây dựng ứng dụng quản lý cho thuê Android/iOS với Clean Architecture.', 'Dùng BLoC/Cubit quản lý trạng thái phòng, hợp đồng và hóa đơn, cập nhật UI ngay khi dữ liệu thay đổi.', 'Thiết kế dữ liệu quan hệ và REST API Laravel có xác thực, kiểm tra dữ liệu.'],
    }, repo: 'https://github.com/ScrotJame/Rentify',
  },
]
