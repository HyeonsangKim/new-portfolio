'use client'
import { useRef, useLayoutEffect, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ✅ 데이터 구조: 회사(Company)를 기준으로 통합
// Soundmind 내부에 projects 배열을 두어 탭으로 전환
const experiences = [
  {
    id: 1,
    company: "Soundmind",
    role: "Full Stack & Mobile Lead",
    period: "2025.02 - Present",
    // 탭으로 보여줄 프로젝트 목록
    projects: [
      {
        name: "ODYA (Location)",
        desc: "제한된 네트워크 환경에서 IPC 통신과 Redis를 활용한 고가용성 위치 추적 시스템입니다.",
        highlights: ["Android Native Module & IPC 통신", "Redis 기반 실시간 위치 데이터 파이프라인", "React Native CLI 크로스 플랫폼 배포"],
        stack: ['React Native', 'Spring Boot', 'Redis', 'Native Modules']
      },
      {
        name: "Launcher (Offline)",
        desc: "인터넷이 없는 환경에서도 S3와 로컬 파일 시스템을 연동해 대용량 콘텐츠를 재생하는 런처입니다.",
        highlights: ["Android 커스텀 런처 및 키오스크 모드", "대용량 비디오 청크 다운로드/캐싱", "S3 API 콘텐츠 버전 관리"],
        stack: ['React Native', 'Amazon S3', 'FileSystem', 'Android']
      },
      {
        name: "Admin (Next.js)",
        desc: "Next.js 15의 Server Actions와 SSR을 도입하여 보안과 성능을 강화한 교육 평가 플랫폼입니다.",
        highlights: ["Next.js 15 SSR 아키텍처", "Prisma & PostgreSQL 스키마 설계", "Server Actions 기반 파일 처리"],
        stack: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL']
      }
    ],
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    company: "Purple Academy",
    role: "Frontend Developer",
    period: "2023.06 - 2024.06",
    // 프로젝트가 하나인 경우 projects 배열에 1개만 넣음
    projects: [
      {
        name: "LMS App Migration",
        desc: "5,000여 개의 웹 콘텐츠를 React Native로 이관하고, GSAP/SVG로 인터랙티브 학습 경험을 구현했습니다.",
        highlights: ["Web → React Native 앱 마이그레이션", "SVG Path 활용 인터랙티브 학습 구현", "렌더링 성능 300% 최적화"],
        stack: ['React Native', 'React', 'GSAP', 'TypeScript']
      }
    ],
    color: "from-purple-500 to-pink-400"
  },
  {
    id: 3,
    company: "IEZLAB",
    role: "Full Stack Developer",
    period: "2022.04 - 2023.03",
    projects: [
      {
        name: "R&D Visualization",
        desc: "Canvas API를 활용해 고서 번역 이미지 위에 텍스트 레이어를 렌더링하는 시각화 엔진을 개발했습니다.",
        highlights: ["Canvas API 기반 이미지 렌더링 엔진", "Spring Boot/JPA 사내 ERP 구축", "레거시 데이터 시각화"],
        stack: ['React', 'Canvas API', 'Spring Boot', 'JPA']
      }
    ],
    color: "from-orange-400 to-amber-500"
  }
]

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  
  // 각 카드별로 현재 선택된 프로젝트 탭 인덱스를 저장 (기본값 0)
  const [tabState, setTabState] = useState<{ [key: number]: number }>({ 1: 0, 2: 0, 3: 0 })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${experiences.length * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const index = Math.min(
                Math.round(self.progress * (experiences.length - 1)),
                experiences.length - 1
            )
            setActiveCardIndex(index)
          }
        }
      })

      cardsRef.current.forEach((card, i) => {
        if (i === 0) return
        
        // Stacking Animation
        tl.to(cardsRef.current[i - 1], {
          scale: 0.9,
          opacity: 0.0, // 이전 카드는 완전히 사라지게 처리 (탭 조작 혼동 방지)
          yPercent: -10,
          duration: 1,
          ease: "power2.inOut"
        }, ">")

        tl.from(card, {
          yPercent: 120,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut"
        }, "<")
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen bg-slate-950 text-white overflow-hidden selection:bg-white/20">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
         <div className={`absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-gradient-to-b ${experiences[activeCardIndex].color} opacity-15 blur-[150px] transition-colors duration-1000`} />
      </div>

      <div className="max-w-7xl mx-auto h-full px-6 flex flex-col lg:flex-row items-center relative z-10">
        
        {/* --- Left Text Panel --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full z-10 mb-10 lg:mb-0 pointer-events-none">
          <div className="lg:pr-20 space-y-8">
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] drop-shadow-2xl">
              Career <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${experiences[activeCardIndex].color} transition-all duration-700`}>
                Journey.
              </span>
            </h2>
            
            <div className="relative h-24 overflow-hidden">
               {experiences.map((exp, i) => (
                  <p 
                    key={exp.id}
                    className={`absolute top-0 left-0 text-xl lg:text-2xl text-slate-300 font-light leading-relaxed transition-all duration-700 transform
                      ${i === activeCardIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                  >
                   {/* 회사별 슬로건 */}
                   {i === 0 && "Leading offline-first mobile & web solutions."}
                   {i === 1 && "Innovating EdTech with interactive UX."}
                   {i === 2 && "R&D and Full-stack system architecture."}
                  </p>
               ))}
            </div>

            <div className="flex gap-2">
              {experiences.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ease-out 
                  ${i <= activeCardIndex ? `w-12 bg-gradient-to-r ${experiences[activeCardIndex].color}` : 'w-2 bg-white/10'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- Right Card Panel (Interactive Tabs) --- */}
        <div className="w-full lg:w-1/2 relative h-full flex items-center justify-center perspective-[2000px]">
          <div className="relative w-full max-w-[500px] aspect-[4/5] lg:h-[620px]">
            {experiences.map((exp, i) => {
              const currentProjectIndex = tabState[exp.id] || 0
              const currentProject = exp.projects[currentProjectIndex]

              return (
                <div 
                  key={exp.id}
                  ref={(el) => { cardsRef.current[i] = el }}
                  style={{ zIndex: i }} 
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="w-full h-full rounded-[2rem] p-[1px] bg-gradient-to-b from-white/15 to-transparent backdrop-blur-md shadow-2xl overflow-hidden ring-1 ring-white/10">
                    <div className="relative h-full w-full bg-[#0a0a0a]/95 rounded-[31px] p-8 lg:p-10 flex flex-col hover:bg-[#0f0f0f] transition-colors duration-500">
                      
                      {/* Glow Effect */}
                      <div className={`absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br ${exp.color} opacity-20 blur-[90px] rounded-full pointer-events-none`} />

                      {/* Header: Company & Period */}
                      <div className="relative z-10 mb-6 border-b border-white/5 pb-4">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[11px] font-bold text-slate-500 tracking-widest uppercase py-1 px-3 rounded-full bg-white/5">
                             {exp.period}
                           </span>
                           <span className="text-3xl font-bold text-white/5 font-mono">0{exp.id}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{exp.company}</h3>
                        <p className={`text-sm font-medium bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.role}
                        </p>
                      </div>

                      {/* 🚀 TAB NAVIGATION (Soundmind 처럼 프로젝트가 여러개일 때만 표시) */}
                      {exp.projects.length > 1 && (
                        <div className="relative z-10 flex p-1 mb-6 bg-white/5 rounded-xl border border-white/5">
                          {exp.projects.map((proj, idx) => (
                            <button
                              key={idx}
                              onClick={() => setTabState(prev => ({ ...prev, [exp.id]: idx }))}
                              className={`flex-1 text-[11px] lg:text-xs font-bold py-2 rounded-lg transition-all duration-300
                                ${currentProjectIndex === idx 
                                  ? `bg-slate-800 text-white shadow-lg` 
                                  : 'text-slate-500 hover:text-slate-300'}
                              `}
                            >
                              {proj.name.split(' ')[0]} {/* 짧은 이름 표시 (예: ODYA) */}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Content Area (Changes based on Tab) */}
                      <div className="relative z-10 flex-grow flex flex-col gap-4 animate-fadeIn">
                        {/* Project Title (Tab이 없으면 숨김 or 강조) */}
                        {exp.projects.length > 1 && (
                            <h4 className="text-xl font-bold text-slate-200">
                                {currentProject.name}
                            </h4>
                        )}

                        <p className="text-slate-400 leading-relaxed text-[14px] min-h-[60px]">
                          {currentProject.desc}
                        </p>
                        
                        <ul className="space-y-2 mt-2">
                          {currentProject.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start text-[13px] text-slate-300">
                              <span className={`flex-shrink-0 w-1.5 h-1.5 mt-1.5 mr-2.5 rounded-full bg-gradient-to-r ${exp.color}`} />
                              <span className="flex-1 leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="relative z-10 mt-auto pt-6">
                        <div className="flex flex-wrap gap-2">
                          {currentProject.stack.map(s => (
                            <span key={s} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}