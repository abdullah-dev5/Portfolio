import { motion } from 'framer-motion'
import { trust } from '../../data/content'
import { SplitRevealText } from '../ui/SplitRevealText'

function Gauge({ value, label }: { value: number; label: string }) {
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(140,108,255,0.15)" strokeWidth="4" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#8C6CFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-text">
          {value}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted">{label}</span>
    </div>
  )
}

export function TrustSection() {
  const { metrics } = trust

  return (
    <section id="trust" className="snap-section relative flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <p className="section-label mb-6 text-muted">{trust.label}</p>
        <h2 className="font-mono text-2xl md:text-3xl lg:text-4xl leading-snug text-text mb-4 font-bold">
          <SplitRevealText text={trust.headline} as="span" className="block" />
          <SplitRevealText text={trust.subheadline} as="span" className="block text-muted mt-2" delay={0.2} />
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 text-left accent-glow-hover transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-wider text-muted">{metrics.uptime.label}</span>
              <span className="font-mono text-lg text-text">{metrics.uptime.value}</span>
            </div>
            <div className="relative h-16 rounded-lg bg-surface overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_3px,rgba(140,108,255,0.05)_3px,rgba(140,108,255,0.05)_6px)]" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-4 right-4 h-0.5 bg-accent origin-left shadow-[0_0_12px_#8C6CFF]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 accent-glow-hover transition-all duration-300"
          >
            <span className="text-xs uppercase tracking-wider text-muted block mb-4 text-left">
              {metrics.lighthouse.label}
            </span>
            <div className="flex justify-around">
              {metrics.lighthouse.scores.map((s) => (
                <Gauge key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 flex items-center justify-center accent-glow-hover transition-all duration-300"
          >
            <div className="relative">
              <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(140,108,255,0.15)" strokeWidth="3" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#8C6CFF"
                  strokeWidth="3"
                  strokeDasharray="264"
                  initial={{ strokeDashoffset: 264 }}
                  whileInView={{ strokeDashoffset: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-bold text-text">{metrics.buildTime.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted mt-1">
                  {metrics.buildTime.label}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 text-left accent-glow-hover transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-wider text-muted">{metrics.coverage.label}</span>
              <span className="font-mono text-lg text-text">{metrics.coverage.value}</span>
            </div>
            <div className="relative h-28 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border border-accent/20 relative overflow-hidden">
                <div className="radar-sweep absolute inset-0 origin-bottom bg-gradient-to-t from-accent/30 to-transparent" />
                <div className="absolute inset-3 rounded-full border border-accent/30" />
                <div className="absolute inset-6 rounded-full bg-accent/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
