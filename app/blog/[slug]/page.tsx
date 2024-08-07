"use client";

import { getPostBySlug } from '../../lib/api';
import { MDXRemote } from 'next-mdx-remote/rsc';
import TableOfContents from '../../components/TableOfContents';
import { Navigation } from '../../components/nav';
import Link from 'next/link';
import { Post } from 'contentlayer/generated';

interface Params {
  slug: string;
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-500 to-orange-500">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
        <Navigation />
      </div>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <div className="sticky top-24">
              <TableOfContents content={post.body.raw} />
            </div>
          </aside>
          <article className="md:w-3/4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold mb-6 text-white">{post.title}</h1>
            <div className="prose prose-invert max-w-none">
              <MDXRemote source={post.body.raw} />
            </div>
          </article>
        </div>
      </div>
      <Link href="/blog" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-50">
        📚
      </Link>
    </div>
  );
}