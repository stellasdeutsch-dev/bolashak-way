import type { SVGProps } from 'react'

/**
 * Hand-drawn icon set. Duotone by design: a soft filled shape carries the silhouette and
 * a crisp stroke draws the detail, so an icon still reads at 16px and gains presence at 26px.
 * Everything inherits `currentColor`; the filled layer is the same colour at low opacity,
 * which keeps a single icon legible on white cards, navy heroes and coloured bubbles alike.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 22, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

/** The soft duotone layer. */
const F = ({ d, o = 0.16 }: { d: string; o?: number }) => <path d={d} fill="currentColor" fillOpacity={o} stroke="none" />

/* ─────────────  stage icons  ───────────── */

export const IconShieldCheck = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 2.6 20 5.4v6.1c0 4.6-3.2 8.4-8 9.9-4.8-1.5-8-5.3-8-9.9V5.4Z" />
    <path d="M12 2.6 20 5.4v6.1c0 4.6-3.2 8.4-8 9.9-4.8-1.5-8-5.3-8-9.9V5.4Z" />
    <path d="m8.6 11.8 2.4 2.4 4.4-4.6" />
  </Svg>
)

export const IconUserCheck = (p: IconProps) => (
  <Svg {...p}>
    <F d="M4 20.4c0-3.4 2.8-5.6 6.2-5.6s6.2 2.2 6.2 5.6Z" />
    <circle cx="10.2" cy="7.6" r="3.7" />
    <path d="M4 20.4c0-3.4 2.8-5.6 6.2-5.6s6.2 2.2 6.2 5.6" />
    <path d="m16.6 12.4 1.8 1.8 3.4-3.6" />
  </Svg>
)

export const IconListChecks = (p: IconProps) => (
  <Svg {...p}>
    <F d="M3.2 4.6h5v5h-5Zm0 9.8h5v5h-5Z" />
    <rect x="3.2" y="4.6" width="5" height="5" rx="1.5" />
    <rect x="3.2" y="14.4" width="5" height="5" rx="1.5" />
    <path d="m4.4 7 1.1 1.1 1.7-2M4.4 16.8l1.1 1.1 1.7-2" />
    <path d="M11.4 7.1H21M11.4 16.9H21" />
  </Svg>
)

export const IconLandmark = (p: IconProps) => (
  <Svg {...p}>
    <F d="M3.4 9.4 12 4.2l8.6 5.2Z" />
    <path d="M3.4 9.4 12 4.2l8.6 5.2Z" />
    <path d="M5.8 9.4v8M10 9.4v8M14 9.4v8M18.2 9.4v8" />
    <path d="M3 20.2h18" />
  </Svg>
)

export const IconLanguages = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 4.4h9.4v9.4H2.8Z" o={0.13} />
    <rect x="2.8" y="4.4" width="9.4" height="9.4" rx="2.4" />
    <path d="M5.2 7.2h4.6M7.5 7.2v.6c0 1.6-1 3-2.3 3.6M6.6 8.9c.5 1.2 1.5 2.1 2.8 2.5" />
    <path d="M11.8 10.2h7.4a2 2 0 0 1 2 2v5.4a2 2 0 0 1-2 2H14l-2.6 2v-2" />
    <path d="m15.1 16.6 1.7-3.4 1.7 3.4M15.7 15.4h2.2" />
  </Svg>
)

export const IconGlobe = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Z" o={0.13} />
    <circle cx="12" cy="12" r="8.8" />
    <path d="M3.2 12h17.6" />
    <path d="M12 3.2c2.3 2.4 3.5 5.5 3.5 8.8s-1.2 6.4-3.5 8.8c-2.3-2.4-3.5-5.5-3.5-8.8S9.7 5.6 12 3.2Z" />
  </Svg>
)

export const IconMailCheck = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 6.4h13.4v9.8H2.8Z" />
    <path d="M16.2 11.4v4.8H2.8V6.4h13.4v1.2" />
    <path d="m2.8 7 6.7 4.4L16.2 7" />
    <path d="m14.8 17.6 2 2 4-4.4" />
  </Svg>
)

export const IconFolderCheck = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 5.6h6.3l1.8 2.4h10.3v11.2H2.8Z" />
    <path d="M21.2 12.6V8H10.9L9.1 5.6H2.8v13.6h9.4" />
    <path d="m15 17.4 2.1 2.1 4.1-4.4" />
  </Svg>
)

