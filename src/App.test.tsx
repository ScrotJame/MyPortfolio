import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

beforeEach(() => { localStorage.clear(); document.documentElement.removeAttribute('data-theme') })

describe('portfolio visitor flows', () => {
  it('switches every section to Vietnamese and restores that choice after a reload', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await user.click(screen.getByRole('button', { name: 'Tiếng Việt' }))
    expect(screen.getByRole('heading', { name: /Xây dựng trải nghiệm/ })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Kinh nghiệm làm việc' })).toBeVisible()
    expect(document.documentElement.lang).toBe('vi')
    unmount()
    render(<App />)
    expect(screen.getByRole('heading', { name: /Xây dựng trải nghiệm/ })).toBeVisible()
  })

  it('filters projects and keeps the selected category when language changes', async () => {
    const user = userEvent.setup()
    render(<App />)
    const projects = screen.getByRole('region', { name: 'Selected projects' })
    await user.click(within(projects).getByRole('button', { name: 'Mobile' }))
    expect(within(projects).getByRole('heading', { name: 'Dungeonary' })).toBeVisible()
    expect(within(projects).getByRole('heading', { name: 'Rentify' })).toBeVisible()
    expect(within(projects).queryByRole('heading', { name: 'Car X EV' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Tiếng Việt' }))
    expect(within(screen.getByRole('region', { name: 'Dự án tiêu biểu' })).getByRole('button', { name: 'Di động' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: /Kỹ thuật phần mềm/ })).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'Cường Nguyễn — Trang chủ' })).toHaveLength(2)
  })

  it('remembers the dark theme without resetting language', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    await user.click(screen.getByRole('button', { name: 'Tiếng Việt' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    unmount()
    render(<App />)
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('keeps language switching usable when browser storage is unavailable', async () => {
    const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked') })
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked') })
    try {
      render(<App />)
      await userEvent.setup().click(screen.getByRole('button', { name: 'Tiếng Việt' }))
      expect(screen.getByRole('heading', { name: /Xây dựng trải nghiệm/ })).toBeVisible()
    } finally { get.mockRestore(); set.mockRestore() }
  })

  it('opens and closes mobile navigation and expands real project contributions', async () => {
    const user = userEvent.setup()
    render(<App />)
    const menu = screen.getByRole('button', { name: 'Open navigation' })
    await user.click(menu)
    expect(screen.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    const projects = screen.getByRole('region', { name: 'Selected projects' })
    await user.click(within(projects).getAllByRole('button', { name: 'Explore project' })[0])
    expect(screen.getByText(/10\+ relational tables/)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', `${import.meta.env.BASE_URL}CV_NguyenSyManhCuong.pdf`)
  })
})
