"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Heart, Apple, Moon, Zap, MessageCircle, Send } from "lucide-react"

export function AIAgents() {
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [message, setMessage] = useState("")

  const agents = [
    {
      id: "nutritionist",
      name: "Dr. Ana Nutrição",
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
      name: "Dr. Carlos Mente",
      specialty: "Psicólogo",
      description: "Especialista em saúde mental e burnout",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      icon: Brain,
      color: "blue",
      expertise: ["Burnout", "Ansiedade", "Liderança"],
      consultations: 892,
      rating: 4.8,
    },
    {
      id: "mental-coach",
      name: "Dra. Maria Coach",
      specialty: "Mental Coach",
      description: "Coach especializada em performance mental",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "busy",
      icon: Zap,
      color: "purple",
      expertise: ["Performance", "Mindset", "Produtividade"],
      consultations: 634,
      rating: 4.9,
    },
    {
      id: "health-coach",
      name: "Dr. João Saúde",
      specialty: "Health Coach",
      description: "Especialista em wellness corporativo",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      icon: Heart,
      color: "red",
      expertise: ["Wellness", "Exercícios", "Estresse"],
      consultations: 1156,
      rating: 4.7,
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
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAgent?.id === agent.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedAgent(agent)}
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

          {selectedAgent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedAgent.icon className="h-5 w-5" />
                  Chat com {selectedAgent.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-40 border rounded-lg p-3 bg-gray-50 overflow-y-auto">
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <p className="text-sm">
                          Olá! Sou {selectedAgent.name}. Como posso ajudar com a saúde dos colaboradores hoje?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas dos Agentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Consultas hoje</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tempo médio de resposta</span>
                  <span className="font-semibold">2.3 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Satisfação média</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
