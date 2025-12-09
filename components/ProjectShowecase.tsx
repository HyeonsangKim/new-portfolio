'use client'
import { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "Global E-Learning",
    category: "AI / EdTech",
    desc: "10개국 언어 지원 TTS/STT 통합 교육 플랫폼. React와 Triton 서버를 연동하여 초저지연 실시간 음성 처리를 구현했습니다.",
    stack: ['React', 'Next.js', 'Triton', 'Docker'],
    color: "from-blue-400 to-purple-400"
  },
  {
    id: 2,
    title: "Data Visualization",
    category: "IoT / 3D Web",
    desc: "실시간 센서 데이터를 3D로 시각화하는 대시보드. 대용량 데이터 처리를 위해 WebGL 인스턴싱을 최적화하여 렌더링 성능을 300% 향상시켰습니다.",
    stack: ['Three.js', 'D3.js', 'WebGL', 'Socket.io'],
    color: "from-emerald-400 to-cyan-400"
  },
  {
    id: 3,
    title: "AI Agent Chat",
    category: "LLM / Interface",
    desc: "LLM 기반의 멀티 에이전트 채팅 시스템. Server-Sent Events(SSE)를 활용한 스트리밍 응답과 자연스러운 인터랙션 UI를 설계했습니다.",
    stack: ['Tailwind', 'Motion', 'OpenAI API', 'Redis'],
    color: "from-orange-400 to-rose-400"
  }
]

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  // Optional: Track active index to animate text on the left
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Mobile check usually happens here, but for simplicity assuming Desktop logic for the demo
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${projects.length * 100}%`, // Scroll distance based on number of cards
          pin: true,
          scrub: 1, // Smooth scrubbing
          snap: {
             snapTo: 1 / (projects.length - 1), // Optional: auto-snap to card
             duration: { min: 0.2, max: 0.5 },
             ease: "power1.inOut"
          }
        }
      })

      // We start loop from 2nd card (index 1) because the 1st card is already visible
      cardsRef.current.forEach((card, i) => {
        if (i === 0) return

        // 1. Animate Previous Card (The one being covered)
        // It should scale down and darken to create depth
        tl.to(cardsRef.current[i - 1], {
          scale: 0.9, 
          filter: "blur(10px)",
          opacity: 0.4,
          yPercent: -10, // Move slightly up
          duration: 1,
          ease: "none"
        }, ">") // ">" means start immediately after previous action

        // 2. Animate Current Card (Entering)
        // Slide up from bottom
        tl.fromTo(card, 
          { 
            yPercent: 120, // Start below screen
            opacity: 1 // Make sure it's visible before it slides in
          },
          { 
            yPercent: 0, // Slide to center
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onStart: () => setActiveIndex(i), // Update state for left panel
            onReverseComplete: () => setActiveIndex(i - 1)
          },
          "<" // "<" means start AT THE SAME TIME as the previous card fading out
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen bg-black/30 backdrop-blur-lg  text-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto h-full px-6 flex flex-col lg:flex-row items-center">
        
        {/* --- Left Text Panel (Reacts to active card) --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full z-10 pointer-events-none">
          <div className="lg:pr-20 space-y-8">
            <h2 className="text-7xl font-bold tracking-tighter">
              Selected <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${projects[activeIndex].color} transition-all duration-700`}>
                Works.
              </span>
            </h2>
            
            <div className="relative h-32 overflow-hidden">
               {/* Animated Text Switching */}
               {projects.map((p, i) => (
                  <p 
                    key={p.id}
                    className={`absolute top-0 left-0 text-2xl text-white/70 font-light leading-relaxed transition-all duration-700 transform
                      ${i === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                  >
                   {/* Show summary or quote based on active index */}
                   {i === 0 && "Global scale education platform."}
                   {i === 1 && "Visualizing invisible data."}
                   {i === 2 && "Generative AI interface."}
                  </p>
               ))}
            </div>

            {/* Progress Indicator */}
            <div className="flex gap-3">
              {projects.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-white' : 'w-4 bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- Right Card Panel --- */}
        <div className="w-full lg:w-1/2 relative h-full flex items-center justify-center perspective-[2000px]">
          <div className="relative w-full max-w-[500px] aspect-[4/5] lg:h-[650px]">
            {projects.map((project, i) => (
              <div 
                key={project.id}
                ref={(el) => { cardsRef.current[i] = el }}
                // IMPORTANT: Stack order. Later cards must be on top.
                style={{ zIndex: i + 1 }} 
                className="absolute inset-0 w-full h-full"
              >
                {/* Card Visuals 
                  Note: We separate the 'Animation Container' (above) from the 'Visual Card' (below)
                  to avoid transform conflicts.
                */}
                <div className="w-full h-full rounded-3xl p-[1px] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
                  <div className="relative h-full w-full bg-black/80 rounded-[22px] p-10 flex flex-col justify-between hover:bg-black/70 transition-colors duration-500">
                    
                    {/* Glowing Blob Background */}
                    <div className={`absolute top-[-50%] right-[-50%] w-[500px] h-[500px] bg-gradient-to-br ${project.color} opacity-20 blur-[100px] rounded-full pointer-events-none`} />

                    {/* Top Content */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                         <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-wider uppercase text-white/80">
                           {project.category}
                         </span>
                         <span className="text-5xl font-bold text-white/5 font-mono">0{project.id}</span>
                      </div>

                      <h3 className="text-4xl font-bold mb-4 leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed text-base">
                        {project.desc}
                      </p>
                    </div>

                    {/* Bottom Tech Stack */}
                    <div className="relative z-10 border-t border-white/10 pt-6">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map(s => (
                          <span key={s} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 border border-white/5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}