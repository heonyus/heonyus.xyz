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
    >
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h3 
              className="text-xl font-bold mb-2 text-purple-200"
              whileHover={{ color: "#A7EDB8" }}
            >
              {project.title}
            </motion.h3>
            <p className="text-white/80 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="bg-white/20 text-purple-200 text-xs px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
              whileHover={{ color: "#A7EDB8" }}
            >
              View Project
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};