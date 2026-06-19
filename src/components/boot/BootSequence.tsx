import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LogoMark } from '../ui/Logo'

interface BootSequenceProps {
  onComplete: () => void
}

const messages = [
  'Initializing transmission...',
  "Hey there... Welcome, Abdullah 👋",
  "Scroll down and I'll guide you.",
]

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2000)
    const t3 = setTimeout(() => setPhase(3), 3200)
    const t4 = setTimeout(onComplete, 4500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  useEffect(() => {
    if (phase < 2) return
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <LogoMark size={72} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: phase >= 1 ? 1 : 0, letterSpacing: '0.35em' }}
          transition={{ duration: 0.8 }}
          className="text-sm uppercase text-muted mb-6"
        >
          W e l c o m e
        </motion.p>

        <AnimatePresence mode="wait">
          {phase >= 2 && (
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-base md:text-lg text-text text-center px-6 max-w-md"
            >
              {messages[messageIndex]}
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 3 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            className="mt-10 h-0.5 bg-accent/60 rounded-full"
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
