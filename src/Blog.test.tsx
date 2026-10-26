import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

beforeEach(() => {
  window.history.pushState(null, '', '/')
  window.location.hash = ''
  localStorage.clear()
})

describe('blog visitor flows', () => {
  it('navigates to blog via left drawer, filters by dev mode, opens post and returns', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Initially in portfolio view
    expect(screen.getByRole('heading', { name: /Building mobile/ })).toBeVisible()

    // 1. Open left drawer by clicking the list menu icon at left corner
    const leftDrawerBtn = screen.getByRole('button', { name: /Open navigation menu|Mở menu danh mục/ })
    await user.click(leftDrawerBtn)

    // 2. Click "Blog" option inside drawer
    const blogItemBtn = screen.getByRole('button', { name: /Blog/ })
    await user.click(blogItemBtn)

    // Should display Blog header
    expect(screen.getByRole('heading', { name: /App & Game Reviews/ })).toBeVisible()

    // 3. Test App Dev / Game Dev switcher in subheader
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

    // 4. Click to read the Cursor review post
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

    // 5. Open left drawer and switch back to Portfolio
    await user.click(leftDrawerBtn)
    const drawer = screen.getByRole('complementary', { name: /Spaces|Không gian/ })
    const portfolioItemBtn = within(drawer).getByRole('button', { name: /Portfolio/ })
    await user.click(portfolioItemBtn)
    expect(screen.getByRole('heading', { name: /Building mobile/ })).toBeVisible()
  })
})
