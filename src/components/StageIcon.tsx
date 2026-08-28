import {
  IconBadgeCheck, IconBookOpen, IconBriefcase, IconClock, IconCompass, IconFileSignature,
  IconFileStack, IconFolderCheck, IconGavel, IconGlobe, IconGraduationCap, IconLandmark,
  IconLanguages, IconListChecks, IconMailCheck, IconMessages, IconMonitorCheck, IconPlaneLanding,
  IconPlaneTakeoff, IconSchool, IconSend, IconShieldCheck, IconUpload, IconUserCheck, IconWallet,
  type IconProps,
} from './icons'

/** Content refers to stage icons by name; this is the only place that resolves them. */
const ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  ShieldCheck: IconShieldCheck,
  UserRoundCheck: IconUserCheck,
  ListChecks: IconListChecks,
  Landmark: IconLandmark,
  Languages: IconLanguages,
  Globe2: IconGlobe,
  MailCheck: IconMailCheck,
  FolderCheck: IconFolderCheck,
  Send: IconSend,
  MonitorCheck: IconMonitorCheck,
  MessagesSquare: IconMessages,
  Gavel: IconGavel,
  FileSignature: IconFileSignature,
  GraduationCap: IconGraduationCap,
  School: IconSchool,
  PlaneTakeoff: IconPlaneTakeoff,
  BookOpenCheck: IconBookOpen,
  PlaneLanding: IconPlaneLanding,
  Briefcase: IconBriefcase,
  /* Not stage icons: used by the About page blocks and the stage summary cards. */
  Wallet: IconWallet,
  Clock: IconClock,
  Compass: IconCompass,
  BadgeCheck: IconBadgeCheck,
  Upload: IconUpload,
  FileStack: IconFileStack,
}

/** Every name content is allowed to use. Tests assert content never invents one. */
export const ICON_NAMES = Object.keys(ICONS)

export function StageIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? IconShieldCheck
  return <Icon size={size} />
}
