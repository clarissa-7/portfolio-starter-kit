/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'nodejs', // Attempt to default API routes to Node.js
  },
};

module.exports = nextConfig;
