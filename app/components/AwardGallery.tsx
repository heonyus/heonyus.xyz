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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {awards.map((award, index) => (
        <motion.div
          key={index}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h3 className="text-xl font-bold mb-2 text-neon-pink">{award.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{award.date}</p>
          <p className="text-gray-300">{award.description}</p>
        </motion.div>
      ))}
    </div>
  );
};