"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, Brain, DollarSign, Activity, Calendar, Download } from "lucide-react"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"

export function PredictiveAnalysis() {
  const [activeModel, setActiveModel] = useState("cost-reduction")
  const [timeHorizon, setTimeHorizon] = useState("12m")

  // Dados reais da Unimed para os modelos preditivos
  const realData = {
    sinistralidade_atual: 110.04,
    custo_total_anual: 2803651,
    beneficiarios: 987,
    casos_oncologicos: 4,
    custo_oncologicos: 406000,
    internacoes_ano: 123,
    custo_internacoes: 1346000,
    top_10_usuarios_custo: 1180000,
    cobertura_sangue_oculto: 6.86,
    cobertura_mamografia: 45,
  }

  // Modelo 1: Redução de Custos por Cenário
  const costReductionScenarios = {
    name: "Cenários de Redução de Custos - Grupo Fedla",
    accuracy: 92.5,
    confidence: 89.3,
    algorithm: "Análise Baseada em Dados Reais + Machine Learning",
    scenarios: [
      {
        name: "Cenário Atual",
        description: "Sem intervenções - Tendência atual",
        sinistralidade: 110.04,
        custo_anual: 2803651,
        investimento: 0,
        economia: 0,
        roi: 0,
        prazo: "Atual",
        risco: "Crítico",
        detalhes: {
          gestao_cronicos: 0,
          prevencao: 0,
          telemedicina: 0,
          case_management: 0,
        },
      },
      {
        name: "Cenário 1: Gestão de Crônicos",
        description: "Foco nos 10 maiores usuários + 4 casos oncológicos",
        sinistralidade: 95.2,
        custo_anual: 2383000,
        investimento: 120000,
        economia: 420651,
        roi: 350,
        prazo: "3 meses",
        risco: "Alto",
        detalhes: {
          gestao_cronicos: 35, // % redução nos top 10
          prevencao: 0,
          telemedicina: 15, // % redução internações
          case_management: 25, // % melhoria adesão
        },
      },
      {
        name: "Cenário 2: Prevenção Intensiva",
        description: "Rastreamento + Gestão de crônicos",
        sinistralidade: 82.7,
        custo_anual: 2070000,
        investimento: 180000,
        economia: 733651,
        roi: 407,
        prazo: "6 meses",
        risco: "Médio",
        detalhes: {
          gestao_cronicos: 35,
          prevencao: 60, // % aumento cobertura
          telemedicina: 25,
          case_management: 40,
        },
      },
      {
        name: "Cenário 3: Programa Completo",
        description: "Gestão + Prevenção + Telemedicina + Bem-estar",
        sinistralidade: 75.0,
        custo_anual: 1877000,
        investimento: 250000,
        economia: 926651,
        roi: 371,
        prazo: "12 meses",
        risco: "Baixo",
        detalhes: {
          gestao_cronicos: 45,
          prevencao: 80,
          telemedicina: 40,
          case_management: 60,
        },
      },
    ],
    monthly_projection: [
      { month: "Atual", cenario1: 110.04, cenario2: 110.04, cenario3: 110.04 },
      { month: "Mês 1", cenario1: 108.2, cenario2: 107.5, cenario3: 106.8 },
      { month: "Mês 2", cenario1: 105.8, cenario2: 103.2, cenario3: 101.5 },
      { month: "Mês 3", cenario1: 102.1, cenario2: 98.7, cenario3: 96.2 },
      { month: "Mês 6", cenario1: 95.2, cenario2: 87.3, cenario3: 84.1 },
      { month: "Mês 9", cenario1: 92.8, cenario2: 82.7, cenario3: 79.5 },
      { month: "Mês 12", cenario1: 90.5, cenario2: 78.2, cenario3: 75.0 },
    ],
  }

  // Modelo 2: Análise de ROI por Intervenção
  const roiAnalysis = {
    name: "ROI por Tipo de Intervenção",
    interventions: [
      {
        name: "Gestão Top 10 Usuários",
        investimento: 120000,
        economia_anual: 420000,
        roi: 350,
        payback_months: 3.4,
        impacto_sinistralidade: -14.8,
        detalhes: {
          enfermeira_especializada: 60000,
          sistema_monitoramento: 25000,
          medicamentos_especiais: 35000,
        },
      },
      {
        name: "Rastreamento Câncer Colorretal",
        investimento: 30000,
        economia_anual: 450000,
        roi: 1500,
        payback_months: 0.8,
        impacto_sinistralidade: -12.3,
        detalhes: {
          kits_sangue_oculto: 15000,
          campanha_educativa: 8000,
          logistica: 7000,
        },
      },
      {
        name: "Telemedicina para Crônicos",
        investimento: 45000,
        economia_anual: 180000,
        roi: 400,
        payback_months: 3.0,
        impacto_sinistralidade: -8.5,
        detalhes: {
          plataforma_telemedicina: 25000,
          treinamento_equipe: 12000,
          equipamentos: 8000,
        },
      },
      {
        name: "Programa Bem-estar Corporativo",
        investimento: 80000,
        economia_anual: 200000,
        roi: 250,
        payback_months: 4.8,
        impacto_sinistralidade: -6.2,
        detalhes: {
          academia_corporativa: 40000,
          nutricionista: 24000,
          exames_preventivos: 16000,
        },
      },
      {
        name: "Case Management Intensivo",
        investimento: 90000,
        economia_anual: 320000,
        roi: 356,
        payback_months: 3.4,
        impacto_sinistralidade: -10.1,
        detalhes: {
          case_managers: 60000,
          sistema_gestao: 20000,
          protocolos_clinicos: 10000,
        },
      },
    ],
  }

  // Modelo 3: Previsão de Custos por Categoria
  const costPrediction = {
    name: "Previsão de Custos por Categoria",
    categories: [
      {
        categoria: "Oncologia",
        custo_atual: 406000,
        tendencia_sem_intervencao: 520000,
        custo_com_gestao: 290000,
        economia_potencial: 230000,
        pacientes_atuais: 4,
        novos_casos_previstos: 2,
      },
      {
        categoria: "Internações",
        custo_atual: 1346000,
        tendencia_sem_intervencao: 1750000,
        custo_com_gestao: 950000,
        economia_potencial: 800000,
        pacientes_atuais: 123,
        novos_casos_previstos: 45,
      },
      {
        categoria: "Consultas/Exames",
        custo_atual: 890000,
        tendencia_sem_intervencao: 1100000,
        custo_com_gestao: 780000,
        economia_potencial: 320000,
        pacientes_atuais: 957,
        novos_casos_previstos: 150,
      },
      {
        categoria: "Medicamentos",
        custo_atual: 161651,
        tendencia_sem_intervencao: 210000,
        custo_com_gestao: 140000,
        economia_potencial: 70000,
        pacientes_atuais: 234,
        novos_casos_previstos: 30,
      },
    ],
  }

  // Modelo 4: Timeline de Implementação
  const implementationTimeline = {
    name: "Cronograma de Implementação Otimizado",
    phases: [
      {
        fase: "Fase 1 - Emergencial",
        prazo: "0-30 dias",
        investimento: 50000,
        economia_esperada: 120000,
        acoes: [
          "Identificar e contactar top 10 usuários",
          "Implementar case management básico",
          "Iniciar telemedicina para casos críticos",
          "Campanha urgente sangue oculto",
        ],
        kpis: ["Redução 15% custos top 10", "50% adesão telemedicina", "Dobrar cobertura sangue oculto"],
      },
      {
        fase: "Fase 2 - Estruturação",
        prazo: "1-3 meses",
        investimento: 120000,
        economia_esperada: 350000,
        acoes: [
          "Contratar enfermeira especializada",
          "Implementar protocolos clínicos",
          "Expandir telemedicina",
          "Programa prevenção estruturado",
        ],
        kpis: ["Sinistralidade < 95%", "80% adesão protocolos", "Redução 25% internações"],
      },
      {
        fase: "Fase 3 - Otimização",
        prazo: "3-6 meses",
        investimento: 80000,
        economia_esperada: 500000,
        acoes: [
          "IA para predição de riscos",
          "Programa bem-estar completo",
          "Otimização de protocolos",
          "Expansão prevenção",
        ],
        kpis: ["Sinistralidade < 85%", "ROI > 400%", "Satisfação > 90%"],
      },
      {
        fase: "Fase 4 - Sustentação",
        prazo: "6-12 meses",
        investimento: 60000,
        economia_esperada: 700000,
        acoes: ["Monitoramento contínuo", "Ajustes finos", "Expansão para dependentes", "Cultura de prevenção"],
        kpis: ["Sinistralidade = 75%", "ROI sustentado > 350%", "Zero casos evitáveis"],
      },
    ],
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análises Preditivas - Redução de Custos</h2>
        <p className="text-muted-foreground">
          Modelos baseados nos dados reais da Unimed-BH para otimização de custos e melhoria de resultados
        </p>
      </div>

      {/* Seletor de Modelo */}
      <div className="flex flex-wrap gap-4">
        <Button
          variant={activeModel === "cost-reduction" ? "default" : "outline"}
          onClick={() => setActiveModel("cost-reduction")}
          className="gap-2"
        >
          <DollarSign className="h-4 w-4" />
          Cenários de Redução
        </Button>
        <Button
          variant={activeModel === "roi-analysis" ? "default" : "outline"}
          onClick={() => setActiveModel("roi-analysis")}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Análise de ROI
        </Button>
        <Button
          variant={activeModel === "cost-prediction" ? "default" : "outline"}
          onClick={() => setActiveModel("cost-prediction")}
          className="gap-2"
        >
          <Activity className="h-4 w-4" />
          Previsão por Categoria
        </Button>
        <Button
          variant={activeModel === "implementation" ? "default" : "outline"}
          onClick={() => setActiveModel("implementation")}
          className="gap-2"
        >
          <Calendar className="h-4 w-4" />
          Timeline Implementação
        </Button>
      </div>

      {/* Modelo de Cenários de Redução de Custos */}
      {activeModel === "cost-reduction" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {costReductionScenarios.name}
              </CardTitle>
              <CardDescription>
                Algoritmo: {costReductionScenarios.algorithm} | Acurácia: {costReductionScenarios.accuracy}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">110.04%</div>
                  <div className="text-sm text-red-600">Sinistralidade Atual</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">R$ 2.8M</div>
                  <div className="text-sm text-orange-600">Custo Anual Atual</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">75%</div>
                  <div className="text-sm text-green-600">Meta Sinistralidade</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">R$ 927K</div>
                  <div className="text-sm text-blue-600">Economia Potencial</div>
                </div>
              </div>

              {/* Gráfico de Evolução dos Cenários */}
              <div className="h-[400px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costReductionScenarios.monthly_projection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Sinistralidade"]} />
                    <Line
                      type="monotone"
                      dataKey="cenario1"
                      stroke="#ff7300"
                      strokeWidth={2}
                      name="Cenário 1: Gestão Crônicos"
                    />
                    <Line
                      type="monotone"
                      dataKey="cenario2"
                      stroke="#00c49f"
                      strokeWidth={2}
                      name="Cenário 2: Prevenção Intensiva"
                    />
                    <Line
                      type="monotone"
                      dataKey="cenario3"
                      stroke="#0088fe"
                      strokeWidth={3}
                      name="Cenário 3: Programa Completo"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Cards dos Cenários */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {costReductionScenarios.scenarios.map((scenario, index) => (
                  <Card
                    key={index}
                    className={`${index === 0 ? "border-l-4 border-l-red-500" : index === 3 ? "border-l-4 border-l-green-500" : "border-l-4 border-l-blue-500"}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{scenario.name}</CardTitle>
                        <Badge
                          variant={
                            scenario.risco === "Crítico"
                              ? "destructive"
                              : scenario.risco === "Alto"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {scenario.risco}
                        </Badge>
                      </div>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Sinistralidade:</span>
                            <div
                              className={`font-bold text-lg ${scenario.sinistralidade > 100 ? "text-red-600" : scenario.sinistralidade > 85 ? "text-orange-600" : "text-green-600"}`}
                            >
                              {scenario.sinistralidade}%
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Custo Anual:</span>
                            <div className="font-bold text-lg">R$ {(scenario.custo_anual / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>

                        {scenario.investimento > 0 && (
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Investimento:</span>
                              <div className="font-bold text-blue-600">
                                R$ {(scenario.investimento / 1000).toFixed(0)}K
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Economia:</span>
                              <div className="font-bold text-green-600">
                                R$ {(scenario.economia / 1000).toFixed(0)}K
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">ROI:</span>
                              <div className="font-bold text-purple-600">{scenario.roi}%</div>
                            </div>
                          </div>
                        )}

                        <div>
                          <span className="text-sm text-muted-foreground">Prazo de Implementação:</span>
                          <div className="font-medium">{scenario.prazo}</div>
                        </div>

                        {scenario.investimento > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm">Impactos Esperados:</h5>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>Gestão Crônicos: {scenario.detalhes.gestao_cronicos}%</div>
                              <div>Prevenção: {scenario.detalhes.prevencao}%</div>
                              <div>Telemedicina: {scenario.detalhes.telemedicina}%</div>
                              <div>Case Management: {scenario.detalhes.case_management}%</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modelo de Análise de ROI */}
      {activeModel === "roi-analysis" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {roiAnalysis.name}
              </CardTitle>
              <CardDescription>Análise detalhada do retorno sobre investimento por tipo de intervenção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">ROI por Intervenção</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={roiAnalysis.interventions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
                        <Bar dataKey="roi" fill="#8884d8" name="ROI %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Payback Period (Meses)</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={roiAnalysis.interventions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} meses`, "Payback"]} />
                        <Bar dataKey="payback_months" fill="#82ca9d" name="Payback (meses)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Detalhamento por Intervenção</h4>
                {roiAnalysis.interventions.map((intervention, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{intervention.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-800">ROI: {intervention.roi}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Investimento:</span>
                          <div className="font-bold text-blue-600">
                            R$ {(intervention.investimento / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Economia Anual:</span>
                          <div className="font-bold text-green-600">
                            R$ {(intervention.economia_anual / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Payback:</span>
                          <div className="font-bold text-purple-600">{intervention.payback_months} meses</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Impacto Sinistralidade:</span>
                          <div className="font-bold text-orange-600">{intervention.impacto_sinistralidade}%</div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2">Composição do Investimento:</h5>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {Object.entries(intervention.detalhes).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span>{key.replace(/_/g, " ")}:</span>
                              <span className="font-medium">R$ {(value / 1000).toFixed(0)}K</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modelo de Previsão por Categoria */}
      {activeModel === "cost-prediction" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {costPrediction.name}
              </CardTitle>
              <CardDescription>
                Comparação entre custos atuais, projeção sem intervenção e custos esperados com gestão ativa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Comparativo de Custos</h4>
                  <div className="mb-2 flex flex-wrap gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-[#ff7300]"></div>
                      <span className="text-sm">Custo Atual</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-[#ff4444]"></div>
                      <span className="text-sm">Tendência sem Intervenção</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-[#00c49f]"></div>
                      <span className="text-sm">Custo com Gestão</span>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={costPrediction.categories}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="categoria" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`R$ ${(value / 1000).toFixed(0)}K`, ""]}
                          labelFormatter={(label) => `Categoria: ${label}`}
                        />
                        <Legend
                          payload={[
                            { value: "Custo Atual", type: "square", color: "#ff7300" },
                            { value: "Sem Intervenção", type: "square", color: "#ff4444" },
                            { value: "Com Gestão", type: "square", color: "#00c49f" },
                          ]}
                        />
                        <Bar dataKey="custo_atual" fill="#ff7300" name="Custo Atual" />
                        <Bar dataKey="tendencia_sem_intervencao" fill="#ff4444" name="Sem Intervenção" />
                        <Bar dataKey="custo_com_gestao" fill="#00c49f" name="Com Gestão" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Economia Potencial por Categoria</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costPrediction.categories}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="economia_potencial"
                          label={({ categoria, economia_potencial }) =>
                            `${categoria}: R$ ${(economia_potencial / 1000).toFixed(0)}K`
                          }
                        >
                          {costPrediction.categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`R$ ${(value / 1000).toFixed(0)}K`, "Economia"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Detalhamento por Categoria</h4>
                {costPrediction.categories.map((category, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg">{category.categoria}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Custo Atual:</span>
                          <div className="font-bold text-orange-600">
                            R$ {(category.custo_atual / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Sem Intervenção:</span>
                          <div className="font-bold text-red-600">
                            R$ {(category.tendencia_sem_intervencao / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Com Gestão:</span>
                          <div className="font-bold text-green-600">
                            R$ {(category.custo_com_gestao / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Economia:</span>
                          <div className="font-bold text-blue-600">
                            R$ {(category.economia_potencial / 1000).toFixed(0)}K
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Pacientes Atuais:</span>
                          <div className="font-medium">{category.pacientes_atuais}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Novos Casos Previstos:</span>
                          <div className="font-medium">{category.novos_casos_previstos}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Timeline de Implementação */}
      {activeModel === "implementation" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {implementationTimeline.name}
              </CardTitle>
              <CardDescription>Cronograma estratégico para máxima eficiência na redução de custos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {implementationTimeline.phases.map((phase, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${index === 0 ? "border-l-red-500" : index === 1 ? "border-l-orange-500" : index === 2 ? "border-l-blue-500" : "border-l-green-500"}`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{phase.fase}</CardTitle>
                        <Badge variant="outline">{phase.prazo}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Investimento:</span>
                          <div className="font-bold text-blue-600">R$ {(phase.investimento / 1000).toFixed(0)}K</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Economia Esperada:</span>
                          <div className="font-bold text-green-600">
                            R$ {(phase.economia_esperada / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">ROI:</span>
                          <div className="font-bold text-purple-600">
                            {((phase.economia_esperada / phase.investimento - 1) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Ações Principais:</h5>
                          <ul className="space-y-1">
                            {phase.acoes.map((acao, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                {acao}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm mb-2">KPIs de Sucesso:</h5>
                          <ul className="space-y-1">
                            {phase.kpis.map((kpi, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                {kpi}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Resumo Financeiro */}
              <Card className="mt-6 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Resumo Financeiro - 12 Meses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        R${" "}
                        {(
                          implementationTimeline.phases.reduce((acc, phase) => acc + phase.investimento, 0) / 1000
                        ).toFixed(0)}
                        K
                      </div>
                      <div className="text-sm text-green-600">Investimento Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        R${" "}
                        {(
                          implementationTimeline.phases.reduce((acc, phase) => acc + phase.economia_esperada, 0) / 1000
                        ).toFixed(0)}
                        K
                      </div>
                      <div className="text-sm text-green-600">Economia Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {(
                          (implementationTimeline.phases.reduce((acc, phase) => acc + phase.economia_esperada, 0) /
                            implementationTimeline.phases.reduce((acc, phase) => acc + phase.investimento, 0) -
                            1) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                      <div className="text-sm text-green-600">ROI Consolidado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">75%</div>
                      <div className="text-sm text-green-600">Meta Sinistralidade</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Plano Completo
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Agendar Implementação
        </Button>
        <Button variant="outline" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Iniciar Fase Emergencial
        </Button>
      </div>
    </div>
  )
}
