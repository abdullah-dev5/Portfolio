import { AnimatePresence } from 'framer-motion'
import { BootSequence } from './components/boot/BootSequence'
import { ChatWidget } from './components/chat/ChatWidget'
import { Navbar } from './components/layout/Navbar'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { TechStackSection } from './components/sections/TechStackSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { TrustSection } from './components/sections/TrustSection'
import { ScrollSceneMascot } from './components/visuals/ScrollSceneMascot'
import { useActiveSection } from './hooks/useActiveSection'
import { useAudioToggle } from './hooks/useAudioToggle'
import { useBootSession } from './hooks/useBootSession'

function App() {
  const { showBoot, completeBoot } = useBootSession()
  const activeSection = useActiveSection()
  const { isPlaying, toggle } = useAudioToggle()

  return (
    <>
      <AnimatePresence>{showBoot && <BootSequence onComplete={completeBoot} />}</AnimatePresence>

      {!showBoot && (
        <>
          <Navbar activeSection={activeSection} />
          <ScrollSceneMascot isPlaying={isPlaying} onToggle={toggle} />
          <main className="relative z-10">
            <HeroSection />
            <TrustSection />
            <ServicesSection />
            <TechStackSection />
            <ProjectsSection />
            <TestimonialsSection />
            <AboutSection />
            <ContactSection />
          </main>
          <ChatWidget />
        </>
      )}
    </>
  )
}

export default App
