import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PersonalInformationProps {
  language: 'en' | 'ko';
}

const PersonalInformation: React.FC<PersonalInformationProps> = React.memo(({ language }) => {
  const educationData = {
    en: [
      { date: "2024.08", event: "MJU, Graduated <span className='text-yellow-300 font-bold'>Summa Cum Laude</span> in Industrial Management Engineering" },
      { date: "2022.03", event: "MJU, Transferred to Industrial Management Engineering" },
      { date: "2019.02", event: "DIMA, Withdrew from Acting Major" },
      { date: "2018.03", event: "DIMA, Entered Acting Major" },
      { date: "2017.02", event: "Gwan-ak High School, Graduated" },
      { date: "2014.03", event: "Gwan-ak High School, Entered" }
    ],
    ko: [
      { date: "2024.08", event: "명지대학교, 산업경영공학과 <span className='text-yellow-300 font-bold'>수석졸업</span>" },
      { date: "2022.03", event: "명지대학교, 산업경영공학과 편입" },
      { date: "2019.02", event: "동아방송예술대학교, 연기과 자퇴" },
      { date: "2018.03", event: "동아방송예술대학교, 연기과 입학" },
      { date: "2017.02", event: "관악고등학교, 졸업" },
      { date: "2014.03", event: "관악고등학교, 입학" }
    ]
  };

  // language prop이 유효한지 확인
  const currentLanguage = language in educationData ? language : 'en';

  console.log('Current language:', currentLanguage); // 디버깅을 위한 로그

  return (
    <motion.div
      key={currentLanguage} // 언어가 변경될 때 애니메이션을 다시 실행하기 위해
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
              <p className="text-purple-100"><b>E-mail:</b> heonyus@gmail.com</p>
              <p className="text-purple-100">
                GitHub: <Link href="https://github.com/heonyus" className="underline">heonyus</Link>
              </p>
              <h3 className="font-semibold text-white mt-2 mb-1">🪖 Military Service</h3>
              <p className="text-purple-100"><b>Period:</b> 2020.04 - 2021.10 Auxiliary Policeman (Seoul Metropolitan Police Agency, 3rd Mobile Unit)</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">📚 Education</h3>
              {educationData[currentLanguage].map((item, index) => (
                <p key={index} className="text-purple-100">
                  <b>{item.date}</b> <span dangerouslySetInnerHTML={{ __html: item.event }} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

PersonalInformation.displayName = 'PersonalInformation';

export default PersonalInformation;