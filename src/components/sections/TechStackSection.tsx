import { motion } from 'framer-motion'
import { techStack } from '../../data/content'
import { SectionShell } from '../layout/SectionShell'
import { SplitRevealText } from '../ui/SplitRevealText'
import { TechAbbr, TechIcon, type TechIconId } from '../visuals/TechIcons'

function SkillPill({ name, icon }: { name: string; icon?: TechIconId }) {
  return (
    <motion.span
      whileHover={{ scale: 1.04, borderColor: 'rgba(140,108,255,0.5)' }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-inner border-accent/20 text-xs md:text-sm text-text/90"
    >
      {icon ? <TechIcon id={icon} size={18} /> : <TechAbbr name={name} size={18} />}
      <span className="whitespace-nowrap">{name}</span>
    </motion.span>
  )
}

export function TechStackSection() {
  return (
    <SectionShell
      id="tech"
      watermark="TECH"
      label={techStack.label}
      title={techStack.title}
      className="relative"
    >
      <SplitRevealText text={techStack.intro} as="p" className="-mt-4 mb-8 max-w-2xl body-lg" />

      {/* GitHub-powered highlight strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel rounded-2xl px-5 py-4 mb-8 flex flex-wrap items-center gap-x-6 gap-y-2"
      >
        <span className="font-mono text-xs text-accent uppercase tracking-widest">Stack profile</span>
        <span className="text-sm text-text">
          <span className="text-accent font-semibold">{techStack.highlight.primary}</span>-first
        </span>
        <span className="hidden sm:inline text-white/20">|</span>
        <span className="text-sm text-muted">{techStack.highlight.repos} GitHub repos</span>
        <span className="hidden sm:inline text-white/20">|</span>
        <span className="text-sm text-muted">{techStack.highlight.focus}</span>
      </motion.div>

      {/* Bento grid — categorized stacks */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        {techStack.categories.map((category) => (
          <motion.div
            key={category.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`glass-card-glossy rounded-2xl p-6 md:p-7 accent-glow-hover flex flex-col min-h-[180px] ${category.colSpan ?? ''}`}
          >
            <div className="mb-4">
              <h3 className="text-base md:text-lg font-semibold text-text font-[family-name:var(--font-display)]">
                {category.title}
              </h3>
              <p className="text-xs md:text-sm text-muted mt-1">{category.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {category.skills.map((skill) => (
                <SkillPill
                  key={skill.name}
                  name={skill.name}
                  icon={'icon' in skill ? skill.icon : undefined}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}
