import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ['localhost'],
  },
  // 메타데이터 기본 URL 설정
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/:path*`,
      },
    ]
  },
};

export default withContentlayer(nextConfig);