'use client'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'
import FeaturedProjects from '@/components/FeaturedProjects'
import FloatingDock from '@/components/FloatingDock' // ✅ 내비게이션 추가
import dynamic from 'next/dynamic'
import ProjectShowcase from '@/components/ProjectShowecase'

const Orb = dynamic(() => import('@/components/Orb'), { ssr: false })

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* 배경 요소 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40">
           <Orb hoverIntensity={0.4} rotateOnHover={true} />
        </div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      <div className="relative z-10 pb-32"> {/* ✅ Dock을 위해 하단 패딩 추가 */}
        
        {/* id="home"은 맨 위로 */}
        <div id="home">
            <Hero />
        </div>
        
        <div className="h-[15vh]" /> 
        
        <Intro />
        
        <div className="h-[20vh]" />
        
        {/* ✅ 각 컴포넌트 내부나 래퍼 div에 id 부여 */}
        <section id="skills">
            <TechStack />
        </section>
        
        <div className="h-[20vh]" />
        
     
        
        <section id="career">
            <ProjectShowcase />
        </section>
        
        <div className="h-[20vh]" />

        {/* FeaturedProjects 내부에 id="projects"가 있음 */}
        <FeaturedProjects />
        
        <div className="h-[20vh]" />
        
        <section id="contact">
            <Contact />
        </section>
        
        <footer className="h-40 flex items-center justify-center text-gray-600 text-sm border-t border-white/5">
          <p>© 2025 Hyeonsang Kim. Built with Next.js 15 & React.</p>
        </footer>
      </div>
      
      {/* ✅ 플로팅 내비게이션 (가장 마지막에 배치하여 최상위 z-index 유지) */}
      <FloatingDock />
    </main>
  )
}