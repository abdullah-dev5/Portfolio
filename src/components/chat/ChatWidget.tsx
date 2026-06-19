import { AnimatePresence, motion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { chatFaq } from '../../data/content'
import { LogoMark } from '../ui/Logo'

interface Message {
  role: 'bot' | 'user'
  text: string
  time?: string
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('project')) return chatFaq.responses.projects
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack'))
    return chatFaq.responses.skills
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach'))
    return chatFaq.responses.contact
  return chatFaq.responses.default
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: chatFaq.greeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: text.trim(), time },
      { role: 'bot', text: getResponse(text), time },
    ])
    setInput('')
  }, [])

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open AI Chat"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full glass-panel border-accent/35 flex items-center justify-center shadow-[0_0_20px_rgba(140,108,255,0.25)]"
      >
        <LogoMark size={28} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-card-glossy rounded-2xl overflow-hidden accent-glow"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <LogoMark size={32} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="p-1 text-muted hover:text-text"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-accent/20 text-text border border-accent/30'
                          : 'bg-surface text-muted border border-white/5'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.time && (
                        <p className="text-[10px] text-muted/60 mt-1">{msg.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-2">
                <p className="text-xs text-muted mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {chatFaq.quickQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 p-4 border-t border-white/5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Type your message..."
                  className="flex-1 glass-inner rounded-full px-4 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/40"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  aria-label="Send message"
                  className="h-10 w-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent hover:bg-accent/30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-muted/60 pb-3 px-4">{chatFaq.disclaimer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
