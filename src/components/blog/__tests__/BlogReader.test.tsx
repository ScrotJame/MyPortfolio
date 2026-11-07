import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlogReader } from '../BlogReader'
import type { BlogPost } from '../../../utils/blog'

const mockPost: BlogPost = {
  slug: 'review-cursor',
  title: 'Trải nghiệm Cursor AI Editor',
  date: '2026-10-25',
  category: 'app',
  platform: 'macOS / Windows',
  rating: '9.0/10',
  summary: 'Đánh giá chi tiết trình soạn thảo mã nguồn tích hợp AI đa mô hình.',
  content: '## Ấn tượng ban đầu\n\nCursor mang lại cảm giác cực kỳ thân thuộc.',
}

describe('BlogReader', () => {
  it('renders article title, rating, platform, and back button', async () => {
    const user = userEvent.setup()
    const handleBack = vi.fn()

    render(<BlogReader post={mockPost} locale="vi" onBack={handleBack} />)

    expect(screen.getByRole('heading', { level: 1, name: 'Trải nghiệm Cursor AI Editor' })).toBeInTheDocument()
    expect(screen.getByText('9.0/10')).toBeInTheDocument()
    expect(screen.getByText(/ấn tượng ban đầu/i)).toBeInTheDocument()

    const backBtn = screen.getByRole('button', { name: /quay lại thư viện/i })
    expect(backBtn).toBeInTheDocument()

    await user.click(backBtn)
    expect(handleBack).toHaveBeenCalled()
  })

  it('renders English back label when locale is en', () => {
    render(<BlogReader post={mockPost} locale="en" onBack={vi.fn()} />)
    expect(screen.getByRole('button', { name: /back to archives/i })).toBeInTheDocument()
  })
})
