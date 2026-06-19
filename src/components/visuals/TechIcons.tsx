import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const S = ({ size = 28, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...p} />
)

export function ReactIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
    </S>
  )
}

export function TypeScriptIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <text x="12" y="16.5" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial">TS</text>
    </S>
  )
}

export function NodeIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#339933" />
      <path d="M12 6.5v11M8.5 9l7 4M8.5 15l7-4" stroke="#fff" strokeWidth="0.8" fill="none" />
    </S>
  )
}

export function NextIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <path d="M8 8h8v8H8z" fill="#000" />
      <path d="M13 8v5.5l3-1.5" stroke="#000" strokeWidth="1.5" fill="none" />
    </S>
  )
}

export function PostgresIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <ellipse cx="12" cy="13" rx="8" ry="9" fill="#336791" />
      <ellipse cx="12" cy="10" rx="6" ry="5" fill="#5B9BD5" />
      <circle cx="9.5" cy="9" r="1" fill="#fff" />
      <circle cx="14.5" cy="9" r="1" fill="#fff" />
    </S>
  )
}

export function MongoIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <path d="M12 2C9 6 8 10 8 14c0 3 1.5 6 4 8 0-4 1-8 0-12-1-2-2-4 0-8z" fill="#47A248" />
      <path d="M12 2c3 4 4 8 4 12 0 3-1.5 6-4 8 0-4-1-8 0-12 1-2 2-4 0-8z" fill="#599636" />
    </S>
  )
}

export function DockerIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <rect x="3" y="10" width="3" height="3" fill="#2496ED" />
      <rect x="7" y="10" width="3" height="3" fill="#2496ED" />
      <rect x="11" y="10" width="3" height="3" fill="#2496ED" />
      <rect x="7" y="6" width="3" height="3" fill="#2496ED" />
      <rect x="11" y="6" width="3" height="3" fill="#2496ED" />
      <path d="M15 13h4c1 0 2 1 2 2s-1 3-3 3h-8" stroke="#2496ED" strokeWidth="1.5" fill="none" />
    </S>
  )
}

export function GithubActionsIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="10" fill="#2088FF" />
      <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.2" fill="none" />
    </S>
  )
}

export function CypressIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="10" fill="#17202C" />
      <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="1.5" fill="#69D3A7" />
    </S>
  )
}

export function FigmaIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <rect x="8" y="3" width="5" height="5" rx="2.5" fill="#F24E1E" />
      <rect x="8" y="9" width="5" height="5" rx="2.5" fill="#A259FF" />
      <rect x="8" y="15" width="5" height="5" rx="2.5" fill="#1ABCFE" />
      <rect x="13" y="9" width="5" height="5" rx="2.5" fill="#0ACF83" />
    </S>
  )
}

export function AdonisIcon({ size = 28 }: IconProps) {
  return (
    <S size={size}>
      <rect width="24" height="24" rx="4" fill="#5A45FF" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Arial">A</text>
    </S>
  )
}

export const techIconMap = {
  react: ReactIcon,
  typescript: TypeScriptIcon,
  nodejs: NodeIcon,
  nextjs: NextIcon,
  postgresql: PostgresIcon,
  mongodb: MongoIcon,
  docker: DockerIcon,
  githubactions: GithubActionsIcon,
  cypress: CypressIcon,
  figma: FigmaIcon,
  adonisjs: AdonisIcon,
} as const

export type TechIconId = keyof typeof techIconMap

export function TechIcon({ id, size = 32 }: { id: TechIconId; size?: number }) {
  const Icon = techIconMap[id]
  return Icon ? <Icon size={size} /> : null
}
