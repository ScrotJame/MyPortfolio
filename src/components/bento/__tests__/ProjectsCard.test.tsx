import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { bentoProjects } from '../../../data/bentoData'
import { LatestProjectsCard } from '../LatestProjectsCard'
import { ProjectDetailModal } from '../ProjectDetailModal'

describe('LatestProjectsCard & Modal', () => {
  it('renders project list items according to track', () => {
    render(<LatestProjectsCard track="app" locale="en" onSelectProject={vi.fn()} />)
    expect(screen.getByText(/latest projects/i)).toBeInTheDocument()
    expect(screen.getByText(bentoProjects.app[0].title.en)).toBeInTheDocument()
  })

  it('triggers onSelectProject when a project item is clicked', async () => {
    const handleSelect = vi.fn()
    render(<LatestProjectsCard track="app" locale="en" onSelectProject={handleSelect} />)
    await userEvent.click(screen.getByText(bentoProjects.app[0].title.en))
    expect(handleSelect).toHaveBeenCalledWith(bentoProjects.app[0])
  })

  it('renders project detail modal with details and close button', async () => {
    const project = bentoProjects.app[0]
    const handleClose = vi.fn()
    render(<ProjectDetailModal project={project} onClose={handleClose} locale="en" />)
    expect(screen.getByText(project.title.en)).toBeInTheDocument()
    const closeBtn = screen.getByRole('button', { name: /close/i })
    expect(closeBtn).toBeInTheDocument()
    await userEvent.click(closeBtn)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
