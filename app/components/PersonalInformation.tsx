import React from 'react';

const PersonalInformation: React.FC = () => {
  const personalInfo = [
    { label: "Name", value: "Jaeheon Jeong" },
    { label: "Date of Birth", value: "1999.01.19" },
    { label: "Education", value: "Myongji University, Industrial and Management Engineering" },
    { label: "GPA", value: "3.89 / 4.5" },
    { label: "Affiliation", value: "Market Designers Co., Ltd." },
    { label: "Position", value: "AI Researcher" },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row items-stretch">
        <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 w-1/4">
          <div className="h-full p-1 rounded-lg bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-cyan-300/30 backdrop-filter backdrop-blur-sm shadow-lg shadow-purple-500/30">
            <img
              src="/images/profile.jpg"
              alt="Jaeheon Jeong" 
              className="w-full h-full object-cover rounded-lg"
              style={{ aspectRatio: '3/4' }}
            />
          </div>
        </div>
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 content-between">
          {personalInfo.map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 flex flex-col justify-center">
              <p className="font-bold text-pink-300">{item.label}</p>
              <p className="text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;