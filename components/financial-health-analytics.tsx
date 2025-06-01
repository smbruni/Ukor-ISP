"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, TrendingDown, Target, Download } from "lucide-react"

export function FinancialHealthAnalytics() {
  const [selectedScenario, setSelectedScenario] = useState("current")
  const [timeframe, setTimeframe] = useState("12m")

  // Dados financeiros base (valores anuais em R$)
  const currentFinancials = {
    healthCosts: {
      medical: 2400000, // Plano de saúde
      dental: 180000, // Plano odontológico
      pharmacy: 320000, // Medicamentos
      absenteeism: 890000, // Absenteísmo
      turnover: 1200000, // Turnover
      total: 4990000,
    },
    productivity: {
      current: 100, // Base 100%
      lostValue: 1800000, // Valor perdido por baixa produtividade
    },
    employees: 1247,
    avgSalary: 8500,
  }

  const projectedFinancials = {
    healthCosts: {
      medical: 1920000, // -20% (melhor sinistralidade)
      dental: 162000, // -10%
      pharmacy: 256000, // -20% (prevenção)
      absenteeism: 534000, // -40% (melhor saúde)
      turnover: 720000, // -40% (maior engajamento)
      total: 3592000,
    },
    productivity: {
      projected: 115, // +15% de produtividade
      gainValue: 2700000, // Valor ganho com maior produtividade
    },
    investmentRequired: 450000, // Investimento em programas de saúde
    confidence: 91,
  }

  const savings = {
    total: currentFinancials.healthCosts.total - projectedFinancials.healthCosts.total,
    productivityGain: projectedFinancials.productivity.gainValue,
    netBenefit:
      currentFinancials.healthCosts.total -
      projectedFinancials.healthCosts.total +
      projectedFinancials.productivity.gainValue -
      projectedFinancials.investmentRequired,
    roi:
      ((currentFinancials.healthCosts.total -
        projectedFinancials.healthCosts.total +
        projectedFinancials.productivity.gainValue -
        projectedFinancials.investmentRequired) /
        projectedFinancials.investmentRequired) *
      100,
  }

  const scenarios = [
    {
      id: "conservative",
      name: "Conservador",
      description: "Cenário com estimativas mais baixas",
      savingsMultiplier: 0.6,
      confidence: 95,
      timeToROI: 8,
    },
    {
      id: "realistic",
      name: "Realista",
      description: "Cenário baseado em dados históricos",
      savingsMultiplier: 1.0,
      confidence: 91,
      timeToROI: 6,
    },
    {
      id: "optimistic",
      name: "Otimista",
      description: "Cenário com máximo potencial",
      savingsMultiplier: 1.4,
      confidence: 78,
      timeToROI: 4,
    },
  ]

  const planAdjustments = [
    {
      plan: "Plano Básico",
      currentCost: 280,
      adjustedCost: 245,
      coverage: "Ambulatorial + Emergência",
      impact: "Redução de 12.5% nos custos",
      recommendation: "Manter para colaboradores de baixo risco",
    },
    {
      plan: "Plano Intermediário",
      currentCost: 420,
      adjustedCost: 378,
      coverage: "Completo sem obstetrícia",
      impact: "Redução de 10% nos custos",
      recommendation: "Ideal para maioria dos colaboradores",
    },
    {
      plan: "Plano Premium",
      currentCost: 680,
      adjustedCost: 612,
      coverage: "Completo com obstetrícia",
      impact: "Redução de 10% nos custos",
      recommendation: "Para colaboradores de alto risco ou famílias",
    },
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Análise Financeira de Saúde</h2>
          <p className="text-muted-foreground">
            Comparativo de custos atuais vs projetados com programas de saúde e produtividade
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Análise
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Custos Atuais</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(currentFinancials.healthCosts.total)}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(currentFinancials.healthCosts.total / currentFinancials.employees)} por colaborador/ano
            </p>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Custos Projetados</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(projectedFinancials.healthCosts.total)}
            </div>
            <p className="text-xs text-green-600">
              -
              {formatPercentage(
                ((currentFinancials.healthCosts.total - projectedFinancials.healthCosts.total) /
                  currentFinancials.healthCosts.total) *
                  100,
              )}{" "}
              vs atual
            </p>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Ganho Produtividade</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(projectedFinancials.productivity.gainValue)}
            </div>
            <p className="text-xs text-blue-600">
              +{projectedFinancials.productivity.projected - currentFinancials.productivity.current}% produtividade
            </p>
          </CardContent>
        </Card>

        <Card className="ukor-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">ROI Total</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatPercentage(savings.roi)}</div>
            <p className="text-xs text-purple-600">Payback em 6 meses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="breakdown">Detalhamento</TabsTrigger>
          <TabsTrigger value="scenarios">Cenários</TabsTrigger>
          <TabsTrigger value="plans">Ajuste de Planos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Comparativo Atual vs Projetado */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Comparativo Financeiro</CardTitle>
                <CardDescription>Cenário atual vs projetado (12 meses)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-lg font-bold text-red-600 mb-1">Cenário Atual</div>
                      <div className="text-2xl font-bold text-red-700">
                        {formatCurrency(currentFinancials.healthCosts.total)}
                      </div>
                      <div className="text-sm text-red-600 mt-1">Custos com saúde</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600 mb-1">Cenário Projetado</div>
                      <div className="text-2xl font-bold text-green-700">
                        {formatCurrency(projectedFinancials.healthCosts.total)}
                      </div>
                      <div className="text-sm text-green-600 mt-1">Com programas de saúde</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Economia em custos:</span>
                      <span className="font-bold text-green-600">{formatCurrency(savings.total)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Ganho produtividade:</span>
                      <span className="font-bold text-blue-600">{formatCurrency(savings.productivityGain)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Investimento necessário:</span>
                      <span className="font-bold text-orange-600">
                        -{formatCurrency(projectedFinancials.investmentRequired)}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Benefício líquido:</span>
                        <span className="font-bold text-purple-600 text-lg">{formatCurrency(savings.netBenefit)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">ROI: {formatPercentage(savings.roi)}</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Para cada R$ 1 investido, retorno de R$ {(savings.roi / 100 + 1).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown de Impactos */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Impactos por Categoria</CardTitle>
                <CardDescription>Onde estão as maiores oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      category: "Absenteísmo",
                      current: currentFinancials.healthCosts.absenteeism,
                      projected: projectedFinancials.healthCosts.absenteeism,
                      impact: "Alto",
                    },
                    {
                      category: "Turnover",
                      current: currentFinancials.healthCosts.turnover,
                      projected: projectedFinancials.healthCosts.turnover,
                      impact: "Alto",
                    },
                    {
                      category: "Plano Médico",
                      current: currentFinancials.healthCosts.medical,
                      projected: projectedFinancials.healthCosts.medical,
                      impact: "Médio",
                    },
                    {
                      category: "Medicamentos",
                      current: currentFinancials.healthCosts.pharmacy,
                      projected: projectedFinancials.healthCosts.pharmacy,
                      impact: "Médio",
                    },
                  ].map((item, index) => {
                    const saving = item.current - item.projected
                    const savingPercent = (saving / item.current) * 100

                    return (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-foreground">{item.category}</span>
                          <Badge variant={item.impact === "Alto" ? "destructive" : "secondary"}>{item.impact}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <div className="text-muted-foreground">Atual</div>
                            <div className="font-semibold">{formatCurrency(item.current)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Projetado</div>
                            <div className="font-semibold">{formatCurrency(item.projected)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Economia</div>
                            <div className="font-semibold text-green-600">
                              {formatCurrency(saving)} ({formatPercentage(savingPercent)})
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Detalhamento de Custos</CardTitle>
                <CardDescription>Análise detalhada por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {formatCurrency(currentFinancials.healthCosts.total)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Atual</div>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(currentFinancials.healthCosts)
                      .filter(([key]) => key !== "total")
                      .map(([key, value]) => {
                        const percentage = (value / currentFinancials.healthCosts.total) * 100
                        const labels = {
                          medical: "Plano Médico",
                          dental: "Plano Odontológico",
                          pharmacy: "Medicamentos",
                          absenteeism: "Absenteísmo",
                          turnover: "Turnover",
                        }

                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-foreground">{labels[key]}</span>
                              <span className="font-semibold">
                                {formatCurrency(value)} ({formatPercentage(percentage)})
                              </span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        )
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Análise de Produtividade</CardTitle>
                <CardDescription>Impacto na performance organizacional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                      <div className="text-sm text-blue-700">Produtividade Atual</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">115%</div>
                      <div className="text-sm text-green-700">Produtividade Projetada</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-foreground mb-1">Fatores de Melhoria</div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Redução de 40% no absenteísmo</li>
                        <li>• Melhoria de 25% no engajamento</li>
                        <li>• Redução de 30% no estresse</li>
                        <li>• Melhoria de 20% na qualidade do sono</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-1">Valor Gerado</div>
                      <div className="text-2xl font-bold text-green-700">
                        {formatCurrency(projectedFinancials.productivity.gainValue)}
                      </div>
                      <div className="text-sm text-green-600">
                        +15% de produtividade = +
                        {formatCurrency(projectedFinancials.productivity.gainValue / currentFinancials.employees)} por
                        colaborador
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios">
          <div className="space-y-6">
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Análise de Cenários</CardTitle>
                <CardDescription>Diferentes projeções baseadas em níveis de implementação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {scenarios.map((scenario) => {
                    const scenarioSavings = savings.total * scenario.savingsMultiplier
                    const scenarioProductivity = projectedFinancials.productivity.gainValue * scenario.savingsMultiplier
                    const scenarioNet = scenarioSavings + scenarioProductivity - projectedFinancials.investmentRequired
                    const scenarioROI = (scenarioNet / projectedFinancials.investmentRequired) * 100

                    return (
                      <Card
                        key={scenario.id}
                        className={`cursor-pointer transition-all ${selectedScenario === scenario.id ? "ring-2 ring-primary" : ""}`}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg text-foreground">{scenario.name}</CardTitle>
                            <Badge variant="outline">{formatPercentage(scenario.confidence)} confiança</Badge>
                          </div>
                          <CardDescription>{scenario.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Economia custos:</span>
                                <span className="font-semibold text-green-600">{formatCurrency(scenarioSavings)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Ganho produtividade:</span>
                                <span className="font-semibold text-blue-600">
                                  {formatCurrency(scenarioProductivity)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Benefício líquido:</span>
                                <span className="font-semibold text-purple-600">{formatCurrency(scenarioNet)}</span>
                              </div>
                            </div>

                            <div className="p-3 bg-muted rounded-lg">
                              <div className="text-center">
                                <div className="text-lg font-bold text-foreground">
                                  ROI: {formatPercentage(scenarioROI)}
                                </div>
                                <div className="text-sm text-muted-foreground">Payback: {scenario.timeToROI} meses</div>
                              </div>
                            </div>

                            <Button
                              variant={selectedScenario === scenario.id ? "default" : "outline"}
                              className="w-full"
                              onClick={() => setSelectedScenario(scenario.id)}
                            >
                              Selecionar Cenário
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Otimização de Planos de Saúde</CardTitle>
              <CardDescription>Ajustes recomendados para redução de custos mantendo qualidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planAdjustments.map((plan, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{plan.plan}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Custo atual:</span>
                          <span className="font-semibold">{formatCurrency(plan.currentCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Custo ajustado:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(plan.adjustedCost)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{plan.coverage}</div>
                        <div className="p-2 bg-green-50 rounded text-xs text-green-700">{plan.impact}</div>
                        <div className="text-xs text-blue-700">{plan.recommendation}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Estratégia Recomendada</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Segmentar colaboradores por perfil de risco usando dados do ISP</p>
                    <p>• Implementar programas preventivos para reduzir sinistralidade</p>
                    <p>• Negociar desconto com operadora baseado em melhores indicadores</p>
                    <p>
                      • Economia projetada: <strong>{formatCurrency(480000)}/ano</strong> (20% dos custos do plano)
                    </p>
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
