import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BlogVaultLayout } from './components/blog/BlogVaultLayout'

describe('BlogVaultLayout', () => {
  it('renders library header, shelf filters, card deck, and navigates to reader view', async () => {
    const user = userEvent.setup()
    const handleSelectPost = vi.fn()
    const handleNavigateHome = vi.fn()

    const { rerender } = render(
      <BlogVaultLayout
        locale="vi"
        activeSlug={null}
        onLocaleChange={vi.fn()}
        onSelectPost={handleSelectPost}
        onNavigateHome={handleNavigateHome}
      />
    )

    // Verify Header and Shelf filters
    expect(screen.getByText(/digital archives/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tất cả kệ/i })).toBeInTheDocument()

    // Verify "Xem chi tiết" buttons on cards
    const viewButtons = screen.getAllByRole('button', { name: /xem chi tiết/i })
    expect(viewButtons.length).toBeGreaterThan(0)

    // Click "Xem chi tiết" on the first card
    await user.click(viewButtons[0])
    expect(handleSelectPost).toHaveBeenCalled()

    // Rerender with active post slug to simulate reader mode
    rerender(
      <BlogVaultLayout
        locale="vi"
        activeSlug="review-cursor"
        onLocaleChange={vi.fn()}
        onSelectPost={handleSelectPost}
        onNavigateHome={handleNavigateHome}
      />
    )

    expect(screen.getByRole('button', { name: /quay lại thư viện/i })).toBeInTheDocument()
  })
})
