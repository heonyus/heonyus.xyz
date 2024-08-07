import React from 'react';
import { getAllPosts } from '../../../lib/api';
import ClientTagPage from './ClientTagPage';

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getAllPosts();
  const filteredPosts = posts.filter(post => post.tags.includes(params.tag));

  return <ClientTagPage posts={filteredPosts} tag={params.tag} />;
}