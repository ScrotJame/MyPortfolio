import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { IntroCard } from '../IntroCard'

describe('IntroCard', () => {
  it('renders profile title, skills, and CTA buttons', () => {
    render(<IntroCard track="app" locale="en" onContactClick={vi.fn()} />)
    expect(screen.getByText(/hello!/i)).toBeInTheDocument()
    expect(screen.getByText(/hanoi, vn/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact me/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /cv/i })).toBeInTheDocument()
  })

  it('triggers onContactClick when Contact button is clicked', async () => {
    const handleContact = vi.fn()
    render(<IntroCard track="app" locale="en" onContactClick={handleContact} />)
    await userEvent.click(screen.getByRole('button', { name: /contact me/i }))
    expect(handleContact).toHaveBeenCalledTimes(1)
  })

  it('displays game dev skills when in game track', () => {
    render(<IntroCard track="game" locale="en" onContactClick={vi.fn()} />)
    expect(screen.getByText('Unity')).toBeInTheDocument()
    expect(screen.getByText('C#')).toBeInTheDocument()
  })
})
