import React from 'react';
import { motion } from 'framer-motion';

interface Award {
  title: string;
  date: string;
  description: string;
}

interface AwardGalleryProps {
  awards: Award[];
}

export const AwardGallery: React.FC<AwardGalleryProps> = ({ awards }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {awards.map((award, index) => (
        <motion.div
          key={index}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-start space-x-3">
            <motion.div
              className="w-4 h-4 mt-1 rounded-full bg-purple-300 flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
            <div>
              <motion.h3 
                className="text-lg font-bold mb-1 text-white"
                whileHover={{ color: "#4fd1c5" }}
              >
                {award.title}
              </motion.h3>
              <p className="text-sm text-gray-300 mb-1">{award.date}</p>
              {award.description && <p className="text-sm text-gray-400">{award.description}</p>}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};