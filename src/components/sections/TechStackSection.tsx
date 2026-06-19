import { motion } from 'framer-motion'
import { techStack } from '../../data/content'
import { SectionShell } from '../layout/SectionShell'
import { TechIcon, type TechIconId } from '../visuals/TechIcons'

const ORBIT = [
  { x: 50, y: 6 },
  { x: 82, y: 18 },
  { x: 94, y: 50 },
  { x: 82, y: 82 },
  { x: 50, y: 94 },
  { x: 18, y: 82 },
  { x: 6, y: 50 },
  { x: 18, y: 18 },
]

function curvedPath(cx: number, cy: number, tx: number, ty: number) {
  const mx = (cx + tx) / 2 + (ty - cy) * 0.15
  const my = (cy + ty) / 2 - (tx - cx) * 0.15
  return `M ${cx} ${cy} Q ${mx} ${my} ${tx} ${ty}`
}

export function TechStackSection() {
  const tools = techStack.tools.slice(0, 8)
  const cx = 50
  const cy = 50

  return (
    <SectionShell
      id="tech"
      watermark="TECH"
      label={techStack.label}
      title={techStack.title}
      className="relative"
    >
      <div className="relative mx-auto h-[520px] md:h-[580px] max-w-4xl hidden md:block">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          {ORBIT.map((pos, i) => {
            if (i >= tools.length) return null
            return (
              <motion.path
                key={tools[i].name}
                d={curvedPath(cx, cy, pos.x, pos.y)}
                className="curve-line"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            )
          })}
        </svg>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="tech-tile h-24 w-24 md:h-28 md:w-28 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(140,108,255,0.4)]">
            <TechIcon id={techStack.center.icon as TechIconId} size={48} />
          </div>
          <p className="text-center text-sm text-muted mt-3 font-mono">{techStack.center.name}</p>
        </motion.div>

        {tools.map((tool, i) => {
          const pos = ORBIT[i]
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              animate={{ y: [0, -6, 0] }}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                animationDuration: `${3.5 + i * 0.4}s`,
              }}
              className="z-10"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="tech-tile h-[72px] w-[72px] md:h-20 md:w-20 rounded-xl flex items-center justify-center rotate-[-12deg] hover:rotate-0 transition-transform duration-300 cursor-default"
                title={tool.name}
              >
                <TechIcon id={tool.icon as TechIconId} size={36} />
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:hidden">
        {[techStack.center, ...techStack.tools].map((tool) => (
          <div key={tool.name} className="tech-tile rounded-xl p-4 flex flex-col items-center gap-2">
            <TechIcon id={tool.icon as TechIconId} size={32} />
            <span className="text-[10px] text-muted text-center font-mono">{tool.name}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
