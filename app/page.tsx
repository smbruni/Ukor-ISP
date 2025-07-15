"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  User,
  BarChart3,
  TrendingUp,
  Brain,
  BookOpen,
  Settings,
  Target,
  DollarSign,
  FileText,
  Database,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  HeartHandshake,
  TrendingDown,
  Stethoscope,
  Download,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { ROIContent } from "@/components/roi/roi-content"
import { QuestionnairesContent } from "@/components/questionnaires/questionnaires-content"
import { DataContent } from "@/components/data/data-content"
import { ISPContent } from "@/components/isp/isp-content"
import { AcademyContent } from "@/components/academy/academy-content"
import { BenefitsContent } from "@/components/benefits/benefits-content"
import { SettingsContent } from "@/components/settings/settings-content"
import { UnimedAnalysis } from "@/components/health-plans/unimed-analysis"
import { PredictiveAnalysis } from "@/components/predictive/predictive-analysis"
import { CareManagement } from "@/components/care/care-management"
import { SinistralidadeReductionProgram } from "@/components/sinistralidade/reduction-program"
import { AIAgentsContent } from "@/components/ai-agents/ai-agents-content"
import { CareLinesContent } from "@/components/care-lines/care-lines-content"
import { ExportData } from "@/components/export/export-data"
import PerformanceEvaluation from "@/components/performance/performance-evaluation"

import DashboardContent from "@/components/dashboard/dashboard-content" // moved out for brevity (keeps original dashboard code)

function Header({ notifications, onClearNotifications }) {
  const unread = notifications.filter((n) => !n.read).length
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Ukor Health Analytics</h1>
          <Badge className="bg-red-100 text-red-800 border-red-200">Dados Reais Unimed-BH</Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unread}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b flex items-center justify-between">
                <h3 className="font-semibold">Notificações</h3>
                <Button variant="ghost" size="sm" onClick={onClearNotifications}>
                  Limpar todas
                </Button>
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">Nenhuma notificação</div>
              ) : (
                notifications.map((n) => (
                  <DropdownMenuItem key={n.id} className="p-3">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{n.title}</span>
                        {!n.read && <div className="h-2 w-2 bg-primary rounded-full" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{n.message}</p>
                      <span className="text-xs text-muted-foreground">{new Date(n.timestamp).toLocaleString()}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function Sidebar({ active, setActive, collapsed, toggle }) {
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "unimed", label: "Análise Unimed", icon: Shield, badge: "Novo" },
    { id: "care-lines", label: "Linhas de Cuidado", icon: Stethoscope, badge: "10" },
    { id: "analytics", label: "Análises Preditivas", icon: TrendingUp, badge: "3" },
    { id: "performance", label: "Avaliação de Desempenho", icon: Award, badge: "Novo" },
    { id: "isp", label: "ISP Diagnóstico", icon: Target },
    { id: "roi", label: "ROI em Saúde", icon: DollarSign },
    { id: "questionnaires", label: "Questionários", icon: FileText, badge: "12" },
    { id: "data", label: "Dados de Saúde", icon: Database, badge: "7" },
    { id: "ai-agents", label: "IA Agents", icon: Brain, badge: "5" },
    { id: "education", label: "Academy", icon: BookOpen },
    { id: "benefits", label: "Benefícios", icon: DollarSign, badge: "4" },
    { id: "care-management", label: "Gestão de Cuidados", icon: HeartHandshake, badge: "47" },
    { id: "sinistralidade-reduction", label: "Redução Sinistralidade", icon: TrendingDown, badge: "URGENTE" },
    { id: "export", label: "Exportar Dados", icon: Download, badge: "Novo" },
  ]
  const bottom = [
    { id: "settings", label: "Configurações", icon: Settings },
    { id: "help", label: "Ajuda", icon: HelpCircle },
  ]

  const Item = ({ item }) => (
    <button
      className={`w-full flex items-center px-4 py-3 transition-colors ${
        active === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      } ${collapsed ? "justify-center" : "text-left"}`}
      onClick={() => setActive(item.id)}
    >
      <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
      {!collapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <Badge
              variant={active === item.id ? "secondary" : "outline"}
              className={`ml-2 ${
                item.badge === "Novo"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : item.badge === "URGENTE"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : ""
              }`}
            >
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </button>
  )

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-background/95 backdrop-blur-md border-r border-border shadow-lg transition-all duration-300 z-40 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                UHealth
              </h1>
              <p className="text-xs text-muted-foreground">v2.1.0</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={toggle} className="text-muted-foreground hover:text-primary">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menu.map((m) => (
          <Item item={m} key={m.id} />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        {bottom.map((m) => (
          <Item item={m} key={m.id} />
        ))}
      </div>
    </aside>
  )
}

export default function Home() {
  const [section, setSection] = useState<string>("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Risco de Burnout",
      message: "23 colaboradores em alto risco.",
      timestamp: Date.now() - 60000,
      read: false,
    },
    {
      id: 2,
      title: "Sinistralidade Crítica",
      message: "Sinistralidade atingiu 110.04%.",
      timestamp: Date.now() - 3600000,
      read: false,
    },
  ])

  const clearNotifications = () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar active={section} setActive={setSection} collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />
      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        <Header notifications={notifications} onClearNotifications={clearNotifications} />
        <main className="p-6 space-y-6">
          {section === "dashboard" && <DashboardContent />}
          {section === "unimed" && <UnimedAnalysis />}
          {section === "care-lines" && <CareLinesContent />}
          {section === "analytics" && <PredictiveAnalysis />}
          {section === "performance" && <PerformanceEvaluation />}
          {section === "ai-agents" && <AIAgentsContent />}
          {section === "isp" && <ISPContent />}
          {section === "roi" && <ROIContent />}
          {section === "questionnaires" && <QuestionnairesContent />}
          {section === "data" && <DataContent />}
          {section === "education" && <AcademyContent />}
          {section === "benefits" && <BenefitsContent />}
          {section === "settings" && <SettingsContent />}
          {section === "help" && <div>Help Content</div>}
          {section === "care-management" && <CareManagement />}
          {section === "sinistralidade-reduction" && <SinistralidadeReductionProgram />}
          {section === "export" && <ExportData />}
        </main>
      </div>
    </div>
  )
}
