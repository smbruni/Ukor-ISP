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
  Stethoscope,
  Download,
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
import { AIAgentsContent } from "@/components/ai-agents/ai-agents-content"
import { CareLinesContent } from "@/components/care-lines/care-lines-content"
import { ExportData } from "@/components/export/export-data"

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
      id: "care-lines",
      label: "Linhas de Cuidado",
      icon: Stethoscope,
      badge: "10",
      description: "Protocolos estratégicos de saúde",
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
      id: "export",
      label: "Exportar Dados",
      icon: Download,
      badge: "Novo",
      description: "Relatórios e exportação de dados",
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
      className={`fixed left-0 top-0 h-screen bg-background/95 backdrop-blur-md border-r border-border shadow-lg transition-all duration-300 z-40 flex flex-col ${
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

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 min-h-0">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </div>

      {/* Bottom Items */}
      <div className="border-t border-border p-3 flex-shrink-0">
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <MenuItem key={item.id} item={item} isBottom />
          ))}
        </nav>
      </div>
    </div>
  )
}

// Dashboard Content atualizado com indicadores corporativos de saúde
function DashboardContent() {
  const healthPerformanceData = [
    { month: "Abr/24", absenteismo: 4.2, produtividade: 78, engajamento: 65 },
    { month: "Mai/24", absenteismo: 3.8, produtividade: 82, engajamento: 68 },
    { month: "Jun/24", absenteismo: 3.5, produtividade: 85, engajamento: 72 },
    { month: "Jul/24", absenteismo: 4.1, produtividade: 79, engajamento: 69 },
    { month: "Ago/24", absenteismo: 3.2, produtividade: 88, engajamento: 74 },
    { month: "Set/24", absenteismo: 2.9, produtividade: 91, engajamento: 78 },
    { month: "Out/24", absenteismo: 3.7, produtividade: 83, engajamento: 71 },
    { month: "Nov/24", absenteismo: 3.4, produtividade: 86, engajamento: 75 },
    { month: "Dez/24", absenteismo: 3.1, produtividade: 89, engajamento: 77 },
    { month: "Jan/25", absenteismo: 2.8, produtividade: 92, engajamento: 81 },
    { month: "Fev/25", absenteismo: 3.0, produtividade: 90, engajamento: 79 },
    { month: "Mar/25", absenteismo: 2.6, produtividade: 94, engajamento: 83 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Executivo - Saúde e Performance Corporativa</h2>
        <p className="text-muted-foreground">Indicadores integrados de bem-estar, produtividade e impacto financeiro</p>
      </div>

      {/* Alerta de Burnout Preditivo */}
      <Card className="border-l-4 border-l-amber-500 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            Alerta Preditivo - Risco de Burnout Elevado
          </CardTitle>
          <CardDescription className="text-amber-700">
            23 colaboradores com alto risco de burnout identificados pela IA - Intervenção recomendada
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absenteísmo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2.6%</div>
            <p className="text-xs text-muted-foreground">Meta: &lt;2.5%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-38% vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Presenteísmo</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">18%</div>
            <p className="text-xs text-muted-foreground">Produtividade reduzida</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>Estresse e dores</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sinistralidade</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">68%</div>
            <p className="text-xs text-muted-foreground">Meta: &lt;75%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-15% vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Turnover</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground">Meta: &lt;10%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>Dentro da meta</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">83%</div>
            <p className="text-xs text-muted-foreground">eNPS: +45</p>
            <div className="mt-2 flex items-center text-xs text-blue-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+18% vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellbeing Score</CardTitle>
            <CardDescription>Escala 0-10</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7.8</div>
            <p className="text-xs text-muted-foreground">Meta: &gt;7.5</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+1.2 vs ano anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Evolução: Absenteísmo vs Produtividade vs Engajamento</CardTitle>
            <CardDescription>Correlação entre indicadores de saúde e performance organizacional</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={healthPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="absenteismo"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Absenteísmo %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="produtividade"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Produtividade %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="engajamento"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Engajamento %"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas e Insights</CardTitle>
            <CardDescription>Situações que requerem atenção imediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Risco de Burnout</h4>
                  <p className="text-xs text-muted-foreground">23 colaboradores em risco alto</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Heart className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Doenças Crônicas</h4>
                  <p className="text-xs text-muted-foreground">34% com hipertensão/diabetes</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Presenteísmo Elevado</h4>
                  <p className="text-xs text-muted-foreground">18% com produtividade reduzida</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <DollarSign className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">ROI Positivo</h4>
                  <p className="text-xs text-muted-foreground">R$ 2.4M economia em bem-estar</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nova seção com indicadores financeiros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Custo Afastamentos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 340K</div>
            <p className="text-xs text-muted-foreground">INSS + Plano de saúde</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-22% vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI Bem-Estar</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">340%</div>
            <p className="text-xs text-muted-foreground">Retorno sobre investimento</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>R$ 3.40 para cada R$ 1</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Atestados/Colaborador</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1</div>
            <p className="text-xs text-muted-foreground">Por ano</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-0.8 vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Horas Extras</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">12%</div>
            <p className="text-xs text-muted-foreground">Acima da carga normal</p>
            <div className="mt-2 flex items-center text-xs text-amber-500">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>Risco de sobrecarga</span>
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
          {activeSection === "care-lines" && <CareLinesContent />}
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
          {activeSection === "care-management" && <CareManagement />}
          {activeSection === "sinistralidade-reduction" && <SinistralidadeReductionProgram />}
          {activeSection === "export" && <ExportData />}
        </main>
      </div>
    </div>
  )
}
