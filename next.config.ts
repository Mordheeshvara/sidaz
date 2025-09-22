import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Remove outputFileTracingRoot for Vercel deployment
  // outputFileTracingRoot: path.resolve(__dirname, '../../'),
  
  // Disable turbopack rules for deployment stability
  // turbopack: {
  //   rules: {
  //     "*.{jsx,tsx}": {
  //       loaders: [LOADER]
  //     }
  //   }
  // }
};

export default nextConfig;
