"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ISPDiagnostic } from "@/components/isp-diagnostic"

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case "Alto":
      return "destructive"
    case "Médio":
      return "secondary"
    case "Baixo":
      return "default"
    default:
      return "outline"
  }
}

export function ISPContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">ISP - Índice de Saúde e Performance</h1>
        <p className="text-muted-foreground">
          Diagnóstico completo baseado nos 6 pilares: Sono, Saúde Física, Saúde Mental, Saúde Nutricional, Engajamento e
          Produtividade
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="diagnostic">Diagnóstico Completo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6">
            {/* ISP Geral */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  ISP Geral da Empresa
                </CardTitle>
                <CardDescription>Índice consolidado baseado em todos os indicadores de saúde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold text-primary">73</div>
                    <p className="text-sm text-muted-foreground">de 100 pontos</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-2">+5 pontos vs. mês anterior</Badge>
                    <p className="text-sm text-muted-foreground">Tendência positiva</p>
                  </div>
                </div>
                <Progress value={73} className="h-3 mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">68</div>
                    <p className="text-xs text-muted-foreground">Saúde Física</p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">71</div>
                    <p className="text-xs text-muted-foreground">Saúde Mental</p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">79</div>
                    <p className="text-xs text-muted-foreground">Engajamento</p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">74</div>
                    <p className="text-xs text-muted-foreground">Produtividade</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ISP por Departamento */}
            <Card>
              <CardHeader>
                <CardTitle>ISP por Departamento</CardTitle>
                <CardDescription>Comparação do índice entre diferentes áreas da empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      dept: "Vendas",
                      score: 82,
                      trend: "+3",
                      color: "text-green-600",
                      employees: 45,
                      riskLevel: "Baixo",
                    },
                    {
                      dept: "Marketing",
                      score: 78,
                      trend: "+1",
                      color: "text-green-600",
                      employees: 32,
                      riskLevel: "Baixo",
                    },
                    { dept: "RH", score: 76, trend: "0", color: "text-gray-600", employees: 18, riskLevel: "Médio" },
                    {
                      dept: "Financeiro",
                      score: 71,
                      trend: "-2",
                      color: "text-red-600",
                      employees: 28,
                      riskLevel: "Médio",
                    },
                    {
                      dept: "Tecnologia",
                      score: 65,
                      trend: "-5",
                      color: "text-red-600",
                      employees: 67,
                      riskLevel: "Alto",
                    },
                    {
                      dept: "Operações",
                      score: 69,
                      trend: "+2",
                      color: "text-green-600",
                      employees: 89,
                      riskLevel: "Médio",
                    },
                  ].map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{dept.dept}</h3>
                          <p className="text-sm text-muted-foreground">{dept.employees} colaboradores</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{dept.score}</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                        <Badge variant={getRiskColor(dept.riskLevel)}>Risco {dept.riskLevel}</Badge>
                        {dept.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {dept.trend === "down" && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                        {dept.trend === "stable" && <div className="w-4 h-4 rounded-full bg-gray-300" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Histórico e Tendências */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Evolução do ISP
                </CardTitle>
                <CardDescription>Acompanhamento da evolução dos scores ISP ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                    {[
                      { month: "Jul", score: 65 },
                      { month: "Ago", score: 67 },
                      { month: "Set", score: 69 },
                      { month: "Out", score: 71 },
                      { month: "Nov", score: 68 },
                      { month: "Dez", score: 73 },
                    ].map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="text-lg font-bold">{data.score}</div>
                        <div className="text-xs text-muted-foreground">{data.month}</div>
                        <Progress value={data.score} className="h-1" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span>Tendência: +12% em 6 meses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span>Meta 2024: 80 pontos</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diagnostic">
          <div className="grid grid-cols-1 gap-6">
            <ISPDiagnostic />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
