'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: "Test",
    category: "Personal Project",
    desc: "TestTestTestTestTestTestTestTestTest",
    tech: ["Next.js", "Python", "FastAPI", "OpenAI"],
    links: { demo: "#", github: "#" },
    image: null, // 이미지 경로가 있으면 넣으세요
    color: "from-violet-600 to-indigo-600"
  },
  {
    id: 2,
    title: "Test",
    category: "Mobile App",
    desc: "TestTestTestTestTestTest",
    tech: ["React Native", "WebSocket", "Zustand"],
    links: { demo: null, github: "#" },
    image: null,
    color: "from-emerald-500 to-teal-500"
  }
]

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      <div className="mb-24 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-4"
        >
          Selected Works
        </motion.h2>
        <p className="text-gray-400">엄선된 개인 프로젝트와 실험들입니다.</p>
      </div>

      <div className="flex flex-col gap-20 lg:gap-32">
        {projects.map((project, i) => (
          <CinematicCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function CinematicCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]) // Parallax Effect
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* 1. Image Area (Wide & Parallax) */}
      <div className="w-full lg:w-3/5 h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden relative group border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* 이미지가 없을 때 대체 그라디언트 */}
        {project.image ? (
            <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
                 <Image src={project.image} alt={project.title} fill className="object-cover" />
            </motion.div>
        ) : (
             <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-20`} />
        )}
        
        {/* Floating Badge */}
        <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
           {project.category}
        </div>
      </div>

      {/* 2. Text Area */}
      <div className="w-full lg:w-2/5 flex flex-col items-start space-y-6">
        <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          {project.title}
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed">
          {project.desc}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
             <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/5">
               {t}
             </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
           {project.links.github && (
              <a href={project.links.github} className="flex items-center gap-2 text-white border-b border-transparent hover:border-purple-500 transition-all pb-1 group">
                 <FiGithub /> Source Code <FiArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </a>
           )}
           {project.links.demo && (
              <a href={project.links.demo} className="flex items-center gap-2 text-white border-b border-transparent hover:border-purple-500 transition-all pb-1 group">
                 <FiExternalLink /> Live Demo <FiArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </a>
           )}
        </div>
      </div>
    </motion.div>
  )
}