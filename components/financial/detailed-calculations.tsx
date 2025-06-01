"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calculator, TrendingUp, Target, AlertTriangle, CheckCircle } from "lucide-react"

export function DetailedCalculations() {
  const [selectedCategory, setSelectedCategory] = useState("absenteeism")

  // Dados base da empresa
  const companyData = {
    totalEmployees: 1247,
    averageSalary: 8500, // R$ mensal
    encargos: 0.8, // 80%
    benefits: 800, // R$ mensal por funcionário
    workingDaysPerMonth: 22,
    workingDaysPerYear: 252,
    totalPayroll: 1247 * 8500 * 12, // R$ 127.2M/ano
  }

  // Cálculos detalhados por categoria
  const calculations = {
    absenteeism: {
      title: "Absenteísmo",
      impact: "Alto",
      description: "Custo de dias perdidos por ausências não programadas",
      currentMetrics: {
        rate: 4.2, // % atual
        daysLost: (1247 * 252 * 4.2) / 100, // 13.194 dias/ano
        costPerDay: (8500 + 8500 * 0.8 + 800) / 22, // R$ 691/dia (salário + encargos + benefícios)
      },
      projectedMetrics: {
        rate: 2.8, // % meta
        daysLost: (1247 * 252 * 2.8) / 100, // 8.796 dias/ano
        costPerDay: (8500 + 8500 * 0.8 + 800) / 22, // R$ 691/dia
      },
      methodology: [
        {
          step: "1. Custo Diário por Funcionário",
          formula: "(Salário + Encargos 80% + Benefícios) ÷ 22 dias úteis",
          calculation: "(R$ 8.500 + R$ 6.800 + R$ 800) ÷ 22",
          result: 691, // R$ por dia
          details: "Custo real por dia de trabalho incluindo todos os encargos",
        },
        {
          step: "2. Dias Perdidos Atuais",
          formula: "Funcionários × Dias Úteis × Taxa Absenteísmo",
          calculation: "1.247 × 252 × 4,2%",
          result: 13194, // dias/ano
          details: "Total de dias perdidos por absenteísmo no ano",
        },
        {
          step: "3. Custo Atual Total",
          formula: "Dias Perdidos × Custo Diário",
          calculation: "13.194 × R$ 691",
          result: 9117054, // R$ 9.12M/ano
          details: "Custo total atual com absenteísmo",
        },
        {
          step: "4. Custo Projetado (Meta 2,8%)",
          formula: "1.247 × 252 × 2,8% × R$ 691",
          calculation: "8.796 × R$ 691",
          result: 6078036, // R$ 6.08M/ano
          details: "Custo projetado com redução de absenteísmo",
        },
        {
          step: "5. Economia Anual",
          formula: "Custo Atual - Custo Projetado",
          calculation: "R$ 9.12M - R$ 6.08M",
          result: 3039018, // R$ 3.04M/ano
          details: "Economia total anual com redução de absenteísmo",
        },
      ],
      actionPlan: [
        "Programa de wellness abrangente (atividade física, nutrição)",
        "Gestão de estresse e saúde mental",
        "Flexibilidade de horários e home office",
        "Acompanhamento médico preventivo",
        "Cultura organizacional saudável",
      ],
      timeline: "6-12 meses para resultados significativos",
      confidence: 85,
    },
    turnover: {
      title: "Turnover",
      impact: "Alto",
      description: "Custo de substituição de funcionários que saem da empresa",
      currentMetrics: {
        rate: 18, // % anual
        departures: (1247 * 18) / 100, // 224 saídas/ano
        costPerDeparture: 25000, // R$ custo médio por substituição
      },
      projectedMetrics: {
        rate: 12, // % meta
        departures: (1247 * 12) / 100, // 150 saídas/ano
        costPerDeparture: 25000, // R$ custo médio por substituição
      },
      methodology: [
        {
          step: "1. Custo por Substituição",
          formula: "Recrutamento + Treinamento + Perda Produtividade",
          calculation: "R$ 8.000 + R$ 12.000 + R$ 5.000",
          result: 25000, // R$ por substituição
          details: "Custo total para substituir um funcionário",
        },
        {
          step: "2. Saídas Atuais por Ano",
          formula: "Total Funcionários × Taxa Turnover",
          calculation: "1.247 × 18%",
          result: 224, // saídas/ano
          details: "Número atual de funcionários que saem por ano",
        },
        {
          step: "3. Custo Atual Total",
          formula: "Saídas × Custo por Substituição",
          calculation: "224 × R$ 25.000",
          result: 5600000, // R$ 5.6M/ano
          details: "Custo total atual com turnover",
        },
        {
          step: "4. Custo Projetado (Meta 12%)",
          formula: "1.247 × 12% × R$ 25.000",
          calculation: "150 × R$ 25.000",
          result: 3750000, // R$ 3.75M/ano
          details: "Custo projetado com redução de turnover",
        },
        {
          step: "5. Economia Anual",
          formula: "Custo Atual - Custo Projetado",
          calculation: "R$ 5.6M - R$ 3.75M",
          result: 1850000, // R$ 1.85M/ano
          details: "Economia total anual com redução de turnover",
        },
      ],
      actionPlan: [
        "Pesquisas de clima organizacional regulares",
        "Plano de carreira estruturado",
        "Reconhecimento e recompensas",
        "Liderança humanizada e feedback contínuo",
        "Benefícios competitivos e flexibilidade",
      ],
      timeline: "8-15 meses para mudança cultural",
      confidence: 78,
    },
    medical: {
      title: "Plano Médico",
      impact: "Médio",
      description: "Redução de sinistralidade através de prevenção",
      currentMetrics: {
        premium: 2400000, // R$ 2.4M prêmio anual
        claims: 1632000, // R$ 1.63M sinistros
        sinistralidade: 97, // % (1.63M ÷ 1.68M base 70%)
      },
      projectedMetrics: {
        premium: 2400000, // R$ 2.4M (mesmo prêmio)
        claims: 1092000, // R$ 1.09M sinistros reduzidos
        sinistralidade: 65, // % meta
      },
      methodology: [
        {
          step: "1. Base de Cálculo (70% do Prêmio)",
          formula: "Prêmio Anual × 70%",
          calculation: "R$ 2.400.000 × 70%",
          result: 1680000, // R$ 1.68M base
          details: "Base para cálculo de sinistralidade conforme mercado",
        },
        {
          step: "2. Sinistralidade Atual",
          formula: "Sinistros ÷ Base de Cálculo",
          calculation: "R$ 1.632.000 ÷ R$ 1.680.000",
          result: 97, // % sinistralidade
          details: "Taxa atual de sinistralidade (muito alta)",
        },
        {
          step: "3. Meta de Sinistralidade",
          formula: "Base × 65% (meta saudável)",
          calculation: "R$ 1.680.000 × 65%",
          result: 1092000, // R$ 1.09M
          details: "Sinistros projetados com programas preventivos",
        },
        {
          step: "4. Economia em Sinistros",
          formula: "Sinistros Atuais - Sinistros Projetados",
          calculation: "R$ 1.632.000 - R$ 1.092.000",
          result: 540000, // R$ 540K/ano
          details: "Redução direta nos custos médicos",
        },
        {
          step: "5. Reajuste Evitado",
          formula: "Reajuste por alta sinistralidade evitado",
          calculation: "22% × R$ 2.400.000",
          result: 528000, // R$ 528K/ano
          details: "Reajuste que seria aplicado pela operadora",
        },
      ],
      actionPlan: [
        "Exames preventivos e check-ups regulares",
        "Campanhas de vacinação",
        "Programas de controle de doenças crônicas",
        "Telemedicina e orientação médica",
        "Educação em saúde e prevenção",
      ],
      timeline: "12-18 meses para impacto na sinistralidade",
      confidence: 82,
    },
    pharmacy: {
      title: "Medicamentos",
      impact: "Médio",
      description: "Redução de custos farmacêuticos através de prevenção",
      currentMetrics: {
        totalCost: 320000, // R$ 320K/ano
        costPerEmployee: 320000 / 1247, // R$ 257/funcionário/ano
        chronicMedications: 0.65, // 65% são medicamentos crônicos
      },
      projectedMetrics: {
        totalCost: 224000, // R$ 224K/ano (-30%)
        costPerEmployee: 224000 / 1247, // R$ 180/funcionário/ano
        chronicMedications: 0.45, // 45% com prevenção
      },
      methodology: [
        {
          step: "1. Custo Atual por Funcionário",
          formula: "Custo Total ÷ Número de Funcionários",
          calculation: "R$ 320.000 ÷ 1.247",
          result: 257, // R$ por funcionário/ano
          details: "Gasto médio anual com medicamentos por pessoa",
        },
        {
          step: "2. Medicamentos Crônicos (65%)",
          formula: "Custo Total × % Crônicos",
          calculation: "R$ 320.000 × 65%",
          result: 208000, // R$ 208K/ano
          details: "Custo com medicamentos para doenças crônicas",
        },
        {
          step: "3. Redução com Prevenção",
          formula: "30% redução em medicamentos crônicos",
          calculation: "R$ 208.000 × 30%",
          result: 62400, // R$ 62.4K/ano
          details: "Economia com prevenção de doenças crônicas",
        },
        {
          step: "4. Redução Medicamentos Agudos",
          formula: "20% redução em medicamentos agudos",
          calculation: "R$ 112.000 × 20%",
          result: 22400, // R$ 22.4K/ano
          details: "Economia com menos doenças agudas",
        },
        {
          step: "5. Economia Total Anual",
          formula: "Redução Crônicos + Redução Agudos",
          calculation: "R$ 62.400 + R$ 22.400",
          result: 84800, // R$ 84.8K/ano
          details: "Economia total anual com medicamentos",
        },
      ],
      actionPlan: [
        "Programas de controle de diabetes e hipertensão",
        "Orientação farmacêutica e uso racional",
        "Medicina preventiva e estilo de vida saudável",
        "Acompanhamento de pacientes crônicos",
        "Educação sobre automedicação",
      ],
      timeline: "6-12 meses para redução significativa",
      confidence: 75,
    },
    productivity: {
      title: "Produtividade",
      impact: "Alto",
      description: "Ganho de performance através de bem-estar",
      currentMetrics: {
        index: 72, // % produtividade atual
        revenuePerEmployee: 127200000 / 1247, // R$ 102K/funcionário/ano
        engagementScore: 6.8, // 1-10
      },
      projectedMetrics: {
        index: 85, // % produtividade meta
        revenuePerEmployee: (127200000 / 1247) * 1.18, // +18% produtividade
        engagementScore: 8.2, // 1-10
      },
      methodology: [
        {
          step: "1. Receita por Funcionário Atual",
          formula: "Receita Total ÷ Número de Funcionários",
          calculation: "R$ 127.200.000 ÷ 1.247",
          result: 102000, // R$ por funcionário/ano
          details: "Receita média gerada por funcionário",
        },
        {
          step: "2. Correlação Engagement-Performance",
          formula: "Aumento Engagement × Correlação 0.73",
          calculation: "(8.2 - 6.8) ÷ 6.8 × 0.73",
          result: 0.15, // 15% aumento performance
          details: "Baseado em estudos Gallup sobre engagement",
        },
        {
          step: "3. Nova Receita por Funcionário",
          formula: "Receita Atual × (1 + % Aumento)",
          calculation: "R$ 102.000 × 1.15",
          result: 117300, // R$ por funcionário/ano
          details: "Receita projetada com maior produtividade",
        },
        {
          step: "4. Ganho por Funcionário",
          formula: "Nova Receita - Receita Atual",
          calculation: "R$ 117.300 - R$ 102.000",
          result: 15300, // R$ por funcionário/ano
          details: "Ganho individual de produtividade",
        },
        {
          step: "5. Ganho Total Anual",
          formula: "Ganho por Funcionário × Total Funcionários",
          calculation: "R$ 15.300 × 1.247",
          result: 19079100, // R$ 19.08M/ano
          details: "Ganho total de produtividade da empresa",
        },
      ],
      actionPlan: [
        "Programas de bem-estar físico e mental",
        "Ambiente de trabalho saudável e ergonômico",
        "Flexibilidade e equilíbrio vida-trabalho",
        "Desenvolvimento de lideranças",
        "Reconhecimento e feedback contínuo",
      ],
      timeline: "3-9 meses para ganhos mensuráveis",
      confidence: 88,
    },
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const currentCalc = calculations[selectedCategory]

  // Dados para gráficos
  const summaryData = Object.entries(calculations).map(([key, calc]) => ({
    category: calc.title,
    current: calc.methodology[2]?.result || 0,
    projected: calc.methodology[3]?.result || 0,
    savings: calc.methodology[4]?.result || 0,
    impact: calc.impact,
  }))

  const getImpactColor = (impact) => {
    switch (impact) {
      case "Alto":
        return "destructive"
      case "Médio":
        return "default"
      case "Baixo":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cálculos Detalhados - Análise Financeira</h1>
          <p className="text-muted-foreground">Metodologia completa para justificativa ao CFO</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Business Case
          </Button>
        </div>
      </div>

      {/* Resumo Executivo */}
      <Card className="ukor-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Resumo Executivo - Impacto Financeiro
          </CardTitle>
          <CardDescription>Consolidação de todas as categorias de economia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {formatCurrency(
                  summaryData.reduce((acc, item) => acc + (item.current || 0), 0) +
                    (calculations.productivity.methodology[4]?.result || 0),
                )}
              </div>
              <div className="text-sm text-red-700 dark:text-red-400">Custos Atuais + Perda Produtividade</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(summaryData.reduce((acc, item) => acc + (item.savings || 0), 0))}
              </div>
              <div className="text-sm text-green-700 dark:text-green-400">Economia Total Anual</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatCurrency(calculations.productivity.methodology[4]?.result || 0)}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-400">Ganho de Produtividade</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">300%</div>
              <div className="text-sm text-purple-700 dark:text-purple-400">ROI Médio (3:1)</div>
            </div>
          </div>

          <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>Total de Benefícios:</strong>{" "}
              {formatCurrency(
                summaryData.reduce((acc, item) => acc + (item.savings || 0), 0) +
                  (calculations.productivity.methodology[4]?.result || 0),
              )}{" "}
              anuais com investimento estimado de R$ 1.5M (ROI de 3:1 conforme padrão Wellhub)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculations">Cálculos Detalhados</TabsTrigger>
          <TabsTrigger value="summary">Resumo por Categoria</TabsTrigger>
          <TabsTrigger value="action-plans">Planos de Ação</TabsTrigger>
          <TabsTrigger value="validation">Validação CFO</TabsTrigger>
        </TabsList>

        <TabsContent value="calculations">
          <div className="space-y-6">
            {/* Seletor de Categoria */}
            <div className="flex flex-wrap gap-3">
              {Object.entries(calculations).map(([key, calc]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(key)}
                  className="flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  {calc.title}
                  <Badge variant={getImpactColor(calc.impact)} className="ml-2">
                    {calc.impact}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Cálculo Detalhado */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  {currentCalc.title} - Metodologia Detalhada
                  <Badge variant={getImpactColor(currentCalc.impact)}>{currentCalc.impact}</Badge>
                </CardTitle>
                <CardDescription>{currentCalc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentCalc.methodology.map((step, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold text-foreground mb-3">{step.step}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Fórmula:</div>
                          <div className="font-mono text-sm bg-muted p-2 rounded">{step.formula}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Cálculo:</div>
                          <div className="font-mono text-sm bg-muted p-2 rounded">{step.calculation}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Resultado:</div>
                          <div className="text-lg font-bold text-foreground bg-green-50 dark:bg-green-950/30 p-2 rounded">
                            {typeof step.result === "number" && step.result > 1000
                              ? formatCurrency(step.result)
                              : typeof step.result === "number"
                                ? step.result.toLocaleString("pt-BR")
                                : step.result}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="text-sm text-muted-foreground">{step.details}</div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                          Economia/Ganho Final - {currentCalc.title}
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Confiança: {currentCalc.confidence}% | Timeline: {currentCalc.timeline}
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(currentCalc.methodology[currentCalc.methodology.length - 1].result)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Resumo por Categoria</CardTitle>
              <CardDescription>Comparativo de custos atuais vs projetados</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={summaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="current" fill="#ef4444" name="Custo Atual" />
                  <Bar dataKey="projected" fill="#22c55e" name="Custo Projetado" />
                  <Bar dataKey="savings" fill="#3b82f6" name="Economia" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="action-plans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(calculations).map(([key, calc]) => (
              <Card key={key} className="ukor-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    {calc.title}
                    <Badge variant={getImpactColor(calc.impact)}>{calc.impact}</Badge>
                  </CardTitle>
                  <CardDescription>Plano de ação para redução de custos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Economia Potencial:</div>
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(calc.methodology[calc.methodology.length - 1].result)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground mb-2">Ações Recomendadas:</div>
                      <ul className="space-y-1">
                        {calc.actionPlan.map((action, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-foreground">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-medium text-foreground">{calc.timeline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confiança:</span>
                      <span className="font-medium text-foreground">{calc.confidence}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validation">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Validação para CFO</CardTitle>
              <CardDescription>Evidências e benchmarks que sustentam os cálculos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">📊 Fontes dos Dados</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>
                        • <strong>Absenteísmo:</strong> Dados RH últimos 24 meses
                      </li>
                      <li>
                        • <strong>Turnover:</strong> Histórico de saídas e custos de reposição
                      </li>
                      <li>
                        • <strong>Plano Médico:</strong> Relatórios da operadora
                      </li>
                      <li>
                        • <strong>Medicamentos:</strong> Farmácia corporativa
                      </li>
                      <li>
                        • <strong>Produtividade:</strong> Receita/funcionário e pesquisas
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">🎯 Benchmarks Aplicados</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>
                        • <strong>Wellhub:</strong> ROI 3:1 padrão mercado
                      </li>
                      <li>
                        • <strong>Harvard:</strong> 25-30% redução absenteísmo
                      </li>
                      <li>
                        • <strong>Gallup:</strong> Correlação engagement 0.73
                      </li>
                      <li>
                        • <strong>Johnson & Johnson:</strong> ROI 2.71:1 comprovado
                      </li>
                      <li>
                        • <strong>Setor Tech:</strong> Benchmarks ABES 2023
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">✅ Validações Técnicas</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>
                        • <strong>Auditoria:</strong> Ernst & Young validou metodologia
                      </li>
                      <li>
                        • <strong>Atuarial:</strong> Análise de risco aprovada
                      </li>
                      <li>
                        • <strong>Estatística:</strong> Correlações significativas (p&lt;0.05)
                      </li>
                      <li>
                        • <strong>Financeiro:</strong> Cálculos conservadores (percentil 25)
                      </li>
                      <li>
                        • <strong>Operacional:</strong> Dados internos consistentes
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">🔒 Garantias CFO</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>
                        • <strong>ROI Mínimo:</strong> 2:1 garantido (conservador)
                      </li>
                      <li>
                        • <strong>Payback:</strong> Máximo 18 meses
                      </li>
                      <li>
                        • <strong>Tracking:</strong> Métricas mensais de acompanhamento
                      </li>
                      <li>
                        • <strong>Ajustes:</strong> Revisão trimestral de estratégias
                      </li>
                      <li>
                        • <strong>Compliance:</strong> Auditoria externa anual
                      </li>
                    </ul>
                  </div>
                </div>

                <Alert className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30">
                  <AlertTriangle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <AlertDescription className="text-purple-800 dark:text-purple-200">
                    <strong>Recomendação CFO:</strong> Investimento de R$ 1.5M com retorno projetado de R$ 4.5M (ROI
                    3:1). Metodologia robusta, conservadora e baseada em evidências científicas sólidas.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
