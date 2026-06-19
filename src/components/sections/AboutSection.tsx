import { Mail } from 'lucide-react'
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
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-surface flex items-center justify-center">
              <span className="text-6xl font-bold text-accent/40">MA</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
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
