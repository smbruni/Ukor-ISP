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
      label: "Academy",
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

// Analytics Content
function AnalyticsContent() {
  const [selectedModel, setSelectedModel] = useState("burnout")
  const [timeRange, setTimeRange] = useState("3m")

  const modelsData = {
    burnout: {
      title: "Modelo de Burnout",
      description: "Previsão de risco de esgotamento profissional",
      accuracy: 94.2,
      alerts: 23,
      prevented: 156,
      savings: 890,
      chartData: [
        { month: "Jan", risco: 15, atual: 12 },
        { month: "Fev", risco: 18, atual: 14 },
        { month: "Mar", risco: 22, atual: 19 },
        { month: "Abr", risco: 25, atual: 23 },
        { month: "Mai", risco: 28, atual: 26 },
        { month: "Jun", risco: 32, atual: 29 },
      ],
      factors: [
        { name: "Sobrecarga de trabalho", value: 85, color: "bg-red-500" },
        { name: "Qualidade do sono", value: 72, color: "bg-amber-500" },
        { name: "Estresse percebido", value: 78, color: "bg-red-500" },
        { name: "Suporte social", value: 45, color: "bg-green-500" },
      ],
      alerts_list: [
        { name: "João Silva - Desenvolvimento", risk: 89, action: "Intervenção imediata", type: "danger" },
        { name: "Maria Santos - Marketing", risk: 67, action: "Monitoramento", type: "warning" },
        { name: "Carlos Oliveira - Vendas", risk: 45, action: "Prevenção", type: "info" },
      ],
    },
    productivity: {
      title: "Modelo de Produtividade",
      description: "Previsão de performance e eficiência da equipe",
      accuracy: 91.8,
      alerts: 12,
      prevented: 89,
      savings: 650,
      chartData: [
        { month: "Jan", risco: 85, atual: 82 },
        { month: "Fev", risco: 87, atual: 84 },
        { month: "Mar", risco: 89, atual: 88 },
        { month: "Abr", risco: 91, atual: 89 },
        { month: "Mai", risco: 88, atual: 87 },
        { month: "Jun", risco: 90, atual: 89 },
      ],
      factors: [
        { name: "Engajamento da equipe", value: 78, color: "bg-blue-500" },
        { name: "Carga de trabalho", value: 85, color: "bg-amber-500" },
        { name: "Ferramentas adequadas", value: 92, color: "bg-green-500" },
        { name: "Ambiente de trabalho", value: 76, color: "bg-blue-500" },
      ],
      alerts_list: [
        { name: "Equipe Frontend - TI", risk: 92, action: "Otimizar processos", type: "success" },
        { name: "Time Vendas B2B", risk: 78, action: "Revisar metas", type: "warning" },
        { name: "Marketing Digital", risk: 85, action: "Manter estratégia", type: "info" },
      ],
    },
    absenteeism: {
      title: "Modelo de Absenteísmo",
      description: "Previsão de faltas e afastamentos",
      accuracy: 88.5,
      alerts: 18,
      prevented: 124,
      savings: 420,
      chartData: [
        { month: "Jan", risco: 4.2, atual: 3.8 },
        { month: "Fev", risco: 4.8, atual: 4.1 },
        { month: "Mar", risco: 5.2, atual: 4.9 },
        { month: "Abr", risco: 4.9, atual: 4.6 },
        { month: "Mai", risco: 4.1, atual: 3.9 },
        { month: "Jun", risco: 3.8, atual: 3.2 },
      ],
      factors: [
        { name: "Histórico de saúde", value: 68, color: "bg-red-500" },
        { name: "Satisfação no trabalho", value: 72, color: "bg-amber-500" },
        { name: "Distância do trabalho", value: 45, color: "bg-green-500" },
        { name: "Carga familiar", value: 58, color: "bg-amber-500" },
      ],
      alerts_list: [
        { name: "Ana Costa - Financeiro", risk: 78, action: "Acompanhamento médico", type: "danger" },
        { name: "Pedro Lima - Operações", risk: 65, action: "Flexibilidade horário", type: "warning" },
        { name: "Julia Santos - RH", risk: 42, action: "Monitoramento", type: "info" },
      ],
    },
    turnover: {
      title: "Modelo de Turnover",
      description: "Previsão de rotatividade e retenção de talentos",
      accuracy: 89.7,
      alerts: 15,
      prevented: 67,
      savings: 1200,
      chartData: [
        { month: "Jan", risco: 8.5, atual: 7.2 },
        { month: "Fev", risco: 9.1, atual: 8.8 },
        { month: "Mar", risco: 10.2, atual: 9.5 },
        { month: "Abr", risco: 9.8, atual: 9.1 },
        { month: "Mai", risco: 8.9, atual: 8.2 },
        { month: "Jun", risco: 8.1, atual: 7.8 },
      ],
      factors: [
        { name: "Satisfação salarial", value: 65, color: "bg-red-500" },
        { name: "Oportunidades de crescimento", value: 58, color: "bg-red-500" },
        { name: "Relacionamento com gestor", value: 78, color: "bg-amber-500" },
        { name: "Work-life balance", value: 72, color: "bg-amber-500" },
      ],
      alerts_list: [
        { name: "Roberto Silva - Sênior Dev", risk: 85, action: "Plano de retenção", type: "danger" },
        { name: "Fernanda Costa - Designer", risk: 72, action: "Conversa com RH", type: "warning" },
        { name: "Lucas Oliveira - Analista", risk: 58, action: "Acompanhamento", type: "info" },
      ],
    },
  }

  const currentModel = modelsData[selectedModel]

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

      <Card>
        <CardHeader>
          <CardTitle>{currentModel.title}</CardTitle>
          <CardDescription>{currentModel.description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Acurácia do Modelo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentModel.accuracy}%</div>
            <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Alertas Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{currentModel.alerts}</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Casos Prevenidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{currentModel.prevented}</div>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Economia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {currentModel.savings}K</div>
            <p className="text-xs text-muted-foreground">Em custos evitados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Previsão vs Realidade</CardTitle>
            <CardDescription>Comparativo entre previsão do modelo e dados reais</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={currentModel.chartData}>
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
            <CardTitle>Fatores de Influência</CardTitle>
            <CardDescription>Principais indicadores que afetam o modelo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentModel.factors.map((factor, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{factor.name}</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className={`${factor.color} h-2 rounded-full`} style={{ width: `${factor.value}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{factor.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas Preditivos em Tempo Real</CardTitle>
          <CardDescription>Casos identificados pelo modelo que requerem atenção</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentModel.alerts_list.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                  alert.type === "danger"
                    ? "bg-red-50 border-red-500"
                    : alert.type === "warning"
                      ? "bg-amber-50 border-amber-500"
                      : alert.type === "success"
                        ? "bg-green-50 border-green-500"
                        : "bg-blue-50 border-blue-500"
                }`}
              >
                <div>
                  <h4
                    className={`font-medium ${
                      alert.type === "danger"
                        ? "text-red-800"
                        : alert.type === "warning"
                          ? "text-amber-800"
                          : alert.type === "success"
                            ? "text-green-800"
                            : "text-blue-800"
                    }`}
                  >
                    {alert.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      alert.type === "danger"
                        ? "text-red-600"
                        : alert.type === "warning"
                          ? "text-amber-600"
                          : alert.type === "success"
                            ? "text-green-600"
                            : "text-blue-600"
                    }`}
                  >
                    {selectedModel === "productivity"
                      ? "Produtividade"
                      : selectedModel === "absenteeism"
                        ? "Risco de falta"
                        : selectedModel === "turnover"
                          ? "Risco de saída"
                          : "Risco de burnout"}
                    : {alert.risk}% | Ação recomendada: {alert.action}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ISP Diagnóstico Content
function ISPContent() {
  const [selectedView, setSelectedView] = useState("geral")
  const [selectedPillar, setSelectedPillar] = useState("geral")

  const pillars = [
    { id: "fisica", name: "Saúde Física", score: 78, color: "bg-blue-500", icon: "💪" },
    { id: "mental", name: "Saúde Mental", score: 65, color: "bg-purple-500", icon: "🧠" },
    { id: "sono", name: "Qualidade do Sono", score: 58, color: "bg-indigo-500", icon: "😴" },
    { id: "nutricional", name: "Saúde Nutricional", score: 72, color: "bg-green-500", icon: "🥗" },
    { id: "estresse", name: "Gestão de Estresse", score: 61, color: "bg-orange-500", icon: "🧘" },
    { id: "social", name: "Saúde Social", score: 81, color: "bg-pink-500", icon: "👥" },
  ]

  const overallISP = Math.round(pillars.reduce((acc, pillar) => acc + pillar.score, 0) / pillars.length)

  const getISPNote = (score) => {
    if (score >= 85) return { note: "A", description: "Excelente", color: "text-green-600" }
    if (score >= 75) return { note: "B", description: "Bom", color: "text-blue-600" }
    if (score >= 65) return { note: "C", description: "Regular", color: "text-yellow-600" }
    if (score >= 50) return { note: "D", description: "Atenção", color: "text-orange-600" }
    return { note: "F", description: "Crítico", color: "text-red-600" }
  }

  const ispNote = getISPNote(overallISP)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ISP - Índice de Saúde e Performance</h2>
        <p className="text-muted-foreground">Diagnóstico completo baseado nos 6 pilares de saúde</p>
      </div>

      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedView === "geral" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setSelectedView("geral")}
        >
          Visão Geral
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedView === "detalhada" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setSelectedView("detalhada")}
        >
          Visão Detalhada
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedView === "relatorio" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setSelectedView("relatorio")}
        >
          Relatório
        </button>
      </div>

      {selectedView === "geral" && (
        <>
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
                <div className="space-y-2">
                  <div className={`text-4xl font-bold ${ispNote.color}`}>{ispNote.note}</div>
                  <div className="text-sm text-muted-foreground">{ispNote.description}</div>
                  <div className="text-xs text-muted-foreground">Baseado em 6 pilares de saúde</div>
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
                          <div
                            className={`h-2 rounded-full ${pillar.color}`}
                            style={{ width: `${pillar.score}%` }}
                          ></div>
                        </div>
                        <div className={`text-xs mt-1 font-medium ${getISPNote(pillar.score).color}`}>
                          {getISPNote(pillar.score).note} - {getISPNote(pillar.score).description}
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
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800">Prioridade Alta</h4>
                    <p className="text-sm text-red-600">Melhorar qualidade do sono - Score atual: 58</p>
                    <Button size="sm" className="mt-2" variant="outline">
                      Ver Plano
                    </Button>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800">Prioridade Média</h4>
                    <p className="text-sm text-orange-600">Fortalecer gestão de estresse - Score atual: 61</p>
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
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Comparativo por Departamento</CardTitle>
          <CardDescription>ISP médio por área da empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { dept: "Tecnologia", isp: 73, employees: 45, note: "C" },
              { dept: "Marketing", isp: 78, employees: 23, note: "B" },
              { dept: "Vendas", isp: 71, employees: 34, note: "C" },
              { dept: "RH", isp: 82, employees: 12, note: "B" },
              { dept: "Financeiro", isp: 69, employees: 18, note: "C" },
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
                  <span className={`font-bold w-6 ${getISPNote(dept.isp).color}`}>{dept.note}</span>
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
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ROI em Saúde</h2>
        <p className="text-muted-foreground">Análise de retorno sobre investimento em saúde corporativa</p>
      </div>

      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "overview" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Visão Geral
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "scenarios" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("scenarios")}
        >
          Cenários
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "calculator" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("calculator")}
        >
          Calculadora
        </button>
      </div>

      {activeTab === "overview" && (
        <>
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
        </>
      )}

      {activeTab === "scenarios" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cenário Conservador</CardTitle>
              <CardDescription>Projeção com crescimento moderado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-blue-600">R$ 1.8M</div>
                <div className="text-sm text-muted-foreground">Retorno em 12 meses</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ROI:</span>
                    <span className="font-medium">250%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payback:</span>
                    <span className="font-medium">4.8 meses</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cenário Realista</CardTitle>
              <CardDescription>Projeção baseada em dados históricos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-green-600">R$ 2.4M</div>
                <div className="text-sm text-muted-foreground">Retorno em 12 meses</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ROI:</span>
                    <span className="font-medium">340%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payback:</span>
                    <span className="font-medium">3.5 meses</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cenário Otimista</CardTitle>
              <CardDescription>Projeção com máximo potencial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-purple-600">R$ 3.2M</div>
                <div className="text-sm text-muted-foreground">Retorno em 12 meses</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ROI:</span>
                    <span className="font-medium">450%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payback:</span>
                    <span className="font-medium">2.7 meses</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "calculator" && (
        <Card>
          <CardHeader>
            <CardTitle>Calculadora de ROI</CardTitle>
            <CardDescription>Simule diferentes cenários de investimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Investimento Mensal (R$)</label>
                  <Input type="number" defaultValue="120000" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Número de Funcionários</label>
                  <Input type="number" defaultValue="500" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Taxa de Adesão (%)</label>
                  <Input type="number" defaultValue="70" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Período (meses)</label>
                  <Input type="number" defaultValue="12" className="mt-1" />
                </div>
                <Button className="w-full">Calcular ROI</Button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800">Resultado da Simulação</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span>Investimento Total:</span>
                      <span className="font-medium">R$ 1.44M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retorno Estimado:</span>
                      <span className="font-medium">R$ 4.9M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className="font-medium text-green-600">340%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payback:</span>
                      <span className="font-medium">3.5 meses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
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
    {
      id: 4,
      title: "Atividade Física (IPAQ)",
      description: "International Physical Activity Questionnaire - Avaliação do nível de atividade física",
      duration: "7 min",
      questions: 12,
      category: "Física",
      priority: "Média",
      lastUpdated: "2024-01-08",
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
          Disponíveis (4)
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
  const [activeTab, setActiveTab] = useState("overview")

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

      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "overview" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Visão Geral
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "health-plans" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("health-plans")}
        >
          Planos de Saúde
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "hr-data" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("hr-data")}
        >
          Dados RH
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "exams" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("exams")}
        >
          Exames
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "wearables" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("wearables")}
        >
          Wearables
        </button>
      </div>

      {activeTab === "overview" && (
        <>
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
        </>
      )}

      {activeTab === "health-plans" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados dos Planos de Saúde</CardTitle>
              <CardDescription>Informações extraídas dos planos de saúde corporativos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">Beneficiários ativos</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">R$ 890K</div>
                    <p className="text-sm text-muted-foreground">Custo mensal total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">12.8%</div>
                    <p className="text-sm text-muted-foreground">Taxa de sinistralidade</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Principais Utilizações</h3>
                {[
                  { service: "Consultas Médicas", usage: 2340, cost: "R$ 234K", trend: "+5%" },
                  { service: "Exames Laboratoriais", usage: 1890, cost: "R$ 189K", trend: "+12%" },
                  { service: "Internações", usage: 45, cost: "R$ 320K", trend: "-8%" },
                  { service: "Medicamentos", usage: 3450, cost: "R$ 145K", trend: "+3%" },
                ].map((item) => (
                  <div key={item.service} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.service}</h4>
                      <p className="text-sm text-muted-foreground">{item.usage} utilizações</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.cost}</div>
                      <div className="text-sm text-green-600">{item.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "hr-data" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados de RH</CardTitle>
              <CardDescription>Informações extraídas do sistema de recursos humanos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">3.2%</div>
                    <p className="text-sm text-muted-foreground">Taxa de absenteísmo</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">8.5%</div>
                    <p className="text-sm text-muted-foreground">Taxa de turnover</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">42h</div>
                    <p className="text-sm text-muted-foreground">Horas médias/semana</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">Afastamentos/ano</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Análise por Departamento</h3>
                {[
                  { dept: "Tecnologia", employees: 145, absenteeism: 2.8, turnover: 12.3, avgHours: 44 },
                  { dept: "Marketing", employees: 67, absenteeism: 3.1, turnover: 8.9, avgHours: 41 },
                  { dept: "Vendas", employees: 89, absenteeism: 4.2, turnover: 15.6, avgHours: 43 },
                  { dept: "RH", employees: 23, absenteeism: 2.1, turnover: 4.2, avgHours: 40 },
                ].map((dept) => (
                  <div key={dept.dept} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{dept.dept}</h4>
                      <span className="text-sm text-muted-foreground">{dept.employees} funcionários</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Absenteísmo:</span>
                        <div className="font-medium">{dept.absenteeism}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Turnover:</span>
                        <div className="font-medium">{dept.turnover}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Horas/semana:</span>
                        <div className="font-medium">{dept.avgHours}h</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "exams" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload e Gestão de Exames</CardTitle>
              <CardDescription>Sistema de upload e análise de exames médicos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">1,456</div>
                    <p className="text-sm text-muted-foreground">Exames carregados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-sm text-muted-foreground">Taxa de adesão</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">23</div>
                    <p className="text-sm text-muted-foreground">Alertas críticos</p>
                  </CardContent>
                </Card>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <div className="space-y-2">
                  <div className="text-4xl">📄</div>
                  <h3 className="font-medium">Upload de Exames</h3>
                  <p className="text-sm text-muted-foreground">
                    Arraste e solte seus exames aqui ou clique para selecionar
                  </p>
                  <Button>Selecionar Arquivos</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Exames Recentes</h3>
                {[
                  { type: "Hemograma Completo", date: "2024-01-15", status: "Normal", user: "João Silva" },
                  { type: "Colesterol Total", date: "2024-01-14", status: "Alterado", user: "Maria Santos" },
                  { type: "Glicemia", date: "2024-01-13", status: "Normal", user: "Carlos Oliveira" },
                  { type: "TSH", date: "2024-01-12", status: "Alterado", user: "Ana Costa" },
                ].map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{exam.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {exam.user} - {exam.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={exam.status === "Normal" ? "default" : "destructive"}>{exam.status}</Badge>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "wearables" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados de Wearables</CardTitle>
              <CardDescription>Informações coletadas de dispositivos vestíveis</CardDescription>
            </CardHeader>
            <CardContent>
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
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Academy Content
function EducationContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Fundamentos de Saúde Mental",
      description: "Aprenda os princípios básicos para promover saúde mental no ambiente de trabalho.",
      image: "/placeholder.svg?height=200&width=300",
      category: "mental",
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
      category: "estresse",
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
      category: "nutricional",
      duration: "5h 45min",
      lessons: 15,
      progress: 30,
      rating: 4.7,
      featured: false,
    },
    {
      id: 4,
      title: "Exercícios para o Escritório",
      description: "Rotinas de exercícios adaptadas para o ambiente corporativo.",
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
    {
      id: 7,
      title: "Liderança Saudável",
      description: "Desenvolva habilidades de liderança focadas no bem-estar da equipe.",
      image: "/placeholder.svg?height=200&width=300",
      category: "lideranca",
      duration: "6h 30min",
      lessons: 18,
      progress: 0,
      rating: 4.6,
      featured: true,
    },
    {
      id: 8,
      title: "Produtividade Sustentável",
      description: "Estratégias para manter alta produtividade sem comprometer a saúde.",
      image: "/placeholder.svg?height=200&width=300",
      category: "produtividade",
      duration: "4h 45min",
      lessons: 14,
      progress: 60,
      rating: 4.7,
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

  const getCategoryName = (category) => {
    const categories = {
      mental: "Saúde Mental",
      fisica: "Saúde Física",
      nutricional: "Nutrição",
      estresse: "Gestão de Estresse",
      sono: "Sono",
      lideranca: "Liderança",
      produtividade: "Produtividade",
    }
    return categories[category] || category
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Ukor Academy</h2>
        <p className="text-muted-foreground">Cursos e treinamentos especializados em saúde e bem-estar corporativo</p>
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
              filter === "mental" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setFilter("mental")}
          >
            Saúde Mental
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "fisica" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setFilter("fisica")}
          >
            Saúde Física
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === "lideranca" ? "bg-background shadow-sm" : "text-muted-foreground"
            }`}
            onClick={() => setFilter("lideranca")}
          >
            Liderança
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
                  {getCategoryName(course.category)}
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
                  <span className="text-sm">Fundamentos de Saúde Mental</span>
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
              <CardTitle>Liderança Saudável</CardTitle>
              <CardDescription>Para gestores e líderes de equipe</CardDescription>
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
                  <span className="text-sm">Fundamentos de Liderança</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Gestão de Equipes Saudáveis</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm">Comunicação Assertiva</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">ROI em Bem-estar</span>
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
              <CardDescription>Maximize sua produtividade sustentável</CardDescription>
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
                  <span className="text-sm text-gray-500">Produtividade Sustentável</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Gestão de Energia</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Foco e Concentração</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Work-Life Balance</span>
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

// Benefits Content
function BenefitsContent() {
  const [selectedView, setSelectedView] = useState("overview")
  const [selectedPartner, setSelectedPartner] = useState("all")

  const partnersData = [
    {
      id: "wellhub",
      name: "Wellhub",
      category: "Bem-estar Físico",
      logo: "🏋️",
      status: "Ativo",
      contract: "Anual",
      users: 342,
      totalEmployees: 500,
      monthlyCost: 45000,
      costPerUser: 132,
      satisfaction: 4.6,
      utilization: 68,
      roi: 285,
      insights: [
        "Alta adesão em academias próximas ao escritório",
        "Baixa utilização de aulas online",
        "Pico de uso às 18h-20h",
      ],
      improvements: [
        "Incentivar uso de aulas virtuais",
        "Criar desafios corporativos",
        "Expandir para modalidades específicas",
      ],
    },
    {
      id: "zenklub",
      name: "Zenklub",
      category: "Saúde Mental",
      logo: "🧠",
      status: "Ativo",
      contract: "Anual",
      users: 156,
      totalEmployees: 500,
      monthlyCost: 18000,
      costPerUser: 115,
      satisfaction: 4.8,
      utilization: 31,
      roi: 420,
      insights: [
        "Maior procura por terapia individual",
        "Crescimento de 40% no último trimestre",
        "Departamento de TI com maior adesão",
      ],
      improvements: [
        "Campanhas de conscientização sobre saúde mental",
        "Workshops sobre bem-estar emocional",
        "Integração com programa de burnout",
      ],
    },
    {
      id: "telemedicina",
      name: "Telemedicina",
      category: "Saúde Geral",
      logo: "👩‍⚕️",
      status: "Ativo",
      contract: "Mensal",
      users: 289,
      totalEmployees: 500,
      monthlyCost: 12000,
      costPerUser: 41,
      satisfaction: 4.4,
      utilization: 58,
      roi: 180,
      insights: [
        "Redução de 30% em consultas presenciais",
        "Maior uso durante horário comercial",
        "Alta satisfação com especialistas",
      ],
      improvements: ["Expandir horários de atendimento", "Incluir mais especialidades", "Melhorar app mobile"],
    },
    {
      id: "vale-alimentacao",
      name: "Vale Alimentação",
      category: "Alimentação",
      logo: "🍽️",
      status: "Ativo",
      contract: "Anual",
      users: 500,
      totalEmployees: 500,
      monthlyCost: 75000,
      costPerUser: 150,
      satisfaction: 4.2,
      utilization: 100,
      roi: 120,
      insights: ["100% de adesão dos funcionários", "Preferência por supermercados", "Uso equilibrado durante o mês"],
      improvements: ["Parcerias com restaurantes saudáveis", "Educação nutricional", "Desconto em produtos orgânicos"],
    },
  ]

  const totalMonthlyCost = partnersData.reduce((acc, partner) => acc + partner.monthlyCost, 0)
  const totalUsers = partnersData.reduce((acc, partner) => acc + partner.users, 0)
  const averageROI = Math.round(
    partnersData.filter((p) => p.roi > 0).reduce((acc, partner) => acc + partner.roi, 0) /
      partnersData.filter((p) => p.roi > 0).length,
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics de Benefícios Corporativos</h2>
        <p className="text-muted-foreground">Gestão estratégica de parceiros e benefícios de saúde</p>
      </div>

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
            selectedView === "detailed" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setSelectedView("detailed")}
        >
          Análise Detalhada
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedView === "optimization" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setSelectedView("optimization")}
        >
          Otimização
        </button>
      </div>

      {selectedView === "overview" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custo Total Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {(totalMonthlyCost / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">4 parceiros ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Usuários Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">De 500 colaboradores</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">ROI Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageROI}%</div>
                <p className="text-xs text-muted-foreground">Retorno consolidado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Satisfação Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5</div>
                <p className="text-xs text-muted-foreground">De 5.0 estrelas</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnersData.map((partner) => (
              <Card key={partner.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{partner.logo}</div>
                      <div>
                        <CardTitle>{partner.name}</CardTitle>
                        <CardDescription>{partner.category}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={partner.status === "Ativo" ? "default" : "secondary"}>{partner.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Usuários</div>
                      <div className="text-lg font-bold">{partner.users}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Custo Mensal</div>
                      <div className="text-lg font-bold">R$ {(partner.monthlyCost / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Utilização</div>
                      <div className="text-lg font-bold">{partner.utilization}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">ROI</div>
                      <div className="text-lg font-bold text-green-600">{partner.roi}%</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Satisfação:</span>
                      <span className="font-medium">{partner.satisfaction} ⭐</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Custo por usuário:</span>
                      <span className="font-medium">R$ {partner.costPerUser}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedView === "detailed" && (
        <div className="space-y-6">
          {partnersData.map((partner) => (
            <Card key={partner.id}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{partner.logo}</div>
                  <div>
                    <CardTitle>{partner.name} - Análise Detalhada</CardTitle>
                    <CardDescription>Insights e métricas de performance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Principais Insights</h3>
                    <div className="space-y-2">
                      {partner.insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-sm">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Oportunidades de Melhoria</h3>
                    <div className="space-y-2">
                      {partner.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-sm">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedView === "optimization" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações de Otimização</CardTitle>
              <CardDescription>Sugestões para maximizar o ROI dos benefícios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800">Alta Prioridade</h3>
                  <p className="text-sm text-green-600 mt-1">
                    Aumentar utilização do Zenklub através de campanhas de conscientização sobre saúde mental
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Potencial de economia: R$ 15K/mês
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800">Média Prioridade</h3>
                  <p className="text-sm text-blue-600 mt-1">
                    Renegociar contrato do Wellhub baseado no volume de usuários ativos
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Potencial de economia: R$ 8K/mês
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-medium text-amber-800">Baixa Prioridade</h3>
                  <p className="text-sm text-amber-600 mt-1">
                    Expandir horários da telemedicina para aumentar utilização
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      Potencial de economia: R$ 3K/mês
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simulador de Cenários</CardTitle>
              <CardDescription>Simule diferentes configurações de benefícios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Cenário Atual</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Custo Total:</span>
                      <span className="font-medium">R$ 150K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ROI Médio:</span>
                      <span className="font-medium">{averageROI}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Satisfação:</span>
                      <span className="font-medium">4.5/5</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Cenário Otimizado</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Custo Total:</span>
                      <span className="font-medium text-green-600">R$ 124K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ROI Médio:</span>
                      <span className="font-medium text-green-600">285%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Satisfação:</span>
                      <span className="font-medium">4.7/5</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Economia Projetada</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mensal:</span>
                      <span className="font-medium text-green-600">R$ 26K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Anual:</span>
                      <span className="font-medium text-green-600">R$ 312K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payback:</span>
                      <span className="font-medium">2.3 meses</span>
                    </div>
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

// Settings Content
function SettingsContent() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
        <p className="text-muted-foreground">Gerencie configurações da plataforma e integrações</p>
      </div>

      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "general" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("general")}
        >
          Geral
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "integrations" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("integrations")}
        >
          Integrações
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "notifications" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          Notificações
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "security" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Segurança
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "users" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Usuários
        </button>
      </div>

      {activeTab === "general" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configurações básicas da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome da Empresa</label>
                <Input defaultValue="Ukor Health Analytics" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Fuso Horário</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option>America/Sao_Paulo (UTC-3)</option>
                  <option>America/New_York (UTC-5)</option>
                  <option>Europe/London (UTC+0)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Idioma Padrão</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option>Português (Brasil)</option>
                  <option>English (US)</option>
                  <option>Español</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Moeda</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option>Real (BRL)</option>
                  <option>Dólar (USD)</option>
                  <option>Euro (EUR)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de Dados</CardTitle>
              <CardDescription>Gerenciamento de coleta e retenção de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Período de Retenção</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option>2 anos</option>
                  <option>3 anos</option>
                  <option>5 anos</option>
                  <option>Indefinido</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Frequência de Backup</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option>Diário</option>
                  <option>Semanal</option>
                  <option>Mensal</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="anonymize" defaultChecked />
                <label htmlFor="anonymize" className="text-sm">
                  Anonimizar dados após 1 ano
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="gdpr" defaultChecked />
                <label htmlFor="gdpr" className="text-sm">
                  Conformidade LGPD/GDPR
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "integrations" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>APIs e Integrações</CardTitle>
              <CardDescription>Gerencie conexões com sistemas externos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "API Ukor", status: "Ativo", lastSync: "2 min atrás", version: "v2.1" },
                  { name: "Wellhub API", status: "Ativo", lastSync: "5 min atrás", version: "v1.8" },
                  { name: "Zenklub API", status: "Ativo", lastSync: "3 min atrás", version: "v2.0" },
                  { name: "Microsoft Teams", status: "Ativo", lastSync: "1 min atrás", version: "v1.5" },
                  { name: "Slack", status: "Inativo", lastSync: "2h atrás", version: "v1.2" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          integration.status === "Ativo" ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {integration.version} • Última sync: {integration.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                      <Button variant="outline" size="sm">
                        {integration.status === "Ativo" ? "Desativar" : "Ativar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>Gerencie alertas e notificações do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Alertas de Burnout</h4>
                  <p className="text-sm text-muted-foreground">Notificar quando detectar risco alto</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Relatórios Semanais</h4>
                  <p className="text-sm text-muted-foreground">Enviar resumo semanal por email</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Questionários Pendentes</h4>
                  <p className="text-sm text-muted-foreground">Lembrar usuários sobre questionários</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Metas ISP</h4>
                  <p className="text-sm text-muted-foreground">Notificar quando atingir metas</p>
                </div>
                <input type="checkbox" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Canais de Notificação</CardTitle>
              <CardDescription>Configure onde receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email Principal</label>
                <Input defaultValue="admin@empresa.com" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Webhook URL</label>
                <Input placeholder="https://..." className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Canal Slack</label>
                <Input placeholder="#health-alerts" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Teams Channel</label>
                <Input placeholder="Health Analytics" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "security" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Políticas de segurança e acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Autenticação 2FA</h4>
                  <p className="text-sm text-muted-foreground">Obrigatória para todos os usuários</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SSO (Single Sign-On)</h4>
                  <p className="text-sm text-muted-foreground">Integração com Azure AD</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div>
                <label className="text-sm font-medium">Tempo de Sessão (minutos)</label>
                <Input defaultValue="480" type="number" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Tentativas de Login</label>
                <Input defaultValue="5" type="number" className="mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logs de Auditoria</CardTitle>
              <CardDescription>Últimas atividades do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Login admin@empresa.com</span>
                  <span className="text-muted-foreground">2 min atrás</span>
                </div>
                <div className="flex justify-between">
                  <span>Configuração alterada: Notificações</span>
                  <span className="text-muted-foreground">15 min atrás</span>
                </div>
                <div className="flex justify-between">
                  <span>Novo usuário adicionado</span>
                  <span className="text-muted-foreground">1h atrás</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup automático executado</span>
                  <span className="text-muted-foreground">3h atrás</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "users" && (
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Usuários</CardTitle>
            <CardDescription>Controle de acesso e permissões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Usuários Ativos</h3>
                <Button size="sm">Adicionar Usuário</Button>
              </div>

              <div className="space-y-3">
                {[
                  { name: "João Silva", email: "joao@empresa.com", role: "Admin", lastLogin: "Agora" },
                  { name: "Maria Santos", email: "maria@empresa.com", role: "Gestor", lastLogin: "2h atrás" },
                  { name: "Carlos Oliveira", email: "carlos@empresa.com", role: "Analista", lastLogin: "1 dia atrás" },
                  { name: "Ana Costa", email: "ana@empresa.com", role: "Usuário", lastLogin: "3 dias atrás" },
                ].map((user) => (
                  <div key={user.email} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{user.role}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">Último login: {user.lastLogin}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
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
            {activeSection === "settings" && <SettingsContent />}
          </main>
        </div>
      </div>
    </div>
  )
}
