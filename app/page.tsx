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
  Clock,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Heart,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Cell,
} from "recharts"
import { ROIContent } from "@/components/roi/roi-content"
import { QuestionnairesContent } from "@/components/questionnaires/questionnaires-content"
import { DataContent } from "@/components/data/data-content"
import { ISPContent } from "@/components/isp/isp-content"
import { AcademyContent } from "@/components/academy/academy-content"
import { BenefitsContent } from "@/components/benefits/benefits-content"
import { SettingsContent } from "@/components/settings/settings-content"

// Header Component
function Header({ notifications, onClearNotifications }) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Ukor Health Analytics</h1>
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
                className={`ml-2 ${item.badge === "Novo" ? "bg-green-100 text-green-800 border-green-200" : ""}`}
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
            <span className="text-muted-foreground">1,247 usuários conectados</span>
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

// Dashboard Content
function DashboardContent() {
  const ispData = [
    { month: "Jan", isp: 65 },
    { month: "Fev", isp: 68 },
    { month: "Mar", isp: 72 },
    { month: "Abr", isp: 69 },
    { month: "Mai", isp: 74 },
    { month: "Jun", isp: 78 },
  ]

  const departmentPerformanceData = [
    { department: "TI", isp: 78, employees: 145 },
    { department: "Marketing", isp: 72, employees: 67 },
    { department: "Vendas", isp: 69, employees: 89 },
    { department: "RH", isp: 85, employees: 23 },
    { department: "Financeiro", isp: 74, employees: 34 },
    { department: "Operações", isp: 66, employees: 156 },
  ]

  const riskMatrixData = [
    { department: "TI", probability: 75, impact: 85, risk: "Alto", color: "#ef4444" },
    { department: "Marketing", probability: 45, impact: 60, risk: "Médio", color: "#f59e0b" },
    { department: "Vendas", probability: 80, impact: 70, risk: "Alto", color: "#ef4444" },
    { department: "RH", probability: 25, impact: 40, risk: "Baixo", color: "#22c55e" },
    { department: "Financeiro", probability: 50, impact: 55, risk: "Médio", color: "#f59e0b" },
    { department: "Operações", probability: 65, impact: 75, risk: "Alto", color: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Executivo</h2>
        <p className="text-muted-foreground">Visão geral dos principais indicadores de saúde e performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI em Saúde</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.8M</div>
            <p className="text-xs text-muted-foreground">ROI de 340%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+12% vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sinistralidade</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8%</div>
            <p className="text-xs text-muted-foreground">Meta: 15%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-5% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risco de Burnout</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">Alto</div>
            <p className="text-xs text-muted-foreground">23 colaboradores em risco</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+3 vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carga de Trabalho</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Meta: 70%</p>
            <div className="mt-2 flex items-center text-xs text-amber-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+8% acima da meta</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absenteísmo</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">Meta: 4%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-0.8% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4</div>
            <p className="text-xs text-muted-foreground">Score de 0-10</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+0.3 vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Evolução do ISP</CardTitle>
            <CardDescription>Índice de Saúde e Performance ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={ispData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="isp" stroke="#8884d8" strokeWidth={2} />
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
                  <h4 className="font-medium text-sm">Risco de Burnout</h4>
                  <p className="text-xs text-muted-foreground">Departamento de TI com 8 casos</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Sobrecarga de Trabalho</h4>
                  <p className="text-xs text-muted-foreground">Equipe de Desenvolvimento</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Moon className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Qualidade de Sono</h4>
                  <p className="text-xs text-muted-foreground">15 colaboradores com sono crítico</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance por Departamento</CardTitle>
            <CardDescription>Comparativo de ISP entre departamentos</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name) => [
                    name === "isp" ? `${value} pontos` : value,
                    name === "isp" ? "ISP" : name === "employees" ? "Funcionários" : name,
                  ]}
                  labelFormatter={(label) => `Departamento: ${label}`}
                />
                <Bar dataKey="isp" name="ISP">
                  {departmentPerformanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.isp >= 80
                          ? "#22c55e"
                          : entry.isp >= 70
                            ? "#3b82f6"
                            : entry.isp >= 60
                              ? "#f59e0b"
                              : "#ef4444"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Matriz de Risco</CardTitle>
            <CardDescription>Probabilidade vs. Impacto por departamento</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="relative h-full">
              <div className="grid grid-cols-3 grid-rows-3 h-full border-2 border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-yellow-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-yellow-800">
                  Médio
                </div>
                <div className="bg-red-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-red-800">
                  Alto
                </div>
                <div className="bg-red-200 border border-gray-200 flex items-center justify-center text-xs font-medium text-red-900">
                  Crítico
                </div>

                <div className="bg-green-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-green-800">
                  Baixo
                </div>
                <div className="bg-yellow-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-yellow-800">
                  Médio
                </div>
                <div className="bg-red-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-red-800">
                  Alto
                </div>

                <div className="bg-green-200 border border-gray-200 flex items-center justify-center text-xs font-medium text-green-900">
                  Muito Baixo
                </div>
                <div className="bg-green-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-green-800">
                  Baixo
                </div>
                <div className="bg-yellow-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-yellow-800">
                  Médio
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none">
                {riskMatrixData.map((dept, index) => {
                  const x = (dept.probability / 100) * 100
                  const y = 100 - (dept.impact / 100) * 100

                  return (
                    <div
                      key={dept.department}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      style={{
                        left: `${Math.max(8, Math.min(92, x))}%`,
                        top: `${Math.max(8, Math.min(92, y))}%`,
                      }}
                    >
                      <div
                        className={`
                         w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg cursor-pointer
                         ${dept.risk === "Alto" ? "bg-red-500" : dept.risk === "Médio" ? "bg-yellow-500" : "bg-green-500"}
                       `}
                        title={`${dept.department}: ${dept.risk} (P:${dept.probability}% I:${dept.impact}%)`}
                      >
                        {dept.department.substring(0, 2)}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-sm font-medium text-gray-600">
                Probabilidade →
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 -rotate-90 text-sm font-medium text-gray-600">
                Impacto ↑
              </div>

              <div className="absolute bottom-0 left-0 text-xs text-gray-500">Baixa</div>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500">Alta</div>
              <div className="absolute top-0 left-0 text-xs text-gray-500">Alto</div>
              <div className="absolute bottom-0 left-0 text-xs text-gray-500">Baixo</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Departamentos:</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {riskMatrixData.map((dept) => (
                    <div key={dept.department} className="flex items-center space-x-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          dept.risk === "Alto" ? "bg-red-500" : dept.risk === "Médio" ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      ></div>
                      <span>{dept.department}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Níveis de Risco:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Baixo/Muito Baixo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Médio</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Alto/Crítico</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Analytics Content
function AnalyticsContent() {
  const [selectedModel, setSelectedModel] = useState("burnout")
  const [timeRange, setTimeRange] = useState("3m")

  const modelsData = {
    burnout: {
      title: "Modelo de Burnout",
      description: "Previsão de risco de esgotamento profissional",
      accuracy: 94.2,
      alerts: 23,
      prevented: 156,
      savings: 890,
      chartData: [
        { month: "Jan", risco: 15, atual: 12 },
        { month: "Fev", risco: 18, atual: 14 },
        { month: "Mar", risco: 22, atual: 19 },
        { month: "Abr", risco: 25, atual: 23 },
        { month: "Mai", risco: 28, atual: 26 },
        { month: "Jun", risco: 32, atual: 29 },
      ],
      factors: [
        { name: "Sobrecarga de trabalho", value: 85, color: "bg-red-500" },
        { name: "Qualidade do sono", value: 72, color: "bg-amber-500" },
        { name: "Estresse percebido", value: 78, color: "bg-red-500" },
        { name: "Suporte social", value: 45, color: "bg-green-500" },
      ],
      alerts_list: [
        { name: "João Silva - Desenvolvimento", risk: 89, action: "Intervenção imediata", type: "danger" },
        { name: "Maria Santos - Marketing", risk: 67, action: "Monitoramento", type: "warning" },
        { name: "Carlos Oliveira - Vendas", risk: 45, action: "Prevenção", type: "info" },
      ],
    },
    productivity: {
      title: "Modelo de Produtividade",
      description: "Previsão de performance e eficiência da equipe",
      accuracy: 91.8,
      alerts: 12,
      prevented: 89,
      savings: 650,
      chartData: [
        { month: "Jan", risco: 85, atual: 82 },
        { month: "Fev", risco: 87, atual: 84 },
        { month: "Mar", risco: 89, atual: 88 },
        { month: "Abr", risco: 91, atual: 89 },
        { month: "Mai", risco: 88, atual: 87 },
        { month: "Jun", risco: 90, atual: 89 },
      ],
      factors: [
        { name: "Engajamento da equipe", value: 78, color: "bg-blue-500" },
        { name: "Carga de trabalho", value: 85, color: "bg-amber-500" },
        { name: "Ferramentas adequadas", value: 92, color: "bg-green-500" },
        { name: "Ambiente de trabalho", value: 76, color: "bg-blue-500" },
      ],
      alerts_list: [
        { name: "Equipe Frontend - TI", risk: 92, action: "Otimizar processos", type: "success" },
        { name: "Time Vendas B2B", risk: 78, action: "Revisar metas", type: "warning" },
        { name: "Marketing Digital", risk: 85, action: "Manter estratégia", type: "info" },
      ],
    },
    turnover: {
      title: "Modelo de Rotatividade",
      description: "Previsão de risco de saída de colaboradores",
      accuracy: 88.5,
      alerts: 18,
      prevented: 67,
      savings: 1200,
      chartData: [
        { month: "Jan", risco: 8.5, atual: 7.2 },
        { month: "Fev", risco: 9.1, atual: 8.8 },
        { month: "Mar", risco: 10.2, atual: 9.5 },
        { month: "Abr", risco: 11.8, atual: 10.1 },
        { month: "Mai", risco: 12.5, atual: 11.3 },
        { month: "Jun", risco: 13.2, atual: 12.8 },
      ],
      factors: [
        { name: "Satisfação no trabalho", value: 65, color: "bg-red-500" },
        { name: "Oportunidades de crescimento", value: 58, color: "bg-red-500" },
        { name: "Relacionamento com gestor", value: 72, color: "bg-amber-500" },
        { name: "Compensação e benefícios", value: 81, color: "bg-green-500" },
      ],
      alerts_list: [
        { name: "Ana Costa - Desenvolvimento", risk: 87, action: "Conversa com RH urgente", type: "danger" },
        { name: "Pedro Lima - Marketing", risk: 73, action: "Plano de retenção", type: "warning" },
        { name: "Julia Santos - Vendas", risk: 68, action: "Acompanhamento mensal", type: "warning" },
      ],
    },
    absenteeism: {
      title: "Modelo de Absenteísmo",
      description: "Previsão de padrões de ausência e afastamentos",
      accuracy: 92.3,
      alerts: 15,
      prevented: 124,
      savings: 780,
      chartData: [
        { month: "Jan", risco: 3.8, atual: 3.2 },
        { month: "Fev", risco: 4.2, atual: 3.9 },
        { month: "Mar", risco: 4.8, atual: 4.1 },
        { month: "Abr", risco: 5.1, atual: 4.7 },
        { month: "Mai", risco: 4.9, atual: 4.3 },
        { month: "Jun", risco: 4.5, atual: 4.0 },
      ],
      factors: [
        { name: "Histórico de saúde", value: 78, color: "bg-amber-500" },
        { name: "Estresse no trabalho", value: 82, color: "bg-red-500" },
        { name: "Distância do trabalho", value: 45, color: "bg-green-500" },
        { name: "Carga horária", value: 71, color: "bg-amber-500" },
      ],
      alerts_list: [
        { name: "Roberto Silva - Operações", risk: 84, action: "Avaliação médica", type: "danger" },
        { name: "Carla Mendes - Atendimento", risk: 71, action: "Flexibilização horário", type: "warning" },
        { name: "Marcos Oliveira - Logística", risk: 66, action: "Acompanhamento preventivo", type: "warning" },
      ],
    },
  }

  const currentModel = modelsData[selectedModel]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análises Preditivas</h2>
        <p className="text-muted-foreground">Modelos de IA para previsão de riscos e tendências de saúde</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="burnout">Modelo de Burnout</option>
          <option value="productivity">Modelo de Produtividade</option>
          <option value="turnover">Modelo de Rotatividade</option>
          <option value="absenteeism">Modelo de Absenteísmo</option>
        </select>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="3m">Próximos 3 meses</option>
          <option value="6m">Próximos 6 meses</option>
          <option value="1y">Próximo ano</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentModel.title}</CardTitle>
          <CardDescription>{currentModel.description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Acurácia do Modelo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentModel.accuracy}%</div>
            <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Alertas Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{currentModel.alerts}</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Casos Prevenidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{currentModel.prevented}</div>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Economia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {currentModel.savings}K</div>
            <p className="text-xs text-muted-foreground">Em custos evitados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Previsão vs Realidade</CardTitle>
            <CardDescription>Comparativo entre previsão do modelo e dados reais</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={currentModel.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="risco" stroke="#ef4444" strokeWidth={2} name="Previsão" />
                <Line type="monotone" dataKey="atual" stroke="#3b82f6" strokeWidth={2} name="Atual" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fatores de Influência</CardTitle>
            <CardDescription>Principais indicadores que afetam o modelo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentModel.factors.map((factor, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{factor.name}</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className={`${factor.color} h-2 rounded-full`} style={{ width: `${factor.value}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{factor.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas Preditivos em Tempo Real</CardTitle>
          <CardDescription>Casos identificados pelo modelo que requerem atenção</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentModel.alerts_list.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                  alert.type === "danger"
                    ? "bg-red-50 border-red-500"
                    : alert.type === "warning"
                      ? "bg-amber-50 border-amber-500"
                      : alert.type === "success"
                        ? "bg-green-50 border-green-500"
                        : "bg-blue-50 border-blue-500"
                }`}
              >
                <div>
                  <h4
                    className={`font-medium ${
                      alert.type === "danger"
                        ? "text-red-800"
                        : alert.type === "warning"
                          ? "text-amber-800"
                          : alert.type === "success"
                            ? "text-green-800"
                            : "text-blue-800"
                    }`}
                  >
                    {alert.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      alert.type === "danger"
                        ? "text-red-600"
                        : alert.type === "warning"
                          ? "text-amber-600"
                          : alert.type === "success"
                            ? "text-green-600"
                            : "text-blue-600"
                    }`}
                  >
                    {selectedModel === "productivity" ? "Produtividade" : "Risco de burnout"}: {alert.risk}% | Ação
                    recomendada: {alert.action}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// AI Agents Content
function AIAgentsContent() {
  const [selectedAgent, setSelectedAgent] = useState(null)

  const agents = [
    {
      id: 1,
      name: "Nutri IA",
      role: "Nutricionista Virtual",
      description: "Especialista em nutrição corporativa e hábitos alimentares saudáveis",
      avatar: "🥗",
      specialties: [
        "Planejamento nutricional",
        "Análise de hábitos alimentares",
        "Receitas saudáveis",
        "Educação nutricional",
      ],
      status: "online",
      conversations: 1247,
      rating: 4.9,
      lastMessage: "Olá! Como posso ajudar com sua alimentação hoje?",
    },
    {
      id: 2,
      name: "Mente Sã",
      role: "Mental Coach",
      description: "Coach especializado em saúde mental e bem-estar emocional",
      avatar: "🧠",
      specialties: ["Gestão de estresse", "Ansiedade", "Mindfulness", "Equilíbrio emocional"],
      status: "online",
      conversations: 892,
      rating: 4.8,
      lastMessage: "Vamos trabalhar juntos para fortalecer sua saúde mental!",
    },
    {
      id: 3,
      name: "Fit Coach",
      role: "Personal Trainer Virtual",
      description: "Personal trainer especializado em exercícios para ambiente corporativo",
      avatar: "💪",
      specialties: ["Exercícios no escritório", "Ergonomia", "Condicionamento físico", "Prevenção de lesões"],
      status: "online",
      conversations: 756,
      rating: 4.7,
      lastMessage: "Pronto para se movimentar? Vamos começar!",
    },
    {
      id: 4,
      name: "Leader Coach",
      role: "Leadership Coach",
      description: "Coach especializado em desenvolvimento de liderança e gestão de equipes",
      avatar: "👑",
      specialties: ["Liderança transformacional", "Gestão de equipes", "Comunicação", "Desenvolvimento pessoal"],
      status: "online",
      conversations: 634,
      rating: 4.9,
      lastMessage: "Vamos desenvolver suas habilidades de liderança!",
    },
    {
      id: 5,
      name: "Culture & Performance",
      role: "Cultural & Performance Coach",
      description: "Especialista em cultura organizacional e performance de equipes",
      avatar: "🎯",
      specialties: ["Cultura organizacional", "Performance de equipes", "Engajamento", "Produtividade"],
      status: "online",
      conversations: 523,
      rating: 4.8,
      lastMessage: "Como posso ajudar a melhorar a performance da sua equipe?",
    },
    {
      id: 6,
      name: "Productivity Pro",
      role: "Productivity Coach",
      description: "Coach especializado em produtividade e gestão do tempo",
      avatar: "⚡",
      specialties: ["Gestão do tempo", "Organização", "Foco", "Eficiência"],
      status: "online",
      conversations: 445,
      rating: 4.6,
      lastMessage: "Vamos otimizar sua produtividade juntos!",
    },
    {
      id: 7,
      name: "Wellness Guide",
      role: "Wellness Coach",
      description: "Guia completo para bem-estar corporativo e qualidade de vida",
      avatar: "🌟",
      specialties: ["Bem-estar geral", "Qualidade de vida", "Work-life balance", "Autocuidado"],
      status: "online",
      conversations: 378,
      rating: 4.7,
      lastMessage: "Seu bem-estar é minha prioridade. Como posso ajudar?",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">IA Agents</h2>
        <p className="text-muted-foreground">Consultores virtuais especializados em saúde e bem-estar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedAgent(agent)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{agent.avatar}</div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription>{agent.role}</CardDescription>
                  </div>
                </div>
                <Badge variant={agent.status === "online" ? "default" : "secondary"}>{agent.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{agent.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Conversas:</span>
                    <div className="font-medium">{agent.conversations}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avaliação:</span>
                    <div className="font-medium">
                      {agent.rating} <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Especialidades:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {agent.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {agent.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Conversar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAgent && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Chat com {selectedAgent.name}</CardTitle>
            <CardDescription>Converse com seu consultor virtual especializado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{selectedAgent.avatar}</span>
                  <span className="font-medium">{selectedAgent.name}</span>
                </div>
                <p className="text-sm">{selectedAgent.lastMessage}</p>
              </div>

              <div className="flex gap-2">
                <input placeholder="Digite sua mensagem..." className="flex-1 px-3 py-2 border rounded-lg" />
                <Button>Enviar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Novo Questionário",
      message: "Um novo questionário de saúde está disponível para preenchimento.",
      timestamp: Date.now() - 60000,
      read: false,
    },
    {
      id: 2,
      title: "Alerta de Risco",
      message: "Identificamos um risco de burnout em sua equipe. Verifique os detalhes.",
      timestamp: Date.now() - 3600000,
      read: false,
    },
    {
      id: 3,
      title: "Resultados da Análise",
      message: "Os resultados da análise de dados de saúde estão prontos.",
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
          {activeSection === "analytics" && <AnalyticsContent />}
          {activeSection === "ai-agents" && <AIAgentsContent />}
          {activeSection === "isp" && <ISPContent />}
          {activeSection === "roi" && <ROIContent />}
          {activeSection === "questionnaires" && <QuestionnairesContent />}
          {activeSection === "data" && <DataContent />}
          {activeSection === "education" && <AcademyContent />}
          {activeSection === "benefits" && <BenefitsContent />}
          {activeSection === "settings" && <SettingsContent />}
          {activeSection === "help" && <div>Help Content</div>}
        </main>
      </div>
    </div>
  )
}
