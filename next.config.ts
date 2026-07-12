// next.config.ts

import type {
  NextConfig,
} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      /*
       * File gambar dibatasi 5 MB,
       * sedangkan body Server Action
       * diberi ruang 10 MB untuk file,
       * isi berita, dan overhead multipart.
       */
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;