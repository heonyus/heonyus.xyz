import React from 'react';
import { getAllPosts } from '../lib/api';
import BlogPageClient from '../components/BlogPageClient';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const categories = Array.from(new Set(posts.map(post => post.category)));

  return <BlogPageClient initialPosts={posts} initialTags={tags} categories={categories} />;
}