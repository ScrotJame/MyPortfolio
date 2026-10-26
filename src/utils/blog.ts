export interface BlogPost {
  slug: string
  title: string
  date: string
  category: 'app' | 'game'
  platform: string
  rating: string
  summary: string
  content: string
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return { frontmatter: {}, content: raw.trim() }
  }
  const yamlBlock = match[1]
  const content = match[2].trim()
  const frontmatter: Record<string, string> = {}

  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      frontmatter[key] = value
    }
  }
  return { frontmatter, content }
}

const rawBlogModules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string } | string>

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = []

  for (const [path, mod] of Object.entries(rawBlogModules)) {
    const rawContent = typeof mod === 'string' ? mod : mod.default
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || ''
    const { frontmatter, content } = parseFrontmatter(rawContent)

    posts.push({
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || '',
      category: (frontmatter.category === 'app' ? 'app' : 'game'),
      platform: frontmatter.platform || '',
      rating: frontmatter.rating || '',
      summary: frontmatter.summary || '',
      content,
    })
  }

  // Sort by date descending
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
