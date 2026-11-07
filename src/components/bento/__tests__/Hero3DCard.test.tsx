import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Hero3DCard } from '../Hero3DCard'

describe('Hero3DCard', () => {
  it('renders dot matrix container and digital pass label', () => {
    render(<Hero3DCard track="app" locale="en" />)
    expect(screen.getByText(/digital pass/i)).toBeInTheDocument()
  })

  it('renders Vietnamese label when locale is vi', () => {
    render(<Hero3DCard track="app" locale="vi" />)
    expect(screen.getByText(/digital pass/i)).toBeInTheDocument()
    expect(screen.getByText(/Rê chuột để xoay 3D tự do/i)).toBeInTheDocument()
  })

  it('flips between avatar side and title/role side when flip button is clicked', async () => {
    const user = userEvent.setup()
    render(<Hero3DCard track="app" locale="en" />)

    // Initially front side shows avatar & name
    expect(screen.getByText(/CƯỜNG NGUYỄN/i)).toBeInTheDocument()

    // Click flip toggle button
    const flipBtn = screen.getByRole('button', { name: /back/i })
    await user.click(flipBtn)

    // Now showing back side
    expect(screen.getByText(/SOFTWARE ENGINEER/i)).toBeInTheDocument()
    expect(screen.getByText(/NFC · PASS/i)).toBeInTheDocument()
  })
})
