import { getBlogPosts } from 'app/blog/utils';
import { baseUrl } from 'app/config'; // Import from config

export default async function sitemap() {
  const blogs = await getBlogPosts();
  const blogEntries = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogEntries];
}