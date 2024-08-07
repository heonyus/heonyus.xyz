import React from 'react';

const SearchBar: React.FC<{ setSearchTerm: (term: string) => void }> = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search Posts..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-3 py-1 text-sm bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-200"
    />
  );
};

export default SearchBar;