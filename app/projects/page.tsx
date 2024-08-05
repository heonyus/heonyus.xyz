"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { allProjects } from "contentlayer/generated";
import { Card } from "../components/card";
import Particles from "../components/particles";

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState(null);

  const sortedProjects = allProjects
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-500 to-orange-500 overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        staticity={50}
      />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
        >
          Projects
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <Card
                  onMouseEnter={() => setHoveredProject(project.slug)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="h-full transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-lg"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <h2 className="text-2xl font-bold mb-2 text-white">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                    <div className="text-sm text-gray-400">
                      {new Date(project.date).toLocaleDateString()}
                    </div>
                  </motion.div>
                  {hoveredProject === project.slug && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-lg"
                    />
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}