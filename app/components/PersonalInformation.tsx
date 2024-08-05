import React from 'react';
import { motion } from 'framer-motion';

const PersonalInformation: React.FC = () => {
  const personalInfo = [
    { label: "Name", value: "Jaeheon Jeong" },
    { label: "Date of Birth", value: "1999.01.19" },
    { label: "Education", value: "MJU, IM Engineering" },
    { label: "Position", value: "AI Researcher" },
    { label: "Location", value: "Seoul, Korea" },
    { label: "Interests", value: "AI, DS, MLOps" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center space-y-8"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-60 h-80 rounded-full overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 p-1"
      >
        <img
          src="/images/profile.jpg"
          alt="정재헌"
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            {personalInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className="flex flex-col"
              >
                <p className="text-sm font-medium text-purple-200">{item.label}</p>
                <p className="text-lg font-semibold text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PersonalInformation;