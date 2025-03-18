"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const techStack = [
  {
    name: "Java",
    icon: "/portfolio/tech/java.svg",
    category: "Languages",
  },
  {
    name: "Python",
    icon: "/portfolio/tech/python.svg",
    category: "Languages",
  },
  {
    name: "SQL",
    icon: "/portfolio/tech/sql.svg",
    category: "Databases",
  },
  {
    name: "MongoDB",
    icon: "/portfolio/tech/mongodb.svg",
    category: "Databases",
  },
  {
    name: "Express.js",
    icon: "/portfolio/tech/express.svg",
    category: "Backend",
  },
  {
    name: "Node.js",
    icon: "/portfolio/tech/nodejs.svg",
    category: "Backend",
  },
  {
    name: "React",
    icon: "/portfolio/tech/react.svg",
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: "/portfolio/tech/nextJs.svg",
    category: "Frontend",
  },
  {
    name: "AWS Cloud",
    icon: "/portfolio/tech/aws.svg",
    category: "Cloud",
  },
  {
    name: "Vercel",
    icon: "/portfolio/tech/vercel.svg",
    category: "Cloud",
  },
];

export function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      setStart(true);
    }
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background to-background/50">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 mix-blend-normal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
      </div>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"
          animate={{
            x: ["100%", "0%", "100%"],
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"
          animate={{
            x: ["50%", "0%", "50%"],
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>

      <div id="techstack" className="relative mx-auto px-4">
        <div className="flex flex-col items-center justify-center mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mb-20 text-center"
          >
            <span className="text-primary text-sm font-medium mb-2 block">
              My Tech Stack
            </span>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Technologies I Worked On
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-full" />
            </div>
          </motion.div>

          {/* Infinite Scrolling Tech Stack */}
          <div
            ref={containerRef}
            className="relative w-full mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
          >
            <div
              ref={scrollerRef}
              className={cn(
                "flex gap-10 py-4 w-max flex-nowrap",
                start && "animate-scroll hover:[animation-play-state:paused]"
              )}
              style={
                {
                  "--duration": "40s",
                  "--direction": "1",
                } as React.CSSProperties
              }
            >
              {[...techStack, ...techStack].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="group relative flex flex-col items-center flex-shrink-0"
                >
                  <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-primary/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="absolute -inset-px bg-gradient-to-br from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur-md transition-opacity" />
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-14 h-14 object-contain filter brightness-75 saturate-50 group-hover:brightness-110 group-hover:saturate-100 transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="block text-sm font-medium text-gray-300 group-hover:text-primary transition-colors">
                      {tech.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 block opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