export const IconSend = (p: IconProps) => (
  <Svg {...p}>
    <F d="m21 3-8 18-2.4-7.6L3 11Z" o={0.14} />
    <path d="m21 3-8 18-2.4-7.6L3 11Z" />
    <path d="M21 3 10.6 13.4" />
  </Svg>
)

export const IconMonitorCheck = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 4.6h18.4v11.2H2.8Z" />
    <rect x="2.8" y="4.6" width="18.4" height="11.2" rx="2.2" />
    <path d="M8.6 19.6h6.8M12 15.8v3.8" />
    <path d="m8.9 10.1 2 2 4.2-4.4" />
  </Svg>
)

export const IconMessages = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 4.6h12.6v8.8H7.2l-4.4 3.2Z" />
    <path d="M15.4 9.6V4.6H2.8v8.8h4.4v3.2l4.4-3.2h1.2" />
    <path d="M8.6 9.6h12.6v7.2h-3.4v2.8l-3.8-2.8H8.6Z" />
  </Svg>
)

export const IconGavel = (p: IconProps) => (
  <Svg {...p}>
    <F d="m12.9 3.6 4.9 4.9-3 3-4.9-4.9Z" />
    <path d="m12.9 3.6 4.9 4.9-3 3-4.9-4.9Z" />
    <path d="m11.2 8.9-6.4 6.4 2.6 2.6 6.4-6.4" />
    <path d="M12.6 20.4h8.6" />
  </Svg>
)

export const IconFileSignature = (p: IconProps) => (
  <Svg {...p}>
    <F d="M5 2.8h8l5 5v12.4H5Z" />
    <path d="M13 2.8H5v17.4h13V7.8Z" />
    <path d="M13 2.8v5h5" />
    <path d="M8 16.4c1.4-2.6 2.4-2.6 3.2-.9.8 1.7 1.8 1.7 3.2-.5" />
  </Svg>
)

export const IconGraduationCap = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 3.6 22 8.4 12 13.2 2 8.4Z" />
    <path d="M12 3.6 22 8.4 12 13.2 2 8.4Z" />
    <path d="M6.4 10.8v4.6c0 1.9 2.5 3.4 5.6 3.4s5.6-1.5 5.6-3.4v-4.6" />
    <path d="M22 8.4v5.4" />
  </Svg>
)

export const IconSchool = (p: IconProps) => (
  <Svg {...p}>
    <F d="M4.4 9.6 12 5.2l7.6 4.4v10.4H4.4Z" />
    <path d="M4.4 9.6 12 5.2l7.6 4.4v10.4H4.4Z" />
    <path d="M12 5.2V2.6" />
    <rect x="9.8" y="13.6" width="4.4" height="6.4" rx="1" />
  </Svg>
)

export const IconPlaneTakeoff = (p: IconProps) => (
  <Svg {...p}>
    <F d="M3.4 12.6 5 8.2l2.4.8 1.2 3 4.6 1.2 4.6-5.2 2.4 1.4-3.4 6.6-13.4-3.4Z" o={0.14} />
    <path d="m3.4 12.6 1.6-4.4 2.4.8 1.2 3 4.6 1.2 4.6-5.2 2.4 1.4-3.4 6.6-13.4-3.4Z" />
    <path d="M3 20.4h18" />
  </Svg>
)

export const IconBookOpen = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 5.2c3 0 6 .5 9.2 2.4v12c-3.2-1.9-6.2-2.4-9.2-2.4Z" />
    <path d="M12 7.6C8.8 5.7 5.8 5.2 2.8 5.2v12c3 0 6 .5 9.2 2.4 3.2-1.9 6.2-2.4 9.2-2.4v-12c-3 0-6 .5-9.2 2.4Z" />
    <path d="M12 7.6v12" />
  </Svg>
)

export const IconPlaneLanding = (p: IconProps) => (
  <Svg {...p}>
    <F d="M3.2 9.4 5 8.8l3 3.4 4.6 1.2L11 5.6l2.6.7 3.6 8 3.6 1c.9.3 1.4 1.2 1.1 2l-.2.6-18.5-5Z" o={0.14} />
    <path d="m3.2 9.4 1.8-.6 3 3.4 4.6 1.2L11 5.6l2.6.7 3.6 8 3.6 1c.9.3 1.4 1.2 1.1 2l-.2.6-18.5-5Z" />
    <path d="M3 20.4h18" />
  </Svg>
)

