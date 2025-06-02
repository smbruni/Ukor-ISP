"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Users, Award, Search, Download, Star } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function AcademyContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Dados dos cursos
  const courses = [
    {
      id: 1,
      title: "Ergonomia no Trabalho",
      category: "Saúde Física",
      description: "Aprenda técnicas de ergonomia para prevenir lesões e melhorar o conforto no trabalho",
      duration: "2h 30min",
      modules: 8,
      level: "Básico",
      instructor: "Dr. Carlos Silva",
      rating: 4.8,
      enrolled: 1247,
      completed: 892,
      completionRate: 71.5,
      thumbnail: "🪑",
      tags: ["Ergonomia", "Prevenção", "Postura"],
      progress: 85,
      lastAccessed: "2024-01-15",
    },
    {
      id: 2,
      title: "Gestão do Estresse",
      category: "Saúde Mental",
      description: "Técnicas comprovadas para identificar, gerenciar e reduzir o estresse no ambiente corporativo",
      duration: "3h 15min",
      modules: 12,
      level: "Intermediário",
      instructor: "Dra. Ana Costa",
      rating: 4.9,
      enrolled: 2156,
      completed: 1834,
      completionRate: 85.1,
      thumbnail: "🧘‍♀️",
      tags: ["Estresse", "Mindfulness", "Bem-estar"],
      progress: 92,
      lastAccessed: "2024-01-14",
    },
    {
      id: 3,
      title: "Alimentação Saudável no Trabalho",
      category: "Nutrição",
      description: "Guia completo para manter uma alimentação equilibrada durante a jornada de trabalho",
      duration: "1h 45min",
      modules: 6,
      level: "Básico",
      instructor: "Nutricionista Maria Santos",
      rating: 4.7,
      enrolled: 1834,
      completed: 1456,
      completionRate: 79.4,
      thumbnail: "🥗",
      tags: ["Nutrição", "Energia", "Produtividade"],
      progress: 67,
      lastAccessed: "2024-01-13",
    },
    {
      id: 4,
      title: "Liderança e Bem-estar",
      category: "Liderança",
      description: "Como liderar equipes promovendo saúde mental e engajamento",
      duration: "4h 20min",
      modules: 15,
      level: "Avançado",
      instructor: "Coach Roberto Lima",
      rating: 4.8,
      enrolled: 567,
      completed: 423,
      completionRate: 74.6,
      thumbnail: "👑",
      tags: ["Liderança", "Equipes", "Engajamento"],
      progress: 45,
      lastAccessed: "2024-01-12",
    },
    {
      id: 5,
      title: "Exercícios no Escritório",
      category: "Atividade Física",
      description: "Rotinas de exercícios simples para fazer durante o expediente",
      duration: "1h 30min",
      modules: 5,
      level: "Básico",
      instructor: "Personal Trainer João Oliveira",
      rating: 4.6,
      enrolled: 2890,
      completed: 2234,
      completionRate: 77.3,
      thumbnail: "💪",
      tags: ["Exercícios", "Movimento", "Energia"],
      progress: 100,
      lastAccessed: "2024-01-10",
    },
    {
      id: 6,
      title: "Qualidade do Sono",
      category: "Saúde Mental",
      description: "Estratégias para melhorar a qualidade do sono e aumentar a produtividade",
      duration: "2h 10min",
      modules: 7,
      level: "Intermediário",
      instructor: "Dr. Pedro Almeida",
      rating: 4.9,
      enrolled: 1678,
      completed: 1234,
      completionRate: 73.5,
      thumbnail: "😴",
      tags: ["Sono", "Recuperação", "Performance"],
      progress: 23,
      lastAccessed: "2024-01-08",
    },
  ]

  // Dados de analytics
  const monthlyEngagement = [
    { month: "Jul", usuarios: 1200, conclusoes: 890, horas: 2340 },
    { month: "Ago", usuarios: 1450, conclusoes: 1120, horas: 2890 },
    { month: "Set", usuarios: 1680, conclusoes: 1340, horas: 3240 },
    { month: "Out", usuarios: 1890, conclusoes: 1567, horas: 3780 },
    { month: "Nov", usuarios: 2100, conclusoes: 1789, horas: 4120 },
    { month: "Dez", usuarios: 2340, conclusoes: 1923, horas: 4560 },
  ]

  const departmentProgress = [
    { department: "TI", progress: 78, users: 145, completed: 113 },
    { department: "Marketing", progress: 85, users: 67, completed: 57 },
    { department: "Vendas", progress: 72, users: 89, completed: 64 },
    { department: "RH", progress: 92, users: 23, completed: 21 },
    { department: "Financeiro", progress: 68, users: 34, completed: 23 },
    { department: "Operações", progress: 74, users: 156, completed: 115 },
  ]

  const categoryDistribution = [
    { name: "Saúde Mental", value: 35, color: "#8b5cf6" },
    { name: "Saúde Física", value: 28, color: "#06b6d4" },
    { name: "Nutrição", value: 22, color: "#10b981" },
    { name: "Liderança", value: 15, color: "#f59e0b" },
  ]

  const topPerformers = [
    { name: "Maria Silva", department: "RH", courses: 12, hours: 45, score: 98 },
    { name: "João Santos", department: "TI", courses: 10, hours: 38, score: 95 },
    { name: "Ana Costa", department: "Marketing", courses: 9, hours: 42, score: 94 },
    { name: "Carlos Lima", department: "Vendas", courses: 8, hours: 35, score: 92 },
    { name: "Pedro Oliveira", department: "Financeiro", courses: 7, hours: 28, score: 90 },
  ]

  const learningTrends = [
    { week: "Sem 1", mobile: 45, desktop: 55 },
    { week: "Sem 2", mobile: 48, desktop: 52 },
    { week: "Sem 3", mobile: 52, desktop: 48 },
    { week: "Sem 4", mobile: 55, desktop: 45 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Academy</h2>
        <p className="text-muted-foreground">Plataforma de aprendizado em saúde e bem-estar corporativo</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,340</div>
                <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,923</div>
                <p className="text-xs text-muted-foreground">Taxa de conclusão: 82%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Horas de Estudo</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,560</div>
                <p className="text-xs text-muted-foreground">Média: 1.9h por usuário</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">Avaliação média dos cursos</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos de Engajamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engajamento Mensal</CardTitle>
                <CardDescription>Evolução de usuários ativos e conclusões</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyEngagement}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usuarios" stroke="#8884d8" name="Usuários Ativos" />
                    <Line type="monotone" dataKey="conclusoes" stroke="#82ca9d" name="Conclusões" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
                <CardDescription>Preferências de aprendizado por área</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
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
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Colaboradores com melhor desempenho na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{performer.name}</h4>
                        <p className="text-sm text-muted-foreground">{performer.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {performer.courses} cursos • {performer.hours}h
                      </div>
                      <div className="text-sm text-muted-foreground">Score: {performer.score}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          {/* Filtros e Busca */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="pl-10 pr-4 py-2 border border-input rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select className="px-3 py-2 border rounded-lg">
              <option value="">Todas as categorias</option>
              <option value="saude-mental">Saúde Mental</option>
              <option value="saude-fisica">Saúde Física</option>
              <option value="nutricao">Nutrição</option>
              <option value="lideranca">Liderança</option>
            </select>
            <select className="px-3 py-2 border rounded-lg">
              <option value="">Todos os níveis</option>
              <option value="basico">Básico</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>

          {/* Lista de Cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{course.thumbnail}</div>
                    <Badge
                      variant={
                        course.level === "Básico"
                          ? "default"
                          : course.level === "Intermediário"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{course.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {course.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duração:</span>
                        <div className="font-medium">{course.duration}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Módulos:</span>
                        <div className="font-medium">{course.modules}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Inscritos:</span>
                        <div className="font-medium">{course.enrolled}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avaliação:</span>
                        <div className="font-medium">
                          {course.rating} <span className="text-yellow-500">★</span>
                        </div>
                      </div>
                    </div>

                    {course.progress > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progresso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        {course.progress > 0 ? "Continuar" : "Iniciar"}
                      </Button>
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Progress por Departamento */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso por Departamento</CardTitle>
              <CardDescription>Acompanhamento do engajamento por área da empresa</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "progress" ? `${value}%` : value,
                      name === "progress" ? "Progresso" : name === "users" ? "Usuários" : "Concluídos",
                    ]}
                  />
                  <Bar dataKey="progress" fill="#8884d8" name="Progresso %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tendências de Aprendizado */}
            <Card>
              <CardHeader>
                <CardTitle>Tendências de Acesso</CardTitle>
                <CardDescription>Mobile vs Desktop por semana</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={learningTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="mobile" stackId="a" fill="#8884d8" name="Mobile" />
                    <Bar dataKey="desktop" stackId="a" fill="#82ca9d" name="Desktop" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Métricas de Engajamento */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Engajamento</CardTitle>
                <CardDescription>Indicadores de participação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taxa de Conclusão</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tempo Médio por Sessão</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="text-sm font-medium">28min</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Retenção (7 dias)</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">NPS dos Cursos</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-sm font-medium">85</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Relatórios Disponíveis */}
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Disponíveis</CardTitle>
                <CardDescription>Relatórios pré-configurados para download</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Relatório de Engajamento</h4>
                      <p className="text-sm text-muted-foreground">Métricas de participação por departamento</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Progresso Individual</h4>
                      <p className="text-sm text-muted-foreground">Relatório detalhado por colaborador</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Excel
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Análise de Cursos</h4>
                      <p className="text-sm text-muted-foreground">Performance e avaliações dos cursos</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">ROI de Treinamento</h4>
                      <p className="text-sm text-muted-foreground">Retorno sobre investimento em capacitação</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gerador de Relatórios */}
            <Card>
              <CardHeader>
                <CardTitle>Gerador de Relatórios</CardTitle>
                <CardDescription>Crie relatórios personalizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Período</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                      <option>Último mês</option>
                      <option>Últimos 3 meses</option>
                      <option>Últimos 6 meses</option>
                      <option>Último ano</option>
                      <option>Personalizado</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Departamentos</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                      <option>Todos os departamentos</option>
                      <option>TI</option>
                      <option>Marketing</option>
                      <option>Vendas</option>
                      <option>RH</option>
                      <option>Financeiro</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Métricas</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Progresso dos cursos</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Tempo de estudo</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Avaliações</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Certificações</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Gerar Relatório</Button>
                    <Button variant="outline">Agendar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Relatórios */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Relatórios</CardTitle>
              <CardDescription>Relatórios gerados recentemente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">Relatório de Engajamento - Dezembro 2024</h4>
                    <p className="text-sm text-muted-foreground">Gerado em 15/01/2024 às 14:30</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Visualizar
                    </Button>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">Progresso Individual - Q4 2024</h4>
                    <p className="text-sm text-muted-foreground">Gerado em 10/01/2024 às 09:15</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Visualizar
                    </Button>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">ROI de Treinamento - 2024</h4>
                    <p className="text-sm text-muted-foreground">Gerado em 05/01/2024 às 16:45</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Visualizar
                    </Button>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
