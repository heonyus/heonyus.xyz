"use client";

import { getPostBySlug } from '../../lib/api';
import { Mdx } from '../../components/mdx';

interface Params {
  slug: string;
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <article className="max-w-2xl mx-auto mt-8 p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-white">{post.title}</h1>
      <div className="text-sm text-gray-300 mb-4">
        {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <Mdx code={post.body.code} />
      
    </article>
  );
}