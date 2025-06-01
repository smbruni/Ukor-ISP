"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Heart,
  Footprints,
  Moon,
  Zap,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Wifi,
  Server,
  Clock,
  Database,
} from "lucide-react"

export function RealTimeMetricsContent() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const liveHealthData = {
    activeUsers: 623,
    heartbeats: 2847392,
    steps: 1834567,
    calories: 892456,
    sleepingUsers: 89,
    highStressUsers: 45,
    activeWorkouts: 23,
  }

  const realTimeAlerts = [
    {
      id: 1,
      type: "critical",
      user: "Maria Santos",
      department: "TI",
      metric: "Frequência Cardíaca",
      value: "145 bpm",
      normal: "60-80 bpm",
      timestamp: "Agora",
    },
    {
      id: 2,
      type: "warning",
      user: "João Silva",
      department: "Vendas",
      metric: "Sono",
      value: "3.2h",
      normal: "7-9h",
      timestamp: "2 min atrás",
    },
    {
      id: 3,
      type: "warning",
      user: "Carlos Lima",
      department: "Marketing",
      metric: "Estresse (HRV)",
      value: "40% abaixo",
      normal: "baseline",
      timestamp: "5 min atrás",
    },
    {
      id: 4,
      type: "success",
      user: "Ana Costa",
      department: "RH",
      metric: "Atividade",
      value: "10.000 passos",
      normal: "Meta atingida!",
      timestamp: "8 min atrás",
    },
  ]

  const healthTrends = [
    {
      metric: "Atividade Física",
      current: 6847,
      target: 8000,
      unit: "passos/dia",
      trend: "up",
      change: "+3.2%",
      status: "melhorando",
    },
    {
      metric: "Qualidade do Sono",
      current: 7.2,
      target: 8.0,
      unit: "h/noite",
      trend: "down",
      change: "-0.8%",
      status: "piorando",
    },
    {
      metric: "Nível de Estresse",
      current: 35,
      target: 25,
      unit: "pontos",
      trend: "up",
      change: "+5.1%",
      status: "preocupante",
    },
    {
      metric: "Frequência Cardíaca",
      current: 67,
      target: 65,
      unit: "bpm",
      trend: "stable",
      change: "0%",
      status: "estável",
    },
  ]

  const departmentStatus = [
    {
      name: "Tecnologia",
      activeUsers: 89,
      avgHeartRate: 74,
      avgStress: 52,
      alerts: 8,
      status: "attention",
    },
    {
      name: "Vendas",
      activeUsers: 67,
      avgHeartRate: 68,
      avgStress: 42,
      alerts: 3,
      status: "good",
    },
    {
      name: "Marketing",
      activeUsers: 58,
      avgHeartRate: 62,
      avgStress: 28,
      alerts: 1,
      status: "excellent",
    },
    {
      name: "RH",
      activeUsers: 31,
      avgHeartRate: 65,
      avgStress: 31,
      alerts: 0,
      status: "excellent",
    },
    {
      name: "Financeiro",
      activeUsers: 28,
      avgHeartRate: 71,
      avgStress: 48,
      alerts: 5,
      status: "attention",
    },
  ]

  const systemMetrics = {
    apiLatency: 2.3,
    dataProcessed: 98.7,
    uptime: 99.7,
    connectedDevices: 1203,
    dataFlow: 847,
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />
      case "down":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getTrendColor = (status: string) => {
    switch (status) {
      case "melhorando":
        return "text-green-600"
      case "piorando":
        return "text-red-600"
      case "preocupante":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-500 bg-red-50 dark:bg-red-950"
      case "warning":
        return "border-orange-500 bg-orange-50 dark:bg-orange-950"
      case "success":
        return "border-green-500 bg-green-50 dark:bg-green-950"
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-950"
    }
  }

  const getDepartmentStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500"
      case "good":
        return "bg-blue-500"
      case "attention":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Métricas em Tempo Real</h1>
          <p className="text-muted-foreground">
            Monitoramento contínuo de saúde e bem-estar • Atualizado em {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Sistema Online</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="health" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="health">Dados de Saúde</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          {/* Live Health Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{liveHealthData.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">sendo monitorados agora</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Batimentos Hoje</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">
                  {(liveHealthData.heartbeats / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-muted-foreground">registrados hoje</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Passos Hoje</CardTitle>
                <Footprints className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">{(liveHealthData.steps / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground">dados pela empresa</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calorias Hoje</CardTitle>
                <Zap className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">{(liveHealthData.calories / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">queimadas coletivamente</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Activity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Moon className="h-5 w-5 text-purple-500" />
                  <span>Dormindo Agora</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-500">{liveHealthData.sleepingUsers}</div>
                <p className="text-sm text-muted-foreground">colaboradores em repouso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Estresse Alto</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{liveHealthData.highStressUsers}</div>
                <p className="text-sm text-muted-foreground">usuários com estresse detectado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  <span>Exercícios Ativos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{liveHealthData.activeWorkouts}</div>
                <p className="text-sm text-muted-foreground">em andamento agora</p>
              </CardContent>
            </Card>
          </div>

          {/* Department Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status por Departamento</CardTitle>
              <CardDescription>Monitoramento em tempo real por área</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStatus.map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getDepartmentStatusColor(dept.status)}`}></div>
                      <div>
                        <h4 className="font-medium">{dept.name}</h4>
                        <p className="text-sm text-muted-foreground">{dept.activeUsers} usuários ativos</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{dept.avgHeartRate}</p>
                        <p className="text-muted-foreground">FC média</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{dept.avgStress}</p>
                        <p className="text-muted-foreground">Estresse</p>
                      </div>
                      <div className="text-center">
                        <Badge variant={dept.alerts > 0 ? "destructive" : "secondary"}>{dept.alerts} alertas</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Alertas em Tempo Real</span>
              </CardTitle>
              <CardDescription>Situações que precisam atenção imediata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realTimeAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border-l-4 rounded-lg ${getAlertColor(alert.type)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{alert.user}</h4>
                          <Badge variant="outline">{alert.department}</Badge>
                          <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                        </div>
                        <p className="text-sm mt-1">
                          <span className="font-medium">{alert.metric}:</span> {alert.value}
                          <span className="text-muted-foreground ml-2">(normal: {alert.normal})</span>
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Investigar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Saúde</CardTitle>
              <CardDescription>Como a saúde da empresa está evoluindo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthTrends.map((trend) => (
                  <div key={trend.metric} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{trend.metric}</h4>
                      <div className={`flex items-center space-x-1 ${getTrendColor(trend.status)}`}>
                        {getTrendIcon(trend.trend)}
                        <span className="text-sm font-medium">{trend.change}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Atual: {trend.current} {trend.unit}
                        </span>
                        <span>
                          Meta: {trend.target} {trend.unit}
                        </span>
                      </div>
                      <Progress value={(trend.current / trend.target) * 100} className="h-2" />
                      <p className={`text-sm ${getTrendColor(trend.status)}`}>{trend.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-blue-500" />
                <span>Performance do Sistema</span>
              </CardTitle>
              <CardDescription>Status da infraestrutura e processamento de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Latência da API</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-500">{systemMetrics.apiLatency}s</div>
                  <p className="text-sm text-green-600">Excelente</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Processamento</span>
                  </div>
                  <div className="text-2xl font-bold text-green-500">{systemMetrics.dataProcessed}%</div>
                  <p className="text-sm text-muted-foreground">dos dados processados</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Uptime</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-500">{systemMetrics.uptime}%</div>
                  <p className="text-sm text-muted-foreground">de disponibilidade</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Dispositivos</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-500">
                    {systemMetrics.connectedDevices.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">conectados</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Fluxo de Dados</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-500">{systemMetrics.dataFlow}</div>
                  <p className="text-sm text-muted-foreground">pontos/segundo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
