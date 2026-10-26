import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

beforeEach(() => {
  window.location.hash = ''
  localStorage.clear()
})

describe('blog visitor flows', () => {
  it('navigates to blog, displays test review post, opens details and returns', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Initially in portfolio view
    expect(screen.getByRole('heading', { name: /Building mobile/ })).toBeVisible()

    // Switch to Blog view via the header switch
    const blogBtn = screen.getByRole('button', { name: 'Blog' })
    await user.click(blogBtn)

    // Should display Blog header and the sample review card
    expect(screen.getByRole('heading', { name: /App & Game Reviews/ })).toBeVisible()
    expect(
      screen.getByRole('button', {
        name: 'Trải nghiệm Black Myth: Wukong — Tuyệt phẩm hành động đậm chất Tây Du Ký',
      }),
    ).toBeVisible()
    expect(screen.getByText('9.2/10')).toBeVisible()

    // Click to read the review post
    await user.click(
      screen.getByRole('button', {
        name: 'Trải nghiệm Black Myth: Wukong — Tuyệt phẩm hành động đậm chất Tây Du Ký',
      }),
    )

    // Verify detail view content and Markdown rendering
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Trải nghiệm Black Myth: Wukong — Tuyệt phẩm hành động đậm chất Tây Du Ký',
      }),
    ).toBeVisible()
    expect(screen.getByText(/Ấn tượng đầu tiên: Mỹ thuật và Đồ họa choáng ngợp/)).toBeVisible()
    expect(screen.getByText(/Bộ kỹ năng Gậy thần thoại/)).toBeVisible()

    // Click back to blog list
    const backBtn = screen.getByRole('button', { name: /Back to all posts/ })
    await user.click(backBtn)
    expect(screen.getByRole('heading', { name: /App & Game Reviews/ })).toBeVisible()

    // Switch back to Portfolio
    const portfolioBtn = screen.getByRole('button', { name: 'Portfolio' })
    await user.click(portfolioBtn)
    expect(screen.getByRole('heading', { name: /Building mobile/ })).toBeVisible()
  })
})
