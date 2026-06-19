import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/**
 * Glass eye orbits the fixed indigo ball:
 * progress 0 → top-right of ball, progress 1 → bottom-left (arc around ball)
 */
export function useEyeOrbitOffset(progress: number, radius = 100) {
  const angleStart = -Math.PI / 4
  const angleEnd = (Math.PI * 3) / 4
  const angle = lerp(angleStart, angleEnd, progress)

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}
