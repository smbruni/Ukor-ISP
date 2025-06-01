"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Heart, Apple, Moon, Zap, MessageCircle, Send, Stethoscope, User2 } from 'lucide-react'

export function AIAgentsContent() {
  const agents = [
    {
      id: "mental-coach",
      name: "Dr. Carlos Mente",
      specialty: "Mental Coach",
      description: "Coach especializado em performance mental e bem-estar",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      icon: Brain,
      color: "blue",
      expertise: ["Performance", "Mindset", "Produtividade"],
      consultations: 892,
      rating: 4.8,
    },
    {
      id: "nutritionist",
      name: "Dra. Ana Nutrição",
      specialty: "Nutricionista",
      description: "Especialista em nutrição corporativa e performance",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      icon: Apple,
      color: "green",
      expertise: ["Nutrição Funcional", "Performance", "Emagrecimento"],
      consultations: 1247,
      rating: 4.9,
    },
    {
      id: "psychologist",
      name: "Dra. Sofia Paz",
      specialty: "Psicóloga",
      description: "Especialista em saúde mental e tratamento de transtornos",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      icon: User2,
      color: "purple",
      expertise: ["Ansiedade", "Depressão", "Burnout"],
      consultations: 634,
      rating: 4.9,
    },
    {
      id: "health-coach",
      name: "Dr. João Saúde",
      specialty: "Health Coach",
      description: "Especialista em wellness corporativo e hábitos saudáveis",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      icon: Heart,
      color: "red",
      expertise: ["Wellness", "Exercícios", "Estresse"],
      consultations: 1156,
      rating: 4.7,
    },
    {
      id: "fit-advisor",
      name: "Prof. Fitness",
      specialty: "Fit Advisor",
      description: "Especialista em atividade física e performance esportiva",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      icon: Zap,
      color: "orange",
      expertise: ["Treinamento", "Performance", "Recuperação"],
      consultations: 423,
      rating: 4.8,
    },
    {
      id: "sleep-specialist",
      name: "Dra. Luna Sono",
      specialty: "Especialista em Sono",
      description: "Especialista em qualidade do sono e recuperação",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      icon: Moon,
      color: "indigo",
      expertise: ["Sono", "Recuperação", "Ritmo Circadiano"],
      consultations: 423,
      rating: 4.8,
    },
  ]

  const conversations = [
    {
      agent: "Dr. Ana Nutrição",
      message: "Baseado nos dados, recomendo um protocolo nutricional para o departamento de TI",
      time: "10:30",
      unread: 2,
    },
    {
      agent: "Dr. Carlos Mente",
      message: "Identifiquei padrões de estresse elevado em 3 colaboradores",
      time: "09:45",
      unread: 0,
    },
    {
      agent: "Dra. Maria Coach",
      message: "Protocolo de performance mental pronto para implementação",
      time: "08:20",
      unread: 1,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Agentes de IA Especializados</h2>
        <p className="text-muted-foreground">Consultores virtuais especializados em diferentes áreas da saúde</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Agentes */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className={`cursor-pointer transition-all hover:shadow-md`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${agent.color}-100`}>
                        <agent.icon className={`h-5 w-5 text-${agent.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription>{agent.specialty}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={agent.status === "online" ? "default" : "secondary"}>{agent.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {agent.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{agent.consultations} consultas</span>
                      <span>⭐ {agent.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Consultar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat e Conversas */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversations.map((conv, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {conv.agent
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{conv.agent}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
