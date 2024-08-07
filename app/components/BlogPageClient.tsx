'use client';

import React, { useState } from 'react';
import BlogList from './BlogList';
import TagCloud from './TagCloud';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Particles from './particles';
import { Navigation } from './nav';
import Link from 'next/link';
import Sidebar from './Sidebar';
import { Post } from 'contentlayer/generated';

interface BlogPageClientProps {
  initialPosts: Post[];
  initialTags: string[];
  categories: string[];
}

export default function BlogPageClient({ initialPosts, initialTags, categories }: BlogPageClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage: number = 5;

  const filteredPosts = initialPosts.filter(post => 
    (selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag))) &&
    (selectedCategory === '' || post.category === selectedCategory) &&
    ((post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
     (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-purple-900 via-pink-500 to-orange-500">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
      <Particles
        className="absolute inset-0 z-10"
        quantity={1000}
        staticity={5}
      />
      <div className="fixed top-0 left-0 right-0 z-20 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
        <Navigation />
      </div>
      <div className="flex relative z-20">
        <div className="hidden md:block w-1/5 lg:w-1/4 xl:w-80 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg z-40 overflow-y-auto fixed left-0 top-0 bottom-0 pt-20 transition-all duration-300">
          <Sidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            tags={initialTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="w-full md:ml-[20%] lg:ml-1/4 xl:ml-80 pt-20">
          <div className="container mx-auto px-4 py-8 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 cursor-default animate-title font-display leading-tight">
                TECH STORY
              </h1>
              <div className="w-1/3">
                <SearchBar setSearchTerm={setSearchTerm} />
              </div>
            </div>
            <BlogList posts={currentPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={sortedPosts.length}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      <Link href="/" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-30">
        🏠
      </Link>
    </div>
  );
}