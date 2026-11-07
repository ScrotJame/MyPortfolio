// src/components/blog/__tests__/BlogShelfFilter.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlogShelfFilter } from '../BlogShelfFilter'

describe('BlogShelfFilter', () => {
  it('renders shelf tabs with counts and responds to category change', async () => {
    const user = userEvent.setup()
    const handleCategoryChange = vi.fn()
    const handleSearchChange = vi.fn()

    render(
      <BlogShelfFilter
        locale="vi"
        activeCategory="all"
        counts={{ all: 4, app: 2, game: 2 }}
        searchQuery=""
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
    )

    expect(screen.getByRole('button', { name: /tất cả/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ứng dụng/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /trò chơi/i })).toBeInTheDocument()

    const appBtn = screen.getByRole('button', { name: /ứng dụng/i })
    await user.click(appBtn)
    expect(handleCategoryChange).toHaveBeenCalledWith('app')
  })

  it('triggers search query callback when user types in search box', async () => {
    const user = userEvent.setup()
    const handleSearchChange = vi.fn()

    render(
      <BlogShelfFilter
        locale="en"
        activeCategory="all"
        counts={{ all: 2, app: 1, game: 1 }}
        searchQuery=""
        onCategoryChange={vi.fn()}
        onSearchChange={handleSearchChange}
      />
    )

    const searchInput = screen.getByPlaceholderText(/search archives/i)
    await user.type(searchInput, 'Cursor')
    expect(handleSearchChange).toHaveBeenCalled()
  })
})
