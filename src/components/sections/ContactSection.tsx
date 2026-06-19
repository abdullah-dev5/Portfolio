import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { contact } from '../../data/content'
import { Button } from '../ui/Button'
import { SplitRevealText } from '../ui/SplitRevealText'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
} as const

export function ContactSection() {
  const [nudgeIndex, setNudgeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNudgeIndex((i) => (i + 1) % contact.nudges.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="contact"
      className="snap-section flex flex-col items-center justify-center px-6 md:px-12 py-24 text-center min-h-[80vh]"
    >
      <div className="max-w-2xl mx-auto">
        <SplitRevealText
          text={contact.title}
          as="h2"
          className="display-lg mb-8"
        />
        <SplitRevealText
          text={contact.sub}
          as="p"
          className="text-muted text-lg leading-relaxed mb-8"
          delay={0.2}
        />

        <motion.p
          key={nudgeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-accent/80 mb-6 min-h-[1.5rem]"
        >
          {contact.nudges[nudgeIndex]}
        </motion.p>

        <Button href={contact.ctaHref} className="mb-12">
          {contact.cta}
        </Button>

        <div className="flex justify-center gap-6 mb-12">
          {contact.social.map((s) => {
            const Icon = socialIcons[s.icon as keyof typeof socialIcons]
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>

        <p className="text-xs text-muted">{contact.copyright}</p>
      </div>
    </section>
  )
}
