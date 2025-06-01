"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  User,
  BarChart3,
  TrendingUp,
  Brain,
  BookOpen,
  Settings,
  Target,
  Activity,
  DollarSign,
  FileText,
  Database,
  HelpCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  Clock,
  PieChart,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Heart,
  Moon,
  Play,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts"

// Header Component
function Header({ notifications, onClearNotifications }) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Ukor Health Analytics</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notificações</h3>
                  <Button variant="ghost" size="sm" onClick={onClearNotifications}>
                    Limpar todas
                  </Button>
                </div>
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">Nenhuma notificação</div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-3">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{notification.title}</span>
                        {!notification.read && <div className="h-2 w-2 bg-primary rounded-full" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

// Sidebar Component
function Sidebar({ activeSection, onSectionChange, collapsed, onToggleCollapse }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      badge: null,
      description: "Visão geral executiva",
    },
    {
      id: "analytics",
      label: "Análises Preditivas",
      icon: TrendingUp,
      badge: "3",
      description: "Modelos de IA e previsões",
    },
    {
      id: "isp",
      label: "ISP Diagnóstico",
      icon: Target,
      badge: null,
      description: "Índice de Saúde e Performance",
    },
    {
      id: "roi",
      label: "ROI em Saúde",
      icon: DollarSign,
      badge: "Novo",
      description: "Retorno sobre investimento em saúde",
    },
    {
      id: "questionnaires",
      label: "Questionários",
      icon: FileText,
      badge: "12",
      description: "Avaliações e formulários",
    },
    {
      id: "data",
      label: "Dados de Saúde",
      icon: Database,
      badge: "7",
      description: "Integração de dados",
    },
    {
      id: "ai-agents",
      label: "IA Agents",
      icon: Brain,
      badge: "5",
      description: "Consultores virtuais especializados",
    },
    {
      id: "education",
      label: "Educação",
      icon: BookOpen,
      badge: null,
      description: "Cursos e trilhas de aprendizado",
    },
    {
      id: "benefits",
      label: "Benefícios",
      icon: DollarSign,
      badge: "4",
      description: "Analytics de benefícios corporativos",
    },
  ]

  const bottomItems = [
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      description: "Configurações do sistema",
    },
    {
      id: "help",
      label: "Ajuda",
      icon: HelpCircle,
      description: "Suporte e documentação",
    },
  ]

  const MenuItem = ({ item, isBottom = false }) => {
    const isActive = activeSection === item.id

    return (
      <button
        className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
          isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted hover:text-foreground"
        } ${collapsed ? "justify-center" : ""}`}
        onClick={() => onSectionChange(item.id)}
      >
        <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"} flex-shrink-0`} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            {item.badge && (
              <Badge
                variant={isActive ? "secondary" : "outline"}
                className={`ml-2 ${item.badge === "Novo" ? "bg-green-100 text-green-800 border-green-200" : ""}`}
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </button>
    )
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-background/95 backdrop-blur-md border-r border-border shadow-lg transition-all duration-300 z-40 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">U</span>
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  UHealth
                </h1>
                <p className="text-xs text-muted-foreground">v2.1.0</p>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-primary"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Status */}
      {!collapsed && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Activity className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-foreground">Sistema Ativo</span>
            <Badge className="bg-primary/20 text-primary border-primary/20 text-xs">Online</Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">1,247 usuários conectados</span>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </div>

      {/* Bottom Items */}
      <div className="border-t border-border p-3">
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <MenuItem key={item.id} item={item} isBottom />
          ))}
        </nav>
      </div>
    </div>
  )
}

