import {
  ShieldCheck, UserRoundCheck, ListChecks, Landmark, Languages, Globe2, MailCheck,
  FolderCheck, Send, MonitorCheck, MessagesSquare, Gavel, FileSignature, GraduationCap,
  School, PlaneTakeoff, BookOpenCheck, PlaneLanding, Briefcase, Circle,
} from 'lucide-react'

const ICONS: Record<string, typeof Circle> = {
  ShieldCheck, UserRoundCheck, ListChecks, Landmark, Languages, Globe2, MailCheck,
  FolderCheck, Send, MonitorCheck, MessagesSquare, Gavel, FileSignature, GraduationCap,
  School, PlaneTakeoff, BookOpenCheck, PlaneLanding, Briefcase,
}

export function StageIcon({ name, size = 22, strokeWidth = 2 }: { name: string; size?: number; strokeWidth?: number }) {
  const Icon = ICONS[name] ?? Circle
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />
}
