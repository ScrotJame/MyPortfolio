import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BentoLayout } from '../BentoLayout'

describe('BentoLayout', () => {
  it('renders all bento cards and vinyl switcher', () => {
    render(
      <BentoLayout
        locale="en"
        onLocaleChange={vi.fn()}
        onViewBlog={vi.fn()}
        devMode="app"
        onDevModeChange={vi.fn()}
      />
    )
    expect(screen.getByText(/hello!/i)).toBeInTheDocument()
    expect(screen.getByText(/digital pass/i)).toBeInTheDocument()
    expect(screen.getByText(/latest projects/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch track/i })).toBeInTheDocument()
  })

  it('triggers onDevModeChange when vinyl switcher is clicked', async () => {
    const handleDevModeChange = vi.fn()
    render(
      <BentoLayout
        locale="en"
        onLocaleChange={vi.fn()}
        onViewBlog={vi.fn()}
        devMode="app"
        onDevModeChange={handleDevModeChange}
      />
    )
    const switchBtn = screen.getByRole('button', { name: /switch track/i })
    await userEvent.click(switchBtn)
    expect(handleDevModeChange).toHaveBeenCalledWith('game')
  })

  it('keeps outer card container frames mounted when track changes', () => {
    const { rerender } = render(
      <BentoLayout
        locale="en"
        onLocaleChange={vi.fn()}
        onViewBlog={vi.fn()}
        devMode="app"
        onDevModeChange={vi.fn()}
      />
    )

    // Collect all article container elements (IntroCard, Hero3DCard, SocialHubCard, LatestProjectsCard)
    const articlesBefore = screen.getAllByRole('article')
    expect(articlesBefore).toHaveLength(4)

    // Re-render with new track
    rerender(
      <BentoLayout
        locale="en"
        onLocaleChange={vi.fn()}
        onViewBlog={vi.fn()}
        devMode="game"
        onDevModeChange={vi.fn()}
      />
    )

    const articlesAfter = screen.getAllByRole('article')
    expect(articlesAfter).toHaveLength(4)

    // Each container frame should be the exact same DOM node (no unmounting/remounting)
    articlesBefore.forEach((node, idx) => {
      expect(node).toBe(articlesAfter[idx])
    })
  })
})

