"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Target,
  Zap,
} from "lucide-react"

export function BenefitsAnalytics() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState("12m")

  // Dados dos benefícios em tempo real
  const benefitsData = {
    wellhub: {
      name: "Wellhub",
      type: "Fitness & Bem-estar",
      totalUsers: 847,
      activeUsers: 296,
      utilizationRate: 35,
      monthlyCost: 89500,
      costPerUser: 105.67,
      costPerActiveUser: 302.36,
      avgSessionsPerUser: 8.2,
      topActivities: ["Academia", "Yoga", "Natação", "Pilates"],
      satisfaction: 4.2,
      roi: 180,
      healthImpact: {
        stepsIncrease: 23,
        sleepImprovement: 15,
        stressReduction: 18,
        ispContribution: 12,
      },
      predictedSavings: 245000,
      riskLevel: "Baixo",
      trend: "up",
      apiStatus: "connected",
      lastSync: "2 min atrás",
    },
    zenklub: {
      name: "Zenklub",
      type: "Saúde Mental",
      totalUsers: 1247,
      activeUsers: 349,
      utilizationRate: 28,
      monthlyCost: 67800,
      costPerUser: 54.37,
      costPerActiveUser: 194.27,
      avgSessionsPerUser: 2.1,
      topServices: ["Terapia", "Psiquiatria", "Coaching", "Meditação"],
      satisfaction: 4.8,
      roi: 180,
      healthImpact: {
        anxietyReduction: 35,
        depressionImprovement: 28,
        burnoutPrevention: 18,
        ispContribution: 18,
      },
      predictedSavings: 380000,
      riskLevel: "Médio",
      trend: "up",
      apiStatus: "connected",
      lastSync: "5 min atrás",
    },
    vittude: {
      name: "Vittude",
      type: "Terapia Online",
      totalUsers: 1247,
      activeUsers: 234,
      utilizationRate: 18.8,
      monthlyCost: 45600,
      costPerUser: 36.57,
      costPerActiveUser: 194.87,
      avgSessionsPerUser: 2.1,
      topServices: ["Psicoterapia", "Terapia de Casal", "Orientação Vocacional"],
      satisfaction: 4.6,
      roi: 180,
      healthImpact: {
        mentalHealthImprovement: 32,
        relationshipSatisfaction: 25,
        workPerformance: 20,
        ispContribution: 8,
      },
      predictedSavings: 125000,
      riskLevel: "Alto",
      trend: "down",
      apiStatus: "connected",
      lastSync: "1h atrás",
    },
    totalpass: {
      name: "TotalPass",
      type: "Alimentação & Mobilidade",
      totalUsers: 1247,
      activeUsers: 524,
      utilizationRate: 42,
      monthlyCost: 156700,
      costPerUser: 125.7,
      costPerActiveUser: 299.05,
      avgTransactionsPerUser: 18.5,
      topCategories: ["Alimentação", "Transporte", "Farmácia", "Combustível"],
      satisfaction: 4.5,
      roi: 145,
      healthImpact: {
        nutritionImprovement: 22,
        stressReduction: 15,
        timeOptimization: 30,
        ispContribution: 10,
      },
      predictedSavings: 89000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "30 min atrás",
    },
    va: {
      name: "Vale Alimentação",
      type: "Benefícios Tradicionais",
      totalUsers: 1500,
      activeUsers: 1300,
      utilizationRate: 86.7,
      monthlyCost: 50000,
      costPerUser: 33.33,
      costPerActiveUser: 38.46,
      avgTransactionsPerUser: 12.5,
      topCategories: ["Restaurante", "Supermercado", "Farmácia"],
      satisfaction: 4.4,
      roi: 160,
      healthImpact: {
        nutritionImprovement: 20,
        ispContribution: 9,
      },
      predictedSavings: 70000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "45 min atrás",
    },
    vr: {
      name: "Vale Refeição",
      type: "Benefícios Tradicionais",
      totalUsers: 1400,
      activeUsers: 1200,
      utilizationRate: 85.7,
      monthlyCost: 40000,
      costPerUser: 28.57,
      costPerActiveUser: 33.33,
      avgTransactionsPerUser: 10.5,
      topCategories: ["Restaurante", "Supermercado"],
      satisfaction: 4.3,
      roi: 150,
      healthImpact: {
        nutritionImprovement: 18,
        ispContribution: 8,
      },
      predictedSavings: 60000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "1h atrás",
    },
    vt: {
      name: "Vale Transporte",
      type: "Benefícios Tradicionais",
      totalUsers: 1300,
      activeUsers: 1100,
      utilizationRate: 84.6,
      monthlyCost: 30000,
      costPerUser: 23.08,
      costPerActiveUser: 27.27,
      avgTransactionsPerUser: 8.5,
      topCategories: ["Transporte Público", "Taxi"],
      satisfaction: 4.2,
      roi: 140,
      healthImpact: {
        timeOptimization: 25,
        ispContribution: 7,
      },
      predictedSavings: 50000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "1h 30 min atrás",
    },
    healthPlan: {
      name: "Plano de Saúde",
      type: "Benefícios de Saúde",
      totalUsers: 1600,
      activeUsers: 1400,
      utilizationRate: 87.5,
      monthlyCost: 100000,
      costPerUser: 62.5,
      costPerActiveUser: 71.43,
      avgClaimsPerUser: 5.5,
      topClaims: ["Consulta Médica", "Exames"],
      satisfaction: 4.6,
      roi: 170,
      healthImpact: {
        healthImprovement: 30,
        ispContribution: 15,
      },
      predictedSavings: 90000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "2h atrás",
    },
    dentalPlan: {
      name: "Plano Odontológico",
      type: "Benefícios de Saúde",
      totalUsers: 1500,
      activeUsers: 1300,
      utilizationRate: 86.7,
      monthlyCost: 30000,
      costPerUser: 20,
      costPerActiveUser: 22.73,
      avgClaimsPerUser: 3.5,
      topClaims: ["Consulta Dentária", "Procedimentos"],
      satisfaction: 4.5,
      roi: 160,
      healthImpact: {
        oralHealthImprovement: 25,
        ispContribution: 10,
      },
      predictedSavings: 40000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "2h 30 min atrás",
    },
    gympass: {
      name: "Gympass",
      type: "Outros Benefícios",
      totalUsers: 1200,
      activeUsers: 1000,
      utilizationRate: 83.3,
      monthlyCost: 20000,
      costPerUser: 16.67,
      costPerActiveUser: 20,
      avgSessionsPerUser: 6.5,
      topActivities: ["Academia", "Yoga"],
      satisfaction: 4.4,
      roi: 150,
      healthImpact: {
        fitnessImprovement: 22,
        ispContribution: 9,
      },
      predictedSavings: 30000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "3h atrás",
    },
    homeOffice: {
      name: "Auxílio Home Office",
      type: "Outros Benefícios",
      totalUsers: 1100,
      activeUsers: 900,
      utilizationRate: 81.8,
      monthlyCost: 15000,
      costPerUser: 13.64,
      costPerActiveUser: 16.67,
      avgUsagePerUser: 4.5,
      satisfaction: 4.3,
      roi: 140,
      healthImpact: {
        productivityImprovement: 20,
        ispContribution: 8,
      },
      predictedSavings: 20000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "3h 30 min atrás",
    },
    educationAssistance: {
      name: "Auxílio Educação",
      type: "Outros Benefícios",
      totalUsers: 1000,
      activeUsers: 800,
      utilizationRate: 80,
      monthlyCost: 10000,
      costPerUser: 10,
      costPerActiveUser: 12.5,
      avgUsagePerUser: 3.5,
      topServices: ["Cursos Online", "Workshops"],
      satisfaction: 4.2,
      roi: 130,
      healthImpact: {
        skillImprovement: 18,
        ispContribution: 7,
      },
      predictedSavings: 15000,
      riskLevel: "Baixo",
      trend: "stable",
      apiStatus: "connected",
      lastSync: "4h atrás",
    },
  }

  // Dados consolidados
  const consolidatedMetrics = {
    totalMonthlyCost: Object.values(benefitsData).reduce((sum, benefit) => sum + benefit.monthlyCost, 0),
    totalAnnualCost: Object.values(benefitsData).reduce((sum, benefit) => sum + benefit.monthlyCost * 12, 0),
    avgUtilizationRate:
      Object.values(benefitsData).reduce((sum, benefit) => sum + benefit.utilizationRate, 0) /
      Object.keys(benefitsData).length,
    totalActiveUsers: Object.values(benefitsData).reduce((sum, benefit) => sum + benefit.activeUsers, 0),
    avgSatisfaction:
      Object.values(benefitsData).reduce((sum, benefit) => sum + benefit.satisfaction, 0) /
      Object.keys(benefitsData).length,
    totalPredictedSavings: Object.values(benefitsData).reduce((sum, benefit) => sum + benefit.predictedSavings, 0),
    avgROI:
      Object.values(benefitsData).reduce((sum, benefit) => sum + benefit.roi, 0) / Object.keys(benefitsData).length,
    totalISPContribution: Object.values(benefitsData).reduce(
      (sum, benefit) => sum + benefit.healthImpact.ispContribution,
      0,
    ),
  }

  // Análises preditivas
  const predictiveAnalytics = {
    costOptimization: {
      currentSpend: consolidatedMetrics.totalAnnualCost,
      optimizedSpend: consolidatedMetrics.totalAnnualCost * 0.85,
      potentialSavings: consolidatedMetrics.totalAnnualCost * 0.15,
      confidence: 87,
      timeframe: "12 meses",
      recommendations: [
        "Renegociar contratos com base em utilização real",
        "Implementar programa de incentivos para aumentar uso",
        "Consolidar fornecedores similares",
        "Personalizar benefícios por perfil de colaborador",
      ],
    },
    utilizationPrediction: {
      currentRate: consolidatedMetrics.avgUtilizationRate,
      predictedRate: consolidatedMetrics.avgUtilizationRate * 1.25,
      improvement: 25,
      factors: [
        "Campanhas de conscientização",
        "Gamificação dos benefícios",
        "Integração com dados de saúde",
        "Personalização por departamento",
      ],
    },
    healthImpactProjection: {
      currentISP: 73,
      projectedISP: 78,
      improvement: 5,
      benefitsContribution: consolidatedMetrics.totalISPContribution,
      projectedContribution: consolidatedMetrics.totalISPContribution * 1.3,
    },
  }

  // Dados para gráficos
  const utilizationTrend = [
    { month: "Jan", wellhub: 68, zenklub: 32, vittude: 15, totalpass: 85, va: 80, vr: 75, vt: 70 },
    { month: "Fev", wellhub: 71, zenklub: 34, vittude: 17, totalpass: 86, va: 82, vr: 77, vt: 72 },
    { month: "Mar", wellhub: 69, zenklub: 35, vittude: 16, totalpass: 87, va: 84, vr: 79, vt: 74 },
    { month: "Abr", wellhub: 72, zenklub: 36, vittude: 18, totalpass: 88, va: 86, vr: 80, vt: 76 },
    { month: "Mai", wellhub: 74, zenklub: 37, vittude: 19, totalpass: 87, va: 88, vr: 81, vt: 78 },
    { month: "Jun", wellhub: 74, zenklub: 37, vittude: 19, totalpass: 87, va: 88, vr: 81, vt: 78 },
  ]

  const costBreakdown = [
    { name: "TotalPass", value: benefitsData.totalpass.monthlyCost, color: "#8884d8" },
    { name: "Wellhub", value: benefitsData.wellhub.monthlyCost, color: "#82ca9d" },
    { name: "Zenklub", value: benefitsData.zenklub.monthlyCost, color: "#ffc658" },
    { name: "Vittude", value: benefitsData.vittude.monthlyCost, color: "#ff7300" },
    { name: "Vale Alimentação", value: benefitsData.va.monthlyCost, color: "#ff6347" },
    { name: "Vale Refeição", value: benefitsData.vr.monthlyCost, color: "#4682b4" },
    { name: "Vale Transporte", value: benefitsData.vt.monthlyCost, color: "#2e8b57" },
    { name: "Plano de Saúde", value: benefitsData.healthPlan.monthlyCost, color: "#daa520" },
    { name: "Plano Odontológico", value: benefitsData.dentalPlan.monthlyCost, color: "#1e90ff" },
    { name: "Gympass", value: benefitsData.gympass.monthlyCost, color: "#ff4500" },
    { name: "Auxílio Home Office", value: benefitsData.homeOffice.monthlyCost, color: "#228b22" },
    { name: "Auxílio Educação", value: benefitsData.educationAssistance.monthlyCost, color: "#8a2be2" },
  ]

  const departmentUsage = [
    { department: "Tecnologia", wellhub: 45, zenklub: 67, vittude: 23, totalpass: 89, va: 80, vr: 75, vt: 70 },
    { department: "Vendas", wellhub: 78, zenklub: 34, vittude: 12, totalpass: 92, va: 82, vr: 77, vt: 72 },
    { department: "Marketing", wellhub: 82, zenklub: 45, vittude: 28, totalpass: 85, va: 84, vr: 79, vt: 74 },
    { department: "RH", wellhub: 91, zenklub: 56, vittude: 34, totalpass: 88, va: 86, vr: 80, vt: 76 },
    { department: "Financeiro", wellhub: 56, zenklub: 28, vittude: 15, totalpass: 83, va: 88, vr: 81, vt: 78 },
  ]

  const refreshData = async () => {
    setIsLoading(true)
    // Simular carregamento de dados em tempo real
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastUpdate(new Date())
    setIsLoading(false)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Alto":
        return "bg-red-100 text-red-800 border-red-200"
      case "Médio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Baixo":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-400" />
    }
  }

  const getApiStatusColor = (status) => {
    return status === "connected" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics de Benefícios</h1>
          <p className="text-muted-foreground">
            Monitoramento em tempo real de Wellhub, Zenklub, Vittude, TotalPass e análises preditivas
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-muted-foreground">Última atualização: {lastUpdate.toLocaleTimeString()}</div>
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Consolidados */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Custo Total Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(consolidatedMetrics.totalMonthlyCost)}
            </div>
            <p className="text-xs text-muted-foreground">{formatCurrency(consolidatedMetrics.totalAnnualCost)} anual</p>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Taxa de Utilização</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {consolidatedMetrics.avgUtilizationRate.toFixed(1)}%
            </div>
            <Progress value={consolidatedMetrics.avgUtilizationRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">ROI Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{consolidatedMetrics.avgROI.toFixed(0)}%</div>
            <p className="text-xs text-green-600">
              +{formatCurrency(consolidatedMetrics.totalPredictedSavings)} economia prevista
            </p>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Impacto no ISP</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">+{consolidatedMetrics.totalISPContribution}</div>
            <p className="text-xs text-muted-foreground">pontos no ISP total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="realtime">Tempo Real</TabsTrigger>
          <TabsTrigger value="predictive">Análise Preditiva</TabsTrigger>
          <TabsTrigger value="optimization">Otimização</TabsTrigger>
          <TabsTrigger value="impact">Impacto</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Cards dos Benefícios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(benefitsData).map(([key, benefit]) => (
                <Card key={key} className="ukor-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-foreground">{benefit.name}</CardTitle>
                        <CardDescription>{benefit.type}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(benefit.trend)}
                        <Badge className={getRiskColor(benefit.riskLevel)}>{benefit.riskLevel}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-lg font-bold text-foreground">{benefit.activeUsers}</div>
                        <div className="text-sm text-muted-foreground">Usuários Ativos</div>
                        <div className="text-xs text-blue-600">{benefit.utilizationRate.toFixed(1)}% utilização</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">{formatCurrency(benefit.monthlyCost)}</div>
                        <div className="text-sm text-muted-foreground">Custo Mensal</div>
                        <div className="text-xs text-green-600">ROI: {benefit.roi}%</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Satisfação:</span>
                        <span className="font-semibold text-foreground">⭐ {benefit.satisfaction}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Custo por usuário ativo:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(benefit.costPerActiveUser)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Impacto ISP:</span>
                        <span className="font-semibold text-foreground">
                          +{benefit.healthImpact.ispContribution} pontos
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status API:</span>
                        <span className={getApiStatusColor(benefit.apiStatus)}>
                          {benefit.apiStatus === "connected" ? "Conectado" : "Desconectado"}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Última sync: {benefit.lastSync}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Gráficos de Tendência */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Tendência de Utilização</CardTitle>
                  <CardDescription>Evolução da utilização por benefício (últimos 6 meses)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={utilizationTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="wellhub" stroke="#8884d8" name="Wellhub" />
                      <Line type="monotone" dataKey="zenklub" stroke="#82ca9d" name="Zenklub" />
                      <Line type="monotone" dataKey="vittude" stroke="#ffc658" name="Vittude" />
                      <Line type="monotone" dataKey="totalpass" stroke="#ff7300" name="TotalPass" />
                      <Line type="monotone" dataKey="va" stroke="#ff6347" name="Vale Alimentação" />
                      <Line type="monotone" dataKey="vr" stroke="#4682b4" name="Vale Refeição" />
                      <Line type="monotone" dataKey="vt" stroke="#2e8b57" name="Vale Transporte" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Distribuição de Custos</CardTitle>
                  <CardDescription>Breakdown dos custos mensais por benefício</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="realtime">
          <div className="space-y-6">
            {/* Status em Tempo Real */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(benefitsData).map(([key, benefit]) => (
                <Card key={key} className="ukor-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{benefit.name}</h4>
                      <div
                        className={`w-3 h-3 rounded-full ${benefit.apiStatus === "connected" ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                      />
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Usuários online:</span>
                        <span className="font-semibold text-foreground">{Math.round(benefit.activeUsers * 0.3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transações hoje:</span>
                        <span className="font-semibold text-foreground">{Math.round(benefit.activeUsers * 0.8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Última sync:</span>
                        <span className="text-xs text-muted-foreground">{benefit.lastSync}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Utilização por Departamento */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Utilização por Departamento</CardTitle>
                <CardDescription>Taxa de utilização de cada benefício por departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="wellhub" fill="#8884d8" name="Wellhub" />
                    <Bar dataKey="zenklub" fill="#82ca9d" name="Zenklub" />
                    <Bar dataKey="vittude" fill="#ffc658" name="Vittude" />
                    <Bar dataKey="totalpass" fill="#ff7300" name="TotalPass" />
                    <Bar dataKey="va" fill="#ff6347" name="Vale Alimentação" />
                    <Bar dataKey="vr" fill="#4682b4" name="Vale Refeição" />
                    <Bar dataKey="vt" fill="#2e8b57" name="Vale Transporte" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Alertas em Tempo Real - MELHORADO */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Alertas em Tempo Real
                </CardTitle>
                <CardDescription>Monitoramento ativo de anomalias e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      <strong>Alto Uso de Plano de Saúde - TI:</strong> Departamento de TI apresenta 340% acima da média
                      de utilização do plano de saúde nos últimos 30 dias.
                      <div className="flex items-center space-x-4 mt-2 text-xs text-red-600 dark:text-red-400">
                        <span>Impacto no ISP: -12%</span>
                        <span>Custo adicional: R$ 45.200</span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                      <strong>Baixa Adesão Wellhub - Vendas:</strong> Apenas 23% dos colaboradores de Vendas utilizaram
                      o Wellhub este mês. Meta: 60%.
                      <div className="flex items-center space-x-4 mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                        <span>ROI atual: 1.2x</span>
                        <span>Potencial desperdiçado: R$ 8.900</span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                    <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="text-blue-800 dark:text-blue-200">
                      <strong>Pico de Uso VR - Financeiro:</strong> Departamento Financeiro ultrapassou 15% do limite
                      mensal de VR. Considerar ajuste.
                      <div className="flex items-center space-x-4 mt-2 text-xs text-blue-600 dark:text-blue-400">
                        <span>Uso atual: 115%</span>
                        <span>Previsão mensal: R$ 23.400</span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                      <strong>Meta Atingida - Zenklub:</strong> 85% dos colaboradores de RH utilizaram sessões de
                      terapia este mês. Excelente adesão!
                      <div className="flex items-center space-x-4 mt-2 text-xs text-green-600 dark:text-green-400">
                        <span>ROI: 3.2x</span>
                        <span>Redução absenteísmo: 18%</span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30">
                    <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <AlertDescription className="text-purple-800 dark:text-purple-200">
                      <strong>Economia Detectada - Plano de Saúde:</strong> Redução de 18% nos sinistros vs mês
                      anterior. Correlação positiva com uso do Wellhub.
                      <div className="flex items-center space-x-4 mt-2 text-xs text-purple-600 dark:text-purple-400">
                        <span>Economia projetada: R$ 45.000</span>
                        <span>Próximo trimestre</span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30">
                    <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <AlertDescription className="text-orange-800 dark:text-orange-200">
                      <strong>Sincronização Atrasada - VT:</strong> Vale Transporte com atraso de 1h 30min na
                      sincronização. Possível problema na API.
                      <div className="flex items-center space-x-4 mt-2 text-xs text-orange-600 dark:text-orange-400">
                        <span>Status: Equipe técnica notificada</span>
                        <span>Backup manual ativado</span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30">
                    <AlertTriangle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <AlertDescription className="text-indigo-800 dark:text-indigo-200">
                      <strong>Baixa Adesão Geral - Financeiro:</strong> Departamento Financeiro com 38% de adesão aos
                      benefícios de bem-estar vs média de 54%.
                      <div className="flex items-center space-x-4 mt-2 text-xs text-indigo-600 dark:text-indigo-400">
                        <span>Recomendação: Sessão personalizada</span>
                        <span>Potencial melhoria: +16%</span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30">
                    <CheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <AlertDescription className="text-teal-800 dark:text-teal-200">
                      <strong>ROI Consolidado em Alta:</strong> Aumento de 8% no ROI médio dos benefícios no último
                      trimestre.
                      <div className="flex items-center space-x-4 mt-2 text-xs text-teal-600 dark:text-teal-400">
                        <span>Correlação: -22% absenteísmo</span>
                        <span>Tendência: Positiva</span>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Resumo de Alertas</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">3</div>
                      <div className="text-gray-600 dark:text-gray-400">Críticos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">2</div>
                      <div className="text-gray-600 dark:text-gray-400">Atenção</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">2</div>
                      <div className="text-gray-600 dark:text-gray-400">Positivos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">1</div>
                      <div className="text-gray-600 dark:text-gray-400">Informativo</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictive">
          <div className="space-y-6">
            {/* Otimização de Custos */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Otimização de Custos Preditiva
                </CardTitle>
                <CardDescription>
                  Análise preditiva para otimização de custos nos próximos{" "}
                  {predictiveAnalytics.costOptimization.timeframe}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {formatCurrency(predictiveAnalytics.costOptimization.currentSpend)}
                    </div>
                    <div className="text-sm text-red-700">Gasto Atual (Anual)</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {formatCurrency(predictiveAnalytics.costOptimization.optimizedSpend)}
                    </div>
                    <div className="text-sm text-green-700">Gasto Otimizado</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {formatCurrency(predictiveAnalytics.costOptimization.potentialSavings)}
                    </div>
                    <div className="text-sm text-blue-700">Economia Potencial</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Recomendações de Otimização:</h4>
                  {predictiveAnalytics.costOptimization.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-blue-800">{rec}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-800">
                      Confiança da Previsão: {predictiveAnalytics.costOptimization.confidence}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Previsão de Utilização */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Previsão de Utilização</CardTitle>
                  <CardDescription>Projeção de melhoria na taxa de utilização</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {predictiveAnalytics.utilizationPrediction.currentRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Taxa Atual</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {predictiveAnalytics.utilizationPrediction.predictedRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-green-700">Taxa Projetada</div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-2">
                        Melhoria Esperada: +{predictiveAnalytics.utilizationPrediction.improvement}%
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {predictiveAnalytics.utilizationPrediction.factors.map((factor, index) => (
                          <li key={index}>• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Impacto no ISP</CardTitle>
                  <CardDescription>Projeção de melhoria no Índice de Saúde e Performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {predictiveAnalytics.healthImpactProjection.currentISP}
                        </div>
                        <div className="text-sm text-muted-foreground">ISP Atual</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {predictiveAnalytics.healthImpactProjection.projectedISP}
                        </div>
                        <div className="text-sm text-green-700">ISP Projetado</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contribuição atual dos benefícios:</span>
                        <span className="font-semibold text-foreground">
                          +{consolidatedMetrics.totalISPContribution} pontos
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contribuição projetada:</span>
                        <span className="font-semibold text-green-600">
                          +{predictiveAnalytics.healthImpactProjection.projectedContribution.toFixed(1)} pontos
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">
                        Melhoria Esperada: +{predictiveAnalytics.healthImpactProjection.improvement} pontos no ISP
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="optimization">
          <div className="space-y-6">
            {/* Recomendações por Benefício */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(benefitsData).map(([key, benefit]) => (
                <Card key={key} className="ukor-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">{benefit.name} - Otimização</CardTitle>
                    <CardDescription>Recomendações específicas baseadas em dados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Utilização atual:</span>
                          <div className="font-semibold text-foreground">{benefit.utilizationRate.toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ROI atual:</span>
                          <div className="font-semibold text-foreground">{benefit.roi}%</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {key === "wellhub" && (
                          <>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <div className="font-medium text-green-800 mb-1">✅ Pontos Fortes</div>
                              <ul className="text-sm text-green-700 space-y-1">
                                <li>• Alta taxa de utilização (73.6%)</li>
                                <li>• Excelente ROI (285%)</li>
                                <li>• Alto impacto no ISP (+12 pontos)</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="font-medium text-blue-800 mb-1">🎯 Oportunidades</div>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Expandir para modalidades online</li>
                                <li>• Gamificar experiência do usuário</li>
                                <li>• Integrar com dados de wearables</li>
                              </ul>
                            </div>
                          </>
                        )}

                        {key === "zenklub" && (
                          <>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <div className="font-medium text-green-800 mb-1">✅ Pontos Fortes</div>
                              <ul className="text-sm text-green-700 space-y-1">
                                <li>• Excelente ROI (420%)</li>
                                <li>• Alto impacto na saúde mental</li>
                                <li>• Satisfação elevada (4.8)</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg">
                              <div className="font-medium text-yellow-800 mb-1">⚠️ Atenção</div>
                              <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Utilização moderada (36.6%)</li>
                                <li>• Potencial para crescimento</li>
                                <li>• Necessita campanha de conscientização</li>
                              </ul>
                            </div>
                          </>
                        )}

                        {key === "vittude" && (
                          <>
                            <div className="p-3 bg-red-50 rounded-lg">
                              <div className="font-medium text-red-800 mb-1">🚨 Pontos de Atenção</div>
                              <ul className="text-sm text-red-700 space-y-1">
                                <li>• Baixa utilização (18.8%)</li>
                                <li>• ROI abaixo do esperado</li>
                                <li>• Tendência de queda</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="font-medium text-blue-800 mb-1">💡 Ações Recomendadas</div>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Renegociar contrato</li>
                                <li>• Avaliar substituição</li>
                                <li>• Campanha de divulgação intensiva</li>
                              </ul>
                            </div>
                          </>
                        )}

                        {key === "totalpass" && (
                          <>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <div className="font-medium text-green-800 mb-1">✅ Pontos Fortes</div>
                              <ul className="text-sm text-green-700 space-y-1">
                                <li>• Excelente utilização (87.3%)</li>
                                <li>• Benefício essencial</li>
                                <li>• Boa satisfação (4.5)</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="font-medium text-blue-800 mb-1">🎯 Oportunidades</div>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Negociar desconto por volume</li>
                                <li>• Expandir categorias disponíveis</li>
                                <li>• Integrar com programa de wellness</li>
                              </ul>
                            </div>
                          </>
                        )}

                        {/* Continue with other benefits... */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Plano de Ação Consolidado */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Zap className="h-5 w-5 text-purple-500" />
                  Plano de Ação Consolidado
                </CardTitle>
                <CardDescription>Roadmap de otimização para os próximos 12 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-semibold text-red-800 mb-2">🚨 Ações Imediatas (0-30 dias)</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Renegociar contrato Vittude</li>
                        <li>• Campanha de conscientização Zenklub</li>
                        <li>• Análise detalhada de ROI por departamento</li>
                      </ul>
                    </div>
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Ações de Médio Prazo (1-6 meses)</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Implementar gamificação Wellhub</li>
                        <li>• Integrar benefícios com dados de saúde</li>
                        <li>• Personalizar benefícios por perfil</li>
                      </ul>
                    </div>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50">
                      <h4 className="font-semibold text-green-800 mb-2">✅ Ações de Longo Prazo (6-12 meses)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Consolidar fornecedores similares</li>
                        <li>• Implementar analytics preditivos</li>
                        <li>• Expandir programa de wellness</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🎯 Metas para 2025</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-purple-700">Economia de custos:</span>
                        <div className="font-bold text-purple-800">{formatCurrency(450000)}</div>
                      </div>
                      <div>
                        <span className="text-purple-700">Utilização média:</span>
                        <div className="font-bold text-purple-800">75%</div>
                      </div>
                      <div>
                        <span className="text-purple-700">ROI médio:</span>
                        <div className="font-bold text-purple-800">300%</div>
                      </div>
                      <div>
                        <span className="text-purple-700">Impacto ISP:</span>
                        <div className="font-bold text-purple-800">+65 pontos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact">
          <div className="space-y-6">
            {/* Correlação com Saúde e Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Matriz de Impacto</CardTitle>
                  <CardDescription>Quais benefícios mais influenciam o ISP</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {consolidatedMetrics.totalISPContribution}
                        </div>
                        <div className="text-sm text-muted-foreground">ISP Atual</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {predictiveAnalytics.healthImpactProjection.projectedISP}
                        </div>
                        <div className="text-sm text-green-700">ISP Projetado</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contribuição atual dos benefícios:</span>
                        <span className="font-semibold text-foreground">
                          +{consolidatedMetrics.totalISPContribution} pontos
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contribuição projetada:</span>
                        <span className="font-semibold text-green-600">
                          +{predictiveAnalytics.healthImpactProjection.projectedContribution.toFixed(1)} pontos
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">
                        Melhoria Esperada: +{predictiveAnalytics.healthImpactProjection.improvement} pontos no ISP
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Correlação com Absenteísmo</CardTitle>
                  <CardDescription>Impacto na redução de faltas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">20%</div>
                        <div className="text-sm text-muted-foreground">Redução Atual</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">25%</div>
                        <div className="text-sm text-green-700">Redução Projetada</div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800">Melhoria Esperada: +5% na redução de absenteísmo</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Correlação com Produtividade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Correlação com Produtividade</CardTitle>
                  <CardDescription>Impacto no desempenho</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">15%</div>
                        <div className="text-sm text-muted-foreground">Melhoria Atual</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">20%</div>
                        <div className="text-sm text-green-700">Melhoria Projetada</div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800">Melhoria Esperada: +5% na produtividade</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
