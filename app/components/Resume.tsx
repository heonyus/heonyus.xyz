import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Timeline } from './Timeline';
import { AwardGallery } from './AwardGallery';
import { ProjectShowcase } from './ProjectShowcase';
import { SkillChart } from './SkillChart';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface ResumeSectionProps {
  children: ReactNode;
  delay?: number;
}

const ResumeSection = ({ children, delay = 0 }: ResumeSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-200 hover:bg-white/20"
    >
      {children}
    </motion.div>
  );
};

const Resume: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      date: "2018.02-2019.08",
      title: "Dong-Ah Institute of Media and Arts",
      description: "Enrolled and withdrew from Acting major"
    },
    {
      date: "2020.03-2021.10",
      title: "Seoul Metropolitan Police Agency",
      description: "Enlisted and discharged from 3rd Mobile Unit"
    },
    {
      date: "2022.02-2024.06",
      title: "Myongji University",
      description: "Transferred to Industrial and Management Engineering (Expected graduation)"
    },
    {
      date: "2022.09-2023.08",
      title: "Computational Data Science Lab",
      description: "Undergraduate researcher at Myongji University"
    },
    {
      date: "2023.02-2024.02",
      title: "Data Science Club 'FoM'",
      description: "Founder and President at Myongji University"
    },
    {
      date: "2023.09-2024.02",
      title: "Market Designers - Tutoring",
      description: "AI Researcher and Prompt Engineer"
    },
    {
      date: "2024.03-",
      title: "Lingora AI Innovation Team",
      description: "AI Researcher and MLOps Engineer"
    }
  ];

  const awards = [
    { title: "Myongji University Learning Community Scholarship", date: "2022.06", description: "" },
    { title: "Myongji University Data Analytics Competition Excellence Award", date: "2022.12", description: "" },
    { title: "Myongji University Data Analytics TA Social Advancement Scholarship", date: "2022.12", description: "" },
    { title: "Myongji University Capstone Design Graduation Project Grand Prize", date: "2023.06", description: "" },
    { title: "Myongji University Data Science Club 'FoM' Step 2 Completion", date: "2023.08", description: "" },
    { title: "National Assembly Public Data Competition Finalist", date: "2023.12", description: "Under review" },
    { title: "Myongji University On-site Training Review Competition Grand Prize", date: "2024.01", description: "" }
  ];

  const skills = [
    { name: "Python", level: 90 },
    { name: "Machine Learning", level: 85 },
    { name: "Deep Learning", level: 80 },
    { name: "Data Analysis", level: 85 },
    { name: "Web Development", level: 75 },
    { name: "Database Management", level: 70 }
  ];

  const projects = [
    {
      title: "AI Tutor Development",
      description: "Developing an AI-powered tutoring application",
      technologies: ["Python", "Machine Learning", "NLP"],
      link: "#"
    },
    {
      title: "Data Science Club Projects",
      description: "Various projects completed as part of the FoM Data Science club",
      technologies: ["Python", "Data Analysis", "Visualization"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8">
        <ResumeSection delay={0.2}>
          <h2 className="mb-4 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold whitespace-normal">
            Personal Information
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
              <div className="p-1 rounded-lg bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-cyan-300/30 backdrop-filter backdrop-blur-sm shadow-lg shadow-purple-500/30">
                <img
                  src="/images/profile.jpg"
                  alt="Jaeheon Jeong" 
                  className="w-48 h-48 sm:w-56 sm:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="flex-grow w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Name", value: "Jaeheon Jeong" },
                  { label: "Date of Birth", value: "1999.01.19" },
                  { label: "Education", value: "Myongji University, Industrial and Management Engineering" },
                  { label: "GPA", value: "3.89 / 4.5" },
                  { label: "Affiliation", value: "Market Designers Co., Ltd." },
                  { label: "Position", value: "AI Researcher" },
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                    <p className="font-bold text-pink-300">{item.label}</p>
                    <p className="text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResumeSection>


          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
            Time Line
          </h2>
          <Timeline events={timelineEvents} />

          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
          Projects
          </h2>
          <ProjectShowcase projects={projects} />

          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
            Awards
          </h2>
          <AwardGallery awards={awards} />
        

          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
            Skills
          </h2>
          <SkillChart skills={skills} />
      </div>
    </div>
  );
};

export default Resume;