"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

export const Navigation: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();
  const [isFullScreen, setIsFullScreen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsFullScreen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsFullScreen(e.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  if (!isFullScreen) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center bg-transparent">
        <Link href="/">
          <span className="text-2xl font-bold text-white">Jay</span>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/blog">
              <motion.span
                className={`text-white ${
                  pathname.startsWith("/blog") ? "font-bold" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Blog
              </motion.span>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <motion.span
                className={`text-white ${
                  pathname === "/contact" ? "font-bold" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};