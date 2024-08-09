"use client";

import { getPostBySlug } from '../../lib/api';
import { Mdx } from '../../components/mdx';
import TableOfContents from '../../components/TableOfContents';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'; // Added this line

interface Params {
  slug: string;
}

export default function BlogPost({ params }: { params: Params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFullScreen = useMediaQuery({ query: '(min-width: 1024px)' }); // Added this line

  useEffect(() => {
    async function loadPost() {
      const decodedSlug = decodeURIComponent(params.slug);
      console.log('Loading post for slug:', decodedSlug);
      const fetchedPost = await getPostBySlug(decodedSlug);
      console.log('Fetched post:', fetchedPost);
      setPost(fetchedPost);
      setLoading(false);
    }
    loadPost();
  }, [params.slug]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>포스트를 찾을 수 없습니다. (slug: {params.slug})</div>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-purple-900 via-pink-500 to-orange-500">
      <div className="w-full max-w-4xl mx-auto p-6 flex flex-col lg:flex-row">
        <article className="w-full lg:w-3/4 bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-6 lg:mb-0 lg:mr-4">
          <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
          <div className="text-sm text-purple-200 mb-4">
            {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <Mdx code={post.body.code} />
        </article>
        {isFullScreen && (
          <div className="w-1/4 sticky top-6 self-start">
            <TableOfContents content={post.body.code} />
          </div>
        )}
      </div>
    </div>
  );
}