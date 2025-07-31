"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Heart,
  Brain,
  Apple,
  Dumbbell,
  Calendar,
  Star,
  CheckCircle,
  Target,
  Award,
  Plus,
  Eye,
  Share,
} from "lucide-react"

export function MeusProgramas({ colaborador }) {
  const [activeTab, setActiveTab] = useState("active")

  // Programas ativos do colaborador
  const activePrograms = [
    {
      id: 1,
      name: "Programa Antitabagismo",
      category: "Prevenção",
      icon: Heart,
      status: "active",
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      nextSession: "2024-04-25 14:00",
      provider: "Instituto do Coração",
      coordinator: "Dr. Maria Silva",
      description: "Programa completo para parar de fumar com acompanhamento médico",
      currentPhase: "Fase 3: Manutenção",
      totalSessions: 12,
      completedSessions: 8,
      benefits: ["Redução do risco cardiovascular", "Melhoria da capacidade pulmonar", "Economia financeira"],
      achievements: ["30 dias sem fumar", "Redução de 80% no consumo"],
    },
    {
      id: 2,
      name: "Ginástica Laboral",
      category: "Atividade Física",
      icon: Dumbbell,
      status: "active",
      progress: 85,
      startDate: "2024-01-08",
      endDate: "2024-12-20",
      nextSession: "2024-04-21 15:30",
      provider: "FisioWork Corporativo",
      coordinator: "Ft. Ana Paula Santos",
      description: "Exercícios diários para prevenção de lesões e melhoria da postura",
      currentPhase: "Rotina Estabelecida",
      totalSessions: 240,
      completedSessions: 204,
      benefits: ["Redução de dores", "Melhoria da postura", "Aumento da flexibilidade"],
      achievements: ["85% de presença", "Melhoria de 40% na flexibilidade"],
    },
    {
      id: 3,
      name: "Programa Saúde Mental",
      category: "Bem-estar",
      icon: Brain,
      status: "active",
      progress: 45,
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      nextSession: "2024-04-23 10:00",
      provider: "Zenklub",
      coordinator: "Psic. Juliana Costa",
      description: "Acompanhamento psicológico e técnicas de gestão do estresse",
      currentPhase: "Fase 2: Desenvolvimento",
      totalSessions: 16,
      completedSessions: 7,
      benefits: ["Redução do estresse", "Melhoria do sono", "Aumento da produtividade"],
      achievements: ["Redução de 25% no estresse", "Técnicas de mindfulness"],
    },
    {
      id: 4,
      name: "Programa Nutricional",
      category: "Nutrição",
      icon: Apple,
      status: "active",
      progress: 30,
      startDate: "2024-04-01",
      endDate: "2024-09-30",
      nextSession: "2024-04-26 09:00",
      provider: "NutriCorp",
      coordinator: "Nut. Patricia Oliveira",
      description: "Reeducação alimentar personalizada com acompanhamento nutricional",
      currentPhase: "Fase 1: Avaliação",
      totalSessions: 20,
      completedSessions: 6,
      benefits: ["Controle do peso", "Mais energia", "Melhoria da digestão"],
      achievements: ["Plano alimentar personalizado", "Redução de 1.5kg"],
    },
    {
      id: 5,
      name: "Check-up Preventivo",
      category: "Prevenção",
      icon: Activity,
      status: "scheduled",
      progress: 0,
      startDate: "2024-04-25",
      endDate: "2024-04-25",
      nextSession: "2024-04-25 14:30",
      provider: "Hospital Sírio-Libanês",
      coordinator: "Dr. Carlos Mendes",
      description: "Avaliação médica completa com exames laboratoriais e de imagem",
      currentPhase: "Agendado",
      totalSessions: 1,
      completedSessions: 0,
      benefits: ["Detecção precoce", "Prevenção de doenças", "Acompanhamento médico"],
      achievements: [],
    },
  ]

  // Programas concluídos
  const completedPrograms = [
    {
      id: 6,
      name: "Campanha de Vacinação",
      category: "Prevenção",
      icon: Heart,
      status: "completed",
      progress: 100,
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      completionDate: "2024-04-10",
      provider: "Clínica Vacinar",
      coordinator: "Enf. Roberto Lima",
      description: "Vacinação contra gripe e outras doenças sazonais",
      results: ["Vacinação completa", "Proteção contra gripe", "Imunização atualizada"],
      rating: 5,
      feedback: "Excelente organização e atendimento profissional",
    },
    {
      id: 7,
      name: "Workshop de Ergonomia",
      category: "Educação",
      icon: Dumbbell,
      status: "completed",
      progress: 100,
      startDate: "2024-02-01",
      endDate: "2024-02-29",
      completionDate: "2024-02-28",
      provider: "ErgoSaúde",
      coordinator: "Ft. Ricardo Santos",
      description: "Treinamento sobre postura correta e organização do ambiente de trabalho",
      results: ["Certificação em ergonomia", "Melhoria da postura", "Redução de dores"],
      rating: 4,
      feedback: "Muito útil para o dia a dia no trabalho",
    },
  ]

  // Programas disponíveis
  const availablePrograms = [
    {
      id: 8,
      name: "Programa de Meditação",
      category: "Bem-estar",
      icon: Brain,
      description: "Técnicas de meditação e mindfulness para redução do estresse",
      duration: "8 semanas",
      provider: "MindfulCorp",
      spots: 15,
      startDate: "2024-05-01",
      benefits: ["Redução do estresse", "Melhoria do foco", "Equilíbrio emocional"],
      requirements: ["Disponibilidade 2x/semana", "Comprometimento com prática diária"],
    },
    {
      id: 9,
      name: "Grupo de Corrida",
      category: "Atividade Física",
      icon: Activity,
      description: "Grupo de corrida para iniciantes e intermediários",
      duration: "12 semanas",
      provider: "RunCorp",
      spots: 20,
      startDate: "2024-05-15",
      benefits: ["Condicionamento físico", "Socialização", "Metas de corrida"],
      requirements: ["Liberação médica", "Disponibilidade 3x/semana"],
    },
    {
      id: 10,
      name: "Workshop de Culinária Saudável",
      category: "Nutrição",
      icon: Apple,
      description: "Aprenda a preparar refeições saudáveis e saborosas",
      duration: "4 semanas",
      provider: "CookHealth",
      spots: 12,
      startDate: "2024-05-20",
      benefits: ["Habilidades culinárias", "Alimentação saudável", "Economia doméstica"],
      requirements: ["Interesse em culinária", "Disponibilidade aos sábados"],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "scheduled":
        return "Agendado"
      case "completed":
        return "Concluído"
      case "paused":
        return "Pausado"
      default:
        return status
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Prevenção":
        return "text-blue-600"
      case "Atividade Física":
        return "text-green-600"
      case "Bem-estar":
        return "text-purple-600"
      case "Nutrição":
        return "text-orange-600"
      case "Educação":
        return "text-indigo-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Meus Programas</h2>
        <p className="text-gray-600 mt-1">Acompanhe seus programas de bem-estar e saúde</p>
      </div>

      {/* Resumo dos Programas */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {activePrograms.filter((p) => p.status === "active").length}
                </div>
                <div className="text-sm text-gray-600">Programas Ativos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{completedPrograms.length}</div>
                <div className="text-sm text-gray-600">Concluídos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="available">Disponíveis</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activePrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-50`}>
                      <program.icon className={`h-6 w-6 ${getCategoryColor(program.category)}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{program.name}</h3>
                      <p className="text-sm text-gray-600">{program.category}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(program.status)}>{getStatusLabel(program.status)}</Badge>
                </div>

                <p className="text-gray-700 mb-4">{program.description}</p>

                {/* Progresso */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso</span>
                    <span className="font-medium">
                      {program.completedSessions}/{program.totalSessions} sessões
                    </span>
                  </div>
                  <Progress value={program.progress} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">{program.progress}% concluído</div>
                </div>

                {/* Informações do programa */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Fase Atual:</span>
                    <div className="font-medium">{program.currentPhase}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Coordenador:</span>
                    <div className="font-medium">{program.coordinator}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Próxima Sessão:</span>
                    <div className="font-medium">
                      {program.nextSession ? new Date(program.nextSession).toLocaleString("pt-BR") : "A definir"}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Término:</span>
                    <div className="font-medium">{new Date(program.endDate).toLocaleDateString("pt-BR")}</div>
                  </div>
                </div>

                {/* Benefícios */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Benefícios:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Conquistas */}
                {program.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Conquistas:</h4>
                    <div className="space-y-1">
                      {program.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
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
                    Agendar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-1" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-50`}>
                      <program.icon className={`h-6 w-6 ${getCategoryColor(program.category)}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{program.name}</h3>
                      <p className="text-sm text-gray-600">{program.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(program.status)}>{getStatusLabel(program.status)}</Badge>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < program.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{program.description}</p>

                {/* Informações de conclusão */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Concluído em:</span>
                    <div className="font-medium">{new Date(program.completionDate).toLocaleDateString("pt-BR")}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Coordenador:</span>
                    <div className="font-medium">{program.coordinator}</div>
                  </div>
                </div>

                {/* Resultados */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Resultados Obtidos:</h4>
                  <div className="space-y-1">
                    {program.results.map((result, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-700">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <h4 className="font-medium text-sm mb-1">Meu Feedback:</h4>
                  <p className="text-sm text-gray-700">"{program.feedback}"</p>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Certificado
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-1" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          {availablePrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-50`}>
                      <program.icon className={`h-6 w-6 ${getCategoryColor(program.category)}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{program.name}</h3>
                      <p className="text-sm text-gray-600">{program.category}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Disponível
                  </Badge>
                </div>

                <p className="text-gray-700 mb-4">{program.description}</p>

                {/* Informações do programa */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Duração:</span>
                    <div className="font-medium">{program.duration}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Início:</span>
                    <div className="font-medium">{new Date(program.startDate).toLocaleDateString("pt-BR")}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Vagas:</span>
                    <div className="font-medium">{program.spots} disponíveis</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Fornecedor:</span>
                    <div className="font-medium">{program.provider}</div>
                  </div>
                </div>

                {/* Benefícios */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Benefícios:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Requisitos */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Requisitos:</h4>
                  <ul className="space-y-1">
                    {program.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Plus className="h-4 w-4 mr-1" />
                    Inscrever-se
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Mais Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-dashed">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">Não encontrou o que procura?</h3>
                <p className="text-gray-600 text-sm">
                  Sugerir um novo programa ou solicitar informações sobre outros programas disponíveis
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Sugerir Programa
                </Button>
                <Button className="flex-1">Falar com RH</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
