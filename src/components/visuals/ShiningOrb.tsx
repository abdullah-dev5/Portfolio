import { useId } from 'react'

interface ShiningOrbProps {
  size?: number
  className?: string
}

/** Luminous glass orb — dark core, bright rim, outer bloom (reference-style, indigo). */
export function ShiningOrb({ size = 88, className = '' }: ShiningOrbProps) {
  const uid = useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${uid}-bloom`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8C6CFF" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#8C6CFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#8C6CFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-body`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#12082E" />
          <stop offset="28%" stopColor="#2A1578" />
          <stop offset="58%" stopColor="#6B4FCC" />
          <stop offset="78%" stopColor="#8C6CFF" />
          <stop offset="90%" stopColor="#B49AFF" />
          <stop offset="96%" stopColor="#E8DEFF" />
          <stop offset="100%" stopColor="#F5F0FF" />
        </radialGradient>
        <radialGradient id={`${uid}-innerGlow`} cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="#8C6CFF" stopOpacity="0" />
          <stop offset="86%" stopColor="#C4AEFF" stopOpacity="0.85" />
          <stop offset="94%" stopColor="#F0EBFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-bloom)`} />
      <circle cx="50" cy="50" r="42" fill={`url(#${uid}-body)`} filter={`url(#${uid}-glow)`} />
      <circle cx="50" cy="50" r="42" fill={`url(#${uid}-innerGlow)`} />
    </svg>
  )
}
