import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PersonalInformation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-40 h-56 rounded-2xl overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 p-1 flex-shrink-0"
        >
          <img
            src="/images/profile.jpg"
            alt="정재헌"
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-white mb-2">Jeong Jae Heon</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-white mt-2 mb-1">🧑🏻‍💻 Information</h3>
              <p className="text-purple-100"><b>Birth:</b> 1999. 01. 19</p>
              <p className="text-purple-100"><b>E-mail:</b> lhe339@gmail.com</p>
              <p className="text-purple-100">
                GitHub: <Link href="https://github.com/sparkerhoney" className="underline">sparkerhoney</Link>
              </p>
              <h3 className="font-semibold text-white mt-2 mb-1">🫡 Military Service</h3>
              <p className="text-purple-100"><b>Period:</b> 2020.04 - 2021.10 Auxiliary Policeman (Seoul Metropolitan Police Agency, 3rd Mobile Unit)</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">📚 Education</h3>
              <p className="text-purple-100"><b>2024.08</b> MJU, Graduated <span className='font-bold text-blue-300'>Summa Cum Laude</span> in Industrial Management Engineering</p>
              <p className="text-purple-100"><b>2022.03</b> MJU, Transferred to Industrial Management Engineering</p>
              <p className="text-purple-100"><b>2019.02</b> DIMA, Withdrew from Acting Major</p>
              <p className="text-purple-100"><b>2018.03</b> DIMA, Entered Acting Major</p>
              <p className="text-purple-100"><b>2017.02</b> Gwan-ak High School, Graduated</p>
              <p className="text-purple-100"><b>2014.03</b> Gwan-ak High School, Entered</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PersonalInformation;