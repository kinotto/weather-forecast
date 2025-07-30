import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://static01.nyt.com/**')],
  },
};

export default nextConfig;
