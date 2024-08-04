import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineEvent {
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
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/30"></div>
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="mb-8 flex justify-between items-center w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'order-1 pl-8'}`}>
            <h3 className="mb-1 font-bold text-lg">{event.date}</h3>
            <h4 className="mb-1 font-bold text-xl">{event.title}</h4>
            <p className="text-sm text-gray-300">{event.description}</p>
          </div>
          <div className="z-20 flex items-center order-1 bg-green-300 shadow-md w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-black">{index + 1}</h1>
          </div>
        </motion.div>
      ))}
    </div>
  );
};