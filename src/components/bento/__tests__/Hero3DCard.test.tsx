import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText(/rê chuột để xoay/i)).toBeInTheDocument()
  })
})