// Dashboard Content com gráfico e cards adicionais
function DashboardContent() {
  const ispData = [
    { month: "Jan", isp: 65 },
    { month: "Fev", isp: 68 },
    { month: "Mar", isp: 72 },
    { month: "Abr", isp: 69 },
    { month: "Mai", isp: 74 },
    { month: "Jun", isp: 78 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Executivo</h2>
        <p className="text-muted-foreground">Visão geral dos principais indicadores de saúde e performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI em Saúde</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.8M</div>
            <p className="text-xs text-muted-foreground">ROI de 340%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+12% vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sinistralidade</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8%</div>
            <p className="text-xs text-muted-foreground">Meta: 15%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-5% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risco de Burnout</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">Alto</div>
            <p className="text-xs text-muted-foreground">23 colaboradores em risco</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+3 vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carga de Trabalho</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Meta: 70%</p>
            <div className="mt-2 flex items-center text-xs text-amber-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+8% acima da meta</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absenteísmo</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">Meta: 4%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-0.8% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4</div>
            <p className="text-xs text-muted-foreground">Score de 0-10</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+0.3 vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Evolução do ISP</CardTitle>
            <CardDescription>Índice de Saúde e Performance ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={ispData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="isp" stroke="#8884d8" strokeWidth={2} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas Críticos</CardTitle>
            <CardDescription>Situações que requerem atenção imediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Risco de Burnout</h4>
                  <p className="text-xs text-muted-foreground">Departamento de TI com 8 casos</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Sobrecarga de Trabalho</h4>
                  <p className="text-xs text-muted-foreground">Equipe de Desenvolvimento</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Moon className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Qualidade de Sono</h4>
                  <p className="text-xs text-muted-foreground">15 colaboradores com sono crítico</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance por Departamento</CardTitle>
            <CardDescription>Comparativo de ISP entre departamentos</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mb-2" />
              <p>Gráfico de Performance por Departamento</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Matriz de Risco</CardTitle>
            <CardDescription>Probabilidade vs. Impacto por departamento</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center text-muted-foreground">
              <PieChart className="h-16 w-16 mb-2" />
              <p>Matriz de Risco por Departamento</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// AI Agents Content
function AIAgentsContent() {
  const [selectedAgent, setSelectedAgent] = useState(null)

  const agents = [
    {
      id: 1,
      name: "Nutri IA",
      role: "Nutricionista Virtual",
      description: "Especialista em nutrição corporativa e hábitos alimentares saudáveis",
      avatar: "🥗",
      specialties: [
        "Planejamento nutricional",
        "Análise de hábitos alimentares",
        "Receitas saudáveis",
        "Educação nutricional",
      ],
      status: "online",
      conversations: 1247,
      rating: 4.9,
      lastMessage: "Olá! Como posso ajudar com sua alimentação hoje?",
    },
    {
      id: 2,
      name: "Mente Sã",
      role: "Mental Coach",
      description: "Coach especializado em saúde mental e bem-estar emocional",
      avatar: "🧠",
      specialties: ["Gestão de estresse", "Ansiedade", "Mindfulness", "Equilíbrio emocional"],
      status: "online",
      conversations: 892,
      rating: 4.8,
      lastMessage: "Vamos trabalhar juntos para fortalecer sua saúde mental!",
    },
    {
      id: 3,
      name: "Fit Coach",
      role: "Personal Trainer Virtual",
      description: "Personal trainer especializado em exercícios para ambiente corporativo",
      avatar: "💪",
      specialties: ["Exercícios no escritório", "Ergonomia", "Condicionamento físico", "Prevenção de lesões"],
      status: "online",
      conversations: 756,
      rating: 4.7,
      lastMessage: "Pronto para se movimentar? Vamos começar!",
    },
    {
      id: 4,
      name: "Leader Coach",
      role: "Leadership Coach",
      description: "Coach especializado em desenvolvimento de liderança e gestão de equipes",
      avatar: "👑",
      specialties: ["Liderança transformacional", "Gestão de equipes", "Comunicação", "Desenvolvimento pessoal"],
      status: "online",
      conversations: 634,
      rating: 4.9,
      lastMessage: "Vamos desenvolver suas habilidades de liderança!",
    },
    {
      id: 5,
      name: "Culture & Performance",
      role: "Cultural & Performance Coach",
      description: "Especialista em cultura organizacional e performance de equipes",
      avatar: "🎯",
      specialties: ["Cultura organizacional", "Performance de equipes", "Engajamento", "Produtividade"],
      status: "online",
      conversations: 523,
      rating: 4.8,
      lastMessage: "Como posso ajudar a melhorar a performance da sua equipe?",
    },
    {
      id: 6,
      name: "Productivity Pro",
      role: "Productivity Coach",
      description: "Coach especializado em produtividade e gestão do tempo",
      avatar: "⚡",
      specialties: ["Gestão do tempo", "Organização", "Foco", "Eficiência"],
      status: "online",
      conversations: 445,
      rating: 4.6,
      lastMessage: "Vamos otimizar sua produtividade juntos!",
    },
    {
      id: 7,
      name: "Wellness Guide",
      role: "Wellness Coach",
      description: "Guia completo para bem-estar corporativo e qualidade de vida",
      avatar: "🌟",
      specialties: ["Bem-estar geral", "Qualidade de vida", "Work-life balance", "Autocuidado"],
      status: "online",
      conversations: 378,
      rating: 4.7,
      lastMessage: "Seu bem-estar é minha prioridade. Como posso ajudar?",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">IA Agents</h2>
        <p className="text-muted-foreground">Consultores virtuais especializados em saúde e bem-estar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedAgent(agent)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{agent.avatar}</div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription>{agent.role}</CardDescription>
                  </div>
                </div>
                <Badge variant={agent.status === "online" ? "default" : "secondary"}>{agent.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{agent.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Conversas:</span>
                    <div className="font-medium">{agent.conversations}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avaliação:</span>
                    <div className="font-medium">
                      {agent.rating} <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Especialidades:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {agent.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {agent.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Conversar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAgent && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Chat com {selectedAgent.name}</CardTitle>
            <CardDescription>Converse com seu consultor virtual especializado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{selectedAgent.avatar}</span>
                  <span className="font-medium">{selectedAgent.name}</span>
                </div>
                <p className="text-sm">{selectedAgent.lastMessage}</p>
              </div>

              <div className="flex gap-2">
                <Input placeholder="Digite sua mensagem..." className="flex-1" />
                <Button>Enviar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Placeholder functions for other sections - você pode expandir estes conforme necessário
function AnalyticsContent() {
  const [selectedModel, setSelectedModel] = useState("burnout")
  const [timeRange, setTimeRange] = useState("3m")

  const burnoutPrediction = [
    { month: "Jan", risco: 15, atual: 12 },
    { month: "Fev", risco: 18, atual: 14 },
    { month: "Mar", risco: 22, atual: 19 },
    { month: "Abr", risco: 25, atual: 23 },
    { month: "Mai", risco: 28, atual: 26 },
    { month: "Jun", risco: 32, atual: 29 },
  ]

  const productivityPrediction = [
    { month: "Jan", previsto: 85, atual: 82 },
    { month: "Fev", previsto: 87, atual: 84 },
    { month: "Mar", previsto: 89, atual: 88 },
    { month: "Abr", previsto: 91, atual: 89 },
    { month: "Mai", previsto: 88, atual: 87 },
    { month: "Jun", previsto: 90, atual: 89 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análises Preditivas</h2>
        <p className="text-muted-foreground">Modelos de IA para previsão de riscos e tendências de saúde</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="burnout">Modelo de Burnout</option>
          <option value="productivity">Modelo de Produtividade</option>
          <option value="absenteeism">Modelo de Absenteísmo</option>
          <option value="turnover">Modelo de Turnover</option>
        </select>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="3m">Próximos 3 meses</option>
          <option value="6m">Próximos 6 meses</option>
          <option value="1y">Próximo ano</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Acurácia do Modelo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Alertas Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">23</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Prevenções</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-xs text-muted-foreground">Casos evitados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Economia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 890K</div>
            <p className="text-xs text-muted-foreground">Em custos evitados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Previsão de Risco de Burnout</CardTitle>
            <CardDescription>Comparativo entre previsão e realidade</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={burnoutPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="risco" stroke="#ef4444" strokeWidth={2} name="Previsão" />
                <Line type="monotone" dataKey="atual" stroke="#3b82f6" strokeWidth={2} name="Atual" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fatores de Risco Identificados</CardTitle>
            <CardDescription>Principais indicadores de alerta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Sobrecarga de trabalho</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Qualidade do sono</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                  <span className="text-sm font-medium">72%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Estresse percebido</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Suporte social</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas Preditivos em Tempo Real</CardTitle>
          <CardDescription>Colaboradores em risco identificados pelo modelo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div>
                <h4 className="font-medium text-red-800">João Silva - Desenvolvimento</h4>
                <p className="text-sm text-red-600">Risco de burnout: 89% | Ação recomendada: Intervenção imediata</p>
              </div>
              <Button size="sm" variant="outline">
                Ver Detalhes
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <div>
                <h4 className="font-medium text-amber-800">Maria Santos - Marketing</h4>
                <p className="text-sm text-amber-600">Risco de burnout: 67% | Ação recomendada: Monitoramento</p>
              </div>
              <Button size="sm" variant="outline">
                Ver Detalhes
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div>
                <h4 className="font-medium text-blue-800">Carlos Oliveira - Vendas</h4>
                <p className="text-sm text-blue-600">Melhoria prevista: +15% produtividade | Ação: Manter estratégia</p>
              </div>
              <Button size="sm" variant="outline">
                Ver Detalhes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ISP Diagnóstico Content
function ISPContent() {
  const [selectedPillar, setSelectedPillar] = useState("geral")

  const pillars = [
    { id: "fisica", name: "Saúde Física", score: 78, color: "bg-blue-500", icon: "💪" },
    { id: "mental", name: "Saúde Mental", score: 65, color: "bg-purple-500", icon: "🧠" },
    { id: "nutricional", name: "Saúde Nutricional", score: 72, color: "bg-green-500", icon: "🥗" },
    { id: "sono", name: "Qualidade do Sono", score: 58, color: "bg-indigo-500", icon: "😴" },
    { id: "social", name: "Saúde Social", score: 81, color: "bg-pink-500", icon: "👥" },
    { id: "proposito", name: "Propósito", score: 75, color: "bg-orange-500", icon: "🎯" },
  ]

  const overallISP = Math.round(pillars.reduce((acc, pillar) => acc + pillar.score, 0) / pillars.length)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ISP - Índice de Saúde e Performance</h2>
        <p className="text-muted-foreground">Diagnóstico completo baseado nos 6 pilares de saúde</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <CardTitle>ISP Geral</CardTitle>
            <CardDescription>Índice consolidado</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent transform -rotate-90"
                style={{
                  background: `conic-gradient(from 0deg, hsl(var(--primary)) ${overallISP * 3.6}deg, transparent ${overallISP * 3.6}deg)`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{overallISP}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {overallISP >= 80 ? "Excelente" : overallISP >= 70 ? "Bom" : overallISP >= 60 ? "Regular" : "Atenção"}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pilares de Saúde</CardTitle>
            <CardDescription>Avaliação detalhada por dimensão</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPillar(pillar.id)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{pillar.icon}</div>
                    <h3 className="font-medium text-sm">{pillar.name}</h3>
                    <div className="text-2xl font-bold mt-2">{pillar.score}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`h-2 rounded-full ${pillar.color}`} style={{ width: `${pillar.score}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução do ISP</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={[
                  { month: "Jan", isp: 65 },
                  { month: "Fev", isp: 68 },
                  { month: "Mar", isp: 72 },
                  { month: "Abr", isp: 69 },
                  { month: "Mai", isp: 74 },
                  { month: "Jun", isp: overallISP },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="isp" stroke="#8884d8" strokeWidth={3} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recomendações Personalizadas</CardTitle>
            <CardDescription>Baseadas no seu perfil ISP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800">Prioridade Alta</h4>
                <p className="text-sm text-blue-600">Melhorar qualidade do sono - Score atual: 58</p>
                <Button size="sm" className="mt-2" variant="outline">
                  Ver Plano
                </Button>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-800">Prioridade Média</h4>
                <p className="text-sm text-amber-600">Fortalecer saúde mental - Score atual: 65</p>
                <Button size="sm" className="mt-2" variant="outline">
                  Ver Plano
                </Button>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800">Manter</h4>
                <p className="text-sm text-green-600">Saúde social está excelente - Score: 81</p>
                <Button size="sm" className="mt-2" variant="outline">
                  Ver Dicas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparativo por Departamento</CardTitle>
          <CardDescription>ISP médio por área da empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { dept: "Tecnologia", isp: 73, employees: 45 },
              { dept: "Marketing", isp: 78, employees: 23 },
              { dept: "Vendas", isp: 71, employees: 34 },
              { dept: "RH", isp: 82, employees: 12 },
              { dept: "Financeiro", isp: 69, employees: 18 },
            ].map((dept) => (
              <div key={dept.dept} className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{dept.dept}</span>
                  <span className="text-sm text-muted-foreground ml-2">({dept.employees} colaboradores)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${dept.isp}%` }}></div>
                  </div>
                  <span className="font-bold w-8">{dept.isp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ROI em Saúde Content
function ROIContent() {
  const [period, setPeriod] = useState("6m")
  const [department, setDepartment] = useState("all")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ROI em Saúde</h2>
        <p className="text-muted-foreground">Análise de retorno sobre investimento em saúde corporativa</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último ano</option>
            <option value="all">Todo período</option>
          </select>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">Todos</option>
            <option value="ti">Tecnologia</option>
            <option value="rh">Recursos Humanos</option>
            <option value="financeiro">Financeiro</option>
            <option value="operacoes">Operações</option>
          </select>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">340%</div>
            <p className="text-xs text-muted-foreground">+12% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 720K</div>
            <p className="text-xs text-muted-foreground">Período de 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retorno Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.4M</div>
            <p className="text-xs text-muted-foreground">+18% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retorno Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 410K</div>
            <p className="text-xs text-muted-foreground">Média mensal</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Evolução do ROI</CardTitle>
            <CardDescription>Comparativo entre investimento e retorno</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={[
                  { month: "Jan", investimento: 120, retorno: 280 },
                  { month: "Fev", investimento: 120, retorno: 320 },
                  { month: "Mar", investimento: 120, retorno: 380 },
                  { month: "Abr", investimento: 120, retorno: 420 },
                  { month: "Mai", investimento: 120, retorno: 450 },
                  { month: "Jun", investimento: 120, retorno: 480 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="investimento" stroke="#ef4444" strokeWidth={2} name="Investimento" />
                <Line type="monotone" dataKey="retorno" stroke="#22c55e" strokeWidth={2} name="Retorno" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Principais Indicadores</CardTitle>
            <CardDescription>Métricas de impacto financeiro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Redução de Absenteísmo</span>
                  <span className="text-sm font-medium">32%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Aumento de Produtividade</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "18%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Redução de Turnover</span>
                  <span className="text-sm font-medium">24%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "24%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Redução de Sinistralidade</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada por Departamento</CardTitle>
          <CardDescription>Comparativo de ROI entre departamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { dept: "Tecnologia", investimento: 180, retorno: 650, roi: 261 },
              { dept: "Marketing", investimento: 120, retorno: 480, roi: 300 },
              { dept: "Vendas", investimento: 200, retorno: 890, roi: 345 },
              { dept: "RH", investimento: 80, retorno: 320, roi: 300 },
              { dept: "Financeiro", investimento: 140, retorno: 520, roi: 271 },
            ].map((dept) => (
              <div key={dept.dept} className="grid grid-cols-4 gap-4 items-center p-3 border rounded-lg">
                <div className="font-medium">{dept.dept}</div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Investimento:</span>
                  <div className="font-medium">R$ {dept.investimento}K</div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Retorno:</span>
                  <div className="font-medium">R$ {dept.retorno}K</div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">ROI:</span>
                  <div className="font-bold text-green-600">{dept.roi}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Questionários Content
function QuestionnairesContent() {
  const [activeTab, setActiveTab] = useState("available")

  const availableQuestionnaires = [
    {
      id: 1,
      title: "Avaliação de Burnout (MBI)",
      description: "Maslach Burnout Inventory - Avaliação completa de esgotamento profissional",
      duration: "15 min",
      questions: 22,
      category: "Mental",
      priority: "Alta",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      title: "Qualidade do Sono (PSQI)",
      description: "Pittsburgh Sleep Quality Index - Avaliação da qualidade do sono",
      duration: "8 min",
      questions: 19,
      category: "Sono",
      priority: "Média",
      lastUpdated: "2024-01-10",
    },
    {
      id: 3,
      title: "Estresse Percebido (PSS)",
      description: "Perceived Stress Scale - Medição do nível de estresse percebido",
      duration: "5 min",
      questions: 10,
      category: "Mental",
      priority: "Alta",
      lastUpdated: "2024-01-12",
    },
  ]

  const completedQuestionnaires = [
    {
      id: 1,
      title: "Avaliação Nutricional",
      completedDate: "2024-01-08",
      score: 78,
      status: "Bom",
      nextDue: "2024-04-08",
    },
    {
      id: 2,
      title: "Atividade Física",
      completedDate: "2024-01-05",
      score: 65,
      status: "Regular",
      nextDue: "2024-04-05",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Questionários de Saúde</h2>
        <p className="text-muted-foreground">Avaliações estruturadas para monitoramento da saúde</p>
      </div>

      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "available" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Disponíveis (3)
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "completed" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Concluídos (2)
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "analytics" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {activeTab === "available" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableQuestionnaires.map((questionnaire) => (
            <Card key={questionnaire.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{questionnaire.title}</CardTitle>
                  <Badge variant={questionnaire.priority === "Alta" ? "destructive" : "secondary"}>
                    {questionnaire.priority}
                  </Badge>
                </div>
                <CardDescription>{questionnaire.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duração:</span>
                    <span className="font-medium">{questionnaire.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Questões:</span>
                    <span className="font-medium">{questionnaire.questions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Categoria:</span>
                    <Badge variant="outline">{questionnaire.category}</Badge>
                  </div>
                  <div className="pt-3">
                    <Button className="w-full">Iniciar Questionário</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="space-y-4">
          {completedQuestionnaires.map((questionnaire) => (
            <Card key={questionnaire.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{questionnaire.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Concluído em {new Date(questionnaire.completedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{questionnaire.score}</div>
                    <div className="text-sm text-muted-foreground">{questionnaire.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Próxima avaliação:</div>
                    <div className="text-sm font-medium">{new Date(questionnaire.nextDue).toLocaleDateString()}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Resultados
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Conclusão</CardTitle>
              <CardDescription>Percentual de questionários concluídos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">87%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">+5% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tempo Médio de Resposta</CardTitle>
              <CardDescription>Duração média para completar questionários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">12 min</div>
              <p className="text-sm text-muted-foreground">Meta: 15 min</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Dados de Saúde Content
function DataContent() {
  const [selectedIntegration, setSelectedIntegration] = useState("all")

  const integrations = [
    { id: "fitbit", name: "Fitbit", status: "Conectado", users: 234, lastSync: "2 min atrás" },
    { id: "apple", name: "Apple Health", status: "Conectado", users: 189, lastSync: "5 min atrás" },
    { id: "google", name: "Google Fit", status: "Conectado", users: 156, lastSync: "1 min atrás" },
    { id: "garmin", name: "Garmin", status: "Conectado", users: 78, lastSync: "3 min atrás" },
    { id: "samsung", name: "Samsung Health", status: "Erro", users: 45, lastSync: "2h atrás" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dados de Saúde</h2>
        <p className="text-muted-foreground">Integração e gerenciamento de dados de saúde</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">702</div>
            <p className="text-xs text-muted-foreground">+12 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Dados Coletados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">Pontos de dados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Integrações Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/5</div>
            <p className="text-xs text-muted-foreground">1 com erro</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Última Sincronização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 min</div>
            <p className="text-xs text-muted-foreground">atrás</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integrações de Dispositivos</CardTitle>
          <CardDescription>Status das conexões com dispositivos de saúde</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      integration.status === "Conectado" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.users} usuários conectados</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{integration.status}</div>
                  <div className="text-xs text-muted-foreground">Última sync: {integration.lastSync}</div>
                </div>
                <Button variant="outline" size="sm">
                  {integration.status === "Conectado" ? "Configurar" : "Reconectar"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Métricas Coletadas</CardTitle>
            <CardDescription>Tipos de dados mais capturados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { metric: "Passos", count: "1.2M", percentage: 85 },
                { metric: "Frequência Cardíaca", count: "890K", percentage: 72 },
                { metric: "Sono", count: "456K", percentage: 65 },
                { metric: "Calorias", count: "234K", percentage: 45 },
                { metric: "Exercícios", count: "123K", percentage: 38 },
              ].map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{item.metric}</span>
                    <span className="text-sm text-muted-foreground ml-2">({item.count})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm font-medium w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Qualidade dos Dados</CardTitle>
            <CardDescription>Indicadores de confiabilidade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Completude</span>
                  <span className="text-sm font-medium">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Precisão</span>
                  <span className="text-sm font-medium">91%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "91%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Consistência</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Educação Content
function EducationContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Fundamentos de Saúde Corporativa",
      description: "Aprenda os princípios básicos para promover saúde no ambiente de trabalho.",
      image: "/placeholder.svg?height=200&width=300",
      category: "saude",
      duration: "4h 30min",
      lessons: 12,
      progress: 75,
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      title: "Gestão do Estresse no Trabalho",
      description: "Técnicas práticas para gerenciar o estresse e aumentar a produtividade.",
      image: "/placeholder.svg?height=200&width=300",
      category: "mental",
      duration: "3h 15min",
      lessons: 8,
      progress: 50,
      rating: 4.9,
      featured: true,
    },
    {
      id: 3,
      title: "Nutrição para Alta Performance",
      description: "Como a alimentação impacta sua energia e performance no trabalho.",
      image: "/placeholder.svg?height=200&width=300",
      category: "nutricao",
      duration: "5h 45min",
      lessons: 15,
      progress: 30,
      rating: 4.7,
      featured: false,
    },
    {
      id: 4,
      title: "Ergonomia e Postura no Home Office",
      description: "Organize seu espaço de trabalho para prevenir lesões e aumentar o conforto.",
      image: "/placeholder.svg?height=200&width=300",
      category: "fisica",
      duration: "2h 20min",
      lessons: 6,
      progress: 100,
      rating: 4.5,
      featured: false,
    },
    {
      id: 5,
      title: "Mindfulness para Profissionais",
      description: "Práticas de atenção plena para reduzir ansiedade e melhorar foco.",
      image: "/placeholder.svg?height=200&width=300",
      category: "mental",
      duration: "3h 50min",
      lessons: 10,
      progress: 0,
      rating: 4.9,
      featured: true,
    },
    {
      id: 6,
      title: "Sono e Produtividade",
      description: "Como otimizar seu sono para maximizar sua performance profissional.",
      image: "/placeholder.svg?height=200&width=300",
      category: "sono",
      duration: "4h 10min",
      lessons: 12,
      progress: 25,
      rating: 4.8,
      featured: false,
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "featured" && course.featured) ||
      (filter === "in-progress" && course.progress > 0 && course.progress < 100) ||
      (filter === "completed" && course.progress === 100) ||
      filter === course.category

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Plataforma Educacional</h2>
        <p className="text-muted-foreground">Cursos e treinamentos para saúde e performance</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar cursos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "all" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setFilter("all")}
          >
            Todos
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "featured" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setFilter("featured")}
          >
            Destaques
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "in-progress" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setFilter("in-progress")}
          >
            Em Andamento
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "completed" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setFilter("completed")}
          >
            Concluídos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col">
            <div className="relative">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              {course.featured && <Badge className="absolute top-2 right-2 bg-yellow-500">Destaque</Badge>}
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{course.title}</CardTitle>
                <Badge variant="outline" className="capitalize">
                  {course.category === "saude"
                    ? "Saúde"
                    : course.category === "mental"
                      ? "Mental"
                      : course.category === "nutricao"
                        ? "Nutrição"
                        : course.category === "fisica"
                          ? "Física"
                          : course.category === "sono"
                            ? "Sono"
                            : course.category}
                </Badge>
              </div>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
                <span className="mx-2">•</span>
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.lessons} aulas</span>
                <span className="mx-2">•</span>
                <span className="text-yellow-500">★</span>
                <span>{course.rating}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </CardContent>

            <div className="p-6 pt-0">
              <Button className="w-full">
                {course.progress === 0 ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Iniciar Curso
                  </>
                ) : course.progress === 100 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Certificado
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Continuar
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">Nenhum curso encontrado</h3>
          <p className="mt-2 text-gray-500">Tente ajustar seus filtros ou termos de busca.</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Trilhas de Aprendizado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Saúde Integral</CardTitle>
              <CardDescription>Trilha completa para saúde física e mental</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Fundamentos de Saúde</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Nutrição Básica</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Gestão do Estresse</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Sono Reparador</span>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button variant="outline" className="w-full">
                Continuar Trilha
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alta Performance</CardTitle>
              <CardDescription>Maximize sua produtividade e resultados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Fundamentos de Produtividade</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Gestão de Energia</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Foco e Concentração</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Hábitos de Alta Performance</span>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button variant="outline" className="w-full">
                Continuar Trilha
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liderança em Saúde</CardTitle>
              <CardDescription>Para gestores e líderes de equipe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Cultura de Saúde</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Gestão de Equipes Saudáveis</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Métricas de Bem-estar</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">ROI em Saúde</span>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button variant="outline" className="w-full">
                Iniciar Trilha
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Benefícios Content
function BenefitsContent() {
  const [selectedView, setSelectedView] = useState("overview")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const benefitsData = [
    {
      category: "Saúde",
      items: [
        { name: "Plano de Saúde", usage: 89, cost: 450000, satisfaction: 4.2 },
        { name: "Plano Odontológico", usage: 67, cost: 120000, satisfaction: 4.0 },
        { name: "Seguro de Vida", usage: 100, cost: 80000, satisfaction: 4.5 },
      ],
    },
    {
      category: "Bem-estar",
      items: [
        { name: "Vale Refeição", usage: 95, cost: 280000, satisfaction: 4.3 },
        { name: "Vale Alimentação", usage: 78, cost: 150000, satisfaction: 4.1 },
        { name: "Auxílio Academia", usage: 34, cost: 45000, satisfaction: 4.7 },
      ],
    },
    {
      category: "Desenvolvimento",
      items: [
        { name: "Auxílio Educação", usage: 23, cost: 75000, satisfaction: 4.8 },
        { name: "Cursos e Certificações", usage: 45, cost: 95000, satisfaction: 4.6 },
        { name: "Conferências", usage: 12, cost: 35000, satisfaction: 4.4 },
      ],
    },
    {
      category: "Transporte",
      items: [
        { name: "Vale Transporte", usage: 67, cost: 180000, satisfaction: 3.9 },
        { name: "Estacionamento", usage: 89, cost: 120000, satisfaction: 4.1 },
        { name: "Auxílio Combustível", usage: 34, cost: 85000, satisfaction: 4.0 },
      ],
    },
  ]

  const totalCost = benefitsData.reduce(
    (acc, category) => acc + category.items.reduce((catAcc, item) => catAcc + item.cost, 0),
    0,
  )

  const averageUsage = Math.round(
    benefitsData.reduce((acc, category) => acc + category.items.reduce((catAcc, item) => catAcc + item.usage, 0), 0) /
      benefitsData.reduce((acc, category) => acc + category.items.length, 0),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics de Benefícios Corporativos</h2>
        <p className="text-muted-foreground">Análise consolidada de utilização e satisfação dos benefícios</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedView === "overview" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setSelectedView("overview")}
          >
            Visão Geral
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedView === "department" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setSelectedView("department")}
          >
            Por Departamento
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedView === "roi" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setSelectedView("roi")}
          >
            ROI Benefícios
          </button>
        </div>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">Todos os Departamentos</option>
          <option value="ti">Tecnologia</option>
          <option value="rh">Recursos Humanos</option>
          <option value="financeiro">Financeiro</option>
          <option value="marketing">Marketing</option>
          <option value="vendas">Vendas</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Custo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(totalCost / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Por mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Utilização Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageUsage}%</div>
            <p className="text-xs text-muted-foreground">Todos os benefícios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Satisfação Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3</div>
            <p className="text-xs text-muted-foreground">De 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ROI Benefícios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285%</div>
            <p className="text-xs text-muted-foreground">Retorno anual</p>
          </CardContent>
        </Card>
      </div>

      {selectedView === "overview" && (
        <div className="space-y-6">
          {benefitsData.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
                <CardDescription>Análise detalhada dos benefícios de {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-3 border rounded-lg"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Utilização:</span>
                        <div className="flex items-center mt-1">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.usage}%` }}></div>
                          </div>
                          <span className="font-medium">{item.usage}%</span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Custo Mensal:</span>
                        <div className="font-medium">R$ {(item.cost / 1000).toFixed(0)}K</div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Satisfação:</span>
                        <div className="font-medium flex items-center">
                          {item.satisfaction} <span className="text-yellow-500 ml-1">★</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedView === "department" && (
        <Card>
          <CardHeader>
            <CardTitle>Utilização por Departamento</CardTitle>
            <CardDescription>Comparativo de uso dos benefícios entre departamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: "Tecnologia", planoSaude: 92, valeRefeicao: 98, auxEducacao: 45, auxAcademia: 28 },
                { dept: "Marketing", planoSaude: 88, valeRefeicao: 95, auxEducacao: 32, auxAcademia: 41 },
                { dept: "Vendas", planoSaude: 85, valeRefeicao: 92, auxEducacao: 18, auxAcademia: 35 },
                { dept: "RH", planoSaude: 95, valeRefeicao: 100, auxEducacao: 67, auxAcademia: 58 },
                { dept: "Financeiro", planoSaude: 90, valeRefeicao: 94, auxEducacao: 28, auxAcademia: 22 },
              ].map((dept) => (
                <div key={dept.dept} className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">{dept.dept}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Plano Saúde:</span>
                      <div className="font-medium">{dept.planoSaude}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vale Refeição:</span>
                      <div className="font-medium">{dept.valeRefeicao}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Aux. Educação:</span>
                      <div className="font-medium">{dept.auxEducacao}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Aux. Academia:</span>
                      <div className="font-medium">{dept.auxAcademia}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedView === "roi" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ROI por Categoria</CardTitle>
              <CardDescription>Retorno sobre investimento por tipo de benefício</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Saúde", roi: 320, investment: 650, return: 2080 },
                  { category: "Bem-estar", roi: 280, investment: 475, return: 1330 },
                  { category: "Desenvolvimento", roi: 450, investment: 205, return: 922 },
                  { category: "Transporte", roi: 180, investment: 385, return: 693 },
                ].map((item) => (
                  <div key={item.category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        Investimento: R$ {item.investment}K | Retorno: R$ {item.return}K
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">{item.roi}%</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Impacto nos Indicadores</CardTitle>
              <CardDescription>Como os benefícios afetam métricas de RH</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Redução de Turnover</span>
                    <span className="text-sm font-medium">-28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Aumento de Satisfação</span>
                    <span className="text-sm font-medium">+35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Redução de Absenteísmo</span>
                    <span className="text-sm font-medium">-22%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Aumento de Produtividade</span>
                    <span className="text-sm font-medium">+18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Novo Questionário",
      message: "Um novo questionário de saúde mental está disponível.",
      timestamp: new Date(),
      read: false,
    },
    {
      id: 2,
      title: "Resultados ISP",
      message: "Seus resultados do ISP estão prontos para visualização.",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: 3,
      title: "Alerta de Burnout",
      message: "Detectamos um possível risco de burnout em sua equipe.",
      timestamp: new Date(Date.now() - 7200000),
      read: false,
    },
  ])

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleClearNotifications = () => {
    setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
          <Header notifications={notifications} onClearNotifications={handleClearNotifications} />

          <main className="flex-1 p-6 overflow-y-auto">
            {activeSection === "dashboard" && <DashboardContent />}
            {activeSection === "analytics" && <AnalyticsContent />}
            {activeSection === "roi" && <ROIContent />}
            {activeSection === "isp" && <ISPContent />}
            {activeSection === "questionnaires" && <QuestionnairesContent />}
            {activeSection === "data" && <DataContent />}
            {activeSection === "benefits" && <BenefitsContent />}
            {activeSection === "ai-agents" && <AIAgentsContent />}
            {activeSection === "education" && <EducationContent />}
          </main>
        </div>
      </div>
    </div>
  )
}
