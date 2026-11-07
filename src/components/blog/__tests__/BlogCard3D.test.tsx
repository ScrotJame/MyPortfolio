// src/components/blog/__tests__/BlogCard3D.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlogCard3D } from '../BlogCard3D'
import type { BlogPost } from '../../../utils/blog'

const mockPost: BlogPost = {
  slug: 'review-cursor',
  title: 'Trải nghiệm Cursor AI Editor',
  date: '2026-10-25',
  category: 'app',
  platform: 'macOS / Windows',
  rating: '9.0/10',
  summary: 'Đánh giá chi tiết trình soạn thảo mã nguồn tích hợp AI đa mô hình.',
  content: '## Nội dung bài viết...',
}

describe('BlogCard3D', () => {
  it('renders title, summary, rating, and View Details button without hashtag tagline', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    render(<BlogCard3D post={mockPost} locale="vi" onSelect={handleSelect} />)

    expect(screen.getByText('Trải nghiệm Cursor AI Editor')).toBeInTheDocument()
    expect(screen.getByText(/Đánh giá chi tiết trình soạn thảo/i)).toBeInTheDocument()
    expect(screen.getByText('9.0/10')).toBeInTheDocument()
    expect(screen.getByText('macOS / Windows')).toBeInTheDocument()

    // Must NOT have artificial taglines like #APP-001
    expect(screen.queryByText(/#app-/i)).not.toBeInTheDocument()

    // Must have "Xem chi tiết →" button
    const ctaBtn = screen.getByRole('button', { name: /xem chi tiết/i })
    expect(ctaBtn).toBeInTheDocument()

    await user.click(ctaBtn)
    expect(handleSelect).toHaveBeenCalled()
  })

  it('renders English label for CTA button when locale is en', () => {
    render(<BlogCard3D post={mockPost} locale="en" onSelect={vi.fn()} />)
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument()
  })
})
