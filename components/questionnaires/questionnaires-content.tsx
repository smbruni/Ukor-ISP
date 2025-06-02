"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  FileText,
  Clock,
  Users,
  TrendingUp,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  BarChart3,
  Target,
  Brain,
  Heart,
  Moon,
  Apple,
  Zap,
  UserCheck,
} from "lucide-react"

export function QuestionnairesContent() {
  const [activeTab, setActiveTab] = useState("available")
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  // Dados dos questionários disponíveis
  const questionnaires = [
    {
      id: 1,
      title: "Avaliação de Burnout (MBI)",
      description: "Maslach Burnout Inventory - Avaliação completa de esgotamento profissional",
      category: "Saúde Mental",
      icon: Brain,
      color: "bg-purple-500",
      questions: 22,
      estimatedTime: "8-10 min",
      frequency: "Trimestral",
      status: "active",
      responses: 1247,
      responseRate: 87,
      lastSent: "2024-06-01",
      nextDue: "2024-09-01",
      priority: "high",
      tags: ["Obrigatório", "Validado", "Internacional"],
    },
    {
      id: 2,
      title: "Qualidade do Sono (PSQI)",
      description: "Pittsburgh Sleep Quality Index - Avaliação da qualidade do sono",
      category: "Sono",
      icon: Moon,
      color: "bg-indigo-500",
      questions: 19,
      estimatedTime: "5-7 min",
      frequency: "Mensal",
      status: "active",
      responses: 1156,
      responseRate: 81,
      lastSent: "2024-06-15",
      nextDue: "2024-07-15",
      priority: "high",
      tags: ["Validado", "Científico"],
    },
    {
      id: 3,
      title: "Hábitos Alimentares",
      description: "Avaliação completa dos padrões alimentares e nutricionais",
      category: "Nutrição",
      icon: Apple,
      color: "bg-green-500",
      questions: 35,
      estimatedTime: "12-15 min",
      frequency: "Bimestral",
      status: "active",
      responses: 892,
      responseRate: 62,
      lastSent: "2024-05-01",
      nextDue: "2024-07-01",
      priority: "medium",
      tags: ["Personalizado", "Detalhado"],
    },
    {
      id: 4,
      title: "Atividade Física e Exercícios",
      description: "Questionário sobre rotina de exercícios e atividade física",
      category: "Atividade Física",
      icon: Zap,
      color: "bg-orange-500",
      questions: 28,
      estimatedTime: "10-12 min",
      frequency: "Mensal",
      status: "active",
      responses: 1034,
      responseRate: 72,
      lastSent: "2024-06-10",
      nextDue: "2024-07-10",
      priority: "medium",
      tags: ["Integração Wearables"],
    },
    {
      id: 5,
      title: "Estresse Percebido (PSS)",
      description: "Perceived Stress Scale - Medição do nível de estresse percebido",
      category: "Estresse",
      icon: Target,
      color: "bg-red-500",
      questions: 14,
      estimatedTime: "4-6 min",
      frequency: "Quinzenal",
      status: "active",
      responses: 1198,
      responseRate: 84,
      lastSent: "2024-06-20",
      nextDue: "2024-07-05",
      priority: "high",
      tags: ["Rápido", "Validado"],
    },
    {
      id: 6,
      title: "Clima Organizacional",
      description: "Avaliação do ambiente de trabalho e satisfação profissional",
      category: "Ambiente",
      icon: Users,
      color: "bg-blue-500",
      questions: 45,
      estimatedTime: "15-20 min",
      frequency: "Semestral",
      status: "draft",
      responses: 0,
      responseRate: 0,
      lastSent: null,
      nextDue: "2024-07-30",
      priority: "medium",
      tags: ["Em Desenvolvimento"],
    },
    {
      id: 7,
      title: "Saúde Cardiovascular",
      description: "Avaliação de fatores de risco cardiovascular",
      category: "Saúde Física",
      icon: Heart,
      color: "bg-pink-500",
      questions: 32,
      estimatedTime: "12-15 min",
      frequency: "Trimestral",
      status: "paused",
      responses: 567,
      responseRate: 40,
      lastSent: "2024-03-01",
      nextDue: "2024-08-01",
      priority: "low",
      tags: ["Especializado"],
    },
    {
      id: 8,
      title: "Engajamento no Trabalho",
      description: "Medição do nível de engajamento e motivação profissional",
      category: "Engajamento",
      icon: UserCheck,
      color: "bg-cyan-500",
      questions: 17,
      estimatedTime: "6-8 min",
      frequency: "Mensal",
      status: "active",
      responses: 1089,
      responseRate: 76,
      lastSent: "2024-06-25",
      nextDue: "2024-07-25",
      priority: "medium",
      tags: ["Utrecht Work Engagement"],
    },
  ]

  // Dados de histórico e análises
  const responseHistory = [
    { month: "Jan", responses: 1156, rate: 81 },
    { month: "Fev", responses: 1203, rate: 84 },
    { month: "Mar", responses: 1178, rate: 82 },
    { month: "Abr", responses: 1234, rate: 86 },
    { month: "Mai", responses: 1189, rate: 83 },
    { month: "Jun", responses: 1247, rate: 87 },
  ]

  const categoryDistribution = [
    { name: "Saúde Mental", value: 35, color: "#8b5cf6" },
    { name: "Sono", value: 20, color: "#6366f1" },
    { name: "Nutrição", value: 15, color: "#10b981" },
    { name: "Atividade Física", value: 12, color: "#f59e0b" },
    { name: "Estresse", value: 10, color: "#ef4444" },
    { name: "Outros", value: 8, color: "#6b7280" },
  ]

  const departmentParticipation = [
    { dept: "RH", participation: 95, total: 23 },
    { dept: "Marketing", participation: 89, total: 67 },
    { dept: "TI", participation: 82, total: 145 },
    { dept: "Financeiro", participation: 91, total: 34 },
    { dept: "Vendas", participation: 78, total: 89 },
    { dept: "Operações", participation: 74, total: 156 },
  ]

  // Filtros
  const filteredQuestionnaires = questionnaires.filter((q) => {
    if (filterStatus !== "all" && q.status !== filterStatus) return false
    if (filterCategory !== "all" && q.category !== filterCategory) return false
    return true
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Rascunho</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Pausado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Questionários de Saúde</h2>
        <p className="text-muted-foreground">
          Gerencie questionários, acompanhe respostas e analise dados de saúde dos colaboradores
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Questionários</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{questionnaires.length}</div>
            <p className="text-xs text-muted-foreground">
              {questionnaires.filter((q) => q.status === "active").length} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+3% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Respostas Este Mês</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">De 1,432 colaboradores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185</div>
            <p className="text-xs text-muted-foreground">Aguardando resposta</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Questionários Disponíveis</TabsTrigger>
          <TabsTrigger value="responses">Histórico de Respostas</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {filterStatus === "all" ? "Todos" : filterStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>Todos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")}>Ativo</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("draft")}>Rascunho</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("paused")}>Pausado</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Categoria: {filterCategory === "all" ? "Todas" : filterCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterCategory("all")}>Todas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("Saúde Mental")}>Saúde Mental</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("Sono")}>Sono</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("Nutrição")}>Nutrição</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("Atividade Física")}>
                  Atividade Física
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("Estresse")}>Estresse</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="w-full sm:w-auto">
              <FileText className="h-4 w-4 mr-2" />
              Novo Questionário
            </Button>
          </div>

          {/* Lista de Questionários */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestionnaires.map((questionnaire) => {
              const IconComponent = questionnaire.icon
              return (
                <Card
                  key={questionnaire.id}
                  className={`hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${getPriorityColor(questionnaire.priority)}`}
                  onClick={() => setSelectedQuestionnaire(questionnaire)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${questionnaire.color} text-white`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{questionnaire.title}</CardTitle>
                          <CardDescription className="text-sm">{questionnaire.category}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Relatório
                          </DropdownMenuItem>
                          {questionnaire.status === "active" ? (
                            <DropdownMenuItem>
                              <Pause className="h-4 w-4 mr-2" />
                              Pausar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Play className="h-4 w-4 mr-2" />
                              Ativar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{questionnaire.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {questionnaire.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Questões:</span>
                          <div className="font-medium">{questionnaire.questions}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tempo:</span>
                          <div className="font-medium">{questionnaire.estimatedTime}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequência:</span>
                          <div className="font-medium">{questionnaire.frequency}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="mt-1">{getStatusBadge(questionnaire.status)}</div>
                        </div>
                      </div>

                      {questionnaire.status === "active" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Taxa de Resposta</span>
                            <span className="font-medium">{questionnaire.responseRate}%</span>
                          </div>
                          <Progress value={questionnaire.responseRate} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {questionnaire.responses} de{" "}
                            {Math.round(questionnaire.responses / (questionnaire.responseRate / 100))} colaboradores
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          {questionnaire.status === "active" ? "Ver Respostas" : "Configurar"}
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Relatório
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução das Respostas</CardTitle>
                <CardDescription>Número de respostas e taxa de participação por mês</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="responses" fill="#3b82f6" name="Respostas" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rate"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Taxa %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Participação por Departamento</CardTitle>
                <CardDescription>Taxa de participação nos questionários por área</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentParticipation} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="dept" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value}%`, "Participação"]} />
                    <Bar dataKey="participation" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Respostas Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Respostas Recentes</CardTitle>
              <CardDescription>Últimas respostas recebidas nos questionários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Colaborador</th>
                      <th className="text-left p-2">Questionário</th>
                      <th className="text-left p-2">Departamento</th>
                      <th className="text-left p-2">Data</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Ana Silva",
                        questionnaire: "Avaliação de Burnout",
                        department: "TI",
                        date: "2024-06-25",
                        status: "completed",
                      },
                      {
                        name: "Carlos Santos",
                        questionnaire: "Qualidade do Sono",
                        department: "Marketing",
                        date: "2024-06-25",
                        status: "completed",
                      },
                      {
                        name: "Maria Oliveira",
                        questionnaire: "Estresse Percebido",
                        department: "Vendas",
                        date: "2024-06-24",
                        status: "partial",
                      },
                      {
                        name: "João Costa",
                        questionnaire: "Hábitos Alimentares",
                        department: "RH",
                        date: "2024-06-24",
                        status: "completed",
                      },
                      {
                        name: "Lucia Mendes",
                        questionnaire: "Atividade Física",
                        department: "Financeiro",
                        date: "2024-06-23",
                        status: "pending",
                      },
                    ].map((response, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{response.name}</td>
                        <td className="p-2">{response.questionnaire}</td>
                        <td className="p-2">{response.department}</td>
                        <td className="p-2">{new Date(response.date).toLocaleDateString("pt-BR")}</td>
                        <td className="p-2">
                          {response.status === "completed" && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completo
                            </Badge>
                          )}
                          {response.status === "partial" && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Parcial
                            </Badge>
                          )}
                          {response.status === "pending" && (
                            <Badge className="bg-gray-100 text-gray-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
                <CardDescription>Percentual de questionários por área de saúde</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insights de Participação</CardTitle>
                <CardDescription>Análises sobre engajamento dos colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Alta Participação</h4>
                    <p className="text-sm text-green-600">Questionários de saúde mental têm 87% de taxa de resposta</p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Atenção Necessária</h4>
                    <p className="text-sm text-yellow-600">Departamento de Operações com 74% de participação</p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Oportunidade</h4>
                    <p className="text-sm text-blue-600">Questionários mais curtos têm 15% mais engajamento</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Tendência</h4>
                    <p className="text-sm text-purple-600">Participação aumentou 12% nos últimos 3 meses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Análise de Correlações */}
          <Card>
            <CardHeader>
              <CardTitle>Correlações Identificadas</CardTitle>
              <CardDescription>Relações entre diferentes aspectos da saúde dos colaboradores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Correlações Positivas</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg bg-green-50">
                      <h5 className="font-medium text-sm text-green-800">Sono ↔ Produtividade</h5>
                      <p className="text-xs text-green-600">
                        Correlação: 0.78 | Melhor qualidade do sono = maior produtividade
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-blue-50">
                      <h5 className="font-medium text-sm text-blue-800">Exercício ↔ Bem-estar Mental</h5>
                      <p className="text-xs text-blue-600">
                        Correlação: 0.65 | Atividade física regular melhora saúde mental
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-purple-50">
                      <h5 className="font-medium text-sm text-purple-800">Nutrição ↔ Energia</h5>
                      <p className="text-xs text-purple-600">
                        Correlação: 0.72 | Alimentação saudável aumenta níveis de energia
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Correlações Negativas</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg bg-red-50">
                      <h5 className="font-medium text-sm text-red-800">Estresse ↔ Qualidade do Sono</h5>
                      <p className="text-xs text-red-600">
                        Correlação: -0.82 | Alto estresse prejudica qualidade do sono
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-orange-50">
                      <h5 className="font-medium text-sm text-orange-800">Burnout ↔ Engajamento</h5>
                      <p className="text-xs text-orange-600">
                        Correlação: -0.75 | Sinais de burnout reduzem engajamento
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-yellow-50">
                      <h5 className="font-medium text-sm text-yellow-800">Sedentarismo ↔ Humor</h5>
                      <p className="text-xs text-yellow-600">
                        Correlação: -0.58 | Falta de exercício afeta humor negativamente
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Relatórios de Questionários</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </Button>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </div>

          {/* Relatórios Disponíveis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Relatório Mensal de Burnout",
                description: "Análise completa dos indicadores de burnout",
                period: "Junho 2024",
                status: "ready",
                size: "2.3 MB",
                format: "PDF",
              },
              {
                title: "Análise de Qualidade do Sono",
                description: "Padrões de sono dos colaboradores",
                period: "Junho 2024",
                status: "ready",
                size: "1.8 MB",
                format: "Excel",
              },
              {
                title: "Dashboard de Estresse",
                description: "Níveis de estresse por departamento",
                period: "Junho 2024",
                status: "processing",
                size: "1.2 MB",
                format: "PDF",
              },
              {
                title: "Relatório Nutricional",
                description: "Hábitos alimentares e recomendações",
                period: "Maio 2024",
                status: "ready",
                size: "3.1 MB",
                format: "PDF",
              },
              {
                title: "Análise de Atividade Física",
                description: "Padrões de exercício e movimento",
                period: "Junho 2024",
                status: "ready",
                size: "2.7 MB",
                format: "Excel",
              },
              {
                title: "Relatório de Engajamento",
                description: "Níveis de motivação e satisfação",
                period: "Junho 2024",
                status: "scheduled",
                size: "1.5 MB",
                format: "PDF",
              },
            ].map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        report.status === "ready" ? "default" : report.status === "processing" ? "secondary" : "outline"
                      }
                    >
                      {report.status === "ready" && "Pronto"}
                      {report.status === "processing" && "Processando"}
                      {report.status === "scheduled" && "Agendado"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Período:</span>
                        <div className="font-medium">{report.period}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Formato:</span>
                        <div className="font-medium">{report.format}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tamanho:</span>
                        <div className="font-medium">{report.size}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <div className="font-medium capitalize">{report.status}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" disabled={report.status !== "ready"}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Configurações de Relatórios */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Relatórios Automáticos</CardTitle>
              <CardDescription>Configure a geração automática de relatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Relatório Semanal de Participação",
                    description: "Resumo das taxas de resposta por departamento",
                    frequency: "Semanal",
                    enabled: true,
                  },
                  {
                    name: "Dashboard Mensal de Saúde",
                    description: "Análise consolidada de todos os questionários",
                    frequency: "Mensal",
                    enabled: true,
                  },
                  {
                    name: "Alerta de Baixa Participação",
                    description: "Notificação quando taxa de resposta < 70%",
                    frequency: "Tempo Real",
                    enabled: false,
                  },
                  {
                    name: "Relatório Trimestral Executivo",
                    description: "Resumo executivo para liderança",
                    frequency: "Trimestral",
                    enabled: true,
                  },
                ].map((config, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{config.name}</h4>
                      <p className="text-sm text-muted-foreground">{config.description}</p>
                      <div className="text-xs text-muted-foreground mt-1">Frequência: {config.frequency}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={config.enabled ? "default" : "outline"}>
                        {config.enabled ? "Ativo" : "Inativo"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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
