"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Activity, Heart, AlertTriangle, CheckCircle, Target, Zap } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

export function BenefitsContent() {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados dos parceiros de bem-estar
  const wellnessPartners = [
    {
      id: 1,
      name: "Wellhub",
      category: "Fitness & Bem-estar",
      logo: "🏃‍♂️",
      description: "Plataforma de atividades físicas e bem-estar",
      users: 1247,
      utilization: 78.5,
      satisfaction: 4.6,
      monthlyCost: 45890,
      costPerUser: 36.8,
      savings: 234000,
      roi: 340,
      status: "Ativo",
      contract: "Anual",
      features: ["Academias", "Apps fitness", "Meditação", "Nutrição"],
    },
    {
      id: 2,
      name: "Vittude",
      category: "Saúde Mental",
      logo: "🧠",
      description: "Plataforma de psicologia e terapia online",
      users: 892,
      utilization: 65.2,
      satisfaction: 4.8,
      monthlyCost: 28450,
      costPerUser: 31.9,
      savings: 156000,
      roi: 280,
      status: "Ativo",
      contract: "Anual",
      features: ["Psicoterapia", "Psiquiatria", "Orientação", "Grupos"],
    },
    {
      id: 3,
      name: "Zenklub",
      category: "Saúde Mental",
      logo: "🧘‍♀️",
      description: "Cuidado emocional e desenvolvimento pessoal",
      users: 1456,
      utilization: 72.8,
      satisfaction: 4.7,
      monthlyCost: 35670,
      costPerUser: 24.5,
      savings: 189000,
      roi: 310,
      status: "Ativo",
      contract: "Anual",
      features: ["Terapia", "Coaching", "Meditação", "Autoconhecimento"],
    },
  ]

  // Dados dos benefícios tradicionais
  const traditionalBenefits = [
    {
      id: 1,
      name: "Vale Refeição",
      type: "VR",
      icon: "🍽️",
      totalUsers: 2340,
      activeUsers: 2298,
      utilization: 98.2,
      monthlyBudget: 468000,
      avgTicket: 28.5,
      totalSpent: 459870,
      savings: 8130,
      trend: "stable",
      satisfaction: 4.2,
    },
    {
      id: 2,
      name: "Vale Alimentação",
      type: "VA",
      icon: "🛒",
      totalUsers: 2340,
      activeUsers: 2156,
      utilization: 92.1,
      monthlyBudget: 351000,
      avgTicket: 22.8,
      totalSpent: 342340,
      savings: 8660,
      trend: "up",
      satisfaction: 4.4,
    },
    {
      id: 3,
      name: "Vale Transporte",
      type: "VT",
      icon: "🚌",
      totalUsers: 1890,
      activeUsers: 1734,
      utilization: 91.7,
      monthlyBudget: 189000,
      avgTicket: 15.6,
      totalSpent: 178450,
      savings: 10550,
      trend: "down",
      satisfaction: 3.8,
    },
  ]

  // Dados de custos por departamento
  const departmentCosts = [
    {
      department: "TI",
      employees: 145,
      wellhub: 5335,
      vittude: 2465,
      zenklub: 3550,
      vr: 41325,
      va: 31900,
      vt: 18270,
      total: 102845,
      perEmployee: 709,
    },
    {
      department: "Marketing",
      employees: 67,
      wellhub: 2467,
      vittude: 1138,
      zenklub: 1642,
      vr: 19095,
      va: 14746,
      vt: 8442,
      total: 47530,
      perEmployee: 709,
    },
    {
      department: "Vendas",
      employees: 89,
      wellhub: 3278,
      vittude: 1512,
      zenklub: 2180,
      vr: 25365,
      va: 19594,
      vt: 11214,
      total: 63143,
      perEmployee: 709,
    },
    {
      department: "RH",
      employees: 23,
      wellhub: 847,
      vittude: 391,
      zenklub: 564,
      vr: 6555,
      va: 5062,
      vt: 2898,
      total: 16317,
      perEmployee: 709,
    },
    {
      department: "Financeiro",
      employees: 34,
      wellhub: 1252,
      vittude: 578,
      zenklub: 833,
      vr: 9690,
      va: 7482,
      vt: 4284,
      total: 24119,
      perEmployee: 709,
    },
    {
      department: "Operações",
      employees: 156,
      wellhub: 5743,
      vittude: 2651,
      zenklub: 3822,
      vr: 44460,
      va: 34332,
      vt: 19656,
      total: 110664,
      perEmployee: 709,
    },
  ]

  // Dados de utilização mensal
  const monthlyUtilization = [
    { month: "Jul", wellhub: 72, vittude: 58, zenklub: 65, vr: 96, va: 89, vt: 88 },
    { month: "Ago", wellhub: 75, vittude: 61, zenklub: 68, vr: 97, va: 91, vt: 89 },
    { month: "Set", wellhub: 78, vittude: 63, zenklub: 70, vr: 98, va: 92, vt: 91 },
    { month: "Out", wellhub: 79, vittude: 65, zenklub: 72, vr: 98, va: 92, vt: 92 },
    { month: "Nov", wellhub: 78, vittude: 65, zenklub: 73, vr: 98, va: 92, vt: 92 },
    { month: "Dez", wellhub: 79, vittude: 65, zenklub: 73, vr: 98, va: 92, vt: 92 },
  ]

  // Análise preditiva
  const predictiveAnalysis = [
    { month: "Jan", atual: 364520, previsto: 368000, economia: 3480 },
    { month: "Fev", atual: 364520, previsto: 372000, economia: 7480 },
    { month: "Mar", atual: 364520, previsto: 375000, economia: 10480 },
    { month: "Abr", atual: 364520, previsto: 378000, economia: 13480 },
    { month: "Mai", atual: 364520, previsto: 382000, economia: 17480 },
    { month: "Jun", atual: 364520, previsto: 385000, economia: 20480 },
  ]

  const costDistribution = [
    { name: "Vale Refeição", value: 45, color: "#8b5cf6" },
    { name: "Vale Alimentação", value: 32, color: "#06b6d4" },
    { name: "Vale Transporte", value: 18, color: "#10b981" },
    { name: "Wellhub", value: 3, color: "#f59e0b" },
    { name: "Vittude", value: 1.5, color: "#ef4444" },
    { name: "Zenklub", value: 0.5, color: "#8b5cf6" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Benefícios Corporativos</h2>
        <p className="text-muted-foreground">Analytics completo de benefícios e parceiros de bem-estar</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="wellness">Bem-estar</TabsTrigger>
          <TabsTrigger value="traditional">Tradicionais</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="predictive">Preditiva</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Custo Total Mensal</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.02M</div>
                <p className="text-xs text-muted-foreground">-2.3% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Utilização Média</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.2%</div>
                <p className="text-xs text-muted-foreground">+1.8% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">ROI Bem-estar</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">310%</div>
                <p className="text-xs text-muted-foreground">Retorno médio</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5</div>
                <p className="text-xs text-muted-foreground">Avaliação média</p>
              </CardContent>
            </Card>
          </div>

          {/* Distribuição de Custos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Custos</CardTitle>
                <CardDescription>Participação de cada benefício no orçamento total</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {costDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilização por Benefício</CardTitle>
                <CardDescription>Taxa de utilização mensal dos benefícios</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyUtilization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="vr" stroke="#8b5cf6" name="Vale Refeição" />
                    <Line type="monotone" dataKey="va" stroke="#06b6d4" name="Vale Alimentação" />
                    <Line type="monotone" dataKey="vt" stroke="#10b981" name="Vale Transporte" />
                    <Line type="monotone" dataKey="wellhub" stroke="#f59e0b" name="Wellhub" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Custos por Departamento */}
          <Card>
            <CardHeader>
              <CardTitle>Custos por Departamento</CardTitle>
              <CardDescription>Distribuição de gastos com benefícios por área</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentCosts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, ""]} />
                  <Bar dataKey="vr" stackId="a" fill="#8b5cf6" name="Vale Refeição" />
                  <Bar dataKey="va" stackId="a" fill="#06b6d4" name="Vale Alimentação" />
                  <Bar dataKey="vt" stackId="a" fill="#10b981" name="Vale Transporte" />
                  <Bar dataKey="wellhub" stackId="a" fill="#f59e0b" name="Wellhub" />
                  <Bar dataKey="vittude" stackId="a" fill="#ef4444" name="Vittude" />
                  <Bar dataKey="zenklub" stackId="a" fill="#8b5cf6" name="Zenklub" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-6">
          {/* Parceiros de Bem-estar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wellnessPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{partner.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                        <CardDescription>{partner.category}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={partner.status === "Ativo" ? "default" : "secondary"}>{partner.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{partner.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Usuários:</span>
                        <div className="font-medium">{partner.users.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Utilização:</span>
                        <div className="font-medium">{partner.utilization}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Satisfação:</span>
                        <div className="font-medium">{partner.satisfaction} ⭐</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ROI:</span>
                        <div className="font-medium text-green-600">{partner.roi}%</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Custo Mensal:</span>
                        <span className="font-medium">R$ {partner.monthlyCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Custo por Usuário:</span>
                        <span className="font-medium">R$ {partner.costPerUser}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Economia Anual:</span>
                        <span className="font-medium text-green-600">R$ {partner.savings.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Recursos:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {partner.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        Relatório
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Métricas Consolidadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,595</div>
                <p className="text-xs text-muted-foreground">Usuários únicos ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Investimento Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 110K</div>
                <p className="text-xs text-muted-foreground">Custo total dos parceiros</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Economia Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 579K</div>
                <p className="text-xs text-muted-foreground">Economia anual estimada</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traditional" className="space-y-6">
          {/* Benefícios Tradicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {traditionalBenefits.map((benefit) => (
              <Card key={benefit.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{benefit.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{benefit.name}</CardTitle>
                        <CardDescription>{benefit.type}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        benefit.trend === "up" ? "default" : benefit.trend === "down" ? "destructive" : "secondary"
                      }
                    >
                      {benefit.trend === "up" ? "↗️" : benefit.trend === "down" ? "↘️" : "→"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Usuários Totais:</span>
                        <div className="font-medium">{benefit.totalUsers.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Usuários Ativos:</span>
                        <div className="font-medium">{benefit.activeUsers.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Utilização:</span>
                        <div className="font-medium">{benefit.utilization}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Ticket Médio:</span>
                        <div className="font-medium">R$ {benefit.avgTicket}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Orçamento Mensal:</span>
                        <span className="font-medium">R$ {benefit.monthlyBudget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Gasto Atual:</span>
                        <span className="font-medium">R$ {benefit.totalSpent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Economia:</span>
                        <span className="font-medium text-green-600">R$ {benefit.savings.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Satisfação</span>
                        <span>{benefit.satisfaction}/5.0</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(benefit.satisfaction / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Gerenciar
                      </Button>
                      <Button variant="outline" size="sm">
                        Relatório
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resumo Financeiro */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro - Benefícios Tradicionais</CardTitle>
              <CardDescription>Consolidado mensal dos principais indicadores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">R$ 1.01M</div>
                  <p className="text-sm text-muted-foreground">Orçamento Total</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">R$ 980K</div>
                  <p className="text-sm text-muted-foreground">Gasto Efetivo</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">R$ 27K</div>
                  <p className="text-sm text-muted-foreground">Economia</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">94.0%</div>
                  <p className="text-sm text-muted-foreground">Utilização Média</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Análise Detalhada por Departamento */}
          <Card>
            <CardHeader>
              <CardTitle>Análise por Departamento</CardTitle>
              <CardDescription>Custos detalhados e métricas por área da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Departamento</th>
                      <th className="text-right p-2">Funcionários</th>
                      <th className="text-right p-2">Wellhub</th>
                      <th className="text-right p-2">Vittude</th>
                      <th className="text-right p-2">Zenklub</th>
                      <th className="text-right p-2">VR</th>
                      <th className="text-right p-2">VA</th>
                      <th className="text-right p-2">VT</th>
                      <th className="text-right p-2">Total</th>
                      <th className="text-right p-2">Por Funcionário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentCosts.map((dept, index) => (
                      <tr key={index} className="border-b hover:bg-muted">
                        <td className="p-2 font-medium">{dept.department}</td>
                        <td className="p-2 text-right">{dept.employees}</td>
                        <td className="p-2 text-right">R$ {dept.wellhub.toLocaleString()}</td>
                        <td className="p-2 text-right">R$ {dept.vittude.toLocaleString()}</td>
                        <td className="p-2 text-right">R$ {dept.zenklub.toLocaleString()}</td>
                        <td className="p-2 text-right">R$ {dept.vr.toLocaleString()}</td>
                        <td className="p-2 text-right">R$ {dept.va.toLocaleString()}</td>
                        <td className="p-2 text-right">R$ {dept.vt.toLocaleString()}</td>
                        <td className="p-2 text-right font-bold">R$ {dept.total.toLocaleString()}</td>
                        <td className="p-2 text-right">R$ {dept.perEmployee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tendências de Utilização */}
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Utilização</CardTitle>
              <CardDescription>Evolução da utilização dos benefícios ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="vr" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" name="Vale Refeição" />
                  <Area
                    type="monotone"
                    dataKey="va"
                    stackId="1"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    name="Vale Alimentação"
                  />
                  <Area
                    type="monotone"
                    dataKey="vt"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    name="Vale Transporte"
                  />
                  <Area type="monotone" dataKey="wellhub" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Wellhub" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Insights e Recomendações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Insights Principais</CardTitle>
                <CardDescription>Descobertas baseadas nos dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Alta Adesão aos Vales</h4>
                      <p className="text-sm text-muted-foreground">
                        Benefícios tradicionais mantêm utilização acima de 90%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Oportunidade no Wellhub</h4>
                      <p className="text-sm text-muted-foreground">
                        Utilização pode aumentar 15% com campanhas direcionadas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">ROI Positivo</h4>
                      <p className="text-sm text-muted-foreground">
                        Parceiros de bem-estar geram economia de R$ 579K/ano
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendações</CardTitle>
                <CardDescription>Ações sugeridas para otimização</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Target className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Campanha de Engajamento</h4>
                      <p className="text-sm text-muted-foreground">Foco no departamento de Operações para Wellhub</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Otimização de Custos</h4>
                      <p className="text-sm text-muted-foreground">Renegociar contratos com base na utilização real</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pesquisa de Satisfação</h4>
                      <p className="text-sm text-muted-foreground">Avaliar satisfação com Vale Transporte (3.8/5)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          {/* Análise Preditiva */}
          <Card>
            <CardHeader>
              <CardTitle>Projeção de Custos</CardTitle>
              <CardDescription>Previsão de gastos e economia para os próximos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictiveAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, ""]} />
                  <Line type="monotone" dataKey="atual" stroke="#8884d8" strokeDasharray="5 5" name="Custo Atual" />
                  <Line type="monotone" dataKey="previsto" stroke="#82ca9d" name="Projeção sem Otimização" />
                  <Line type="monotone" dataKey="economia" stroke="#ffc658" name="Economia Potencial" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cenários de Otimização */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cenário Conservador</CardTitle>
                <CardDescription>Otimizações básicas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600">R$ 45K</div>
                  <p className="text-sm text-muted-foreground">Economia anual estimada</p>
                  <div className="text-xs text-muted-foreground">
                    • Renegociação de contratos
                    <br />• Otimização de utilização
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cenário Moderado</CardTitle>
                <CardDescription>Implementação de melhorias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">R$ 78K</div>
                  <p className="text-sm text-muted-foreground">Economia anual estimada</p>
                  <div className="text-xs text-muted-foreground">
                    • Campanhas de engajamento
                    <br />• Novos parceiros estratégicos
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cenário Otimista</CardTitle>
                <CardDescription>Transformação completa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-600">R$ 125K</div>
                  <p className="text-sm text-muted-foreground">Economia anual estimada</p>
                  <div className="text-xs text-muted-foreground">
                    • Digitalização completa
                    <br />• Analytics avançado
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fatores de Risco */}
          <Card>
            <CardHeader>
              <CardTitle>Fatores de Risco e Oportunidades</CardTitle>
              <CardDescription>Análise de cenários e variáveis que podem impactar os resultados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-red-600 mb-3">Riscos Identificados</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Inflação de Benefícios</div>
                        <div className="text-muted-foreground">Aumento de 8-12% nos custos anuais</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Mudanças Regulatórias</div>
                        <div className="text-muted-foreground">Novos benefícios obrigatórios</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Baixa Adesão</div>
                        <div className="text-muted-foreground">ROI reduzido em novos benefícios</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-green-600 mb-3">Oportunidades</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Parcerias Estratégicas</div>
                        <div className="text-muted-foreground">Descontos por volume e exclusividade</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Digitalização</div>
                        <div className="text-muted-foreground">Redução de custos operacionais</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Analytics Avançado</div>
                        <div className="text-muted-foreground">Otimização baseada em dados</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