export const IconBriefcase = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 8h18.4v11.2H2.8Z" />
    <rect x="2.8" y="8" width="18.4" height="11.2" rx="2.2" />
    <path d="M9 8V6.4c0-1 .8-1.8 1.8-1.8h2.4c1 0 1.8.8 1.8 1.8V8" />
    <path d="M2.8 12.6h18.4M11 12.2h2v2h-2Z" />
  </Svg>
)

/* ─────────────  interface icons  ───────────── */

export const IconCheck = ({ size = 22, ...p }: IconProps) => (
  <Svg size={size} strokeWidth={2.6} {...p}>
    <path d="m4.6 12.4 4.6 4.6L19.4 6.8" />
  </Svg>
)

export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <F d="M4.6 10.4h14.8v9.4H4.6Z" />
    <rect x="4.6" y="10.4" width="14.8" height="9.4" rx="2.4" />
    <path d="M8.2 10.4V7.6a3.8 3.8 0 0 1 7.6 0v2.8" />
  </Svg>
)

export const IconChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9.4 5.6 6.6 6.4-6.6 6.4" />
  </Svg>
)

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5.6 9.4 6.4 6.6 6.4-6.6" />
  </Svg>
)

export const IconArrowDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.4v15.2M5.6 13.2 12 19.6l6.4-6.4" />
  </Svg>
)

export const IconArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19.6 12H4.4M10.8 5.6 4.4 12l6.4 6.4" />
  </Svg>
)

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.4 12h15.2M13.2 5.6 19.6 12l-6.4 6.4" />
  </Svg>
)

export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <F d="M10.6 3.4a7.2 7.2 0 1 1 0 14.4 7.2 7.2 0 0 1 0-14.4Z" o={0.13} />
    <circle cx="10.6" cy="10.6" r="7.2" />
    <path d="m15.9 15.9 4.7 4.7" />
  </Svg>
)

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Z" />
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 11.2v5.2" />
    <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconAlertTriangle = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 3.4 22 19.8H2Z" />
    <path d="M13.5 4.3a1.7 1.7 0 0 0-3 0L2.6 18.6a1.7 1.7 0 0 0 1.5 2.6h15.8a1.7 1.7 0 0 0 1.5-2.6Z" />
    <path d="M12 9.6v4" />
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconAlertCircle = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Z" />
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 7.4v5.4" />
    <circle cx="12" cy="16.3" r="1" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconExternal = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.4 4.6H19.4v6" />
    <path d="M19.4 4.6 10.6 13.4" />
    <path d="M18.4 14v4.2a1.6 1.6 0 0 1-1.6 1.6H5.8a1.6 1.6 0 0 1-1.6-1.6V7.2a1.6 1.6 0 0 1 1.6-1.6H10" />
  </Svg>
)

export const IconDownload = (p: IconProps) => (
  <Svg {...p}>
    <F d="M3.6 15.4v3.2c0 .8.6 1.4 1.4 1.4h14c.8 0 1.4-.6 1.4-1.4v-3.2Z" />
    <path d="M12 3.6v10.8M7.4 10l4.6 4.4L16.6 10" />
    <path d="M3.6 15.4v3.2c0 .8.6 1.4 1.4 1.4h14c.8 0 1.4-.6 1.4-1.4v-3.2" />
  </Svg>
)

export const IconUpload = (p: IconProps) => (
  <Svg {...p}>
    <F d="M3.6 15.4v3.2c0 .8.6 1.4 1.4 1.4h14c.8 0 1.4-.6 1.4-1.4v-3.2Z" />
    <path d="M12 14.4V3.6M7.4 8 12 3.6 16.6 8" />
    <path d="M3.6 15.4v3.2c0 .8.6 1.4 1.4 1.4h14c.8 0 1.4-.6 1.4-1.4v-3.2" />
  </Svg>
)

export const IconTrash = (p: IconProps) => (
  <Svg {...p}>
    <F d="M5.6 6.8h12.8l-1 12.2a1.6 1.6 0 0 1-1.6 1.4H8.2a1.6 1.6 0 0 1-1.6-1.4Z" />
    <path d="M3.8 6.8h16.4" />
    <path d="M5.6 6.8h12.8l-1 12.2a1.6 1.6 0 0 1-1.6 1.4H8.2a1.6 1.6 0 0 1-1.6-1.4Z" />
    <path d="M9.4 6.8V4.6c0-.7.5-1.2 1.2-1.2h2.8c.7 0 1.2.5 1.2 1.2v2.2" />
  </Svg>
)

