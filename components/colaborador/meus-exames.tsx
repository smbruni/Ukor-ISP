"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  FileText,
  Download,
  Eye,
  Clock,
  MapPin,
  User,
  Phone,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Share,
  Stethoscope,
  Activity,
} from "lucide-react"

export function MeusExames({ colaborador }) {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchTerm, setSearchTerm] = useState("")

  // Próximos exames e consultas
  const upcomingExams = [
    {
      id: 1,
      type: "consulta",
      name: "Check-up Preventivo",
      specialty: "Clínica Médica",
      date: "2024-04-25",
      time: "14:30",
      provider: {
        name: "Dr. Carlos Mendes",
        clinic: "Hospital Sírio-Libanês",
        address: "Rua Adma Jafet, 91 - Bela Vista, São Paulo",
        phone: "(11) 3155-1000",
      },
      status: "confirmado",
      preparation: "Jejum de 12 horas",
      duration: "60 minutos",
      cost: "Coberto pelo plano",
      notes: "Trazer exames anteriores",
      reminders: ["24h antes", "2h antes"],
    },
    {
      id: 2,
      type: "exame",
      name: "Hemograma Completo",
      specialty: "Laboratório",
      date: "2024-04-28",
      time: "08:00",
      provider: {
        name: "Lab Fleury",
        clinic: "Unidade Paraíso",
        address: "Rua Cincinato Braga, 282 - Paraíso, São Paulo",
        phone: "(11) 5014-7700",
      },
      status: "agendado",
      preparation: "Jejum de 12 horas, não tomar medicamentos",
      duration: "15 minutos",
      cost: "R$ 0,00 (Coberto)",
      notes: "Resultado em 24h",
      reminders: ["24h antes"],
    },
    {
      id: 3,
      type: "consulta",
      name: "Consulta Nutricional",
      specialty: "Nutrição",
      date: "2024-05-02",
      time: "10:00",
      provider: {
        name: "Nut. Patricia Oliveira",
        clinic: "Clínica NutriCorp",
        address: "Av. Paulista, 1578 - Bela Vista, São Paulo",
        phone: "(11) 3251-2000",
      },
      status: "agendado",
      preparation: "Trazer diário alimentar dos últimos 7 dias",
      duration: "45 minutos",
      cost: "Coberto pelo programa",
      notes: "Primeira consulta do programa nutricional",
      reminders: ["24h antes", "2h antes"],
    },
    {
      id: 4,
      type: "exame",
      name: "Mamografia",
      specialty: "Radiologia",
      date: "2024-05-10",
      time: "15:00",
      provider: {
        name: "Centro de Diagnóstico",
        clinic: "Unidade Vila Olímpia",
        address: "Rua Funchal, 375 - Vila Olímpia, São Paulo",
        phone: "(11) 3045-3000",
      },
      status: "pendente",
      preparation: "Não usar desodorante, talco ou creme no dia",
      duration: "30 minutos",
      cost: "Coberto pelo plano",
      notes: "Exame preventivo anual",
      reminders: ["48h antes", "24h antes"],
    },
  ]

  // Histórico de exames
  const examHistory = [
    {
      id: 5,
      type: "exame",
      name: "Hemograma Completo",
      date: "2024-01-15",
      provider: "Lab Fleury",
      status: "concluído",
      results: {
        summary: "Todos os valores dentro da normalidade",
        details: [
          { parameter: "Hemoglobina", value: "13.2 g/dL", reference: "12.0-15.5", status: "normal" },
          { parameter: "Hematócrito", value: "39.8%", reference: "36.0-46.0", status: "normal" },
          { parameter: "Leucócitos", value: "6.800/mm³", reference: "4.000-11.000", status: "normal" },
          { parameter: "Plaquetas", value: "285.000/mm³", reference: "150.000-450.000", status: "normal" },
        ],
        observations: "Exame dentro dos parâmetros normais. Manter acompanhamento anual.",
      },
      files: ["hemograma_15012024.pdf"],
    },
    {
      id: 6,
      type: "exame",
      name: "Colesterol Total e Frações",
      date: "2024-01-15",
      provider: "Lab Fleury",
      status: "concluído",
      results: {
        summary: "Colesterol total levemente elevado",
        details: [
          { parameter: "Colesterol Total", value: "195 mg/dL", reference: "< 190", status: "borderline" },
          { parameter: "HDL", value: "58 mg/dL", reference: "> 40", status: "normal" },
          { parameter: "LDL", value: "125 mg/dL", reference: "< 130", status: "normal" },
          { parameter: "Triglicérides", value: "98 mg/dL", reference: "< 150", status: "normal" },
        ],
        observations: "Manter dieta equilibrada e atividade física regular. Reavaliar em 6 meses.",
      },
      files: ["colesterol_15012024.pdf"],
    },
    {
      id: 7,
      type: "consulta",
      name: "Consulta Cardiológica",
      date: "2024-02-20",
      provider: "Dr. Roberto Silva - InCor",
      status: "concluído",
      results: {
        summary: "Avaliação cardiovascular normal",
        details: [
          { parameter: "Pressão Arterial", value: "118/76 mmHg", reference: "< 120/80", status: "normal" },
          { parameter: "Frequência Cardíaca", value: "68 bpm", reference: "60-100", status: "normal" },
          { parameter: "ECG", value: "Normal", reference: "Normal", status: "normal" },
        ],
        observations: "Coração saudável. Manter atividade física regular e dieta balanceada.",
      },
      files: ["consulta_cardiologica_20022024.pdf", "ecg_20022024.pdf"],
    },
    {
      id: 8,
      type: "exame",
      name: "Ultrassom Abdominal",
      date: "2024-03-10",
      provider: "Centro de Diagnóstico",
      status: "concluído",
      results: {
        summary: "Exame normal",
        details: [
          { parameter: "Fígado", value: "Normal", reference: "Normal", status: "normal" },
          { parameter: "Vesícula", value: "Normal", reference: "Normal", status: "normal" },
          { parameter: "Rins", value: "Normais", reference: "Normais", status: "normal" },
          { parameter: "Baço", value: "Normal", reference: "Normal", status: "normal" },
        ],
        observations: "Órgãos abdominais sem alterações. Exame dentro da normalidade.",
      },
      files: ["ultrassom_abdominal_10032024.pdf"],
    },
  ]

  // Lembretes e notificações
  const reminders = [
    {
      id: 1,
      type: "lembrete",
      title: "Check-up amanhã",
      message: "Lembre-se: jejum de 12h para o check-up preventivo",
      date: "2024-04-24",
      time: "14:30",
      priority: "high",
    },
    {
      id: 2,
      type: "resultado",
      title: "Resultado disponível",
      message: "Resultado do hemograma já está disponível",
      date: "2024-04-20",
      time: "10:00",
      priority: "medium",
    },
    {
      id: 3,
      type: "agendamento",
      title: "Agendar mamografia",
      message: "Lembre-se de agendar sua mamografia anual",
      date: "2024-04-15",
      time: "09:00",
      priority: "medium",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800 border-green-200"
      case "agendado":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "concluído":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "confirmado":
        return "Confirmado"
      case "agendado":
        return "Agendado"
      case "pendente":
        return "Pendente"
      case "concluído":
        return "Concluído"
      case "cancelado":
        return "Cancelado"
      default:
        return status
    }
  }

  const getResultStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "borderline":
        return "text-yellow-600"
      case "altered":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "consulta":
        return <Stethoscope className="h-5 w-5" />
      case "exame":
        return <Activity className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Meus Exames</h2>
        <p className="text-gray-600 mt-1">Acompanhe suas consultas, exames e resultados</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {upcomingExams.filter((e) => e.status !== "pendente").length}
                </div>
                <div className="text-sm text-gray-600">Próximos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{examHistory.length}</div>
                <div className="text-sm text-gray-600">Realizados</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lembretes Importantes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            Lembretes Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reminders.slice(0, 3).map((reminder) => (
              <div key={reminder.id} className={`p-3 border-l-4 rounded-r-lg ${getPriorityColor(reminder.priority)}`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{reminder.title}</h4>
                  <span className="text-xs text-gray-500">{new Date(reminder.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{reminder.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Próximos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {/* Busca e Filtros */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar exames..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Lista de Próximos Exames */}
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">{getTypeIcon(exam.type)}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{exam.name}</h3>
                        <p className="text-sm text-gray-600">{exam.specialty}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(exam.status)}>{getStatusLabel(exam.status)}</Badge>
                  </div>

                  {/* Data e Hora */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">
                          {new Date(exam.date).toLocaleDateString("pt-BR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-xs text-gray-500">{exam.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">{exam.duration}</div>
                        <div className="text-xs text-gray-500">{exam.cost}</div>
                      </div>
                    </div>
                  </div>

                  {/* Profissional e Local */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{exam.provider.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{exam.provider.clinic}</span>
                    </div>
                    <div className="text-xs text-gray-500 ml-6">{exam.provider.address}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{exam.provider.phone}</span>
                    </div>
                  </div>

                  {/* Preparação */}
                  {exam.preparation && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                      <h4 className="font-medium text-sm text-yellow-800 mb-1">Preparação Necessária:</h4>
                      <p className="text-sm text-yellow-700">{exam.preparation}</p>
                    </div>
                  )}

                  {/* Observações */}
                  {exam.notes && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                      <h4 className="font-medium text-sm text-blue-800 mb-1">Observações:</h4>
                      <p className="text-sm text-blue-700">{exam.notes}</p>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-1" />
                      Reagendar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4 mr-1" />
                      Compartilhar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão para Agendar Novo Exame */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-dashed">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Plus className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">Agendar Novo Exame</h3>
                <p className="text-gray-600 text-sm">Precisa agendar uma consulta ou exame?</p>
              </div>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                Agendar Agora
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {/* Filtros de Histórico */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar no histórico..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Lista do Histórico */}
          <div className="space-y-4">
            {examHistory.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">{getTypeIcon(exam.type)}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{exam.name}</h3>
                        <p className="text-sm text-gray-600">{exam.provider}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(exam.status)}>{getStatusLabel(exam.status)}</Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(exam.date).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>

                  {/* Resumo dos Resultados */}
                  {exam.results && (
                    <div className="p-3 bg-gray-50 rounded-lg mb-4">
                      <h4 className="font-medium text-sm mb-2">Resumo:</h4>
                      <p className="text-sm text-gray-700">{exam.results.summary}</p>
                    </div>
                  )}

                  {/* Arquivos */}
                  {exam.files && exam.files.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Arquivos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exam.files.map((file, index) => (
                          <Button key={index} variant="outline" size="sm" className="text-xs bg-transparent">
                            <FileText className="h-3 w-3 mr-1" />
                            {file}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Resultados
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4 mr-1" />
                      Compartilhar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {/* Resultados Detalhados */}
          <div className="space-y-4">
            {examHistory
              .filter((exam) => exam.results)
              .map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(exam.type)}
                        <span>{exam.name}</span>
                      </div>
                      <Badge variant="outline">{new Date(exam.date).toLocaleDateString("pt-BR")}</Badge>
                    </CardTitle>
                    <CardDescription>{exam.provider}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Resumo */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                      <h4 className="font-medium text-sm text-blue-800 mb-1">Resumo:</h4>
                      <p className="text-sm text-blue-700">{exam.results.summary}</p>
                    </div>

                    {/* Detalhes dos Resultados */}
                    <div className="space-y-3 mb-4">
                      <h4 className="font-medium text-sm">Resultados Detalhados:</h4>
                      {exam.results.details.map((detail, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{detail.parameter}</div>
                            <div className="text-xs text-gray-500">Referência: {detail.reference}</div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${getResultStatusColor(detail.status)}`}>{detail.value}</div>
                            <Badge
                              className={`text-xs mt-1 ${
                                detail.status === "normal"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : detail.status === "borderline"
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                              }`}
                            >
                              {detail.status === "normal"
                                ? "Normal"
                                : detail.status === "borderline"
                                  ? "Limítrofe"
                                  : "Alterado"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Observações Médicas */}
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                      <h4 className="font-medium text-sm text-gray-800 mb-1">Observações Médicas:</h4>
                      <p className="text-sm text-gray-700">{exam.results.observations}</p>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Baixar Resultado
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4 mr-1" />
                        Compartilhar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
