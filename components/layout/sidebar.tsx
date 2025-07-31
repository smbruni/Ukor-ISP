"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Activity,
  Database,
  Gift,
  Dumbbell,
  TrendingDown,
  Download,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Target,
  Brain,
  Stethoscope,
  Calculator,
  ClipboardList,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function Sidebar({ activeSection, onSectionChange, collapsed, onToggleCollapse }: SidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Executivo",
      icon: LayoutDashboard,
      badge: "Live",
      badgeColor: "bg-green-500",
    },
    {
      id: "unimed-analysis",
      label: "Análise Unimed-BH",
      icon: Shield,
      badge: "Real",
      badgeColor: "bg-red-500",
    },
    {
      id: "care-lines",
      label: "Linhas de Cuidado",
      icon: Stethoscope,
      badge: "12",
      badgeColor: "bg-blue-500",
    },
    {
      id: "analytics",
      label: "Análises Preditivas",
      icon: Brain,
      badge: "IA",
      badgeColor: "bg-purple-500",
    },
    {
      id: "performance",
      label: "Avaliação Performance",
      icon: Target,
      badge: "360°",
      badgeColor: "bg-orange-500",
    },
    {
      id: "isp",
      label: "ISP - Indicadores",
      icon: Activity,
      badge: "24h",
      badgeColor: "bg-cyan-500",
    },
    {
      id: "roi",
      label: "ROI & Economia",
      icon: Calculator,
      badge: "R$",
      badgeColor: "bg-emerald-500",
    },
    {
      id: "questionnaires",
      label: "Questionários",
      icon: ClipboardList,
      badge: "87%",
      badgeColor: "bg-indigo-500",
    },
    {
      id: "data",
      label: "Gestão de Dados",
      icon: Database,
      badge: "API",
      badgeColor: "bg-slate-500",
    },
    {
      id: "benefits",
      label: "Benefícios Corporativos",
      icon: Gift,
      badge: "15",
      badgeColor: "bg-pink-500",
    },
    {
      id: "wellness",
      label: "Programas Wellness",
      icon: Dumbbell,
      badge: "8",
      badgeColor: "bg-teal-500",
    },
    {
      id: "sinistralidade",
      label: "Redução Sinistralidade",
      icon: TrendingDown,
      badge: "-23%",
      badgeColor: "bg-green-600",
    },
    {
      id: "export",
      label: "Exportar Dados",
      icon: Download,
      badge: "PDF",
      badgeColor: "bg-amber-500",
    },
  ]

  const bottomItems = [
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
    },
    {
      id: "help",
      label: "Ajuda & Suporte",
      icon: HelpCircle,
    },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">Ukor Health Analytics</h1>
              <p className="text-xs text-red-600 font-medium">Dados Reais Unimed-BH</p>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="p-2 hover:bg-gray-100">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Scrollable Menu Area */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10 px-3",
                collapsed && "justify-center px-2",
                activeSection === item.id && "bg-blue-50 text-blue-700 border-blue-200",
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  <Badge className={cn("text-xs px-1.5 py-0.5 text-white", item.badgeColor)}>{item.badge}</Badge>
                </>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex-shrink-0 p-2 border-t border-gray-200 space-y-1">
        {bottomItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-10 px-3",
              collapsed && "justify-center px-2",
              activeSection === item.id && "bg-blue-50 text-blue-700",
            )}
            onClick={() => onSectionChange(item.id)}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span className="flex-1 text-left text-sm">{item.label}</span>}
          </Button>
        ))}
      </div>
    </div>
  )
}
