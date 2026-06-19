import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { testimonials } from '../../data/content'
import { SectionShell } from '../layout/SectionShell'

export function TestimonialsSection() {
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
      id="testimonials"
      watermark="REVIEWS"
      className="relative overflow-hidden"
    >
      {/* Centered header like reference */}
      <div className="text-center -mt-4 mb-10 md:mb-14 relative z-10">
        <p className="section-label mb-4">{testimonials.label}</p>
        <h2 className="section-title">{testimonials.title}</h2>
      </div>

      <div className="overflow-hidden relative z-10 cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-4 md:gap-5">
          {testimonials.items.map((item) => (
            <div
              key={item.name}
              className="flex-[0_0_88%] sm:flex-[0_0_58%] lg:flex-[0_0_44%] min-w-0 pl-1"
            >
              <article className="border border-accent/45 bg-black/50 backdrop-blur-sm p-8 md:p-10 min-h-[300px] md:min-h-[340px] flex flex-col transition-colors duration-300 hover:border-accent/70">
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={0} />
                  ))}
                </div>

                <p className="text-base md:text-lg lg:text-xl text-text/90 leading-relaxed italic flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 border border-white/10 bg-surface flex items-center justify-center grayscale">
                    <span className="text-sm font-bold text-muted">{item.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-base md:text-lg text-text">{item.name}</p>
                    <p className="text-sm text-muted mt-0.5">{item.role}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bars + nav — reference layout */}
      <div className="relative z-10 mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-7xl mx-auto px-1">
        <div className="flex-1 hidden sm:block" />

        <div className="flex gap-2 items-center">
          {testimonials.items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
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
            aria-label="Previous testimonial"
            className="h-11 w-11 rounded-full border border-accent/50 flex items-center justify-center text-accent transition-all duration-300 hover:bg-accent/10 disabled:opacity-25 disabled:pointer-events-none disabled:border-white/10 disabled:text-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Next testimonial"
            className="h-11 w-11 rounded-full border border-accent/50 flex items-center justify-center text-accent transition-all duration-300 hover:bg-accent/10 disabled:opacity-25 disabled:pointer-events-none disabled:border-white/10 disabled:text-muted"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionShell>
  )
}
