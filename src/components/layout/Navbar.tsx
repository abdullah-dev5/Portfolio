import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { hero, navLinks, sections } from '../../data/content'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

interface NavbarProps {
  activeSection: string
}

export function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav-scrolled' : 'glass-nav-top'
        }`}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Logo size="sm" />

          <div className="hidden md:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                aria-label={`Go to ${s.label}`}
                className="px-1 py-2"
              >
                <span
                  className={`block h-0.5 rounded-full transition-all duration-300 ${
                    activeSection === s.id
                      ? 'w-6 bg-accent'
                      : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-text transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <Button href={hero.ctaHref} variant="ghost" showOrb className="!py-2 !px-4 !text-sm">
              {hero.cta}
            </Button>
          </nav>

          <button
            type="button"
            className="lg:hidden p-2 text-text"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] glass-nav-scrolled lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 pt-16">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-text"
                >
                  {link.label}
                </a>
              ))}
              <Button href={hero.ctaHref} variant="ghost" showOrb onClick={() => setMobileOpen(false)}>
                {hero.cta}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
