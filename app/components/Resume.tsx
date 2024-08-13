import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Timeline } from './Timeline';
import { AwardGallery } from './AwardGallery';
import { ProjectShowcase } from './ProjectShowcase';
import { SkillChart } from './SkillChart';
import PersonalInformation from './PersonalInformation';

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

interface ResumeProps {
  language: 'en' | 'ko';
}

const Resume: React.FC<ResumeProps> = ({ language }) => {
  const timelineEvents = {
    en: [
      {
        date: "2018.02-2019.08",
        title: "Dong-Ah Institute of Media and Arts",
        description: "Enrolled and withdrew from Acting major"
      },
      {
        date: "2020.03-2021.10",
        title: "Seoul Metropolitan Police Agency",
        description: "Enlisted and discharged from 3rd Mobile Unit, Auxiliary Policeman"
      },
      {
        date: "2022.02-2024.08",
        title: "Myongji University",
        description: "Transferred to Industrial and Management Engineering & Graduated with Summa Cum Laude"
      },
      {
        date: "2022.09-2023.08",
        title: "Computational Data Science Lab",
        description: "Undergraduate researcher at Myongji University"
      },
      {
        date: "2023.02-2024.02",
        title: "Data Science Club 'FoM'",
        description: "Founder and President"
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
      },
    ],
    ko: [
      {
        date: "2018.02-2019.08",
        title: "동아방송예술대학교",
        description: "연기과 입학 및 자퇴"
      },
      {
        date: "2020.03-2021.10",
        title: "서울지방경찰청",
        description: "의무경찰 제3기동단 입대 및 전역"
      },
      {
        date: "2022.02-2024.06",
        title: "명지대학교",
        description: "산업경영공학과 편입 및 수석졸업"
      },
      {
        date: "2022.09-2023.08",
        title: "Computational Data Science Lab",
        description: "Undergraduate researcher"
      },
      {
        date: "2023.02-2024.02",
        title: "데이터사이언스 동아리 'FoM'",
        description: "동아리 설립 및 회장"
      },
      {
        date: "2023.09-2024.02",
        title: "마켓디자이너스 - 튜터링",
        description: "AI Researcher and Prompt Engineer"
      },
      {
        date: "2024.03-",
        title: "링고라 AI Innovation Team",
        description: "AI Researcher and MLOps Engineer"
      }
    ]
  };

  const awards = {
    en: [
      { 
        title: "Summa Cum Laude in Industrial Management Engineering", 
        date: "2024.08", 
        description: "Awarded within Myongji University" 
      },
      {
        title: "National Assembly Public Data Competition - Commendation Award", 
        date: "2024.07", 
        description: "Awarded by the National Assembly of the Republic of Korea" 
      },
      { 
        title: "Myongji University On-site Training Review Competition Grand Prize", 
        date: "2024.01", 
        description: "Awarded within Myongji University" 
      },
      { 
        title: "Myongji University Data Science Club 'FoM' Step 2 Completion", 
        date: "2023.08", 
        description: "Awarded within Myongji University" 
      },
      { 
        title: "Myongji University Capstone Design Graduation Project Grand Prize", 
        date: "2023.06", 
        description: "Awarded within Myongji University" 
      },
      { 
        title: "Myongji University Data Analytics TA Social Advancement Scholarship", 
        date: "2022.12", 
        description: "Awarded within Myongji University" 
      },
      { 
        title: "Myongji University Data Analytics Competition Excellence Award", 
        date: "2022.12", 
        description: "Awarded within Myongji University" 
      },
      { 
        title: "Myongji University Learning Community Scholarship", 
        date: "2022.06", 
        description: "Awarded within Myongji University" 
      }
    ],
    ko: [
      { 
        title: "산업경영공학과 최우수 졸업", 
        date: "2024.08", 
        description: "교내 수여" 
      },
      {
        title: "국회 공공데이터 경진대회 - 장려상", 
        date: "2024.07", 
        description: "대한민국 국회 수여" 
      },
      { 
        title: "명지대학교 현장실습 수기 공모전 대상", 
        date: "2024.01", 
        description: "교내 수여" 
      },
      { 
        title: "명지대학교 데이터사이언스 동아리 'FoM' Step 2 수료", 
        date: "2023.08", 
        description: "교내 수여" 
      },
      { 
        title: "명지대학교 캡스톤디자인 졸업작품 대상", 
        date: "2023.06", 
        description: "교내 수여" 
      },
      { 
        title: "명지대학교 데이터분석 TA 사회진출 장학금", 
        date: "2022.12", 
        description: "교내 수여" 
      },
      { 
        title: "명지대학교 데이터분석 경진대회 우수상", 
        date: "2022.12", 
        description: "교내 수여" 
      },
      { 
        title: "명지대학교 학습공동체 장학금", 
        date: "2022.06", 
        description: "교내 수여" 
      }
    ]
  };

  const skills = [
    { name: "Python", level: 90 },
    { name: language === 'en' ? "Machine Learning" : "기계학습", level: 85 },
    { name: language === 'en' ? "Deep Learning" : "딥러닝", level: 80 },
    { name: language === 'en' ? "Data Analysis" : "데이터 분석", level: 85 },
    { name: language === 'en' ? "Web Development" : "웹 개발", level: 75 },
    { name: language === 'en' ? "Database Management" : "데이터베이스 관리", level: 70 }
  ];

  const projects = {
    en: [
      {
        title: "Development of Personal Knowledge Model to Understand User's Persona",
        description: "Developed a model that extracts and manages personal knowledge about learners, allowing the AI to engage in more personalized conversations during tutoring sessions.",
        technologies: ["GPT-3.5", "Personal Knowledge Management", "Python", "MLOps"],
        link: "#",
        date: "Sep. 2023 - Present",
        keyAchievements: [
          "Implemented a knowledge extraction module with GPT-3.5 API.",
          "Optimized personal knowledge management using a multi-domain approach.",
          "Improved AI tutoring personalization through effective knowledge integration."
        ]
      },
      {
        title: "Open-end Chat Modifier Model Development and Deployment",
        description: "Built and deployed a model that modifies the output of AI chat systems, enabling the generation of more context-aware follow-up questions in conversations.",
        technologies: ["GPT-3.5", "AWS SageMaker", "Python", "Docker"],
        link: "#",
        date: "Jan. 2024 - Mar. 2024",
        keyAchievements: [
          "Achieved efficient context handling in long AI conversations.",
          "Deployed the model using AWS SageMaker with a rapid response time of 1.7 seconds.",
          "Implemented a CI/CD pipeline for continuous model updates."
        ]
      },
      {
        title: "Development of National Assembly Bill Proposal System Using Existing Legislation",
        description: "Developed a system for the South Korean National Assembly that assists in proposing bills by utilizing existing legislation, contributing to the legislative process.",
        technologies: ["NLP", "Python", "API Development"],
        link: "#",
        date: "Oct. 2023 - Dec. 2023",
        keyAchievements: [
          "Automated the bill proposal process using NLP techniques.",
          "Enhanced legislative efficiency by integrating existing laws into the system.",
          "Successfully deployed and tested the system within the National Assembly."
        ]
      },
      {
        title: "Entity Recognition Search Model Development and LLMOps Engineering System",
        description: "Engineered a system that evaluates and recommends words based on learner input by embedding their utterances and comparing them with a pre-built word database using cosine similarity.",
        technologies: ["SBERT", "GPT-4 API", "LLMOps", "Docker", "AWS"],
        link: "#",
        date: "Sep. 2023 - Dec. 2023",
        keyAchievements: [
          "Developed a robust entity recognition model with SBERT.",
          "Improved word recommendation accuracy by over 75%.",
          "Integrated LLMOps for automated deployment and scaling."
        ]
      },
      {
        title: "Development of NER - Search Model to Assess Learner's Familiarity with Words and Expressions",
        description: "Created a Named Entity Recognition (NER) search model to evaluate and improve learners' familiarity with words and expressions, integrating the system into educational tools.",
        technologies: ["NER", "SBERT", "Python", "LLMOps"],
        link: "#",
        date: "Sep. 2023 - Dec. 2023",
        keyAchievements: [
          "Successfully assessed and improved learner vocabulary.",
          "Incorporated advanced NLP techniques to enhance learning outcomes.",
          "Streamlined integration with existing educational tools."
        ]
      },
      {
        title: "Development of Dynamic Prompting that Changes System Messages Based on Textbook Topics",
        description: "Implemented a dynamic prompting system for educational purposes that adjusts system messages based on textbook topics, improving user interaction with the AI.",
        technologies: ["GPT-3.5", "Prompt Engineering", "Python"],
        link: "#",
        date: "Sep. 2023 - Nov. 2023",
        keyAchievements: [
          "Enhanced AI interaction by dynamically adjusting system prompts.",
          "Reduced user confusion by aligning prompts with textbook content.",
          "Improved user satisfaction in educational AI applications."
        ]
      },
      {
        title: "Development of DX-ASTI Demand-based Service Model Recommendation System",
        description: "Developed a recommendation system for ASTI (KISTI) that uses pre-trained models like LLaMa2 and various key technologies (KeyBERT, SBERT, CML, and contrastive learning) to extract tailored keywords and enhance service matching accuracy for member companies based on their profiles.",
        technologies: ["LLaMa2", "KeyBERT", "SBERT", "CML", "Contrastive Learning", "Python"],
        link: "#",
        date: "Mar. 2023 - Aug. 2023",
        keyAchievements: [
          "Successfully fine-tuned LLaMa2 for ASTI member company profiles.",
          "Improved service matching accuracy through tailored keyword extraction.",
          "Implemented a robust contrastive learning model for enhanced recommendation."
        ]
      },
      {
        title: "Development of Heterogeneous Domain Integrated Graph Neural Network for Topic Tomography",
        description: "Created a RAG (Retrieval-Augmented Generation) system for KISTI, which identifies topics within documents and finds the keywords that constitute those topics by analyzing similarities across documents.",
        technologies: ["SentenceBERT", "Clustering", "Contrastive Learning", "Python"],
        link: "#",
        date: "Jan. 2023 - Aug. 2023",
        keyAchievements: [
          "Developed a hybrid embedding structure for improved topic identification.",
          "Implemented a contrastive learning approach for accurate topic clustering.",
          "Enhanced document similarity detection through advanced graph neural networks."
        ]
      },
      {
        title: "Travel Itinerary Scheduling Using Reinforcement Learning and NLP",
        description: "Designed and implemented a scheduling system for travel itineraries by using reinforcement learning and natural language processing techniques.",
        technologies: ["Reinforcement Learning", "NLP", "Python"],
        link: "#",
        date: "Mar. 2023 - Jun. 2023",
        keyAchievements: [
          "Developed an efficient scheduling algorithm using reinforcement learning.",
          "Integrated NLP techniques for context-aware itinerary adjustments.",
          "Successfully tested and validated the system with real-world data."
        ]
      },
      {
        title: "Development of Reinforcement Learning Model for Power Generation Fuel Consumption Optimization",
        description: "Developed a reinforcement learning model to measure fuel consumption characteristics and optimize combustion processes, contributing to more efficient power generation.",
        technologies: ["Reinforcement Learning", "Python"],
        link: "#",
        date: "Oct. 2022 - Dec. 2022",
        keyAchievements: [
          "Optimized fuel consumption in power generation through reinforcement learning.",
          "Implemented a model that significantly reduced operational costs.",
          "Achieved measurable improvements in combustion efficiency."
        ]
      }
    ],
    ko: [
      {
        title: "User의 Persona를 이해하기 위한 Personal Knowledge Model 개발",
        description: "User에 대한 Personal Knowledge를 추출하고 관리하는 모델을 개발하여 AI가 더 개인화된 대화를 할 수 있도록 함.",
        technologies: ["GPT-3.5", "Personal Knowledge Management", "Python", "MLOps"],
        link: "#",
        date: "Sep. 2023 - Dec. 2023",
        keyAchievements: [
          "GPT-3.5 API를 사용한 Knowledge Extraction Module 구현.",
          "Multi-Domain Access 방식을 사용한 Personal Knowledge Management Optimization.",
          "효과적인 Knowledge Integration을 통한 AI Personalization 향상."
        ]
      },
      {
        title: "Open-end Chat Modifier Model 개발 및 배포",
        description: "AI 채팅 시스템의 출력을 수정하는 모델을 구축하고 배포하여 대화에서 더 문맥을 고려한 후속 질문을 생성할 수 있도록 함.",
        technologies: ["GPT-3.5", "AWS", "Sagemaker", "Python", "Docker"],
        link: "#",
        date: "Jan. 2024 - Mar. 2024",
        keyAchievements: [
          "Long Context AI Chatting에서 효율적인 문맥 처리 달성.",
          "AWS SageMaker를 사용하여 1.7초의 빠른 응답 시간으로 모델 배포.",
          "Continuous Model Updates를 위한 CI/CD Pipeline 구현."
        ]
      },
      {
        title: "기존 법률을 활용한 국회 의안 제안 시스템 개발",
        description: "기존 법률을 활용하여 의안을 제안하는 시스템을 개발하여 대한민국 국회의 입법 과정에 기여함.",
        technologies: ["RAG", "Python", "API", "MLOps", "Prompt Engineering", "Git"],
        link: "https://github.com/heonyus/Congress-Competition",
        date: "Oct. 2023 - Dec. 2023",
        keyAchievements: [
          "NLP 기술을 사용하여 의안 제안 프로세스 자동화.",
          "기존 법률을 시스템에 통합하여 입법 효율성 향상.",
          "시스템을 성공적으로 배포 및 테스트함."
        ]
      },
      {
        title: "Entity Recognition 모델 개발 및 LLMOps 시스템 개발",
        description: "User Input을 Embedding하고 사전 구축된 단어 DB와 Cosine Similarity를 비교하여 단어를 평가하고 추천하는 시스템을 설계함.",
        technologies: ["SBERT", "GPT-4 API", "LLMOps", "Docker", "AWS", "CI/CD"],
        link: "#",
        date: "Sep. 2023 - Dec. 2023",
        keyAchievements: [
          "SBERT를 사용하여 Strong Entity Recognition Model 개발.",
          "Word Recommendation Accuracy를 75% 이상 향상.",
          "Automated Deployment and Scaling for LLMOps with CI/CD."
        ]
      },
      {
        title: "DX-ASTI 수요 기반 서비스 모델 추천 시스템 개발",
        description: "ASTI(KISTI)를 위한 추천 시스템으로, LLaMa2와 같은 사전 학습된 모델 및 다양한 핵심 기술(KeyBERT, SBERT, CML, 대비 학습)을 사용하여 회원사 프로필에 맞는 맞춤형 키워드를 추출하고 서비스 매칭 정확도를 향상시킴.",
        technologies: ["LLaMa2", "KeyBERT", "SBERT", "CML", "대비 학습", "Python"],
        link: "#",
        date: "Mar. 2023 - Aug. 2023",
        keyAchievements: [
          "ASTI 회원사 프로필에 대한 LLaMa2 fine-tuning.",
          "맞춤형 키워드 추출을 통한 서비스 매칭 정확도 향상.",
          "강화된 추천을 위한 강력한 대비 학습 모델 구현."
        ]
      },
      {
        title: "이종 도메인 통합 그래프 신경망을 위한 주제 토포그래피 개발",
        description: "KISTI를 위한 RAG(Retrieval-Augmented Generation) 시스템으로, 문서 내에서 주제를 식별하고 해당 주제를 구성하는 키워드를 찾아내는 문서 간 유사성 분석을 수행함.",
        technologies: ["SentenceBERT", "클러스터링", "대비 학습", "Python"],
        link: "#",
        date: "Jan. 2023 - Aug. 2023",
        keyAchievements: [
          "주제 식별을 위한 하이브리드 임베딩 구조 개발.",
          "정확한 주제 클러스터링을 위한 대비 학습 접근 방식 구현.",
          "고급 그래프 신경망을 통한 문서 유사성 감지 강화."
        ]
      },
      {
        title: "강화 학습 및 NLP를 사용한 여행 일정 스케줄링",
        description: "강화 학습 및 자연어 처리 기술을 사용하여 여행 일정 스케줄링 시스템을 설계 및 구현함.",
        technologies: ["강화 학습", "NLP", "Python"],
        link: "#",
        date: "Mar. 2023 - Jun. 2023",
        keyAchievements: [
          "강화 학습을 사용한 효율적인 스케줄링 알고리즘 개발.",
          "문맥을 고려한 일정 조정을 위한 NLP 기술 통합.",
          "실제 데이터로 시스템 성공적으로 테스트 및 검증."
        ]
      },
      {
        title: "발전소 연료 소비 최적화를 위한 강화 학습 모델 개발",
        description: "연료 소비 특성을 측정하고 연소 프로세스를 최적화하는 강화 학습 모델을 개발하여 더 효율적인 발전소 발전에 기여함.",
        technologies: ["강화 학습", "Python"],
        link: "#",
        date: "Oct. 2022 - Dec. 2022",
        keyAchievements: [
          "강화 학습을 통해 발전소 연료 소비 최적화.",
          "운영 비용을 크게 줄이는 모델 구현.",
          "연소 효율성에 실질적인 개선 달성."
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8">
        <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
          {language === 'en' ? 'Personal Information' : 'Personal Information'}
        </h2>
        <PersonalInformation language={language} />

        <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
          {language === 'en' ? 'Stacks' : 'Stacks'}
        </h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full max-w-4xl mx-auto">
          <img 
            src="https://skillicons.dev/icons?i=py,pytorch,tensorflow,aws,figma,gcp,git,github,html,css,supabase,mysql,postgresql,js,ts" 
            alt="skills logos" 
            className="max-w-full"
          />
        </div>

        <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
          {language === 'en' ? 'Projects' : 'Projects'}
        </h2>
        <ProjectShowcase projects={projects[language]} />

        <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
          {language === 'en' ? 'Awards' : 'Awards'}
        </h2>
        <AwardGallery awards={awards[language]} />

        <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
          {language === 'en' ? 'Time Line' : 'Time Line'}
        </h2>
        <Timeline events={timelineEvents[language]} />
      </div>
    </div>
  );
};

export default Resume;