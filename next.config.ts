import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    MEDIA_URL: process.env.MEDIA_URL,
    MEDIA_UPLOAD: process.env.MEDIA_UPLOAD
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'm.ebazaar.mn' },
      { protocol: 'https', hostname: 'pics.ebazaar.link' }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb'
    }
  }
};

export default nextConfig;
