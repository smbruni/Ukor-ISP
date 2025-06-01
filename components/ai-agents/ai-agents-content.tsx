"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Dumbbell, MessageSquare, Users, Utensils, Zap } from "lucide-react"

export function AIAgentsContent() {
  const [activeAgent, setActiveAgent] = useState("nutrition")
  const [message, setMessage] = useState("")

  const agents = [
    {
      id: "nutrition",
      name: "Nutri IA",
      role: "Nutricionista Virtual",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Utensils className="h-5 w-5" />,
      description: "Planos alimentares personalizados e orientações nutricionais baseadas no seu perfil.",
      expertise: ["Nutrição Personalizada", "Dietas Específicas", "Hábitos Alimentares", "Suplementação"],
      messages: [
        { sender: "agent", content: "Olá! Sou sua nutricionista virtual. Como posso ajudar com sua alimentação hoje?" },
      ],
    },
    {
      id: "mental",
      name: "Mente Sã",
      role: "Mental Coach",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Brain className="h-5 w-5" />,
      description: "Suporte psicológico e técnicas para gerenciamento de estresse e saúde mental.",
      expertise: ["Gestão de Estresse", "Mindfulness", "Equilíbrio Emocional", "Produtividade Mental"],
      messages: [
        { sender: "agent", content: "Olá! Estou aqui para ajudar com sua saúde mental. Como está se sentindo hoje?" },
      ],
    },
    {
      id: "fitness",
      name: "Fit Coach",
      role: "Personal Trainer Virtual",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Dumbbell className="h-5 w-5" />,
      description: "Treinos personalizados e orientações para atividade física adequada ao seu perfil.",
      expertise: ["Treinos Personalizados", "Ergonomia", "Condicionamento", "Recuperação Muscular"],
      messages: [
        {
          sender: "agent",
          content: "Olá! Sou seu personal trainer virtual. Vamos trabalhar em sua saúde física hoje?",
        },
      ],
    },
    {
      id: "relationship",
      name: "Connect",
      role: "Relationship Coach",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Users className="h-5 w-5" />,
      description: "Orientações para melhorar relacionamentos interpessoais e comunicação no ambiente de trabalho.",
      expertise: ["Comunicação Efetiva", "Resolução de Conflitos", "Trabalho em Equipe", "Networking"],
      messages: [
        {
          sender: "agent",
          content: "Olá! Estou aqui para ajudar com seus relacionamentos profissionais. Como posso auxiliar?",
        },
      ],
    },
    {
      id: "performance",
      name: "Peak",
      role: "Performance Coach",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Zap className="h-5 w-5" />,
      description: "Estratégias para otimização de performance, produtividade e gestão de tempo.",
      expertise: ["Produtividade", "Gestão de Tempo", "Foco", "Metas e Objetivos"],
      messages: [
        {
          sender: "agent",
          content: "Olá! Sou seu coach de performance. Vamos trabalhar para maximizar seu potencial hoje?",
        },
      ],
    },
    {
      id: "leadership",
      name: "Leader",
      role: "Leadership Coach",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Users className="h-5 w-5" />,
      description: "Desenvolvimento de habilidades de liderança e gestão de equipes.",
      expertise: ["Liderança Situacional", "Gestão de Equipes", "Tomada de Decisão", "Desenvolvimento de Talentos"],
      messages: [
        {
          sender: "agent",
          content: "Olá! Estou aqui para ajudar no seu desenvolvimento como líder. Como posso auxiliar?",
        },
      ],
    },
  ]

  const currentAgent = agents.find((agent) => agent.id === activeAgent) || agents[0]

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Aqui seria integrado com a API de IA para processar a mensagem
    // Por enquanto, apenas simulamos uma resposta

    const updatedAgents = agents.map((agent) => {
      if (agent.id === activeAgent) {
        return {
          ...agent,
          messages: [
            ...agent.messages,
            { sender: "user", content: message },
            { sender: "agent", content: `Resposta simulada para: "${message}"` },
          ],
        }
      }
      return agent
    })

    setMessage("")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agentes de IA</h1>
          <p className="text-gray-500">Assistentes virtuais especializados para sua saúde e performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Seus Coaches</CardTitle>
              <CardDescription>Especialistas virtuais disponíveis</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    className={`flex items-center p-3 hover:bg-gray-100 transition-colors ${activeAgent === agent.id ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
                    onClick={() => setActiveAgent(agent.id)}
                  >
                    <div className="bg-blue-100 p-2 rounded-full mr-3">{agent.icon}</div>
                    <div className="text-left">
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-xs text-gray-500">{agent.role}</p>
                    </div>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={currentAgent.avatar || "/placeholder.svg"} alt={currentAgent.name} />
                <AvatarFallback>{currentAgent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{currentAgent.name}</CardTitle>
                <CardDescription>{currentAgent.role}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden">
              <div className="mb-4">
                <p className="text-sm">{currentAgent.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentAgent.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg h-[400px] flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentAgent.messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-3 border-t flex">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 mr-2"
                  />
                  <Button onClick={handleSendMessage}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
