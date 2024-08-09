"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Particles from "./components/particles";
import Resume from "./components/Resume";
import { motion } from "framer-motion";

const navigation = [
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      setShowScrollArrow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!animationComplete) {
        window.scrollTo(0, 0);
      }
      if (window.pageYOffset > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationComplete]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={scrollRef} className="relative w-screen min-h-screen overflow-y-auto bg-gradient-to-tl from-purple-900 via-pink-500 to-orange-500">
      <div className="sticky top-0 flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <nav className="animate-fade-in z-10">
            <ul className="flex items-center justify-center gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="underline font-extrabold text-sm duration-500 text-pink-100 hover:text-purple-200"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </nav>
          
          <h1 className="z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 cursor-default animate-title font-display">
            Jay
          </h1>
          
          <div className="text-center animate-fade-in px-4 max-w-lg">
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white">
              I am exploring{" "}
              <Link
                target="_blank"
                href="https://github.com/sparkerhoney"
                className="underline font-extrabold text-pink-100 duration-500 hover:text-purple-200"
              >
                AI
              </Link>{" "}
              for the essence of humanity and creating a more human-like something.
            </h2>
          </div>
        </div>
        
        {showScrollArrow && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 sm:bottom-10 z-10"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-bounce"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        )}
        
        <Particles
          className="absolute inset-0 z-0 animate-fade-in"
          quantity={500}
          staticity={5} 
        />
      </div>
      <div className="relative z-10">
        <Resume />
      </div>

      {showTopButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}