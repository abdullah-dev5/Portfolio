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
        className="dialogue-bubble max-w-[min(100%,340px)] md:max-w-[380px]"
      >
        <div className="dialogue-bubble__header">
          <span className="dialogue-bubble__dot" aria-hidden />
          <span className="dialogue-bubble__label">Incoming ping</span>
        </div>
        <p className="dialogue-bubble__text">
          {text}
          <span className="dialogue-cursor inline-block w-[2px] h-[0.95em] bg-accent-bright ml-0.5 align-middle" aria-hidden />
        </p>
      </motion.div>
    </div>
  )
}
