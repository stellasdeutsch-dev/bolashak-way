import {
  IconBookOpen, IconBriefcase, IconFileSignature, IconFolderCheck, IconGavel, IconGlobe,
  IconGraduationCap, IconLandmark, IconLanguages, IconListChecks, IconMailCheck, IconMessages,
  IconMonitorCheck, IconPlaneLanding, IconPlaneTakeoff, IconSchool, IconSend, IconShieldCheck,
  IconUserCheck, type IconProps,
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
}

export function StageIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? IconShieldCheck
  return <Icon size={size} />
}
