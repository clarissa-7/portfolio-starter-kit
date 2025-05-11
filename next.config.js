/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true // Enables MDX Rust compiler for faster builds, required for next-mdx-remote
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // Supports MDX files for blog posts
  // Add any other necessary options here
};

module.exports = nextConfig;
