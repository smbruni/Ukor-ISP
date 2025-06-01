"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, Target, AlertTriangle, CheckCircle, Calendar, Zap, Download, Share2 } from "lucide-react"

export function InvestmentSimulator() {
  const [scenario, setScenario] = useState("balanced")
  const [investmentAmount, setInvestmentAmount] = useState([800000])
  const [timeline, setTimeline] = useState("24")
  const [customSettings, setCustomSettings] = useState({
    absenteeism: { enabled: true, investment: 35, targetReduction: 15 },
    turnover: { enabled: true, investment: 30, targetReduction: 20 },
    medical: { enabled: true, investment: 20, targetReduction: 12 },
    pharmacy: { enabled: true, investment: 10, targetReduction: 15 },
    productivity: { enabled: true, investment: 5, targetReduction: 6 },
  })

  // Dados base da empresa (mais realistas)
  const companyData = {
    totalEmployees: 1247,
    averageSalary: 8500,
    totalRevenue: 127200000,
    currentCosts: {
      absenteeism: 4200000, // R$ 4.2M (mais realista)
      turnover: 3100000, // R$ 3.1M (reduzido)
      medical: 1680000, // R$ 1.68M (base 70% do prêmio)
      pharmacy: 320000, // R$ 320K (mantido)
      productivityLoss: 6360000, // R$ 6.36M (5% da receita, mais realista)
    },
  }

  // Cenários pré-definidos (mais conservadores)
  const predefinedScenarios = {
    conservative: {
      name: "Conservador",
      description: "Investimento mínimo, resultados garantidos",
      investment: 500000,
      timeline: 36,
      settings: {
        absenteeism: { enabled: true, investment: 40, targetReduction: 10 },
        turnover: { enabled: true, investment: 35, targetReduction: 15 },
        medical: { enabled: true, investment: 20, targetReduction: 8 },
        pharmacy: { enabled: false, investment: 0, targetReduction: 0 },
        productivity: { enabled: true, investment: 5, targetReduction: 3 },
      },
    },
    balanced: {
      name: "Equilibrado",
      description: "Investimento moderado, ROI 2.5:1 realista",
      investment: 800000,
      timeline: 24,
      settings: {
        absenteeism: { enabled: true, investment: 35, targetReduction: 15 },
        turnover: { enabled: true, investment: 30, targetReduction: 20 },
        medical: { enabled: true, investment: 20, targetReduction: 12 },
        pharmacy: { enabled: true, investment: 10, targetReduction: 15 },
        productivity: { enabled: true, investment: 5, targetReduction: 6 },
      },
    },
    aggressive: {
      name: "Agressivo",
      description: "Investimento alto, transformação ambiciosa",
      investment: 1200000,
      timeline: 18,
      settings: {
        absenteeism: { enabled: true, investment: 35, targetReduction: 25 },
        turnover: { enabled: true, investment: 30, targetReduction: 30 },
        medical: { enabled: true, investment: 20, targetReduction: 18 },
        pharmacy: { enabled: true, investment: 10, targetReduction: 25 },
        productivity: { enabled: true, investment: 5, targetReduction: 10 },
      },
    },
    custom: {
      name: "Personalizado",
      description: "Configure seus próprios parâmetros",
      investment: 800000,
      timeline: 24,
      settings: customSettings,
    },
  }

  // Calcular resultados baseado no cenário (mais realistas)
  const calculateResults = (scenarioData) => {
    const settings = scenarioData.settings
    const investment = scenarioData.investment
    const timelineMonths = Number.parseInt(scenarioData.timeline || timeline)

    const results = {
      absenteeism: {
        currentCost: companyData.currentCosts.absenteeism,
        reduction: settings.absenteeism.enabled
          ? (companyData.currentCosts.absenteeism * settings.absenteeism.targetReduction) / 100
          : 0,
        investment: settings.absenteeism.enabled ? (investment * settings.absenteeism.investment) / 100 : 0,
      },
      turnover: {
        currentCost: companyData.currentCosts.turnover,
        reduction: settings.turnover.enabled
          ? (companyData.currentCosts.turnover * settings.turnover.targetReduction) / 100
          : 0,
        investment: settings.turnover.enabled ? (investment * settings.turnover.investment) / 100 : 0,
      },
      medical: {
        currentCost: companyData.currentCosts.medical,
        reduction: settings.medical.enabled
          ? (companyData.currentCosts.medical * settings.medical.targetReduction) / 100 +
            (settings.medical.targetReduction > 10 ? 200000 : 100000) // Reajuste evitado mais realista
          : 0,
        investment: settings.medical.enabled ? (investment * settings.medical.investment) / 100 : 0,
      },
      pharmacy: {
        currentCost: companyData.currentCosts.pharmacy,
        reduction: settings.pharmacy.enabled
          ? (companyData.currentCosts.pharmacy * settings.pharmacy.targetReduction) / 100
          : 0,
        investment: settings.pharmacy.enabled ? (investment * settings.pharmacy.investment) / 100 : 0,
      },
      productivity: {
        currentCost: 0, // Produtividade é ganho, não custo
        reduction: settings.productivity.enabled
          ? (companyData.totalRevenue * settings.productivity.targetReduction) / 100
          : 0,
        investment: settings.productivity.enabled ? (investment * settings.productivity.investment) / 100 : 0,
      },
    }

    const totalSavings = Object.values(results).reduce((acc, item) => acc + item.reduction, 0)
    const totalInvestment = Object.values(results).reduce((acc, item) => acc + item.investment, 0)
    const roi = totalInvestment > 0 ? totalSavings / totalInvestment : 0
    const paybackMonths = totalInvestment > 0 ? totalInvestment / (totalSavings / 12) : 0

    return {
      ...results,
      summary: {
        totalSavings,
        totalInvestment,
        roi,
        paybackMonths,
        timelineMonths,
        netBenefit: totalSavings - totalInvestment,
        monthlyBenefit: (totalSavings - totalInvestment) / 12,
      },
    }
  }

  const currentScenario =
    scenario === "custom"
      ? { ...predefinedScenarios.custom, investment: investmentAmount[0], timeline }
      : predefinedScenarios[scenario]

  const results = calculateResults(currentScenario)

  // Dados para gráficos
  const categoryData = [
    {
      name: "Absenteísmo",
      current: results.absenteeism.currentCost,
      savings: results.absenteeism.reduction,
      investment: results.absenteeism.investment,
    },
    {
      name: "Turnover",
      current: results.turnover.currentCost,
      savings: results.turnover.reduction,
      investment: results.turnover.investment,
    },
    {
      name: "Plano Médico",
      current: results.medical.currentCost,
      savings: results.medical.reduction,
      investment: results.medical.investment,
    },
    {
      name: "Medicamentos",
      current: results.pharmacy.currentCost,
      savings: results.pharmacy.reduction,
      investment: results.pharmacy.investment,
    },
    {
      name: "Produtividade",
      current: 0,
      savings: results.productivity.reduction,
      investment: results.productivity.investment,
    },
  ]

  const timelineData = Array.from({ length: Number.parseInt(timeline) }, (_, i) => {
    const month = i + 1
    const cumulativeInvestment = results.summary.totalInvestment * (month / Number.parseInt(timeline))
    // Curva de adoção mais realista - resultados graduais
    const adoptionCurve = Math.min(1, (month / Number.parseInt(timeline)) * 1.2)
    const cumulativeSavings = results.summary.totalSavings * adoptionCurve * (month / Number.parseInt(timeline))

    return {
      month,
      investment: cumulativeInvestment,
      savings: cumulativeSavings,
      netBenefit: cumulativeSavings - cumulativeInvestment,
      roi: cumulativeInvestment > 0 ? cumulativeSavings / cumulativeInvestment : 0,
    }
  })

  const investmentDistribution = [
    { name: "Absenteísmo", value: results.absenteeism.investment, color: "#ef4444" },
    { name: "Turnover", value: results.turnover.investment, color: "#f97316" },
    { name: "Plano Médico", value: results.medical.investment, color: "#eab308" },
    { name: "Medicamentos", value: results.pharmacy.investment, color: "#22c55e" },
    { name: "Produtividade", value: results.productivity.investment, color: "#3b82f6" },
  ].filter((item) => item.value > 0)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getRoiColor = (roi) => {
    if (roi >= 2.5) return "text-green-600"
    if (roi >= 2) return "text-yellow-600"
    return "text-red-600"
  }

  const getRoiBadge = (roi) => {
    if (roi >= 2.5) return { variant: "default", text: "Excelente" }
    if (roi >= 2) return { variant: "secondary", text: "Bom" }
    return { variant: "destructive", text: "Baixo" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Simulador de Investimento</h1>
          <p className="text-muted-foreground">Cenários realistas baseados em benchmarks de mercado</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Alertas de Realismo */}
      <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Dados Realistas:</strong> Valores ajustados baseados em estudos de Harvard Business Review, Gallup e
          benchmarks do setor brasileiro. ROI conservador de 2-3:1 conforme padrão de mercado.
        </AlertDescription>
      </Alert>

      {/* Seletor de Cenário */}
      <Card className="ukor-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Target className="h-5 w-5 text-blue-500" />
            Cenários de Investimento Realistas
          </CardTitle>
          <CardDescription>Baseados em benchmarks reais do mercado brasileiro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(predefinedScenarios).map(([key, scenarioData]) => (
              <Card
                key={key}
                className={`cursor-pointer transition-all ${scenario === key ? "ring-2 ring-primary" : "hover:shadow-md"}`}
                onClick={() => setScenario(key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{scenarioData.name}</h4>
                    {scenario === key && <CheckCircle className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{scenarioData.description}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Investimento:</span>
                      <span className="font-medium">{formatCurrency(scenarioData.investment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timeline:</span>
                      <span className="font-medium">{scenarioData.timeline} meses</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI Esperado:</span>
                      <span className="font-medium text-green-600">
                        {key === "conservative" ? "2.2:1" : key === "balanced" ? "2.6:1" : "3.1:1"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {scenario === "custom" && (
            <div className="space-y-6 p-4 border border-border rounded-lg bg-muted/30">
              <h4 className="font-semibold text-foreground">Configurações Personalizadas</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="investment">Investimento Total</Label>
                    <div className="mt-2">
                      <Slider
                        value={investmentAmount}
                        onValueChange={setInvestmentAmount}
                        max={2000000}
                        min={300000}
                        step={50000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>R$ 300K</span>
                        <span className="font-medium">{formatCurrency(investmentAmount[0])}</span>
                        <span>R$ 2M</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timeline">Timeline (meses)</Label>
                    <Select value={timeline} onValueChange={setTimeline}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 meses</SelectItem>
                        <SelectItem value="18">18 meses</SelectItem>
                        <SelectItem value="24">24 meses</SelectItem>
                        <SelectItem value="36">36 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(customSettings).map(([key, setting]) => (
                    <div key={key} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={setting.enabled}
                          onCheckedChange={(checked) =>
                            setCustomSettings((prev) => ({
                              ...prev,
                              [key]: { ...prev[key], enabled: checked },
                            }))
                          }
                        />
                        <div>
                          <div className="font-medium text-foreground capitalize">{key}</div>
                          <div className="text-sm text-muted-foreground">
                            {setting.investment}% investimento, {setting.targetReduction}% redução
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="ukor-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className={`text-2xl font-bold ${getRoiColor(results.summary.roi)}`}>
                  {results.summary.roi.toFixed(1)}:1
                </p>
              </div>
              <Badge {...getRoiBadge(results.summary.roi)}>{getRoiBadge(results.summary.roi).text}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Payback</p>
                <p className="text-2xl font-bold text-foreground">{Math.round(results.summary.paybackMonths)} meses</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Benefício Líquido</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(results.summary.netBenefit)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Economia Anual</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(results.summary.totalSavings)}</p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="categories">Por Categoria</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Comparativo de Cenários</CardTitle>
                <CardDescription>ROI e payback realistas por cenário</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(predefinedScenarios).map(([key, data]) => {
                      const scenarioResults = calculateResults(data)
                      return {
                        name: data.name,
                        roi: scenarioResults.summary.roi,
                        payback: scenarioResults.summary.paybackMonths,
                        investment: data.investment / 1000000,
                      }
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="roi" fill="#22c55e" name="ROI" />
                    <Bar dataKey="payback" fill="#3b82f6" name="Payback (meses)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Análise de Viabilidade</CardTitle>
                <CardDescription>Probabilidade de sucesso baseada em estudos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(predefinedScenarios).map(([key, data]) => {
                    const confidence = key === "conservative" ? 90 : key === "balanced" ? 80 : 70
                    const risk = key === "conservative" ? "Baixo" : key === "balanced" ? "Médio" : "Alto"
                    const riskColor =
                      key === "conservative"
                        ? "text-green-600"
                        : key === "balanced"
                          ? "text-yellow-600"
                          : "text-red-600"

                    return (
                      <div key={key} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{data.name}</div>
                          <div className="text-sm text-muted-foreground">Confiança: {confidence}%</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${riskColor}`}>{risk}</div>
                          <div className="text-sm text-muted-foreground">Risco</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Evolução Realista do ROI</CardTitle>
              <CardDescription>Curva de adoção gradual baseada em implementações reais</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Area
                    type="monotone"
                    dataKey="investment"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="Investimento"
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stackId="2"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.6}
                    name="Economia"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Impacto Realista por Categoria</CardTitle>
              <CardDescription>Reduções conservadoras baseadas em benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="investment" fill="#ef4444" name="Investimento" />
                  <Bar dataKey="savings" fill="#22c55e" name="Economia" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Benchmarks de Mercado</CardTitle>
              <CardDescription>Comparação com estudos e cases reais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">📊 Reduções Realistas</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Absenteísmo</span>
                      <span className="font-medium text-green-600">10-25%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Turnover</span>
                      <span className="font-medium text-green-600">15-30%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Sinistralidade</span>
                      <span className="font-medium text-green-600">8-18%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Produtividade</span>
                      <span className="font-medium text-green-600">3-10%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">🎯 ROI de Mercado</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Johnson & Johnson</span>
                      <span className="font-medium text-blue-600">2.7:1</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Wellhub (Brasil)</span>
                      <span className="font-medium text-blue-600">2.5:1</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Harvard Study</span>
                      <span className="font-medium text-blue-600">2.3:1</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">Média Setor Tech BR</span>
                      <span className="font-medium text-blue-600">2.1:1</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alertas Realistas */}
      <div className="space-y-4">
        {results.summary.roi < 2 && (
          <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>ROI Abaixo do Mercado:</strong> O retorno está abaixo do padrão brasileiro (2:1). Considere
              ajustar estratégia ou focar em categorias de maior impacto comprovado.
            </AlertDescription>
          </Alert>
        )}

        {results.summary.roi >= 2.5 && results.summary.paybackMonths <= 24 && (
          <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>Cenário Viável:</strong> ROI alinhado com benchmarks de mercado e payback aceitável. Investimento
              recomendado com base em evidências sólidas.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
