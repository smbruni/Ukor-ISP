"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DetailedROIAnalysis } from "./detailed-roi-analysis"
import { Brain, TrendingUp, Target, AlertTriangle, ArrowDown, DollarSign } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export function PredictiveAnalysis() {
  const [selectedModel, setSelectedModel] = useState("sinistralidade")
  const [timeframe, setTimeframe] = useState("12months")

  // Dados de projeção de sinistralidade
  const sinistralidadeProjection = [
    { month: "Jun/25", baseline: 110.04, withIntervention: 110.04, target: 75 },
    { month: "Jul/25", baseline: 112.5, withIntervention: 105.8, target: 75 },
    { month: "Ago/25", baseline: 115.2, withIntervention: 98.4, target: 75 },
    { month: "Set/25", baseline: 118.1, withIntervention: 92.7, target: 75 },
    { month: "Out/25", baseline: 120.5, withIntervention: 88.3, target: 75 },
    { month: "Nov/25", baseline: 123.2, withIntervention: 84.5, target: 75 },
    { month: "Dez/25", baseline: 125.8, withIntervention: 81.2, target: 75 },
    { month: "Jan/26", baseline: 128.4, withIntervention: 78.6, target: 75 },
    { month: "Fev/26", baseline: 131.2, withIntervention: 76.4, target: 75 },
    { month: "Mar/26", baseline: 134.1, withIntervention: 75.0, target: 75 },
    { month: "Abr/26", baseline: 137.2, withIntervention: 74.2, target: 75 },
    { month: "Mai/26", baseline: 140.5, withIntervention: 73.8, target: 75 },
  ]

  // Dados de projeção de custos
  const costProjection = [
    { month: "Jun/25", baseline: 2803651, withIntervention: 2803651 },
    { month: "Jul/25", baseline: 2950000, withIntervention: 2750000 },
    { month: "Ago/25", baseline: 3100000, withIntervention: 2650000 },
    { month: "Set/25", baseline: 3250000, withIntervention: 2580000 },
    { month: "Out/25", baseline: 3400000, withIntervention: 2520000 },
    { month: "Nov/25", baseline: 3550000, withIntervention: 2470000 },
    { month: "Dez/25", baseline: 3700000, withIntervention: 2430000 },
    { month: "Jan/26", baseline: 3850000, withIntervention: 2400000 },
    { month: "Fev/26", baseline: 4000000, withIntervention: 2380000 },
    { month: "Mar/26", baseline: 4150000, withIntervention: 2365000 },
    { month: "Abr/26", baseline: 4300000, withIntervention: 2355000 },
    { month: "Mai/26", baseline: 4450000, withIntervention: 2350000 },
  ]

  // Cenários de intervenção
  const interventionScenarios = [
    {
      name: "Cenário Conservador",
      description: "Implementação gradual com foco em casos críticos",
      investment: 250000,
      savings: 850000,
      roi: 240,
      probability: 85,
      timeframe: "12 meses",
    },
    {
      name: "Cenário Otimista",
      description: "Implementação completa de todas as intervenções",
      investment: 440000,
      savings: 1642000,
      roi: 273,
      probability: 65,
      timeframe: "12 meses",
    },
    {
      name: "Cenário Agressivo",
      description: "Implementação acelerada com recursos adicionais",
      investment: 650000,
      savings: 2100000,
      roi: 223,
      probability: 45,
      timeframe: "8 meses",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Análises Preditivas</h2>
        <p className="text-muted-foreground">
          Modelos de IA para previsão de sinistralidade e otimização de investimentos em saúde
        </p>
      </div>

      <Tabs defaultValue="projections" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projections">Projeções</TabsTrigger>
          <TabsTrigger value="scenarios">Cenários</TabsTrigger>
          <TabsTrigger value="roi-analysis">Análise ROI</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="projections" className="space-y-6">
          {/* Alerta de Tendência */}
          <Card className="border-l-4 border-l-red-500 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Alerta: Tendência Crítica Identificada
              </CardTitle>
              <CardDescription className="text-red-700">
                Sem intervenção, a sinistralidade pode atingir 140.5% em 12 meses, resultando em custos de R$ 4.45M
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Projeção de Sinistralidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Projeção de Sinistralidade - Próximos 12 Meses
              </CardTitle>
              <CardDescription>
                Comparação entre cenário sem intervenção vs com programa de gestão de saúde
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sinistralidadeProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 150]} />
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Sem Intervenção"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="withIntervention"
                    stroke="#22c55e"
                    strokeWidth={3}
                    name="Com Programa de Gestão"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    name="Meta (75%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Projeção de Custos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                Projeção de Custos Anuais
              </CardTitle>
              <CardDescription>Impacto financeiro das intervenções propostas</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => [`R$ ${(value / 1000000).toFixed(2)}M`, ""]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Sem Intervenção"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="withIntervention"
                    stroke="#22c55e"
                    strokeWidth={3}
                    name="Com Intervenções"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* KPIs de Projeção */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Economia Projetada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 2.1M</div>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>47% redução de custos</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Redução Sinistralidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">-36.2%</div>
                <div className="flex items-center text-xs text-blue-500 mt-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>De 110% para 73.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Tempo para Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9 meses</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  <span>Para atingir 75%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Confiabilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Brain className="h-3 w-3 mr-1" />
                  <span>Modelo IA validado</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Cenários de Implementação</h3>
            <div className="space-y-4">
              {interventionScenarios.map((scenario, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{scenario.name}</CardTitle>
                      <Badge
                        variant={
                          scenario.probability >= 80 ? "default" : scenario.probability >= 60 ? "secondary" : "outline"
                        }
                      >
                        {scenario.probability}% probabilidade
                      </Badge>
                    </div>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Investimento</span>
                        <div className="font-bold">R$ {(scenario.investment / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Economia</span>
                        <div className="font-bold text-green-600">R$ {(scenario.savings / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">ROI</span>
                        <div className="font-bold">{scenario.roi}%</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Prazo</span>
                        <div className="font-bold">{scenario.timeframe}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roi-analysis" className="space-y-6">
          <DetailedROIAnalysis />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Recomendações Estratégicas
              </CardTitle>
              <CardDescription>Baseadas em análise preditiva e benchmarking de mercado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">🚨 Ação Imediata (0-30 dias)</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Implementar gestão de casos para os 10 principais utilizadores</li>
                    <li>• Iniciar programa de controle de hipertensão (345 funcionários)</li>
                    <li>• Setup de telemedicina para reduzir internações</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">⚡ Curto Prazo (1-3 meses)</h4>
                  <ul className="space-y-2 text-sm text-amber-700">
                    <li>• Programa de obesidade (276 funcionários afetados)</li>
                    <li>• Fisioterapia corporativa para casos osteomusculares</li>
                    <li>• Rastreamento diabetes (84 funcionários)</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">🎯 Médio Prazo (3-6 meses)</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Programa completo de saúde mental (415 funcionários)</li>
                    <li>• Academia corporativa e reeducação alimentar</li>
                    <li>• Protocolos clínicos para todas as condições crônicas</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">📊 Resultados Esperados em 12 meses</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600">Sinistralidade:</span>
                      <div className="font-bold">110% → 74%</div>
                    </div>
                    <div>
                      <span className="text-blue-600">Economia:</span>
                      <div className="font-bold text-green-600">R$ 1.64M</div>
                    </div>
                    <div>
                      <span className="text-blue-600">ROI:</span>
                      <div className="font-bold">273%</div>
                    </div>
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
