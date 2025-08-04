"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Heart,
  Brain,
  Bone,
  Eye,
  Stethoscope,
  Activity,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Phone,
  FileText,
  BarChart3,
  Shield,
} from "lucide-react"

export function CareLinesContent() {
  const [selectedCareLine, setSelectedCareLine] = useState("cardiology")
  const [selectedPeriod, setSelectedPeriod] = useState("6m")

  // Linhas de cuidado disponíveis
  const careLines = [
    {
      id: "cardiology",
      name: "Cardiologia",
      icon: Heart,
      color: "red",
      patients: 342,
      risk: "Alto",
      cost: "R$ 245k",
      satisfaction: 4.2,
      protocols: 8,
    },
    {
      id: "diabetes",
      name: "Diabetes",
      icon: Activity,
      color: "blue",
      patients: 198,
      risk: "Alto",
      cost: "R$ 189k",
      satisfaction: 4.5,
      protocols: 6,
    },
    {
      id: "mental-health",
      name: "Saúde Mental",
      icon: Brain,
      color: "purple",
      patients: 156,
      risk: "Crítico",
      cost: "R$ 167k",
      satisfaction: 4.1,
      protocols: 5,
    },
    {
      id: "orthopedics",
      name: "Ortopedia",
      icon: Bone,
      color: "orange",
      patients: 234,
      risk: "Médio",
      cost: "R$ 134k",
      satisfaction: 4.3,
      protocols: 7,
    },
    {
      id: "oncology",
      name: "Oncologia",
      icon: Shield,
      color: "pink",
      patients: 23,
      risk: "Crítico",
      cost: "R$ 298k",
      satisfaction: 4.7,
      protocols: 12,
    },
    {
      id: "ophthalmology",
      name: "Oftalmologia",
      icon: Eye,
      color: "green",
      patients: 445,
      risk: "Baixo",
      cost: "R$ 98k",
      satisfaction: 4.0,
      protocols: 4,
    },
  ]

  // Dados detalhados da linha de cardiologia
  const cardiologyData = {
    overview: {
      totalPatients: 342,
      activeProtocols: 8,
      monthlyConsultations: 156,
      emergencyRate: "2.3%",
      adherenceRate: "87%",
      avgRiskScore: 6.8,
    },
    riskDistribution: [
      { risk: "Baixo", count: 89, percentage: 26, color: "#10b981" },
      { risk: "Médio", count: 156, percentage: 46, color: "#f59e0b" },
      { risk: "Alto", count: 78, percentage: 23, color: "#ef4444" },
      { risk: "Crítico", count: 19, percentage: 5, color: "#dc2626" },
    ],
    monthlyTrend: [
      { month: "Jan", patients: 298, consultations: 134, emergencies: 8, costs: 198000 },
      { month: "Fev", patients: 312, consultations: 142, emergencies: 6, costs: 212000 },
      { month: "Mar", patients: 325, consultations: 148, emergencies: 9, costs: 225000 },
      { month: "Abr", patients: 334, consultations: 152, emergencies: 7, costs: 234000 },
      { month: "Mai", patients: 339, consultations: 154, emergencies: 8, costs: 241000 },
      { month: "Jun", patients: 342, consultations: 156, emergencies: 8, costs: 245000 },
    ],
    protocols: [
      {
        name: "Hipertensão Arterial",
        patients: 156,
        adherence: 89,
        effectiveness: 92,
        cost: "R$ 89k",
        status: "active",
      },
      {
        name: "Insuficiência Cardíaca",
        patients: 67,
        adherence: 85,
        effectiveness: 88,
        cost: "R$ 67k",
        status: "active",
      },
      {
        name: "Arritmias",
        patients: 45,
        adherence: 91,
        effectiveness: 85,
        cost: "R$ 45k",
        status: "active",
      },
      {
        name: "Prevenção Primária",
        patients: 74,
        adherence: 76,
        effectiveness: 94,
        cost: "R$ 34k",
        status: "expanding",
      },
    ],
    specialists: [
      {
        name: "Dr. Carlos Mendes",
        specialty: "Cardiologia Clínica",
        patients: 89,
        satisfaction: 4.6,
        availability: "95%",
        nextSlot: "Hoje 14:30",
      },
      {
        name: "Dra. Ana Rodrigues",
        specialty: "Cardiologia Intervencionista",
        patients: 67,
        satisfaction: 4.8,
        availability: "87%",
        nextSlot: "Amanhã 09:00",
      },
      {
        name: "Dr. Roberto Silva",
        specialty: "Eletrofisiologia",
        patients: 45,
        satisfaction: 4.5,
        availability: "92%",
        nextSlot: "Hoje 16:00",
      },
    ],
    alerts: [
      {
        type: "critical",
        message: "3 pacientes com risco crítico necessitam avaliação urgente",
        time: "há 15 min",
        action: "Agendar consulta",
      },
      {
        type: "warning",
        message: "Taxa de adesão ao protocolo de hipertensão abaixo de 90%",
        time: "há 2h",
        action: "Revisar protocolo",
      },
      {
        type: "info",
        message: "Nova diretriz de prevenção cardiovascular disponível",
        time: "há 1 dia",
        action: "Atualizar protocolos",
      },
    ],
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Crítico":
        return "bg-red-100 text-red-800"
      case "Alto":
        return "bg-orange-100 text-orange-800"
      case "Médio":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getAlertBorderColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-l-red-500 bg-red-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      default:
        return "border-l-blue-500 bg-blue-50"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Linhas de Cuidado</h1>
          <p className="text-gray-600 mt-1">Gestão especializada por condição de saúde • 12 protocolos ativos</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Protocolos
          </Button>
          <Button size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Relatório Geral
          </Button>
        </div>
      </div>

      {/* Overview das Linhas de Cuidado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careLines.map((line) => (
          <Card
            key={line.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedCareLine === line.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setSelectedCareLine(line.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${line.color}-100`}>
                    <line.icon className={`h-5 w-5 text-${line.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{line.name}</h3>
                    <p className="text-sm text-gray-600">{line.patients} pacientes</p>
                  </div>
                </div>
                <Badge className={getRiskColor(line.risk)}>{line.risk}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Custo Mensal:</span>
                  <div className="font-medium">{line.cost}</div>
                </div>
                <div>
                  <span className="text-gray-600">Satisfação:</span>
                  <div className="font-medium">{line.satisfaction}/5.0</div>
                </div>
                <div>
                  <span className="text-gray-600">Protocolos:</span>
                  <div className="font-medium">{line.protocols} ativos</div>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <div className="font-medium text-green-600">Ativo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detalhamento da Linha Selecionada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Cardiologia - Gestão Detalhada
          </CardTitle>
          <CardDescription>Monitoramento completo da linha de cuidado cardiovascular</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="patients">Pacientes</TabsTrigger>
              <TabsTrigger value="protocols">Protocolos</TabsTrigger>
              <TabsTrigger value="specialists">Especialistas</TabsTrigger>
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Métricas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{cardiologyData.overview.totalPatients}</div>
                  <div className="text-sm text-blue-700">Pacientes Ativos</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{cardiologyData.overview.activeProtocols}</div>
                  <div className="text-sm text-green-700">Protocolos</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {cardiologyData.overview.monthlyConsultations}
                  </div>
                  <div className="text-sm text-purple-700">Consultas/Mês</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{cardiologyData.overview.emergencyRate}</div>
                  <div className="text-sm text-red-700">Taxa Emergência</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{cardiologyData.overview.adherenceRate}</div>
                  <div className="text-sm text-yellow-700">Adesão</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{cardiologyData.overview.avgRiskScore}</div>
                  <div className="text-sm text-orange-700">Score Risco</div>
                </div>
              </div>

              {/* Gráficos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tendência Mensal</CardTitle>
                    <CardDescription>Evolução de pacientes e consultas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cardiologyData.monthlyTrend}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2} name="Pacientes" />
                          <Line
                            type="monotone"
                            dataKey="consultations"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Consultas"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Risco</CardTitle>
                    <CardDescription>Estratificação dos pacientes por nível de risco</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={cardiologyData.riskDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ risk, percentage }) => `${risk}: ${percentage}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {cardiologyData.riskDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="protocols" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cardiologyData.protocols.map((protocol, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{protocol.name}</CardTitle>
                          <CardDescription>{protocol.patients} pacientes ativos</CardDescription>
                        </div>
                        <Badge variant={protocol.status === "active" ? "default" : "secondary"} className="text-xs">
                          {protocol.status === "active" ? "Ativo" : "Expandindo"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Adesão:</span>
                          <div className="font-medium">{protocol.adherence}%</div>
                          <Progress value={protocol.adherence} className="h-2 mt-1" />
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Efetividade:</span>
                          <div className="font-medium">{protocol.effectiveness}%</div>
                          <Progress value={protocol.effectiveness} className="h-2 mt-1" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-sm font-medium">Custo Mensal: {protocol.cost}</span>
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specialists" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cardiologyData.specialists.map((specialist, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Stethoscope className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="font-semibold">{specialist.name}</h3>
                        <p className="text-sm text-gray-600">{specialist.specialty}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Pacientes:</span>
                          <span className="font-medium">{specialist.patients}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Satisfação:</span>
                          <span className="font-medium">{specialist.satisfaction}/5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Disponibilidade:</span>
                          <span className="font-medium text-green-600">{specialist.availability}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="text-xs text-gray-500 mb-2">Próximo horário:</div>
                          <div className="text-sm font-medium">{specialist.nextSlot}</div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Agendar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <div className="space-y-4">
                {cardiologyData.alerts.map((alert, index) => (
                  <div key={index} className={`p-4 border-l-4 rounded-lg ${getAlertBorderColor(alert.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{alert.message}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {alert.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
