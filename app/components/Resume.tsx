import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Timeline, TimelineEvent } from './Timeline';
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

const Resume = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      date: "2018.02-2019.08",
      title: "동아방송예술대 연기전공",
      description: "입학 및 자퇴"
    },
    {
      date: "2020.03-2021.10",
      title: "서울지방경찰청 제3기동단",
      description: "입대 및 전역"
    },
    {
      date: "2022.02-2024.06",
      title: "명지대 산업경영공학과",
      description: "편입학 및 졸업(예정)"
    },
    {
      date: "2022.09-2023.08",
      title: "명지대 산업경영공학과 Computational Data Science Lab",
      description: "학부연구생"
    },
    {
      date: "2023.02-2024.02",
      title: "명지대 산업경영공학과 Data Science 동아리 'FoM'",
      description: "동아리 개설 및 회장"
    },
    {
      date: "2023.09-2024.02",
      title: "(주)마켓디자이너스 - 튜터링 AI Innovation Team",
      description: "AI Researcher 및 Prompt Engineer"
    },
    {
      date: "2024.03-",
      title: "Lingora AI Innovation Team",
      description: "AI Researcher 및 MLOps Engineer"
    }
  ];

  const awards = [
    { title: "명지대 배움품앗이 교육훈련 장학금", date: "2022.06", description: "" },
    { title: "명지대 산업경영공학과 Data Analytics 교내 Competition 우수상", date: "2022.12", description: "" },
    { title: "명지대 산업경영공학과 Data Analytics 조교 사회진출 장학금", date: "2022.12", description: "" },
    { title: "명지대 산업경영공학과 캡스톤 디자인 졸업작품 대상", date: "2023.06", description: "" },
    { title: "명지대 산업경영공학과 Data Science 동아리 'Fom' Step 2 수료", date: "2023.08", description: "" },
    { title: "국회 공공데이터 경진대회 본선 진출", date: "2023.12", description: "심사중" },
    { title: "명지대 교내 현장실습후기 Competition 대상", date: "2024.01", description: "" }
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
          <h2 className="text-3xl font-bold mb-4 text-blue-300">Personal Information</h2>
          <p>이름: 정재헌</p>
          <p>학력: 명지대학교 산업경영공학과</p>
          <p>GPA: 3.89 / 4.5</p>
          <p>생년월일: 1999.01.19</p>
          <p>현 소속기관: (주)마켓디자이너스</p>
          <p>직책: AI Researcher</p>
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