"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export const Navigation: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();

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