export const IconReset = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.8 5.6v5.2H9" />
    <path d="M4.6 10.8a8 8 0 1 1 .6 5.6" />
  </Svg>
)

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 5.6h18.4v12.8H2.8Z" />
    <rect x="2.8" y="5.6" width="18.4" height="12.8" rx="2.2" />
    <path d="m3.4 6.6 8.6 5.8 8.6-5.8" />
  </Svg>
)

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <F d="M4 4.4h4.6l1.6 4-2 1.6c1 2.2 2.6 3.8 4.8 4.8l1.6-2 4 1.6v4.6c0 .5-.4.9-.9.9C10.2 20 4 13.8 3.1 5.3c0-.5.4-.9.9-.9Z" o={0.14} />
    <path d="M4 4.4h4.6l1.6 4-2 1.6c1 2.2 2.6 3.8 4.8 4.8l1.6-2 4 1.6v4.6c0 .5-.4.9-.9.9C10.2 20 4 13.8 3.1 5.3c0-.5.4-.9.9-.9Z" />
  </Svg>
)

export const IconUserCog = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 20.2c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4Z" />
    <circle cx="8.8" cy="7.4" r="3.6" />
    <path d="M2.8 20.2c0-3.3 2.7-5.4 6-5.4 1.2 0 2.3.3 3.2.8" />
    <circle cx="18" cy="16.6" r="2.4" />
    <path d="M18 12.8v1.4M18 19v1.4M14.7 14.7l1.2.7M20.1 17.8l1.2.7M21.3 14.7l-1.2.7M15.9 17.8l-1.2.7" />
  </Svg>
)

export const IconSparkles = (p: IconProps) => (
  <Svg {...p}>
    <F d="M11.4 3.2 13 8.4l5.2 1.6-5.2 1.6-1.6 5.2-1.6-5.2L4.6 10l5.2-1.6Z" o={0.2} />
    <path d="M11.4 3.2 13 8.4l5.2 1.6-5.2 1.6-1.6 5.2-1.6-5.2L4.6 10l5.2-1.6Z" />
    <path d="m18.4 15.4.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
  </Svg>
)

export const IconCompass = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Z" o={0.13} />
    <circle cx="12" cy="12" r="8.8" />
    <path d="m15.6 8.4-2 5.2-5.2 2 2-5.2Z" />
  </Svg>
)

export const IconMap = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 6.4 9 4.2v13.4l-6.2 2.2Zm12.2-2.2 6.2 2.2v13.4L15 17.6Z" o={0.14} />
    <path d="M9 4.2 2.8 6.4v13.4L9 17.6l6-2 6.2 2.2V4.4L15 2.2Z" />
    <path d="M9 4.2v13.4M15 2.2v13.4" />
  </Svg>
)

export const IconSettings = (p: IconProps) => (
  // Sliders rather than a cog: at 16px a cog's teeth blur into a sun, these stay readable.
  <Svg {...p}>
    <path d="M4 7.4h9.6M18.4 7.4H20M4 16.6h4.4M13.2 16.6H20" />
    <circle cx="15.8" cy="7.4" r="2.4" fill="currentColor" fillOpacity={0.16} />
    <circle cx="10.8" cy="16.6" r="2.4" fill="currentColor" fillOpacity={0.16} />
  </Svg>
)

export const IconFileStack = (p: IconProps) => (
  <Svg {...p}>
    <F d="M8.4 6.6h7.2l3.4 3.4v10.4H8.4Z" />
    <path d="M15.6 6.6H8.4v13.8H19V10Z" />
    <path d="M15.6 6.6V10H19" />
    <path d="M5.6 17.4V4.4c0-.7.5-1.2 1.2-1.2h6.6" />
  </Svg>
)

export const IconFlask = (p: IconProps) => (
  <Svg {...p}>
    <F d="M9.6 3.4h4.8v6.2l4.6 7.8a1.8 1.8 0 0 1-1.6 2.8H6.6A1.8 1.8 0 0 1 5 17.4l4.6-7.8Z" />
    <path d="M9.6 3.4h4.8M10 3.4v6.2L5 17.4a1.8 1.8 0 0 0 1.6 2.8h10.8a1.8 1.8 0 0 0 1.6-2.8L14 9.6V3.4" />
    <path d="M7.4 14.4h9.2" />
  </Svg>
)

