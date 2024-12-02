import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
