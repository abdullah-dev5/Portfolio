import { useEffect, useState } from 'react'

interface Options {
  typeMs?: number
  deleteMs?: number
  pauseAfterTypeMs?: number
  pauseBeforeNextMs?: number
}

export function useTypewriterDialogue(sentences: string[], options: Options = {}) {
  const {
    typeMs = 48,
    deleteMs = 32,
    pauseAfterTypeMs = 2200,
    pauseBeforeNextMs = 500,
  } = options

  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'hold' | 'deleting'>('typing')

  useEffect(() => {
    const sentence = sentences[sentenceIndex] ?? ''
    let timer: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (text.length < sentence.length) {
        timer = setTimeout(() => setText(sentence.slice(0, text.length + 1)), typeMs)
      } else {
        timer = setTimeout(() => setPhase('hold'), pauseAfterTypeMs)
      }
    } else if (phase === 'hold') {
      setPhase('deleting')
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deleteMs)
      } else {
        timer = setTimeout(() => {
          setSentenceIndex((i) => (i + 1) % sentences.length)
          setPhase('typing')
        }, pauseBeforeNextMs)
      }
    }

    return () => clearTimeout(timer)
  }, [text, phase, sentenceIndex, sentences, typeMs, deleteMs, pauseAfterTypeMs, pauseBeforeNextMs])

  return { text, sentenceIndex }
}
