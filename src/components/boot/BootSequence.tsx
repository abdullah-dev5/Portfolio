import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { LogoMark } from '../ui/Logo'
import { ShiningOrb } from '../visuals/ShiningOrb'

interface BootSequenceProps {
  onComplete: () => void
}

const messages = [
  'Initializing transmission...',
  'Hey there... Welcome, Muhammad Abdullah 👋',
  "Scroll down and I'll guide you.",
]

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const completedRef = useRef(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => {
        if (completedRef.current) return
        completedRef.current = true
        onComplete()
      }, 5200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  useEffect(() => {
    const start = performance.now()
    const duration = 5200
    let frame = 0

    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / duration) * 100)
      setProgress(pct)
      if (pct < 100) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (phase < 2) return
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length)
    }, 1100)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <motion.div
      key="boot-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="boot-radar w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full border border-accent/20" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[140px] h-[140px] md:w-[168px] md:h-[168px] rounded-full border border-accent/30 animate-pulse" />
        </div>
        <div className="relative flex items-center justify-center w-[200px] h-[200px] md:w-[240px] md:h-[240px]">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
          >
            <ShiningOrb size={96} className="md:w-[112px] md:h-[112px]" />
          </motion.div>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <LogoMark size={64} />
          </motion.div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={{ opacity: phase >= 1 ? 1 : 0, letterSpacing: '0.32em' }}
        transition={{ duration: 0.7 }}
        className="text-xs md:text-sm uppercase text-muted mb-5 font-mono"
      >
        W e l c o m e
      </motion.p>

      <div className="h-8 mb-8 px-6">
        {phase >= 2 && (
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm md:text-base text-text text-center max-w-md"
          >
            {messages[messageIndex]}
          </motion.p>
        )}
      </div>

      <div className="w-48 md:w-56 h-0.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent/60 via-accent to-accent-bright rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-[10px] font-mono text-muted/70 tracking-widest uppercase">
        {Math.round(progress)}%
      </p>
    </motion.div>
  )
}
