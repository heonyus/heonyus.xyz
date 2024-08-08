import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    domains: ['localhost', 'github.com'],
  },
  typescript: {
    ignoreBuildErrors: true, // 빌드 시 타입 오류 무시
  },
  experimental: {
    // hydration 오류를 무시하도록 설정 추가
    suppressHydrationWarning: true,
  },
};

export default withContentlayer(nextConfig);