"use client"

import { useState, useEffect } from "react"
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
  ScatterChart,
  Scatter,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { Activity, AlertTriangle, CheckCircle, DollarSign, Download, Upload, Droplets } from "lucide-react"
import {
  analyzeBiomarkerRisk,
  correlateBiomarkersWithWearables,
  generatePredictiveRisks,
  calculateFinancialSavings,
  type Biomarker,
  type BiomarkerPanel,
  type WearableCorrelation,
  type PredictiveRisk,
} from "@/lib/biomarkers-analysis"

export function BiomarkersDashboard() {
  const [selectedUser, setSelectedUser] = useState("all")
  const [timeframe, setTimeframe] = useState("3m")
  const [biomarkerPanels, setBiomarkerPanels] = useState<BiomarkerPanel[]>([])
  const [correlations, setCorrelations] = useState<WearableCorrelation[]>([])
  const [predictiveRisks, setPredictiveRisks] = useState<PredictiveRisk[]>([])

  // Dados simulados para demonstração
  const mockBiomarkers: Biomarker[] = [
    {
      id: "1",
      name: "Glicose",
      value: 105,
      unit: "mg/dL",
      referenceRange: { min: 70, max: 99 },
      category: "metabolic",
      riskLevel: "medium",
      date: "2024-01-15",
      userId: "user1",
    },
    {
      id: "2",
      name: "Colesterol Total",
      value: 220,
      unit: "mg/dL",
      referenceRange: { min: 0, max: 200 },
      category: "cardiovascular",
      riskLevel: "medium",
      date: "2024-01-15",
      userId: "user1",
    },
    {
      id: "3",
      name: "Cortisol",
      value: 22,
      unit: "μg/dL",
      referenceRange: { min: 6.2, max: 19.4 },
      category: "hormonal",
      riskLevel: "high",
      date: "2024-01-15",
      userId: "user1",
    },
    {
      id: "4",
      name: "Vitamina D",
      value: 18,
      unit: "ng/mL",
      referenceRange: { min: 30, max: 100 },
      category: "nutritional",
      riskLevel: "high",
      date: "2024-01-15",
      userId: "user1",
    },
    {
      id: "5",
      name: "Proteína C Reativa",
      value: 4.2,
      unit: "mg/L",
      referenceRange: { min: 0, max: 3.0 },
      category: "inflammatory",
      riskLevel: "medium",
      date: "2024-01-15",
      userId: "user1",
    },
  ]

  const mockWearableData = {
    steps: { daily_average: 4200 },
    sleep: { duration_average: 6.2, efficiency: 78 },
    stress: { average_level: 7.5 },
    hrv: { average: 28 },
    resting_hr: { average: 82 },
    activity: { weekly_minutes: 90 },
  }

  const mockDemographicData = {
    age: 42,
    gender: "female",
    department: "Technology",
  }

  useEffect(() => {
    // Calcular correlações
    const newCorrelations = correlateBiomarkersWithWearables(mockBiomarkers, mockWearableData)
    setCorrelations(newCorrelations)

    // Gerar riscos preditivos
    const risks = generatePredictiveRisks(mockBiomarkers, mockWearableData, mockDemographicData)
    setPredictiveRisks(risks)
  }, [])

  // Dados para gráficos
  const biomarkerTrends = mockBiomarkers.map((biomarker) => ({
    name: biomarker.name,
    value: biomarker.value,
    risk: biomarker.riskLevel,
    category: biomarker.category,
  }))

  const riskDistribution = [
    { name: "Baixo", value: 45, color: "#10B981" },
    { name: "Médio", value: 35, color: "#F59E0B" },
    { name: "Alto", value: 15, color: "#EF4444" },
    { name: "Crítico", value: 5, color: "#DC2626" },
  ]

  const correlationData = correlations.map((corr) => ({
    biomarker: corr.biomarker,
    metric: corr.wearableMetric,
    correlation: corr.correlation,
    significance: corr.significance,
  }))

  const financialSavings = calculateFinancialSavings(predictiveRisks, 45, 1200)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "critical":
        return "bg-red-200 text-red-900 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation)
    if (abs >= 0.7) return "#DC2626" // Forte
    if (abs >= 0.4) return "#F59E0B" // Moderada
    return "#10B981" // Fraca
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard de Biomarcadores</h2>
          <p className="text-muted-foreground">Análise integrada de biomarcadores, wearables e predição de riscos</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Exames
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Biomarcadores Analisados</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockBiomarkers.length}</div>
            <p className="text-xs text-muted-foreground">Última atualização: hoje</p>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Correlações Identificadas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{correlations.length}</div>
            <p className="text-xs text-muted-foreground">
              {correlations.filter((c) => c.significance === "high").length} de alta significância
            </p>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Riscos Preditivos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{predictiveRisks.length}</div>
            <p className="text-xs text-muted-foreground">
              {predictiveRisks.filter((r) => r.riskLevel === "high" || r.riskLevel === "critical").length} críticos
            </p>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Savings Potencial</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {(financialSavings.total.company / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">Por ano para a empresa</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="correlations">Correlações</TabsTrigger>
          <TabsTrigger value="predictions">Análise Preditiva</TabsTrigger>
          <TabsTrigger value="savings">Savings Financeiros</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Biomarcadores por Categoria */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Biomarcadores por Risco</CardTitle>
                <CardDescription>Distribuição dos níveis de risco</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={biomarkerTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribuição de Riscos */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Distribuição de Riscos</CardTitle>
                <CardDescription>Percentual por nível de risco</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Biomarcadores */}
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Biomarcadores Detalhados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBiomarkers.map((biomarker) => {
                  const analysis = analyzeBiomarkerRisk(biomarker)
                  return (
                    <div
                      key={biomarker.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-ukor-primary/20 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ukor-primary to-ukor-accent flex items-center justify-center text-white font-semibold">
                          {biomarker.name.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{biomarker.name}</h4>
                          <p className="text-sm text-muted-foreground">{biomarker.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-foreground">
                            {biomarker.value} {biomarker.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Ref: {biomarker.referenceRange.min}-{biomarker.referenceRange.max}
                          </div>
                        </div>
                        <Badge className={getRiskColor(biomarker.riskLevel)}>{analysis.description}</Badge>
                        <div className="w-20">
                          <Progress value={analysis.riskScore} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations">
          <div className="space-y-6">
            {/* Mapa de Correlações */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Correlações Biomarcadores x Wearables</CardTitle>
                <CardDescription>Força das correlações entre dados laboratoriais e wearables</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="biomarker" />
                    <YAxis dataKey="correlation" domain={[-1, 1]} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-medium">{data.biomarker}</p>
                              <p className="text-sm">vs {data.metric}</p>
                              <p className="text-sm">Correlação: {data.correlation.toFixed(2)}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter data={correlationData} fill={(entry) => getCorrelationColor(entry.correlation)} />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Lista de Correlações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {correlations.map((correlation, index) => (
                <Card key={index} className="ukor-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-foreground">{correlation.biomarker}</CardTitle>
                      <Badge
                        variant={
                          correlation.significance === "high"
                            ? "destructive"
                            : correlation.significance === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {correlation.significance}
                      </Badge>
                    </div>
                    <CardDescription>vs {correlation.wearableMetric}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Correlação:</span>
                        <span
                          className={`font-bold ${correlation.correlation > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {correlation.correlation > 0 ? "+" : ""}
                          {correlation.correlation.toFixed(2)}
                        </span>
                      </div>
                      <Progress value={Math.abs(correlation.correlation) * 100} className="h-2" />
                      <div className="p-3 bg-muted rounded-lg">
                        <h5 className="font-medium text-foreground mb-1">Insight:</h5>
                        <p className="text-sm text-muted-foreground">{correlation.insight}</p>
                      </div>
                      <div className="p-3 bg-ukor-light rounded-lg">
                        <h5 className="font-medium text-ukor-dark mb-1">Recomendação:</h5>
                        <p className="text-sm text-ukor-dark">{correlation.recommendation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="space-y-6">
            {/* Alertas de Risco */}
            <div className="grid grid-cols-1 gap-4">
              {predictiveRisks.map((risk, index) => (
                <Alert
                  key={index}
                  className={`border-l-4 ${
                    risk.riskLevel === "critical"
                      ? "border-l-red-500"
                      : risk.riskLevel === "high"
                        ? "border-l-orange-500"
                        : risk.riskLevel === "medium"
                          ? "border-l-yellow-500"
                          : "border-l-green-500"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{risk.condition}</h4>
                        <p className="text-sm text-muted-foreground">
                          Risco {risk.riskLevel} em {risk.timeframe} (Confiança: {risk.confidence}%)
                        </p>
                      </div>
                      <Badge className={getRiskColor(risk.riskLevel)}>{risk.riskScore}% de risco</Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>

            {/* Detalhes dos Riscos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predictiveRisks.map((risk, index) => (
                <Card key={index} className="ukor-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">{risk.condition}</CardTitle>
                    <CardDescription>Análise preditiva baseada em IA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Score de Risco:</span>
                        <span className="font-bold text-foreground">{risk.riskScore}%</span>
                      </div>
                      <Progress value={risk.riskScore} className="h-3" />

                      <div>
                        <h5 className="font-medium text-foreground mb-2">Fatores Contribuintes:</h5>
                        <ul className="space-y-1">
                          {risk.contributingFactors.map((factor, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-2 text-orange-500" />
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-foreground mb-2">Ações Preventivas:</h5>
                        <ul className="space-y-1">
                          {risk.preventiveActions.map((action, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <h5 className="font-medium text-green-800 mb-1">Savings Potencial:</h5>
                        <p className="text-sm text-green-700">
                          R$ {risk.potentialSavings.individual.toLocaleString()} por pessoa/ano
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="savings">
          <div className="space-y-6">
            {/* Resumo Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Individual</CardTitle>
                  <CardDescription>Savings por colaborador</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Prevenção:</span>
                      <span className="font-medium text-foreground">
                        R$ {financialSavings.prevention.individual.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tratamento:</span>
                      <span className="font-medium text-foreground">
                        R$ {financialSavings.treatment.individual.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Produtividade:</span>
                      <span className="font-medium text-foreground">
                        R$ {financialSavings.productivity.individual.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-foreground">Total:</span>
                        <span className="font-bold text-ukor-primary">
                          R$ {financialSavings.total.individual.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Departamento</CardTitle>
                  <CardDescription>Savings por área</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Prevenção:</span>
                      <span className="font-medium text-foreground">
                        R$ {(financialSavings.prevention.department / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tratamento:</span>
                      <span className="font-medium text-foreground">
                        R$ {(financialSavings.treatment.department / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Produtividade:</span>
                      <span className="font-medium text-foreground">
                        R$ {(financialSavings.productivity.department / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-foreground">Total:</span>
                        <span className="font-bold text-ukor-primary">
                          R$ {(financialSavings.total.department / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Empresa</CardTitle>
                  <CardDescription>Savings total</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Prevenção:</span>
                      <span className="font-medium text-foreground">
                        R$ {(financialSavings.prevention.company / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tratamento:</span>
                      <span className="font-medium text-foreground">
                        R$ {(financialSavings.treatment.company / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Produtividade:</span>
                      <span className="font-medium text-foreground">
                        R$ {(financialSavings.productivity.company / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-foreground">Total:</span>
                        <span className="font-bold text-ukor-primary">
                          R$ {(financialSavings.total.company / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ROI Breakdown */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">ROI Detalhado por Condição</CardTitle>
                <CardDescription>Retorno sobre investimento em prevenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveRisks.map((risk, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">{risk.condition}</h4>
                        <Badge className={getRiskColor(risk.riskLevel)}>{risk.riskLevel}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-bold text-foreground">
                            R$ {risk.potentialSavings.individual.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Por pessoa</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-bold text-foreground">
                            R$ {(risk.potentialSavings.department / 1000).toFixed(0)}K
                          </div>
                          <div className="text-sm text-muted-foreground">Por departamento</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-bold text-foreground">
                            R$ {(risk.potentialSavings.company / 1000).toFixed(0)}K
                          </div>
                          <div className="text-sm text-muted-foreground">Para empresa</div>
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
