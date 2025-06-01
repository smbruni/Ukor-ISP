"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Moon, Heart, Brain, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

// Safe sample data with proper initialization
const getSampleSleepData = () => [
  { date: "2024-01-01", duration: 7.5, efficiency: 85, rem: 22, deep: 18, cortisol: 12, melatonin: 8.5, hrv: 45 },
  { date: "2024-01-02", duration: 6.8, efficiency: 78, rem: 18, deep: 15, cortisol: 18, melatonin: 6.2, hrv: 38 },
  { date: "2024-01-03", duration: 8.2, efficiency: 92, rem: 25, deep: 20, cortisol: 8, melatonin: 9.8, hrv: 52 },
  { date: "2024-01-04", duration: 7.1, efficiency: 82, rem: 20, deep: 17, cortisol: 15, melatonin: 7.5, hrv: 42 },
  { date: "2024-01-05", duration: 6.5, efficiency: 75, rem: 16, deep: 14, cortisol: 22, melatonin: 5.8, hrv: 35 },
  { date: "2024-01-06", duration: 7.8, efficiency: 88, rem: 23, deep: 19, cortisol: 10, melatonin: 9.2, hrv: 48 },
  { date: "2024-01-07", duration: 8.0, efficiency: 90, rem: 24, deep: 21, cortisol: 9, melatonin: 9.5, hrv: 50 },
]

const getSampleCorrelations = () => [
  {
    biomarker: "Cortisol",
    wearable: "HRV",
    correlation: 0.78,
    significance: "Alta",
    insight: "Cortisol elevado correlacionado com baixa HRV",
    recommendation: "Implementar técnicas de gestão de estresse",
  },
  {
    biomarker: "Melatonina",
    wearable: "Eficiência do Sono",
    correlation: 0.72,
    significance: "Alta",
    insight: "Melatonina baixa impacta qualidade do sono",
    recommendation: "Avaliar suplementação de melatonina",
  },
  {
    biomarker: "Inflamação (CRP)",
    wearable: "Sono REM",
    correlation: 0.65,
    significance: "Média",
    insight: "Inflamação reduz sono REM",
    recommendation: "Protocolo anti-inflamatório",
  },
  {
    biomarker: "Adenosina",
    wearable: "Latência do Sono",
    correlation: 0.58,
    significance: "Média",
    insight: "Adenosina alta aumenta tempo para adormecer",
    recommendation: "Reduzir cafeína após 14h",
  },
]

const getSampleRiskPredictions = () => [
  { condition: "Burnout", probability: 78, timeframe: "3-6 meses", impact: "Alto", cost: 8000 },
  { condition: "Cardiovascular", probability: 45, timeframe: "1-2 anos", impact: "Médio", cost: 25000 },
  { condition: "Diabetes", probability: 32, timeframe: "2-5 anos", impact: "Alto", cost: 15000 },
]

