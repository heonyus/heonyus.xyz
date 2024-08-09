"use client";

import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TableOfContentsProps {
  headings: Heading[];
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, 20]);

  const renderHeadings = useMemo(() => {
    let numbering: number[] = [0];
    
    const getNumbering = (level: number) => {
      while (numbering.length > level) numbering.pop();
      while (numbering.length < level) numbering.push(0);
      numbering[level - 1]++;
      return numbering.join('.');
    };

    return headings.map((heading) => (
      <li key={heading.id} className={`${heading.level === 1 ? 'text-sm' : 'text-xs'} my-1`}>
        <a
          href={`#${heading.id}`}
          className={`block py-0.5 cursor-pointer hover:text-purple-300`}
        >
          <span className="mr-2 text-purple-300">{`${getNumbering(heading.level)}`}</span>
          {heading.text}
        </a>
      </li>
    ));
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.nav 
      ref={tocRef}
      className={`fixed right-5 text-white rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out ${
        isMinimized ? 'w-40 h-12' : 'w-64 max-h-[80vh]'
      }`}
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        top: '100px',
        y
      }}
    >
      {isMinimized ? (
        <button 
          onClick={() => setIsMinimized(false)} 
          className="w-full h-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-200"
        >
          <span className="text-sm font-bold">LIST</span>
        </button>
      ) : (
        <div className="p-3 overflow-y-auto max-h-full">
          <div className="flex justify-between items-center mb-2">
            <button 
              onClick={() => setIsMinimized(true)} 
              className="w-6 h-6 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <span className="text-white text-xs font-bold">−</span>
            </button>
          </div>
          <ul className="space-y-1 pr-2">
            {renderHeadings}
          </ul>
        </div>
      )}
    </motion.nav>
  );
};

export default React.memo(TableOfContents);