import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { projects } from '../../data/content'
import { SectionShell } from '../layout/SectionShell'
import { SplitRevealText } from '../ui/SplitRevealText'

export function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selected, setSelected] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <SectionShell
      id="portfolio"
      watermark="WORK"
      label={projects.label}
      title={projects.title}
      className="relative overflow-hidden"
    >
      <SplitRevealText
        text={projects.intro}
        as="p"
        className="-mt-8 mb-10 max-w-2xl text-muted text-lg"
      />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {projects.items.map((project) => (
            <div
              key={project.title}
              className="flex-[0_0_100%] min-w-0 md:flex-[0_0_85%] lg:flex-[0_0_70%]"
            >
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden accent-glow-hover transition-all duration-300 group"
              >
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
                  >
                    <span className="text-6xl font-bold text-white/20">{project.initials}</span>
                  </div>
                  <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 gap-2 flex-wrap">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-text mb-3">{project.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.liveUrl}
                      className="inline-flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all duration-300"
                    >
                      Visit Live Site <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={project.detailUrl}
                      className="inline-flex items-center gap-2 text-sm text-muted hover:text-text hover:gap-3 transition-all duration-300"
                    >
                      View Project Detail <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous project"
          className="h-10 w-10 rounded-full border border-accent/40 flex items-center justify-center text-accent hover:bg-accent/10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {projects.items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show project ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                selected === i ? 'w-8 bg-accent' : 'w-4 bg-white/20'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next project"
          className="h-10 w-10 rounded-full border border-accent/40 flex items-center justify-center text-accent hover:bg-accent/10 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </SectionShell>
  )
}
