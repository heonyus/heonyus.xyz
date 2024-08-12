import React, { useEffect, useRef, ReactNode } from 'react';
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
      title: "Development of Personal Knowledge Model to Understand Learner's Persona",
      description: "Developed a model that extracts and manages personal knowledge about learners, allowing the AI to engage in more personalized conversations during tutoring sessions.",
      technologies: ["GPT-3.5", "Personal Knowledge Management", "Python", "MLOps"],
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
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
      link: "#", // hypothetical link
      date: "Oct. 2022 - Dec. 2022",
      keyAchievements: [
        "Optimized fuel consumption in power generation through reinforcement learning.",
        "Implemented a model that significantly reduced operational costs.",
        "Achieved measurable improvements in combustion efficiency."
      ]
    }
  ];


  
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8">

          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
            Personal Information
          </h2>
          <PersonalInformation />

          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
            Stacks
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full max-w-4xl mx-auto">
            <img 
              src="https://skillicons.dev/icons?i=py,pytorch,tensorflow,aws,figma,gcp,git,github,html,css,supabase,mysql,postgresql,js,ts" 
              alt="skills logos" 
              className="max-w-full"
            />
          </div>

          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
          Projects
          </h2>
          <ProjectShowcase projects={projects} />

          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
            Awards
          </h2>
          <AwardGallery awards={awards} />

          <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
            Time Line
          </h2>
          <Timeline events={timelineEvents} />
        
          {/* <h2 className="py-2 sm:py-3 px-0.5 z-10 text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 font-bold duration-100 cursor-default animate-title font-display md:text-4xl lg:text-5xl whitespace-normal sm:whitespace-nowrap">
            Skills
          </h2>
          <SkillChart skills={skills} /> */}
      </div>
    </div>
  );
};

export default Resume;