"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUp,
  TrendingUp,
  Star,
  Plus,
  Eye,
  Edit,
  Download,
  Search,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  Trophy,
  Heart,
  Brain,
  Users,
  Calendar,
  MessageSquare,
  Award,
  Zap,
  BarChart3,
  DollarSign,
  Filter,
  RefreshCw,
  MapPin,
  GraduationCap,
  Shield,
} from "lucide-react"

export default function PerformanceEvaluation() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // Dados mais robustos e realistas
  const performanceKPIs = [
    {
      label: "Performance Score Médio",
      value: "4.2",
      subValue: "de 5.0",
      trend: "up",
      change: "+0.3",
      icon: Target,
      color: "blue",
    },
    {
      label: "Metas Atingidas",
      value: "78%",
      subValue: "234 de 300",
      trend: "up",
      change: "+12%",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Avaliações Pendentes",
      value: "23",
      subValue: "Vencimento em 7 dias",
      trend: "down",
      change: "Ação necessária",
      icon: Clock,
      color: "amber",
    },
    {
      label: "Correlação Saúde",
      value: "0.82",
      subValue: "Wellbeing x Performance",
      trend: "up",
      change: "Correlação forte",
      icon: Heart,
      color: "purple",
    },
    {
      label: "Feedback 360° Completos",
      value: "92%",
      subValue: "456 de 495",
      trend: "up",
      change: "+8%",
      icon: Users,
      color: "indigo",
    },
    {
      label: "PDIs Ativos",
      value: "187",
      subValue: "Planos em andamento",
      trend: "up",
      change: "+24",
      icon: GraduationCap,
      color: "emerald",
    },
  ]

  // Dados de performance por departamento com mais detalhes
  const departmentPerformance = [
    {
      dept: "Tecnologia",
      performance: 4.3,
      employees: 87,
      topPerformers: 23,
      needsAttention: 8,
      avgSalary: "R$ 12.500",
      turnover: "6.2%",
      satisfaction: 4.1,
      healthScore: 8.2,
    },
    {
      dept: "Vendas",
      performance: 4.5,
      employees: 64,
      topPerformers: 19,
      needsAttention: 5,
      avgSalary: "R$ 8.900",
      turnover: "12.1%",
      satisfaction: 4.3,
      healthScore: 7.8,
    },
    {
      dept: "Marketing",
      performance: 3.9,
      employees: 42,
      topPerformers: 8,
      needsAttention: 12,
      avgSalary: "R$ 7.200",
      turnover: "8.7%",
      satisfaction: 3.8,
      healthScore: 7.5,
    },
    {
      dept: "RH",
      performance: 4.1,
      employees: 28,
      topPerformers: 7,
      needsAttention: 4,
      avgSalary: "R$ 6.800",
      turnover: "5.3%",
      satisfaction: 4.0,
      healthScore: 8.0,
    },
    {
      dept: "Financeiro",
      performance: 4.0,
      employees: 35,
      topPerformers: 9,
      needsAttention: 6,
      avgSalary: "R$ 9.100",
      turnover: "7.8%",
      satisfaction: 3.9,
      healthScore: 7.6,
    },
  ]

  // Dados de competências organizacionais expandidos
  const competencyMatrix = [
    {
      competency: "Liderança",
      current: 3.8,
      target: 4.2,
      gap: -0.4,
      priority: "Alta",
      employees: 145,
      topPerformers: 23,
      trainingHours: 240,
      budget: "R$ 85.000",
    },
    {
      competency: "Comunicação",
      current: 4.1,
      target: 4.0,
      gap: 0.1,
      priority: "Média",
      employees: 256,
      topPerformers: 67,
      trainingHours: 180,
      budget: "R$ 45.000",
    },
    {
      competency: "Inovação",
      current: 3.6,
      target: 4.5,
      gap: -0.9,
      priority: "Crítica",
      employees: 198,
      topPerformers: 18,
      trainingHours: 320,
      budget: "R$ 120.000",
    },
    {
      competency: "Colaboração",
      current: 4.3,
      target: 4.2,
      gap: 0.1,
      priority: "Baixa",
      employees: 287,
      topPerformers: 89,
      trainingHours: 120,
      budget: "R$ 30.000",
    },
    {
      competency: "Orientação a Resultados",
      current: 4.0,
      target: 4.3,
      gap: -0.3,
      priority: "Alta",
      employees: 234,
      topPerformers: 45,
      trainingHours: 200,
      budget: "R$ 65.000",
    },
    {
      competency: "Adaptabilidade",
      current: 3.9,
      target: 4.1,
      gap: -0.2,
      priority: "Média",
      employees: 189,
      topPerformers: 34,
      trainingHours: 160,
      budget: "R$ 50.000",
    },
  ]

  // Dados de correlação saúde x performance mais detalhados
  const healthPerformanceCorrelation = [
    {
      wellbeing: 8.5,
      performance: 4.6,
      absenteeism: 0.8,
      engagement: 92,
      name: "João Silva",
      department: "Tech",
      salary: 15000,
      tenure: 3.2,
    },
    {
      wellbeing: 7.2,
      performance: 4.1,
      absenteeism: 2.1,
      engagement: 78,
      name: "Maria Santos",
      department: "Sales",
      salary: 9500,
      tenure: 1.8,
    },
    {
      wellbeing: 6.8,
      performance: 3.8,
      absenteeism: 3.2,
      engagement: 65,
      name: "Pedro Costa",
      department: "Marketing",
      salary: 7200,
      tenure: 2.5,
    },
    {
      wellbeing: 8.1,
      performance: 4.4,
      absenteeism: 1.5,
      engagement: 88,
      name: "Ana Oliveira",
      department: "Tech",
      salary: 13500,
      tenure: 4.1,
    },
    {
      wellbeing: 5.9,
      performance: 3.2,
      absenteeism: 4.8,
      engagement: 52,
      name: "Carlos Lima",
      department: "Finance",
      salary: 8800,
      tenure: 0.9,
    },
    {
      wellbeing: 7.8,
      performance: 4.2,
      absenteeism: 1.8,
      engagement: 82,
      name: "Lucia Ferreira",
      department: "HR",
      salary: 6800,
      tenure: 2.8,
    },
  ]

  // Top performers com dados mais ricos
  const topPerformers = [
    {
      id: 1,
      name: "Ana Ramos",
      role: "Tech Lead",
      department: "Tecnologia",
      performance: 4.8,
      photo: "/placeholder.svg?height=40&width=40",
      achievements: ["Projeto Cloud Migration", "Mentoria 15 devs", "Redução bugs 40%"],
      nextGoals: ["Arquitetura Microserviços", "Certificação AWS"],
      healthScore: 8.9,
      engagement: 95,
      salary: "R$ 18.500",
      lastPromotion: "Jan 2024",
    },
    {
      id: 2,
      name: "Carlos Menezes",
      role: "Sales Manager",
      department: "Vendas",
      performance: 4.7,
      photo: "/placeholder.svg?height=40&width=40",
      achievements: ["150% da meta Q1", "5 novos clientes enterprise", "Team NPS 4.6"],
      nextGoals: ["Expansão LATAM", "Certificação Salesforce"],
      healthScore: 8.1,
      engagement: 91,
      salary: "R$ 15.200",
      lastPromotion: "Mar 2024",
    },
    {
      id: 3,
      name: "Juliana Silva",
      role: "Marketing Director",
      department: "Marketing",
      performance: 4.6,
      photo: "/placeholder.svg?height=40&width=40",
      achievements: ["CAC reduzido 30%", "Brand awareness +45%", "ROI campanhas 320%"],
      nextGoals: ["Marketing Automation", "Growth Hacking"],
      healthScore: 7.8,
      engagement: 89,
      salary: "R$ 14.800",
      lastPromotion: "Nov 2023",
    },
  ]

  // Dados de performance individual mais detalhados
  const individualPerformanceData = [
    {
      id: 1,
      name: "Ana Silva",
      role: "Desenvolvedora Senior",
      department: "Tecnologia",
      photo: "/placeholder.svg?height=60&width=60",
      overallScore: 4.2,
      goals: { completed: 8, total: 10, score: 4.0 },
      competencies: {
        technical: 4.5,
        leadership: 3.8,
        communication: 4.2,
        innovation: 4.1,
        collaboration: 4.3,
      },
      feedback360: {
        peers: 4.1,
        manager: 4.3,
        subordinates: 4.0,
        clients: null,
        selfAssessment: 4.0,
      },
      healthCorrelation: {
        wellbeing: 8.2,
        absenteeism: 1.2,
        engagement: 85,
        stressLevel: 3.2,
        workLifeBalance: 7.8,
      },
      development: [
        { skill: "Liderança de Equipes", progress: 60, priority: "Alta" },
        { skill: "Arquitetura de Software", progress: 80, priority: "Média" },
      ],
      achievements: ["Migração sistema legado", "Mentoria 3 juniores", "Code review champion"],
      nextGoals: ["Tech Lead", "Certificação Kubernetes", "Palestra TechTalk"],
      lastReview: "2024-03-15",
      nextReview: "2024-06-15",
      salary: "R$ 12.500",
      tenure: "2.3 anos",
      location: "São Paulo - SP",
      manager: "Roberto Alves",
    },
    {
      id: 2,
      name: "Carlos Santos",
      role: "Gerente de Vendas",
      department: "Vendas",
      photo: "/placeholder.svg?height=60&width=60",
      overallScore: 4.6,
      goals: { completed: 9, total: 10, score: 4.5 },
      competencies: {
        technical: 4.2,
        leadership: 4.8,
        communication: 4.7,
        innovation: 4.0,
        collaboration: 4.5,
      },
      feedback360: {
        peers: 4.4,
        manager: 4.7,
        subordinates: 4.5,
        clients: 4.6,
        selfAssessment: 4.3,
      },
      healthCorrelation: {
        wellbeing: 7.8,
        absenteeism: 2.1,
        engagement: 92,
        stressLevel: 4.1,
        workLifeBalance: 6.9,
      },
      development: [
        { skill: "Gestão Estratégica", progress: 45, priority: "Alta" },
        { skill: "Negociação Avançada", progress: 70, priority: "Média" },
      ],
      achievements: ["130% da meta Q1", "Novo cliente enterprise", "Team building champion"],
      nextGoals: ["Diretor Regional", "MBA Executivo", "Expansão Nordeste"],
      lastReview: "2024-03-10",
      nextReview: "2024-06-10",
      salary: "R$ 15.200",
      tenure: "1.8 anos",
      location: "Rio de Janeiro - RJ",
      manager: "Patricia Lima",
    },
    {
      id: 3,
      name: "Maria Oliveira",
      role: "Analista de Marketing",
      department: "Marketing",
      photo: "/placeholder.svg?height=60&width=60",
      overallScore: 3.8,
      goals: { completed: 6, total: 10, score: 3.5 },
      competencies: {
        technical: 4.0,
        leadership: 3.2,
        communication: 4.1,
        innovation: 3.8,
        collaboration: 3.9,
      },
      feedback360: {
        peers: 3.9,
        manager: 3.8,
        subordinates: null,
        clients: 4.0,
        selfAssessment: 3.7,
      },
      healthCorrelation: {
        wellbeing: 6.5,
        absenteeism: 4.2,
        engagement: 68,
        stressLevel: 5.8,
        workLifeBalance: 5.2,
      },
      development: [
        { skill: "Análise de Dados", progress: 30, priority: "Crítica" },
        { skill: "Liderança Situacional", progress: 25, priority: "Alta" },
      ],
      achievements: ["Campanha viral LinkedIn", "ROI +25%", "Curso Google Analytics"],
      nextGoals: ["Marketing Specialist", "Certificação HubSpot", "Liderar projeto"],
      lastReview: "2024-03-20",
      nextReview: "2024-06-20",
      salary: "R$ 7.200",
      tenure: "0.9 anos",
      location: "São Paulo - SP",
      manager: "Juliana Silva",
    },
  ]

  // OKRs mais detalhados
  const okrData = [
    {
      department: "Tecnologia",
      objectives: [
        {
          title: "Modernizar Infraestrutura Tecnológica",
          progress: 75,
          owner: "Roberto Alves",
          deadline: "Q2 2024",
          budget: "R$ 850.000",
          impact: "Redução custos 30%",
          keyResults: [
            {
              kr: "Migrar 80% dos sistemas para cloud AWS",
              progress: 85,
              status: "on-track",
              responsible: "Ana Silva",
              deadline: "Mai 2024",
            },
            {
              kr: "Reduzir downtime em 50% (atual: 2.1h/mês)",
              progress: 65,
              status: "at-risk",
              responsible: "Pedro Santos",
              deadline: "Jun 2024",
            },
            {
              kr: "Implementar CI/CD em 100% dos projetos",
              progress: 90,
              status: "completed",
              responsible: "Equipe DevOps",
              deadline: "Abr 2024",
            },
          ],
        },
        {
          title: "Melhorar Experiência do Desenvolvedor",
          progress: 60,
          owner: "Ana Silva",
          deadline: "Q3 2024",
          budget: "R$ 120.000",
          impact: "Produtividade +25%",
          keyResults: [
            {
              kr: "Aumentar Developer NPS para 8.5 (atual: 7.2)",
              progress: 70,
              status: "on-track",
              responsible: "Tech Leads",
              deadline: "Jul 2024",
            },
            {
              kr: "Reduzir tempo de build em 40%",
              progress: 45,
              status: "at-risk",
              responsible: "DevOps Team",
              deadline: "Ago 2024",
            },
            {
              kr: "Implementar 5 ferramentas de produtividade",
              progress: 80,
              status: "on-track",
              responsible: "Ana Silva",
              deadline: "Jun 2024",
            },
          ],
        },
      ],
    },
    {
      department: "Vendas",
      objectives: [
        {
          title: "Acelerar Crescimento de Receita",
          progress: 85,
          owner: "Carlos Santos",
          deadline: "Q2 2024",
          budget: "R$ 450.000",
          impact: "Receita +35%",
          keyResults: [
            {
              kr: "Aumentar receita recorrente em 25%",
              progress: 90,
              status: "on-track",
              responsible: "Time Vendas",
              deadline: "Jun 2024",
            },
            {
              kr: "Conquistar 50 novos clientes enterprise",
              progress: 80,
              status: "on-track",
              responsible: "Carlos Santos",
              deadline: "Jul 2024",
            },
            {
              kr: "Melhorar taxa de conversão para 15%",
              progress: 85,
              status: "completed",
              responsible: "Marketing + Vendas",
              deadline: "Mai 2024",
            },
          ],
        },
      ],
    },
  ]

  // Dados de tendência de performance
  const performanceTrend = [
    { month: "Jan", performance: 3.8, engagement: 75, turnover: 8.2, satisfaction: 3.6 },
    { month: "Fev", performance: 3.9, engagement: 78, turnover: 7.8, satisfaction: 3.7 },
    { month: "Mar", performance: 4.1, engagement: 82, turnover: 7.5, satisfaction: 3.9 },
    { month: "Abr", performance: 4.0, engagement: 80, turnover: 8.1, satisfaction: 3.8 },
    { month: "Mai", performance: 4.2, engagement: 85, turnover: 7.2, satisfaction: 4.0 },
    { month: "Jun", performance: 4.3, engagement: 87, turnover: 6.8, satisfaction: 4.1 },
  ]

  // Distribuição de performance
  const performanceDistribution = [
    { name: "Excepcional (4.5-5.0)", value: 15, color: "#22c55e" },
    { name: "Acima da Média (4.0-4.4)", value: 35, color: "#3b82f6" },
    { name: "Atende Expectativas (3.5-3.9)", value: 40, color: "#f59e0b" },
    { name: "Abaixo da Média (3.0-3.4)", value: 8, color: "#ef4444" },
    { name: "Insatisfatório (<3.0)", value: 2, color: "#dc2626" },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600",
      amber: "text-amber-600",
      purple: "text-purple-600",
      indigo: "text-indigo-600",
      emerald: "text-emerald-600",
    }
    return colors[color] || "text-gray-600"
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Avaliação de Desempenho</h2>
        <p className="text-muted-foreground mt-2">
          Sistema integrado de gestão de performance com correlação de dados de saúde e bem-estar corporativo
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
              <SelectItem value="h1-2024">H1 2024</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Departamentos</SelectItem>
              <SelectItem value="tech">Tecnologia (87)</SelectItem>
              <SelectItem value="sales">Vendas (64)</SelectItem>
              <SelectItem value="marketing">Marketing (42)</SelectItem>
              <SelectItem value="hr">Recursos Humanos (28)</SelectItem>
              <SelectItem value="finance">Financeiro (35)</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Buscar colaborador..." className="pl-10 w-[220px]" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filtros Avançados
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Avaliação
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="individual">Avaliações Individuais</TabsTrigger>
          <TabsTrigger value="okrs">OKRs & Metas</TabsTrigger>
          <TabsTrigger value="feedback360">Feedback 360°</TabsTrigger>
          <TabsTrigger value="development">Desenvolvimento</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceKPIs.map((kpi, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
                  <kpi.icon className={`h-5 w-5 ${getColorClasses(kpi.color)}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getColorClasses(kpi.color)}`}>{kpi.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.subValue}</p>
                  <div
                    className={`mt-2 flex items-center text-xs ${
                      kpi.trend === "up" ? "text-green-500" : "text-amber-500"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    <span>{kpi.change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance por Departamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance por Departamento
              </CardTitle>
              <CardDescription>
                Análise comparativa de performance, satisfação e indicadores de saúde por área
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Colaboradores</TableHead>
                      <TableHead>Top Performers</TableHead>
                      <TableHead>Necessitam Atenção</TableHead>
                      <TableHead>Satisfação</TableHead>
                      <TableHead>Health Score</TableHead>
                      <TableHead>Turnover</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentPerformance.map((dept) => (
                      <TableRow key={dept.dept}>
                        <TableCell className="font-medium">{dept.dept}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-semibold">{dept.performance}</div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= dept.performance ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{dept.employees}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">{dept.topPerformers}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">{dept.needsAttention}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-pink-500" />
                            {dept.satisfaction}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-blue-500" />
                            {dept.healthScore}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={Number.parseFloat(dept.turnover) > 10 ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {dept.turnover}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Gráficos de correlação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Correlação Saúde × Performance</CardTitle>
                <CardDescription>Relação entre bem-estar e desempenho individual</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={healthPerformanceCorrelation}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="wellbeing" name="Wellbeing Score" domain={[5, 9]} />
                    <YAxis dataKey="performance" name="Performance Score" domain={[3, 5]} />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm text-muted-foreground">{data.department}</p>
                              <p className="text-sm">Wellbeing: {data.wellbeing}</p>
                              <p className="text-sm">Performance: {data.performance}</p>
                              <p className="text-sm">Engajamento: {data.engagement}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter dataKey="performance" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mapa de Competências</CardTitle>
                <CardDescription>Gap analysis das competências estratégicas</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competencyMatrix.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="competency" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar dataKey="current" fill="#3b82f6" name="Nível Atual" />
                    <Bar dataKey="target" fill="#10b981" name="Meta" opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Performers - Destaque do Período
              </CardTitle>
              <CardDescription>Colaboradores com performance excepcional e impacto organizacional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topPerformers.map((performer, index) => (
                  <div key={performer.id} className="relative p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={performer.photo || "/placeholder.svg"}
                          alt={performer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div
                          className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{performer.name}</h4>
                        <p className="text-sm text-muted-foreground">{performer.role}</p>
                        <Badge variant="outline" className="mt-1">
                          {performer.department}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{performer.performance}</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= performer.performance ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <h5 className="text-sm font-medium mb-1">Principais Conquistas</h5>
                        <div className="space-y-1">
                          {performer.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Health Score:</span>
                          <span className="ml-1 font-medium">{performer.healthScore}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Engajamento:</span>
                          <span className="ml-1 font-medium">{performer.engagement}%</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          Perfil
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Award className="h-3 w-3 mr-1" />
                          Reconhecer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {individualPerformanceData.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src={employee.photo || "/placeholder.svg"}
                      alt={employee.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <CardDescription>{employee.role}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{employee.department}</Badge>
                        <Badge variant="secondary" className="text-xs">
                          {employee.tenure}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Performance Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Performance Geral</span>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-blue-600">{employee.overallScore}</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= employee.overallScore ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Metas */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Metas Atingidas</span>
                      <span className="font-medium">
                        {employee.goals.completed}/{employee.goals.total}
                      </span>
                    </div>
                    <Progress value={(employee.goals.completed / employee.goals.total) * 100} />
                  </div>

                  {/* Competências */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="text-sm font-medium text-blue-600">{employee.competencies.technical}</div>
                      <div className="text-xs text-muted-foreground">Técnica</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <div className="text-sm font-medium text-green-600">{employee.competencies.leadership}</div>
                      <div className="text-xs text-muted-foreground">Liderança</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded">
                      <div className="text-sm font-medium text-purple-600">{employee.competencies.communication}</div>
                      <div className="text-xs text-muted-foreground">Comunicação</div>
                    </div>
                    <div className="p-2 bg-orange-50 rounded">
                      <div className="text-sm font-medium text-orange-600">{employee.competencies.innovation}</div>
                      <div className="text-xs text-muted-foreground">Inovação</div>
                    </div>
                  </div>

                  {/* Feedback 360 */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Feedback 360°</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span>Gestor:</span>
                        <span className="font-medium">{employee.feedback360.manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pares:</span>
                        <span className="font-medium">{employee.feedback360.peers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subordinados:</span>
                        <span className="font-medium">{employee.feedback360.subordinates || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Auto-avaliação:</span>
                        <span className="font-medium">{employee.feedback360.selfAssessment}</span>
                      </div>
                    </div>
                  </div>

                  {/* Correlação com Saúde */}
                  <div className="pt-2 border-t">
                    <h5 className="text-sm font-medium mb-2">Indicadores de Saúde</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span>Wellbeing:</span>
                        <span className="font-medium text-green-600">{employee.healthCorrelation.wellbeing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engajamento:</span>
                        <span className="font-medium text-blue-600">{employee.healthCorrelation.engagement}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Absenteísmo:</span>
                        <span className="font-medium text-red-600">{employee.healthCorrelation.absenteeism}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Work-Life:</span>
                        <span className="font-medium text-purple-600">
                          {employee.healthCorrelation.workLifeBalance}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Conquistas Recentes */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Conquistas Recentes</h5>
                    <div className="space-y-1">
                      {employee.achievements.slice(0, 2).map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <Trophy className="h-3 w-3 text-yellow-500" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{employee.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{employee.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Próxima: {new Date(employee.nextReview).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{employee.manager}</span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Avaliar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="okrs" className="space-y-6">
          {okrData.map((dept) => (
            <Card key={dept.department} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      OKRs - {dept.department}
                    </CardTitle>
                    <CardDescription>Objetivos e Resultados-Chave do departamento</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Novo OKR
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {dept.objectives.map((objective, objIndex) => (
                    <div key={objIndex} className="space-y-4 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{objective.title}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>Owner: {objective.owner}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{objective.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              <span>{objective.budget}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              <span>{objective.impact}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold">{objective.progress}%</div>
                            <div className="text-xs text-muted-foreground">Progresso</div>
                          </div>
                          <div className="w-24">
                            <Progress value={objective.progress} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="font-medium text-sm">Key Results</h5>
                        {objective.keyResults.map((kr, krIndex) => (
                          <div
                            key={krIndex}
                            className="flex items-center justify-between p-3 border rounded-lg bg-background"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm">{kr.kr}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{kr.responsible}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{kr.deadline}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-2">
                                <div className="flex-1">
                                  <Progress value={kr.progress} />
                                </div>
                                <span className="text-sm font-medium">{kr.progress}%</span>
                              </div>
                            </div>
                            <Badge
                              variant={
                                kr.status === "completed"
                                  ? "default"
                                  : kr.status === "on-track"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="ml-4"
                            >
                              {kr.status === "completed"
                                ? "✓ Concluído"
                                : kr.status === "on-track"
                                  ? "→ No Prazo"
                                  : "⚠ Em Risco"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="feedback360" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Feedback 360° - Ana Silva
              </CardTitle>
              <CardDescription>Avaliação multidirecional de competências e comportamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      data={[
                        { competency: "Liderança", self: 4.0, manager: 3.8, peers: 3.9, subordinates: 4.2 },
                        { competency: "Comunicação", self: 4.2, manager: 4.3, peers: 4.1, subordinates: 4.0 },
                        { competency: "Técnica", self: 4.5, manager: 4.6, peers: 4.4, subordinates: 4.3 },
                        { competency: "Trabalho em Equipe", self: 4.1, manager: 4.2, peers: 4.3, subordinates: 4.1 },
                        { competency: "Inovação", self: 3.8, manager: 4.0, peers: 3.9, subordinates: 4.1 },
                        { competency: "Adaptabilidade", self: 4.0, manager: 4.1, peers: 4.0, subordinates: 3.9 },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="competency" />
                      <PolarRadiusAxis angle={90} domain={[0, 5]} />
                      <Radar name="Auto-avaliação" dataKey="self" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
                      <Radar name="Gestor" dataKey="manager" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
                      <Radar name="Pares" dataKey="peers" stroke="#ffc658" fill="#ffc658" fillOpacity={0.1} />
                      <Radar
                        name="Subordinados"
                        dataKey="subordinates"
                        stroke="#ff7300"
                        fill="#ff7300"
                        fillOpacity={0.1}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Resumo das Avaliações</h4>
                    <div className="space-y-3">
                      {[
                        { label: "Auto-avaliação", value: 4.2, color: "bg-blue-500" },
                        { label: "Avaliação do Gestor", value: 4.3, color: "bg-green-500" },
                        { label: "Avaliação dos Pares", value: 4.1, color: "bg-yellow-500" },
                        { label: "Avaliação dos Subordinados", value: 4.1, color: "bg-orange-500" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{item.value}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= item.value ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-3">Comentários Principais</h5>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">Pontos Fortes</span>
                        </div>
                        <p className="text-sm text-green-700">
                          "Excelente capacidade técnica e boa comunicação com a equipe. Sempre disponível para ajudar
                          colegas."
                        </p>
                      </div>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <span className="font-medium text-amber-800">Oportunidades</span>
                        </div>
                        <p className="text-sm text-amber-700">
                          "Poderia desenvolver mais habilidades de liderança estratégica e visão de longo prazo."
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800">Recomendações</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          "Participar de programa de liderança e assumir projetos de maior complexidade estratégica."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Plano de Desenvolvimento Individual - Ana Silva
              </CardTitle>
              <CardDescription>Senior Developer → Tech Lead em 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Ações de Desenvolvimento</h4>
                    <div className="space-y-4">
                      {[
                        {
                          action: "Curso de Liderança Técnica",
                          status: "in-progress",
                          progress: 60,
                          deadline: "2024-05-30",
                          provider: "Alura",
                        },
                        {
                          action: "Mentoria com CTO",
                          status: "scheduled",
                          progress: 0,
                          deadline: "2024-06-15",
                          provider: "Interno",
                        },
                        {
                          action: "Liderar projeto crítico",
                          status: "completed",
                          progress: 100,
                          deadline: "2024-04-30",
                          provider: "Projeto Real",
                        },
                      ].map((action, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="font-medium">{action.action}</span>
                              <div className="text-xs text-muted-foreground mt-1">
                                {action.provider} • Prazo: {action.deadline}
                              </div>
                            </div>
                            <Badge
                              variant={
                                action.status === "completed"
                                  ? "default"
                                  : action.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {action.status === "completed"
                                ? "✓ Concluído"
                                : action.status === "in-progress"
                                  ? "🔄 Em Andamento"
                                  : "📅 Agendado"}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progresso</span>
                              <span className="font-medium">{action.progress}%</span>
                            </div>
                            <Progress value={action.progress} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Desenvolvimento de Competências</h4>
                    <div className="space-y-4">
                      {[
                        { skill: "Liderança de Equipes", current: 3.8, target: 4.5, priority: "high" },
                        { skill: "Arquitetura de Software", current: 4.2, target: 4.8, priority: "medium" },
                        { skill: "Gestão de Projetos", current: 3.5, target: 4.2, priority: "high" },
                        { skill: "Comunicação Executiva", current: 3.9, target: 4.4, priority: "medium" },
                      ].map((skill, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">{skill.skill}</span>
                            <Badge
                              variant={
                                skill.priority === "high"
                                  ? "destructive"
                                  : skill.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {skill.priority === "high"
                                ? "🔴 Alta"
                                : skill.priority === "medium"
                                  ? "🟡 Média"
                                  : "🟢 Baixa"}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Nível Atual: {skill.current}</span>
                              <span>Meta: {skill.target}</span>
                            </div>
                            <div className="space-y-1">
                              <Progress value={(skill.current / 5) * 100} />
                              <Progress value={(skill.target / 5) * 100} className="opacity-50" />
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Gap: {(skill.target - skill.current).toFixed(1)} pontos
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendência de Performance</CardTitle>
                <CardDescription>Evolução dos indicadores ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" domain={[3, 5]} />
                    <YAxis yAxisId="right" orientation="right" domain={[70, 95]} />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="performance"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Performance"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="engagement"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Engajamento"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="#ffc658"
                      strokeWidth={2}
                      name="Satisfação"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Performance</CardTitle>
                <CardDescription>Distribuição das avaliações na organização</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Insights Avançados de Performance</CardTitle>
              <CardDescription>Análises preditivas e recomendações baseadas em IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Insight Positivo</h4>
                  </div>
                  <p className="text-sm text-green-700 mb-2">
                    Colaboradores com wellbeing score acima de 8.0 apresentam performance 23% superior à média.
                  </p>
                  <Badge className="bg-green-100 text-green-800 text-xs">Correlação: 0.82</Badge>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <h4 className="font-semibold text-amber-800">Atenção Necessária</h4>
                  </div>
                  <p className="text-sm text-amber-700 mb-2">
                    15% dos colaboradores estão com performance abaixo da média e alta taxa de absenteísmo.
                  </p>
                  <Badge className="bg-amber-100 text-amber-800 text-xs">47 colaboradores</Badge>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Recomendação IA</h4>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    Implementar programa de mentoria pode aumentar performance em 18% nos próximos 6 meses.
                  </p>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">ROI: 340%</Badge>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">Predição de Turnover</h4>
                  </div>
                  <p className="text-sm text-purple-700 mb-2">
                    12 colaboradores com alto risco de saída nos próximos 3 meses baseado em padrões comportamentais.
                  </p>
                  <Badge className="bg-purple-100 text-purple-800 text-xs">Precisão: 87%</Badge>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-indigo-600" />
                    <h4 className="font-semibold text-indigo-800">Potencial de Promoção</h4>
                  </div>
                  <p className="text-sm text-indigo-700 mb-2">
                    28 colaboradores identificados com alto potencial para promoção baseado em performance e
                    competências.
                  </p>
                  <Badge className="bg-indigo-100 text-indigo-800 text-xs">Ready now: 8</Badge>
                </div>

                <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-5 w-5 text-rose-600" />
                    <h4 className="font-semibold text-rose-800">Impacto Bem-Estar</h4>
                  </div>
                  <p className="text-sm text-rose-700 mb-2">
                    Investimento de R$ 1 em bem-estar gera R$ 3.40 em produtividade e redução de custos.
                  </p>
                  <Badge className="bg-rose-100 text-rose-800 text-xs">ROI: 340%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
