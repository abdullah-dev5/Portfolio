import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

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
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const words = text.split(' ')
  let charIndex = 0

  return (
    <Tag className={className} aria-label={text}>
      <span ref={ref} className="inline">
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char) => {
            const i = charIndex++
            return (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
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
      </span>
    </Tag>
  )
}

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
