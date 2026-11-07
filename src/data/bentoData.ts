export type BentoTrack = 'app' | 'game'

export interface BentoProject {
  id: string
  title: { en: string; vi: string }
  category: { en: string; vi: string }
  description: { en: string; vi: string }
  iconGradient: string
  tech: string[]
  link?: string
  repo?: string
  details: { en: string[]; vi: string[] }
}

export interface BentoProfile {
  handle: string
  status: { en: string; vi: string }
  title: { en: string; vi: string }
  bio: { en: string; vi: string }
  skills: string[]
}

export const bentoContent: Record<BentoTrack, Record<'en' | 'vi', BentoProfile>> = {
  app: {
    en: {
      handle: '@cuongnsm',
      status: { en: 'Open to opportunities', vi: 'Sẵn sàng nhận cơ hội mới' },
      title: { en: 'Software Engineer', vi: 'Kỹ sư phần mềm' },
      bio: {
        en: 'Bridging polished interfaces with solid engineering — from Flutter cross-platform applications to full-stack web platforms and autonomous AI agents.',
        vi: 'Kết nối giao diện chỉn chu với kiến trúc kỹ thuật vững chắc — từ ứng dụng di động Flutter đến nền tảng Web và tích hợp AI Agents thực tế.'
      },
      skills: ['Flutter', 'React', 'TypeScript', 'Dart', 'FastAPI', 'AI Agents', 'SQLite', 'PostgreSQL']
    },
    vi: {
      handle: '@cuongnsm',
      status: { en: 'Open to opportunities', vi: 'Sẵn sàng nhận cơ hội mới' },
      title: { en: 'Software Engineer', vi: 'Kỹ sư phần mềm' },
      bio: {
        en: 'Bridging polished interfaces with solid engineering — from Flutter cross-platform applications to full-stack web platforms and autonomous AI agents.',
        vi: 'Kết nối giao diện chỉn chu với kiến trúc kỹ thuật vững chắc — từ ứng dụng di động Flutter đến nền tảng Web và tích hợp AI Agents thực tế.'
      },
      skills: ['Flutter', 'React', 'TypeScript', 'Dart', 'FastAPI', 'AI Agents', 'SQLite', 'PostgreSQL']
    }
  },
  game: {
    en: {
      handle: '@cuongnsm',
      status: { en: 'Crafting interactive worlds', vi: 'Kiến tạo thế giới tương tác' },
      title: { en: 'Game Developer', vi: 'Lập trình viên Game' },
      bio: {
        en: 'Building immersive games and interactive 3D simulations with Unity, C#, 3D math, dynamic physics, and seamless native platform bridges.',
        vi: 'Phát triển game và mô phỏng 3D tương tác với Unity, C#, toán 3D, vật lý mô phỏng và kết nối nền tảng native mượt mà.'
      },
      skills: ['Unity', 'C#', 'C++', '3D Math', 'Game Physics', 'Shader Graph', 'Platform Channels', 'OOP']
    },
    vi: {
      handle: '@cuongnsm',
      status: { en: 'Crafting interactive worlds', vi: 'Kiến tạo thế giới tương tác' },
      title: { en: 'Game Developer', vi: 'Lập trình viên Game' },
      bio: {
        en: 'Building immersive games and interactive 3D simulations with Unity, C#, 3D math, dynamic physics, and seamless native platform bridges.',
        vi: 'Phát triển game và mô phỏng 3D tương tác với Unity, C#, toán 3D, vật lý mô phỏng và kết nối nền tảng native mượt mà.'
      },
      skills: ['Unity', 'C#', 'C++', '3D Math', 'Game Physics', 'Shader Graph', 'Platform Channels', 'OOP']
    }
  }
}

