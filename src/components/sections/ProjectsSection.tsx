import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { projects } from '../../data/content'
import { SectionShell } from '../layout/SectionShell'
import { SplitRevealText } from '../ui/SplitRevealText'

const slideClass = 'flex-[0_0_88%] sm:flex-[0_0_58%] lg:flex-[0_0_44%] min-w-0 pl-1'
const endSpacerClass = 'flex-[0_0_12%] sm:flex-[0_0_42%] lg:flex-[0_0_56%] min-w-0 shrink-0'

export function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: false,
    slidesToScroll: 1,
  })
  const [selected, setSelected] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap())
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
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
        className="-mt-8 mb-10 max-w-2xl body-lg"
      />

      <div className="overflow-hidden relative z-10 cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-4 md:gap-5">
          {projects.items.map((project) => (
            <div key={project.title} className={slideClass}>
              <article className="glass-card-glossy rounded-2xl overflow-hidden accent-glow-hover transition-all duration-300 group h-full">
                <div className="relative h-44 md:h-56 overflow-hidden border-b border-white/5 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-75 transition-transform duration-500 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                  <span className="relative z-10 text-4xl md:text-5xl font-bold text-white/25">
                    {project.initials}
                  </span>
                  <div className="absolute inset-0 z-20 bg-black/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 gap-2 flex-wrap">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 text-xs rounded-full glass-inner text-accent border-accent/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 md:p-6 bg-white/[0.02]">
                  <h3 className="text-base md:text-lg font-bold text-text mb-2">{project.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
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
              </article>
            </div>
          ))}
          <div className={endSpacerClass} aria-hidden />
        </div>
      </div>

      <div className="relative z-10 mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-7xl mx-auto px-1">
        <div className="flex-1 hidden sm:block" />

        <div className="flex gap-2 items-center">
          {projects.items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show project ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1 transition-all duration-300 ${
                selected === i ? 'w-12 md:w-16 bg-accent' : 'w-8 md:w-10 bg-white/15 hover:bg-white/25'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3 sm:flex-1 sm:justify-end">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Previous project"
            className="h-11 w-11 rounded-full glass-panel flex items-center justify-center text-accent transition-all duration-300 hover:border-accent/50 disabled:opacity-25 disabled:pointer-events-none disabled:border-white/10 disabled:text-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Next project"
            className="h-11 w-11 rounded-full glass-panel flex items-center justify-center text-accent transition-all duration-300 hover:border-accent/50 disabled:opacity-25 disabled:pointer-events-none disabled:border-white/10 disabled:text-muted"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionShell>
  )
}
