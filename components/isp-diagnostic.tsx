"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Heart, Brain, AlertTriangle, CheckCircle, Clock, Target, Zap, Moon } from "lucide-react"

export function ISPDiagnostic() {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados simulados baseados nos questionários ISP
  const ispData = {
    saudeGeral: 75,
    saudeMental: 68,
    sono: 82,
    saudeNutricional: 71,
    gestaoEstresse: 65,
    produtividade: 78,
    saudeFisica: 73,
  }

  const riskFactors = [
    { name: "Gestão de Estresse", level: "Alto", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
    {
      name: "Saúde Mental",
      level: "Médio",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    {
      name: "Saúde Nutricional",
      level: "Médio",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    { name: "Sono", level: "Baixo", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  ]

  const recommendations = [
    {
      category: "Saúde Mental",
      items: [
        "Implementar programa de apoio psicológico",
        "Criar espaços de relaxamento no ambiente de trabalho",
        "Oferecer sessões de mindfulness e meditação",
      ],
    },
    {
      category: "Gestão de Estresse",
      items: [
        "Revisar cargas de trabalho por departamento",
        "Implementar pausas regulares durante o expediente",
        "Treinar lideranças em gestão de equipes",
      ],
    },
    {
      category: "Saúde Física",
      items: [
        "Incentivar atividade física com parcerias em academias",
        "Criar programa de ginástica laboral",
        "Disponibilizar avaliações físicas periódicas",
      ],
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreLevel = (score: number) => {
    if (score >= 80) return "Excelente"
    if (score >= 60) return "Bom"
    if (score >= 40) return "Atenção"
    return "Crítico"
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Diagnóstico Integral de Saúde Populacional</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Análise completa de métricas de saúde baseada nos questionários ISP aplicados
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="text-xs md:text-sm">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="diagnostico" className="text-xs md:text-sm">
              Diagnóstico Completo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">ISP Geral</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getScoreColor(ispData.saudeGeral)}`}>{ispData.saudeGeral}%</div>
                  <p className="text-xs text-muted-foreground mt-1">{getScoreLevel(ispData.saudeGeral)}</p>
                  <Progress value={ispData.saudeGeral} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Saúde Mental</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getScoreColor(ispData.saudeMental)}`}>
                    {ispData.saudeMental}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{getScoreLevel(ispData.saudeMental)}</p>
                  <Progress value={ispData.saudeMental} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Sono</CardTitle>
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getScoreColor(ispData.sono)}`}>{ispData.sono}%</div>
                  <p className="text-xs text-muted-foreground mt-1">{getScoreLevel(ispData.sono)}</p>
                  <Progress value={ispData.sono} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Saúde Física</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getScoreColor(ispData.saudeFisica)}`}>
                    {ispData.saudeFisica}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{getScoreLevel(ispData.saudeFisica)}</p>
                  <Progress value={ispData.saudeFisica} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <AlertTriangle className="h-5 w-5" />
                  Fatores de Risco Identificados
                </CardTitle>
                <CardDescription>Áreas que requerem atenção prioritária</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {riskFactors.map((factor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/50"
                    >
                      <span className="font-medium text-card-foreground">{factor.name}</span>
                      <Badge className={factor.color}>{factor.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnostico" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Análise Detalhada por Pilar</CardTitle>
                  <CardDescription>Pontuação individual de cada área avaliada</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Saúde Mental", score: ispData.saudeMental, icon: Brain },
                    { name: "Sono", score: ispData.sono, icon: Moon },
                    { name: "Saúde Nutricional", score: ispData.saudeNutricional, icon: Heart },
                    { name: "Gestão de Estresse", score: ispData.gestaoEstresse, icon: Zap },
                    { name: "Produtividade", score: ispData.produtividade, icon: Target },
                    { name: "Saúde Física", score: ispData.saudeFisica, icon: Activity },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium text-card-foreground">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={item.score} className="w-20" />
                        <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Distribuição Populacional</CardTitle>
                  <CardDescription>Análise por grupos de risco na organização</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-card-foreground">Baixo Risco (80-100)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-24" />
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-card-foreground">Risco Moderado (60-79)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={35} className="w-24" />
                        <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-card-foreground">Alto Risco (40-59)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={15} className="w-24" />
                        <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-card-foreground">Risco Crítico (&lt;40)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={5} className="w-24" />
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recommendations.map((category, index) => (
                <Card key={index} className="bg-card border border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <Clock className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                          <span className="text-card-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Plano de Ação Organizacional</CardTitle>
                <CardDescription>Estratégias baseadas nos resultados dos questionários ISP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-900 dark:text-red-200">
                      Prioridade Alta - Gestão de Estresse
                    </h4>
                    <p className="text-red-800 dark:text-red-300 mt-1">
                      Implementar programa de redução de estresse com foco nos departamentos mais afetados
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-200">
                      Prioridade Média - Saúde Mental
                    </h4>
                    <p className="text-yellow-800 dark:text-yellow-300 mt-1">
                      Expandir programa de apoio psicológico e criar grupos de suporte
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 dark:text-green-200">Manutenção - Sono</h4>
                    <p className="text-green-800 dark:text-green-300 mt-1">
                      Continuar com as práticas atuais de higiene do sono e flexibilidade de horários
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
