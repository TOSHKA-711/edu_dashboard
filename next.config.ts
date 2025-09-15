import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // output: "export",
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
