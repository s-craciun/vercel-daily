import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  cacheLife: {
    // As course says, "Blog posts - longer cache, updates are rare" :D
    articles: {
      stale: 3600, // 1 hour
      revalidate: 86400, // 24 hours
      expire: 604800, // 7 days
    },
    categories: {
      stale: 3600, // 1 hour
      revalidate: 10800, // 3 hours
      expire: 86400, // 24 hours
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
