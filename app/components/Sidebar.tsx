import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TagCloud from './TagCloud';
import SearchBar from './SearchBar';

const Sidebar = ({ categories = [], tags = [], setSearchTerm }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const renderCategories = (cats, level = 0) => {
    if (!cats || cats.length === 0) return null;
    return (
      <ul className={`pl-${level * 2}`}>
        {cats.map((cat) => (
          <li key={cat.name} className="mb-1">
            <Link href={`/blog/category/${cat.slug}`}>
              <span className="text-white hover:text-purple-200 text-sm">{cat.name}</span>
            </Link>
            {cat.children && renderCategories(cat.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 h-full flex flex-col overflow-y-auto scrollbar-hide">
      <div className="flex flex-col items-center space-y-4 mb-6">4
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
          <p className="text-xs md:text-sm text-purple-200 mb-2"><b>수적천석</b>의 마음가짐으로 성실히 살아가는 중입니다!</p>
          <div className="text-xs text-purple-200">
            <p>생년월일: 1999. 01. 19</p>
            <p>전화번호: +82 010 3135 7849</p>
            <p>이메일: jhe339@gmail.com</p>
          </div>
        </div>
      </div>
      <h2 className="text-lg md:text-xl font-bold text-white mb-2">카테고리</h2>
      <div className="overflow-y-auto flex-grow mb-4">
        {renderCategories(categories)}
      </div>
      <h2 className="text-lg md:text-xl font-bold text-white mb-2">태그</h2>
      <TagCloud tags={tags} selectedTags={[]} setSelectedTags={() => {}} />
      
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-full max-w-md">
            <SearchBar setSearchTerm={setSearchTerm} />
            <button 
              onClick={() => setIsSearchModalOpen(false)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;