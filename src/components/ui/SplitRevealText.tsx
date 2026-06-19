import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SplitRevealTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  splitSpaces?: boolean
}

export function SplitRevealText({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  splitSpaces = true,
}: SplitRevealTextProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const words = text.split(' ')
  let charIndex = 0

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char) => {
            const i = charIndex++
            return (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.25,
                  delay: delay + i * 0.02,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            )
          })}
          {splitSpaces && wi < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </Tag>
  )
}

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
