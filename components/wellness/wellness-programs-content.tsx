"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Activity,
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Download,
  Search,
  Filter,
  Stethoscope,
  Brain,
  Dumbbell,
  Apple,
  Shield,
  Cigarette,
  Zap,
  Phone,
  Mail,
  Star,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

export function WellnessProgramsContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("2024")
  const [selectedProgram, setSelectedProgram] = useState("all")

  // Dados dos programas de bem-estar corporativo
  const wellnessPrograms = [
    {
      id: 1,
      name: "Programa Antitabagismo",
      category: "Prevenção",
      icon: Cigarette,
      status: "Ativo",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      participants: {
        enrolled: 89,
        active: 67,
        completed: 22,
        dropped: 0,
      },
      budget: {
        allocated: 45000,
        spent: 28500,
        remaining: 16500,
      },
      metrics: {
        successRate: 78,
        satisfaction: 4.6,
        costPerParticipant: 506,
        roiEstimated: 340,
      },
      outcomes: {
        smokersReduced: 22,
        avgCigarettesReduced: 15,
        healthImprovements: 18,
        absenteeismReduction: 12,
      },
      provider: "Instituto do Coração - InCor",
      coordinator: "Dr. Maria Silva",
      nextMilestone: "Avaliação trimestral - 15/04/2024",
    },
    {
      id: 2,
      name: "Check-up Preventivo Executivo",
      category: "Prevenção",
      icon: Stethoscope,
      status: "Ativo",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      participants: {
        enrolled: 156,
        active: 134,
        completed: 89,
        dropped: 3,
      },
      budget: {
        allocated: 125000,
        spent: 78000,
        remaining: 47000,
      },
      metrics: {
        successRate: 92,
        satisfaction: 4.8,
        costPerParticipant: 801,
        roiEstimated: 280,
      },
      outcomes: {
        diseasesDetected: 23,
        earlyInterventions: 18,
        riskFactorsIdentified: 67,
        followUpScheduled: 45,
      },
      provider: "Hospital Sírio-Libanês",
      coordinator: "Dr. Carlos Mendes",
      nextMilestone: "Relatório semestral - 01/07/2024",
    },
    {
      id: 3,
      name: "Ginástica Laboral",
      category: "Atividade Física",
      icon: Dumbbell,
      status: "Ativo",
      startDate: "2024-01-08",
      endDate: "2024-12-20",
      participants: {
        enrolled: 234,
        active: 198,
        completed: 0,
        dropped: 12,
      },
      budget: {
        allocated: 68000,
        spent: 22500,
        remaining: 45500,
      },
      metrics: {
        successRate: 85,
        satisfaction: 4.4,
        costPerParticipant: 291,
        roiEstimated: 420,
      },
      outcomes: {
        painReduction: 156,
        postureImprovement: 134,
        stressReduction: 89,
        productivityIncrease: 23,
      },
      provider: "FisioWork Corporativo",
      coordinator: "Ft. Ana Paula Santos",
      nextMilestone: "Avaliação postural - 20/04/2024",
    },
    {
      id: 4,
      name: "Programa Saúde Mental",
      category: "Saúde Mental",
      icon: Brain,
      status: "Ativo",
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      participants: {
        enrolled: 178,
        active: 145,
        completed: 34,
        dropped: 8,
      },
      budget: {
        allocated: 89000,
        spent: 31500,
        remaining: 57500,
      },
      metrics: {
        successRate: 81,
        satisfaction: 4.7,
        costPerParticipant: 500,
        roiEstimated: 380,
      },
      outcomes: {
        stressReduction: 89,
        burnoutPrevention: 23,
        therapySessions: 267,
        wellbeingImprovement: 112,
      },
      provider: "Zenklub + Vittude",
      coordinator: "Psic. Juliana Costa",
      nextMilestone: "Workshop mindfulness - 25/04/2024",
    },
    {
      id: 5,
      name: "Campanha de Vacinação",
      category: "Prevenção",
      icon: Shield,
      status: "Concluído",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      participants: {
        enrolled: 287,
        active: 0,
        completed: 267,
        dropped: 20,
      },
      budget: {
        allocated: 25000,
        spent: 23400,
        remaining: 1600,
      },
      metrics: {
        successRate: 93,
        satisfaction: 4.9,
        costPerParticipant: 87,
        roiEstimated: 650,
      },
      outcomes: {
        vaccinated: 267,
        fluPrevention: 89,
        absenteeismReduction: 34,
        outbreaksPrevented: 2,
      },
      provider: "Clínica Vacinar",
      coordinator: "Enf. Roberto Lima",
      nextMilestone: "Relatório final - Concluído",
    },
    {
      id: 6,
      name: "Programa Nutricional",
      category: "Nutrição",
      icon: Apple,
      status: "Planejado",
      startDate: "2024-05-01",
      endDate: "2024-10-31",
      participants: {
        enrolled: 0,
        active: 0,
        completed: 0,
        dropped: 0,
      },
      budget: {
        allocated: 72000,
        spent: 0,
        remaining: 72000,
      },
      metrics: {
        successRate: 0,
        satisfaction: 0,
        costPerParticipant: 0,
        roiEstimated: 290,
      },
      outcomes: {
        weightLoss: 0,
        habitsImproved: 0,
        chronicDiseaseControl: 0,
        energyIncrease: 0,
      },
      provider: "NutriCorp",
      coordinator: "Nut. Patricia Oliveira",
      nextMilestone: "Kick-off meeting - 01/05/2024",
    },
  ]

  // Dados de ROI consolidado
  const roiData = [
    { program: "Vacinação", investment: 25000, savings: 162500, roi: 650 },
    { program: "Ginástica Laboral", investment: 68000, savings: 285600, roi: 420 },
    { program: "Saúde Mental", investment: 89000, savings: 338200, roi: 380 },
    { program: "Antitabagismo", investment: 45000, savings: 153000, roi: 340 },
    { program: "Check-up", investment: 125000, savings: 350000, roi: 280 },
    { program: "Nutrição", investment: 72000, savings: 208800, roi: 290 },
  ]

  // Dados de participação por departamento
  const participationByDept = [
    { dept: "Tecnologia", employees: 87, enrolled: 67, participation: 77 },
    { dept: "Vendas", employees: 64, enrolled: 52, participation: 81 },
    { dept: "Marketing", employees: 42, enrolled: 31, participation: 74 },
    { dept: "RH", employees: 28, enrolled: 25, participation: 89 },
    { dept: "Financeiro", employees: 35, enrolled: 28, participation: 80 },
    { dept: "Operações", employees: 156, enrolled: 118, participation: 76 },
  ]

  // Dados de evolução temporal
  const timelineData = [
    { month: "Jan", participants: 89, programs: 3, satisfaction: 4.2, roi: 280 },
    { month: "Fev", participants: 156, programs: 4, satisfaction: 4.4, roi: 320 },
    { month: "Mar", participants: 234, programs: 5, satisfaction: 4.6, roi: 380 },
    { month: "Abr", participants: 287, programs: 6, satisfaction: 4.7, roi: 420 },
    { month: "Mai", participants: 298, programs: 6, satisfaction: 4.8, roi: 450 },
    { month: "Jun", participants: 312, programs: 6, satisfaction: 4.9, roi: 480 },
  ]

  // Dados de impacto na saúde
  const healthImpactData = [
    { metric: "Redução Absenteísmo", before: 4.2, after: 2.8, improvement: 33 },
    { metric: "Melhoria Produtividade", before: 78, after: 92, improvement: 18 },
    { metric: "Satisfação Colaboradores", before: 3.6, after: 4.7, improvement: 31 },
    { metric: "Engajamento", before: 65, after: 83, improvement: 28 },
    { metric: "Wellbeing Score", before: 6.2, after: 8.1, improvement: 31 },
  ]

  // Fornecedores e parceiros
  const providers = [
    {
      id: 1,
      name: "Hospital Sírio-Libanês",
      category: "Check-ups",
      rating: 4.8,
      programs: 2,
      participants: 245,
      contract: "Anual",
      cost: 125000,
      performance: 92,
      contact: "contato@sirio.com.br",
      phone: "(11) 3155-0200",
    },
    {
      id: 2,
      name: "Zenklub",
      category: "Saúde Mental",
      rating: 4.7,
      programs: 1,
      participants: 178,
      contract: "Anual",
      cost: 89000,
      performance: 89,
      contact: "corporativo@zenklub.com",
      phone: "(11) 3456-7890",
    },
    {
      id: 3,
      name: "FisioWork",
      category: "Fisioterapia",
      rating: 4.4,
      programs: 1,
      participants: 234,
      contract: "Anual",
      cost: 68000,
      performance: 85,
      contact: "comercial@fisiowork.com.br",
      phone: "(11) 2345-6789",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800 border-green-200"
      case "Concluído":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Planejado":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Pausado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Prevenção":
        return "text-blue-600"
      case "Atividade Física":
        return "text-green-600"
      case "Saúde Mental":
        return "text-purple-600"
      case "Nutrição":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Programas de Bem-Estar Corporativo</h2>
        <p className="text-muted-foreground mt-2">
          Gestão completa dos programas de saúde e bem-estar com análise de ROI e impacto organizacional
        </p>
      </div>

      {/* Filtros e controles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024 - Ano Completo</SelectItem>
              <SelectItem value="2023">2023 - Ano Completo</SelectItem>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q2-2024">Q2 2024</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Programa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Programas</SelectItem>
              <SelectItem value="prevention">Prevenção</SelectItem>
              <SelectItem value="physical">Atividade Física</SelectItem>
              <SelectItem value="mental">Saúde Mental</SelectItem>
              <SelectItem value="nutrition">Nutrição</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Buscar programa..." className="pl-10 w-[200px]" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Relatório
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Programa
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="programs">Programas Ativos</TabsTrigger>
          <TabsTrigger value="roi">ROI & Impacto</TabsTrigger>
          <TabsTrigger value="participation">Participação</TabsTrigger>
          <TabsTrigger value="providers">Fornecedores</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Programas Ativos</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">6</div>
                <p className="text-xs text-muted-foreground">2 planejados para Q2</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+2 vs trimestre anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Participantes Ativos</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">544</div>
                <p className="text-xs text-muted-foreground">78% dos colaboradores</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+23% vs ano anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">390%</div>
                <p className="text-xs text-muted-foreground">R$ 3.90 para cada R$ 1</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Acima da meta (300%)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Satisfação Geral</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">4.7</div>
                <p className="text-xs text-muted-foreground">de 5.0 estrelas</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+0.5 vs ano anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo dos Programas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Programas por Status</CardTitle>
                <CardDescription>Distribuição atual dos programas de bem-estar</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: "Ativos", value: 4, color: "#22c55e" },
                        { name: "Concluídos", value: 1, color: "#3b82f6" },
                        { name: "Planejados", value: 1, color: "#f59e0b" },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: "Ativos", value: 4, color: "#22c55e" },
                        { name: "Concluídos", value: 1, color: "#3b82f6" },
                        { name: "Planejados", value: 1, color: "#f59e0b" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução de Participação</CardTitle>
                <CardDescription>Crescimento da adesão aos programas</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="participants"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Participantes"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Satisfação"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Impacto na Saúde */}
          <Card>
            <CardHeader>
              <CardTitle>Impacto dos Programas na Saúde Organizacional</CardTitle>
              <CardDescription>Comparativo antes vs depois da implementação dos programas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthImpactData.map((impact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{impact.metric}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Antes:</span>
                          <span className="font-medium">{impact.before}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Depois:</span>
                          <span className="font-medium text-green-600">{impact.after}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">+{impact.improvement}%</div>
                      <div className="text-xs text-muted-foreground">Melhoria</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wellnessPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(program.category)} bg-opacity-10`}>
                        <program.icon className={`h-6 w-6 ${getCategoryColor(program.category)}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <CardDescription>{program.category}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Informações básicas */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Período:</span>
                      <div className="font-medium">
                        {new Date(program.startDate).toLocaleDateString()} -{" "}
                        {new Date(program.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Coordenador:</span>
                      <div className="font-medium">{program.coordinator}</div>
                    </div>
                  </div>

                  {/* Participação */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Participação</span>
                      <span className="font-medium">
                        {program.participants.active}/{program.participants.enrolled} ativos
                      </span>
                    </div>
                    <Progress
                      value={
                        program.participants.enrolled > 0
                          ? (program.participants.active / program.participants.enrolled) * 100
                          : 0
                      }
                    />
                  </div>

                  {/* Orçamento */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Orçamento Utilizado</span>
                      <span className="font-medium">
                        R$ {program.budget.spent.toLocaleString()} / R$ {program.budget.allocated.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(program.budget.spent / program.budget.allocated) * 100} />
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{program.metrics.successRate}%</div>
                      <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{program.metrics.satisfaction}</div>
                      <div className="text-xs text-muted-foreground">Satisfação</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{program.metrics.roiEstimated}%</div>
                      <div className="text-xs text-muted-foreground">ROI Estimado</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">R$ {program.metrics.costPerParticipant}</div>
                      <div className="text-xs text-muted-foreground">Custo/Participante</div>
                    </div>
                  </div>

                  {/* Próximo marco */}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Próximo Marco:</span>
                    </div>
                    <div className="text-sm mt-1">{program.nextMilestone}</div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      Detalhes
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Gerenciar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          {/* ROI por Programa */}
          <Card>
            <CardHeader>
              <CardTitle>ROI por Programa de Bem-Estar</CardTitle>
              <CardDescription>Retorno sobre investimento e economia gerada</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="program" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "roi" ? `${value}%` : `R$ ${value.toLocaleString()}`,
                      name === "investment" ? "Investimento" : name === "savings" ? "Economia" : "ROI",
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="investment" fill="#ef4444" name="Investimento" />
                  <Bar yAxisId="left" dataKey="savings" fill="#22c55e" name="Economia" />
                  <Bar yAxisId="right" dataKey="roi" fill="#8b5cf6" name="ROI %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Resumo Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Investimento Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">R$ 424K</div>
                <p className="text-xs text-muted-foreground">Orçamento alocado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Economia Gerada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 1.5M</div>
                <p className="text-xs text-muted-foreground">Redução de custos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">ROI Consolidado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">354%</div>
                <p className="text-xs text-muted-foreground">Retorno médio</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Payback Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">8.2</div>
                <p className="text-xs text-muted-foreground">Meses</p>
              </CardContent>
            </Card>
          </div>

          {/* Detalhamento de Economia */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento da Economia por Categoria</CardTitle>
              <CardDescription>Onde os programas geram mais valor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Redução Absenteísmo", value: 456000, percentage: 30.4 },
                  { category: "Menor Sinistralidade", value: 389000, percentage: 25.9 },
                  { category: "Aumento Produtividade", value: 334000, percentage: 22.3 },
                  { category: "Redução Turnover", value: 198000, percentage: 13.2 },
                  { category: "Prevenção Doenças", value: 123000, percentage: 8.2 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.category}</h4>
                      <div className="mt-1">
                        <Progress value={item.percentage} />
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-green-600">R$ {item.value.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participation" className="space-y-6">
          {/* Participação por Departamento */}
          <Card>
            <CardHeader>
              <CardTitle>Participação por Departamento</CardTitle>
              <CardDescription>Taxa de adesão aos programas por área</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participationByDept}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dept" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="employees" fill="#e5e7eb" name="Total Colaboradores" />
                  <Bar dataKey="enrolled" fill="#3b82f6" name="Inscritos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabela Detalhada */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento por Departamento</CardTitle>
              <CardDescription>Análise detalhada da participação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Departamento</th>
                      <th className="text-right p-3">Colaboradores</th>
                      <th className="text-right p-3">Inscritos</th>
                      <th className="text-right p-3">Taxa Participação</th>
                      <th className="text-right p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participationByDept.map((dept, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{dept.dept}</td>
                        <td className="p-3 text-right">{dept.employees}</td>
                        <td className="p-3 text-right">{dept.enrolled}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-medium">{dept.participation}%</span>
                            <div className="w-16">
                              <Progress value={dept.participation} />
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Badge
                            variant={
                              dept.participation >= 80
                                ? "default"
                                : dept.participation >= 70
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {dept.participation >= 80 ? "Excelente" : dept.participation >= 70 ? "Bom" : "Atenção"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          {/* Cards dos Fornecedores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <CardDescription>{provider.category}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{provider.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Programas:</span>
                      <div className="font-medium">{provider.programs}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Participantes:</span>
                      <div className="font-medium">{provider.participants}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Contrato:</span>
                      <div className="font-medium">{provider.contract}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Performance:</span>
                      <div className="font-medium">{provider.performance}%</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Performance</span>
                      <span>{provider.performance}%</span>
                    </div>
                    <Progress value={provider.performance} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span>{provider.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{provider.phone}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-lg font-bold">R$ {provider.cost.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Custo anual</div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      Detalhes
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Contrato
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resumo de Fornecedores */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Fornecedores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Avaliação Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6</div>
                <p className="text-xs text-muted-foreground">de 5.0 estrelas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Performance Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">88%</div>
                <p className="text-xs text-muted-foreground">SLA cumprido</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custo Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 424K</div>
                <p className="text-xs text-muted-foreground">Anual</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Tendências */}
          <Card>
            <CardHeader>
              <CardTitle>Tendências dos Programas</CardTitle>
              <CardDescription>Evolução de participação, satisfação e ROI</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="participants"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="Participantes"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Satisfação"
                  />
                  <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#ffc658" strokeWidth={2} name="ROI %" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Insights e Recomendações</CardTitle>
              <CardDescription>Análises baseadas em dados e IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Sucesso Comprovado</h4>
                  </div>
                  <p className="text-sm text-green-700">
                    Programas de prevenção apresentam ROI 40% superior aos demais. Recomenda-se expansão desta
                    categoria.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Oportunidade Identificada</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Departamento de Marketing tem baixa adesão (74%). Sugere-se campanha direcionada de engajamento.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">Predição IA</h4>
                  </div>
                  <p className="text-sm text-purple-700">
                    Com base nos padrões atuais, espera-se ROI de 420% nos próximos 12 meses com os programas ativos.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <h4 className="font-semibold text-amber-800">Atenção Necessária</h4>
                  </div>
                  <p className="text-sm text-amber-700">
                    Programa de Ginástica Laboral com 12 desistências. Revisar metodologia e feedback dos participantes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
