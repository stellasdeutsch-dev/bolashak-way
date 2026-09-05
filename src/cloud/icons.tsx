import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 22, children, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  )
}
const F = ({ d, o = 0.16 }: { d: string; o?: number }) => <path d={d} fill="currentColor" fillOpacity={o} stroke="none" />

export const IconCloud = (p: IconProps) => (
  <Svg {...p}>
    <F d="M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.2 9.6 4.5 4.5 0 0 0 7 18.5Z" />
    <path d="M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.2 9.6 4.5 4.5 0 0 0 7 18.5Z" />
    <path d="m9.6 14.4 1.8 1.8 3.4-3.6" />
  </Svg>
)

export const IconCloudOff = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.2 9.6 4.5 4.5 0 0 0 7 18.5Z" />
    <path d="m4 4 16 16" />
  </Svg>
)

export const IconUser = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 12.2a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Z" />
    <circle cx="12" cy="8.1" r="4.1" />
    <path d="M4.4 20.4c.9-3.6 3.9-5.4 7.6-5.4s6.7 1.8 7.6 5.4" />
  </Svg>
)

export const IconLogOut = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 4.5H6.6A2.1 2.1 0 0 0 4.5 6.6v10.8a2.1 2.1 0 0 0 2.1 2.1H10" />
    <path d="M15 8.4 18.6 12 15 15.6M9.4 12h9.2" />
  </Svg>
)

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 2.6 20 5.4v6.1c0 4.6-3.2 8.4-8 9.9-4.8-1.5-8-5.3-8-9.9V5.4Z" />
    <path d="M12 2.6 20 5.4v6.1c0 4.6-3.2 8.4-8 9.9-4.8-1.5-8-5.3-8-9.9V5.4Z" />
    <path d="M12 8v4.6M12 15.4h.01" />
  </Svg>
)

export const IconUsers = (p: IconProps) => (
  <Svg {...p}>
    <F d="M9 12a3.6 3.6 0 1 0 0-7.2A3.6 3.6 0 0 0 9 12Z" />
    <circle cx="9" cy="8.4" r="3.6" />
    <path d="M2.8 19.6c.8-3.1 3.3-4.7 6.2-4.7s5.4 1.6 6.2 4.7" />
    <path d="M16 5.2a3.4 3.4 0 0 1 0 6.4M17.6 15.2c2 .5 3.3 1.9 3.7 4.4" />
  </Svg>
)

export const IconChart = (p: IconProps) => (
  <Svg {...p}>
    <F d="M4 19.5V10h3.6v9.5H4ZM10.2 19.5V4.5h3.6v15h-3.6ZM16.4 19.5v-6.8H20v6.8h-3.6Z" />
    <path d="M4 19.5V10h3.6v9.5M10.2 19.5V4.5h3.6v15M16.4 19.5v-6.8H20v6.8M3 19.5h18" />
  </Svg>
)
