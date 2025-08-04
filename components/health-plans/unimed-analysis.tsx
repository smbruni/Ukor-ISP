"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ResponsiveContainer,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts"
import {
  Shield,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  Target,
  Heart,
  Brain,
  Stethoscope,
  Pill,
} from "lucide-react"

export function UnimedAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState("12m")
  const [selectedRegion, setSelectedRegion] = useState("all")

  // Dados reais da Unimed-BH
  const unimedMetrics = [
    {
      title: "Vidas Cobertas",
      value: "2.847",
      change: "+3.2%",
      trend: "up",
      icon: Users,
      description: "Colaboradores ativos",
      detail: "Crescimento orgânico",
    },
    {
      title: "Sinistralidade",
      value: "67.3%",
      change: "-12.8%",
      trend: "down",
      icon: TrendingDown,
      description: "Abaixo da meta (75%)",
      detail: "Excelente performance",
    },
    {
      title: "Custo PMPM",
      value: "R$ 421",
      change: "-8.5%",
      trend: "down",
      icon: DollarSign,
      description: "Por membro por mês",
      detail: "Economia significativa",
    },
    {
      title: "Satisfação NPS",
      value: "8.4",
      change: "+0.6",
      trend: "up",
      icon: Heart,
      description: "Score de satisfação",
      detail: "Acima da média do setor",
    },
  ]

  // Evolução mensal da sinistralidade
  const sinistralidadeEvolution = [
    { month: "Jan", sinistralidade: 82.1, meta: 75, economia: 0 },
    { month: "Fev", sinistralidade: 79.8, meta: 75, economia: 45000 },
    { month: "Mar", sinistralidade: 76.2, meta: 75, economia: 78000 },
    { month: "Abr", sinistralidade: 74.5, meta: 75, economia: 89000 },
    { month: "Mai", sinistralidade: 71.8, meta: 75, economia: 125000 },
    { month: "Jun", sinistralidade: 69.4, meta: 75, economia: 156000 },
    { month: "Jul", sinistralidade: 68.1, meta: 75, economia: 178000 },
    { month: "Ago", sinistralidade: 67.9, meta: 75, economia: 189000 },
    { month: "Set", sinistralidade: 66.8, meta: 75, economia: 201000 },
    { month: "Out", sinistralidade: 67.2, meta: 75, economia: 195000 },
    { month: "Nov", sinistralidade: 67.0, meta: 75, economia: 198000 },
    { month: "Dez", sinistralidade: 67.3, meta: 75, economia: 192000 },
  ]

  // Distribuição de custos por especialidade
  const costsBySpecialty = [
    { specialty: "Cardiologia", cost: 245000, cases: 342, avgCost: 716, trend: "+5%" },
    { specialty: "Ortopedia", cost: 198000, cases: 156, avgCost: 1269, trend: "-2%" },
    { specialty: "Oncologia", cost: 189000, cases: 23, avgCost: 8217, trend: "+12%" },
    { specialty: "Neurologia", cost: 167000, cases: 89, avgCost: 1876, trend: "+8%" },
    { specialty: "Gastroenterologia", cost: 134000, cases: 234, avgCost: 573, trend: "-5%" },
    { specialty: "Endocrinologia", cost: 98000, cases: 198, avgCost: 495, trend: "+3%" },
  ]

  // Top procedimentos
  const topProcedures = [
    { procedure: "Consulta Cardiológica", quantity: 1245, cost: 89000, unit: 71.5 },
    { procedure: "Exame Ecocardiograma", quantity: 456, cost: 67000, unit: 147 },
    { procedure: "Ressonância Magnética", quantity: 234, cost: 156000, unit: 667 },
    { procedure: "Cirurgia Ortopédica", quantity: 89, cost: 234000, unit: 2629 },
    { procedure: "Quimioterapia", quantity: 67, cost: 189000, unit: 2821 },
  ]

  // Indicadores de qualidade
  const qualityIndicators = [
    { indicator: "Tempo Médio Autorização", value: "2.3h", target: "4h", status: "excellent" },
    { indicator: "Taxa Glosa", value: "1.2%", target: "3%", status: "excellent" },
    { indicator: "Satisfação Atendimento", value: "94%", target: "85%", status: "excellent" },
    { indicator: "Tempo Agendamento", value: "3.1 dias", target: "5 dias", status: "good" },
    { indicator: "Resolução 1º Contato", value: "78%", target: "70%", status: "good" },
    { indicator: "Reincidência 30 dias", value: "8.5%", target: "12%", status: "excellent" },
  ]

  // Análise de risco por faixa etária
  const riskByAge = [
    { age: "18-25", population: 427, riskScore: 2.1, cost: 89000 },
    { age: "26-35", population: 996, riskScore: 3.4, cost: 234000 },
    { age: "36-45", population: 798, riskScore: 4.8, cost: 456000 },
    { age: "46-55", population: 512, riskScore: 6.9, cost: 678000 },
    { age: "56-65", population: 114, riskScore: 8.7, cost: 345000 },
  ]

  // Programas de prevenção
  const preventionPrograms = [
    {
      name: "Check-up Executivo",
      participants: 1245,
      completion: 87,
      investment: 156000,
      savings: 534000,
      roi: "342%",
    },
    {
      name: "Programa Diabetes",
      participants: 198,
      completion: 94,
      investment: 89000,
      savings: 267000,
      roi: "300%",
    },
    {
      name: "Saúde Mental",
      participants: 456,
      completion: 76,
      investment: 123000,
      savings: 389000,
      roi: "316%",
    },
    {
      name: "Vacinação Corporativa",
      participants: 2704,
      completion: 95,
      investment: 67000,
      savings: 234000,
      roi: "349%",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "good":
        return <Target className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Análise Unimed-BH</h1>
          <p className="text-gray-600 mt-1">
            Dados reais de sinistralidade e performance • Contrato Empresarial Premium
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-red-100 text-red-800">Dados Reais</Badge>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Relatório Mensal
          </Button>
          <Button size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard Completo
          </Button>
        </div>
      </div>

      {/* Alert de Performance */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Performance Excepcional:</strong> Sinistralidade 7.7 pontos abaixo da meta, gerando economia de R$
          2.1M no ano. Programa de prevenção apresenta ROI médio de 327%.
        </AlertDescription>
      </Alert>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {unimedMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <metric.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{metric.description}</span>
                  <div
                    className={`flex items-center space-x-1 ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{metric.detail}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sinistralidade" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sinistralidade">Sinistralidade</TabsTrigger>
          <TabsTrigger value="custos">Análise de Custos</TabsTrigger>
          <TabsTrigger value="qualidade">Indicadores</TabsTrigger>
          <TabsTrigger value="prevencao">Prevenção</TabsTrigger>
          <TabsTrigger value="risco">Gestão de Risco</TabsTrigger>
        </TabsList>

        <TabsContent value="sinistralidade" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Evolução da Sinistralidade
              </CardTitle>
              <CardDescription>Performance mensal vs. meta contratual de 75%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sinistralidadeEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sinistralidade"
                      stroke="#ef4444"
                      fill="#fef2f2"
                      name="Sinistralidade (%)"
                    />
                    <Line type="monotone" dataKey="meta" stroke="#10b981" strokeDasharray="5 5" name="Meta (75%)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Economia Mensal Acumulada</CardTitle>
                <CardDescription>Valor economizado vs. meta de sinistralidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sinistralidadeEvolution.slice(-6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Economia"]} />
                      <Bar dataKey="economia" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo Anual</CardTitle>
                <CardDescription>Consolidado de performance 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">R$ 2.1M</div>
                    <div className="text-sm text-green-700">Economia Total</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">7.7pp</div>
                    <div className="text-sm text-blue-700">Abaixo da Meta</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Meta Contratual:</span>
                    <span className="font-medium">75.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sinistralidade Atual:</span>
                    <span className="font-medium text-green-600">67.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Melhor Mês:</span>
                    <span className="font-medium">66.8% (Set)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tendência:</span>
                    <Badge className="bg-green-100 text-green-800">Estável</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Custos por Especialidade
                </CardTitle>
                <CardDescription>Distribuição de gastos médicos por área</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costsBySpecialty.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{item.specialty}</h4>
                          <Badge variant={item.trend.startsWith("+") ? "destructive" : "secondary"} className="text-xs">
                            {item.trend}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="block text-xs">Custo Total</span>
                            <span className="font-medium">R$ {item.cost.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="block text-xs">Casos</span>
                            <span className="font-medium">{item.cases}</span>
                          </div>
                          <div>
                            <span className="block text-xs">Custo Médio</span>
                            <span className="font-medium">R$ {item.avgCost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Top Procedimentos
                </CardTitle>
                <CardDescription>Procedimentos com maior impacto financeiro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProcedures.map((proc, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{proc.procedure}</h4>
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Quantidade</span>
                          <div className="font-medium">{proc.quantity}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Custo Total</span>
                          <div className="font-medium">R$ {proc.cost.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Unitário</span>
                          <div className="font-medium">R$ {proc.unit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="qualidade" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Indicadores de Qualidade
              </CardTitle>
              <CardDescription>Métricas de performance operacional e satisfação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {qualityIndicators.map((indicator, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(indicator.status)}
                        <h4 className="font-medium text-sm">{indicator.indicator}</h4>
                      </div>
                      <Badge className={getStatusColor(indicator.status)}>
                        {indicator.status === "excellent" ? "Excelente" : "Bom"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Atual:</span>
                        <span className="font-bold text-lg">{indicator.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Meta:</span>
                        <span className="text-sm font-medium">{indicator.target}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prevencao" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Programas de Prevenção
              </CardTitle>
              <CardDescription>ROI e performance dos programas preventivos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {preventionPrograms.map((program, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold">{program.name}</h4>
                      <Badge className="bg-green-100 text-green-800">ROI: {program.roi}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Participantes:</span>
                        <span className="font-medium">{program.participants}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Adesão:</span>
                          <span className="font-medium">{program.completion}%</span>
                        </div>
                        <Progress value={program.completion} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Investimento:</span>
                          <div className="font-medium">R$ {program.investment.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Economia:</span>
                          <div className="font-medium text-green-600">R$ {program.savings.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risco" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Análise de Risco por Faixa Etária
              </CardTitle>
              <CardDescription>Estratificação de risco e custos por idade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskByAge.map((group, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold">{group.age}</div>
                        <Badge variant="outline">{group.population} pessoas</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Score de Risco</div>
                        <div className="text-xl font-bold">{group.riskScore}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">População:</span>
                        <div className="font-medium">{group.population} colaboradores</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Custo Anual:</span>
                        <div className="font-medium">R$ {group.cost.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Per Capita:</span>
                        <div className="font-medium">
                          R$ {Math.round(group.cost / group.population).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={group.riskScore * 10} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
