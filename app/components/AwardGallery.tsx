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
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl"
    >
      <h3 className="text-2xl font-bold mb-4 text-white">Awards</h3>
      <div className="space-y-4">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/5 rounded-lg p-4 shadow-lg transition-all duration-300 hover:bg-white/20"
          >
            <h4 className="text-lg font-bold mb-1 text-white">{award.title}</h4>
            <p className="text-sm text-white/80 mb-2">{award.date}</p>
            <p className="text-sm text-white/60">{award.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};