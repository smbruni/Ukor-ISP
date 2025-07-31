"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, Target, DollarSign, Zap } from "lucide-react"
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Area,
  AreaChart,
} from "recharts"

export function PredictiveAnalysis() {
  const [activeTab, setActiveTab] = useState("risk-prediction")

  const riskPredictionData = [
    { name: "João Silva", age: 45, riskScore: 85, predictedCost: 45000, currentCost: 12000 },
    { name: "Maria Santos", age: 52, riskScore: 78, predictedCost: 38000, currentCost: 8000 },
    { name: "Pedro Costa", age: 38, riskScore: 72, predictedCost: 32000, currentCost: 5000 },
    { name: "Ana Oliveira", age: 61, riskScore: 91, predictedCost: 67000, currentCost: 18000 },
    { name: "Carlos Lima", age: 49, riskScore: 68, predictedCost: 28000, currentCost: 7000 },
  ]

  const costProjection = [
    { month: "Jul", atual: 2800000, projetado: 2950000, otimizado: 2450000 },
    { month: "Ago", atual: 2800000, projetado: 3100000, otimizado: 2500000 },
    { month: "Set", atual: 2800000, projetado: 3250000, otimizado: 2550000 },
    { month: "Out", atual: 2800000, projetado: 3400000, otimizado: 2600000 },
    { month: "Nov", atual: 2800000, projetado: 3550000, otimizado: 2650000 },
    { month: "Dez", atual: 2800000, projetado: 3700000, otimizado: 2700000 },
  ]

  const interventionImpact = [
    { intervention: "Gestão de Crônicos", investment: 120000, savings: 420000, roi: 3.5 },
    { intervention: "Telemedicina", investment: 80000, savings: 280000, roi: 3.5 },
    { intervention: "Prevenção Oncológica", investment: 50000, savings: 750000, roi: 15.0 },
    { intervention: "Programa Diabetes", investment: 90000, savings: 315000, roi: 3.5 },
  ]

  const mlInsights = [
    {
      title: "Padrão de Internação",
      description: "Modelo identifica 89% de precisão para internações não programadas",
      impact: "Redução de 23% em internações evitáveis",
      confidence: 89,
    },
    {
      title: "Progressão de Crônicos",
      description: "Algoritmo prevê agravamento de condições crônicas com 6 meses de antecedência",
      impact: "Intervenção precoce em 67 casos identificados",
      confidence: 84,
    },
    {
      title: "Adesão Medicamentosa",
      description: "Predição de abandono de tratamento com 76% de acurácia",
      impact: "Programa de adesão para 134 pacientes de risco",
      confidence: 76,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análises Preditivas</h2>
          <p className="text-muted-foreground">Inteligência artificial aplicada à gestão de saúde</p>
        </div>
        <Button>
          <Brain className="mr-2 h-4 w-4" />
          Novo Modelo
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="risk-prediction">Predição de Risco</TabsTrigger>
          <TabsTrigger value="cost-projection">Projeção de Custos</TabsTrigger>
          <TabsTrigger value="interventions">Intervenções</TabsTrigger>
          <TabsTrigger value="ml-insights">Insights IA</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-prediction" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alto Risco</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">23</div>
                <p className="text-xs text-muted-foreground">pacientes identificados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custo Projetado</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 3.7M</div>
                <p className="text-xs text-red-600">+32% vs atual</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Precisão do Modelo</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">89%</div>
                <p className="text-xs text-muted-foreground">acurácia validada</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Economia Potencial</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 980K</div>
                <p className="text-xs text-muted-foreground">com intervenções</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pacientes de Alto Risco Identificados</CardTitle>
              <CardDescription>Modelo preditivo baseado em histórico clínico e padrões de utilização</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskPredictionData.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-red-600">{patient.riskScore}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{patient.name}</h4>
                        <p className="text-sm text-gray-500">{patient.age} anos</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Custo Atual</div>
                        <div className="font-medium">R$ {patient.currentCost.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Projeção 12m</div>
                        <div className="font-bold text-red-600">R$ {patient.predictedCost.toLocaleString()}</div>
                      </div>
                      <Button size="sm" variant="outline">
                        Intervir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análise de Risco por Idade e Custo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={riskPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" name="Idade" />
                  <YAxis dataKey="riskScore" name="Score de Risco" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "riskScore" ? `${value}%` : value,
                      name === "riskScore" ? "Score de Risco" : name,
                    ]}
                  />
                  <Scatter dataKey="riskScore" fill="#ef4444" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost-projection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projeção de Custos - Próximos 6 Meses</CardTitle>
              <CardDescription>Comparação entre cenário atual, projetado e otimizado</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={costProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${(Number(value) / 1000000).toFixed(2)}M`, "Custo"]} />
                  <Area
                    type="monotone"
                    dataKey="projetado"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="Projetado"
                  />
                  <Area
                    type="monotone"
                    dataKey="otimizado"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Otimizado"
                  />
                  <Line type="monotone" dataKey="atual" stroke="#3b82f6" strokeWidth={2} name="Atual" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-800">Cenário Sem Intervenção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">R$ 3.7M</div>
                <p className="text-sm text-red-700 mt-2">
                  Crescimento de 32% nos próximos 6 meses baseado na tendência atual
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-blue-800">Cenário Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">R$ 2.8M</div>
                <p className="text-sm text-blue-700 mt-2">Custo mensal atual mantido constante para comparação</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-800">Cenário Otimizado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 2.7M</div>
                <p className="text-sm text-green-700 mt-2">Com implementação de intervenções baseadas em IA</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intervenções Recomendadas por IA</CardTitle>
              <CardDescription>Análise de ROI para diferentes estratégias de intervenção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interventionImpact.map((intervention, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{intervention.intervention}</h4>
                        <p className="text-sm text-gray-500">
                          Investimento: R$ {(intervention.investment / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <Badge
                        variant={intervention.roi >= 10 ? "default" : intervention.roi >= 3 ? "secondary" : "outline"}
                      >
                        ROI: {intervention.roi}x
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Economia Anual</span>
                        <div className="font-bold text-green-600">R$ {(intervention.savings / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Payback</span>
                        <div className="font-medium">
                          {(intervention.investment / (intervention.savings / 12)).toFixed(1)} meses
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" variant={intervention.roi >= 10 ? "default" : "outline"}>
                          {intervention.roi >= 10 ? "Implementar" : "Avaliar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ROI das Intervenções</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={interventionImpact}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="intervention" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}x`, "ROI"]} />
                  <Bar dataKey="roi" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ml-insights" className="space-y-4">
          <div className="grid gap-4">
            {mlInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-600" />
                        {insight.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{insight.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{insight.confidence}% confiança</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-green-700">{insight.impact}</p>
                      <Progress value={insight.confidence} className="w-64 mt-2" />
                    </div>
                    <Button variant="outline">Ver Detalhes</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance dos Modelos de IA</CardTitle>
              <CardDescription>Métricas de acurácia e confiabilidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <p className="text-sm text-purple-700">Acurácia Média</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">94%</div>
                  <p className="text-sm text-blue-700">Precisão</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <p className="text-sm text-green-700">Recall</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
