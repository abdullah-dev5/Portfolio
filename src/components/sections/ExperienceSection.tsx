import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { experience } from '../../data/content'
import { SectionShell } from '../layout/SectionShell'
import { SplitRevealText } from '../ui/SplitRevealText'

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof experience.work)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[auto_1fr] gap-4 md:gap-8"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.35, delay: index * 0.08 + 0.1 }}
          className="relative z-10 h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_16px_rgba(140,108,255,0.6)] ring-4 ring-accent/20"
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 + 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-px flex-1 min-h-[48px] origin-top bg-gradient-to-b from-accent/60 to-accent/10 mt-2"
          />
        )}
      </div>

      <article className="glass-card-glossy rounded-2xl p-6 md:p-7 accent-glow-hover mb-8 md:mb-10 -mt-1">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-text font-[family-name:var(--font-display)]">
              {item.role}
            </h3>
            <p className="text-sm text-accent mt-0.5">{item.company}</p>
          </div>
          <span className="font-mono text-[11px] md:text-xs text-muted whitespace-nowrap px-2.5 py-1 rounded-full glass-inner border border-white/10">
            {item.period}
          </span>
        </div>
        {item.location && (
          <p className="text-xs text-muted/80 mb-4">{item.location}</p>
        )}
        <ul className="space-y-2">
          {item.highlights.map((point) => (
            <li
              key={point}
              className="text-sm text-muted leading-relaxed pl-3 border-l border-accent/30"
            >
              {point}
            </li>
          ))}
        </ul>
      </article>
    </motion.div>
  )
}

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      watermark="CAREER"
      label={experience.label}
      title={experience.title}
      className="relative"
    >
      <SplitRevealText
        text={experience.intro}
        as="p"
        className="-mt-4 mb-12 max-w-2xl body-lg relative z-10"
      />

      <div className="relative z-10 max-w-3xl">
        {experience.work.map((item, index) => (
          <TimelineItem
            key={`${item.company}-${item.period}`}
            item={item}
            index={index}
            isLast={index === experience.work.length - 1}
          />
        ))}
      </div>
    </SectionShell>
  )
}