export const bentoProjects: Record<BentoTrack, BentoProject[]> = {
  app: [
    {
      id: 'ev-dispatch',
      title: { en: 'EV Fleet Dispatch Dashboard', vi: 'Hệ thống điều phối xe điện EV' },
      category: { en: 'Web Platform · AI & Simulation', vi: 'Nền tảng Web · AI & Mô phỏng' },
      description: {
        en: 'Dashboard for an AI-assisted EV driver coordination MVP with 2D/3D map dispatch proposals and simulation analysis.',
        vi: 'Dashboard điều phối tài xế xe điện hỗ trợ bởi AI với bản đồ 2D/3D, đề xuất điều phối và phân tích mô phỏng.'
      },
      iconGradient: 'from-emerald-500 to-cyan-500',
      tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Mapbox'],
      details: {
        en: [
          'Engineered responsive interactive dispatch dashboards with real-time driver telemetry.',
          'Integrated AI simulation pipelines to optimize charging and passenger routes.',
          'Built reliable state management for complex geospatial layers.'
        ],
        vi: [
          'Xây dựng dashboard điều phối tương tác phản hồi với dữ liệu tài xế theo thời gian thực.',
          'Tích hợp pipeline mô phỏng AI tối ưu tuyến đường sạc và đón trả khách.',
          'Quản lý trạng thái đáng tin cậy cho các lớp bản đồ không gian địa lý phức tạp.'
        ]
      }
    },
    {
      id: 'carx-ai',
      title: { en: 'CarX AI Automotive Assistant', vi: 'Trợ lý ô tô CarX AI' },
      category: { en: 'AI Platform · Voice & Diagnostics', vi: 'Nền tảng AI · Thoại & Chẩn đoán' },
      description: {
        en: 'Intelligent automotive diagnostic assistant powered by LLM agent workflows and live telemetry streaming.',
        vi: 'Trợ lý chẩn đoán ô tô thông minh ứng dụng workflow AI Agent và streaming dữ liệu thời gian thực.'
      },
      iconGradient: 'from-cyan-500 to-blue-600',
      tech: ['LangGraph', 'FastAPI', 'React', 'pgvector'],
      repo: 'https://github.com/cuongnsm/carx-ai',
      details: {
        en: [
          'Implemented streaming conversational diagnostic sessions using LangGraph and RAG.',
          'Built vector retrieval over comprehensive vehicle maintenance databases.',
          'Designed intuitive driver query flows with audio voice interaction.'
        ],
        vi: [
          'Phát triển luồng hội thoại chẩn đoán trực tiếp bằng LangGraph và RAG.',
          'Xây dựng tra cứu vector trên cơ sở dữ liệu bảo dưỡng xe toàn diện.',
          'Thiết kế giao diện tương tác giọng nói trực quan cho người lái xe.'
        ]
      }
    },
    {
      id: 'dungeonary',
      title: { en: 'Dungeonary: English Vocab Quest', vi: 'Dungeonary: Học từ vựng nhập vai' },
      category: { en: 'Mobile App · Flutter & Gamification', vi: 'Ứng dụng di động · Flutter & Game hóa' },
      description: {
        en: 'Gamified English vocabulary learning mobile application built with Flutter, BLoC, and Clean Architecture.',
        vi: 'Ứng dụng di động học từ vựng tiếng Anh game hóa xây dựng với Flutter, BLoC và Clean Architecture.'
      },
      iconGradient: 'from-amber-500 to-orange-600',
      tech: ['Flutter', 'Dart', 'BLoC', 'SQLite'],
      repo: 'https://github.com/cuongnsm/dungeonary',
      details: {
        en: [
          'Structured codebase according to Clean Architecture and BLoC state management.',
          'Engineered offline-first SQLite synchronization for seamless vocabulary review.',
          'Integrated spaced repetition memory algorithms into quest gameplay mechanics.'
        ],
        vi: [
          'Thiết kế cấu trúc mã nguồn theo Clean Architecture và quản lý trạng thái BLoC.',
          'Xây dựng cơ chế đồng bộ SQLite offline-first để ôn tập từ vựng không cần mạng.',
          'Tích hợp thuật toán lặp lại ngắt quãng (Spaced Repetition) vào cơ chế chơi game.'
        ]
      }
    },
    {
      id: 'rentify',
      title: { en: 'Rentify: Smart Property Rental', vi: 'Rentify: Thuê trọ thông minh' },
      category: { en: 'Mobile App · Flutter Ecosystem', vi: 'Ứng dụng di động · Hệ sinh thái Flutter' },
      description: {
        en: 'All-in-one property rental management mobile application featuring instant search and tenant communications.',
        vi: 'Ứng dụng di động quản lý và tìm kiếm thuê trọ tất cả trong một với tìm kiếm tức thì và trò chuyện.'
      },
      iconGradient: 'from-teal-500 to-emerald-600',
      tech: ['Flutter', 'REST API', 'GetX'],
      repo: 'https://github.com/cuongnsm/rentify',
      details: {
        en: [
          'Designed modular UI components with responsive mobile layouts.',
          'Integrated location-based property filtering and detailed media previews.',
          'Maintained high 60fps scrolling performance through list virtualization.'
        ],
        vi: [
          'Thiết kế các component UI module hóa với layout di động thích ứng.',
          'Tích hợp bộ lọc bất động sản theo vị trí và xem trước hình ảnh/video chi tiết.',
          'Duy trì hiệu năng cuộn mượt 60fps thông qua kỹ thuật ảo hóa danh sách.'
        ]
      }
    }
  ],
  game: [
    {
      id: 'enspire-unity-ios',
      title: { en: 'Enspire 3D Game & iOS Bridge', vi: 'Enspire 3D Game & Cầu nối iOS' },
      category: { en: 'Unity 3D · Native Platform Channel', vi: 'Unity 3D · Cầu nối nền tảng Native' },
      description: {
        en: 'Integrated Unity 3D interactive game modules into native iOS and Flutter application environments.',
        vi: 'Tích hợp các module game tương tác Unity 3D vào môi trường ứng dụng iOS native và Flutter.'
      },
      iconGradient: 'from-purple-500 to-pink-600',
      tech: ['Unity', 'C#', 'Objective-C', 'Platform Channels'],
      details: {
        en: [
          'Established bidirectional Platform Channels between Flutter/iOS and Unity engine.',
          'Optimized memory lifecycle management and native view embedding.',
          'Refined character animations and interactive 3D asset rendering.'
        ],
        vi: [
          'Thiết lập Platform Channels hai chiều giữa Flutter/iOS và Unity engine.',
          'Tối ưu hóa vòng đời bộ nhớ và nhúng khung nhìn native không gián đoạn.',
          'Hoàn thiện animation nhân vật và kết xuất mô hình 3D tương tác.'
        ]
      }
    },
    {
      id: 'imsoft-game-intern',
      title: { en: 'Arcade Physics & Level Engine', vi: 'Cơ chế vật lý Arcade & Level Engine' },
      category: { en: 'Game Architecture · Mechanics & Audio', vi: 'Kiến trúc Game · Cơ chế & Âm thanh' },
      description: {
        en: 'Developed core gameplay physics loops, collision systems, and dynamic particle effects.',
        vi: 'Phát triển vòng lặp vật lý gameplay cốt lõi, hệ thống va chạm và hiệu ứng hạt sống động.'
      },
      iconGradient: 'from-violet-600 to-indigo-700',
      tech: ['Unity', 'C#', '2D Physics', 'Particle System'],
      details: {
        en: [
          'Programmed responsive character movement and custom physics collision detection.',
          'Designed procedural particle effects and audio triggers on impact.',
          'Profiled CPU/GPU usage on mobile devices using Unity Profiler.'
        ],
        vi: [
          'Lập trình di chuyển nhân vật nhạy bén và xử lý va chạm vật lý tùy chỉnh.',
          'Thiết kế hiệu ứng hạt thủ tục và kích hoạt âm thanh khi va chạm.',
          'Kiểm tra hiệu năng CPU/GPU trên thiết bị di động bằng Unity Profiler.'
        ]
      }
    }
  ]
}

export function getHanoiTime(date: Date = new Date()): { timeString: string; timeZone: string } {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  return {
    timeString: formatter.format(date),
    timeZone: 'GMT+7'
  }
}

