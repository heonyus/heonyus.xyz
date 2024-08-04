import React from 'react';
import { motion } from 'framer-motion';

interface Career {
  title: string;
  position: string;
  period: string;
  description: string;
}

interface CareerSectionProps {
  careers: Career[];
}

export const CareerSection: React.FC<CareerSectionProps> = ({ careers }) => {
  return (
    <div className="space-y-8">
      {careers.map((career, index) => (
        <motion.div
          key={index}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-neon-purple">{career.title}</h3>
          <h4 className="text-xl font-semibold mb-2 text-neon-blue">{career.position}</h4>
          <p className="text-gray-400 mb-4">{career.period}</p>
          <p className="text-gray-300">{career.description}</p>
        </motion.div>
      ))}
    </div>
  );
};