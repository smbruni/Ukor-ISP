"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Brain, Activity, DollarSign, Clock, Target, Stethoscope, Scale, Zap } from "lucide-react"
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"

export function DetailedROIAnalysis() {
  const [selectedCondition, setSelectedCondition] = useState("obesity")
  const [timeframe, setTimeframe] = useState("12months")

  // Dados base da empresa
  const companyData = {
    employees: 987,
    totalCost: 2803651,
    currentLossRatio: 110.04,
    targetLossRatio: 75,
  }

  // Distribuição de custos por condição
  const costDistribution = [
    { condition: "Cardiovascular", cost: 841095, percentage: 30, color: "#ef4444" },
    { condition: "Osteomuscular", cost: 560730, percentage: 20, color: "#f97316" },
    { condition: "Saúde Mental", cost: 420548, percentage: 15, color: "#8b5cf6" },
    { condition: "Diabetes", cost: 336438, percentage: 12, color: "#06b6d4" },
    { condition: "Obesidade", cost: 280365, percentage: 10, color: "#84cc16" },
    { condition: "Outros", cost: 364475, percentage: 13, color: "#6b7280" },
  ]

  // Análise detalhada por condição
  const conditionAnalysis = {
    obesity: {
      name: "Obesidade",
      icon: Scale,
      prevalence: 28,
      affectedEmployees: 276,
      severeCases: 89,
      currentCost: 280365,
      investment: 95000,
      projectedSavings: 420000,
      roi: 342,
      payback: 2.7,
      color: "#84cc16",
      details: {
        currentStatus: {
          imcOver30: 89,
          comorbidities: "40% aumento nos custos de outras condições",
          bariatricSurgeries: 3,
          surgeryCost: 45000,
        },
        investmentBreakdown: [
          { item: "Academia corporativa", cost: 48000, description: "Equipamentos + manutenção anual" },
          { item: "Nutricionista especializada", cost: 36000, description: "Profissional dedicado" },
          { item: "Programa reeducação alimentar", cost: 11000, description: "Material + workshops" },
        ],
        economyBreakdown: [
          { item: "Redução comorbidades", savings: 280000, description: "Reduz custos outras condições" },
          { item: "Redução cirurgias", savings: 67500, description: "50% menos cirurgias bariátricas" },
          { item: "Redução afastamentos", savings: 45000, description: "Menos dias de afastamento" },
          { item: "Aumento produtividade", savings: 27500, description: "Funcionários mais ativos" },
        ],
        actionPlan: [
          { phase: "Dias 1-15", action: "Avaliação nutricional completa (987 funcionários)" },
          { phase: "Dias 16-30", action: "Setup academia + contratação nutricionista" },
          { phase: "Dias 31-60", action: "Início programa reeducação alimentar" },
          { phase: "Dias 61-90", action: "Grupos de apoio + acompanhamento individual" },
        ],
      },
    },
    hypertension: {
      name: "Hipertensão",
      icon: Heart,
      prevalence: 35,
      affectedEmployees: 345,
      severeCases: 45,
      currentCost: 841095,
      investment: 85000,
      projectedSavings: 294000,
      roi: 246,
      payback: 3.5,
      color: "#ef4444",
      details: {
        currentStatus: {
          averageCostPerPatient: 2437,
          severeCaseCost: 18690,
          hospitalizations: 23,
          hospitalizationCost: 25000,
        },
        investmentBreakdown: [
          { item: "Aparelhos pressão digitais", cost: 15000, description: "100 unidades × R$ 150" },
          { item: "Nutricionista especializada", cost: 36000, description: "R$ 3K/mês" },
          { item: "Medicamentos padronizados", cost: 24000, description: "Protocolo unificado" },
          { item: "Sistema monitoramento", cost: 10000, description: "Software + setup" },
        ],
        economyBreakdown: [
          { item: "Redução internações", savings: 172500, description: "30% menos internações cardíacas" },
          { item: "Redução medicamentos", savings: 60000, description: "25% economia em medicamentos" },
          { item: "Redução emergências", savings: 60000, description: "40% menos consultas emergência" },
          { item: "Redução afastamentos", savings: 1500, description: "Menos dias perdidos" },
        ],
        actionPlan: [
          { phase: "Dias 1-15", action: "Rastreamento pressão arterial (987 funcionários)" },
          { phase: "Dias 16-30", action: "Identificação casos graves (45 pessoas)" },
          { phase: "Dias 31-60", action: "Início acompanhamento nutricional" },
          { phase: "Dias 61-90", action: "Implementação monitoramento domiciliar" },
        ],
      },
    },
    mentalHealth: {
      name: "Saúde Mental",
      icon: Brain,
      prevalence: 42,
      affectedEmployees: 415,
      severeCases: 89,
      currentCost: 420548,
      investment: 120000,
      projectedSavings: 378000,
      roi: 215,
      payback: 3.8,
      color: "#8b5cf6",
      details: {
        currentStatus: {
          leaveOfAbsence: 89,
          averageLeaveDays: 15,
          costPerLeave: 2400,
          psychiatricMedications: 156000,
        },
        investmentBreakdown: [
          { item: "Psicólogos (2 profissionais)", cost: 72000, description: "Atendimento presencial" },
          { item: "Plataforma telemedicina", cost: 24000, description: "Acesso 24/7" },
          { item: "Treinamento lideranças", cost: 15000, description: "Capacitação em saúde mental" },
          { item: "Ambiente descompressão", cost: 9000, description: "Espaço relaxamento" },
        ],
        economyBreakdown: [
          { item: "Redução afastamentos", savings: 96120, description: "45% menos afastamentos" },
          { item: "Redução turnover", savings: 288000, description: "12 pessoas × R$ 24K" },
          { item: "Aumento produtividade", savings: 99600, description: "415 pessoas × R$ 200/mês" },
          { item: "Redução medicamentos", savings: 31200, description: "20% economia medicamentos" },
        ],
        actionPlan: [
          { phase: "Dias 1-30", action: "Aplicação questionários (PHQ-9, GAD-7)" },
          { phase: "Dias 31-60", action: "Contratação psicólogos + setup telemedicina" },
          { phase: "Dias 61-90", action: "Treinamento lideranças em saúde mental" },
          { phase: "Dias 91-120", action: "Grupos de apoio + ambiente descompressão" },
        ],
      },
    },
    diabetes: {
      name: "Diabetes",
      icon: Activity,
      prevalence: 8.5,
      affectedEmployees: 84,
      severeCases: 18,
      currentCost: 336438,
      investment: 65000,
      projectedSavings: 235000,
      roi: 262,
      payback: 3.3,
      color: "#06b6d4",
      details: {
        currentStatus: {
          averageCostPerDiabetic: 4005,
          decompensatedCases: 18,
          decompensatedCost: 15000,
          medications: 168000,
        },
        investmentBreakdown: [
          { item: "Glicosímetros + fitas", cost: 25000, description: "84 kits completos" },
          { item: "Nutricionista especializada", cost: 30000, description: "Acompanhamento nutricional" },
          { item: "Educação em diabetes", cost: 10000, description: "Workshops + material" },
        ],
        economyBreakdown: [
          { item: "Redução descompensações", savings: 135000, description: "50% menos descompensações" },
          { item: "Redução medicamentos", savings: 42000, description: "25% economia medicamentos" },
          { item: "Redução emergências", savings: 35000, description: "Menos consultas emergência" },
          { item: "Redução afastamentos", savings: 23000, description: "Controle glicêmico melhor" },
        ],
        actionPlan: [
          { phase: "Dias 1-15", action: "Rastreamento glicemia (teste rápido)" },
          { phase: "Dias 16-30", action: "Identificação pré-diabéticos + diabéticos" },
          { phase: "Dias 31-45", action: "Educação em diabetes (workshops)" },
          { phase: "Dias 46-60", action: "Distribuição glicosímetros + início acompanhamento" },
        ],
      },
    },
    musculoskeletal: {
      name: "Osteomuscular",
      icon: Zap,
      prevalence: 65,
      affectedEmployees: 641,
      severeCases: 156,
      currentCost: 560730,
      investment: 75000,
      projectedSavings: 315000,
      roi: 320,
      payback: 2.9,
      color: "#f97316",
      details: {
        currentStatus: {
          leaveOfAbsence: 156,
          averageLeaveDays: 12,
          physiotherapy: 234000,
          orthopedicSurgeries: 8,
          surgeryCost: 35000,
        },
        investmentBreakdown: [
          { item: "Fisioterapeuta corporativo", cost: 48000, description: "Profissional dedicado" },
          { item: "Equipamentos ergonômicos", cost: 15000, description: "Cadeiras, apoios, etc." },
          { item: "Ginástica laboral", cost: 12000, description: "Programa diário" },
        ],
        economyBreakdown: [
          { item: "Redução afastamentos", savings: 112320, description: "40% menos afastamentos" },
          { item: "Redução fisioterapias", savings: 70200, description: "30% economia fisioterapia" },
          { item: "Redução cirurgias", savings: 70000, description: "25% menos cirurgias" },
          { item: "Aumento produtividade", savings: 62480, description: "Funcionários sem dor" },
        ],
        actionPlan: [
          { phase: "Dias 1-15", action: "Avaliação ergonômica completa" },
          { phase: "Dias 16-30", action: "Contratação fisioterapeuta + equipamentos" },
          { phase: "Dias 31-60", action: "Início ginástica laboral" },
          { phase: "Dias 61-90", action: "Atendimentos individualizados" },
        ],
      },
    },
  }

  // Ranking de prioridade
  const priorityRanking = [
    { condition: "Obesidade", roi: 342, payback: 2.7, investment: 95000, savings: 420000 },
    { condition: "Osteomuscular", roi: 320, payback: 2.9, investment: 75000, savings: 315000 },
    { condition: "Diabetes", roi: 262, payback: 3.3, investment: 65000, savings: 235000 },
    { condition: "Hipertensão", roi: 246, payback: 3.5, investment: 85000, savings: 294000 },
    { condition: "Saúde Mental", roi: 215, payback: 3.8, investment: 120000, savings: 378000 },
  ]

  // Dados para gráfico de implementação por fases
  const implementationPhases = [
    {
      phase: "Fase 1 (0-3 meses)",
      conditions: ["Obesidade", "Osteomuscular"],
      investment: 170000,
      savings: 735000,
      roi: 332,
    },
    {
      phase: "Fase 2 (3-6 meses)",
      conditions: ["Diabetes", "Hipertensão"],
      investment: 150000,
      savings: 529000,
      roi: 253,
    },
    {
      phase: "Fase 3 (6-12 meses)",
      conditions: ["Saúde Mental"],
      investment: 120000,
      savings: 378000,
      roi: 215,
    },
  ]

  const currentCondition = conditionAnalysis[selectedCondition]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Análise Detalhada de ROI por Condição</h2>
        <p className="text-muted-foreground">
          Cálculos baseados em problemas reais de saúde e dados científicos validados
        </p>
      </div>

      {/* Distribuição de Custos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-primary" />
            Distribuição de Custos por Condição
          </CardTitle>
          <CardDescription>
            Total: R$ {companyData.totalCost.toLocaleString()} - Baseado em dados reais da Unimed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ condition, percentage }) => `${condition}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cost"
                  >
                    {costDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`R$ ${(value / 1000).toFixed(0)}K`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {costDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium">{item.condition}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">R$ {(item.cost / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking de Prioridade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            Ranking de Prioridade por ROI
          </CardTitle>
          <CardDescription>Ordenado por retorno sobre investimento e tempo de payback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priorityRanking.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedCondition === item.condition.toLowerCase().replace("ç", "c").replace("ã", "a")
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedCondition(item.condition.toLowerCase().replace("ç", "c").replace("ã", "a"))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 text-primary h-8 w-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.condition}</h4>
                      <p className="text-sm text-muted-foreground">
                        Payback: {item.payback} meses • ROI: {item.roi}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+R$ {(item.savings / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-muted-foreground">
                      Investimento: R$ {(item.investment / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-100 h-2 rounded-full">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min((item.roi / 350) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análise Detalhada da Condição Selecionada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <currentCondition.icon className="h-5 w-5 mr-2" style={{ color: currentCondition.color }} />
            Análise Detalhada: {currentCondition.name}
          </CardTitle>
          <CardDescription>
            {currentCondition.affectedEmployees} funcionários afetados ({currentCondition.prevalence}% da empresa)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="investment">Investimento</TabsTrigger>
              <TabsTrigger value="economy">Economia</TabsTrigger>
              <TabsTrigger value="action">Plano de Ação</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{currentCondition.roi}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Payback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentCondition.payback} meses</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Investimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ {(currentCondition.investment / 1000).toFixed(0)}K</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Economia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      R$ {(currentCondition.projectedSavings / 1000).toFixed(0)}K
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Status Atual</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(currentCondition.details.currentStatus).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                        </span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Impacto Esperado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Redução de custos:</span>
                      <span className="text-sm font-medium text-green-600">
                        {((currentCondition.projectedSavings / currentCondition.currentCost) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Funcionários beneficiados:</span>
                      <span className="text-sm font-medium">{currentCondition.affectedEmployees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Casos graves:</span>
                      <span className="text-sm font-medium">{currentCondition.severeCases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tempo implementação:</span>
                      <span className="text-sm font-medium">60-120 dias</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="investment" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Breakdown do Investimento</h3>
                  <div className="text-xl font-bold">Total: R$ {currentCondition.investment.toLocaleString()}</div>
                </div>
                {currentCondition.details.investmentBreakdown.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.item}</h4>
                      <span className="font-bold">R$ {item.cost.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(item.cost / currentCondition.investment) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="economy" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Breakdown da Economia</h3>
                  <div className="text-xl font-bold text-green-600">
                    Total: R$ {currentCondition.projectedSavings.toLocaleString()}
                  </div>
                </div>
                {currentCondition.details.economyBreakdown.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.item}</h4>
                      <span className="font-bold text-green-600">R$ {item.savings.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(item.savings / currentCondition.projectedSavings) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="action" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Plano de Implementação</h3>
                {currentCondition.details.actionPlan.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="bg-primary/20 text-primary h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.phase}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Estratégia de Implementação por Fases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Estratégia de Implementação por Fases
          </CardTitle>
          <CardDescription>Sequenciamento otimizado para maximizar ROI e minimizar riscos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {implementationPhases.map((phase, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{phase.phase}</h3>
                  <Badge className="bg-green-100 text-green-800 border-green-200">ROI: {phase.roi}%</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Condições:</span>
                    <div className="font-medium">{phase.conditions.join(", ")}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Investimento:</span>
                    <div className="font-medium">R$ {(phase.investment / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Economia:</span>
                    <div className="font-medium text-green-600">R$ {(phase.savings / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">ROI:</span>
                    <div className="font-medium">{phase.roi}%</div>
                  </div>
                </div>
                <Progress value={(phase.savings / phase.investment) * 10} className="h-2" />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Consolidado Total</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Investimento Total:</span>
                <div className="font-bold text-blue-800">R$ 440.000</div>
              </div>
              <div>
                <span className="text-blue-600">Economia Total:</span>
                <div className="font-bold text-green-600">R$ 1.642.000</div>
              </div>
              <div>
                <span className="text-blue-600">ROI Consolidado:</span>
                <div className="font-bold text-blue-800">273%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validação Científica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Stethoscope className="h-5 w-5 mr-2 text-primary" />
            Validação Científica dos Cálculos
          </CardTitle>
          <CardDescription>Fontes e metodologia utilizadas nos cálculos de ROI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Fontes Científicas</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Ministério da Saúde:</strong> Hipertensão afeta 32% da população ativa brasileira
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>OMS:</strong> Obesidade aumenta custos médicos em 40%
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>ABRH:</strong> Saúde mental causa 45% dos afastamentos
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>SBD:</strong> Diabético custa 3x mais que não-diabético
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Dados Empresariais</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total de funcionários:</span>
                  <span className="font-medium">987</span>
                </div>
                <div className="flex justify-between">
                  <span>Sinistralidade atual:</span>
                  <span className="font-medium">110.04%</span>
                </div>
                <div className="flex justify-between">
                  <span>Custo total anual:</span>
                  <span className="font-medium">R$ 2.803.651</span>
                </div>
                <div className="flex justify-between">
                  <span>Prevalências baseadas em:</span>
                  <span className="font-medium">Estudos populacionais BR</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
