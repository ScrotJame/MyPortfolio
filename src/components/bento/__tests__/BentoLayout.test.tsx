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
})
