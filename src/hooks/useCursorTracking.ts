import { useCallback, useEffect, useRef, useState } from 'react'

interface CursorOffset {
  x: number
  y: number
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

interface CursorTrackingOptions {
  strength?: number
  maxOffset?: number
  smooth?: number
}

const IDLE_THRESHOLD = 0.08

/** Smooth cursor-relative offset — RAF runs only while the pointer is moving. */
export function useCursorTracking({
  strength = 0.14,
  maxOffset = 20,
  smooth = 0.18,
}: CursorTrackingOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const target = useRef<CursorOffset>({ x: 0, y: 0 })
  const current = useRef<CursorOffset>({ x: 0, y: 0 })
  const frame = useRef(0)
  const [offset, setOffset] = useState<CursorOffset>({ x: 0, y: 0 })

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const radius = Math.max(rect.width, rect.height) * 0.65
      const dist = Math.hypot(dx, dy)
      const influence = clamp(dist / radius, 0, 1)
      const angle = Math.atan2(dy, dx)

      target.current = {
        x: clamp(Math.cos(angle) * influence * maxOffset * strength * 8, -maxOffset, maxOffset),
        y: clamp(Math.sin(angle) * influence * maxOffset * strength * 8, -maxOffset, maxOffset),
      }

      if (!frame.current) {
        const tick = () => {
          const next = {
            x: current.current.x + (target.current.x - current.current.x) * smooth,
            y: current.current.y + (target.current.y - current.current.y) * smooth,
          }
          current.current = next
          setOffset(next)

          const idle =
            Math.abs(target.current.x - next.x) < IDLE_THRESHOLD &&
            Math.abs(target.current.y - next.y) < IDLE_THRESHOLD

          if (idle) {
            frame.current = 0
            return
          }

          frame.current = requestAnimationFrame(tick)
        }

        frame.current = requestAnimationFrame(tick)
      }
    },
    [maxOffset, smooth, strength],
  )

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
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
