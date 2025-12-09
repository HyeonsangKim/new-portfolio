'use client'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import ProjectShowcase from '@/components/ProjectShowecase'
import TechStack from '@/components/TechStack'
import dynamic from 'next/dynamic'

const Orb = dynamic(() => import('@/components/Orb'), { ssr: false })

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen text-white selection:bg-purple-500/30">
      {/* 배경 요소 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40">
           <Orb hoverIntensity={0.4} rotateOnHover={true} />
        </div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      <div className="relative z-10">
        <Hero />
        
        {/* ✅ Hero와 Intro 사이 간격 확장 (h-20 -> h-[15vh]) */}
        <div className="h-[15vh]" /> 
        
        <Intro />
        
        {/* ✅ Intro와 TechStack 사이 간격 확장 */}
        <div className="h-[20vh]" />
        
        <TechStack />
        
        {/* ✅ TechStack과 Project 사이 간격 */}
        <div className="h-[20vh]" />

        <ProjectShowcase />
        
        <footer className="h-40 flex items-center justify-center text-gray-600 text-sm">
          © 2025 Hyeonsang Kim. All rights reserved.
        </footer>
      </div>
    </main>
  )
}