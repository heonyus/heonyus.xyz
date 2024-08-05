import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Timeline } from './Timeline';
import { AwardGallery } from './AwardGallery';
import { ProjectShowcase } from './ProjectShowcase';
import { SkillChart } from './SkillChart';

interface ResumeSectionProps {
  children: ReactNode;
  delay?: number;
}

const ResumeSection = ({ children, delay = 0 }: ResumeSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const [{ rotateX, rotateY }, set] = useSpring(() => ({ rotateX: 0, rotateY: 0 }));

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    set({ rotateX, rotateY });
  };

  const onMouseLeave = () => set({ rotateX: 0, rotateY: 0 });

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
    >
      <animated.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease',
        }}
        className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {children}
      </animated.div>
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
    <div className="min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto grid gap-8">
        <ResumeSection delay={0.2}>
          <div className="flex items-start">
            <div className="flex-grow">
              <h2 className="text-3xl font-bold mb-4 text-blue-300">Personal Information</h2>
              <p>Name: Jaeheon Jeong</p>
              <p>Education: Myongji University, Industrial and Management Engineering</p>
              <p>GPA: 3.89 / 4.5</p>
              <p>Date of Birth: 1999.01.19</p>
              <p>Current Affiliation: Market Designers Co., Ltd.</p>
              <p>Position: AI Researcher</p>
            </div>
            <div className="ml-6 flex-shrink-0">
              <img
                src="/images/profile.jpg"
                alt="Jaeheon Jeong"
                className="w-40 h-60 rounded-full object-cover"
              />
            </div>
          </div>
        </ResumeSection>

        <ResumeSection delay={0.4}>
          <h2 className="text-3xl font-bold mb-4 text-green-300">Time Line</h2>
          <Timeline events={timelineEvents} />
        </ResumeSection>

        <ResumeSection delay={0.6}>
          <h2 className="text-3xl font-bold mb-4 text-pink-300">Awards</h2>
          <AwardGallery awards={awards} />
        </ResumeSection>

        <ResumeSection delay={0.8}>
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">Projects</h2>
          <ProjectShowcase projects={projects} />
        </ResumeSection>

        <ResumeSection delay={1.0}>
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Skills</h2>
          <SkillChart skills={skills} />
        </ResumeSection>
      </div>
    </div>
  );
};

export default Resume;