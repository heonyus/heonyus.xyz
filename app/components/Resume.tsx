import React, { useEffect, useRef, ReactNode } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

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
      {children}
    </motion.div>
  );
};

const Resume = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent to-black/70 text-white p-8">
      <div className="max-w-4xl mx-auto grid gap-8">
        <ResumeSection delay={0.2}>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Personal Information</h2>
            <p>이름: 정재헌</p>
            <p>학력: 명지대학교 산업경영공학과</p>
            <p>GPA: 3.89 / 4.5</p>
            <p>생년월일: 1999.01.19</p>
            <p>현 소속기관: (주)마켓디자이너스</p>
            <p>직책: AI Researcher</p>
          </div>
        </ResumeSection>

        <ResumeSection delay={0.4}>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Time Line</h2>
            <ul className="list-disc list-inside">
              <li>2018.02-2019.08 동아방송예술대 연기전공 입학 및 자퇴</li>
              <li>2020.03-2021.10 서울지방경찰청 제3기동단 입대 및 전역</li>
              <li>2022.02-2024.06 명지대 산업경영공학과 편입학 및 졸업(예정)</li>
              <li>2022.09-2023.08 명지대 산업경영공학과 Computational Data Science Lab 학부연구생</li>
              <li>2023.02-2024.02 명지대 산업경영공학과 Data Science 동아리 'FoM' 동아리 개설 및 회장</li>
              <li>2023.09-2024.02 (주)마켓디자이너스 - 튜터링 AI Innovation Team AI Researcher 및 Prompt Engineer</li>
              <li>2024.03- Lingora AI Innovation Team AI Researcher 및 MLOps Engineer</li>
            </ul>
          </div>
        </ResumeSection>

        <ResumeSection delay={0.6}>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Awards</h2>
            <ul className="list-disc list-inside">
              <li>2022.06 명지대 배움품앗이 교육훈련 장학금</li>
              <li>2022.12 명지대 산업경영공학과 Data Analytics 교내 Competition 우수상</li>
              <li>2022.12 명지대 산업경영공학과 Data Analytics 조교 사회진출 장학금</li>
              <li>2023.06 명지대 산업경영공학과 캡스톤 디자인 졸업작품 대상</li>
              <li>2023.08 명지대 산업경영공학과 Data Science 동아리 'Fom' Step 2 수료</li>
              <li>2023.12 국회 공공데이터 경진대회 본선 진출(심사중)</li>
              <li>2024.01 명지대 교내 현장실습후기 Competition 대상</li>
            </ul>
          </div>
        </ResumeSection>

        <ResumeSection delay={0.8}>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Projects</h2>
            {/* 프로젝트 내용을 여기에 추가 */}
          </div>
        </ResumeSection>

        <ResumeSection delay={1}>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Career</h2>
            {/* 경력 내용을 여기에 추가 */}
          </div>
        </ResumeSection>
      </div>
    </div>
  );
};

export default Resume;