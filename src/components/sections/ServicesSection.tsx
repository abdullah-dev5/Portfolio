import { motion } from 'framer-motion'
import { Code2, Rocket, Sparkles } from 'lucide-react'
import { services } from '../../data/content'
import { SectionShell } from '../layout/SectionShell'
import { SplitRevealText } from '../ui/SplitRevealText'

const iconMap = {
  sparkles: Sparkles,
  code: Code2,
  rocket: Rocket,
} as const

export function ServicesSection() {
  return (
    <SectionShell
      id="services"
      watermark="BUILD"
      watermarkAlign="right"
      label={services.label}
      title={services.title}
      className="relative"
    >
      <SplitRevealText
        text={services.intro}
        as="p"
        className="-mt-4 mb-12 max-w-xl body-lg relative z-10"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative z-10"
      >
        {services.items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          return (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card-glossy rounded-2xl p-8 md:p-10 accent-glow-hover group min-h-[220px] flex flex-col"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/40 transition-colors duration-300">
                <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-text mb-3 font-[family-name:var(--font-display)]">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}
