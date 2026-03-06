import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  headers: async () => [
    {
      source: '/manifest.json',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600',
        },
      ],
    },
  ],
};

export default nextConfig;
