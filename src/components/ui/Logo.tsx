import { motion } from 'framer-motion'

interface LogoProps {
  showWordmark?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { mark: 28, text: 'text-sm' },
  md: { mark: 32, text: 'text-base' },
  lg: { mark: 48, text: 'text-xl' },
}

export function Logo({ showWordmark = true, size = 'md', className = '' }: LogoProps) {
  const s = sizes[size]

  return (
    <a href="#hero" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <motion.svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 32 32"
        fill="none"
        className="shrink-0 transition-[filter] duration-300 group-hover:drop-shadow-[0_0_12px_rgba(140,108,255,0.6)]"
        aria-hidden
      >
        <path
          d="M16 4L28 16L16 28L4 16L16 4Z"
          stroke="#8C6CFF"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M11 22V10L16 16L21 10V22"
          stroke="#8C6CFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.svg>
      {showWordmark && (
        <span className={`font-semibold tracking-tight ${s.text}`}>
          <span className="text-text">Muhammad</span>
          <span className="text-accent">Abdullah</span>
        </span>
      )}
    </a>
  )
}

export function LogoMark({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 4L28 16L16 28L4 16L16 4Z"
        stroke="#8C6CFF"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M11 22V10L16 16L21 10V22"
        stroke="#8C6CFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
