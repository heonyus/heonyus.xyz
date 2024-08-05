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
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl"
    >
      <h3 className="text-2xl font-bold mb-4 text-white">Skills</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/5 rounded-lg p-4 transition-all duration-300 hover:bg-white/20"
          >
            <h4 className="text-lg font-bold mb-2 text-white">{skill.name}</h4>
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <motion.div
                className="bg-white h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};