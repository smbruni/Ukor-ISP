"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Users, Clock, Plus, Eye, Edit } from "lucide-react"

export function QuestionnaireContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Questionários de Saúde</h1>
          <p className="text-muted-foreground">Gestão e análise de questionários para avaliação de bem-estar</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Questionário
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Questionários</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respostas Coletadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.247</div>
            <p className="text-xs text-muted-foreground">+156 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questionários Ativos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Questionários */}
      <Card>
        <CardHeader>
          <CardTitle>Questionários Disponíveis</CardTitle>
          <CardDescription>Gerencie e monitore todos os questionários de saúde</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Avaliação de Burnout",
                description: "Questionário para identificar sinais de esgotamento profissional",
                responses: 234,
                completion: 78,
                status: "Ativo",
                statusColor: "bg-green-100 text-green-800",
              },
              {
                title: "Qualidade do Sono",
                description: "Avaliação dos padrões de sono e descanso",
                responses: 189,
                completion: 65,
                status: "Ativo",
                statusColor: "bg-green-100 text-green-800",
              },
              {
                title: "Estresse no Trabalho",
                description: "Medição dos níveis de estresse relacionados ao trabalho",
                responses: 156,
                completion: 89,
                status: "Finalizado",
                statusColor: "bg-gray-100 text-gray-800",
              },
              {
                title: "Satisfação Geral",
                description: "Avaliação geral de satisfação e bem-estar",
                responses: 98,
                completion: 45,
                status: "Ativo",
                statusColor: "bg-green-100 text-green-800",
              },
            ].map((questionnaire, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{questionnaire.title}</h3>
                    <Badge className={questionnaire.statusColor}>{questionnaire.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{questionnaire.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{questionnaire.responses} respostas</span>
                    <div className="flex items-center gap-2">
                      <span>Conclusão:</span>
                      <Progress value={questionnaire.completion} className="w-20 h-2" />
                      <span>{questionnaire.completion}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
