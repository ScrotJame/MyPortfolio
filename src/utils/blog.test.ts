import { describe, expect, it } from 'vitest'
import { getAllPosts, getPostBySlug, parseFrontmatter } from './blog'

describe('blog loader', () => {
  it('parses frontmatter and markdown body correctly', () => {
    const rawMarkdown = `---
title: "Sample Title"
date: "2026-11-08"
category: "app"
platform: "macOS"
rating: "9.5/10"
summary: "Sample summary"
---

## Heading

Paragraph text.`

    const { frontmatter, content } = parseFrontmatter(rawMarkdown)
    expect(frontmatter.title).toBe('Sample Title')
    expect(frontmatter.date).toBe('2026-11-08')
    expect(frontmatter.category).toBe('app')
    expect(frontmatter.platform).toBe('macOS')
    expect(frontmatter.rating).toBe('9.5/10')
    expect(frontmatter.summary).toBe('Sample summary')
    expect(content).toContain('## Heading')
  })

  it('handles markdown without frontmatter gracefully', () => {
    const rawMarkdown = 'Just raw markdown text'
    const { frontmatter, content } = parseFrontmatter(rawMarkdown)
    expect(frontmatter).toEqual({})
    expect(content).toBe('Just raw markdown text')
  })

  it('getAllPosts returns an array', () => {
    const posts = getAllPosts()
    expect(Array.isArray(posts)).toBe(true)
  })

  it('getPostBySlug returns undefined for non-existent post', () => {
    const post = getPostBySlug('non-existent-slug-xyz')
    expect(post).toBeUndefined()
  })
})
