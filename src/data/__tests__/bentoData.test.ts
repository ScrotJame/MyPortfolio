import { describe, expect, it } from 'vitest'
import { bentoContent, bentoProjects, getHanoiTime } from '../bentoData'

describe('bentoData', () => {
  it('provides bilingual profiles for app and game tracks', () => {
    expect(bentoContent.app.en.skills.length).toBeGreaterThan(0)
    expect(bentoContent.app.vi.bio).toBeDefined()
    expect(bentoContent.game.en.skills).toContain('Unity')
    expect(bentoContent.game.vi.title).toBeDefined()
  })

  it('provides categorized projects for app and game tracks', () => {
    expect(bentoProjects.app.length).toBeGreaterThan(0)
    expect(bentoProjects.game.length).toBeGreaterThan(0)
    expect(bentoProjects.app[0].details.en.length).toBeGreaterThan(0)
    expect(bentoProjects.game[0].details.vi.length).toBeGreaterThan(0)
  })

  it('formats Hanoi local time in GMT+7 correctly', () => {
    const fixedDate = new Date('2026-11-06T12:00:00Z') // UTC 12:00 -> Hanoi 19:00
    const { timeString, timeZone } = getHanoiTime(fixedDate)
    expect(timeString).toContain('19:00')
    expect(timeZone).toBe('GMT+7')
  })
})
