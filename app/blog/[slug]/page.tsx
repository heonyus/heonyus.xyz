"use client";

import { getPostBySlug } from '../../lib/api';
import { Mdx } from '../../components/mdx';
import TableOfContents from '../../components/TableOfContents';

interface Params {
  slug: string;
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-purple-900 via-pink-500 to-orange-500">
      <div className="w-full max-w-4xl mx-auto p-6 flex">
        <article className="w-3/4 bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mr-4">
          <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
          <div className="text-sm text-purple-200 mb-4">
            {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <Mdx code={post.body.code} />
        </article>
        <div className="w-1/4 sticky top-6 self-start">
          <TableOfContents content={post.body.code} />
        </div>
      </div>
    </div>
  );
}