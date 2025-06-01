"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart3,
  TrendingUp,
  FileText,
  Bot,
  BookOpen,
  Target,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Users,
  HelpCircle,
  Database,
  DollarSign,
  Calculator,
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
      label: "Dashboard",
      icon: BarChart3,
      badge: null,
      description: "Visão geral executiva",
    },
    {
      id: "analytics",
      label: "Análises Preditivas",
      icon: TrendingUp,
      badge: "3",
      description: "Modelos de IA e previsões",
    },
    {
      id: "isp",
      label: "ISP Diagnóstico",
      icon: Target,
      badge: null,
      description: "Índice de Saúde e Performance",
    },
    {
      id: "roi",
      label: "ROI em Saúde",
      icon: DollarSign,
      badge: "Novo",
      description: "Retorno sobre investimento em saúde",
    },
    {
      id: "performance",
      label: "Performance",
      icon: Activity,
      badge: null,
      description: "Análise de performance por departamento",
    },
    {
      id: "investment-simulator",
      label: "Simulador ROI",
      icon: Calculator,
      badge: null,
      description: "Simulador de cenários de investimento",
    },
    {
      id: "questionnaires",
      label: "Questionários",
      icon: FileText,
      badge: "12",
      description: "Avaliações e formulários",
    },
    {
      id: "data",
      label: "Dados de Saúde",
      icon: Database,
      badge: "7",
      description: "Integração de dados",
    },
    {
      id: "ai-agents",
      label: "IA Agents",
      icon: Bot,
      badge: "5",
      description: "Consultores virtuais especializados",
    },
    {
      id: "education",
      label: "Educação",
      icon: BookOpen,
      badge: null,
      description: "Cursos e trilhas de aprendizado",
    },
    {
      id: "benefits",
      label: "Benefícios",
      icon: DollarSign,
      badge: "4",
      description: "Analytics de benefícios corporativos",
    },
  ]

  const bottomItems = [
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      description: "Configurações do sistema",
    },
    {
      id: "help",
      label: "Ajuda",
      icon: HelpCircle,
      description: "Suporte e documentação",
    },
  ]

  const MenuItem = ({ item, isBottom = false }) => {
    const isActive = activeSection === item.id

    const button = (
      <Button
        variant={isActive ? "default" : "ghost"}
        className={`w-full justify-start h-12 ${collapsed ? "px-3" : "px-4"} ${
          isActive
            ? "bg-primary text-primary-foreground shadow-lg"
            : "text-foreground hover:bg-muted hover:text-foreground"
        } transition-all duration-200`}
        onClick={() => onSectionChange(item.id)}
      >
        <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"} flex-shrink-0`} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            {item.badge && (
              <Badge
                variant={isActive ? "secondary" : "outline"}
                className={`ml-2 ${isActive ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30" : ""} ${
                  item.badge === "Novo" ? "bg-green-100 text-green-800 border-green-200" : ""
                }`}
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Button>
    )

    if (collapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return button
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-background/95 backdrop-blur-md border-r border-border shadow-lg transition-all duration-300 z-40 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <img src="/ukor-logo.svg" alt="Ukor" className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  UHealth
                </h1>
                <p className="text-xs text-muted-foreground">v2.1.0</p>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-primary"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Status */}
      {!collapsed && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Activity className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-foreground">Sistema Ativo</span>
            <Badge className="bg-primary/20 text-primary border-primary/20 text-xs">Online</Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">1,247 usuários conectados</span>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </div>

      {/* Bottom Items */}
      <div className="border-t border-border p-3">
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <MenuItem key={item.id} item={item} isBottom />
          ))}
        </nav>
      </div>
    </div>
  )
}
