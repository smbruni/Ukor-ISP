"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  TrendingUp,
  Activity,
  UserCheck,
  Shield,
  DollarSign,
  FileText,
  Database,
  Bot,
  GraduationCap,
  Heart,
  Gift,
  AlertTriangle,
  Download,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "unimed",
      label: "Análise Unimed",
      icon: Activity,
      badge: "Novo",
    },
    {
      id: "care-lines",
      label: "Linhas de Cuidado",
      icon: Stethoscope,
      badge: "10",
    },
    {
      id: "predictive",
      label: "Análises Preditivas",
      icon: TrendingUp,
      badge: "3",
    },
    {
      id: "performance",
      label: "Avaliação de Desempenho",
      icon: UserCheck,
      badge: "Novo",
    },
    {
      id: "isp",
      label: "ISP Diagnóstico",
      icon: Shield,
      badge: null,
    },
    {
      id: "roi",
      label: "ROI em Saúde",
      icon: DollarSign,
      badge: null,
    },
    {
      id: "questionnaires",
      label: "Questionários",
      icon: FileText,
      badge: "12",
    },
    {
      id: "data",
      label: "Dados de Saúde",
      icon: Database,
      badge: "7",
    },
    {
      id: "ai-agents",
      label: "IA Agents",
      icon: Bot,
      badge: "5",
    },
    {
      id: "academy",
      label: "Academy",
      icon: GraduationCap,
      badge: null,
    },
    {
      id: "benefits",
      label: "Benefícios",
      icon: Gift,
      badge: "4",
    },
    {
      id: "wellness",
      label: "Programas de Bem-Estar",
      icon: Heart,
      badge: "12",
    },
    {
      id: "sinistralidade",
      label: "Redução Sinistralidade",
      icon: AlertTriangle,
      badge: "URGENTE",
    },
    {
      id: "export",
      label: "Exportar Dados",
      icon: Download,
      badge: "Novo",
    },
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      badge: null,
    },
    {
      id: "help",
      label: "Ajuda",
      icon: HelpCircle,
      badge: null,
    },
  ]

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">UHealth</h1>
              <p className="text-xs text-gray-500">v2.1.0</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start text-left ${collapsed ? "px-2" : "px-3"} ${
                  isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className={`h-4 w-4 ${collapsed ? "" : "mr-3"} flex-shrink-0`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate text-sm">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={
                          item.badge === "URGENTE" ? "destructive" : item.badge === "Novo" ? "default" : "secondary"
                        }
                        className="ml-2 text-xs px-1.5 py-0.5"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
