"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Shield,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Database,
  Brain,
  Activity,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const getStatusColor = (status: string) => {
  switch (status) {
    case "Crítico":
      return "bg-red-500 text-white border-red-600"
    case "Atenção":
      return "bg-yellow-500 text-black border-yellow-600"
    case "Bom":
      return "bg-green-500 text-white border-green-600"
    case "Excelente":
      return "bg-blue-500 text-white border-blue-600"
    default:
      return "bg-gray-500 text-white border-gray-600"
  }
}

const getCardBorderColor = (status: string) => {
  switch (status) {
    case "Crítico":
      return "border-l-4 border-l-red-500 shadow-red-500/20"
    case "Atenção":
      return "border-l-4 border-l-yellow-500 shadow-yellow-500/20"
    case "Bom":
      return "border-l-4 border-l-green-500 shadow-green-500/20"
    case "Excelente":
      return "border-l-4 border-l-blue-500 shadow-blue-500/20"
    default:
      return "border-l-4 border-l-gray-500 shadow-gray-500/20"
  }
}

export function ExecutiveDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [activeSection, setActiveSection] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setLastUpdated(new Date())
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard Executivo", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "health", label: "Saúde", icon: Heart },
    { id: "performance", label: "Performance", icon: Activity },
    { id: "data", label: "Dados", icon: Database },
    { id: "ai", label: "IA", icon: Brain },
    { id: "settings", label: "Configurações", icon: Settings },
  ]

  const healthMetrics = [
    {
      title: "ROI em Saúde",
      value: "R$ 2.8M",
      status: "Bom",
      trend: "+18%",
      trendDirection: "up",
      icon: DollarSign,
      description: "Retorno sobre investimento em programas de saúde",
      target: "Meta: R$ 3.2M",
      weight: "ROI: 340%",
    },
    {
      title: "Sinistralidade",
      value: "12.8%",
      status: "Bom",
      trend: "-5%",
      trendDirection: "down",
      icon: Shield,
      description: "Taxa de sinistros médicos",
      target: "Meta: <15%",
      weight: "Peso: 25%",
    },
    {
      title: "Risco de Burnout",
      value: "Alto",
      status: "Crítico",
      trend: "+8%",
      trendDirection: "up",
      icon: AlertTriangle,
      description: "23 colaboradores em risco crítico",
      target: "Meta: <10 pessoas",
      weight: "Peso: 20%",
    },
    {
      title: "Carga de Trabalho",
      value: "78%",
      status: "Atenção",
      trend: "-3%",
      trendDirection: "down",
      icon: Clock,
      description: "Índice médio de sobrecarga",
      target: "Meta: <70%",
      weight: "Peso: 15%",
    },
    {
      title: "Absenteísmo",
      value: "4.2%",
      status: "Atenção",
      trend: "-0.3%",
      trendDirection: "down",
      icon: Calendar,
      description: "Taxa de ausências",
      target: "Meta: 2.8%",
      weight: "Peso: 10%",
    },
    {
      title: "ISP Geral",
      value: "72",
      status: "Bom",
      trend: "+2%",
      trendDirection: "up",
      icon: TrendingUp,
      description: "Índice de Saúde e Performance",
      target: "Meta: 80",
      weight: "Peso: 30%",
    },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-slate-800/95 backdrop-blur-md border-r border-slate-700 shadow-lg transition-all duration-300 z-40 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">UHealth</h1>
                  <p className="text-xs text-slate-400">v2.1.0</p>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="text-slate-400 hover:text-white"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-12 ${collapsed ? "px-3" : "px-4"} ${
                    isActive ? "bg-blue-600 text-white shadow-lg" : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  } transition-all duration-200`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"} flex-shrink-0`} />
                  {!collapsed && <span className="flex-1 text-left font-medium">{item.label}</span>}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Dashboard Executivo</h1>
              <p className="text-lg text-white mt-2">Visão geral da saúde e performance organizacional</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-white">
                <Clock className="h-4 w-4 text-white" />
                Atualizado: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                {isLoading ? "Atualizando..." : "Atualizar"}
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="tech">Tecnologia</SelectItem>
                <SelectItem value="sales">Vendas</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="hr">RH</SelectItem>
                <SelectItem value="finance">Financeiro</SelectItem>
                <SelectItem value="operations">Operações</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[120px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mês</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthMetrics.map((metric, index) => {
              const Icon = metric.icon
              const TrendIcon = metric.trendDirection === "up" ? TrendingUp : TrendingDown
              const trendColor =
                metric.trendDirection === "up"
                  ? metric.status === "Crítico"
                    ? "text-red-400"
                    : "text-green-400"
                  : metric.status === "Crítico"
                    ? "text-green-400"
                    : "text-red-400"

              return (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 shadow-lg ${getCardBorderColor(
                    metric.status,
                  )} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-start p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-lg bg-slate-800">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{metric.title}</h3>
                      </div>

                      <p className="text-white text-base mb-4">{metric.description}</p>

                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-4xl font-bold text-white">{metric.value}</div>
                          <div className="text-sm text-white/80 mt-1">{metric.target}</div>
                        </div>

                        <div className={`flex items-center gap-1 ${trendColor} font-semibold`}>
                          <TrendIcon className="h-5 w-5" />
                          <span>{metric.trend}</span>
                        </div>

                        <div className="text-sm text-white/80">{metric.weight}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <Badge className={`${getStatusColor(metric.status)} border-0 px-4 py-1 text-sm font-bold`}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Progress
                      value={
                        metric.title === "ROI em Saúde"
                          ? 75
                          : metric.title === "Sinistralidade"
                            ? 85
                            : metric.title === "Risco de Burnout"
                              ? 30
                              : metric.title === "Absenteísmo"
                                ? 60
                                : metric.title === "ISP Geral"
                                  ? 72
                                  : 65
                      }
                      max={100}
                      className="h-2 bg-slate-700"
                      indicatorClassName={
                        metric.status === "Crítico"
                          ? "bg-red-500"
                          : metric.status === "Atenção"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Performance por Departamento */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Performance por Departamento</CardTitle>
              <CardDescription className="text-white/70">
                Comparativo de ISP e indicadores por departamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Tecnologia", isp: 65, trend: -5, status: "Atenção", employees: 67, alerts: 8 },
                  { name: "Vendas", isp: 82, trend: 3, status: "Excelente", employees: 45, alerts: 1 },
                  { name: "Marketing", isp: 78, trend: 1, status: "Bom", employees: 32, alerts: 0 },
                  { name: "RH", isp: 76, trend: 0, status: "Bom", employees: 18, alerts: 2 },
                  { name: "Financeiro", isp: 71, trend: -2, status: "Bom", employees: 28, alerts: 3 },
                  { name: "Operações", isp: 69, trend: 2, status: "Bom", employees: 89, alerts: 5 },
                ].map((dept, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
                    <div className="w-28 font-medium text-white">{dept.name}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{dept.isp}</span>
                          <div className={`flex items-center ${dept.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {dept.trend >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            <span className="text-xs">{Math.abs(dept.trend)}%</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(dept.status)}>{dept.status}</Badge>
                      </div>
                      <Progress value={dept.isp} max={100} className="h-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-white/70">
                        <Users className="h-3 w-3" />
                        <span className="text-xs">{dept.employees}</span>
                      </div>
                      {dept.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {dept.alerts} alertas
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alertas Críticos */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Alertas Críticos</CardTitle>
              <CardDescription className="text-white/70">Situações que requerem atenção imediata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    department: "Tecnologia",
                    issue: "Burnout Alto",
                    description: "32% dos colaboradores em risco crítico",
                    time: "2h atrás",
                    status: "Crítico",
                  },
                  {
                    department: "Operações",
                    issue: "Absenteísmo",
                    description: "Taxa de 6.8% acima da meta",
                    time: "4h atrás",
                    status: "Atenção",
                  },
                  {
                    department: "Financeiro",
                    issue: "Turnover",
                    description: "3 saídas voluntárias este mês",
                    time: "6h atrás",
                    status: "Atenção",
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 border-l-4 rounded-lg ${alert.status === "Crítico" ? "border-l-red-500 bg-red-500/10" : "border-l-yellow-500 bg-yellow-500/10"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-white">
                            {alert.department} - {alert.issue}
                          </h4>
                          <Badge
                            className={
                              alert.status === "Crítico"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }
                          >
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/70 mt-1">{alert.description}</p>
                        <p className="text-xs text-white/50 mt-1">{alert.time}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                        Investigar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Matriz de Risco */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Matriz de Risco por Departamento</CardTitle>
              <CardDescription className="text-white/70">
                Mapeamento de probabilidade vs. impacto organizacional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 bg-slate-800 rounded-lg border border-slate-700 p-4">
                {/* Eixos */}
                <div className="absolute bottom-4 left-4 right-4 h-px bg-slate-600"></div>
                <div className="absolute bottom-4 left-4 top-4 w-px bg-slate-600"></div>

                {/* Labels dos eixos */}
                <div className="absolute bottom-1 right-1/2 transform translate-x-1/2 text-xs text-white/50">
                  Probabilidade de Risco →
                </div>
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-white/50">
                  Impacto Organizacional ↑
                </div>

                {/* Departamentos posicionados */}
                <div
                  className="absolute w-6 h-6 rounded-full bg-red-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "80%", bottom: "85%" }}
                  title="Tecnologia: Alto Risco"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-yellow-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "50%", bottom: "80%" }}
                  title="Vendas: Médio Risco"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-green-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "25%", bottom: "50%" }}
                  title="Marketing: Baixo Risco"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-yellow-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "45%", bottom: "55%" }}
                  title="RH: Médio Risco"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-green-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "30%", bottom: "25%" }}
                  title="Financeiro: Baixo Risco"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-red-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "75%", bottom: "45%" }}
                  title="Operações: Alto Risco"
                ></div>
              </div>

              {/* Legenda */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-white/70">Alto Risco</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-white/70">Médio Risco</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-white/70">Baixo Risco</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
