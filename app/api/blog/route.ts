import { NextResponse } from 'next/server';
import { allPosts } from 'contentlayer/generated';

export async function GET() {
  try {
    const formattedPosts = allPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      tags: post.tags,
      coverImage: post.coverImage,
      excerpt: post.excerpt,
      category: post.category,
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}