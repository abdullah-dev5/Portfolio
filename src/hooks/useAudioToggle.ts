import { useCallback, useRef, useState } from 'react'

export function useAudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggle = useCallback(async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = 0.15
    }

    const audio = audioRef.current

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      if (!audio.src) {
        const ctx = new AudioContext()
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.02
        }
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.loop = true
        const gain = ctx.createGain()
        gain.gain.value = 0.08
        source.connect(gain)
        gain.connect(ctx.destination)
        source.start()
        setIsPlaying(true)
        return
      }
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [isPlaying])

  return { isPlaying, toggle }
}
