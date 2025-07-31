"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Target, Award, AlertCircle, CheckCircle, Clock, BarChart3 } from "lucide-react"

export default function PerformanceEvaluation() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024")

  const performanceMetrics = [
    {
      category: "Gestão de Custos",
      score: 65,
      target: 85,
      status: "warning",
      metrics: [
        { name: "Sinistralidade", value: "110%", target: "95%", status: "critical" },
        { name: "Custo per capita", value: "R$ 2.837", target: "R$ 2.400", status: "warning" },
        { name: "Gestão de crônicos", value: "23%", target: "60%", status: "critical" },
        { name: "Prevenção quaternária", value: "12%", target: "25%", status: "warning" },
      ],
    },
    {
      category: "Qualidade Assistencial",
      score: 78,
      target: 90,
      status: "good",
      metrics: [
        { name: "Satisfação beneficiários", value: "8.2", target: "9.0", status: "good" },
        { name: "Tempo resposta", value: "2.1 dias", target: "1.5 dias", status: "warning" },
        { name: "Resolubilidade", value: "87%", target: "95%", status: "good" },
        { name: "Adesão tratamentos", value: "72%", target: "85%", status: "warning" },
      ],
    },
    {
      category: "Prevenção e Promoção",
      score: 45,
      target: 80,
      status: "critical",
      metrics: [
        { name: "Cobertura vacinal", value: "68%", target: "95%", status: "warning" },
        { name: "Rastreamento oncológico", value: "23%", target: "70%", status: "critical" },
        { name: "Check-ups preventivos", value: "34%", target: "60%", status: "warning" },
        { name: "Programas bem-estar", value: "15%", target: "50%", status: "critical" },
      ],
    },
    {
      category: "Eficiência Operacional",
      score: 72,
      target: 85,
      status: "good",
      metrics: [
        { name: "Utilização telemedicina", value: "28%", target: "45%", status: "warning" },
        { name: "Automação processos", value: "65%", target: "80%", status: "good" },
        { name: "Tempo aprovação", value: "1.8 dias", target: "1.0 dia", status: "warning" },
        { name: "Integração sistemas", value: "82%", target: "95%", status: "good" },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600 bg-red-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "good":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertCircle className="h-4 w-4" />
      case "warning":
        return <Clock className="h-4 w-4" />
      case "good":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  const overallScore = Math.round(
    performanceMetrics.reduce((acc, metric) => acc + metric.score, 0) / performanceMetrics.length,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Avaliação de Performance</h1>
          <p className="text-gray-600">Análise abrangente dos indicadores de desempenho em saúde corporativa</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant={overallScore >= 80 ? "default" : overallScore >= 60 ? "secondary" : "destructive"}
            className="text-lg px-4 py-2"
          >
            Score Geral: {overallScore}%
          </Badge>
        </div>
      </div>

      {/* Score Geral */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-blue-600" />
            Performance Geral - Unimed-BH Grupo Fedla
          </CardTitle>
          <CardDescription>Baseado em dados reais de 987 beneficiários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {performanceMetrics.map((category, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 ${getStatusColor(category.status)}`}
                >
                  <span className="text-2xl font-bold">{category.score}%</span>
                </div>
                <h3 className="font-semibold mb-1">{category.category}</h3>
                <p className="text-sm text-gray-500">Meta: {category.target}%</p>
                <Progress value={category.score} className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detalhamento por Categoria */}
      <Tabs defaultValue="custos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="custos">Gestão de Custos</TabsTrigger>
          <TabsTrigger value="qualidade">Qualidade</TabsTrigger>
          <TabsTrigger value="prevencao">Prevenção</TabsTrigger>
          <TabsTrigger value="eficiencia">Eficiência</TabsTrigger>
        </TabsList>

        {performanceMetrics.map((category, categoryIndex) => (
          <TabsContent
            key={categoryIndex}
            value={
              categoryIndex === 0
                ? "custos"
                : categoryIndex === 1
                  ? "qualidade"
                  : categoryIndex === 2
                    ? "prevencao"
                    : "eficiencia"
            }
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {category.category}
                  <Badge
                    variant={
                      category.status === "critical"
                        ? "destructive"
                        : category.status === "warning"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {category.score}% de {category.target}%
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Análise detalhada dos indicadores de {category.category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className={`p-4 rounded-lg border ${getStatusColor(metric.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{metric.name}</h4>
                        {getStatusIcon(metric.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{metric.value}</span>
                        <span className="text-sm">Meta: {metric.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Plano de Ação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Plano de Ação Prioritário
          </CardTitle>
          <CardDescription>Ações recomendadas para melhoria da performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-l-red-500">
              <div>
                <h4 className="font-semibold text-red-800">CRÍTICO: Gestão de Crônicos</h4>
                <p className="text-sm text-red-600">
                  Implementar case management para os 10 maiores usuários (R$ 1.18M/ano)
                </p>
                <p className="text-xs text-red-500 mt-1">Impacto: Redução de 35% nos custos destes usuários</p>
              </div>
              <Button variant="destructive">Ação Imediata</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
              <div>
                <h4 className="font-semibold text-orange-800">URGENTE: Rastreamento Oncológico</h4>
                <p className="text-sm text-orange-600">Cobertura de sangue oculto em 6.86% (Meta: 50%)</p>
                <p className="text-xs text-orange-500 mt-1">
                  Impacto: Cada câncer detectado precocemente economiza R$ 150K
                </p>
              </div>
              <Button variant="outline">Planejar Campanha</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-500">
              <div>
                <h4 className="font-semibold text-yellow-800">IMPORTANTE: Telemedicina</h4>
                <p className="text-sm text-yellow-600">Aumentar utilização de 28% para 45%</p>
                <p className="text-xs text-yellow-500 mt-1">Impacto: Redução de 40% nas internações evitáveis</p>
              </div>
              <Button variant="outline">Expandir Programa</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
              <div>
                <h4 className="font-semibold text-blue-800">MÉDIO PRAZO: Programas de Bem-estar</h4>
                <p className="text-sm text-blue-600">Implementar programas estruturados (atual: 15%)</p>
                <p className="text-xs text-blue-500 mt-1">Impacto: ROI de 3:1 em redução de custos</p>
              </div>
              <Button variant="outline">Desenvolver Estratégia</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparativo Temporal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Performance</CardTitle>
          <CardDescription>Comparativo dos últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">-12%</div>
              <p className="text-sm text-gray-600">Gestão de Custos</p>
              <TrendingDown className="h-5 w-5 text-red-500 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">+8%</div>
              <p className="text-sm text-gray-600">Qualidade Assistencial</p>
              <TrendingUp className="h-5 w-5 text-green-500 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">-3%</div>
              <p className="text-sm text-gray-600">Prevenção</p>
              <TrendingDown className="h-5 w-5 text-yellow-500 mx-auto mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
