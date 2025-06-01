"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Shield,
  Users,
  Activity,
  Calendar,
  Filter,
  Download,
} from "lucide-react"

export function ExecutiveDashboardCompact() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedView, setSelectedView] = useState("cards")

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setLastUpdated(new Date())
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Crítico":
        return "bg-red-500 text-white"
      case "Atenção":
        return "bg-yellow-500 text-black"
      case "Bom":
        return "bg-green-500 text-white"
      case "Excelente":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "Crítico":
        return "bg-red-500"
      case "Atenção":
        return "bg-yellow-500"
      case "Bom":
        return "bg-green-500"
      case "Excelente":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const mainMetrics = [
    {
      title: "ROI em Saúde",
      value: "R$ 2.8M",
      status: "Bom",
      trend: "+18%",
      trendDirection: "up",
      icon: DollarSign,
      description: "Retorno sobre investimento",
      target: "Meta: R$ 3.2M",
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
    },
    {
      title: "Risco de Burnout",
      value: "23",
      status: "Crítico",
      trend: "+8%",
      trendDirection: "up",
      icon: AlertTriangle,
      description: "Colaboradores em risco",
      target: "Meta: <10",
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
    },
    {
      title: "ISP Geral",
      value: "73",
      status: "Bom",
      trend: "+5",
      trendDirection: "up",
      icon: Activity,
      description: "Índice de Saúde e Performance",
      target: "Meta: 80",
    },
  ]

  const departmentPerformance = [
    {
      name: "Tecnologia",
      isp: 65,
      trend: -5,
      status: "Atenção",
      riskLevel: "Alto",
      employees: 67,
      alerts: 8,
    },
    {
      name: "Vendas",
      isp: 82,
      trend: 3,
      status: "Excelente",
      riskLevel: "Baixo",
      employees: 45,
      alerts: 1,
    },
    {
      name: "Marketing",
      isp: 78,
      trend: 1,
      status: "Bom",
      riskLevel: "Baixo",
      employees: 32,
      alerts: 0,
    },
    {
      name: "RH",
      isp: 76,
      trend: 0,
      status: "Bom",
      riskLevel: "Médio",
      employees: 18,
      alerts: 2,
    },
    {
      name: "Financeiro",
      isp: 71,
      trend: -2,
      status: "Bom",
      riskLevel: "Médio",
      employees: 28,
      alerts: 3,
    },
    {
      name: "Operações",
      isp: 69,
      trend: 2,
      status: "Bom",
      riskLevel: "Médio",
      employees: 89,
      alerts: 5,
    },
  ]

  const criticalAlerts = [
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
  ]

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Executivo</h1>
          <p className="text-white/80">Visão consolidada dos principais indicadores</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-2">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[140px] bg-transparent border-0 text-white">
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
          </div>

          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[120px] bg-transparent border-0 text-white">
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

          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-2">
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-[120px] bg-transparent border-0 text-white">
                <SelectValue placeholder="Visualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cards">Cards</SelectItem>
                <SelectItem value="table">Tabela</SelectItem>
                <SelectItem value="charts">Gráficos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Atualizando..." : "Atualizar"}
          </Button>

          <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Última atualização */}
      <div className="flex items-center gap-2 text-sm text-white/70">
        <Clock className="h-4 w-4" />
        Atualizado em: {lastUpdated.toLocaleTimeString()}
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mainMetrics.map((metric, index) => {
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
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 overflow-hidden shadow-lg"
            >
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-700/50">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <Badge className={`${getStatusColor(metric.status)}`}>{metric.status}</Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-white mt-2">{metric.title}</CardTitle>
                <CardDescription className="text-white/70">{metric.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className={`flex items-center gap-1 ${trendColor}`}>
                    <TrendIcon className="h-4 w-4" />
                    <span className="text-sm">{metric.trend}</span>
                  </div>
                </div>
                <div className="text-xs text-white/70 mt-1">{metric.target}</div>
                <Progress
                  value={
                    metric.status === "Crítico"
                      ? 30
                      : metric.status === "Atenção"
                        ? 60
                        : metric.status === "Bom"
                          ? 80
                          : 95
                  }
                  className="h-1 mt-3 bg-slate-700"
                  indicatorClassName={getProgressColor(metric.status)}
                />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tabs para diferentes visualizações */}
      <Tabs defaultValue="performance" className="mt-6">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700">
            Performance por Departamento
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-700">
            Alertas Críticos
          </TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-slate-700">
            Matriz de Risco
          </TabsTrigger>
        </TabsList>

        {/* Performance por Departamento */}
        <TabsContent value="performance">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white">Performance por Departamento</CardTitle>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </div>
              <CardDescription className="text-white/70">
                Comparativo de ISP e indicadores por departamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
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
                        <Badge className={`${getStatusColor(dept.status)}`}>{dept.status}</Badge>
                      </div>
                      <Progress
                        value={dept.isp}
                        max={100}
                        className="h-1"
                        indicatorClassName={getProgressColor(dept.status)}
                      />
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
        </TabsContent>

        {/* Alertas Críticos */}
        <TabsContent value="alerts">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white">Alertas Críticos</CardTitle>
                <Badge variant="destructive">{criticalAlerts.length} alertas ativos</Badge>
              </div>
              <CardDescription className="text-white/70">Situações que requerem atenção imediata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 border-l-4 rounded-lg ${
                      alert.status === "Crítico"
                        ? "border-l-red-500 bg-red-500/10"
                        : "border-l-yellow-500 bg-yellow-500/10"
                    }`}
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
                                ? "bg-red-500/20 text-red-300 border-red-500/30"
                                : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
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
        </TabsContent>

        {/* Matriz de Risco */}
        <TabsContent value="risk">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader className="pb-2">
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

                {/* Quadrantes */}
                <div className="absolute top-4 left-4 w-1/2 h-1/2 bg-green-500/10 rounded opacity-30"></div>
                <div className="absolute top-4 right-4 w-1/2 h-1/2 bg-yellow-500/10 rounded opacity-30"></div>
                <div className="absolute bottom-4 left-4 w-1/2 h-1/2 bg-yellow-500/10 rounded opacity-30"></div>
                <div className="absolute bottom-4 right-4 w-1/2 h-1/2 bg-red-500/10 rounded opacity-30"></div>

                {/* Departamentos (posicionados de acordo com risco) */}
                <div
                  className="absolute w-6 h-6 rounded-full bg-red-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "80%", bottom: "85%" }}
                  title="Tecnologia: Alto Risco, Alto Impacto"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-yellow-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "50%", bottom: "80%" }}
                  title="Vendas: Médio Risco, Alto Impacto"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-green-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "25%", bottom: "50%" }}
                  title="Marketing: Baixo Risco, Médio Impacto"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-yellow-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "45%", bottom: "55%" }}
                  title="RH: Médio Risco, Médio Impacto"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-green-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "30%", bottom: "25%" }}
                  title="Financeiro: Baixo Risco, Baixo Impacto"
                ></div>
                <div
                  className="absolute w-6 h-6 rounded-full bg-red-500 border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "75%", bottom: "45%" }}
                  title="Operações: Alto Risco, Médio Impacto"
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
                <div className="flex items-center space-x-2 text-xs text-white/70">
                  <Users className="h-3 w-3" />
                  <span>Total: 279 colaboradores</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
