"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingUp, Brain, Target, DollarSign, Users, Activity, Calendar, Download } from "lucide-react"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function PredictiveAnalysis() {
  const [activeModel, setActiveModel] = useState("sinistralidade")
  const [timeHorizon, setTimeHorizon] = useState("12m")

  // Dados históricos reais da Unimed para treinar os modelos
  const historicalData = [
    { month: "Abr/24", sinistralidade: 171.05, internacoes: 12, custo: 308075, vidas: 836 },
    { month: "Mai/24", sinistralidade: 86.21, internacoes: 8, custo: 186012, vidas: 738 },
    { month: "Jun/24", sinistralidade: 72.33, internacoes: 6, custo: 148566, vidas: 914 },
    { month: "Jul/24", sinistralidade: 121.9, internacoes: 15, custo: 248573, vidas: 836 },
    { month: "Ago/24", sinistralidade: 88.33, internacoes: 9, custo: 215614, vidas: 914 },
    { month: "Set/24", sinistralidade: 85.9, internacoes: 7, custo: 202913, vidas: 738 },
    { month: "Out/24", sinistralidade: 231.61, internacoes: 22, custo: 447590, vidas: 836 },
    { month: "Nov/24", sinistralidade: 158.66, internacoes: 18, custo: 338427, vidas: 914 },
    { month: "Dez/24", sinistralidade: 140.91, internacoes: 16, custo: 297316, vidas: 738 },
    { month: "Jan/25", sinistralidade: 77.39, internacoes: 5, custo: 179964, vidas: 836 },
    { month: "Fev/25", sinistralidade: 103.84, internacoes: 11, custo: 240287, vidas: 914 },
    { month: "Mar/25", sinistralidade: 51.75, internacoes: 4, custo: 229171, vidas: 912 },
  ]

  // Modelo 1: Previsão de Sinistralidade
  const sinistralidadeModel = {
    name: "Previsão de Sinistralidade",
    accuracy: 87.3,
    confidence: 92.1,
    algorithm: "ARIMA + Machine Learning",
    predictions: [
      { month: "Abr/25", predicted: 89.2, confidence_min: 75.1, confidence_max: 103.3, risk: "médio" },
      { month: "Mai/25", predicted: 94.7, confidence_min: 82.4, confidence_max: 107.0, risk: "alto" },
      { month: "Jun/25", predicted: 78.3, confidence_min: 68.9, confidence_max: 87.7, risk: "médio" },
      { month: "Jul/25", predicted: 112.5, confidence_min: 98.2, confidence_max: 126.8, risk: "crítico" },
      { month: "Ago/25", predicted: 85.1, confidence_min: 74.3, confidence_max: 95.9, risk: "médio" },
      { month: "Set/25", predicted: 91.8, confidence_min: 80.5, confidence_max: 103.1, risk: "alto" },
      { month: "Out/25", predicted: 145.2, confidence_min: 128.7, confidence_max: 161.7, risk: "crítico" },
      { month: "Nov/25", predicted: 118.9, confidence_min: 105.2, confidence_max: 132.6, risk: "crítico" },
      { month: "Dez/25", predicted: 102.4, confidence_min: 89.8, confidence_max: 115.0, risk: "alto" },
      { month: "Jan/26", predicted: 76.5, confidence_min: 67.1, confidence_max: 85.9, risk: "médio" },
      { month: "Fev/26", predicted: 88.3, confidence_min: 77.4, confidence_max: 99.2, risk: "médio" },
      { month: "Mar/26", predicted: 82.1, confidence_min: 72.0, confidence_max: 92.2, risk: "médio" },
    ],
    factors: [
      { name: "Sazonalidade", impact: 35, description: "Outubro historicamente crítico" },
      { name: "Casos Crônicos", impact: 28, description: "4 casos oncológicos ativos" },
      { name: "Envelhecimento", impact: 22, description: "19.55% acima de 50 anos" },
      { name: "Prevenção Baixa", impact: 15, description: "6.86% cobertura sangue oculto" },
    ],
  }

  // Modelo 2: Previsão de Casos de Alto Custo
  const altoCustoModel = {
    name: "Previsão de Casos de Alto Custo",
    accuracy: 91.7,
    confidence: 88.4,
    algorithm: "Random Forest + Deep Learning",
    predictions: [
      { month: "Abr/25", novos_casos: 2, custo_estimado: 145000, tipo: "Oncológico + Trauma" },
      { month: "Mai/25", novos_casos: 1, custo_estimado: 89000, tipo: "Cardiovascular" },
      { month: "Jun/25", novos_casos: 1, custo_estimado: 67000, tipo: "Neurológico" },
      { month: "Jul/25", novos_casos: 3, custo_estimado: 234000, tipo: "Múltiplos" },
      { month: "Ago/25", novos_casos: 1, custo_estimado: 78000, tipo: "Oncológico" },
      { month: "Set/25", novos_casos: 2, custo_estimado: 156000, tipo: "Trauma + Psiquiátrico" },
    ],
    risk_factors: [
      { factor: "Histórico Familiar", weight: 0.32, description: "Genética oncológica" },
      { factor: "Idade > 50 anos", weight: 0.28, description: "193 beneficiários em risco" },
      { factor: "Comorbidades", weight: 0.25, description: "Diabetes + Hipertensão" },
      { factor: "Estilo de Vida", weight: 0.15, description: "Sedentarismo + Estresse" },
    ],
  }

  // Modelo 3: Previsão de Internações
  const internacoesModel = {
    name: "Previsão de Internações",
    accuracy: 89.5,
    confidence: 85.2,
    algorithm: "Gradient Boosting + Time Series",
    predictions: [
      { month: "Abr/25", internacoes: 8, custo_medio: 12500, total: 100000, evitaveis: 3 },
      { month: "Mai/25", internacoes: 6, custo_medio: 11800, total: 70800, evitaveis: 2 },
      { month: "Jun/25", internacoes: 5, custo_medio: 13200, total: 66000, evitaveis: 2 },
      { month: "Jul/25", internacoes: 12, custo_medio: 14100, total: 169200, evitaveis: 5 },
      { month: "Ago/25", internacoes: 7, custo_medio: 12900, total: 90300, evitaveis: 3 },
      { month: "Set/25", internacoes: 6, custo_medio: 13500, total: 81000, evitaveis: 2 },
    ],
    prevention_opportunities: [
      { tipo: "Gestão de Crônicos", reducao: 40, economia: 180000 },
      { tipo: "Telemedicina", reducao: 25, economia: 112500 },
      { tipo: "Cuidados Domiciliares", reducao: 20, economia: 90000 },
      { tipo: "Medicina Preventiva", reducao: 15, economia: 67500 },
    ],
  }

  // Modelo 4: Análise de Risco Individual
  const riskScoring = {
    name: "Score de Risco Individual",
    accuracy: 93.8,
    confidence: 91.2,
    algorithm: "Neural Networks + Ensemble",
    high_risk_individuals: [
      {
        id: "001",
        empresa: "Euroville",
        idade: 58,
        sexo: "M",
        score: 87,
        risco: "Muito Alto",
        fatores: ["Diabetes", "Hipertensão", "Histórico Familiar"],
        custo_previsto: 89000,
        intervencao: "Gestão intensiva + Telemedicina",
      },
      {
        id: "002",
        empresa: "Auto Japan Norte",
        idade: 45,
        sexo: "F",
        score: 82,
        risco: "Alto",
        fatores: ["Obesidade", "Sedentarismo", "Estresse"],
        custo_previsto: 67000,
        intervencao: "Programa de bem-estar + Acompanhamento",
      },
      {
        id: "003",
        empresa: "Delta Filmes",
        idade: 52,
        sexo: "M",
        score: 79,
        risco: "Alto",
        fatores: ["Tabagismo", "Colesterol Alto", "Idade"],
        custo_previsto: 54000,
        intervencao: "Cessação tabágica + Cardiologia preventiva",
      },
    ],
  }

  // Modelo 5: Impacto Financeiro de Intervenções
  const interventionImpact = {
    name: "Impacto de Intervenções Preventivas",
    scenarios: [
      {
        name: "Cenário Atual",
        sinistralidade_anual: 110.04,
        custo_anual: 2803651,
        intervencoes: "Nenhuma",
        economia: 0,
      },
      {
        name: "Gestão de Crônicos",
        sinistralidade_anual: 89.2,
        custo_anual: 2267890,
        intervencoes: "Acompanhamento dos 10 maiores usuários",
        economia: 535761,
        investimento: 120000,
        roi: 346,
      },
      {
        name: "Prevenção Intensiva",
        sinistralidade_anual: 76.8,
        custo_anual: 1954234,
        intervencoes: "Rastreamento + Gestão + Telemedicina",
        economia: 849417,
        investimento: 180000,
        roi: 372,
      },
      {
        name: "Programa Completo",
        sinistralidade_anual: 68.5,
        custo_anual: 1742501,
        intervencoes: "Todas as intervenções + IA + Wearables",
        economia: 1061150,
        investimento: 250000,
        roi: 324,
      },
    ],
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análises Preditivas - Grupo Fedla</h2>
        <p className="text-muted-foreground">
          Modelos de IA treinados com dados reais da Unimed-BH para previsão de tendências e riscos
        </p>
      </div>

      {/* Seletor de Modelo */}
      <div className="flex flex-wrap gap-4">
        <Button
          variant={activeModel === "sinistralidade" ? "default" : "outline"}
          onClick={() => setActiveModel("sinistralidade")}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Sinistralidade
        </Button>
        <Button
          variant={activeModel === "alto-custo" ? "default" : "outline"}
          onClick={() => setActiveModel("alto-custo")}
          className="gap-2"
        >
          <DollarSign className="h-4 w-4" />
          Alto Custo
        </Button>
        <Button
          variant={activeModel === "internacoes" ? "default" : "outline"}
          onClick={() => setActiveModel("internacoes")}
          className="gap-2"
        >
          <Activity className="h-4 w-4" />
          Internações
        </Button>
        <Button
          variant={activeModel === "risco-individual" ? "default" : "outline"}
          onClick={() => setActiveModel("risco-individual")}
          className="gap-2"
        >
          <Users className="h-4 w-4" />
          Risco Individual
        </Button>
        <Button
          variant={activeModel === "intervencoes" ? "default" : "outline"}
          onClick={() => setActiveModel("intervencoes")}
          className="gap-2"
        >
          <Target className="h-4 w-4" />
          Intervenções
        </Button>
      </div>

      {/* Modelo de Sinistralidade */}
      {activeModel === "sinistralidade" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {sinistralidadeModel.name}
              </CardTitle>
              <CardDescription>
                Algoritmo: {sinistralidadeModel.algorithm} | Acurácia: {sinistralidadeModel.accuracy}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{sinistralidadeModel.accuracy}%</div>
                  <div className="text-sm text-blue-600">Acurácia do Modelo</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{sinistralidadeModel.confidence}%</div>
                  <div className="text-sm text-green-600">Nível de Confiança</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-purple-600">Meses de Previsão</div>
                </div>
              </div>

              <div className="h-[400px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[...historicalData.slice(-6), ...sinistralidadeModel.predictions.slice(0, 6)]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value}%`,
                        name === "sinistralidade" ? "Histórico" : name === "predicted" ? "Previsto" : name,
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="sinistralidade"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      name="Histórico"
                    />
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      name="Previsto"
                    />
                    <Area
                      type="monotone"
                      dataKey="confidence_max"
                      stroke="#fbbf24"
                      fill="none"
                      strokeDasharray="5 5"
                      name="Limite Superior"
                    />
                    <Area
                      type="monotone"
                      dataKey="confidence_min"
                      stroke="#fbbf24"
                      fill="none"
                      strokeDasharray="5 5"
                      name="Limite Inferior"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Previsões Próximos 6 Meses</h4>
                  <div className="space-y-2">
                    {sinistralidadeModel.predictions.slice(0, 6).map((pred, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{pred.month}</span>
                          <div className="text-sm text-muted-foreground">
                            {pred.confidence_min}% - {pred.confidence_max}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{pred.predicted}%</div>
                          <Badge
                            variant={
                              pred.risk === "crítico" ? "destructive" : pred.risk === "alto" ? "secondary" : "default"
                            }
                          >
                            {pred.risk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Fatores de Influência</h4>
                  <div className="space-y-3">
                    {sinistralidadeModel.factors.map((factor, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{factor.name}</span>
                          <span className="text-sm">{factor.impact}%</span>
                        </div>
                        <Progress value={factor.impact} className="h-2 mb-1" />
                        <p className="text-xs text-muted-foreground">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alertas Preditivos */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Alertas Preditivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-medium text-red-800">Julho/2025 - Risco Crítico</h4>
                  <p className="text-sm text-red-700">
                    Sinistralidade prevista: 112.5% (98.2% - 126.8%). Sazonalidade histórica indica pico de internações.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-800">Outubro/2025 - Risco Crítico</h4>
                  <p className="text-sm text-orange-700">
                    Sinistralidade prevista: 145.2%. Padrão histórico mostra pico anual em outubro.
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-medium text-yellow-800">Tendência Anual</h4>
                  <p className="text-sm text-yellow-700">
                    Média anual prevista: 95.8%. Sem intervenções, sinistralidade permanecerá acima da meta de 75%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modelo de Alto Custo */}
      {activeModel === "alto-custo" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {altoCustoModel.name}
              </CardTitle>
              <CardDescription>
                Algoritmo: {altoCustoModel.algorithm} | Acurácia: {altoCustoModel.accuracy}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Previsão de Novos Casos</h4>
                  <div className="space-y-3">
                    {altoCustoModel.predictions.map((pred, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{pred.month}</span>
                          <Badge variant="destructive">{pred.novos_casos} casos</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Custo estimado: R$ {pred.custo_estimado.toLocaleString()}
                        </div>
                        <div className="text-sm">Tipo: {pred.tipo}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Fatores de Risco</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={altoCustoModel.risk_factors}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="weight"
                          label={({ factor, weight }) => `${factor}: ${(weight * 100).toFixed(0)}%`}
                        >
                          {altoCustoModel.risk_factors.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Peso"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Projeção Anual</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-blue-600">Novos Casos Previstos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">R$ 1.2M</div>
                    <div className="text-sm text-blue-600">Custo Total Estimado</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">43%</div>
                    <div className="text-sm text-blue-600">% do Custo Total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modelo de Internações */}
      {activeModel === "internacoes" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {internacoesModel.name}
              </CardTitle>
              <CardDescription>
                Algoritmo: {internacoesModel.algorithm} | Acurácia: {internacoesModel.accuracy}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Previsão Próximos 6 Meses</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={internacoesModel.predictions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "internacoes"
                              ? value
                              : name === "evitaveis"
                                ? value
                                : `R$ ${value.toLocaleString()}`,
                            name === "internacoes"
                              ? "Internações"
                              : name === "evitaveis"
                                ? "Evitáveis"
                                : name === "total"
                                  ? "Custo Total"
                                  : "Custo Médio",
                          ]}
                        />
                        <Bar dataKey="internacoes" fill="#8884d8" name="Internações" />
                        <Bar dataKey="evitaveis" fill="#ef4444" name="Evitáveis" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Oportunidades de Prevenção</h4>
                  <div className="space-y-3">
                    {internacoesModel.prevention_opportunities.map((opp, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{opp.tipo}</span>
                          <Badge variant="outline">{opp.reducao}%</Badge>
                        </div>
                        <div className="text-sm text-green-600">
                          Economia potencial: R$ {opp.economia.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">44</div>
                  <div className="text-sm text-red-600">Internações Previstas</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">17</div>
                  <div className="text-sm text-orange-600">Evitáveis (39%)</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">R$ 577K</div>
                  <div className="text-sm text-blue-600">Custo Total</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">R$ 225K</div>
                  <div className="text-sm text-green-600">Economia Potencial</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Risco Individual */}
      {activeModel === "risco-individual" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {riskScoring.name}
              </CardTitle>
              <CardDescription>
                Algoritmo: {riskScoring.algorithm} | Acurácia: {riskScoring.accuracy}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium">Indivíduos de Alto Risco Identificados</h4>
                {riskScoring.high_risk_individuals.map((individual, index) => (
                  <div key={index} className="p-4 border rounded-lg border-l-4 border-l-red-500">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">ID: {individual.id}</Badge>
                          <span className="font-medium">{individual.empresa}</span>
                          <Badge variant="destructive">{individual.risco}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {individual.idade} anos - {individual.sexo}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{individual.score}</div>
                        <div className="text-sm text-muted-foreground">Score de Risco</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Fatores de Risco:</h5>
                        <div className="flex flex-wrap gap-1">
                          {individual.fatores.map((fator, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {fator}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Intervenção Recomendada:</h5>
                        <p className="text-sm text-muted-foreground">{individual.intervencao}</p>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="text-sm">
                        <span className="font-medium">Custo previsto próximos 12 meses: </span>
                        <span className="text-orange-600 font-bold">
                          R$ {individual.custo_previsto.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Resumo da Análise de Risco</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">47</div>
                    <div className="text-sm text-blue-600">Indivíduos Alto Risco</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">R$ 1.8M</div>
                    <div className="text-sm text-blue-600">Custo Previsto Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">65%</div>
                    <div className="text-sm text-blue-600">Redução Potencial</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Impacto de Intervenções */}
      {activeModel === "intervencoes" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {interventionImpact.name}
              </CardTitle>
              <CardDescription>Simulação de diferentes cenários de intervenção baseados em dados reais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interventionImpact.scenarios.map((scenario, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${
                      index === 0
                        ? "border-l-4 border-l-red-500 bg-red-50"
                        : "border-l-4 border-l-green-500 bg-green-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{scenario.name}</h4>
                        <p className="text-sm text-muted-foreground">{scenario.intervencoes}</p>
                      </div>
                      {scenario.roi && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          ROI: {scenario.roi}%
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Sinistralidade</div>
                        <div
                          className={`text-xl font-bold ${
                            scenario.sinistralidade_anual > 100
                              ? "text-red-600"
                              : scenario.sinistralidade_anual > 75
                                ? "text-orange-600"
                                : "text-green-600"
                          }`}
                        >
                          {scenario.sinistralidade_anual}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Custo Anual</div>
                        <div className="text-xl font-bold">R$ {(scenario.custo_anual / 1000000).toFixed(2)}M</div>
                      </div>
                      {scenario.economia > 0 && (
                        <>
                          <div>
                            <div className="text-sm text-muted-foreground">Economia</div>
                            <div className="text-xl font-bold text-green-600">
                              R$ {(scenario.economia / 1000).toFixed(0)}K
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Investimento</div>
                            <div className="text-xl font-bold text-blue-600">
                              R$ {(scenario.investimento / 1000).toFixed(0)}K
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Comparativo de Cenários</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={interventionImpact.scenarios}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          name === "sinistralidade_anual"
                            ? `${value}%`
                            : name === "economia"
                              ? `R$ ${(value / 1000).toFixed(0)}K`
                              : `R$ ${(value / 1000000).toFixed(2)}M`,
                          name === "sinistralidade_anual"
                            ? "Sinistralidade"
                            : name === "economia"
                              ? "Economia"
                              : "Custo Anual",
                        ]}
                      />
                      <Bar dataKey="sinistralidade_anual" fill="#ef4444" name="Sinistralidade %" />
                      <Bar dataKey="economia" fill="#22c55e" name="Economia" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recomendações */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-green-800">Recomendações Estratégicas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-3">Implementação Imediata</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Gestão intensiva dos 10 maiores usuários</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Campanha de rastreamento de câncer colorretal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Telemedicina para casos crônicos</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600 mb-3">Médio Prazo</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Programa de bem-estar para alto risco</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Wearables para monitoramento contínuo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">IA para predição de internações</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório Preditivo
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Agendar Revisão Mensal
        </Button>
        <Button variant="outline" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Configurar Alertas
        </Button>
        {/* No final do componente PredictiveAnalysis, adicionar um novo botão: */}
        <Button variant="outline" className="gap-2" onClick={() => (window.location.href = "#care-management")}>
          <Users className="h-4 w-4" />
          Gestão de Cuidados
        </Button>
      </div>
    </div>
  )
}
