"use client";

import { motion, Reorder, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Project, projects as defaultProjects } from "@/lib/projects";
import { useMediaQuery } from "react-responsive";

interface ProjectsSectionProps {
  projects?: Project[];
  title?: string;
  subtitle?: string;
  className?: string;
  onProjectsReorder?: (newOrder: Project[]) => void;
}

// Helper function to get hostname safely
const getHostname = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return url;
  }
};

export function ProjectsSection({
  projects: initialProjects = defaultProjects,
  title = "My Recent Work",
  subtitle = "Featured Projects",
  className = "",
  onProjectsReorder,
}: ProjectsSectionProps) {
  // State for project order
  const [orderedProjects, setOrderedProjects] = useState(initialProjects);

  // State for orb positions
  const [orbPositions] = useState(() =>
    Array(3)
      .fill(0)
      .map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
      }))
  );

  // State for iframe loading
  const [loadedIframes, setLoadedIframes] = useState<Record<string, boolean>>(
    {}
  );

  // Client-side only code
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust the maxWidth as needed

  // Handle project reordering
  const handleReorder = (newOrder: Project[]) => {
    setOrderedProjects(newOrder);
    onProjectsReorder?.(newOrder);
  };

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background to-background/50">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 mix-blend-normal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {orbPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animation: `float ${10 + i * 2}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <div id="projects" className="relative mx-auto px-4">
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mb-20 text-center"
          >
            <motion.span
              className="text-primary text-sm font-medium mb-3 block text-blue-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.span>
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
              {title}
            </h2>
            <br></br>
            <h3 className="text-gray-400 text-sm mb-2 transition-colors duration-500 group-hover:text-gray-300">
              * Draggable projects (Works only on desktop)
            </h3>
            <div className="mt-4 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-full" />
            </div>
          </motion.div>

          {/* Projects Grid */}
          {!isMobile ? (
            <Reorder.Group
              axis="y"
              values={orderedProjects}
              onReorder={handleReorder}
              className="grid grid-cols-1 gap-32 w-full"
            >
              {orderedProjects.map((project, index) => (
                <Reorder.Item
                  key={project.id}
                  value={project}
                  className="relative cursor-move"
                  whileDrag={{
                    scale: 1.02,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    zIndex: 50,
                  }}
                >
                  <div className="relative group">
                    {/* Drag Handle */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                        <svg
                          className="w-4 h-4 text-white/50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                      </div>
                    </div>

                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                        index % 2 === 1 ? "lg:rtl" : ""
                      }`}
                    >
                      {/* Project Info Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:pr-8"
                      >
                        <div className="relative group bg-black/20 backdrop-blur-lg rounded-3xl border border-white/10 p-8 lg:p-10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                          {/* Category Badge */}
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6">
                            {project.subtitle}
                          </div>

                          {/* Title with animated underline */}
                          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:scale-[1.02] transition-transform duration-300">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Stack Tags */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary/5"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-4">
                            {/* <Link
                              href={project.links.website}
                              target="_blank"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                              </svg>
                              Visit Website
                            </Link> */}
                            <Link
                              href={project.links.github}
                              target="_blank"
                              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white/90 font-medium transition-all duration-300 hover:scale-105 hover:bg-white/10"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                />
                              </svg>
                              View Code
                            </Link>
                          </div>
                        </div>
                      </motion.div>

                      {/* Project Screenshot */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative aspect-[16/10] rounded-3xl overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Image
                          src={project.screenshot}
                          alt={project.title}
                          fill
                          className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                          quality={95}
                        />
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </motion.div>
                    </div>

                    {/* Decorative line connecting projects */}
                    {index < orderedProjects.length - 1 && (
                      <div className="hidden lg:block absolute left-1/2 bottom-0 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent transform translate-y-full" />
                    )}
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            // Mobile view - without reordering
            <div className="grid grid-cols-1 gap-32 w-full">
              {orderedProjects.map((project, index) => (
                <div key={project.id} className="relative group">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                      index % 2 === 1 ? "lg:rtl" : ""
                    }`}
                  >
                    {/* Project Info Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="lg:pr-8"
                    >
                      <div className="relative group bg-black/20 backdrop-blur-lg rounded-3xl border border-white/10 p-8 lg:p-10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                        {/* Category Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6">
                          {project.subtitle}
                        </div>

                        {/* Title with animated underline */}
                        <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:scale-[1.02] transition-transform duration-300">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                          <Link
                            href={project.links.website}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                              />
                            </svg>
                            Visit Website
                          </Link>
                          <Link
                            href={project.links.github}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white/90 font-medium transition-all duration-300 hover:scale-105 hover:bg-white/10"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              />
                            </svg>
                            View Code
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                    {/* Project Screenshot */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative aspect-[16/10] rounded-3xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Image
                        src={project.screenshot}
                        alt={project.title}
                        fill
                        className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                        quality={95}
                      />
                      {/* Overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </motion.div>
                  </div>

                  {/* Decorative line connecting projects */}
                  {index < orderedProjects.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 bottom-0 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent transform translate-y-full" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
