import { memo } from 'react'
import { Search, Sparkles, Smartphone, Gamepad2, X } from 'lucide-react'

export interface BlogShelfFilterProps {
  locale: 'en' | 'vi'
  activeCategory: 'all' | 'app' | 'game'
  counts: { all: number; app: number; game: number }
  searchQuery: string
  onCategoryChange: (category: 'all' | 'app' | 'game') => void
  onSearchChange: (query: string) => void
}

export const BlogShelfFilter = memo(function BlogShelfFilter({
  locale,
  activeCategory,
  counts,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: BlogShelfFilterProps) {
  const isVi = locale === 'vi'

  const shelves: Array<{ id: 'all' | 'app' | 'game'; label: string; count: number; icon: React.ReactNode }> = [
    {
      id: 'all',
      label: isVi ? 'Tất cả Kệ' : 'All Archives',
      count: counts.all,
      icon: <Sparkles size={14} className="text-emerald-400" />,
    },
    {
      id: 'app',
      label: isVi ? 'Kệ 01: Ứng dụng' : 'Shelf 01: Dev Apps',
      count: counts.app,
      icon: <Smartphone size={14} className="text-emerald-400" />,
    },
    {
      id: 'game',
      label: isVi ? 'Kệ 02: Trò chơi' : 'Shelf 02: Gaming',
      count: counts.game,
      icon: <Gamepad2 size={14} className="text-purple-400" />,
    },
  ]

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
      {/* Shelf Catalog Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {shelves.map((shelf) => {
          const isActive = activeCategory === shelf.id
          return (
            <button
              key={shelf.id}
              type="button"
              onClick={() => onCategoryChange(shelf.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white/10 text-white border border-white/20 shadow-sm shadow-black/40'
                  : 'bg-white/[0.02] text-white/50 hover:text-white/80 hover:bg-white/[0.06] border border-white/5'
              }`}
            >
              {shelf.icon}
              <span>{shelf.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                }`}
              >
                {shelf.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Real-time Keyword Search */}
      <div className="relative w-full md:w-64">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={isVi ? 'Tìm kiếm hồ sơ lưu trữ...' : 'Search archives...'}
          className="w-full pl-8.5 pr-8 py-2 rounded-xl bg-white/[0.03] border border-white/10 focus:border-emerald-400/60 focus:bg-white/[0.06] text-xs text-white placeholder:text-white/35 focus:outline-none transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>
    </div>
  )
})
