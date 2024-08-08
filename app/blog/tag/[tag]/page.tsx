import React from 'react';
import { getAllPosts } from '../../../lib/api';
import ClientTagPage from './ClientTagPage';

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getAllPosts();
  const decodedTag = decodeURIComponent(params.tag);
  const filteredPosts = posts.filter(post => post.tags.includes(decodedTag));

  return <ClientTagPage posts={filteredPosts} tag={decodedTag} />;
}