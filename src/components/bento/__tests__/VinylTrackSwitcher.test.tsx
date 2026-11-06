import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { VinylTrackSwitcher } from '../VinylTrackSwitcher'

describe('VinylTrackSwitcher', () => {
  it('renders rotating disc and displays current track label', () => {
    render(<VinylTrackSwitcher currentTrack="app" onTrackChange={vi.fn()} locale="en" />)
    expect(screen.getByRole('button', { name: /switch track/i })).toBeInTheDocument()
    expect(screen.getByText('APP')).toBeInTheDocument()
  })

  it('triggers onTrackChange when clicked', async () => {
    const handleTrackChange = vi.fn()
    render(<VinylTrackSwitcher currentTrack="app" onTrackChange={handleTrackChange} locale="en" />)
    await userEvent.click(screen.getByRole('button', { name: /switch track/i }))
    expect(handleTrackChange).toHaveBeenCalledWith('game')
  })

  it('switches from game to app track', async () => {
    const handleTrackChange = vi.fn()
    render(<VinylTrackSwitcher currentTrack="game" onTrackChange={handleTrackChange} locale="en" />)
    await userEvent.click(screen.getByRole('button', { name: /switch track/i }))
    expect(handleTrackChange).toHaveBeenCalledWith('app')
  })
})
