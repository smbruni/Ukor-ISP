"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, MessageSquare, Utensils, Zap, DollarSign, TrendingDown, AlertTriangle } from "lucide-react"

export function AIAgentsContent() {
  const [activeAgent, setActiveAgent] = useState("cost-reduction")
  const [message, setMessage] = useState("")

  const agents = [
    {
      id: "cost-reduction",
      name: "Dr. Cost Optimizer",
      role: "Especialista em Redução de Custos",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <DollarSign className="h-5 w-5" />,
      description:
        "Especialista em análise de sinistralidade e otimização de custos em saúde. Baseado nos dados reais da Unimed-BH do Grupo Fedla.",
      expertise: [
        "Redução Sinistralidade",
        "Gestão de Crônicos",
        "Prevenção Quaternária",
        "ROI em Saúde",
        "Protocolos Clínicos",
      ],
      messages: [
        {
          sender: "agent",
          content:
            "Olá! Analisei os dados da Unimed-BH e identifiquei oportunidades críticas de redução de custos. Sua sinistralidade de 110% pode ser reduzida para 75% em 6 meses com as estratégias certas. Como posso ajudar?",
        },
      ],
      insights: [
        "10 usuários representam 42% dos custos (R$ 1.18M)",
        "4 casos oncológicos custam R$ 406K/ano",
        "Prevenção de câncer colorretal: apenas 6.86% cobertura",
        "123 internações = 48% do custo total",
        "Potencial economia: R$ 980K/ano com gestão adequada",
      ],
    },
    {
      id: "chronic-care",
      name: "Dra. Chronic Care",
      role: "Gestora de Cuidados Crônicos",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Brain className="h-5 w-5" />,
      description:
        "Especialista em gestão de pacientes crônicos e de alto custo. Foco em reduzir internações e melhorar qualidade de vida.",
      expertise: [
        "Gestão de Crônicos",
        "Cuidados Paliativos",
        "Telemedicina",
        "Adesão Medicamentosa",
        "Coordenação de Cuidados",
      ],
      messages: [
        {
          sender: "agent",
          content:
            "Identifiquei que seus 10 maiores usuários custam R$ 118K/mês cada. Com gestão intensiva, posso reduzir esses custos em 35% mantendo qualidade. Vamos começar?",
        },
      ],
      insights: [
        "4 casos oncológicos precisam de gestão intensiva",
        "Redução de 35% em custos com case management",
        "Telemedicina pode evitar 40% das internações",
        "Adesão medicamentosa aumenta em 25% com acompanhamento",
        "ROI de 3:1 em programas de gestão de crônicos",
      ],
    },
    {
      id: "prevention",
      name: "Dr. Prevention Pro",
      role: "Especialista em Medicina Preventiva",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Zap className="h-5 w-5" />,
      description:
        "Foco em prevenção primária e secundária para reduzir custos futuros. Especialista em rastreamento e diagnóstico precoce.",
      expertise: [
        "Rastreamento Oncológico",
        "Prevenção Cardiovascular",
        "Check-ups Estratégicos",
        "Medicina Baseada em Evidências",
        "Análise Custo-Efetividade",
      ],
      messages: [
        {
          sender: "agent",
          content:
            "Sua cobertura de sangue oculto de 6.86% é crítica! Cada câncer colorretal detectado precocemente economiza R$ 150K. Posso criar um programa de rastreamento eficiente.",
        },
      ],
      insights: [
        "6.86% cobertura sangue oculto = risco altíssimo",
        "Cada câncer detectado precocemente economiza R$ 150K",
        "Mamografia: cobertura de 45% (meta: 80%)",
        "Check-up preventivo reduz custos em 28%",
        "ROI de rastreamento: 4:1 em 3 anos",
      ],
    },
    {
      id: "data-analyst",
      name: "Dr. Data Insights",
      role: "Analista de Dados em Saúde",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <TrendingDown className="h-5 w-5" />,
      description:
        "Especialista em análise preditiva e identificação de padrões nos dados de saúde para otimização de recursos.",
      expertise: [
        "Análise Preditiva",
        "Machine Learning",
        "Padrões de Utilização",
        "Segmentação de Risco",
        "Business Intelligence",
      ],
      messages: [
        {
          sender: "agent",
          content:
            "Analisando seus dados, identifiquei 3 clusters de risco que concentram 67% dos custos. Posso criar modelos preditivos para intervenção precoce.",
        },
      ],
      insights: [
        "3 clusters concentram 67% dos custos",
        "Modelo preditivo identifica alto risco com 89% acurácia",
        "Sazonalidade: outubro tem 180% mais internações",
        "Perfil de risco: homens 50+ com comorbidades",
        "Algoritmo de priorização reduz custos em 23%",
      ],
    },
    {
      id: "wellness",
      name: "Dra. Wellness Coach",
      role: "Especialista em Bem-estar Corporativo",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: <Utensils className="h-5 w-5" />,
      description:
        "Foco em programas de bem-estar e mudança de estilo de vida para redução de fatores de risco e custos.",
      expertise: [
        "Programas de Bem-estar",
        "Mudança Comportamental",
        "Nutrição Corporativa",
        "Atividade Física",
        "Gestão de Estresse",
      ],
      messages: [
        {
          sender: "agent",
          content:
            "Programas de bem-estar podem reduzir seus custos em 15-25%. Com foco nos seus 987 beneficiários, posso criar estratégias personalizadas por empresa.",
        },
      ],
      insights: [
        "Programas de bem-estar reduzem custos em 15-25%",
        "ROI médio: R$ 3.27 para cada R$ 1 investido",
        "Redução de 28% em absenteísmo",
        "Melhoria de 35% em indicadores de saúde",
        "Engajamento de 60% com gamificação",
      ],
    },
  ]

  const currentAgent = agents.find((agent) => agent.id === activeAgent) || agents[0]

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Simular resposta baseada no agente ativo
    const responses = {
      "cost-reduction": [
        "Baseado nos seus dados, recomendo focar nos 10 maiores usuários primeiro. Eles custam R$ 1.18M/ano e podem ser reduzidos em 35% com gestão intensiva.",
        "Sua sinistralidade de 110% pode ser reduzida para 85% em 3 meses e 75% em 6 meses com o protocolo que desenvolvi.",
        "Identifiquei que 48% dos seus custos vêm de internações. Posso criar um programa de prevenção de internações com ROI de 4:1.",
      ],
      "chronic-care": [
        "Para seus 4 casos oncológicos, recomendo gestão intensiva com enfermeira especializada. Economia estimada: R$ 140K/ano.",
        "Telemedicina para crônicos pode reduzir internações em 40%. Investimento: R$ 50K, economia: R$ 200K/ano.",
        "Case management para os top 10 usuários: investimento R$ 120K/ano, economia R$ 420K/ano.",
      ],
      prevention: [
        "Programa de rastreamento de câncer colorretal: investimento R$ 30K, economia potencial R$ 450K em 3 anos.",
        "Sua cobertura de mamografia de 45% precisa chegar a 80%. Cada câncer detectado precocemente economiza R$ 120K.",
        "Check-up preventivo estratificado por risco pode reduzir custos em 28% com investimento mínimo.",
      ],
    }

    const agentResponses = responses[activeAgent] || ["Resposta personalizada baseada nos seus dados específicos."]
    const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)]

    setMessage("")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">IA Agents - Redução de Custos</h1>
          <p className="text-gray-500">Consultores especializados baseados nos dados reais da Unimed-BH</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Especialistas Disponíveis</CardTitle>
              <CardDescription>Consultores IA treinados com seus dados</CardDescription>
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

              {/* Insights Específicos */}
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Insights Baseados nos Seus Dados</h4>
                <div className="space-y-2">
                  {currentAgent.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-blue-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg h-[300px] flex flex-col">
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
                    placeholder="Digite sua pergunta sobre redução de custos..."
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

      {/* Seção de Ações Rápidas */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Ação Urgente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 mb-3">Gestão dos 10 maiores usuários (R$ 1.18M/ano)</p>
            <Button className="w-full bg-red-600 hover:bg-red-700">Implementar Agora</Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              ROI Imediato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-700 mb-3">Rastreamento câncer colorretal (ROI 15:1)</p>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">Calcular Investimento</Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Meta 6 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 mb-3">Reduzir sinistralidade de 110% para 75%</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">Ver Roadmap</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
