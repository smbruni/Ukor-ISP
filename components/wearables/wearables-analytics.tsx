"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Heart,
  Moon,
  Footprints,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Download,
} from "lucide-react"

export function WearablesAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")

  // Dados agregados da empresa
  const companyMetrics = {
    totalUsers: 847,
    totalDevices: 1203,
    dataPoints: 2847392,
    avgSteps: 6847,
    avgSleep: 7.2,
    avgRestingHR: 67,
    avgHRV: 42,
    avgStressLevel: 35,
    activeMinutes: 127,
    caloriesBurned: 2340,
  }

  // Distribuição por dispositivo
  const deviceDistribution = [
    { brand: "Garmin", users: 234, percentage: 27.6, avgScore: 78 },
    { brand: "Apple Health", users: 198, percentage: 23.4, avgScore: 82 },
    { brand: "Fitbit", users: 156, percentage: 18.4, avgScore: 75 },
    { brand: "WHOOP", users: 89, percentage: 10.5, avgScore: 85 },
    { brand: "Samsung Health", users: 78, percentage: 9.2, avgScore: 73 },
    { brand: "Google Fit", users: 67, percentage: 7.9, avgScore: 71 },
    { brand: "Polar", users: 25, percentage: 3.0, avgScore: 80 },
  ]

  // Métricas por departamento com dados de wearables
  const departmentMetrics = [
    {
      department: "Tecnologia",
      employees: 156,
      connectedUsers: 89,
      connectionRate: 57,
      avgSteps: 4250,
      avgSleep: 6.1,
      avgHR: 74,
      avgHRV: 35,
      stressLevel: 52,
      ispScore: 58,
      riskLevel: "Alto",
      insights: [
        "Sedentarismo elevado (4.250 passos/dia)",
        "Sono insuficiente (6.1h vs 7-9h recomendado)",
        "Estresse alto correlacionado com baixa HRV",
        "Oportunidade: programa de pausas ativas",
      ],
    },
    {
      department: "Vendas",
      employees: 89,
      connectedUsers: 67,
      connectionRate: 75,
      avgSteps: 8920,
      avgSleep: 6.8,
      avgHR: 68,
      avgHRV: 45,
      stressLevel: 42,
      ispScore: 72,
      riskLevel: "Médio",
      insights: [
        "Boa atividade física (8.920 passos/dia)",
        "Sono comprometido por viagens",
        "HRV indica boa recuperação",
        "Picos de estresse em fechamentos",
      ],
    },
    {
      department: "Marketing",
      employees: 67,
      connectedUsers: 58,
      connectionRate: 87,
      avgSteps: 6780,
      avgSleep: 7.8,
      avgHR: 62,
      avgHRV: 48,
      stressLevel: 28,
      ispScore: 84,
      riskLevel: "Baixo",
      insights: [
        "Melhor qualidade de sono da empresa",
        "Excelente gestão de estresse",
        "HRV alta indica ótima recuperação",
        "Modelo para outros departamentos",
      ],
    },
    {
      department: "RH",
      employees: 34,
      connectedUsers: 31,
      connectionRate: 91,
      avgSteps: 7200,
      avgSleep: 7.4,
      avgHR: 65,
      avgHRV: 44,
      stressLevel: 31,
      ispScore: 79,
      riskLevel: "Baixo",
      insights: [
        "Alta adesão aos wearables (91%)",
        "Bom equilíbrio trabalho-vida",
        "Sono de qualidade",
        "Atividade física moderada",
      ],
    },
    {
      department: "Financeiro",
      employees: 45,
      connectedUsers: 28,
      connectionRate: 62,
      avgSteps: 5890,
      avgSleep: 6.9,
      avgHR: 71,
      avgHRV: 38,
      stressLevel: 48,
      ispScore: 65,
      riskLevel: "Médio",
      insights: [
        "Baixa adesão aos wearables",
        "Estresse elevado em fechamentos",
        "Sono irregular",
        "Necessita intervenção em wellness",
      ],
    },
  ]

  // Correlações entre métricas de wearables e ISP
  const correlationData = [
    {
      metric: "Passos Diários",
      ispPillar: "Saúde Física",
      correlation: 0.78,
      impact: "Alto",
      description: "Cada 1.000 passos aumenta 3.2 pontos no ISP Físico",
      recommendation: "Meta: 8.000+ passos/dia",
    },
    {
      metric: "Qualidade do Sono",
      ispPillar: "Sono",
      correlation: 0.85,
      impact: "Muito Alto",
      description: "Maior preditor do ISP total (peso 23%)",
      recommendation: "Meta: 7-9h com 85%+ eficiência",
    },
    {
      metric: "HRV (Variabilidade FC)",
      ispPillar: "Gestão de Estresse",
      correlation: 0.72,
      impact: "Alto",
      description: "HRV alta = melhor recuperação e menor estresse",
      recommendation: "Monitorar tendências semanais",
    },
    {
      metric: "FC em Repouso",
      ispPillar: "Saúde Física",
      correlation: -0.65,
      impact: "Médio",
      description: "FC baixa indica melhor condicionamento",
      recommendation: "Meta: 50-70 bpm",
    },
    {
      metric: "Minutos Ativos",
      ispPillar: "Saúde Física",
      correlation: 0.69,
      impact: "Alto",
      description: "Exercício regular melhora múltiplos pilares",
      recommendation: "Meta: 150+ min/semana",
    },
    {
      metric: "Nível de Estresse",
      ispPillar: "Gestão de Estresse",
      correlation: -0.74,
      impact: "Alto",
      description: "Estresse alto impacta sono e recuperação",
      recommendation: "Técnicas de relaxamento",
    },
  ]

  // Insights preditivos baseados em wearables
  const predictiveInsights = [
    {
      type: "opportunity",
      title: "Oportunidade de Melhoria",
      description: "Aumentar passos médios para 8.000/dia pode elevar ISP geral em 12 pontos",
      impact: "Redução de 18% na sinistralidade",
      action: "Implementar programa de caminhada",
      priority: "Alta",
    },
    {
      type: "risk",
      title: "Risco Identificado",
      description: "67% do TI com sono < 6.5h/noite",
      impact: "Aumento de 35% no risco de burnout",
      action: "Programa de higiene do sono",
      priority: "Crítica",
    },
    {
      type: "trend",
      title: "Tendência Positiva",
      description: "HRV média aumentou 8% nos últimos 3 meses",
      impact: "Melhoria na capacidade de recuperação",
      action: "Manter estratégias atuais",
      priority: "Baixa",
    },
    {
      type: "alert",
      title: "Alerta Preventivo",
      description: "Pico de estresse detectado em 23 colaboradores",
      impact: "Possível impacto na produtividade",
      action: "Intervenção imediata",
      priority: "Alta",
    },
  ]

  const getConnectionRateColor = (rate) => {
    if (rate >= 80) return "text-green-600"
    if (rate >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Alto":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300"
      case "Médio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Baixo":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getCorrelationColor = (correlation) => {
    const abs = Math.abs(correlation)
    if (abs >= 0.8) return "text-green-600"
    if (abs >= 0.6) return "text-blue-600"
    if (abs >= 0.4) return "text-yellow-600"
    return "text-red-600"
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case "opportunity":
        return <Target className="h-5 w-5 text-blue-600" />
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "trend":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "alert":
        return <Zap className="h-5 w-5 text-orange-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics de Wearables</h2>
          <p className="text-muted-foreground">Análise completa dos dados de dispositivos vestíveis e impacto no ISP</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="departments">Por Departamento</TabsTrigger>
          <TabsTrigger value="correlations">Correlações ISP</TabsTrigger>
          <TabsTrigger value="insights">Insights Preditivos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Métricas Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="ukor-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Usuários Conectados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{companyMetrics.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    {((companyMetrics.totalUsers / 1247) * 100).toFixed(1)}% da empresa
                  </p>
                  <Progress value={(companyMetrics.totalUsers / 1247) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Dispositivos Ativos</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {companyMetrics.totalDevices.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Múltiplos dispositivos por usuário</p>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Pontos de Dados</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {(companyMetrics.dataPoints / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-muted-foreground">Coletados nos últimos 30 dias</p>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">ISP Médio</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">73</div>
                  <p className="text-xs text-muted-foreground">+8 pontos com wearables</p>
                </CardContent>
              </Card>
            </div>

            {/* Métricas de Saúde Principais */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Footprints className="h-8 w-8 text-ukor-primary mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{companyMetrics.avgSteps.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Passos/Dia</div>
                  <Progress value={(companyMetrics.avgSteps / 10000) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Moon className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{companyMetrics.avgSleep}h</div>
                  <div className="text-sm text-muted-foreground">Sono/Noite</div>
                  <Progress value={(companyMetrics.avgSleep / 9) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{companyMetrics.avgRestingHR}</div>
                  <div className="text-sm text-muted-foreground">FC Repouso</div>
                  <Progress value={100 - ((companyMetrics.avgRestingHR - 50) / 40) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{companyMetrics.avgHRV}</div>
                  <div className="text-sm text-muted-foreground">HRV Médio</div>
                  <Progress value={(companyMetrics.avgHRV / 60) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{companyMetrics.avgStressLevel}</div>
                  <div className="text-sm text-muted-foreground">Estresse</div>
                  <Progress value={100 - companyMetrics.avgStressLevel} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{companyMetrics.activeMinutes}</div>
                  <div className="text-sm text-muted-foreground">Min Ativos</div>
                  <Progress value={(companyMetrics.activeMinutes / 150) * 100} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Distribuição por Dispositivo */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Distribuição por Dispositivo</CardTitle>
                <CardDescription>Adoção e performance por marca de wearable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceDistribution.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ukor-primary to-ukor-accent flex items-center justify-center text-white font-semibold text-sm">
                          {device.brand.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{device.brand}</h4>
                          <p className="text-sm text-muted-foreground">{device.users} usuários</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-foreground">{device.percentage}%</div>
                          <div className="text-xs text-muted-foreground">Adoção</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-foreground">{device.avgScore}</div>
                          <div className="text-xs text-muted-foreground">ISP Médio</div>
                        </div>
                        <div className="w-24">
                          <Progress value={device.percentage} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <div className="space-y-6">
            {departmentMetrics.map((dept, index) => (
              <Card key={index} className="ukor-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-foreground">{dept.department}</CardTitle>
                      <CardDescription>
                        {dept.employees} colaboradores • {dept.connectedUsers} conectados (
                        <span className={getConnectionRateColor(dept.connectionRate)}>{dept.connectionRate}%</span>)
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRiskColor(dept.riskLevel)}>Risco {dept.riskLevel}</Badge>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{dept.ispScore}</div>
                        <div className="text-xs text-muted-foreground">ISP Score</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-foreground">{dept.avgSteps.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Passos/Dia</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-foreground">{dept.avgSleep}h</div>
                      <div className="text-sm text-muted-foreground">Sono/Noite</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-foreground">{dept.avgHR}</div>
                      <div className="text-sm text-muted-foreground">FC Repouso</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-foreground">{dept.avgHRV}</div>
                      <div className="text-sm text-muted-foreground">HRV</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-foreground">{dept.stressLevel}</div>
                      <div className="text-sm text-muted-foreground">Estresse</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-foreground">{dept.connectionRate}%</div>
                      <div className="text-sm text-muted-foreground">Conexão</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Insights Baseados em Wearables:</h4>
                    <ul className="space-y-2">
                      {dept.insights.map((insight, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-ukor-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="correlations">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Correlações entre Wearables e ISP</CardTitle>
              <CardDescription>Como os dados de dispositivos vestíveis impactam os pilares do ISP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlationData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:border-ukor-primary/20 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{item.metric}</h4>
                        <p className="text-sm text-muted-foreground">Métrica do Wearable</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.ispPillar}</h4>
                        <p className="text-sm text-muted-foreground">Pilar ISP</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getCorrelationColor(item.correlation)}`}>
                          {item.correlation > 0 ? "+" : ""}
                          {item.correlation.toFixed(2)}
                        </div>
                        <p className="text-sm text-muted-foreground">Correlação</p>
                      </div>
                      <div className="text-center">
                        <Badge
                          variant={
                            item.impact === "Muito Alto"
                              ? "destructive"
                              : item.impact === "Alto"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {item.impact}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">Impacto</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">{item.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictiveInsights.map((insight, index) => (
              <Card key={index} className="ukor-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <CardTitle className="text-foreground">{insight.title}</CardTitle>
                      <Badge
                        variant={
                          insight.priority === "Crítica"
                            ? "destructive"
                            : insight.priority === "Alta"
                              ? "default"
                              : "secondary"
                        }
                      >
                        Prioridade {insight.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium text-foreground mb-1">Impacto Previsto:</h5>
                      <p className="text-sm text-muted-foreground">{insight.impact}</p>
                    </div>
                    <div className="p-3 bg-ukor-light rounded-lg">
                      <h5 className="font-medium text-ukor-dark mb-1">Ação Recomendada:</h5>
                      <p className="text-sm text-ukor-dark">{insight.action}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
