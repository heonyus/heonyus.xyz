import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TagCloud = ({ tags, selectedTags, setSelectedTags }) => {
  const [searchTag, setSearchTag] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredTags = tags.filter(tag => tag.toLowerCase().includes(searchTag.toLowerCase()));

  const sortedTags = [...filteredTags].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.localeCompare(b);
    } else if (sortBy === 'popularity') {
      return tags.filter(t => t === b).length - tags.filter(t => t === a).length;
    }
  });

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search Tags..."
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        className="w-full px-3 py-1 text-sm bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-200"
      />
      <div className="flex flex-wrap justify-center gap-2">
        {sortedTags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              selectedTags.includes(tag)
                ? 'bg-white text-purple-500'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            }`}
          >
            #{tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;