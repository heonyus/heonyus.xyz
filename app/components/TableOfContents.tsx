'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, 20]);
  const [isVisible, setIsVisible] = useState(true);

  // 창 크기 변경 감지를 위한 상태 추가
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsVisible(window.innerWidth >= 1024);
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderHeadings = useMemo(() => {
    let numbering: number[] = [0];
    let isFirstH1 = true;
    
    const getNumbering = (level: number) => {
      while (numbering.length > level) numbering.pop();
      while (numbering.length < level) numbering.push(0);
      numbering[level - 1]++;
      return numbering.join('.').replace(/^0\./, '');
    };

    return headings
      .filter(heading => !(heading.level === 1 && isFirstH1))
      .map((heading) => {
        if (heading.level === 1) {
          isFirstH1 = false;
        }

        return (
          <li key={heading.id} className={`${heading.level === 1 ? 'text-sm' : 'text-xs'} my-1`}>
            <a
              href={`#${heading.id}`}
              className={`block py-0.5 cursor-pointer hover:text-purple-300`}
              onClick={() => setActiveId(heading.id)}
              style={{ color: activeId === heading.id ? 'var(--purple)' : 'inherit' }}
            >
              <span className="mr-2 text-purple-300">{`${getNumbering(heading.level)}`}</span>
              {heading.text}
            </a>
          </li>
        );
      });
  }, [headings, activeId]);

  useEffect(() => {
    const handleScroll = () => {
      if (tocRef.current) {
        const headingsElements = tocRef.current.querySelectorAll('a');
        let minDistance = Infinity;
        let closestHeading = null;

        headingsElements.forEach((element) => {
          const distance = Math.abs(element.getBoundingClientRect().top);
          if (distance < minDistance) {
            minDistance = distance;
            closestHeading = element;
          }
        });

        if (closestHeading) {
          setActiveId(closestHeading.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const pathname = usePathname();

  useEffect(() => {
    setActiveId('');
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={tocRef}
      className={`fixed right-4 top-24 z-50 w-30 sm:w-40 md:w-60 bg-white/10 backdrop-blur-lg rounded-lg p-2 transition-all duration-300 ease-in-out ${
        isMinimized ? 'w-12 h-12 overflow-hidden' : ''
      }`}
      style={{ y }}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-200"
        >
          <span className="text-sm font-bold">LIST</span>
        </button>
      ) : (
        <div className="p-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="w-6 h-6 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <span className="text-white text-xs font-bold">−</span>
            </button>
          </div>
          <ul className="space-y-1 pr-2 text-xs sm:text-sm list-none">
            {renderHeadings}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default TableOfContents;