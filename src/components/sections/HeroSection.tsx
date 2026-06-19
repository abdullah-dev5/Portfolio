import { motion } from 'framer-motion'
import { hero } from '../../data/content'
import { Button } from '../ui/Button'
import { SplitRevealText } from '../ui/SplitRevealText'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="snap-section relative flex items-center min-h-screen px-6 md:px-12 lg:px-20 pt-28 pb-8 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl min-h-[calc(100vh-8rem)] flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl lg:max-w-2xl"
        >
          <h1 className="display-xl">
            <SplitRevealText text={hero.line1} as="span" className="block text-text/60" />
            <SplitRevealText
              text={hero.line2}
              as="span"
              className="block text-accent mt-2 md:mt-4"
              delay={0.35}
            />
          </h1>
          <SplitRevealText
            text={hero.sub}
            as="p"
            className="body-lg mt-6 md:mt-8 max-w-xl text-text/80"
            delay={0.7}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-12"
          >
            <Button href={hero.ctaHref}>{hero.cta}</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
