import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialHubCard } from '../SocialHubCard'

describe('SocialHubCard', () => {
  it('renders social orbital links with accessible labels', () => {
    render(<SocialHubCard track="app" locale="en" />)
    expect(screen.getByLabelText(/github/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('triggers onBlogClick when blog icon is clicked', async () => {
    const handleBlogClick = vi.fn()
    render(<SocialHubCard track="app" locale="en" onBlogClick={handleBlogClick} />)
    await userEvent.click(screen.getByLabelText(/blog/i))
    expect(handleBlogClick).toHaveBeenCalledTimes(1)
  })
})

