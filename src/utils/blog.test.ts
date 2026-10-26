import { describe, expect, it } from 'vitest'
import { getAllPosts, getPostBySlug } from './blog'

describe('blog loader', () => {
  it('loads and parses markdown blog posts with frontmatter', () => {
    const posts = getAllPosts()
    expect(posts.length).toBeGreaterThan(0)

    const post = posts.find((p) => p.slug === 'review-black-myth-wukong')
    expect(post).toBeDefined()
    expect(post?.title).toBe('Trải nghiệm Black Myth: Wukong — Tuyệt phẩm hành động đậm chất Tây Du Ký')
    expect(post?.category).toBe('game')
    expect(post?.platform).toBe('PC (Steam) / PS5')
    expect(post?.rating).toBe('9.2/10')
    expect(post?.summary).toContain('Unreal Engine 5')
    expect(post?.content).toContain('Nanite & Lumen')
  })

  it('gets a single post by slug', () => {
    const post = getPostBySlug('review-black-myth-wukong')
    expect(post).toBeDefined()
    expect(post?.slug).toBe('review-black-myth-wukong')
  })
})
