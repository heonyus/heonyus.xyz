"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Particles from "../components/particles";

const CV: React.FC = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-gradient-to-tl from-purple-900 via-pink-500 to-orange-500">
      <Particles
        className="absolute inset-0 z-0 animate-fade-in"
        quantity={500}
        staticity={5} 
      />
      <div className="relative z-10 flex justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-4xl aspect-[1/1.4142] rounded-lg shadow-lg overflow-hidden relative">
          <embed
            src="/CV.pdf#view=FitH&toolbar=0&navpanes=0&scrollbar=0"
            type="application/pdf"
            className="w-full h-full"
          />
          <a 
            href="/CV.pdf" 
            download 
            className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Download
          </a>
        </div>
      </div>
      <Link href="/" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-50">
        🏠
      </Link>
    </div>
  );
};

export default CV;