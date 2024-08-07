'use client';

import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';
import TagCloud from './TagCloud';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Particles from './particles';
import Link from 'next/link';
import Sidebar from './Sidebar';
import BlogCard from './BlogCard';
import { Post } from 'contentlayer/generated';

interface BlogPageClientProps {
  initialPosts: Post[];
  initialTags: string[];
  categories: string[];
}

export default function BlogPageClient({ initialPosts, initialTags, categories }: BlogPageClientProps) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const postsPerPage: number = 5;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredPosts = initialPosts.filter(post => 
    (selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag))) &&
    ((post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
     (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const groupedPosts = {};
  initialPosts.forEach(post => {
    if (!groupedPosts[post.category]) {
      groupedPosts[post.category] = [];
    }
    groupedPosts[post.category].push(post);
  });

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-purple-900 via-pink-500 to-orange-500">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
      <Particles
        className="absolute inset-0 z-10"
        quantity={1000}
        staticity={5}
      />
      {isClient && (
        <div className="flex flex-col relative z-20">
          <div className="w-full bg-opacity-20 backdrop-filter backdrop-blur-lg z-40 fixed top-0 left-0 right-0 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 cursor-default animate-title font-display leading-tight">
                TECH STORY
              </h1>
              <div className="w-1/3">
                <SearchBar setSearchTerm={setSearchTerm} />
              </div>
            </div>
          </div>
          <div className="flex mt-20">
            <div className="hidden md:block w-1/6 lg:w-1/5 xl:w-64 bg-opacity-20 backdrop-filter backdrop-blur-lg z-30 overflow-y-auto fixed left-0 top-20 bottom-0 pt-4 transition-all duration-300">
              <Sidebar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <TagCloud tags={initialTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </div>
            <div className="w-full md:ml-[20%] lg:ml-1/4 xl:ml-80 pt-4">
              <div className="container mx-auto px-4 py-8 relative z-10">
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
        </div>
      )}
      <Link href="/" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-30">
        🏠
      </Link>
    </div>
  );
}