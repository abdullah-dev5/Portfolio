import { motion } from 'framer-motion'
import { useEyeOrbitOffset, useScrollProgress } from '../../hooks/useScrollProgress'
import { AmbientOrb, GlassEye, MascotHill } from './GlassEye'

interface ScrollSceneMascotProps {
  isPlaying?: boolean
  onToggle?: () => void
}

export function ScrollSceneMascot({ isPlaying, onToggle }: ScrollSceneMascotProps) {
  const progress = useScrollProgress()
  const { x: eyeX, y: eyeY } = useEyeOrbitOffset(progress, 105)

  return (
    <motion.div
      className="fixed z-[8] pointer-events-none right-[4%] md:right-[6%] top-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-[240px] h-[220px] md:w-[280px] md:h-[240px]">
        {/* Fixed anchor: glossy ball + hill (right side, vertically centered) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-0">
          <div className="relative flex flex-col items-center">
            <div className="relative z-0 mb-[-36px] md:mb-[-42px]">
              <AmbientOrb />
            </div>
            <div className="relative z-10 w-full">
              <MascotHill />
            </div>
          </div>
        </div>

        {/* Glass eye — orbits ball on scroll; subtle zoom + cursor eyes */}
        <div
          className="absolute z-20 pointer-events-auto w-[108px] h-[108px] md:w-[128px] md:h-[128px]"
          style={{
            left: `calc(50% + ${eyeX}px)`,
            top: `calc(42% + ${eyeY}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <GlassEye size={128} onClick={onToggle} isPlaying={isPlaying} className="w-full h-full max-md:scale-[0.84] max-md:origin-center" />
        </div>
      </div>
    </motion.div>
  )
}
