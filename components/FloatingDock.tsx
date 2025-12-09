'use client'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FiHome, FiCpu, FiBriefcase, FiLayers, FiMail } from 'react-icons/fi'

const links = [
  { id: 'home', icon: <FiHome />, label: 'Home' },
  { id: 'skills', icon: <FiCpu />, label: 'Skills' },
  { id: 'career', icon: <FiBriefcase />, label: 'Career' },
  { id: 'projects', icon: <FiLayers />, label: 'Projects' },
  { id: 'contact', icon: <FiMail />, label: 'Contact' },
]

export default function FloatingDock() {
  const mouseY = useMotionValue(Infinity)
  const [activeId, setActiveId] = useState('home')

  // ✅ Scroll Spy: 현재 보고 있는 섹션 감지
  useEffect(() => {
    // ✅ 수정된 옵션: 'threshold' 대신 'rootMargin' 사용
    // 화면의 상하 45%를 무시하고, 정중앙 10% 영역(Center Line)에 들어온 요소만 감지합니다.
    // 이렇게 하면 섹션이 아무리 길어도, 짧아도, 화면 가운데에 있으면 무조건 활성화됩니다.
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', 
      threshold: 0, 
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, observerOptions)

    // ... (이하 코드는 동일)
    links.forEach((link) => {
      const element = document.getElementById(link.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    // ✅ 버그 수정 1: z-[999]로 최상단 보장
    // ✅ 버그 수정 2: pointer-events-none으로 컨테이너가 클릭 방해하지 않도록 설정
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-5 items-center pointer-events-none"
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
    >
      {links.map((link) => (
        <DockIcon 
          key={link.id} 
          mouseY={mouseY} 
          isActive={activeId === link.id} // 활성화 상태 전달
          {...link} 
        />
      ))}
    </div>
  )
}

function DockIcon({ mouseY, id, icon, label, isActive }: { mouseY: any, id: string, icon: any, label: string, isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 }
    return val - bounds.y - bounds.height / 2
  })

  // 인터랙션 매핑
  const sizeSync = useTransform(distance, [-150, 0, 150], [40, 65, 40])
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 })
  
  // 아이콘 크기
  const iconScaleSync = useTransform(distance, [-150, 0, 150], [1, 1.3, 1])
  const iconScale = useSpring(iconScaleSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const scrollToSection = () => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
        if(id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative flex items-center justify-center pointer-events-auto"> {/* 개별 아이콘은 pointer-events-auto */}
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onClick={scrollToSection}
        // ✅ 애니메이션: 활성화 시 테두리 색상과 그림자 변경
        animate={{
          borderColor: isActive ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.1)", // 보라색 vs 투명
          backgroundColor: isActive ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.3)",
          boxShadow: isActive 
            ? "0 0 15px rgba(168, 85, 247, 0.4)" // 활성화 시 글로우 효과
            : "0 0 0px rgba(0,0,0,0)"
        }}
        transition={{ duration: 0.3 }}
        className={`
          rounded-full border flex items-center justify-center text-white cursor-pointer relative group backdrop-blur-md transition-colors
        `}
      >
        <motion.span style={{ scale: iconScale }} className="relative z-10">
          {icon}
        </motion.span>
        
        {/* Tooltip (왼쪽) */}
        <span className="absolute right-full mr-4 bg-black/80 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
          {label}
        </span>
      </motion.div>

      {/* ✅ 트렌디한 효과: 활성화 표시 점 (Active Indicator) */}
      {/* 아이콘 우측에 작은 점을 띄워 현재 위치를 세련되게 표시 */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: -10 }}
            className="absolute left-full ml-3 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,1)]"
          />
        )}
      </AnimatePresence>
    </div>
  )
}