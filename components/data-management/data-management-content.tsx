"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Database,
  Watch,
  Users,
  TrendingUp,
  Activity,
  Heart,
  Moon,
  Footprints,
  Target,
  CheckCircle,
  AlertTriangle,
  Wifi,
  Settings,
  Shield,
  DollarSign,
} from "lucide-react"
import { HealthDataUpload } from "@/components/health-data-upload"

export function DataManagementContent() {
  const [connectedDevices, setConnectedDevices] = useState({
    garmin: true,
    whoop: true,
    appleHealth: true,
    googleFit: false,
    samsungHealth: true,
    fitbit: true,
    polar: false,
  })

  // Dados consolidados da empresa (todas as fontes)
  const companyHealthData = {
    totalEmployees: 1247,
    connectedUsers: 847,
    connectionRate: 67.9,
    totalDevices: 1203,
    dataPointsToday: 156789,
    dataPointsMonth: 4567890,
    avgISP: 73,
    ispImprovement: 8, // pontos de melhoria com wearables

    // Dados de RH
    hrData: {
      absenteeismRate: 4.2, // %
      turnoverRate: 12.8, // %
      avgSickDays: 8.5, // dias/ano
      mentalHealthClaims: 156, // casos/ano
      workAccidents: 23, // casos/ano
    },

    // Dados de Planos de Saúde
    healthPlanData: {
      totalClaims: 2847, // sinistros/ano
      avgClaimValue: 1250, // R$ médio por sinistro
      preventiveCare: 68, // % que fez check-up
      chronicDiseases: 234, // colaboradores
      highCostCases: 45, // casos > R$ 10k
      emergencyVisits: 189, // visitas/ano
    },

    // Dados de Sinistralidade
    claimsData: {
      totalCost: 4990000, // R$ total/ano
      costPerEmployee: 4003, // R$ per capita
      sinistrality: 68, // %
      topConditions: [
        { condition: "Hipertensão", cases: 89, cost: 445000 },
        { condition: "Diabetes", cases: 67, cost: 380000 },
        { condition: "Ansiedade/Depressão", cases: 156, cost: 890000 },
        { condition: "Dores Musculares", cases: 234, cost: 567000 },
        { condition: "Problemas Cardíacos", cases: 34, cost: 1200000 },
      ],
    },
  }

  // Dados por departamento
  const departmentData = [
    {
      name: "Tecnologia",
      employees: 156,
      connected: 89,
      connectionRate: 57,
      avgSteps: 4250,
      avgSleep: 6.1,
      avgHR: 74,
      avgHRV: 35,
      stressLevel: 52,
      ispScore: 58,
      ispImprovement: 12,
      riskLevel: "Alto",
      topDevices: ["Garmin", "Apple Watch", "Fitbit"],
      insights: [
        "Sedentarismo crítico - apenas 4.250 passos/dia",
        "Sono insuficiente - 6.1h vs 7-9h recomendado",
        "Estresse elevado correlacionado com baixa HRV",
        "Oportunidade: programa de pausas ativas a cada 2h",
      ],
    },
    {
      name: "Vendas",
      employees: 89,
      connected: 67,
      connectionRate: 75,
      avgSteps: 8920,
      avgSleep: 6.8,
      avgHR: 68,
      avgHRV: 45,
      stressLevel: 42,
      ispScore: 72,
      ispImprovement: 6,
      riskLevel: "Médio",
      topDevices: ["WHOOP", "Garmin", "Apple Watch"],
      insights: [
        "Excelente atividade física - 8.920 passos/dia",
        "Sono comprometido por viagens frequentes",
        "HRV indica boa capacidade de recuperação",
        "Picos de estresse durante fechamentos mensais",
      ],
    },
    {
      name: "Marketing",
      employees: 67,
      connected: 58,
      connectionRate: 87,
      avgSteps: 6780,
      avgSleep: 7.8,
      avgHR: 62,
      avgHRV: 48,
      stressLevel: 28,
      ispScore: 84,
      ispImprovement: 4,
      riskLevel: "Baixo",
      topDevices: ["Apple Watch", "Fitbit", "Samsung Health"],
      insights: [
        "Melhor qualidade de sono da empresa - 7.8h",
        "Excelente gestão de estresse - nível 28",
        "HRV alta indica ótima recuperação",
        "Modelo de bem-estar para outros departamentos",
      ],
    },
    {
      name: "RH",
      employees: 34,
      connected: 31,
      connectionRate: 91,
      avgSteps: 7200,
      avgSleep: 7.4,
      avgHR: 65,
      avgHRV: 44,
      stressLevel: 31,
      ispScore: 79,
      ispImprovement: 5,
      riskLevel: "Baixo",
      topDevices: ["Apple Watch", "Garmin", "WHOOP"],
      insights: [
        "Maior adesão aos wearables - 91% conectados",
        "Excelente equilíbrio trabalho-vida",
        "Sono de qualidade consistente",
        "Atividade física moderada e regular",
      ],
    },
    {
      name: "Financeiro",
      employees: 45,
      connected: 28,
      connectionRate: 62,
      avgSteps: 5890,
      avgSleep: 6.9,
      avgHR: 71,
      avgHRV: 38,
      stressLevel: 48,
      ispScore: 65,
      ispImprovement: 9,
      riskLevel: "Médio",
      topDevices: ["Garmin", "Fitbit", "Apple Watch"],
      insights: [
        "Baixa adesão aos wearables - apenas 62%",
        "Estresse elevado durante fechamentos",
        "Sono irregular afeta recuperação",
        "Necessita programa específico de wellness",
      ],
    },
  ]

  // Dispositivos wearables disponíveis
  const availableWearables = [
    {
      id: "garmin",
      name: "Garmin Connect",
      brand: "Garmin",
      models: ["Forerunner", "Fenix", "Venu", "Vivoactive"],
      users: 234,
      status: "Conectado",
      dataTypes: ["Passos", "Sono", "FC", "HRV", "Estresse", "VO2 Max", "Body Battery"],
      syncFrequency: "Tempo Real",
      apiVersion: "v2.1",
      reliability: 98.5,
      avgDataPoints: 450,
      ispContribution: "Alto",
    },
    {
      id: "whoop",
      name: "WHOOP 4.0",
      brand: "WHOOP",
      models: ["WHOOP 4.0", "WHOOP 3.0"],
      users: 89,
      status: "Conectado",
      dataTypes: ["Sono", "FC", "HRV", "Recuperação", "Strain", "Calorias"],
      syncFrequency: "Tempo Real",
      apiVersion: "v1.3",
      reliability: 99.2,
      avgDataPoints: 380,
      ispContribution: "Muito Alto",
    },
    {
      id: "appleHealth",
      name: "Apple Health",
      brand: "Apple",
      models: ["Apple Watch Series", "iPhone Health"],
      users: 198,
      status: "Conectado",
      dataTypes: ["Passos", "Sono", "FC", "Exercícios", "Mindfulness", "SpO2"],
      syncFrequency: "15 min",
      apiVersion: "HealthKit",
      reliability: 97.8,
      avgDataPoints: 520,
      ispContribution: "Alto",
    },
    {
      id: "fitbit",
      name: "Fitbit",
      brand: "Fitbit",
      models: ["Charge", "Versa", "Sense", "Inspire"],
      users: 156,
      status: "Conectado",
      dataTypes: ["Passos", "Sono", "FC", "Exercícios", "Zona Ativa", "Minutos Ativos"],
      syncFrequency: "15 min",
      apiVersion: "v1.2",
      reliability: 96.7,
      avgDataPoints: 340,
      ispContribution: "Alto",
    },
    {
      id: "samsungHealth",
      name: "Samsung Health",
      brand: "Samsung",
      models: ["Galaxy Watch", "Galaxy Fit"],
      users: 78,
      status: "Conectado",
      dataTypes: ["Passos", "Sono", "FC", "Estresse", "SpO2", "Pressão"],
      syncFrequency: "20 min",
      apiVersion: "v6.0",
      reliability: 95.3,
      avgDataPoints: 290,
      ispContribution: "Médio",
    },
    {
      id: "googleFit",
      name: "Google Fit",
      brand: "Google",
      models: ["Wear OS", "Google Fit App"],
      users: 67,
      status: "Disponível",
      dataTypes: ["Passos", "Atividade", "FC", "Peso", "Distância"],
      syncFrequency: "30 min",
      apiVersion: "v1",
      reliability: 94.1,
      avgDataPoints: 180,
      ispContribution: "Médio",
    },
    {
      id: "polar",
      name: "Polar Flow",
      brand: "Polar",
      models: ["Vantage", "Grit", "Ignite"],
      users: 25,
      status: "Disponível",
      dataTypes: ["FC", "Treino", "Recuperação", "Sono", "Carga de Treino"],
      syncFrequency: "Pós-treino",
      apiVersion: "v3",
      reliability: 97.5,
      avgDataPoints: 220,
      ispContribution: "Alto",
    },
  ]

  // Insights individuais (exemplo de usuário)
  const individualInsights = {
    userName: "João Silva",
    department: "Tecnologia",
    ispScore: 52,
    ispImprovement: 15, // melhoria com wearables
    device: "Garmin Forerunner 945",
    dataQuality: 94,
    weeklyData: {
      avgSteps: 3890,
      avgSleep: 5.8,
      avgHR: 76,
      avgHRV: 32,
      stressLevel: 58,
      activeMinutes: 45,
    },
    recommendations: [
      "Aumentar passos para 6.000/dia (+54% melhoria ISP Físico)",
      "Melhorar higiene do sono - meta 7h/noite",
      "Implementar técnicas de respiração para reduzir estresse",
      "Pausas ativas a cada 90min durante trabalho",
    ],
    riskAlerts: [
      "Sono insuficiente por 5 dias consecutivos",
      "HRV 20% abaixo da baseline pessoal",
      "Sedentarismo crítico - apenas 3.890 passos/dia",
    ],
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Conectado":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300"
      case "Disponível":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300"
      case "Erro":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300"
    }
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

  const getContributionColor = (contribution) => {
    switch (contribution) {
      case "Muito Alto":
        return "text-green-600"
      case "Alto":
        return "text-blue-600"
      case "Médio":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Dados de Saúde</h1>
        <p className="text-muted-foreground mt-1">
          Gestão completa de dados de saúde, wearables e insights corporativos
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="wearables">Wearables</TabsTrigger>
          <TabsTrigger value="individual">Insights Individuais</TabsTrigger>
          <TabsTrigger value="departments">Por Departamento</TabsTrigger>
          <TabsTrigger value="upload">Upload de Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Métricas Gerais da Empresa */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="ukor-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Colaboradores</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{companyHealthData.totalEmployees}</div>
                  <p className="text-xs text-muted-foreground">Total na empresa</p>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Conectados</CardTitle>
                  <Watch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{companyHealthData.connectedUsers}</div>
                  <p className="text-xs text-muted-foreground">{companyHealthData.connectionRate}% da empresa</p>
                  <Progress value={companyHealthData.connectionRate} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Dados Coletados</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {(companyHealthData.dataPointsMonth / 1000000).toFixed(1)}M
                  </div>
                  <p className="text-xs text-muted-foreground">Pontos de dados/mês</p>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">ISP Médio</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{companyHealthData.avgISP}</div>
                  <p className="text-xs text-green-600">+{companyHealthData.ispImprovement} com wearables</p>
                </CardContent>
              </Card>
            </div>

            {/* Resumo de Saúde Corporativa - Dados Consolidados */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Resumo de Saúde Corporativa</CardTitle>
                <CardDescription>Dados consolidados: RH + Planos de Saúde + Wearables + Sinistralidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Métricas de Wearables */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Watch className="h-4 w-4 text-ukor-primary" />
                      Dados de Wearables
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <Footprints className="h-6 w-6 text-ukor-primary mx-auto mb-1" />
                        <div className="text-lg font-bold text-foreground">6.847</div>
                        <div className="text-xs text-muted-foreground">Passos/Dia</div>
                        <div className="text-xs text-yellow-600">Meta: 8.000</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <Moon className="h-6 w-6 text-indigo-500 mx-auto mb-1" />
                        <div className="text-lg font-bold text-foreground">7.2h</div>
                        <div className="text-xs text-muted-foreground">Sono/Noite</div>
                        <div className="text-xs text-green-600">Meta: 7-9h</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <Heart className="h-6 w-6 text-red-500 mx-auto mb-1" />
                        <div className="text-lg font-bold text-foreground">67 bpm</div>
                        <div className="text-xs text-muted-foreground">FC Repouso</div>
                        <div className="text-xs text-green-600">Saudável</div>
                      </div>
                    </div>
                  </div>

                  {/* Métricas de RH */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      Dados de RH
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {companyHealthData.hrData.absenteeismRate}%
                        </div>
                        <div className="text-xs text-muted-foreground">Absenteísmo</div>
                        <div className="text-xs text-green-600">-0.8% vs ano anterior</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">{companyHealthData.hrData.avgSickDays}</div>
                        <div className="text-xs text-muted-foreground">Dias Afastamento</div>
                        <div className="text-xs text-yellow-600">Média/colaborador</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {companyHealthData.hrData.turnoverRate}%
                        </div>
                        <div className="text-xs text-muted-foreground">Turnover</div>
                        <div className="text-xs text-red-600">+2.1% vs ano anterior</div>
                      </div>
                    </div>
                  </div>

                  {/* Métricas de Planos de Saúde */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      Planos de Saúde
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {companyHealthData.healthPlanData.totalClaims}
                        </div>
                        <div className="text-xs text-muted-foreground">Sinistros/Ano</div>
                        <div className="text-xs text-blue-600">2.3 por colaborador</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          R$ {companyHealthData.healthPlanData.avgClaimValue}
                        </div>
                        <div className="text-xs text-muted-foreground">Custo Médio</div>
                        <div className="text-xs text-yellow-600">Por sinistro</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {companyHealthData.healthPlanData.preventiveCare}%
                        </div>
                        <div className="text-xs text-muted-foreground">Medicina Preventiva</div>
                        <div className="text-xs text-green-600">Check-ups realizados</div>
                      </div>
                    </div>
                  </div>

                  {/* Métricas de Sinistralidade */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-red-500" />
                      Sinistralidade
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {companyHealthData.claimsData.sinistrality}%
                        </div>
                        <div className="text-xs text-muted-foreground">Taxa Sinistralidade</div>
                        <div className="text-xs text-red-600">Acima da meta (55%)</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          R$ {companyHealthData.claimsData.costPerEmployee.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Custo per Capita</div>
                        <div className="text-xs text-yellow-600">Por colaborador/ano</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold text-foreground">
                          {companyHealthData.healthPlanData.highCostCases}
                        </div>
                        <div className="text-xs text-muted-foreground">Casos Alto Custo</div>
                        <div className="text-xs text-red-600">&gt; R$ 10k cada</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Condições de Saúde */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-4 text-foreground">
                    Principais Condições de Saúde (Dados Consolidados)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {companyHealthData.claimsData.topConditions.map((condition, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-muted">
                        <div className="text-sm font-medium text-foreground mb-2">{condition.condition}</div>
                        <div className="text-lg font-bold text-foreground">{condition.cases}</div>
                        <div className="text-xs text-muted-foreground">casos</div>
                        <div className="text-xs text-red-600 mt-1">R$ {(condition.cost / 1000).toFixed(0)}k/ano</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impacto dos Wearables no ISP */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Impacto dos Wearables no ISP</CardTitle>
                <CardDescription>Como os dados de dispositivos vestíveis melhoram os indicadores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Detecção Precoce</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Identificação de riscos de burnout 3-4 semanas antes dos sintomas
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Personalização</span>
                      <Target className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Metas individualizadas baseadas em dados reais de cada colaborador
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Precisão</span>
                      <Activity className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ISP 85% mais preciso com dados objetivos vs apenas questionários
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">ROI Saúde</span>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Redução de 23% na sinistralidade com monitoramento contínuo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wearables">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableWearables.map((device) => (
                <Card key={device.id} className="ukor-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ukor-primary to-ukor-accent flex items-center justify-center text-white font-semibold text-sm">
                          {device.brand.substring(0, 2)}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{device.name}</CardTitle>
                          <CardDescription className="text-sm">{device.brand}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(device.status)}>{device.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Modelos Suportados */}
                      <div>
                        <Label className="text-sm font-medium text-foreground">Modelos Suportados:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {device.models.map((model, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {model}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Tipos de Dados */}
                      <div>
                        <Label className="text-sm font-medium text-foreground">Dados Coletados:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {device.dataTypes.map((type, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Estatísticas */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Usuários:</span>
                          <span className="ml-2 font-semibold text-foreground">{device.users}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Confiabilidade:</span>
                          <span className="ml-2 font-semibold text-foreground">{device.reliability}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Sync:</span>
                          <span className="ml-2 font-semibold text-foreground">{device.syncFrequency}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">API:</span>
                          <span className="ml-2 font-semibold text-foreground">{device.apiVersion}</span>
                        </div>
                      </div>

                      {/* Contribuição ISP */}
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Contribuição ISP:</span>
                          <span className={`font-semibold ${getContributionColor(device.ispContribution)}`}>
                            {device.ispContribution}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-muted-foreground">Dados/dia:</span>
                          <span className="font-semibold text-foreground">{device.avgDataPoints}</span>
                        </div>
                        <Progress value={device.reliability} className="mt-2" />
                      </div>

                      {/* Controles */}
                      <div className="flex items-center justify-between">
                        <Switch
                          checked={connectedDevices[device.id]}
                          onCheckedChange={() => {
                            setConnectedDevices((prev) => ({
                              ...prev,
                              [device.id]: !prev[device.id],
                            }))
                          }}
                        />
                        <Button
                          size="sm"
                          variant={device.status === "Conectado" ? "outline" : "default"}
                          className="ukor-button-outline"
                        >
                          {device.status === "Conectado" ? (
                            <>
                              <Settings className="w-4 h-4 mr-2" />
                              Configurar
                            </>
                          ) : (
                            <>
                              <Wifi className="w-4 h-4 mr-2" />
                              Conectar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="individual">
          <div className="space-y-6">
            {/* Perfil do Usuário */}
            <Card className="ukor-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">{individualInsights.userName}</CardTitle>
                    <CardDescription>
                      {individualInsights.department} • {individualInsights.device}
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{individualInsights.ispScore}</div>
                    <div className="text-sm text-muted-foreground">ISP Score</div>
                    <div className="text-xs text-green-600">+{individualInsights.ispImprovement} com wearable</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-foreground">{individualInsights.weeklyData.avgSteps}</div>
                    <div className="text-sm text-muted-foreground">Passos/Dia</div>
                    <div className="text-xs text-red-600">Abaixo da meta</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-foreground">{individualInsights.weeklyData.avgSleep}h</div>
                    <div className="text-sm text-muted-foreground">Sono/Noite</div>
                    <div className="text-xs text-red-600">Insuficiente</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-foreground">{individualInsights.weeklyData.avgHR}</div>
                    <div className="text-sm text-muted-foreground">FC Repouso</div>
                    <div className="text-xs text-yellow-600">Elevada</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-foreground">{individualInsights.weeklyData.avgHRV}</div>
                    <div className="text-sm text-muted-foreground">HRV</div>
                    <div className="text-xs text-red-600">Baixa</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-foreground">{individualInsights.weeklyData.stressLevel}</div>
                    <div className="text-sm text-muted-foreground">Estresse</div>
                    <div className="text-xs text-red-600">Alto</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-foreground">
                      {individualInsights.weeklyData.activeMinutes}
                    </div>
                    <div className="text-sm text-muted-foreground">Min Ativos</div>
                    <div className="text-xs text-red-600">Baixo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recomendações Personalizadas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="h-5 w-5 text-ukor-primary" />
                    Recomendações Personalizadas
                  </CardTitle>
                  <CardDescription>Baseadas nos dados do seu wearable</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {individualInsights.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-800 dark:text-blue-300">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Alertas de Saúde
                  </CardTitle>
                  <CardDescription>Riscos identificados pelos wearables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {individualInsights.riskAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                      >
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-800 dark:text-red-300">{alert}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <div className="space-y-6">
            {departmentData.map((dept, index) => (
              <Card key={index} className="ukor-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-foreground">{dept.name}</CardTitle>
                      <CardDescription>
                        {dept.employees} colaboradores • {dept.connected} conectados ({dept.connectionRate}%)
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getRiskColor(dept.riskLevel)}>Risco {dept.riskLevel}</Badge>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{dept.ispScore}</div>
                        <div className="text-xs text-green-600">+{dept.ispImprovement} wearables</div>
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
                      <div className="text-sm text-muted-foreground">Conectados</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Dispositivos Mais Usados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dept.topDevices.map((device, i) => (
                          <Badge key={i} variant="outline">
                            {device}
                          </Badge>
                        ))}
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload">
          <HealthDataUpload />
        </TabsContent>
      </Tabs>
    </div>
  )
}
