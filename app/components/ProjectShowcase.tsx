import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl"
    >
      <h3 className="text-2xl font-bold mb-4 text-white">Projects</h3>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/5 rounded-lg p-4 shadow-lg transition-all duration-300 hover:bg-white/20"
          >
            <h4 className="text-lg font-bold mb-2 text-white">{project.title}</h4>
            <p className="text-white/80 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};