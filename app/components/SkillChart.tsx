import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface SkillChartProps {
  skills: Skill[];
}

export const SkillChart: React.FC<SkillChartProps> = ({ skills }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-lg font-bold mb-2 text-purple-200">{skill.name}</h3>
          <div className="flex items-center space-x-2">
            {[20, 40, 60, 80, 100].map((level) => (
              <motion.div
                key={level}
                className={`w-4 h-4 rounded-full ${
                  skill.level >= level ? 'bg-purple-300' : 'bg-white/20'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + (level / 100) * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};