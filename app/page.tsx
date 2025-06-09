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
  Activity,
  DollarSign,
  FileText,
  Database,
  HelpCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Heart,
  Shield,
  HeartHandshake,
  TrendingDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts"
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
import { PediatricAnalysis } from "@/components/pediatric/pediatric-analysis"
import { AIAgentsContent } from "@/components/ai-agents/ai-agents-content"

// Header Component
function Header({ notifications, onClearNotifications }) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Ukor Health Analytics</h1>
          <Badge className="bg-red-100 text-red-800 border-red-200">Dados Reais Unimed-BH</Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
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
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notificações</h3>
                  <Button variant="ghost" size="sm" onClick={onClearNotifications}>
                    Limpar todas
                  </Button>
                </div>
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">Nenhuma notificação</div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-3">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{notification.title}</span>
                        {!notification.read && <div className="h-2 w-2 bg-primary rounded-full" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
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

// Sidebar Component
function Sidebar({ activeSection, onSectionChange, collapsed, onToggleCollapse }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      badge: null,
      description: "Visão geral executiva",
    },
    {
      id: "unimed",
      label: "Análise Unimed",
      icon: Shield,
      badge: "Novo",
      description: "Dados reais Grupo Fedla",
    },
    {
      id: "predictive",
      label: "IA Preditiva",
      icon: Brain,
      badge: "IA",
      description: "Modelos preditivos avançados",
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
      badge: null,
      description: "Retorno sobre investimento em saúde",
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
      icon: Brain,
      badge: "5",
      description: "Consultores virtuais especializados",
    },
    {
      id: "education",
      label: "Academy",
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
    {
      id: "care-management",
      label: "Gestão de Cuidados",
      icon: HeartHandshake,
      badge: "47",
      description: "Cuidados individuais e escalamento",
    },
    {
      id: "sinistralidade-reduction",
      label: "Redução Sinistralidade",
      icon: TrendingDown,
      badge: "URGENTE",
      description: "Programa 110% → 75% em 6 meses",
    },
    {
      id: "pediatric-analysis",
      label: "Análise Pediátrica",
      icon: Heart,
      badge: "NOVO",
      description: "Análise detalhada de exames pediátricos",
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

    return (
      <button
        className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
          isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted hover:text-foreground"
        } ${collapsed ? "justify-center" : ""}`}
        onClick={() => onSectionChange(item.id)}
      >
        <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"} flex-shrink-0`} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            {item.badge && (
              <Badge
                variant={isActive ? "secondary" : "outline"}
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
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-background/95 backdrop-blur-md border-r border-border shadow-lg transition-all duration-300 z-40 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">U</span>
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

      {!collapsed && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Activity className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-foreground">Sistema Ativo</span>
            <Badge className="bg-primary/20 text-primary border-primary/20 text-xs">Online</Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">987 beneficiários Unimed</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </div>

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

// Dashboard Content atualizado com dados da Unimed
function DashboardContent() {
  const ispData = [
    { month: "Abr/24", isp: 65, sinistralidade: 171.05 },
    { month: "Mai/24", isp: 68, sinistralidade: 86.21 },
    { month: "Jun/24", isp: 72, sinistralidade: 72.33 },
    { month: "Jul/24", isp: 69, sinistralidade: 121.9 },
    { month: "Ago/24", isp: 74, sinistralidade: 88.33 },
    { month: "Set/24", isp: 78, sinistralidade: 85.9 },
    { month: "Out/24", isp: 65, sinistralidade: 231.61 },
    { month: "Nov/24", isp: 68, sinistralidade: 158.66 },
    { month: "Dez/24", isp: 71, sinistralidade: 140.91 },
    { month: "Jan/25", isp: 75, sinistralidade: 77.39 },
    { month: "Fev/25", isp: 73, sinistralidade: 103.84 },
    { month: "Mar/25", isp: 78, sinistralidade: 51.75 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Executivo - Grupo Fedla</h2>
        <p className="text-muted-foreground">Análise baseada em dados reais da Unimed-BH (ABR/24 à MAR/25)</p>
      </div>

      {/* Alerta de Sinistralidade Crítica */}
      <Card className="border-l-4 border-l-red-500 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            Situação Crítica - Sinistralidade Elevada
          </CardTitle>
          <CardDescription className="text-red-700">
            Sinistralidade acumulada de 110,04% - Reajuste de 25% aplicado para 2025
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sinistralidade</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">110.04%</div>
            <p className="text-xs text-muted-foreground">Meta: 75%</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+35% acima da meta</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Custo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.8M</div>
            <p className="text-xs text-muted-foreground">12 meses</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>Reajuste 25% em 2025</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Beneficiários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">987</div>
            <p className="text-xs text-muted-foreground">957 utilizaram (97%)</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>Alta adesão à rede</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Internações</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123</div>
            <p className="text-xs text-muted-foreground">48% do custo total</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>R$ 11K custo médio</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Casos Crônicos</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">R$ 1.18M (42% custo)</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>4 casos oncológicos</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Prevenção</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">6.86%</div>
            <p className="text-xs text-muted-foreground">Sangue oculto (crítico)</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>Risco diagnóstico tardio</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Evolução da Sinistralidade vs ISP</CardTitle>
            <CardDescription>Correlação entre sinistralidade e índice de saúde - Dados reais Unimed</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={ispData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="isp" stroke="#8884d8" strokeWidth={2} name="ISP" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sinistralidade"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Sinistralidade %"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas Críticos</CardTitle>
            <CardDescription>Situações que requerem atenção imediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Sinistralidade Crítica</h4>
                  <p className="text-xs text-muted-foreground">110% - Reajuste 25% aplicado</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Casos Oncológicos</h4>
                  <p className="text-xs text-muted-foreground">4 casos ativos - R$ 406K em custos</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Shield className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Prevenção Crítica</h4>
                  <p className="text-xs text-muted-foreground">Sangue oculto: apenas 6.86% cobertura</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Concentração de Custos</h4>
                  <p className="text-xs text-muted-foreground">10 usuários = 42% do custo total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Sinistralidade Crítica",
      message: "Grupo Fedla atingiu 110% de sinistralidade. Ação imediata necessária.",
      timestamp: Date.now() - 60000,
      read: false,
    },
    {
      id: 2,
      title: "Casos Oncológicos",
      message: "4 novos casos oncológicos identificados. Gestão de crônicos recomendada.",
      timestamp: Date.now() - 3600000,
      read: false,
    },
    {
      id: 3,
      title: "Prevenção Crítica",
      message: "Cobertura de sangue oculto em 6.86% - risco de diagnósticos tardios.",
      timestamp: Date.now() - 86400000,
      read: true,
    },
  ])

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleClearNotifications = () => {
    setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        <Header notifications={notifications} onClearNotifications={handleClearNotifications} />

        <main className="p-6">
          {activeSection === "dashboard" && <DashboardContent />}
          {activeSection === "unimed" && <UnimedAnalysis />}
          {activeSection === "analytics" && <PredictiveAnalysis />}
          {activeSection === "ai-agents" && <AIAgentsContent />}
          {activeSection === "isp" && <ISPContent />}
          {activeSection === "roi" && <ROIContent />}
          {activeSection === "questionnaires" && <QuestionnairesContent />}
          {activeSection === "data" && <DataContent />}
          {activeSection === "education" && <AcademyContent />}
          {activeSection === "benefits" && <BenefitsContent />}
          {activeSection === "settings" && <SettingsContent />}
          {activeSection === "help" && <div>Help Content</div>}
          {activeSection === "predictive" && <PredictiveAnalysis />}
          {activeSection === "care-management" && <CareManagement />}
          {activeSection === "sinistralidade-reduction" && <SinistralidadeReductionProgram />}
          {activeSection === "pediatric-analysis" && <PediatricAnalysis />}
        </main>
      </div>
    </div>
  )
}
