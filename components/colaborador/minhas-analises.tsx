"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Heart,
  Activity,
  Zap,
  Shield,
  Calendar,
  Eye,
  Download,
  Award,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export function MinhasAnalises({ colaborador }) {
  const [activeTab, setActiveTab] = useState("predictions")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")

  // Análises preditivas pessoais
  const healthPredictions = [
    {
      id: "cardiovascular",
      category: "Cardiovascular",
      currentRisk: 15,
      projectedRisk: 12,
      timeframe: "6 meses",
      confidence: 87,
      factors: ["Pressão arterial controlada", "Exercícios regulares", "Peso ideal"],
      recommendations: ["Manter atividade física regular", "Continuar dieta balanceada", "Monitorar pressão arterial"],
      icon: Heart,
      color: "text-red-600",
      trend: "improving",
    },
    {
      id: "diabetes",
      category: "Diabetes Tipo 2",
      currentRisk: 8,
      projectedRisk: 6,
      timeframe: "12 meses",
      confidence: 92,
      factors: ["Glicemia normal", "IMC adequado", "Histórico familiar baixo"],
      recommendations: ["Manter peso atual", "Evitar açúcares refinados", "Exames regulares de glicemia"],
      icon: Activity,
      color: "text-blue-600",
      trend: "improving",
    },
    {
      id: "mental-health",
      category: "Saúde Mental",
      currentRisk: 25,
      projectedRisk: 30,
      timeframe: "3 meses",
      confidence: 78,
      factors: ["Estresse moderado", "Carga de trabalho alta", "Sono adequado"],
      recommendations: ["Técnicas de relaxamento", "Terapia preventiva", "Melhor gestão do tempo"],
      icon: Brain,
      color: "text-purple-600",
      trend: "attention",
    },
    {
      id: "musculoskeletal",
      category: "Problemas Osteomusculares",
      currentRisk: 20,
      projectedRisk: 15,
      timeframe: "6 meses",
      confidence: 85,
      factors: ["Ginástica laboral", "Ergonomia adequada", "Exercícios regulares"],
      recommendations: ["Continuar ginástica laboral", "Fortalecer core", "Pausas regulares no trabalho"],
      icon: Zap,
      color: "text-orange-600",
      trend: "improving",
    },
  ]

  // Evolução do Health Score com projeção
  const healthScoreEvolution = [
    { month: "Out", actual: 6.8, projected: null },
    { month: "Nov", actual: 7.1, projected: null },
    { month: "Dez", actual: 7.3, projected: null },
    { month: "Jan", actual: 7.5, projected: null },
    { month: "Fev", actual: 7.6, projected: null },
    { month: "Mar", actual: 7.8, projected: null },
    { month: "Abr", actual: null, projected: 8.0 },
    { month: "Mai", actual: null, projected: 8.1 },
    { month: "Jun", actual: null, projected: 8.3 },
    { month: "Jul", actual: null, projected: 8.4 },
    { month: "Ago", actual: null, projected: 8.5 },
    { month: "Set", actual: null, projected: 8.6 },
  ]

  // Análise de padrões comportamentais
  const behaviorPatterns = [
    {
      pattern: "Atividade Física",
      current: 85,
      optimal: 90,
      trend: "stable",
      insight: "Consistente nos exercícios, mas pode aumentar intensidade",
    },
    {
      pattern: "Qualidade do Sono",
      current: 88,
      optimal: 90,
      trend: "improving",
      insight: "Excelente qualidade, mantendo horários regulares",
    },
    {
      pattern: "Alimentação",
      current: 82,
      optimal: 85,
      trend: "improving",
      insight: "Boa aderência à dieta, pode reduzir açúcar",
    },
    {
      pattern: "Gestão do Estresse",
      current: 65,
      optimal: 80,
      trend: "attention",
      insight: "Precisa de técnicas de relaxamento mais eficazes",
    },
    {
      pattern: "Hidratação",
      current: 78,
      optimal: 85,
      trend: "improving",
      insight: "Melhorando, mas ainda abaixo da meta diária",
    },
    {
      pattern: "Postura Corporal",
      current: 75,
      optimal: 85,
      trend: "stable",
      insight: "Ginástica laboral ajudando, manter regularidade",
    },
  ]

  // Dados para radar chart
  const radarData = [
    {
      subject: "Cardiovascular",
      current: 85,
      optimal: 90,
    },
    {
      subject: "Metabólico",
      current: 92,
      optimal: 90,
    },
    {
      subject: "Mental",
      current: 75,
      optimal: 85,
    },
    {
      subject: "Muscular",
      current: 80,
      optimal: 85,
    },
    {
      subject: "Imunológico",
      current: 88,
      optimal: 90,
    },
    {
      subject: "Nutricional",
      current: 82,
      optimal: 85,
    },
  ]

  // Recomendações personalizadas baseadas em IA
  const aiRecommendations = [
    {
      id: 1,
      category: "Urgente",
      title: "Gestão do Estresse",
      description: "Seu nível de estresse aumentou 15% nas últimas 2 semanas",
      action: "Agendar sessão com psicólogo corporativo",
      impact: "Alto",
      timeframe: "Esta semana",
      confidence: 89,
    },
    {
      id: 2,
      category: "Preventivo",
      title: "Fortalecimento Muscular",
      description: "Padrão de postura indica risco de dor lombar",
      action: "Incluir exercícios de core na rotina",
      impact: "Médio",
      timeframe: "Próximas 2 semanas",
      confidence: 76,
    },
    {
      id: 3,
      category: "Otimização",
      title: "Hidratação",
      description: "Aumentar ingestão de água pode melhorar energia",
      action: "Meta de 2.5L diários com lembretes",
      impact: "Baixo",
      timeframe: "Imediato",
      confidence: 82,
    },
  ]

  const getTrendColor = (trend) => {
    switch (trend) {
      case "improving":
        return "text-green-600"
      case "stable":
        return "text-blue-600"
      case "attention":
        return "text-amber-600"
      case "declining":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "attention":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-blue-500" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Urgente":
        return "bg-red-100 text-red-800 border-red-200"
      case "Preventivo":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Otimização":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Minhas Análises Preditivas</h2>
        <p className="text-gray-600 mt-1">Insights personalizados baseados em IA sobre sua saúde</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Predições</TabsTrigger>
          <TabsTrigger value="patterns">Padrões</TabsTrigger>
          <TabsTrigger value="recommendations">IA Insights</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          {/* Resumo de Riscos */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Risco Geral de Saúde</h3>
                  <p className="text-gray-600 text-sm">Baseado em análise preditiva de IA</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-600">Baixo</div>
                  <div className="text-sm text-gray-500">Confiança: 87%</div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">Tendência Positiva</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Predições por Categoria */}
          <div className="space-y-4">
            {healthPredictions.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-50`}>
                        <prediction.icon className={`h-6 w-6 ${prediction.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{prediction.category}</h3>
                        <p className="text-sm text-gray-600">Análise para {prediction.timeframe}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getTrendIcon(prediction.trend)}
                      <div className="text-xs text-gray-500 mt-1">Confiança: {prediction.confidence}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Risco Atual</div>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold">{prediction.currentRisk}%</div>
                        <Progress value={prediction.currentRisk} className="flex-1 h-2" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Risco Projetado</div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`text-2xl font-bold ${
                            prediction.projectedRisk < prediction.currentRisk
                              ? "text-green-600"
                              : prediction.projectedRisk > prediction.currentRisk
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        >
                          {prediction.projectedRisk}%
                        </div>
                        <Progress value={prediction.projectedRisk} className="flex-1 h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Fatores Protetivos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {prediction.factors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Recomendações:</h4>
                      <ul className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          {/* Radar Chart - Perfil de Saúde */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Perfil de Saúde Atual vs Ideal
              </CardTitle>
              <CardDescription>Comparação entre seu estado atual e o ideal</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Atual"
                    dataKey="current"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Ideal"
                    dataKey="optimal"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Padrões Comportamentais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Análise de Padrões Comportamentais
              </CardTitle>
              <CardDescription>Como seus hábitos impactam sua saúde</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {behaviorPatterns.map((pattern, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{pattern.pattern}</h4>
                      {getTrendIcon(pattern.trend)}
                    </div>

                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Atual: {pattern.current}%</span>
                          <span>Meta: {pattern.optimal}%</span>
                        </div>
                        <Progress value={pattern.current} className="h-2" />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">{pattern.insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* Recomendações da IA */}
          <div className="space-y-4">
            {aiRecommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge className={getCategoryColor(rec.category)}>{rec.category}</Badge>
                      <h3 className="font-semibold text-lg">{rec.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Impacto: {rec.impact}</div>
                      <div className="text-xs text-gray-500">IA: {rec.confidence}%</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{rec.description}</p>

                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-800 mb-2">Ação Recomendada:</h4>
                    <p className="text-blue-700">{rec.action}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Prazo: {rec.timeframe}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                      <Button size="sm">Aplicar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Insights Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Insights Gerais da IA
              </CardTitle>
              <CardDescription>Análises baseadas em seus dados históricos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Pontos Fortes</h4>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Excelente consistência nos exercícios físicos</li>
                    <li>• Qualidade do sono acima da média</li>
                    <li>• Controle eficaz do peso corporal</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <h4 className="font-semibold text-amber-800">Áreas de Atenção</h4>
                  </div>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Gestão do estresse precisa de melhoria</li>
                    <li>• Hidratação abaixo da meta ideal</li>
                    <li>• Postura corporal durante trabalho</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Oportunidades</h4>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Potencial para melhorar Health Score para 8.5+</li>
                    <li>• Redução significativa do risco cardiovascular</li>
                    <li>• Otimização da performance no trabalho</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Evolução e Projeção do Health Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Evolução e Projeção do Health Score
              </CardTitle>
              <CardDescription>Histórico e previsão baseada em IA</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={healthScoreEvolution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[6, 9]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#22c55e"
                    strokeWidth={3}
                    name="Histórico"
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Projeção IA"
                    connectNulls={false}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Métricas de Tendência */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Tendência Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">+12%</div>
                    <div className="text-xs text-gray-500">Últimos 6 meses</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Projeção 6 meses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">8.6</div>
                    <div className="text-xs text-gray-500">Health Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Confiabilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-purple-600">89%</div>
                    <div className="text-xs text-gray-500">Modelo IA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">Top 15%</div>
                    <div className="text-xs text-gray-500">Na empresa</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Relatório de Tendências */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                  Relatório de Tendências
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
              </CardTitle>
              <CardDescription>Análise detalhada das suas tendências de saúde</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Resumo Executivo</h4>
                  <p className="text-sm text-gray-700">
                    Nos últimos 6 meses, você demonstrou uma melhoria consistente em seus indicadores de saúde, com
                    destaque para o controle de peso e qualidade do sono. A IA projeta uma continuidade dessa tendência
                    positiva, com potencial para atingir um Health Score de 8.6 nos próximos 6 meses.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Principais Conquistas</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Redução de 2.3kg no peso corporal</li>
                    <li>• Melhoria de 15% na qualidade do sono</li>
                    <li>• Aumento de 25% na atividade física regular</li>
                    <li>• Controle eficaz da pressão arterial</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Próximos Passos</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Focar na gestão do estresse (prioridade alta)</li>
                    <li>• Aumentar hidratação diária para 2.5L</li>
                    <li>• Manter consistência nos exercícios</li>
                    <li>• Agendar check-up preventivo trimestral</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
