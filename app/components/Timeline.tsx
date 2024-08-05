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
    <div className="relative p-4">
      {/* 중앙 세로 점선 */}
      <div className="absolute left-9 md:left-1/2 top-0 bottom-0 w-px border-l border-dashed border-white/30" />
      
      <div className="space-y-12 md:space-y-24">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* 이벤트 내용 */}
            <motion.div
              className={`relative ml-12 md:ml-0 md:w-5/12 bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 타임라인 점 */}
              <div className={`absolute top-1/2 w-6 h-6 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 rounded-full z-10 transform -translate-y-1/2
                ${index % 2 === 0 
                  ? 'left-0 -translate-x-[calc(100%+1rem)] md:left-auto md:right-0 md:translate-x-[calc(100%+1rem)]' 
                  : 'left-0 -translate-x-[calc(100%+1rem)]'
                }`} 
              />
              
              <motion.h3 
                className="text-lg font-bold mb-1 text-white"
                whileHover={{ color: "#4fd1c5" }}
              >
                {event.title}
              </motion.h3>
              <p className="text-sm text-gray-300 mb-2">{event.date}</p>
              <p className="p-1 rounded-lg bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-cyan-300/30 backdrop-filter backdrop-blur-sm shadow-lg shadow-purple-500/30">{event.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};