"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Activity,
  Scale,
  Thermometer,
  Eye,
  Stethoscope,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Plus,
  Edit,
  Download,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

export function MinhaSaude({ colaborador }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados vitais atuais
  const vitalSigns = [
    {
      id: "blood-pressure",
      name: "Pressão Arterial",
      value: "115/75",
      unit: "mmHg",
      status: "normal",
      lastUpdate: "2024-04-20",
      trend: "stable",
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      reference: "< 120/80",
    },
    {
      id: "heart-rate",
      name: "Frequência Cardíaca",
      value: "68",
      unit: "bpm",
      status: "normal",
      lastUpdate: "2024-04-20",
      trend: "down",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      reference: "60-100",
    },
    {
      id: "weight",
      name: "Peso",
      value: "70.2",
      unit: "kg",
      status: "normal",
      lastUpdate: "2024-04-19",
      trend: "down",
      icon: Scale,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      reference: "IMC: 22.1",
    },
    {
      id: "temperature",
      name: "Temperatura",
      value: "36.5",
      unit: "°C",
      status: "normal",
      lastUpdate: "2024-04-20",
      trend: "stable",
      icon: Thermometer,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      reference: "36.1-37.2",
    },
  ]

  // Histórico de peso
  const weightHistory = [
    { month: "Out/23", weight: 72.5, imc: 22.8 },
    { month: "Nov/23", weight: 72.0, imc: 22.6 },
    { month: "Dez/23", weight: 71.5, imc: 22.4 },
    { month: "Jan/24", weight: 71.0, imc: 22.3 },
    { month: "Fev/24", weight: 70.8, imc: 22.2 },
    { month: "Mar/24", weight: 70.5, imc: 22.1 },
    { month: "Abr/24", weight: 70.2, imc: 22.1 },
  ]

  // Histórico de pressão arterial
  const bloodPressureHistory = [
    { date: "15/04", systolic: 118, diastolic: 78, time: "08:00" },
    { date: "16/04", systolic: 115, diastolic: 75, time: "08:15" },
    { date: "17/04", systolic: 120, diastolic: 80, time: "08:30" },
    { date: "18/04", systolic: 116, diastolic: 76, time: "08:00" },
    { date: "19/04", systolic: 114, diastolic: 74, time: "08:10" },
    { date: "20/04", systolic: 115, diastolic: 75, time: "08:05" },
  ]

  // Fatores de risco
  const riskFactors = [
    {
      id: "smoking",
      name: "Tabagismo",
      status: "low",
      value: "Não fumante",
      description: "Parou há 2 anos",
      impact: "Baixo",
    },
    {
      id: "alcohol",
      name: "Consumo de Álcool",
      status: "low",
      value: "Moderado",
      description: "1-2 doses/semana",
      impact: "Baixo",
    },
    {
      id: "exercise",
      name: "Atividade Física",
      status: "good",
      value: "Regular",
      description: "4x por semana",
      impact: "Protetor",
    },
    {
      id: "stress",
      name: "Nível de Estresse",
      status: "medium",
      value: "Moderado",
      description: "3.2/10",
      impact: "Médio",
    },
    {
      id: "sleep",
      name: "Qualidade do Sono",
      status: "good",
      value: "Boa",
      description: "8.1h/noite",
      impact: "Protetor",
    },
    {
      id: "nutrition",
      name: "Alimentação",
      status: "good",
      value: "Balanceada",
      description: "Score: 8.2/10",
      impact: "Protetor",
    },
  ]

  // Exames pendentes
  const pendingExams = [
    {
      id: 1,
      name: "Hemograma Completo",
      type: "Laboratorial",
      priority: "normal",
      dueDate: "2024-05-15",
      provider: "Lab Fleury",
      preparation: "Jejum de 12h",
    },
    {
      id: 2,
      name: "Colesterol Total",
      type: "Laboratorial",
      priority: "normal",
      dueDate: "2024-05-15",
      provider: "Lab Fleury",
      preparation: "Jejum de 12h",
    },
    {
      id: 3,
      name: "Mamografia",
      type: "Imagem",
      priority: "high",
      dueDate: "2024-04-30",
      provider: "Centro de Diagnóstico",
      preparation: "Não usar desodorante",
    },
  ]

  // Medicamentos atuais
  const currentMedications = [
    {
      id: 1,
      name: "Vitamina D3",
      dosage: "2000 UI",
      frequency: "1x ao dia",
      duration: "Contínuo",
      purpose: "Suplementação",
      nextRefill: "2024-05-10",
    },
    {
      id: 2,
      name: "Ômega 3",
      dosage: "1000mg",
      frequency: "1x ao dia",
      duration: "Contínuo",
      purpose: "Saúde cardiovascular",
      nextRefill: "2024-05-05",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
      case "good":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Minha Saúde</h2>
        <p className="text-gray-600 mt-1">Acompanhe seus indicadores de saúde e bem-estar</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="vitals">Sinais Vitais</TabsTrigger>
          <TabsTrigger value="exams">Exames</TabsTrigger>
          <TabsTrigger value="medications">Medicamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Health Score */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Health Score Atual</h3>
                  <p className="text-gray-600 text-sm">Baseado em todos os seus indicadores</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-600">{colaborador.healthScore}</div>
                  <div className="text-sm text-gray-500">/10</div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">Excelente</Badge>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={colaborador.healthScore * 10} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Sinais Vitais Resumo */}
          <div className="grid grid-cols-2 gap-4">
            {vitalSigns.map((vital) => (
              <Card key={vital.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${vital.bgColor}`}>
                      <vital.icon className={`h-5 w-5 ${vital.color}`} />
                    </div>
                    {getTrendIcon(vital.trend)}
                  </div>
                  <div>
                    <div className="text-xl font-bold">
                      {vital.value}
                      <span className="text-sm text-gray-500 font-normal ml-1">{vital.unit}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{vital.name}</div>
                    <div className="text-xs text-gray-500 mt-1">Ref: {vital.reference}</div>
                    <Badge className={`${getStatusColor(vital.status)} text-xs mt-2`}>
                      {vital.status === "normal" ? "Normal" : vital.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fatores de Risco */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Fatores de Risco
              </CardTitle>
              <CardDescription>Avaliação dos seus fatores de risco para doenças</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {riskFactors.map((factor) => (
                  <div key={factor.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{factor.name}</h4>
                      <p className="text-xs text-gray-600">{factor.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{factor.value}</div>
                      <Badge className={`${getStatusColor(factor.status)} text-xs mt-1`}>{factor.impact}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exames Pendentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Exames Pendentes
              </CardTitle>
              <CardDescription>Exames que você precisa realizar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{exam.name}</h4>
                      <p className="text-xs text-gray-600">{exam.provider}</p>
                      <p className="text-xs text-gray-500">{exam.preparation}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{new Date(exam.dueDate).toLocaleDateString("pt-BR")}</div>
                      <Badge
                        className={`text-xs mt-1 ${
                          exam.priority === "high"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-blue-100 text-blue-800 border-blue-200"
                        }`}
                      >
                        {exam.priority === "high" ? "Urgente" : "Normal"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-transparent" variant="outline">
                Agendar Exames
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          {/* Evolução do Peso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-purple-600" />
                Evolução do Peso
              </CardTitle>
              <CardDescription>Histórico dos últimos 7 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={weightHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[69, 73]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#8b5cf6" strokeWidth={3} name="Peso (kg)" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Histórico de Pressão Arterial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Pressão Arterial - Últimos 7 dias
              </CardTitle>
              <CardDescription>Medições matinais</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={bloodPressureHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[70, 125]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} name="Sistólica" />
                  <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} name="Diastólica" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Adicionar Nova Medição */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2 text-green-600" />
                Registrar Nova Medição
              </CardTitle>
              <CardDescription>Adicione suas medições diárias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-16 flex flex-col items-center justify-center bg-transparent" variant="outline">
                  <Heart className="h-6 w-6 mb-1" />
                  <span className="text-sm">Pressão Arterial</span>
                </Button>
                <Button className="h-16 flex flex-col items-center justify-center bg-transparent" variant="outline">
                  <Scale className="h-6 w-6 mb-1" />
                  <span className="text-sm">Peso</span>
                </Button>
                <Button className="h-16 flex flex-col items-center justify-center bg-transparent" variant="outline">
                  <Activity className="h-6 w-6 mb-1" />
                  <span className="text-sm">Freq. Cardíaca</span>
                </Button>
                <Button className="h-16 flex flex-col items-center justify-center bg-transparent" variant="outline">
                  <Thermometer className="h-6 w-6 mb-1" />
                  <span className="text-sm">Temperatura</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams" className="space-y-6">
          {/* Exames Pendentes Detalhados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Exames Pendentes
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Agendar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingExams.map((exam) => (
                  <Card key={exam.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{exam.name}</h4>
                        <Badge
                          className={
                            exam.priority === "high"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-blue-100 text-blue-800 border-blue-200"
                          }
                        >
                          {exam.priority === "high" ? "Urgente" : "Normal"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Tipo:</span>
                          <div className="font-medium">{exam.type}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Prazo:</span>
                          <div className="font-medium">{new Date(exam.dueDate).toLocaleDateString("pt-BR")}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Local:</span>
                          <div className="font-medium">{exam.provider}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Preparo:</span>
                          <div className="font-medium">{exam.preparation}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1">
                          Agendar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Exames */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-green-600" />
                Histórico de Exames
              </CardTitle>
              <CardDescription>Últimos exames realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "Hemograma Completo",
                    date: "2024-01-15",
                    result: "Normal",
                    provider: "Lab Fleury",
                  },
                  {
                    name: "Colesterol Total",
                    date: "2024-01-15",
                    result: "180 mg/dL",
                    provider: "Lab Fleury",
                  },
                  {
                    name: "Glicemia de Jejum",
                    date: "2024-01-15",
                    result: "85 mg/dL",
                    provider: "Lab Fleury",
                  },
                ].map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{exam.name}</h4>
                      <p className="text-xs text-gray-600">{exam.provider}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{exam.result}</div>
                      <div className="text-xs text-gray-500">{new Date(exam.date).toLocaleDateString("pt-BR")}</div>
                    </div>
                    <Button size="sm" variant="ghost" className="ml-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          {/* Medicamentos Atuais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-600" />
                  Medicamentos Atuais
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentMedications.map((medication) => (
                  <Card key={medication.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{medication.name}</h4>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Dosagem:</span>
                          <div className="font-medium">{medication.dosage}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Frequência:</span>
                          <div className="font-medium">{medication.frequency}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Duração:</span>
                          <div className="font-medium">{medication.duration}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Próxima Compra:</span>
                          <div className="font-medium">
                            {new Date(medication.nextRefill).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-gray-50 rounded">
                        <span className="text-xs text-gray-600">Finalidade:</span>
                        <div className="text-sm font-medium">{medication.purpose}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lembretes de Medicação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Lembretes de Hoje
              </CardTitle>
              <CardDescription>Medicamentos para tomar hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "08:00", medication: "Vitamina D3", taken: true },
                  { time: "12:00", medication: "Ômega 3", taken: false },
                  { time: "20:00", medication: "Vitamina D3", taken: false },
                ].map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium">{reminder.time}</div>
                      <div className="text-sm">{reminder.medication}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {reminder.taken ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Tomado</Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          Marcar como Tomado
                        </Button>
                      )}
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
