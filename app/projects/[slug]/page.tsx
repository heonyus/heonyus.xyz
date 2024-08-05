"use client";

import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { motion } from "framer-motion";
import Particles from "@/app/components/particles";
import Link from "next/link";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-500 to-orange-500 overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        staticity={50}
      />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/projects" className="text-white hover:text-purple-200 mb-4 inline-block">
            &larr; Projects
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
          <div className="text-gray-300 mb-8">
            {new Date(project.date).toLocaleDateString()}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg"
        >
          <Mdx code={project.body.code} />
        </motion.div>
      </div>
    </div>
  );
}