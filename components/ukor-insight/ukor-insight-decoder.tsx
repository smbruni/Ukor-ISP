"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, TrendingUp, Target, ExternalLink, BarChart3, UserCheck, Award } from "lucide-react"

export function UkorInsightDecoder() {
  const handleOpenAssessment = () => {
    window.open("https://preview--ukor-insight-decoder.lovable.app", "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ukor Insight Decoder</h1>
          <p className="text-gray-600 mt-2">Sistema de Desenvolvimento de Talentos baseado em Hogan Assessment</p>
        </div>
        <Button onClick={handleOpenAssessment} className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Acessar Assessment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments Realizados</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Talentos Identificados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+8% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4</div>
            <p className="text-xs text-muted-foreground">+0.3 desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retenção de Talentos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assessment Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Hogan Assessment Overview
            </CardTitle>
            <CardDescription>
              Sistema completo de avaliação psicométrica para desenvolvimento de liderança
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">HPI - Personalidade Bright Side</span>
                <Badge variant="secondary">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">HDS - Personalidade Dark Side</span>
                <Badge variant="secondary">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">MVPI - Valores e Motivações</span>
                <Badge variant="secondary">Ativo</Badge>
              </div>
            </div>
            <Button onClick={handleOpenAssessment} className="w-full">
              Iniciar Novo Assessment
            </Button>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performers
            </CardTitle>
            <CardDescription>Colaboradores com maior potencial de liderança</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ana Silva", department: "Tecnologia", score: 9.2, potential: "Alto" },
                { name: "Carlos Santos", department: "Vendas", score: 8.9, potential: "Alto" },
                { name: "Maria Oliveira", department: "Marketing", score: 8.7, potential: "Médio-Alto" },
                { name: "João Costa", department: "Operações", score: 8.5, potential: "Médio-Alto" },
              ].map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{performer.name}</p>
                    <p className="text-sm text-gray-600">{performer.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{performer.score}</p>
                    <Badge variant={performer.potential === "Alto" ? "default" : "secondary"} className="text-xs">
                      {performer.potential}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departmental Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Análise por Departamento
          </CardTitle>
          <CardDescription>Performance e potencial de desenvolvimento por área</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { dept: "Tecnologia", employees: 45, avgScore: 8.6, topTalents: 12 },
              { dept: "Vendas", employees: 32, avgScore: 8.2, topTalents: 8 },
              { dept: "Marketing", employees: 28, avgScore: 8.4, topTalents: 7 },
              { dept: "Operações", employees: 38, avgScore: 7.9, topTalents: 9 },
              { dept: "RH", employees: 15, avgScore: 8.8, topTalents: 4 },
              { dept: "Financeiro", employees: 22, avgScore: 8.1, topTalents: 5 },
            ].map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">{dept.dept}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Colaboradores:</span>
                    <span className="font-medium">{dept.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Score Médio:</span>
                    <span className="font-medium text-blue-600">{dept.avgScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Top Talentos:</span>
                    <Badge variant="secondary">{dept.topTalents}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Próximas Ações Recomendadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Realizar assessment com 23 novos colaboradores</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <span>Revisar planos de desenvolvimento para top performers</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Implementar programa de mentoria para talentos identificados</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
