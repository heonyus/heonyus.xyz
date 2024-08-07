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
};

export default withContentlayer(nextConfig);