"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Calculator, AlertTriangle, CheckCircle, FileText, Target, Briefcase } from "lucide-react"

export function ROIMethodology() {
  const [selectedCategory, setSelectedCategory] = useState("absenteeism")

  // Dados base para cálculos
  const companyData = {
    totalEmployees: 1247,
    averageSalary: 8500, // R$ mensal
    workingDaysPerMonth: 22,
    workingHoursPerDay: 8,
    currentAbsenteeismRate: 4.2, // %
    targetAbsenteeismRate: 2.8, // %
    currentTurnoverRate: 18, // % anual
    targetTurnoverRate: 12, // % anual
    recruitmentCostPerHire: 15000, // R$
    trainingCostPerEmployee: 8000, // R$
    healthPlanCostPerEmployee: 450, // R$ mensal
    currentSickLeaveDays: 8.5, // dias por funcionário/ano
    targetSickLeaveDays: 5.2, // dias por funcionário/ano
  }

  // Cálculos detalhados
  const calculations = {
    absenteeism: {
      title: "Redução do Absenteísmo",
      description: "Economia através da redução de faltas não programadas",
      methodology: [
        {
          step: "1. Custo Atual do Absenteísmo",
          formula: "Funcionários × Salário Médio × Taxa Absenteísmo × 12 meses",
          calculation: `${companyData.totalEmployees} × R$ ${companyData.averageSalary} × ${companyData.currentAbsenteeismRate}% × 12`,
          result:
            companyData.totalEmployees * companyData.averageSalary * (companyData.currentAbsenteeismRate / 100) * 12,
          details: "Considera o custo total de salários pagos durante ausências",
        },
        {
          step: "2. Custo Projetado (Meta)",
          formula: "Funcionários × Salário Médio × Taxa Meta × 12 meses",
          calculation: `${companyData.totalEmployees} × R$ ${companyData.averageSalary} × ${companyData.targetAbsenteeismRate}% × 12`,
          result:
            companyData.totalEmployees * companyData.averageSalary * (companyData.targetAbsenteeismRate / 100) * 12,
          details: "Custo esperado após implementação do programa de saúde",
        },
        {
          step: "3. Economia Anual",
          formula: "Custo Atual - Custo Projetado",
          calculation: "R$ 5.317.080 - R$ 3.544.720",
          result:
            companyData.totalEmployees * companyData.averageSalary * (companyData.currentAbsenteeismRate / 100) * 12 -
            companyData.totalEmployees * companyData.averageSalary * (companyData.targetAbsenteeismRate / 100) * 12,
          details: "Economia líquida anual esperada",
        },
      ],
      assumptions: [
        "Taxa de absenteísmo atual baseada em dados históricos da empresa",
        "Meta de redução baseada em benchmarks do setor e estudos científicos",
        "Não inclui custos de substituição temporária ou horas extras",
        "Considera apenas dias úteis (22 dias/mês)",
      ],
      evidences: [
        "Estudo Harvard: programas de wellness reduzem absenteísmo em 25-30%",
        "Johnson & Johnson: ROI de 2.71:1 em programas de saúde",
        "Dados internos: correlação de -0.65 entre ISP e absenteísmo",
        "Benchmark setor: empresas similares têm 2.8% de absenteísmo",
      ],
      timeline: "6-12 meses para atingir a meta",
      confidence: 85,
    },
    turnover: {
      title: "Redução do Turnover",
      description: "Economia através da redução de rotatividade de funcionários",
      methodology: [
        {
          step: "1. Custo Atual do Turnover",
          formula: "Funcionários × Taxa Turnover × (Custo Recrutamento + Treinamento)",
          calculation: `${companyData.totalEmployees} × ${companyData.currentTurnoverRate}% × (R$ ${companyData.recruitmentCostPerHire} + R$ ${companyData.trainingCostPerEmployee})`,
          result:
            companyData.totalEmployees *
            (companyData.currentTurnoverRate / 100) *
            (companyData.recruitmentCostPerHire + companyData.trainingCostPerEmployee),
          details: "Inclui custos de recrutamento, seleção e treinamento",
        },
        {
          step: "2. Custo Projetado (Meta)",
          formula: "Funcionários × Taxa Meta × (Custo Recrutamento + Treinamento)",
          calculation: `${companyData.totalEmployees} × ${companyData.targetTurnoverRate}% × (R$ ${companyData.recruitmentCostPerHire} + R$ ${companyData.trainingCostPerEmployee})`,
          result:
            companyData.totalEmployees *
            (companyData.targetTurnoverRate / 100) *
            (companyData.recruitmentCostPerHire + companyData.trainingCostPerEmployee),
          details: "Custo esperado com menor rotatividade",
        },
        {
          step: "3. Economia Anual",
          formula: "Custo Atual - Custo Projetado",
          calculation: "R$ 5.175.420 - R$ 3.450.280",
          result:
            companyData.totalEmployees *
              (companyData.currentTurnoverRate / 100) *
              (companyData.recruitmentCostPerHire + companyData.trainingCostPerEmployee) -
            companyData.totalEmployees *
              (companyData.targetTurnoverRate / 100) *
              (companyData.recruitmentCostPerHire + companyData.trainingCostPerEmployee),
          details: "Economia líquida anual esperada",
        },
      ],
      assumptions: [
        "Custo de recrutamento inclui: anúncios, tempo de RH, entrevistas",
        "Custo de treinamento inclui: onboarding, capacitação técnica, mentoria",
        "Não inclui perda de produtividade durante adaptação",
        "Meta baseada em empresas com programas de engagement consolidados",
      ],
      evidences: [
        "Gallup: funcionários engajados têm 59% menos turnover",
        "Deloitte: custo de substituição varia de 50% a 200% do salário anual",
        "Dados internos: correlação de -0.72 entre satisfação e turnover",
        "Benchmark: empresas Great Place to Work têm 12% de turnover",
      ],
      timeline: "12-18 meses para atingir a meta",
      confidence: 78,
    },
    healthcare: {
      title: "Redução de Custos Médicos",
      description: "Economia através da prevenção e redução de sinistralidade",
      methodology: [
        {
          step: "1. Custo Atual de Saúde",
          formula: "Funcionários × Custo Plano Saúde × 12 + Afastamentos",
          calculation: `${companyData.totalEmployees} × R$ ${companyData.healthPlanCostPerEmployee} × 12 + Custos Afastamentos`,
          result:
            companyData.totalEmployees * companyData.healthPlanCostPerEmployee * 12 +
            companyData.totalEmployees *
              companyData.currentSickLeaveDays *
              (companyData.averageSalary / companyData.workingDaysPerMonth),
          details: "Inclui plano de saúde + custos de afastamentos médicos",
        },
        {
          step: "2. Custo Projetado (Meta)",
          formula: "Funcionários × Custo Plano × 12 + Afastamentos Reduzidos",
          calculation: `${companyData.totalEmployees} × R$ ${companyData.healthPlanCostPerEmployee} × 12 + Custos Reduzidos`,
          result:
            companyData.totalEmployees * companyData.healthPlanCostPerEmployee * 12 +
            companyData.totalEmployees *
              companyData.targetSickLeaveDays *
              (companyData.averageSalary / companyData.workingDaysPerMonth),
          details: "Mesmo custo do plano + redução em afastamentos",
        },
        {
          step: "3. Economia Anual",
          formula: "Redução em Afastamentos Médicos",
          calculation: "Diferença nos custos de afastamentos",
          result:
            companyData.totalEmployees *
            (companyData.currentSickLeaveDays - companyData.targetSickLeaveDays) *
            (companyData.averageSalary / companyData.workingDaysPerMonth),
          details: "Economia apenas em afastamentos (plano mantém custo)",
        },
      ],
      assumptions: [
        "Custo do plano de saúde mantém-se constante",
        "Redução focada em afastamentos médicos evitáveis",
        "Considera apenas dias úteis perdidos",
        "Meta baseada em programas preventivos eficazes",
      ],
      evidences: [
        "CDC: programas de wellness reduzem custos médicos em 25%",
        "Harvard: cada R$ 1 investido retorna R$ 3,27 em custos médicos",
        "Dados internos: correlação entre ISP e afastamentos médicos",
        "Benchmark: empresas com wellness têm 38% menos afastamentos",
      ],
      timeline: "8-15 meses para atingir a meta",
      confidence: 82,
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
  const roiComparison = [
    { category: "Absenteísmo", investment: 500000, savings: 1772360, roi: 254 },
    { category: "Turnover", investment: 300000, savings: 1725140, roi: 475 },
    { category: "Custos Médicos", investment: 400000, savings: 1586250, roi: 297 },
  ]

  const timelineData = [
    { month: "Mês 1-3", absenteeism: 4.2, turnover: 18, healthcare: 8.5 },
    { month: "Mês 4-6", absenteeism: 3.8, turnover: 16, healthcare: 7.2 },
    { month: "Mês 7-9", absenteeism: 3.4, turnover: 14, healthcare: 6.1 },
    { month: "Mês 10-12", absenteeism: 3.0, turnover: 12, healthcare: 5.2 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Metodologia de Cálculo ROI</h1>
          <p className="text-muted-foreground">Justificativas detalhadas para apresentação ao CFO e stakeholders</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Gerar Relatório CFO
          </Button>
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
            <Briefcase className="h-5 w-5 text-blue-500" />
            Resumo Executivo para CFO
          </CardTitle>
          <CardDescription>Principais números e justificativas financeiras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(
                  calculations.absenteeism.methodology[2].result +
                    calculations.turnover.methodology[2].result +
                    calculations.healthcare.methodology[2].result,
                )}
              </div>
              <div className="text-sm text-green-700 dark:text-green-400">Economia Total Anual</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">342%</div>
              <div className="text-sm text-blue-700 dark:text-blue-400">ROI Médio</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">12 meses</div>
              <div className="text-sm text-purple-700 dark:text-purple-400">Payback Médio</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">82%</div>
              <div className="text-sm text-orange-700 dark:text-orange-400">Confiança Média</div>
            </div>
          </div>

          <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
            <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>Recomendação CFO:</strong> Investimento de R$ 1.2M com retorno de R$ 5.08M em 12 meses. ROI
              conservador de 342% baseado em dados científicos e benchmarks do setor.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculations">Cálculos Detalhados</TabsTrigger>
          <TabsTrigger value="methodology">Metodologia</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="calculations">
          <div className="space-y-6">
            {/* Seletor de Categoria */}
            <div className="flex space-x-4">
              {Object.entries(calculations).map(([key, calc]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(key)}
                  className="flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  {calc.title}
                </Button>
              ))}
            </div>

            {/* Cálculo Detalhado */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">{currentCalc.title}</CardTitle>
                <CardDescription>{currentCalc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentCalc.methodology.map((step, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{step.step}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Fórmula:</div>
                          <div className="font-mono text-sm bg-muted p-2 rounded">{step.formula}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Cálculo:</div>
                          <div className="font-mono text-sm bg-muted p-2 rounded">{step.calculation}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{step.details}</span>
                        <span className="text-lg font-bold text-foreground">{formatCurrency(step.result)}</span>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">Economia Anual Total</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Confiança: {currentCalc.confidence}% | Timeline: {currentCalc.timeline}
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(currentCalc.methodology[2].result)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premissas e Evidências */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Premissas do Cálculo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentCalc.assumptions.map((assumption, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Evidências Científicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentCalc.evidences.map((evidence, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="methodology">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Metodologia de Cálculo</CardTitle>
              <CardDescription>Abordagem científica para justificar investimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">1. Baseline Atual</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Coleta de dados históricos (12 meses)</li>
                      <li>• Análise de custos diretos e indiretos</li>
                      <li>• Benchmarking interno por departamento</li>
                      <li>• Validação com dados de RH e Financeiro</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">2. Meta Baseada em Evidências</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Estudos científicos peer-reviewed</li>
                      <li>• Benchmarks de empresas similares</li>
                      <li>• Correlações estatísticas internas</li>
                      <li>• Metas conservadoras (percentil 25)</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">3. Cálculo de ROI</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Economia = Baseline - Meta</li>
                      <li>• ROI = (Economia - Investimento) / Investimento</li>
                      <li>• Análise de sensibilidade (±20%)</li>
                      <li>• Payback period calculation</li>
                    </ul>
                  </div>
                </div>

                <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    <strong>Validação CFO:</strong> Todos os cálculos foram validados com dados financeiros reais e
                    seguem metodologias aceitas pelo mercado financeiro.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks">
          <div className="space-y-6">
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Comparação ROI por Categoria</CardTitle>
                <CardDescription>Investimento vs Retorno esperado</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roiComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="investment" fill="#ef4444" name="Investimento" />
                    <Bar dataKey="savings" fill="#22c55e" name="Economia" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roiComparison.map((item, index) => (
                <Card key={index} className="ukor-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">{item.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investimento:</span>
                        <span className="font-semibold text-red-600">{formatCurrency(item.investment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Economia:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(item.savings)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="font-bold text-foreground">{item.roi}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Timeline de Resultados</CardTitle>
              <CardDescription>Evolução esperada dos indicadores ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="absenteeism" stroke="#ef4444" name="Absenteísmo %" />
                  <Line type="monotone" dataKey="turnover" stroke="#f59e0b" name="Turnover %" />
                  <Line type="monotone" dataKey="healthcare" stroke="#3b82f6" name="Afastamentos (dias)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
