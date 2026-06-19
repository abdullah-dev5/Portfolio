import { motion } from 'framer-motion'
import { contact } from '../../data/content'
import { useTypewriterDialogue } from '../../hooks/useTypewriterDialogue'

interface ContactDialogueProps {
  className?: string
}

export function ContactDialogue({ className = '' }: ContactDialogueProps) {
  const { text } = useTypewriterDialogue(contact.nudges, {
    typeMs: 45,
    deleteMs: 28,
    pauseAfterTypeMs: 2400,
    pauseBeforeNextMs: 400,
  })

  return (
    <div className={`flex justify-center w-full ${className}`}>
      <motion.div
        layout
        transition={{ layout: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
        className="inline-block max-w-[min(100%,320px)] md:max-w-[360px] glass-panel px-4 py-3 rounded-2xl text-left"
      >
        <p className="font-mono text-xs md:text-sm text-text/95 leading-relaxed break-words">
          {text}
          <span className="dialogue-cursor inline-block w-[2px] h-[0.95em] bg-accent ml-0.5 align-middle" aria-hidden />
        </p>
      </motion.div>
    </div>
  )
}
