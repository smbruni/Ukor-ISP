import { ExecutiveDashboard } from "@/components/executive-dashboard"
import { Overview } from "@/components/overview"

interface DashboardContentProps {
  tab: string
}

export function DashboardContent({ tab }: DashboardContentProps) {
  switch (tab) {
    case "visão geral":
      return <Overview />
    case "executivo":
      return <ExecutiveDashboard />
    default:
      return null
  }
}
