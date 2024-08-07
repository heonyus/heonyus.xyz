import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TagCloud from './TagCloud';
import SearchBar from './SearchBar';

interface SidebarProps {
  categories: string[];
  tags: string[];
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ categories = [], tags = [], setSearchTerm, selectedCategory, setSelectedCategory, selectedTags, setSelectedTags }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  return (
    <div className="p-4 h-full flex flex-col overflow-y-auto scrollbar-hide">
      <div className="flex flex-col items-center space-y-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 p-1 flex-shrink-0"
        >
          <img
            src="/images/profile.jpg"
            alt="정재헌"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Jeong Jae Heon</h2>
          <div className="text-xs text-purple-200">
            <p>Birth: 1999. 01. 19</p>
            <p>Phone: +82 010 3135 7849</p>
            <p>Email: lhe339@gmail.com</p>
          </div>
        </div>
      </div>
      <h2 className="text-lg md:text-xl font-bold text-white mb-2">Category</h2>
      <div className="overflow-y-auto flex-grow mb-4">
        <ul>
          {categories.map((category) => (
            <li key={category} className="mb-1">
              <button
                onClick={() => handleCategoryClick(category)}
                className={`text-white hover:text-purple-200 text-sm ${
                  selectedCategory === category ? 'font-bold' : ''
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <h2 className="text-lg md:text-xl font-bold text-white mb-2">Tag</h2>
      <TagCloud tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-full max-w-md">
            <SearchBar setSearchTerm={setSearchTerm} />
            <button 
              onClick={() => setIsSearchModalOpen(false)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;