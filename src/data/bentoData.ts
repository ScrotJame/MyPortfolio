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
    },
    {
      id: 'agentic-hub',
      title: { en: 'Agentic Workflow Studio', vi: 'Studio quy trình AI Agent' },
      category: { en: 'AI Engineering · Autonomous Tools', vi: 'Kỹ thuật AI · Công cụ tự động' },
      description: {
        en: 'Autonomous developer assistant environment orchestrating multi-agent collaboration and real-time execution.',
        vi: 'Môi trường trợ lý lập trình tự hành điều phối đa tác tử AI và thực thi tác vụ thời gian thực.'
      },
      iconGradient: 'from-blue-600 to-indigo-600',
      tech: ['TypeScript', 'FastAPI', 'Claude/Gemini APIs', 'Docker'],
      details: {
        en: [
          'Architected decoupled agent protocols with asynchronous tool execution loops.',
          'Implemented self-correcting code generation and static verification pipelines.',
          'Delivered real-time streaming output with low-latency WebSocket connections.'
        ],
        vi: [
          'Thiết kế giao thức agent phân tán với vòng lặp thực thi công cụ bất đồng bộ.',
          'Xây dựng pipeline sinh mã tự sửa lỗi và kiểm chứng tĩnh trước khi chạy.',
          'Cung cấp phản hồi streaming thời gian thực qua kết nối WebSocket độ trễ thấp.'
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
    },
    {
      id: 'unity-shader-lab',
      title: { en: '3D Shader Lab & Procedural FX', vi: 'Phòng thí nghiệm Shader 3D & FX' },
      category: { en: 'Technical Art · Shaders & Lighting', vi: 'Technical Art · Shader & Chiếu sáng' },
      description: {
        en: 'Custom vertex/fragment shaders, holographic shields, and post-processing visual pipelines.',
        vi: 'Shader đỉnh/phân mảnh tùy chỉnh, khiên năng lượng hologram và pipeline xử lý hậu kỳ.'
      },
      iconGradient: 'from-fuchsia-600 to-pink-600',
      tech: ['Shader Graph', 'HLSL', 'URP', 'VFX Graph'],
      details: {
        en: [
          'Authored high-performance surface and unlit shaders in Universal Render Pipeline.',
          'Created real-time holographic scan lines and fresnel rim lighting effects.',
          'Optimized fill-rate and draw calls for target 60fps mobile execution.'
        ],
        vi: [
          'Viết shader bề mặt và unlit hiệu năng cao trong Universal Render Pipeline.',
          'Tạo hiệu ứng quét hologram thời gian thực và ánh sáng viền fresnel.',
          'Tối ưu hóa fill-rate và draw calls để đảm bảo 60fps trên thiết bị di động.'
        ]
      }
    },
    {
      id: 'vr-spatial-quest',
      title: { en: 'VR Spatial Quest & Physics Rig', vi: 'Không gian VR & Tương tác vật lý' },
      category: { en: 'XR Experience · Spatial Interaction', vi: 'Trải nghiệm XR · Tương tác không gian' },
      description: {
        en: 'Immersive virtual reality prototype featuring hand-tracking physics and spatial audio feedback.',
        vi: 'Bản mẫu thực tế ảo nhập vai với vật lý tương tác cử chỉ tay và âm thanh không gian 3D.'
      },
      iconGradient: 'from-amber-500 to-rose-600',
      tech: ['Unity XR', 'OpenXR', 'C#', 'Spatial Audio'],
      details: {
        en: [
          'Configured XR Interaction Toolkit with custom grab, throw, and socket behaviors.',
          'Calibrated haptic feedback curves and 3D spatialized binaural audio sources.',
          'Designed comfortable locomotion mechanics reducing motion sickness.'
        ],
        vi: [
          'Cấu hình XR Interaction Toolkit với cơ chế cầm nắm, ném và lắp ghép vật lý.',
          'Tinh chỉnh phản hồi rung xúc giác và nguồn âm thanh vòm 3D định hướng.',
          'Thiết kế cơ chế di chuyển mượt mà giảm thiểu hiện tượng say chuyển động.'
        ]
      }
    },
    {
      id: 'procedural-dungeon',
      title: { en: 'Procedural 3D Dungeon Crawler', vi: 'Hầm ngục thủ tục 3D' },
      category: { en: 'Procedural Generation · Algorithms', vi: 'Sinh bản đồ thủ tục · Thuật toán' },
      description: {
        en: 'Algorithmic dungeon layout generator with dynamic enemy spawning and loot progression.',
        vi: 'Bộ sinh kiến trúc hầm ngục tự động theo thuật toán với cơ chế sinh quái và trang bị.'
      },
      iconGradient: 'from-rose-600 to-purple-700',
      tech: ['Unity', 'C#', 'BSP Algorithm', 'NavMesh'],
      details: {
        en: [
          'Implemented Binary Space Partitioning (BSP) for infinite distinct dungeon layouts.',
          'Generated runtime NavMesh data ensuring valid pathfinding for AI agents.',
          'Constructed responsive modular room tile sets and dynamic lighting.'
        ],
        vi: [
          'Ứng dụng thuật toán Binary Space Partitioning (BSP) tạo vô số biến thể bản đồ.',
          'Tự động sinh dữ liệu NavMesh thời gian thực đảm bảo AI tìm đường chính xác.',
          'Xây dựng bộ tile phòng ốc module hóa và hệ thống chiếu sáng động.'
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

