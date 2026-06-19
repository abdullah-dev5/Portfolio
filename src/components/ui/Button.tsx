import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  showOrb?: boolean
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  showOrb = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300'
  const variants = {
    primary:
      'glass-panel border-accent/35 bg-accent/10 text-text hover:border-accent/55 hover:bg-accent/15',
    ghost:
      'glass-panel border-white/10 text-text hover:border-accent/40',
  }

  const inner = (
    <>
      {showOrb && (
        <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#8C6CFF]" />
      )}
      {children}
      {!showOrb && (
        <motion.span
          className="inline-flex"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowRight className="h-4 w-4 text-accent" />
        </motion.span>
      )}
    </>
  )

  const motionProps = {
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        {...motionProps}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...motionProps}
    >
      {inner}
    </motion.button>
  )
}
