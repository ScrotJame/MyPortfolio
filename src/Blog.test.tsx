import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

beforeEach(() => {
  window.history.pushState(null, '', '/')
  window.location.hash = ''
  localStorage.clear()
})

describe('blog visitor flows', () => {
  it('navigates to blog, filters by dev mode, opens post and returns', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Initially in bento portfolio view
    expect(screen.getByText(/hello!/i)).toBeInTheDocument()

    // 1. Click "Blog" button from top bar
    const blogBtn = screen.getAllByRole('button', { name: /blog/i })[0]
    await user.click(blogBtn)

    // Should display Blog header
    expect(screen.getByRole('heading', { name: /App & Game Reviews/ })).toBeVisible()

    // 2. Test App Dev / Game Dev switcher in subheader
    // Switch to Game Dev mode
    const gameDevBtn = screen.getByRole('button', { name: 'Game Dev' })
    await user.click(gameDevBtn)

    expect(
      screen.getByRole('button', {
        name: 'Trải nghiệm Black Myth: Wukong — Tuyệt phẩm hành động đậm chất Tây Du Ký',
      }),
    ).toBeVisible()
    expect(screen.getByText('9.2/10')).toBeVisible()

    // Switch to App Dev mode
    const appDevBtn = screen.getByRole('button', { name: 'App Dev' })
    await user.click(appDevBtn)

    expect(
      screen.getByRole('button', {
        name: /Trải nghiệm Cursor/,
      }),
    ).toBeVisible()
    expect(screen.getByText('9.0/10')).toBeVisible()

    // 3. Click to read the Cursor review post
    await user.click(screen.getByRole('button', { name: /Trải nghiệm Cursor/ }))

    // Verify detail view content and Markdown rendering
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Trải nghiệm Cursor/,
      }),
    ).toBeVisible()
    expect(screen.getByText(/Những điểm sáng đắt giá/)).toBeVisible()
    expect(screen.getAllByText(/Composer/).length).toBeGreaterThan(0)

    // Click back to blog list
    const backBtn = screen.getByRole('button', { name: /Back to all posts/ })
    await user.click(backBtn)
    expect(screen.getByRole('heading', { name: /App & Game Reviews/ })).toBeVisible()

    // 4. Return to Bento Portfolio
    const homeBtn = screen.getByRole('link', { name: /Cuong Nguyen — Home|Cường Nguyễn — Trang chủ/i })
    await user.click(homeBtn)
    expect(screen.getByText(/Digital Pass/i)).toBeInTheDocument()
  })
})
