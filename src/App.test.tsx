import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

beforeEach(() => {
  localStorage.clear()
  window.history.pushState(null, '', '/')
  window.location.hash = ''
})

describe('portfolio visitor flows with Bento Grid UI', () => {
  it('switches language between English and Vietnamese', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)

    // Initial English
    expect(screen.getByText("Hello! I'm Cuong")).toBeInTheDocument()
    expect(screen.getByText(/Latest Projects/i)).toBeInTheDocument()

    // Switch to Vietnamese
    const langBtn = screen.getByTitle(/Chuyển sang Tiếng Anh|Switch to Vietnamese/i)
    await user.click(langBtn)

    expect(screen.getByText('Xin chào! Mình là Cường')).toBeInTheDocument()
    expect(screen.getByText(/Dự án tiêu biểu/i)).toBeInTheDocument()

    // Reload test
    unmount()
    render(<App />)
    expect(screen.getByText('Xin chào! Mình là Cường')).toBeInTheDocument()
  })

  it('switches between App Dev and Game Dev tracks using the Vinyl Switcher', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Initially in App Dev mode
    expect(screen.getAllByText(/Software Engineer/i).length).toBeGreaterThan(0)
    expect(screen.getByText('Flutter')).toBeInTheDocument()

    // Click vinyl disc to switch to Game Dev
    const vinylBtn = screen.getByRole('button', { name: /switch track/i })
    await user.click(vinylBtn)

    // Should switch to Game Dev mode
    expect(screen.getByText('GAME')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Unity')).toBeInTheDocument()
    })
  })

  it('opens and closes project detail modal', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Click on a project
    const projectItem = screen.getByText(/EV Fleet Dispatch Dashboard/i)
    await user.click(projectItem)

    // Modal opens
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /EV Fleet Dispatch Dashboard/i })).toBeInTheDocument()

    // Close via close button
    const closeBtn = screen.getByRole('button', { name: /close/i })
    await user.click(closeBtn)

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('navigates to blog and returns to home', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Click blog button in top bar
    const blogBtn = screen.getAllByRole('button', { name: /blog/i })[0]
    await user.click(blogBtn)

    // Should render Bento Digital Archives page
    expect(screen.getByText(/DIGITAL ARCHIVES/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /All Archives|Tất cả Kệ/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /View Details|Xem chi tiết/i }).length).toBeGreaterThan(0)

    // Return to home via "Back to Home" button
    const homeBtn = screen.getByRole('button', { name: /Back to Home|Về Portfolio/i })
    await user.click(homeBtn)

    await waitFor(() => {
      expect(screen.getByText(/Latest Projects|Dự án tiêu biểu/i)).toBeInTheDocument()
    })
  })

  it('handles blocked localStorage gracefully', async () => {
    const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked') })
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked') })
    try {
      render(<App />)
      const langBtn = screen.getByTitle(/Chuyển sang Tiếng Anh|Switch to Vietnamese/i)
      await userEvent.setup().click(langBtn)
      expect(screen.getByText('Xin chào! Mình là Cường')).toBeInTheDocument()
    } finally {
      get.mockRestore()
      set.mockRestore()
    }
  })
})
