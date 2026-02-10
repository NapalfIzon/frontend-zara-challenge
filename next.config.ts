import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname:
          process.env.NEXT_PUBLIC_API_HOST || 'prueba-tecnica-api-tienda-moviles.onrender.com',
        pathname: '/images/**',
      },
    ],
  },
  output: 'export',
};

export default nextConfig;
