import { Mail } from 'lucide-react'
import aboutPortrait from '../../assets/about-portrait.webp'
import { about, site } from '../../data/content'
import { SectionShell } from '../layout/SectionShell'
import { SplitRevealText } from '../ui/SplitRevealText'

export function AboutSection() {
  return (
    <SectionShell
      id="about-me"
      watermark="ABOUT"
      label={about.label}
      title={about.title}
      className="relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center lg:justify-start">
          <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-2xl overflow-hidden glass-card accent-glow">
            <img
              src={aboutPortrait}
              alt={`Portrait of ${site.name}`}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-accent/10" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
          </div>
        </div>
        <div>
          <SplitRevealText
            text={about.greeting}
            as="h3"
            className="section-title text-xl md:text-2xl mb-5"
          />
          <p className="body-lg mb-4">{about.summary}</p>
          <p className="body-lg mb-8">{about.bio}</p>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300"
          >
            <Mail className="h-4 w-4" />
            {site.email}
          </a>
        </div>
      </div>
    </SectionShell>
  )
}
