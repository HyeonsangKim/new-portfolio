'use client'

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Orb from "@/components/Orb"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const section1Ref = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  
  // MongoDB 스타일 핀 섹션
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const stickyHeroRef = useRef<HTMLDivElement>(null)
  const content4Ref = useRef<HTMLDivElement>(null)
  const content5Ref = useRef<HTMLDivElement>(null)

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const titles = [
    {
      text: "Front-End Developer",
      gradient: "from-purple-400 via-pink-500 to-rose-500"
    },
    {
      text: "Web Developer",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600"
    },
    {
      text: "App Developer",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600"
    }
  ]

  // 타이틀 로테이션 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [titles.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 이름 애니메이션 - 글자 하나씩 등장
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char')
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            rotateX: -90
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: "back.out(1.5)",
            delay: 0.3
          }
        )
      }

      // 타이틀 컨테이너 애니메이션
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1,
            ease: "power3.out"
          }
        )
      }

      // 🔥 트렌디한 히어로 스크롤 애니메이션
      if (heroSectionRef.current) {
        gsap.to(heroSectionRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -100,
          filter: "blur(20px)",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        })
      }

      // 🔥 섹션1 - 부드러운 fade-up 애니메이션
      if (section1Ref.current) {
        gsap.fromTo(
          section1Ref.current,
          { 
            opacity: 0, 
            y: 100,
            scale: 0.95,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: section1Ref.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            }
          }
        )

        gsap.to(section1Ref.current, {
          opacity: 0,
          y: -50,
          scale: 0.95,
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "bottom 50%",
            end: "bottom 20%",
            scrub: 1,
          }
        })
      }

      // 🔥 섹션2 - 카드 스태거 애니메이션
      if (section2Ref.current) {
        const cards = section2Ref.current.querySelectorAll('.skill-card')

        gsap.fromTo(
          section2Ref.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: section2Ref.current,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            }
          }
        )

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              y: 60,
              scale: 0.9,
              rotateY: -15
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateY: 0,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                scrub: 0.8,
              }
            }
          )
        })

        gsap.to(section2Ref.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "bottom 40%",
            end: "bottom 10%",
            scrub: 1,
          }
        })
      }

      // 🚀 MongoDB 스타일 핀 애니메이션
      if (pinContainerRef.current && stickyHeroRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })

        // 1단계: 히어로가 중앙에서 왼쪽으로 이동
        tl.to(stickyHeroRef.current, {
          x: "-35%",
          scale: 0.85,
          duration: 1,
          ease: "power2.inOut"
        })

        // 2단계: 컨텐트4 등장
        .fromTo(
          content4Ref.current,
          { 
            opacity: 0, 
            x: 100,
            scale: 0.9 
          },
          { 
            opacity: 1, 
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out"
          },
          "-=0.5"
        )

        // 3단계: 컨텐트4 페이드아웃, 컨텐트5 등장
        .to(content4Ref.current, {
          opacity: 0,
          x: -50,
          duration: 0.8
        }, "+=0.5")
        .fromTo(
          content5Ref.current,
          { 
            opacity: 0, 
            x: 100,
            scale: 0.9
          },
          { 
            opacity: 1, 
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out"
          },
          "-=0.5"
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const name = "I'm Hyeonsang Kim"

  return (
    <main ref={containerRef} className="relative bg-black overflow-hidden">
      {/* Orb 백그라운드 */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Orb
          hoverIntensity={0.3}
          rotateOnHover={true}
          hue={280}
          forceHoverState={false}
        />
      </div>

      {/* 배경 그라데이션 오버레이 */}
      <div className="fixed inset-0 z-[1px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </div>

      {/* 히어로 섹션 */}
      <div ref={heroSectionRef} className="relative min-h-screen flex items-center justify-center z-10">
        <div className="relative text-center px-4 sm:px-6">
          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8"
            style={{ perspective: '1000px' }}
          >
            {name.split('').map((char, index) => (
              <span
                key={index}
                className="char bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <div
            ref={titleRef}
            className="relative h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTitleIndex}
                initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wider whitespace-nowrap bg-gradient-to-r ${titles[currentTitleIndex].gradient} bg-clip-text text-transparent`}
              >
                {titles[currentTitleIndex].text}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, delay: 1.3, ease: "easeInOut" }}
            className="mx-auto mt-6 sm:mt-8 h-px sm:h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent max-w-[200px] sm:max-w-xs md:max-w-md"
          />
        </div>
      </div>

      {/* 섹션 1 */}
      <section ref={section1Ref} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 sm:mb-8">
              Creative Developer
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              혁신적인 사용자 경험을 만드는 프론트엔드 개발자입니다.
              <br className="hidden sm:block" />
              아름다운 디자인과 완벽한 기능의 조화를 추구합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 2 - 스킬 카드 */}
      <section ref={section2Ref} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 z-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"], gradient: "from-purple-500/20 to-pink-500/20" },
              { title: "Animation", skills: ["GSAP", "Framer Motion", "Three.js", "CSS"], gradient: "from-cyan-500/20 to-blue-500/20" },
              { title: "Tools", skills: ["Git", "Figma", "VS Code", "Vercel"], gradient: "from-emerald-500/20 to-teal-500/20" }
            ].map((category, i) => (
              <div
                key={i}
                className={`skill-card relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br ${category.gradient} backdrop-blur-sm`}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, j) => (
                    <li key={j} className="text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 컨텐트3 + MongoDB 스타일 핀 섹션 */}
      <div ref={pinContainerRef} className="relative h-screen z-30">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 왼쪽으로 이동할 히어로 */}
          <div ref={stickyHeroRef} className="w-full max-w-2xl px-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Hyeonsang Kim
              </h3>
              <p className="text-xl sm:text-2xl text-purple-400 mb-6">
                Front-End Developer
              </p>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
                사용자 경험을 최우선으로 생각하며,
                아름다운 인터페이스와 부드러운 애니메이션으로
                웹을 더 매력적으로 만듭니다.
              </p>
            </div>
          </div>

          {/* 오른쪽에서 등장할 컨텐트4 */}
          <div ref={content4Ref} className="absolute right-0 w-1/2 h-full flex items-center justify-center px-12 opacity-0">
            <div className="max-w-xl">
              <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
                Project 1
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                혁신적인 UI/UX를 제공하는 웹 애플리케이션을 개발했습니다.
                React와 TypeScript를 활용하여 확장 가능한 아키텍처를 구축했습니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'GSAP', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽에서 등장할 컨텐트5 */}
          <div ref={content5Ref} className="absolute right-0 w-1/2 h-full flex items-center justify-center px-12 opacity-0">
            <div className="max-w-xl">
              <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
                Project 2
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                실시간 데이터 시각화 대시보드를 구축했습니다.
                Three.js와 D3.js를 활용하여 인터랙티브한 경험을 제공합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'Three.js', 'D3.js', 'WebGL'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 여유 공간 */}
      <div className="h-screen relative z-20" />
    </main>
  )
}