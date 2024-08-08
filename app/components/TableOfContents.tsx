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
    const elements = document.querySelectorAll('h1, h2, h3');
    const headingsData = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: parseInt(el.tagName.charAt(1)),
    }));
    setHeadings(headingsData);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      for (let i = headingsData.length - 1; i >= 0; i--) {
        const element = document.getElementById(headingsData[i].id);
        if (element && element.offsetTop <= scrollPosition + 100) {
          setActiveId(headingsData[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  return (
    <nav className="bg-white/5 backdrop-filter backdrop-blur-lg rounded-lg p-4">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <motion.li
            key={heading.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 px-2 rounded transition-colors duration-200 text-xs md:text-sm ${
                activeId === heading.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-600 hover:text-white'
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