export const IconMailQuestion = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 5.6h14.4v9.6H2.8Z" />
    <path d="M17.2 10.4V5.6H2.8v9.6h9.4" />
    <path d="m3.4 6.4 6.6 4.4 6.6-4.4" />
    <path d="M16.2 15.6c0-1 .8-1.7 1.8-1.7s1.8.7 1.8 1.7c0 1.4-1.8 1.3-1.8 2.6" />
    <circle cx="18" cy="20.3" r=".9" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconMailX = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 5.6h14.4v9.6H2.8Z" />
    <path d="M17.2 10.4V5.6H2.8v9.6h9.4" />
    <path d="m3.4 6.4 6.6 4.4 6.6-4.4" />
    <path d="m15.6 15.6 4.8 4.8M20.4 15.6l-4.8 4.8" />
  </Svg>
)

export const IconBadgeCheck = (p: IconProps) => (
  <Svg {...p}>
    <F d="m12 2.6 2.4 2 3-.3 1 2.9 2.6 1.6-1 2.9 1 2.9-2.6 1.6-1 2.9-3-.3-2.4 2-2.4-2-3 .3-1-2.9L2 14.6l1-2.9-1-2.9 2.6-1.6 1-2.9 3 .3Z" />
    <path d="m12 2.6 2.4 2 3-.3 1 2.9 2.6 1.6-1 2.9 1 2.9-2.6 1.6-1 2.9-3-.3-2.4 2-2.4-2-3 .3-1-2.9L2 14.6l1-2.9-1-2.9 2.6-1.6 1-2.9 3 .3Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </Svg>
)

export const IconBan = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Z" o={0.12} />
    <circle cx="12" cy="12" r="8.8" />
    <path d="m5.8 5.8 12.4 12.4" />
  </Svg>
)

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <F d="M12 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Z" o={0.13} />
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 6.8V12l3.6 2.2" />
  </Svg>
)

export const IconFingerprint = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.2 9.4a7.6 7.6 0 0 1 13.6 0" />
    <path d="M7.6 12.4a4.6 4.6 0 0 1 8.8 0c0 1.4-.2 2.8-.6 4.2" />
    <path d="M12 11.4v3.2c0 1.8-.3 3.6-.9 5.2" />
    <path d="M15.6 19.4c.5-1.2.8-2.5 1-3.8" />
    <path d="M8.6 19.8c.7-1.6 1-3.3 1-5" />
  </Svg>
)

export const IconVideo = (p: IconProps) => (
  <Svg {...p}>
    <F d="M2.8 6.6h11.4v10.8H2.8Z" />
    <rect x="2.8" y="6.6" width="11.4" height="10.8" rx="2.6" />
    <path d="m14.2 13 4.6 2.8c.7.4 1.6-.1 1.6-.9V9.1c0-.8-.9-1.3-1.6-.9L14.2 11Z" />
  </Svg>
)

/** Solid triangle: reads as a play button even on top of a photo. */
export const IconPlay = (p: IconProps) => (
  <Svg {...p} strokeWidth={1.4}>
    <path d="M9 6.6 17.4 12 9 17.4Z" fill="currentColor" />
  </Svg>
)

export const IconWallet = (p: IconProps) => (
  <Svg {...p}>
    <F d="M3.2 7.6h14.2c1.9 0 3.4 1.5 3.4 3.4v5.4c0 1.9-1.5 3.4-3.4 3.4H6.6a3.4 3.4 0 0 1-3.4-3.4Z" />
    <path d="M20.8 10.4V9.2c0-1.1-.9-2-2-2H5.6a2.4 2.4 0 0 1 0-4.8h10.2" />
    <path d="M3.2 7.6v8.8c0 1.9 1.5 3.4 3.4 3.4h10.8c1.9 0 3.4-1.5 3.4-3.4v-5.4c0-1.9-1.5-3.4-3.4-3.4" />
    <circle cx="16.9" cy="13.7" r="1.15" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <F d="M3.4 8.4h17.2v10.2a2.4 2.4 0 0 1-2.4 2.4H5.8a2.4 2.4 0 0 1-2.4-2.4Z" />
    <rect x="3.4" y="5" width="17.2" height="16" rx="2.6" />
    <path d="M3.4 9.6h17.2" />
    <path d="M8.2 3.2v3.4M15.8 3.2v3.4" />
    <circle cx="8.4" cy="13.6" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="12" cy="13.6" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="15.6" cy="13.6" r="1.05" fill="currentColor" stroke="none" />
  </Svg>
)
