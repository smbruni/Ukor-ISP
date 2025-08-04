"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  GraduationCap,
  Users,
  Bot,
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
    },
    {
      id: "unimed-analysis",
      label: "Análise Unimed-BH",
      icon: Shield,
    },
    {
      id: "care-lines",
      label: "Linhas de Cuidado",
      icon: Stethoscope,
    },
    {
      id: "analytics",
      label: "Análises Preditivas",
      icon: Brain,
    },
    {
      id: "performance",
      label: "Avaliação Performance",
      icon: Target,
    },
    {
      id: "isp",
      label: "ISP - Indicadores",
      icon: Activity,
    },
    {
      id: "roi",
      label: "ROI & Economia",
      icon: Calculator,
    },
    {
      id: "questionnaires",
      label: "Questionários",
      icon: ClipboardList,
    },
    {
      id: "data",
      label: "Gestão de Dados",
      icon: Database,
    },
    {
      id: "benefits",
      label: "Benefícios Corporativos",
      icon: Gift,
    },
    {
      id: "wellness",
      label: "Programas Wellness",
      icon: Dumbbell,
    },
    {
      id: "sinistralidade",
      label: "Redução Sinistralidade",
      icon: TrendingDown,
    },
    {
      id: "care",
      label: "Gestão de Cuidados",
      icon: Users,
    },
    {
      id: "education",
      label: "Educação em Saúde",
      icon: GraduationCap,
    },
    {
      id: "academy",
      label: "Academia Ukor",
      icon: GraduationCap,
    },
    {
      id: "ai-agents",
      label: "Agentes de IA",
      icon: Bot,
    },
    {
      id: "export",
      label: "Exportar Dados",
      icon: Download,
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
              <p className="text-xs text-red-600 font-medium">v168 - Dados Reais Unimed-BH</p>
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
              {!collapsed && <span className="flex-1 text-left text-sm">{item.label}</span>}
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
