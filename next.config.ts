import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/multiverse-surfboards",
  images: {
    unoptimized: true,
  },
  assetPrefix: "/multiverse-surfboards",
  output: "export",
};

export default nextConfig;
