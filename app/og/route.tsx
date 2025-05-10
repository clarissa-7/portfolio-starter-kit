import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

export async function GET() {
  let allBlogs = await getBlogPosts()

  // Log posts for debugging (optional)
  console.log('Blog posts:', allBlogs)

  const itemsXml = allBlogs
    .filter(post => post && post.metadata && post.metadata.publishedAt) // Ensure post and metadata exist
    .sort((a, b) => {
      const dateA = new Date(a.metadata.publishedAt)
      const dateB = new Date(b.metadata.publishedAt)
      return dateA > dateB ? -1 : 1
    })
    .map(post => {
      const title = post.metadata.title || 'Untitled'
      const summary = post.metadata.summary || ''
      const publishedAt = new Date(post.metadata.publishedAt).toUTCString()
      
      // Validate publishedAt is a valid date
      if (isNaN(new Date(publishedAt))) {
        console.warn(`Invalid publishedAt for post: ${post.slug}`)
        return ''
      }

      return `<item>
        <title>${title}</title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <description>${summary}</description>
        <pubDate>${publishedAt}</pubDate>
      </item>`
    })
    .filter(item => item) // Remove invalid items
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>My Portfolio</title>
      <link>${baseUrl}</link>
      <description>This is my portfolio RSS feed</description>
      ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
