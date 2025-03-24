import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // تفعيل Strict Mode
  images: {
    unoptimized: true, // تجنب مشاكل الصور بعد النشر
  },
  
};

export default nextConfig;
