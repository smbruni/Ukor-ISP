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
  Calculator,
  HelpCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  Clock,
  PieChart,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Heart,
  Moon,
  Download,
  Shield,
  Smartphone,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Bar,
  Pie,
} from "recharts"

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
      {/* Header */}
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

// Dashboard Content com gráfico e cards adicionais
function DashboardContent() {
  const ispData = [
    { month: "Jan", isp: 65 },
    { month: "Fev", isp: 68 },
    { month: "Mar", isp: 72 },
    { month: "Abr", isp: 69 },
    { month: "Mai", isp: 74 },
    { month: "Jun", isp: 78 },
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
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mb-2" />
              <p>Gráfico de Performance por Departamento</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Matriz de Risco</CardTitle>
            <CardDescription>Probabilidade vs. Impacto por departamento</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center text-muted-foreground">
              <PieChart className="h-16 w-16 mb-2" />
              <p>Matriz de Risco por Departamento</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Analytics Content com gráficos
function AnalyticsContent() {
  const [period, setPeriod] = useState("6m")
  const [department, setDepartment] = useState("all")

  const burnoutData = [
    { dept: "TI", atual: 23, previsto: 35 },
    { dept: "RH", atual: 12, previsto: 18 },
    { dept: "Financeiro", atual: 8, previsto: 12 },
    { dept: "Operações", atual: 15, previsto: 22 },
  ]

  const productivityData = [
    { month: "Jul", atual: 78, previsto: 82 },
    { month: "Ago", atual: 80, previsto: 85 },
    { month: "Set", atual: 82, previsto: 87 },
    { month: "Out", atual: 85, previsto: 90 },
  ]

  const trendsData = [
    { month: "Jan", stress: 65, sleep: 45, nutrition: 68, physical: 72 },
    { month: "Fev", stress: 62, sleep: 48, nutrition: 70, physical: 74 },
    { month: "Mar", stress: 58, sleep: 52, nutrition: 72, physical: 76 },
    { month: "Abr", stress: 55, sleep: 55, nutrition: 74, physical: 78 },
    { month: "Mai", stress: 52, sleep: 58, nutrition: 76, physical: 80 },
    { month: "Jun", stress: 48, sleep: 62, nutrition: 78, physical: 82 },
  ]

  const correlationData = [
    { name: "Sono vs Produtividade", value: 0.85 },
    { name: "Estresse vs Absenteísmo", value: 0.72 },
    { name: "Exercício vs Bem-estar", value: 0.68 },
    { name: "Nutrição vs Energia", value: 0.75 },
  ]

  const scenarioData = [
    { scenario: "Conservador", burnout: 28, productivity: 82, cost: 450000 },
    { scenario: "Moderado", burnout: 22, productivity: 88, cost: 680000 },
    { scenario: "Otimista", burnout: 15, productivity: 95, cost: 920000 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análises Preditivas</h2>
        <p className="text-muted-foreground">Modelos de IA e previsões para saúde e performance</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ti">Tecnologia</SelectItem>
              <SelectItem value="rh">Recursos Humanos</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="operacoes">Operações</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">Previsões</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="correlations">Correlações</TabsTrigger>
          <TabsTrigger value="scenarios">Cenários</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Previsão de Burnout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">+15%</div>
                <p className="text-xs text-muted-foreground">Próximos 3 meses</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Confiança</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Previsão de Absenteísmo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">4.2%</div>
                <p className="text-xs text-muted-foreground">Próximo trimestre</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Confiança</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Previsão de Turnover</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">8.7%</div>
                <p className="text-xs text-muted-foreground">Próximos 6 meses</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Confiança</span>
                    <span>84%</span>
                  </div>
                  <Progress value={84} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Previsão de Produtividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+7%</div>
                <p className="text-xs text-muted-foreground">Próximo trimestre</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Confiança</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Previsão de Burnout por Departamento</CardTitle>
                <CardDescription>Projeção para os próximos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={burnoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dept" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="atual" fill="#8884d8" name="Atual" />
                    <Bar dataKey="previsto" fill="#82ca9d" name="Previsto" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Previsão de Produtividade</CardTitle>
                <CardDescription>Projeção para os próximos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="atual" stroke="#8884d8" name="Atual" />
                    <Line type="monotone" dataKey="previsto" stroke="#82ca9d" name="Previsto" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alertas Preditivos</CardTitle>
              <CardDescription>Situações que requerem atenção preventiva</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Risco de Burnout Elevado</h4>
                    <p className="text-xs text-muted-foreground">
                      Departamento de TI tem 85% de chance de aumento nos próximos 2 meses
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <Users className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Aumento de Turnover</h4>
                    <p className="text-xs text-muted-foreground">
                      Equipe de Desenvolvimento tem 72% de chance de perder membros
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Activity className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Queda de Produtividade</h4>
                    <p className="text-xs text-muted-foreground">
                      Departamento Financeiro tem 68% de chance de queda nos próximos 3 meses
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Saúde e Performance</CardTitle>
              <CardDescription>Análise de tendências ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="stress" stroke="#ff7300" name="Estresse" />
                  <Line type="monotone" dataKey="sleep" stroke="#8884d8" name="Sono" />
                  <Line type="monotone" dataKey="nutrition" stroke="#82ca9d" name="Nutrição" />
                  <Line type="monotone" dataKey="physical" stroke="#ffc658" name="Atividade Física" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations">
          <Card>
            <CardHeader>
              <CardTitle>Correlações entre Variáveis</CardTitle>
              <CardDescription>Análise de relações entre diferentes métricas de saúde e performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={correlationData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 1]} />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Simulação de Cenários</CardTitle>
                <CardDescription>Projeções baseadas em diferentes níveis de investimento em saúde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {scenarioData.map((scenario) => (
                    <div key={scenario.scenario} className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-3">{scenario.scenario}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Burnout:</span>
                          <span className="font-medium">{scenario.burnout}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Produtividade:</span>
                          <span className="font-medium">{scenario.productivity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Investimento:</span>
                          <span className="font-medium">R$ {scenario.cost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ROI Content com calculadora e gráficos
function ROIContent() {
  const [period, setPeriod] = useState("6m")
  const [department, setDepartment] = useState("all")
  const [showCalculator, setShowCalculator] = useState(false)
  const [investment, setInvestment] = useState("")
  const [expectedReturn, setExpectedReturn] = useState("")

  const roiEvolutionData = [
    { month: "Jan", investment: 120000, return: 280000, roi: 233 },
    { month: "Fev", investment: 140000, return: 320000, roi: 229 },
    { month: "Mar", investment: 160000, return: 380000, roi: 238 },
    { month: "Abr", investment: 180000, return: 450000, roi: 250 },
    { month: "Mai", investment: 200000, return: 540000, roi: 270 },
    { month: "Jun", investment: 220000, return: 650000, roi: 295 },
  ]

  const departmentROIData = [
    { dept: "TI", investment: 85000, return: 320000, roi: 376 },
    { dept: "RH", investment: 45000, return: 180000, roi: 400 },
    { dept: "Financeiro", investment: 35000, return: 125000, roi: 357 },
    { dept: "Operações", investment: 55000, return: 195000, roi: 355 },
  ]

  const projectionData = [
    { month: "Jul", conservative: 310, moderate: 340, optimistic: 380 },
    { month: "Ago", conservative: 315, moderate: 350, optimistic: 395 },
    { month: "Set", conservative: 320, moderate: 360, optimistic: 410 },
    { month: "Out", conservative: 325, moderate: 370, optimistic: 425 },
    { month: "Nov", conservative: 330, moderate: 380, optimistic: 440 },
    { month: "Dez", conservative: 335, moderate: 390, optimistic: 455 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ROI em Saúde</h2>
        <p className="text-muted-foreground">Análise de retorno sobre investimento em saúde corporativa</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ti">Tecnologia</SelectItem>
              <SelectItem value="rh">Recursos Humanos</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="operacoes">Operações</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowCalculator(!showCalculator)} className="gap-2">
            <Calculator className="h-4 w-4" />
            Calculadora ROI
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {showCalculator && (
        <Card>
          <CardHeader>
            <CardTitle>Calculadora de ROI</CardTitle>
            <CardDescription>Simule diferentes cenários de investimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Investimento (R$)</label>
                <Input
                  type="number"
                  placeholder="Ex: 100000"
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Retorno Esperado (R$)</label>
                <Input
                  type="number"
                  placeholder="Ex: 340000"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full">Calcular ROI</Button>
              </div>
            </div>
            {investment && expectedReturn && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ROI: {(((Number(expectedReturn) - Number(investment)) / Number(investment)) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Para cada R$ 1 investido, o retorno é de R$ {(Number(expectedReturn) / Number(investment)).toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">340%</div>
            <p className="text-xs text-muted-foreground">+12% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 720K</div>
            <p className="text-xs text-muted-foreground">Período de 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retorno Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.4M</div>
            <p className="text-xs text-muted-foreground">+18% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retorno Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 410K</div>
            <p className="text-xs text-muted-foreground">Média mensal</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="detailed">Análise Detalhada</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do ROI</CardTitle>
                <CardDescription>Comparativo entre investimento e retorno</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={roiEvolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="roi" stroke="#8884d8" name="ROI %" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Impactos</CardTitle>
                <CardDescription>Áreas mais impactadas pelo programa</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: "Redução Absenteísmo", value: 32 },
                        { name: "Aumento Produtividade", value: 18 },
                        { name: "Redução Turnover", value: 24 },
                        { name: "Redução Sinistralidade", value: 15 },
                        { name: "Outros", value: 11 },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {[
                        { name: "Redução Absenteísmo", value: 32 },
                        { name: "Aumento Produtividade", value: 18 },
                        { name: "Redução Turnover", value: 24 },
                        { name: "Redução Sinistralidade", value: 15 },
                        { name: "Outros", value: 11 },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"][index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Principais Indicadores</CardTitle>
              <CardDescription>Métricas de impacto financeiro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Redução de Absenteísmo</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Aumento de Produtividade</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Redução de Turnover</span>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Redução de Sinistralidade</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada por Departamento</CardTitle>
              <CardDescription>Comparativo de ROI entre departamentos</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={departmentROIData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dept" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="roi" fill="#8884d8" name="ROI %" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>Projeções Futuras</CardTitle>
              <CardDescription>Estimativa de ROI para os próximos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="conservative" stroke="#ff7300" name="Conservador" />
                  <Line type="monotone" dataKey="moderate" stroke="#8884d8" name="Moderado" />
                  <Line type="monotone" dataKey="optimistic" stroke="#82ca9d" name="Otimista" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ISP Content com gráficos
function ISPContent() {
  const ispGeneralData = [
    { month: "Jan", isp: 65 },
    { month: "Fev", isp: 68 },
    { month: "Mar", isp: 72 },
    { month: "Abr", isp: 69 },
    { month: "Mai", isp: 74 },
    { month: "Jun", isp: 78 },
  ]

  const ispDepartmentData = [
    { dept: "TI", isp: 72 },
    { dept: "RH", isp: 85 },
    { dept: "Financeiro", isp: 78 },
    { dept: "Operações", isp: 68 },
    { dept: "Marketing", isp: 82 },
  ]

  const ispEvolutionData = [
    { month: "Jan", sono: 45, mental: 65, fisica: 72, nutricional: 68, engajamento: 78, produtividade: 67 },
    { month: "Fev", sono: 48, mental: 67, fisica: 74, nutricional: 70, engajamento: 80, produtividade: 69 },
    { month: "Mar", sono: 52, mental: 70, fisica: 76, nutricional: 72, engajamento: 82, produtividade: 72 },
    { month: "Abr", sono: 55, mental: 72, fisica: 78, nutricional: 74, engajamento: 84, produtividade: 74 },
    { month: "Mai", sono: 58, mental: 74, fisica: 80, nutricional: 76, engajamento: 86, produtividade: 76 },
    { month: "Jun", sono: 62, mental: 76, fisica: 82, nutricional: 78, engajamento: 88, produtividade: 78 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ISP - Índice de Saúde e Performance</h2>
        <p className="text-muted-foreground">
          Diagnóstico completo baseado nos 6 pilares: Sono, Saúde Física, Saúde Mental, Saúde Nutricional, Engajamento e
          Produtividade
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="diagnostic">Diagnóstico Completo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>ISP Geral da Empresa</CardTitle>
                <CardDescription>Índice consolidado baseado em todos os indicadores de saúde</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={ispGeneralData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="isp" stroke="#8884d8" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sono</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">45</div>
                <p className="text-xs text-muted-foreground">Crítico</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Score</span>
                    <span>45/100</span>
                  </div>
                  <Progress value={45} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Saúde Mental</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">65</div>
                <p className="text-xs text-muted-foreground">Atenção</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Score</span>
                    <span>65/100</span>
                  </div>
                  <Progress value={65} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Saúde Física</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">72</div>
                <p className="text-xs text-muted-foreground">Bom</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Score</span>
                    <span>72/100</span>
                  </div>
                  <Progress value={72} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Saúde Nutricional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">68</div>
                <p className="text-xs text-muted-foreground">Atenção</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Score</span>
                    <span>68/100</span>
                  </div>
                  <Progress value={68} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">78</div>
                <p className="text-xs text-muted-foreground">Bom</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Score</span>
                    <span>78/100</span>
                  </div>
                  <Progress value={78} className="h-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Produtividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">67</div>
                <p className="text-xs text-muted-foreground">Atenção</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Score</span>
                    <span>67/100</span>
                  </div>
                  <Progress value={67} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ISP por Departamento</CardTitle>
                <CardDescription>Comparativo entre departamentos</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={ispDepartmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dept" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="isp" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução do ISP</CardTitle>
                <CardDescription>Histórico dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={ispEvolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sono" stroke="#ff7300" name="Sono" />
                    <Line type="monotone" dataKey="mental" stroke="#8884d8" name="Mental" />
                    <Line type="monotone" dataKey="fisica" stroke="#82ca9d" name="Física" />
                    <Line type="monotone" dataKey="nutricional" stroke="#ffc658" name="Nutricional" />
                    <Line type="monotone" dataKey="engajamento" stroke="#8dd1e1" name="Engajamento" />
                    <Line type="monotone" dataKey="produtividade" stroke="#d084d0" name="Produtividade" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diagnostic">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Diagnóstico Completo</CardTitle>
                <CardDescription>Análise detalhada dos 6 pilares de saúde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Moon className="h-5 w-5 mr-2 text-blue-500" />
                      Sono
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score Geral</span>
                        <span className="font-medium text-red-500">45/100 (Crítico)</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        O sono é o pilar mais crítico, com 45% dos colaboradores reportando problemas de qualidade e
                        duração do sono. Impacta diretamente a produtividade e saúde mental.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="font-medium">Duração</div>
                          <div className="text-sm text-muted-foreground">Média de 5.8h (recomendado: 7-8h)</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="font-medium">Qualidade</div>
                          <div className="text-sm text-muted-foreground">42% reportam sono fragmentado</div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <div className="font-medium">Regularidade</div>
                          <div className="text-sm text-muted-foreground">Variação média de 1.5h nos horários</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-red-500" />
                      Saúde Mental
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score Geral</span>
                        <span className="font-medium text-amber-500">65/100 (Atenção)</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        A saúde mental apresenta sinais de atenção, com 32% dos colaboradores reportando níveis elevados
                        de estresse e 18% com sintomas de ansiedade.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <div className="font-medium">Estresse</div>
                          <div className="text-sm text-muted-foreground">32% com níveis elevados</div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <div className="font-medium">Ansiedade</div>
                          <div className="text-sm text-muted-foreground">18% com sintomas significativos</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="font-medium">Bem-estar</div>
                          <div className="text-sm text-muted-foreground">72% reportam satisfação geral</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-500" />
                      Saúde Física
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score Geral</span>
                        <span className="font-medium text-green-500">72/100 (Bom)</span>
                      </div>
                      <Progress value={72} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        A saúde física apresenta bons indicadores, com 65% dos colaboradores praticando atividade física
                        regularmente. Ainda há oportunidades de melhoria em ergonomia.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-500" />
                      Engajamento
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score Geral</span>
                        <span className="font-medium text-green-500">78/100 (Bom)</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        O engajamento apresenta bons indicadores, com 78% dos colaboradores reportando satisfação com o
                        trabalho e 82% recomendariam a empresa como um bom lugar para trabalhar.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-yellow-500" />
                      Produtividade
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score Geral</span>
                        <span className="font-medium text-amber-500">67/100 (Atenção)</span>
                      </div>
                      <Progress value={67} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        A produtividade requer atenção, com 38% dos colaboradores reportando dificuldades de
                        concentração e 25% com sensação de sobrecarga frequente.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diagnóstico por Departamento</CardTitle>
                <CardDescription>Análise detalhada dos 6 pilares por departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Tecnologia</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Sono:</span>
                          <span className="text-red-500">38/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Mental:</span>
                          <span className="text-amber-500">58/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Física:</span>
                          <span className="text-amber-500">65/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Nutricional:</span>
                          <span className="text-amber-500">62/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Engajamento:</span>
                          <span className="text-green-500">82/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Produtividade:</span>
                          <span className="text-green-500">85/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Recursos Humanos</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Sono:</span>
                          <span className="text-amber-500">65/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Mental:</span>
                          <span className="text-green-500">78/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Física:</span>
                          <span className="text-green-500">82/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Nutricional:</span>
                          <span className="text-green-500">85/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Engajamento:</span>
                          <span className="text-green-500">88/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Produtividade:</span>
                          <span className="text-green-500">82/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Financeiro</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Sono:</span>
                          <span className="text-amber-500">52/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Mental:</span>
                          <span className="text-amber-500">68/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Física:</span>
                          <span className="text-green-500">75/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Nutricional:</span>
                          <span className="text-amber-500">68/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Engajamento:</span>
                          <span className="text-green-500">78/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Produtividade:</span>
                          <span className="text-green-500">72/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Operações</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Sono:</span>
                          <span className="text-red-500">42/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Mental:</span>
                          <span className="text-amber-500">62/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Física:</span>
                          <span className="text-amber-500">68/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Nutricional:</span>
                          <span className="text-amber-500">65/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Engajamento:</span>
                          <span className="text-green-500">72/100</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Produtividade:</span>
                          <span className="text-amber-500">65/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Add missing content functions
function PerformanceContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Performance por Departamento</h2>
        <p className="text-muted-foreground">Análise de performance baseada em produtividade e eficiência</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Conteúdo de performance em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Questionnaires Content
function QuestionnairesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const questionnaires = [
    {
      id: 1,
      title: "Saúde Mental e Bem-estar",
      description: "Avaliação de níveis de estresse, ansiedade e bem-estar geral",
      questions: 25,
      duration: "8-10 min",
      responses: 847,
      lastUpdate: "2024-01-15",
      status: "Ativo",
      category: "mental",
    },
    {
      id: 2,
      title: "Saúde Física e Ergonomia",
      description: "Avaliação de condições físicas e ergonômicas no trabalho",
      questions: 20,
      duration: "6-8 min",
      responses: 723,
      lastUpdate: "2024-01-10",
      status: "Ativo",
      category: "fisica",
    },
    {
      id: 3,
      title: "Hábitos Nutricionais",
      description: "Análise de padrões alimentares e hábitos nutricionais",
      questions: 18,
      duration: "5-7 min",
      responses: 692,
      lastUpdate: "2024-01-12",
      status: "Ativo",
      category: "nutricao",
    },
    {
      id: 4,
      title: "Qualidade do Sono",
      description: "Avaliação da qualidade e padrões de sono",
      questions: 15,
      duration: "4-6 min",
      responses: 756,
      lastUpdate: "2024-01-08",
      status: "Ativo",
      category: "sono",
    },
    {
      id: 5,
      title: "Gestão de Estresse",
      description: "Identificação de fontes de estresse e estratégias de enfrentamento",
      questions: 22,
      duration: "7-9 min",
      responses: 634,
      lastUpdate: "2024-01-14",
      status: "Ativo",
      category: "estresse",
    },
    {
      id: 6,
      title: "Cultura Organizacional",
      description: "Percepção sobre ambiente de trabalho e cultura da empresa",
      questions: 30,
      duration: "10-12 min",
      responses: 589,
      lastUpdate: "2024-01-11",
      status: "Ativo",
      category: "cultura",
    },
  ]

  const filteredQuestionnaires = questionnaires.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || q.category === filter || q.status.toLowerCase() === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Questionários de Saúde</h2>
        <p className="text-muted-foreground">
          Avaliações estruturadas para monitoramento da saúde e bem-estar dos colaboradores
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar questionários..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ativo">Ativos</SelectItem>
            <SelectItem value="mental">Saúde Mental</SelectItem>
            <SelectItem value="fisica">Saúde Física</SelectItem>
            <SelectItem value="nutricao">Nutrição</SelectItem>
            <SelectItem value="sono">Sono</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestionnaires.map((questionnaire) => (
          <Card key={questionnaire.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="mb-2">
                  {questionnaire.category === "mental"
                    ? "Saúde Mental"
                    : questionnaire.category === "fisica"
                      ? "Saúde Física"
                      : questionnaire.category === "nutricao"
                        ? "Nutrição"
                        : questionnaire.category === "sono"
                          ? "Sono"
                          : questionnaire.category === "estresse"
                            ? "Estresse"
                            : "Cultura"}
                </Badge>
                <Badge variant={questionnaire.status === "Ativo" ? "default" : "secondary"}>
                  {questionnaire.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{questionnaire.title}</CardTitle>
              <CardDescription>{questionnaire.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Questões:</span>
                    <div className="font-medium">{questionnaire.questions}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duração:</span>
                    <div className="font-medium">{questionnaire.duration}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Respostas:</span>
                    <div className="font-medium">{questionnaire.responses}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Atualizado:</span>
                    <div className="font-medium">{new Date(questionnaire.lastUpdate).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Ver Respostas
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas de Participação</CardTitle>
          <CardDescription>Taxa de resposta por questionário nos últimos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questionnaires.map((q) => (
              <div key={q.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{q.title}</span>
                  <span className="text-sm text-muted-foreground">{Math.round((q.responses / 1000) * 100)}%</span>
                </div>
                <Progress value={(q.responses / 1000) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Data Content
function DataContent() {
  const integrations = [
    {
      id: 1,
      name: "Plano de Saúde",
      type: "health",
      status: "Conectado",
      lastSync: "2024-01-15 14:30",
      records: 1247,
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "Sistema de RH",
      type: "hr",
      status: "Conectado",
      lastSync: "2024-01-15 12:00",
      records: 1247,
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Wearables (Fitbit/Apple)",
      type: "wearables",
      status: "Conectado",
      lastSync: "2024-01-15 15:45",
      records: 892,
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "Upload de Documentos",
      type: "documents",
      status: "Ativo",
      lastSync: "2024-01-15 16:20",
      records: 456,
      icon: <Upload className="h-5 w-5" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dados de Saúde</h2>
        <p className="text-muted-foreground">Integração e gerenciamento de dados de saúde de múltiplas fontes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <p className="text-xs text-muted-foreground">+156 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fontes Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Todas conectadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Última Sincronização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16:20</div>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Qualidade dos Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Excelente</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription>
                      {integration.type === "health"
                        ? "Dados médicos e sinistralidade"
                        : integration.type === "hr"
                          ? "Dados de colaboradores e absenteísmo"
                          : integration.type === "wearables"
                            ? "Dados de atividade física e sono"
                            : "Documentos e exames médicos"}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={integration.status === "Conectado" ? "default" : "secondary"}>
                  {integration.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Registros:</span>
                    <div className="font-medium">{integration.records.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Última Sync:</span>
                    <div className="font-medium">{integration.lastSync}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Configurar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Sincronizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="health" className="space-y-4">
        <TabsList>
          <TabsTrigger value="health">Plano de Saúde</TabsTrigger>
          <TabsTrigger value="hr">Dados de RH</TabsTrigger>
          <TabsTrigger value="wearables">Wearables</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Plano de Saúde</CardTitle>
              <CardDescription>Dados de sinistralidade, consultas e exames</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Consultas</h4>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Exames</h4>
                    <div className="text-2xl font-bold">892</div>
                    <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Sinistralidade</h4>
                    <div className="text-2xl font-bold">12.8%</div>
                    <p className="text-sm text-muted-foreground">Taxa atual</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hr">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Sistema de RH</CardTitle>
              <CardDescription>Dados de colaboradores, absenteísmo e performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Colaboradores</h4>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">Total ativo</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Absenteísmo</h4>
                    <div className="text-2xl font-bold">3.2%</div>
                    <p className="text-sm text-muted-foreground">Taxa mensal</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Turnover</h4>
                    <div className="text-2xl font-bold">8.7%</div>
                    <p className="text-sm text-muted-foreground">Taxa anual</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wearables">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Wearables</CardTitle>
              <CardDescription>Dados de atividade física, sono e saúde</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Usuários Conectados</h4>
                    <div className="text-2xl font-bold">892</div>
                    <p className="text-sm text-muted-foreground">71% dos colaboradores</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Passos Médios</h4>
                    <div className="text-2xl font-bold">7,234</div>
                    <p className="text-sm text-muted-foreground">Por dia</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Sono Médio</h4>
                    <div className="text-2xl font-bold">6.8h</div>
                    <p className="text-sm text-muted-foreground">Por noite</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Documentos</CardTitle>
              <CardDescription>Exames, atestados e documentos médicos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Fazer Upload de Documentos</h3>
                  <p className="text-muted-foreground mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
                  <Button>Selecionar Arquivos</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Documentos</h4>
                    <div className="text-2xl font-bold">456</div>
                    <p className="text-sm text-muted-foreground">Total carregados</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Processados</h4>
                    <div className="text-2xl font-bold">432</div>
                    <p className="text-sm text-muted-foreground">94.7% processados</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Pendentes</h4>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-sm text-muted-foreground">Em análise</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Benefits Content
function BenefitsContent() {
  const [period, setPeriod] = useState("6m")
  const [department, setDepartment] = useState("all")

  const partnersData = [
    {
      month: "Jan",
      wellhub: 45000,
      zenklub: 12000,
      vittude: 8000,
      conexa: 15000,
      vt: 18000,
      va: 32000,
      vr: 28000,
      homeoffice: 22000,
    },
    {
      month: "Fev",
      wellhub: 47000,
      zenklub: 13000,
      vittude: 8500,
      conexa: 16000,
      vt: 19000,
      va: 33500,
      vr: 29000,
      homeoffice: 23000,
    },
    {
      month: "Mar",
      wellhub: 48000,
      zenklub: 13500,
      vittude: 9000,
      conexa: 16500,
      vt: 19500,
      va: 34000,
      vr: 30000,
      homeoffice: 24000,
    },
    {
      month: "Abr",
      wellhub: 46000,
      zenklub: 12500,
      vittude: 8200,
      conexa: 15500,
      vt: 18500,
      va: 33000,
      vr: 28500,
      homeoffice: 22500,
    },
    {
      month: "Mai",
      wellhub: 49000,
      zenklub: 14000,
      vittude: 9500,
      conexa: 17000,
      vt: 20000,
      va: 35000,
      vr: 31000,
      homeoffice: 25000,
    },
    {
      month: "Jun",
      wellhub: 50000,
      zenklub: 14500,
      vittude: 10000,
      conexa: 17500,
      vt: 20500,
      va: 36000,
      vr: 32000,
      homeoffice: 26000,
    },
  ]

  const utilizationData = [
    { partner: "Wellhub", total: 1247, utilizacao: 892, percentual: 71.5, satisfacao: 4.8 },
    { partner: "Zenklub", total: 1247, utilizacao: 456, percentual: 36.6, satisfacao: 4.6 },
    { partner: "Vittude", total: 1247, utilizacao: 234, percentual: 18.8, satisfacao: 4.4 },
    { partner: "Conexa", total: 1247, utilizacao: 678, percentual: 54.4, satisfacao: 4.7 },
    { partner: "Vale Transporte", total: 1247, utilizacao: 1089, percentual: 87.3, satisfacao: 4.2 },
    { partner: "Vale Alimentação", total: 1247, utilizacao: 1247, percentual: 100, satisfacao: 4.5 },
    { partner: "Vale Refeição", total: 1247, utilizacao: 1156, percentual: 92.7, satisfacao: 4.3 },
    { partner: "Vale Home Office", total: 1247, utilizacao: 987, percentual: 79.1, satisfacao: 4.9 },
  ]

  const departmentUtilizationData = [
    { dept: "TI", wellhub: 85, zenklub: 45, vittude: 23, conexa: 67, vt: 89, va: 100, vr: 95, homeoffice: 98 },
    { dept: "RH", wellhub: 78, zenklub: 56, vittude: 34, conexa: 78, vt: 92, va: 100, vr: 98, homeoffice: 87 },
    { dept: "Financeiro", wellhub: 65, zenklub: 32, vittude: 18, conexa: 45, vt: 85, va: 100, vr: 89, homeoffice: 76 },
    { dept: "Operações", wellhub: 72, zenklub: 28, vittude: 12, conexa: 52, vt: 88, va: 100, vr: 92, homeoffice: 65 },
    { dept: "Marketing", wellhub: 88, zenklub: 67, vittude: 45, conexa: 72, vt: 78, va: 100, vr: 87, homeoffice: 92 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics de Benefícios Corporativos</h2>
        <p className="text-muted-foreground">
          Análise consolidada dos parceiros: Wellhub, Zenklub, Vittude, Conexa, VA, VR, VT e Vale Home Office
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ti">Tecnologia</SelectItem>
              <SelectItem value="rh">Recursos Humanos</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="operacoes">Operações</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wellhub</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 294K</div>
            <p className="text-xs text-muted-foreground">71.5% utilização</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+8% vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Zenklub</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 79K</div>
            <p className="text-xs text-muted-foreground">36.6% utilização</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+15% vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vale Alimentação</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 209K</div>
            <p className="text-xs text-muted-foreground">100% utilização</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+6% vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vale Home Office</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 147K</div>
            <p className="text-xs text-muted-foreground">79.1% utilização</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+12% vs período anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="utilization">Utilização</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução dos Custos por Parceiro</CardTitle>
              <CardDescription>Gastos mensais por parceiro/benefício</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={partnersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="wellhub" stroke="#8884d8" name="Wellhub" />
                  <Line type="monotone" dataKey="zenklub" stroke="#82ca9d" name="Zenklub" />
                  <Line type="monotone" dataKey="va" stroke="#ffc658" name="Vale Alimentação" />
                  <Line type="monotone" dataKey="homeoffice" stroke="#ff7300" name="Vale Home Office" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Utilização por Parceiro</CardTitle>
                <CardDescription>Percentual de colaboradores que utilizam cada benefício</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {utilizationData.map((item) => (
                    <div key={item.partner}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{item.partner}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.percentual}% ({item.utilizacao}/{item.total})
                        </span>
                      </div>
                      <Progress value={item.percentual} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilização por Departamento</CardTitle>
                <CardDescription>Percentual de utilização de cada benefício por departamento</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={departmentUtilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dept" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wellhub" fill="#8884d8" name="Wellhub" />
                    <Bar dataKey="zenklub" fill="#82ca9d" name="Zenklub" />
                    <Bar dataKey="va" fill="#ffc658" name="Vale Alimentação" />
                    <Bar dataKey="homeoffice" fill="#ff7300" name="Vale Home Office" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction">
          <Card>
            <CardHeader>
              <CardTitle>Índice de Satisfação por Parceiro</CardTitle>
              <CardDescription>Avaliação média dos colaboradores (escala 1-5)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {utilizationData.map((item) => (
                  <div key={item.partner} className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">{item.partner}</h4>
                    <div className="text-3xl font-bold text-primary mb-1">{item.satisfacao}</div>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < Math.floor(item.satisfacao) ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.utilizacao} avaliações</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projeção de Custos</CardTitle>
                <CardDescription>Estimativa de gastos para os próximos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Cenário Conservador</h4>
                    <div className="text-2xl font-bold text-blue-600">R$ 1.8M</div>
                    <p className="text-sm text-muted-foreground">+5% crescimento</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Cenário Moderado</h4>
                    <div className="text-2xl font-bold text-green-600">R$ 2.1M</div>
                    <p className="text-sm text-muted-foreground">+15% crescimento</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Cenário Otimista</h4>
                    <div className="text-2xl font-bold text-purple-600">R$ 2.4M</div>
                    <p className="text-sm text-muted-foreground">+25% crescimento</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Potenciais Economias</CardTitle>
                <CardDescription>Oportunidades de otimização identificadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Renegociação Wellhub</h4>
                      <p className="text-sm text-muted-foreground">Desconto por volume de usuários</p>
                    </div>
                    <div className="text-green-600 font-bold">-R$ 45K/ano</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Otimização Vale Transporte</h4>
                      <p className="text-sm text-muted-foreground">Ajuste baseado em home office</p>
                    </div>
                    <div className="text-green-600 font-bold">-R$ 32K/ano</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Consolidação Saúde Mental</h4>
                      <p className="text-sm text-muted-foreground">Unificar Zenklub e Vittude</p>
                    </div>
                    <div className="text-green-600 font-bold">-R$ 28K/ano</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Education Content
function EducationContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Fundamentos de Saúde Corporativa",
      description: "Aprenda os princípios básicos para promover saúde no ambiente de trabalho.",
      image: "/placeholder.svg?height=200&width=300",
      category: "saude",
      duration: "4h 30min",
      lessons: 12,
      progress: 75,
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      title: "Gestão do Estresse no Trabalho",
      description: "Técnicas práticas para gerenciar o estresse e aumentar a produtividade.",
      image: "/placeholder.svg?height=200&width=300",
      category: "mental",
      duration: "3h 15min",
      lessons: 8,
      progress: 50,
      rating: 4.9,
      featured: true,
    },
    {
      id: 3,
      title: "Nutrição para Alta Performance",
      description: "Como a alimentação impacta sua energia e performance no trabalho.",
      image: "/placeholder.svg?height=200&width=300",
      category: "nutricao",
      duration: "5h 45min",
      lessons: 15,
      progress: 30,
      rating: 4.7,
      featured: false,
    },
    {
      id: 4,
      title: "Ergonomia e Postura no Home Office",
      description: "Organize seu espaço de trabalho para prevenir lesões e aumentar o conforto.",
      image: "/placeholder.svg?height=200&width=300",
      category: "fisica",
      duration: "2h 20min",
      lessons: 6,
      progress: 100,
      rating: 4.5,
      featured: false,
    },
    {
      id: 5,
      title: "Mindfulness para Profissionais",
      description: "Práticas de atenção plena para reduzir ansiedade e melhorar foco.",
      image: "/placeholder.svg?height=200&width=300",
      category: "mental",
      duration: "3h 50min",
      lessons: 10,
      progress: 0,
      rating: 4.9,
      featured: true,
    },
    {
      id: 6,
      title: "Sono e Produtividade",
      description: "Como otimizar seu sono para maximizar sua performance profissional.",
      image: "/placeholder.svg?height=200&width=300",
      category: "sono",
      duration: "4h 10min",
      lessons: 12,
      progress: 25,
      rating: 4.8,
      featured: false,
    },
    {
      id: 7,
      title: "Liderança Transformacional",
      description: "Desenvolva habilidades de liderança para inspirar e motivar equipes.",
      image: "/placeholder.svg?height=200&width=300",
      category: "lideranca",
      duration: "6h 30min",
      lessons: 18,
      progress: 0,
      rating: 4.9,
      featured: true,
    },
    {
      id: 8,
      title: "Inteligência Emocional no Trabalho",
      description: "Aprenda a gerenciar emoções e melhorar relacionamentos profissionais.",
      image: "/placeholder.svg?height=200&width=300",
      category: "emocional",
      duration: "4h 45min",
      lessons: 14,
      progress: 60,
      rating: 4.8,
      featured: false,
    },
    {
      id: 9,
      title: "Produtividade e Gestão do Tempo",
      description: "Técnicas avançadas para otimizar seu tempo e aumentar a eficiência.",
      image: "/placeholder.svg?height=200&width=300",
      category: "produtividade",
      duration: "3h 20min",
      lessons: 10,
      progress: 40,
      rating: 4.7,
      featured: false,
    },
    {
      id: 10,
      title: "Comunicação Assertiva",
      description: "Desenvolva habilidades de comunicação clara e eficaz.",
      image: "/placeholder.svg?height=200&width=300",
      category: "comunicacao",
      duration: "2h 50min",
      lessons: 8,
      progress: 0,
      rating: 4.6,
      featured: false,
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || course.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Cursos e Trilhas de Aprendizado</h2>
        <p className="text-muted-foreground">
          Desenvolva suas habilidades e conhecimentos em saúde corporativa e bem-estar
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar cursos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="saude">Saúde</SelectItem>
            <SelectItem value="mental">Saúde Mental</SelectItem>
            <SelectItem value="nutricao">Nutrição</SelectItem>
            <SelectItem value="fisica">Saúde Física</SelectItem>
            <SelectItem value="sono">Sono</SelectItem>
            <SelectItem value="lideranca">Liderança</SelectItem>
            <SelectItem value="emocional">Inteligência Emocional</SelectItem>
            <SelectItem value="produtividade">Produtividade</SelectItem>
            <SelectItem value="comunicacao">Comunicação</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                {course.featured && (
                  <Badge variant="secondary" className="mb-2">
                    Destaque
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Duração:</span>
                    <div className="font-medium">{course.duration}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lições:</span>
                    <div className="font-medium">{course.lessons}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Categoria:</span>
                    <div className="font-medium">{course.category}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avaliação:</span>
                    <div className="font-medium">
                      {course.rating} <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                </div>

                <Progress value={course.progress} className="h-2" />
                <div className="text-sm text-muted-foreground">Progresso: {course.progress}%</div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Continuar Curso
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// AI Agents Content
function AIAgentsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">IA Agents</h2>
        <p className="text-muted-foreground">Consultores virtuais especializados em saúde e bem-estar</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Conteúdo de IA Agents em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Remove duplicate functions

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Novo Questionário",
      message: "Um novo questionário de saúde mental está disponível.",
      timestamp: new Date(),
      read: false,
    },
    {
      id: 2,
      title: "Resultados ISP",
      message: "Seus resultados do ISP estão prontos para visualização.",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: 3,
      title: "Alerta de Burnout",
      message: "Detectamos um possível risco de burnout em sua equipe.",
      timestamp: new Date(Date.now() - 7200000),
      read: false,
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
    <div className="h-screen flex flex-col">
      <Header notifications={notifications} onClearNotifications={handleClearNotifications} />

      <div className="flex flex-1">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {activeSection === "dashboard" && <DashboardContent />}
          {activeSection === "analytics" && <AnalyticsContent />}
          {activeSection === "roi" && <ROIContent />}
          {activeSection === "isp" && <ISPContent />}
          {activeSection === "questionnaires" && <QuestionnairesContent />}
          {activeSection === "data" && <DataContent />}
          {activeSection === "benefits" && <BenefitsContent />}
        </main>
      </div>
    </div>
  )
}
