import { motion } from 'framer-motion'
import { useEyeOrbitOffset, useScrollProgress } from '../../hooks/useScrollProgress'
import { AmbientOrb, GlassEye, MascotHill } from './GlassEye'

interface ScrollSceneMascotProps {
  isPlaying?: boolean
  onToggle?: () => void
}

export function ScrollSceneMascot({ isPlaying, onToggle }: ScrollSceneMascotProps) {
  const progress = useScrollProgress()
  const { x: eyeX, y: eyeY } = useEyeOrbitOffset(progress, 95)

  return (
    <motion.div
      className="fixed z-[8] pointer-events-none right-[4%] md:right-[6%] top-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Extra height gives the shiny orb room to bounce upward */}
      <div className="relative w-[240px] h-[248px] md:w-[280px] md:h-[272px]">
        {/* Shiny orb — sits behind the hill, ~half hidden */}
        <div className="absolute bottom-[52px] md:bottom-[58px] left-1/2 -translate-x-1/2 z-0">
          <AmbientOrb />
        </div>

        {/* Glass eye — smaller than before, still larger than orb; bottom half behind hill */}
        <div
          className="absolute z-[5] pointer-events-auto w-[94px] h-[94px] md:w-[104px] md:h-[104px]"
          style={{
            left: `calc(50% + ${eyeX}px)`,
            top: `calc(34% + ${eyeY}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <GlassEye
            size={104}
            onClick={onToggle}
            isPlaying={isPlaying}
            className="w-full h-full max-md:scale-[0.9] max-md:origin-center"
          />
        </div>

        {/* Hill mound — foreground, covers lower half of both balls */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full z-10">
          <MascotHill />
        </div>
      </div>
    </motion.div>
  )
}
