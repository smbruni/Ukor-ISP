"use client"

import { useState } from "react"
import { TrendingUp, AlertTriangle, Download, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export function ISPContent() {
  const [selectedView, setSelectedView] = useState("geral")
  const [selectedPillar, setSelectedPillar] = useState("geral")

  const pillars = [
    { id: "fisica", name: "Saúde Física", score: 78, color: "bg-blue-500", icon: "💪" },
    { id: "mental", name: "Saúde Mental", score: 65, color: "bg-purple-500", icon: "🧠" },
    { id: "sono", name: "Qualidade do Sono", score: 58, color: "bg-indigo-500", icon: "😴" },
    { id: "nutricional", name: "Saúde Nutricional", score: 72, color: "bg-green-500", icon: "🥗" },
    { id: "estresse", name: "Gestão de Estresse", score: 61, color: "bg-orange-500", icon: "🧘" },
    { id: "social", name: "Saúde Social", score: 81, color: "bg-pink-500", icon: "👥" },
  ]

  const overallISP = Math.round(pillars.reduce((acc, pillar) => acc + pillar.score, 0) / pillars.length)

  const getISPNote = (score) => {
    if (score >= 85) return { note: "A", description: "Excelente", color: "text-green-600" }
    if (score >= 75) return { note: "B", description: "Bom", color: "text-blue-600" }
    if (score >= 65) return { note: "C", description: "Regular", color: "text-yellow-600" }
    if (score >= 50) return { note: "D", description: "Atenção", color: "text-orange-600" }
    return { note: "F", description: "Crítico", color: "text-red-600" }
  }

  const ispNote = getISPNote(overallISP)

  // Dados para visão detalhada
  const departmentISPData = [
    { department: "TI", isp: 78, fisica: 75, mental: 68, sono: 62, nutricional: 70, estresse: 65, social: 85 },
    { department: "Marketing", isp: 72, fisica: 78, mental: 70, sono: 65, nutricional: 75, estresse: 68, social: 76 },
    { department: "Vendas", isp: 69, fisica: 72, mental: 62, sono: 58, nutricional: 68, estresse: 60, social: 74 },
    { department: "RH", isp: 85, fisica: 88, mental: 85, sono: 78, nutricional: 82, estresse: 80, social: 92 },
    { department: "Financeiro", isp: 74, fisica: 76, mental: 72, sono: 68, nutricional: 74, estresse: 70, social: 78 },
  ]

  const riskFactors = [
    { factor: "Sobrecarga de trabalho", impact: "Alto", departments: ["TI", "Vendas"], affected: 156 },
    { factor: "Qualidade do sono", impact: "Médio", departments: ["TI", "Marketing"], affected: 89 },
    { factor: "Estresse financeiro", impact: "Médio", departments: ["Vendas", "Financeiro"], affected: 67 },
    { factor: "Isolamento social", impact: "Baixo", departments: ["TI"], affected: 23 },
  ]

  const interventionRecommendations = [
    {
      priority: "Alta",
      title: "Programa de Gestão do Sono",
      description: "Implementar workshops sobre higiene do sono e flexibilização de horários",
      target: "Todos os departamentos",
      expectedImpact: "+15 pontos ISP",
      timeline: "3 meses",
      cost: "R$ 45.000",
    },
    {
      priority: "Alta",
      title: "Redução de Sobrecarga - TI",
      description: "Redistribuição de tarefas e contratação de 2 desenvolvedores",
      target: "Departamento de TI",
      expectedImpact: "+20 pontos ISP",
      timeline: "2 meses",
      cost: "R$ 180.000",
    },
    {
      priority: "Média",
      title: "Programa de Mindfulness",
      description: "Sessões semanais de meditação e técnicas de relaxamento",
      target: "Vendas e Marketing",
      expectedImpact: "+10 pontos ISP",
      timeline: "6 meses",
      cost: "R$ 25.000",
    },
  ]

  // Dados para relatórios
  const availableReports = [
    {
      title: "Relatório ISP Mensal",
      description: "Análise completa dos 6 pilares de saúde",
      lastGenerated: "2024-06-15",
      frequency: "Mensal",
      format: "PDF",
      pages: 24,
    },
    {
      title: "Dashboard Executivo",
      description: "Resumo executivo com principais KPIs",
      lastGenerated: "2024-06-20",
      frequency: "Semanal",
      format: "PDF",
      pages: 8,
    },
    {
      title: "Análise por Departamento",
      description: "Comparativo detalhado entre departamentos",
      lastGenerated: "2024-06-10",
      frequency: "Quinzenal",
      format: "Excel",
      pages: 15,
    },
    {
      title: "Tendências e Projeções",
      description: "Análise preditiva baseada em dados históricos",
      lastGenerated: "2024-06-01",
      frequency: "Trimestral",
      format: "PDF",
      pages: 32,
    },
  ]

  const reportStats = {
    totalGenerated: 156,
    avgPages: 18,
    mostRequested: "Relatório ISP Mensal",
    downloadRate: "94%",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ISP - Índice de Saúde e Performance</h2>
        <p className="text-muted-foreground">Diagnóstico completo baseado nos 6 pilares de saúde</p>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="detalhada">Visão Detalhada</TabsTrigger>
          <TabsTrigger value="relatorio">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <CardTitle>ISP Geral</CardTitle>
                <CardDescription>Índice consolidado - Nota {ispNote.note}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeDasharray={`${overallISP}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{overallISP}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`text-4xl font-bold ${ispNote.color}`}>{ispNote.note}</div>
                  <div className="text-sm text-muted-foreground">{ispNote.description}</div>
                  <div className="text-xs text-muted-foreground">Baseado em 6 pilares de saúde</div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Pilares de Saúde</CardTitle>
                <CardDescription>Avaliação detalhada por dimensão</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedPillar(pillar.id)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{pillar.icon}</div>
                        <h3 className="font-medium text-sm">{pillar.name}</h3>
                        <div className="text-2xl font-bold mt-2">{pillar.score}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full ${pillar.color}`}
                            style={{ width: `${pillar.score}%` }}
                          ></div>
                        </div>
                        <div className={`text-xs mt-1 font-medium ${getISPNote(pillar.score).color}`}>
                          {getISPNote(pillar.score).note} - {getISPNote(pillar.score).description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do ISP</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", isp: 65 },
                      { month: "Fev", isp: 68 },
                      { month: "Mar", isp: 72 },
                      { month: "Abr", isp: 69 },
                      { month: "Mai", isp: 74 },
                      { month: "Jun", isp: overallISP },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="isp" stroke="#8884d8" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendações Personalizadas</CardTitle>
                <CardDescription>Baseadas no seu perfil ISP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800">Prioridade Alta</h4>
                    <p className="text-sm text-red-600">Melhorar qualidade do sono - Score atual: 58</p>
                    <Button size="sm" className="mt-2" variant="outline">
                      Ver Plano
                    </Button>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800">Prioridade Média</h4>
                    <p className="text-sm text-orange-600">Fortalecer gestão de estresse - Score atual: 61</p>
                    <Button size="sm" className="mt-2" variant="outline">
                      Ver Plano
                    </Button>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Manter</h4>
                    <p className="text-sm text-green-600">Saúde social está excelente - Score: 81</p>
                    <Button size="sm" className="mt-2" variant="outline">
                      Ver Dicas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detalhada" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ISP por Departamento</CardTitle>
                <CardDescription>Comparativo detalhado entre áreas</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentISPData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="isp" fill="#8884d8" name="ISP Geral" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Radar dos Pilares - RH</CardTitle>
                <CardDescription>Melhor departamento em ISP</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      { pillar: "Física", value: 88 },
                      { pillar: "Mental", value: 85 },
                      { pillar: "Sono", value: 78 },
                      { pillar: "Nutricional", value: 82 },
                      { pillar: "Estresse", value: 80 },
                      { pillar: "Social", value: 92 },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="pillar" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="RH" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fatores de Risco Identificados</CardTitle>
              <CardDescription>Principais riscos que impactam o ISP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            risk.impact === "Alto"
                              ? "text-red-500"
                              : risk.impact === "Médio"
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        />
                        <div>
                          <h4 className="font-medium">{risk.factor}</h4>
                          <p className="text-sm text-muted-foreground">
                            Impacto: {risk.impact} • Departamentos: {risk.departments.join(", ")} • {risk.affected}{" "}
                            colaboradores afetados
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        risk.impact === "Alto" ? "destructive" : risk.impact === "Médio" ? "secondary" : "default"
                      }
                    >
                      {risk.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recomendações de Intervenção</CardTitle>
              <CardDescription>Planos de ação para melhoria do ISP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interventionRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant={rec.priority === "Alta" ? "destructive" : "secondary"}>{rec.priority}</Badge>
                        <h4 className="font-medium">{rec.title}</h4>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{rec.expectedImpact}</div>
                        <div className="text-sm text-muted-foreground">{rec.cost}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        <strong>Alvo:</strong> {rec.target}
                      </span>
                      <span>
                        <strong>Prazo:</strong> {rec.timeline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Relatórios Gerados</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportStats.totalGenerated}</div>
                <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Páginas Médias</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportStats.avgPages}</div>
                <p className="text-xs text-muted-foreground">Por relatório</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Mais Solicitado</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">ISP Mensal</div>
                <p className="text-xs text-muted-foreground">45% das solicitações</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Download</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportStats.downloadRate}</div>
                <p className="text-xs text-muted-foreground">Relatórios baixados</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>Gere e baixe relatórios personalizados do ISP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>Última geração: {report.lastGenerated}</span>
                        <span>Frequência: {report.frequency}</span>
                        <span>Formato: {report.format}</span>
                        <span>{report.pages} páginas</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                      <Button size="sm">Gerar Novo</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gerador de Relatórios Personalizado</CardTitle>
              <CardDescription>Crie relatórios customizados com os dados que você precisa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Período</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                      <option>Último mês</option>
                      <option>Últimos 3 meses</option>
                      <option>Últimos 6 meses</option>
                      <option>Último ano</option>
                      <option>Personalizado</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Departamentos</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                      <option>Todos os departamentos</option>
                      <option>TI</option>
                      <option>Marketing</option>
                      <option>Vendas</option>
                      <option>RH</option>
                      <option>Financeiro</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Pilares</label>
                    <div className="mt-2 space-y-2">
                      {pillars.map((pillar) => (
                        <label key={pillar.id} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">{pillar.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Formato</label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>PowerPoint</option>
                      <option>Word</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Incluir</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Gráficos e visualizações</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Recomendações</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Dados brutos</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Comparativo histórico</span>
                      </label>
                    </div>
                  </div>

                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Uso</CardTitle>
              <CardDescription>Análise de utilização dos relatórios</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { month: "Jan", downloads: 45 },
                    { month: "Fev", downloads: 52 },
                    { month: "Mar", downloads: 48 },
                    { month: "Abr", downloads: 61 },
                    { month: "Mai", downloads: 55 },
                    { month: "Jun", downloads: 67 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="downloads" fill="#8884d8" name="Downloads" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
