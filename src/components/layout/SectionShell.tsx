import type { ReactNode } from 'react'

interface SectionShellProps {
  id: string
  watermark?: string
  label?: string
  title?: string
  intro?: string
  children: ReactNode
  className?: string
  watermarkAlign?: 'center' | 'right'
}

export function SectionShell({
  id,
  watermark,
  label,
  title,
  intro,
  children,
  className = '',
  watermarkAlign = 'center',
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`snap-section flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden ${className}`}
    >
      {watermark && (
        <div
          className={`pointer-events-none absolute inset-0 flex items-center overflow-hidden ${
            watermarkAlign === 'right' ? 'justify-end pr-0 md:pr-8' : 'justify-center'
          }`}
          aria-hidden
        >
          <span className={`watermark-text ${watermarkAlign === 'right' ? 'translate-x-[10%] md:translate-x-[5%]' : ''}`}>
            {watermark}
          </span>
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {(label || title || intro) && (
          <header className="mb-12 md:mb-16">
            {label && <p className="section-label mb-4">{label}</p>}
            {title && <h2 className="section-title">{title}</h2>}
            {intro && <p className="body-lg mt-5 max-w-2xl">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
