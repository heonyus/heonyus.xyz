import React from 'react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`p-2 rounded-full ${
        theme === 'dark' ? 'bg-yellow-400' : 'bg-gray-800'
      }`}
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </motion.button>
  );
};

export default ThemeToggle;