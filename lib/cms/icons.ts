import {
  Activity,
  Bone,
  Brain,
  Briefcase,
  CheckCircle2,
  Cpu,
  Frown,
  Heart,
  Keyboard,
  Lightbulb,
  Mic2,
  Monitor,
  Moon,
  Mouse,
  PersonStanding,
  Pill,
  Repeat,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Utensils,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const CMS_ICONS: Record<string, LucideIcon> = {
  Activity,
  Bone,
  Brain,
  Briefcase,
  CheckCircle2,
  Cpu,
  Frown,
  Heart,
  Keyboard,
  Lightbulb,
  Mic2,
  Monitor,
  Moon,
  Mouse,
  PersonStanding,
  Pill,
  Repeat,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Utensils,
  Workflow,
  Zap,
};

export function iconFromName(name?: string | null): LucideIcon {
  if (name && CMS_ICONS[name]) return CMS_ICONS[name];
  return Activity;
}

export function nameFromIcon(icon: LucideIcon): string {
  const found = Object.entries(CMS_ICONS).find(([, value]) => value === icon);
  return found?.[0] || "Activity";
}
