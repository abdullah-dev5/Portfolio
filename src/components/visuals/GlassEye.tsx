import { motion } from 'framer-motion'
import { useId } from 'react'
import { useBlink, useCursorTracking } from '../../hooks/useCursorTracking'

interface GlassEyeProps {
  size?: number
  onClick?: () => void
  isPlaying?: boolean
  className?: string
}

export function GlassEye({ size = 112, onClick, isPlaying, className = '' }: GlassEyeProps) {
  const uid = useId().replace(/:/g, '')
  const { ref, offset } = useCursorTracking(0.06, 12)
  const blinking = useBlink(4500)

  const pupilX = offset.x * 0.4
  const pupilY = offset.y * 0.4

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ scale: [1, 1.045, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={isPlaying ? 'Pause ambient audio' : 'Play ambient audio'}
        className="relative w-full h-full focus:outline-none cursor-pointer"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <radialGradient id={`${uid}-glassBody`} cx="38%" cy="32%" r="62%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
              <stop offset="35%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="70%" stopColor="rgba(20,18,30,0.35)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
            </radialGradient>
            <radialGradient id={`${uid}-topShine`} cx="32%" cy="26%" r="28%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <radialGradient id={`${uid}-botShine`} cx="72%" cy="78%" r="22%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <linearGradient id={`${uid}-eyeGlow`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8DEFF" />
              <stop offset="45%" stopColor="#8C6CFF" />
              <stop offset="100%" stopColor="#6B4FCC" />
            </linearGradient>
            <filter id={`${uid}-eyeGlowF`}>
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`${uid}-bubbleShadow`}>
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#8C6CFF" floodOpacity="0.25" />
            </filter>
          </defs>

          <circle
            cx="60"
            cy="60"
            r="54"
            fill={`url(#${uid}-glassBody)`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            filter={`url(#${uid}-bubbleShadow)`}
          />
          <ellipse cx="38" cy="34" rx="22" ry="14" fill={`url(#${uid}-topShine)`} opacity="0.9" />
          <ellipse cx="82" cy="88" rx="16" ry="10" fill={`url(#${uid}-botShine)`} opacity="0.5" />
          <path
            d="M22 72 Q60 92 98 72"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
          />

          <motion.g
            animate={{ scaleY: blinking ? 0.06 : 1 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            style={{ transformOrigin: '60px 58px' }}
          >
            <g transform={`translate(${pupilX} ${pupilY})`} style={{ transition: 'transform 0.1s ease-out' }}>
              <rect
                x="46"
                y="50"
                width="7"
                height="19"
                rx="3.5"
                fill={`url(#${uid}-eyeGlow)`}
                filter={`url(#${uid}-eyeGlowF)`}
              />
              <rect
                x="67"
                y="50"
                width="7"
                height="19"
                rx="3.5"
                fill={`url(#${uid}-eyeGlow)`}
                filter={`url(#${uid}-eyeGlowF)`}
              />
            </g>
          </motion.g>
        </svg>
      </button>
    </motion.div>
  )
}

/** Glossy indigo ball — vertical bob only, peeks from behind hill */
export function AmbientOrb() {
  const uid = useId().replace(/:/g, '')

  return (
    <motion.div
      animate={{ y: [12, -10, 12] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-[76px] h-[76px] md:w-[88px] md:h-[88px] mx-auto"
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id={`${uid}-orbCore`} cx="38%" cy="36%" r="58%">
            <stop offset="0%" stopColor="#D4C4FF" />
            <stop offset="35%" stopColor="#A98AFF" />
            <stop offset="65%" stopColor="#8C6CFF" />
            <stop offset="100%" stopColor="#4A32A8" />
          </radialGradient>
          <radialGradient id={`${uid}-orbSpec`} cx="32%" cy="28%" r="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id={`${uid}-orbGlow`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="44" fill={`url(#${uid}-orbCore)`} filter={`url(#${uid}-orbGlow)`} />
        <ellipse cx="34" cy="30" rx="16" ry="11" fill={`url(#${uid}-orbSpec)`} />
        <ellipse cx="62" cy="62" rx="8" ry="5" fill="rgba(255,255,255,0.08)" />
      </svg>
    </motion.div>
  )
}

export function MascotHill() {
  const uid = useId().replace(/:/g, '')

  return (
    <svg viewBox="0 0 240 85" className="w-[220px] md:w-[260px] h-[68px] md:h-[78px] mx-auto" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-hillFill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16161f" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <filter id={`${uid}-ridgeGlow`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M0,85 L0,52 Q60,6 120,18 Q180,30 240,42 L240,85 Z" fill={`url(#${uid}-hillFill)`} />
      <path
        d="M0,52 Q60,6 120,18 Q180,30 240,42"
        fill="none"
        stroke="#8C6CFF"
        strokeWidth="1.5"
        opacity="0.8"
        filter={`url(#${uid}-ridgeGlow)`}
      />
      <path
        d="M0,52 Q60,6 120,18 Q180,30 240,42"
        fill="none"
        stroke="rgba(180,154,255,0.45)"
        strokeWidth="2.5"
        opacity="0.35"
        filter={`url(#${uid}-ridgeGlow)`}
      />
    </svg>
  )
}
