import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="mb-8 flex justify-between items-center w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'order-1 pl-8'}`}>
            <motion.h3 
              className="mb-1 font-bold text-lg"
              whileHover={{ scale: 1.05, color: "#4fd1c5" }}
            >
              {event.date}
            </motion.h3>
            <motion.h4 
              className="mb-1 font-bold text-xl"
              whileHover={{ scale: 1.05, color: "#4fd1c5" }}
            >
              {event.title}
            </motion.h4>
            <p className="text-sm text-gray-300">{event.description}</p>
          </div>
          <motion.div 
            className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full"
            whileHover={{ scale: 1.2, backgroundColor: "#4fd1c5" }}
          >
            <span className="mx-auto font-semibold text-lg text-white">•</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};