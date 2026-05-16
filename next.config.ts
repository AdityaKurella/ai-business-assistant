import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent incorrect monorepo root inference (multiple lockfiles).
    root: __dirname,
  },
};

export default nextConfig;
