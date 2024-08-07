
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingsData = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: parseInt(el.tagName.charAt(1)),
    }));
    setHeadings(headingsData);

    const handleScroll = () => {
      for (let i = headingsData.length - 1; i >= 0; i--) {
        const element = document.getElementById(headingsData[i].id);
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveId(headingsData[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">목차</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <motion.li
            key={heading.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 px-2 rounded transition-colors duration-200 ${
                activeId === heading.id
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-300 hover:bg-purple-400 hover:text-white'
              }`}
            >
              {heading.text}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;