export function SleepBiomarkersDashboard() {
  const [sleepData, setSleepData] = useState<any[]>([])
  const [correlations, setCorrelations] = useState<any[]>([])
  const [riskPredictions, setRiskPredictions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setSleepData(getSampleSleepData())
      setCorrelations(getSampleCorrelations())
      setRiskPredictions(getSampleRiskPredictions())
      setLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Calculate metrics safely
  const avgSleepDuration =
    sleepData.length > 0 ? (sleepData.reduce((acc, day) => acc + day.duration, 0) / sleepData.length).toFixed(1) : "0"
  const avgEfficiency =
    sleepData.length > 0 ? Math.round(sleepData.reduce((acc, day) => acc + day.efficiency, 0) / sleepData.length) : 0
  const avgHRV =
    sleepData.length > 0 ? Math.round(sleepData.reduce((acc, day) => acc + day.hrv, 0) / sleepData.length) : 0

  // Calculate sleep score
  const sleepScore =
    sleepData.length > 0
      ? Math.round((Number.parseFloat(avgSleepDuration) / 8) * 30 + (avgEfficiency / 100) * 40 + (avgHRV / 60) * 30)
      : 0

  // Calculate financial impact
  const totalRisk =
    riskPredictions.length > 0
      ? riskPredictions.reduce((acc, risk) => acc + (risk.probability / 100) * risk.cost, 0)
      : 0
  const potentialSavings = Math.round(totalRisk * 0.7) // 70% reduction with intervention

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Moon className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Analytics do Sono</h1>
            <p className="text-muted-foreground">Carregando análise integrada de biomarcadores e wearables...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Moon className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">Analytics do Sono</h1>
          <p className="text-muted-foreground">Análise integrada de biomarcadores e dados de wearables</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">Duração Média</span>
            </div>
            <div className="text-2xl font-bold">{avgSleepDuration}h</div>
            <Badge variant={Number.parseFloat(avgSleepDuration) >= 7 ? "default" : "destructive"}>
              {Number.parseFloat(avgSleepDuration) >= 7 ? "Adequado" : "Insuficiente"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">Eficiência</span>
            </div>
            <div className="text-2xl font-bold">{avgEfficiency}%</div>
            <Progress value={avgEfficiency} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-muted-foreground">HRV Média</span>
            </div>
            <div className="text-2xl font-bold">{avgHRV}ms</div>
            <Badge variant={avgHRV >= 40 ? "default" : "destructive"}>{avgHRV >= 40 ? "Bom" : "Baixo"}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-muted-foreground">Sleep Score</span>
            </div>
            <div className="text-2xl font-bold">{sleepScore}/100</div>
            <Badge variant={sleepScore >= 70 ? "default" : sleepScore >= 50 ? "secondary" : "destructive"}>
              {sleepScore >= 70 ? "Excelente" : sleepScore >= 50 ? "Bom" : "Crítico"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="correlations">Correlações</TabsTrigger>
          <TabsTrigger value="predictions">Predições</TabsTrigger>
          <TabsTrigger value="financial">Impacto Financeiro</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Qualidade do Sono (7 dias)</CardTitle>
                <CardDescription>Duração e eficiência do sono</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
                      }
                    />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="duration" stroke="#3b82f6" name="Duração (h)" />
                    <Line type="monotone" dataKey="efficiency" stroke="#10b981" name="Eficiência (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biomarcadores do Sono</CardTitle>
                <CardDescription>Cortisol e Melatonina</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
                      }
                    />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cortisol" stroke="#ef4444" name="Cortisol (μg/dL)" />
                    <Line type="monotone" dataKey="melatonina" stroke="#8b5cf6" name="Melatonina (pg/mL)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {correlations.map((correlation, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">
                          {correlation.biomarker} × {correlation.wearable}
                        </h3>
                        <p className="text-sm text-muted-foreground">Correlação: {correlation.correlation}</p>
                      </div>
                    </div>
                    <Badge variant={correlation.significance === "Alta" ? "default" : "secondary"}>
                      {correlation.significance}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Insight:</strong> {correlation.insight}
                    </p>
                    <p className="text-sm">
                      <strong>Recomendação:</strong> {correlation.recommendation}
                    </p>
                  </div>
                  <Progress value={Math.abs(correlation.correlation) * 100} className="mt-3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riskPredictions.map((risk, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle
                      className={`h-5 w-5 ${risk.probability > 60 ? "text-red-600" : risk.probability > 30 ? "text-yellow-600" : "text-green-600"}`}
                    />
                    <h3 className="font-semibold">{risk.condition}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Probabilidade</span>
                      <span className="font-semibold">{risk.probability}%</span>
                    </div>
                    <Progress value={risk.probability} className="mb-2" />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Prazo</span>
                      <span className="text-sm">{risk.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Custo Potencial</span>
                      <span className="text-sm font-semibold">R$ {risk.cost.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Impacto Financeiro</CardTitle>
                <CardDescription>Custos potenciais vs savings com intervenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Custo Total de Riscos</span>
                    <span className="text-lg font-bold text-red-600">R$ {Math.round(totalRisk).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Savings Potenciais</span>
                    <span className="text-lg font-bold text-green-600">R$ {potentialSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ROI Esperado</span>
                    <span className="text-lg font-bold text-blue-600">4.537%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendações de Investimento</CardTitle>
                <CardDescription>Prioridades baseadas em ROI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Programa de Higiene do Sono</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Monitoramento de Biomarcadores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Wearables para Toda Equipe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Coaching Personalizado</span>
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
