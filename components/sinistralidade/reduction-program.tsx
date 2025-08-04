"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, TrendingDown, Users, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"

export function SinistralidadeReductionProgram() {
  const [activeTab, setActiveTab] = useState("overview")

  const currentMetrics = {
    sinistralidade: 110.04,
    meta: 75,
    reducaoNecessaria: 35.04,
    prazo: "12 meses",
    economiaEstimada: 2400000,
  }

  const projectionData = [
    { month: "Atual", sinistralidade: 110.04, meta: 75 },
    { month: "Mês 1", sinistralidade: 108, meta: 75 },
    { month: "Mês 2", sinistralidade: 105, meta: 75 },
    { month: "Mês 3", sinistralidade: 102, meta: 75 },
    { month: "Mês 6", sinistralidade: 95, meta: 75 },
    { month: "Mês 9", sinistralidade: 85, meta: 75 },
    { month: "Mês 12", sinistralidade: 75, meta: 75 },
  ]

  const priorities = [
    {
      id: 1,
      title: "Doenças Cardiovasculares",
      impact: "Alto",
      cost: "R$ 850K/ano",
      prevalence: "34%",
      actions: ["Programa de exercícios", "Controle nutricional", "Monitoramento pressão"],
      status: "in-progress",
      completion: 45,
    },
    {
      id: 2,
      title: "Saúde Mental",
      impact: "Alto",
      cost: "R$ 720K/ano",
      prevalence: "25%",
      actions: ["Terapia individual", "Grupos de apoio", "Programa mindfulness"],
      status: "planning",
      completion: 15,
    },
    {
      id: 3,
      title: "Diabetes e Obesidade",
      impact: "Médio",
      cost: "R$ 620K/ano",
      prevalence: "28%",
      actions: ["Educação nutricional", "Atividade física", "Monitoramento glicêmico"],
      status: "in-progress",
      completion: 60,
    },
    {
      id: 4,
      title: "Medicina Preventiva",
      impact: "Médio",
      cost: "R$ 380K/ano",
      prevalence: "100%",
      actions: ["Check-ups regulares", "Vacinação", "Exames preventivos"],
      status: "active",
      completion: 85,
    },
  ]

  const timeline = [
    {
      phase: "Fase 1 - Diagnóstico",
      duration: "Meses 1-2",
      status: "completed",
      tasks: [
        "Análise detalhada da sinistralidade",
        "Identificação dos principais fatores de risco",
        "Mapeamento da população de risco",
        "Definição de metas e indicadores",
      ],
    },
    {
      phase: "Fase 2 - Implementação",
      duration: "Meses 3-8",
      status: "in-progress",
      tasks: [
        "Lançamento dos programas prioritários",
        "Treinamento das equipes",
        "Início do monitoramento",
        "Ajustes nos protocolos",
      ],
    },
    {
      phase: "Fase 3 - Consolidação",
      duration: "Meses 9-12",
      status: "pending",
      tasks: [
        "Expansão dos programas bem-sucedidos",
        "Otimização dos processos",
        "Avaliação de resultados",
        "Planejamento da continuidade",
      ],
    },
  ]

  const resources = [
    {
      category: "Equipe Médica",
      items: [
        { name: "Cardiologista", quantity: 2, status: "allocated" },
        { name: "Endocrinologista", quantity: 1, status: "allocated" },
        { name: "Psicólogo", quantity: 3, status: "needed" },
        { name: "Nutricionista", quantity: 2, status: "allocated" },
      ],
    },
    {
      category: "Infraestrutura",
      items: [
        { name: "Sala de Exercícios", quantity: 1, status: "allocated" },
        { name: "Consultórios", quantity: 4, status: "allocated" },
        { name: "Equipamentos Médicos", quantity: 1, status: "needed" },
        { name: "Sistema de Monitoramento", quantity: 1, status: "in-progress" },
      ],
    },
    {
      category: "Orçamento",
      items: [
        { name: "Recursos Humanos", quantity: "R$ 180K/mês", status: "allocated" },
        { name: "Equipamentos", quantity: "R$ 50K", status: "pending" },
        { name: "Medicamentos", quantity: "R$ 30K/mês", status: "allocated" },
        { name: "Exames", quantity: "R$ 25K/mês", status: "allocated" },
      ],
    },
  ]

  const individualCare = [
    {
      id: 1,
      name: "João Silva",
      condition: "Hipertensão",
      riskLevel: "Alto",
      lastVisit: "15/03/2024",
      nextAction: "Consulta cardiológica",
      status: "active",
    },
    {
      id: 2,
      name: "Maria Santos",
      condition: "Diabetes Tipo 2",
      riskLevel: "Médio",
      lastVisit: "12/03/2024",
      nextAction: "Exames laboratoriais",
      status: "monitoring",
    },
    {
      id: 3,
      name: "Pedro Costa",
      condition: "Ansiedade",
      riskLevel: "Alto",
      lastVisit: "18/03/2024",
      nextAction: "Sessão psicológica",
      status: "active",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      condition: "Obesidade",
      riskLevel: "Médio",
      lastVisit: "10/03/2024",
      nextAction: "Consulta nutricional",
      status: "active",
    },
  ]

  const monitoringMetrics = [
    { metric: "Taxa de Adesão", current: 78, target: 85, trend: "up" },
    { metric: "Satisfação Pacientes", current: 4.2, target: 4.5, trend: "up" },
    { metric: "Redução Custos", current: 12, target: 35, trend: "up" },
    { metric: "Tempo Resposta", current: 2.1, target: 1.5, trend: "down" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-400"
      case "active":
        return "bg-green-500"
      case "planning":
        return "bg-yellow-500"
      case "allocated":
        return "text-green-600"
      case "needed":
        return "text-red-600"
      case "monitoring":
        return "text-blue-600"
      default:
        return "bg-gray-400"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Alto":
        return "bg-red-500"
      case "Médio":
        return "bg-yellow-500"
      case "Baixo":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Alto":
        return "text-red-600 bg-red-50"
      case "Médio":
        return "text-yellow-600 bg-yellow-50"
      case "Baixo":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="h-8 w-8 mr-3 text-red-600" />
            Programa de Redução de Sinistralidade
          </h1>
          <p className="text-gray-600 mt-1">Plano estratégico para redução da sinistralidade de 110% para 75%</p>
        </div>
        <Badge variant="destructive" className="text-lg px-4 py-2">
          URGENTE
        </Badge>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{currentMetrics.sinistralidade}%</div>
            <div className="text-sm text-gray-600">Sinistralidade Atual</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{currentMetrics.meta}%</div>
            <div className="text-sm text-gray-600">Meta</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{currentMetrics.reducaoNecessaria}%</div>
            <div className="text-sm text-gray-600">Redução Necessária</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{currentMetrics.prazo}</div>
            <div className="text-sm text-gray-600">Prazo</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              R$ {(currentMetrics.economiaEstimada / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Economia Estimada</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Navegação */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="priorities">Prioridades</TabsTrigger>
          <TabsTrigger value="timeline">Cronograma</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="individual">Cuidado Individual</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Projeção de Redução */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-green-600" />
                Projeção de Redução da Sinistralidade
              </CardTitle>
              <CardDescription>Evolução esperada ao longo dos próximos 12 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 115]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sinistralidade"
                      stroke="#ef4444"
                      strokeWidth={3}
                      name="Sinistralidade Atual"
                    />
                    <Line
                      type="monotone"
                      dataKey="meta"
                      stroke="#22c55e"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Meta"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Resumo das Ações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Imediatas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Programa cardiovascular iniciado</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Contratação de psicólogos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Equipamentos médicos pendentes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investimento Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Recursos Humanos</span>
                    <span className="font-semibold">R$ 2.16M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Equipamentos</span>
                    <span className="font-semibold">R$ 50K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Medicamentos</span>
                    <span className="font-semibold">R$ 360K</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ 2.57M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ROI Esperado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">93%</div>
                  <div className="text-sm text-gray-600 mt-1">Retorno sobre Investimento</div>
                  <div className="mt-4 text-sm">
                    <div>Investimento: R$ 2.57M</div>
                    <div>Economia: R$ 2.40M/ano</div>
                    <div className="font-semibold text-green-600">Payback: 13 meses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="priorities" className="space-y-6">
          <div className="grid gap-6">
            {priorities.map((priority) => (
              <Card key={priority.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getImpactColor(priority.impact)} mr-3`}></div>
                      {priority.title}
                    </CardTitle>
                    <Badge variant={priority.impact === "Alto" ? "destructive" : "secondary"}>
                      {priority.impact} Impacto
                    </Badge>
                  </div>
                  <CardDescription>
                    Prevalência: {priority.prevalence} | Custo: {priority.cost}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso</span>
                        <span>{priority.completion}%</span>
                      </div>
                      <Progress value={priority.completion} className="h-2" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Ações Planejadas:</h4>
                      <ul className="space-y-1">
                        {priority.actions.map((action, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">{action}</span>
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

        <TabsContent value="timeline" className="space-y-6">
          <div className="space-y-6">
            {timeline.map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(phase.status)} mr-3`}></div>
                      {phase.phase}
                    </CardTitle>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center space-x-2">
                        <CheckCircle
                          className={`h-4 w-4 ${phase.status === "completed" ? "text-green-600" : "text-gray-400"}`}
                        />
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6">
            {resources.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">{item.quantity}</div>
                        </div>
                        <Badge
                          variant={
                            item.status === "allocated"
                              ? "default"
                              : item.status === "needed"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {item.status === "allocated"
                            ? "Alocado"
                            : item.status === "needed"
                              ? "Necessário"
                              : "Em Progresso"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Pacientes em Acompanhamento Individual
              </CardTitle>
              <CardDescription>Casos que requerem atenção personalizada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {individualCare.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-gray-600">{patient.condition}</div>
                        <div className="text-xs text-gray-500">Última visita: {patient.lastVisit}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                      <div className="text-sm text-gray-600 mt-1">{patient.nextAction}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monitoringMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{metric.metric}</h3>
                    <TrendingUp className={`h-4 w-4 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Atual</span>
                      <span className="font-semibold">{metric.current}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Meta</span>
                      <span className="font-semibold">{metric.target}</span>
                    </div>
                    <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Indicadores de Performance</CardTitle>
              <CardDescription>Acompanhamento mensal dos principais KPIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sinistralidade" fill="#ef4444" name="Sinistralidade %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
