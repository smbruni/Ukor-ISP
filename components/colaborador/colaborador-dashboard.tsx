"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Activity,
  Target,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  Footprints,
  Moon,
  Droplets,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts"

export function ColaboradorDashboard({ colaborador }) {
  // Dados de saúde pessoais
  const healthMetrics = [
    {
      id: "health-score",
      title: "Health Score",
      value: "7.8",
      unit: "/10",
      change: "+0.3",
      trend: "up",
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Sua pontuação geral de saúde",
    },
    {
      id: "stress-level",
      title: "Nível de Estresse",
      value: "3.2",
      unit: "/10",
      change: "-0.8",
      trend: "down",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Baseado em frequência cardíaca e sono",
    },
    {
      id: "sleep-quality",
      title: "Qualidade do Sono",
      value: "8.1",
      unit: "h",
      change: "+0.5",
      trend: "up",
      icon: Moon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Média das últimas 7 noites",
    },
    {
      id: "hydration",
      title: "Hidratação",
      value: "2.1",
      unit: "L",
      change: "+0.3",
      trend: "up",
      icon: Droplets,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      description: "Meta diária: 2.5L",
    },
  ]

  // Dados de atividade física
  const activityData = [
    { day: "Seg", steps: 8500, calories: 320, active_minutes: 45 },
    { day: "Ter", steps: 12000, calories: 480, active_minutes: 65 },
    { day: "Qua", steps: 9800, calories: 390, active_minutes: 52 },
    { day: "Qui", steps: 11200, calories: 450, active_minutes: 58 },
    { day: "Sex", steps: 10500, calories: 420, active_minutes: 55 },
    { day: "Sáb", steps: 15000, calories: 580, active_minutes: 85 },
    { day: "Dom", steps: 7200, calories: 280, active_minutes: 35 },
  ]

  // Evolução do Health Score
  const healthScoreEvolution = [
    { month: "Out", score: 6.8, weight: 72, bp_systolic: 125 },
    { month: "Nov", score: 7.1, weight: 71.5, bp_systolic: 122 },
    { month: "Dez", score: 7.3, weight: 71, bp_systolic: 120 },
    { month: "Jan", score: 7.5, weight: 70.8, bp_systolic: 118 },
    { month: "Fev", score: 7.6, weight: 70.5, bp_systolic: 116 },
    { month: "Mar", score: 7.8, weight: 70.2, bp_systolic: 115 },
  ]

  // Próximos compromissos
  const upcomingAppointments = [
    {
      id: 1,
      type: "Check-up Preventivo",
      date: "2024-04-25",
      time: "14:30",
      provider: "Dr. Carlos Mendes",
      location: "Hospital Sírio-Libanês",
      status: "confirmado",
    },
    {
      id: 2,
      type: "Consulta Nutricional",
      date: "2024-05-02",
      time: "10:00",
      provider: "Nut. Patricia Oliveira",
      location: "Clínica NutriCorp",
      status: "agendado",
    },
    {
      id: 3,
      type: "Sessão Fisioterapia",
      date: "2024-05-05",
      time: "16:00",
      provider: "Ft. Ana Paula Santos",
      location: "FisioWork - Sede",
      status: "agendado",
    },
  ]

  // Metas pessoais
  const personalGoals = [
    {
      id: 1,
      title: "Perder 3kg",
      current: 70.2,
      target: 67,
      unit: "kg",
      progress: 68,
      deadline: "2024-06-30",
      category: "Peso",
    },
    {
      id: 2,
      title: "10.000 passos/dia",
      current: 9800,
      target: 10000,
      unit: "passos",
      progress: 98,
      deadline: "Diário",
      category: "Atividade",
    },
    {
      id: 3,
      title: "Reduzir Estresse",
      current: 3.2,
      target: 2.5,
      unit: "/10",
      progress: 72,
      deadline: "2024-05-31",
      category: "Mental",
    },
    {
      id: 4,
      title: "8h de Sono",
      current: 8.1,
      target: 8,
      unit: "h",
      progress: 100,
      deadline: "Diário",
      category: "Sono",
    },
  ]

  // Alertas e recomendações
  const healthAlerts = [
    {
      id: 1,
      type: "success",
      title: "Parabéns!",
      message: "Você atingiu sua meta de passos por 5 dias consecutivos",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: 2,
      type: "warning",
      title: "Atenção",
      message: "Sua hidratação está abaixo da meta. Beba mais 400ml hoje",
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      id: 3,
      type: "info",
      title: "Lembrete",
      message: "Check-up preventivo agendado para amanhã às 14:30",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Saudação e resumo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Olá, Ana Paula! 👋</h2>
            <p className="text-blue-100 mt-1">Como está sua saúde hoje?</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{colaborador.healthScore}</div>
            <div className="text-sm text-blue-100">Health Score</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-xl font-semibold">{colaborador.activePrograms}</div>
            <div className="text-xs text-blue-100">Programas Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">98%</div>
            <div className="text-xs text-blue-100">Meta Passos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">Baixo</div>
            <div className="text-xs text-blue-100">Risco</div>
          </div>
        </div>
      </div>

      {/* Alertas e Notificações */}
      <div className="space-y-3">
        {healthAlerts.map((alert) => (
          <Card key={alert.id} className={`${alert.bgColor} ${alert.borderColor} border-l-4`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <alert.icon className={`h-5 w-5 ${alert.color} mt-0.5`} />
                <div className="flex-1">
                  <h4 className={`font-semibold ${alert.color}`}>{alert.title}</h4>
                  <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Métricas de Saúde */}
      <div className="grid grid-cols-2 gap-4">
        {healthMetrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div
                  className={`flex items-center text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {metric.value}
                  <span className="text-sm text-gray-500 font-normal">{metric.unit}</span>
                </div>
                <div className="text-sm font-medium text-gray-900 mt-1">{metric.title}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Atividade da Semana */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Footprints className="h-5 w-5 mr-2 text-blue-600" />
            Atividade da Semana
          </CardTitle>
          <CardDescription>Passos, calorias e minutos ativos</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="steps" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} name="Passos" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Evolução do Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Evolução do Health Score
          </CardTitle>
          <CardDescription>Progresso dos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={healthScoreEvolution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[6, 8]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} name="Health Score" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Minhas Metas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            Minhas Metas
          </CardTitle>
          <CardDescription>Progresso dos objetivos pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {personalGoals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{goal.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {goal.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span>{goal.deadline}</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">{goal.progress}% concluído</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próximos Compromissos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-orange-600" />
            Próximos Compromissos
          </CardTitle>
          <CardDescription>Consultas e exames agendados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{appointment.type}</h4>
                  <p className="text-xs text-gray-600">{appointment.provider}</p>
                  <p className="text-xs text-gray-500">{appointment.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{new Date(appointment.date).toLocaleDateString("pt-BR")}</div>
                  <div className="text-xs text-gray-600">{appointment.time}</div>
                  <Badge
                    variant={appointment.status === "confirmado" ? "default" : "secondary"}
                    className="text-xs mt-1"
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-transparent" variant="outline">
            Ver Todos os Compromissos
          </Button>
        </CardContent>
      </Card>

      {/* Conquistas Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-600" />
            Conquistas Recentes
          </CardTitle>
          <CardDescription>Suas últimas conquistas de saúde</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                title: "Streak de 7 dias",
                description: "Meta de passos atingida por 7 dias consecutivos",
                date: "Hoje",
                icon: Footprints,
                color: "text-green-600",
              },
              {
                title: "Peso ideal atingido",
                description: "Parabéns! Você atingiu 70kg",
                date: "2 dias atrás",
                icon: Target,
                color: "text-blue-600",
              },
              {
                title: "Sono de qualidade",
                description: "Média de 8h de sono por 5 noites",
                date: "1 semana atrás",
                icon: Moon,
                color: "text-purple-600",
              },
            ].map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg">
                  <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
                <div className="text-xs text-gray-500">{achievement.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
