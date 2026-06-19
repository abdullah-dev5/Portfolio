import { useCallback, useEffect, useRef, useState } from 'react'

interface CursorOffset {
  x: number
  y: number
}

export function useCursorTracking(strength = 0.08, maxOffset = 12) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState<CursorOffset>({ x: 0, y: 0 })

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      const clamp = (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v))
      setOffset({ x: clamp(dx), y: clamp(dy) })
    },
    [strength, maxOffset],
  )

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [onMove])

  return { ref, offset }
}

export function useBlink(intervalMs = 4200) {
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const blink = () => {
      setBlinking(true)
      timeout = setTimeout(() => setBlinking(false), 150)
    }
    const id = setInterval(blink, intervalMs + Math.random() * 2000)
    blink()
    return () => {
      clearInterval(id)
      clearTimeout(timeout)
    }
  }, [intervalMs])

  return blinking
}
