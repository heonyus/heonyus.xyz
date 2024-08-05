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
      <h2 className="mb-4 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold whitespace-normal">
        Personal Information
      </h2>
      <div className="flex flex-col items-center sm:flex-row sm:items-stretch">
        <div className="mb-4 sm:mb-0 sm:mr-6 w-2/3 sm:w-1/3 max-w-xs">
          <div className="h-full p-1 rounded-lg bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-cyan-300/30 backdrop-filter backdrop-blur-sm shadow-lg shadow-purple-500/30">
            <img
              src="/images/profile.jpg"
              alt="Jaeheon Jeong" 
              className="w-full h-full object-cover rounded-lg"
              style={{ aspectRatio: '3/4' }}
            />
          </div>
        </div>
        <div className="w-full sm:flex-grow grid grid-cols-1 gap-4 content-between">
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