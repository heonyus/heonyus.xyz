"use client";

import React from 'react';
import BlogList from '../../../components/BlogList';
import { Post } from 'contentlayer/generated';

interface ClientTagPageProps {
  posts: Post[];
  tag: string;
}

export default function ClientTagPage({ posts, tag }: ClientTagPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">태그: {tag}</h1>
      <BlogList posts={posts} />
    </div>
  );
}