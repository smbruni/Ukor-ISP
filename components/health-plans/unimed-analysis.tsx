"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingUp, Heart, Target } from "lucide-react"
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
} from "recharts"

export function UnimedAnalysis() {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados reais da Unimed - Grupo Fedla
  const contractInfo = {
    company: "Grupo Fedla",
    operator: "Unimed-BH",
    period: "ABR/24 à MAR/25",
    products: ["UNIFÁCIL FLEX ESTADUAL", "UNIPART FLEX NACIONAL", "SEGUROS UNIMED"],
    totalBeneficiaries: 987,
    activeBeneficiaries: 957,
    utilizationRate: 97.0,
    totalCost: 2803650.76,
    accumulatedClaims: 110.04,
    adjustment: 25.0,
    adjustmentMonth: "01/2025",
  }

  // Dados mensais reais
  const monthlyData = [
    {
      month: "Abr/24",
      lives: 836,
      revenue: 162436,
      coparticipation: 29504,
      utilization: 308075,
      limit: 122148,
      sinistralidade: 171.05,
    },
    {
      month: "Mai/24",
      lives: 738,
      revenue: 182899,
      coparticipation: 28343,
      utilization: 186012,
      limit: 137174,
      sinistralidade: 86.21,
    },
    {
      month: "Jun/24",
      lives: 914,
      revenue: 162864,
      coparticipation: 31070,
      utilization: 148566,
      limit: 121827,
      sinistralidade: 72.33,
    },
    {
      month: "Jul/24",
      lives: 836,
      revenue: 177208,
      coparticipation: 32552,
      utilization: 248573,
      limit: 132906,
      sinistralidade: 121.9,
    },
    {
      month: "Ago/24",
      lives: 914,
      revenue: 208549,
      coparticipation: 31407,
      utilization: 215614,
      limit: 156411,
      sinistralidade: 88.33,
    },
    {
      month: "Set/24",
      lives: 738,
      revenue: 194569,
      coparticipation: 35788,
      utilization: 202913,
      limit: 145927,
      sinistralidade: 85.9,
    },
    {
      month: "Out/24",
      lives: 836,
      revenue: 179083,
      coparticipation: 32806,
      utilization: 447590,
      limit: 134313,
      sinistralidade: 231.61,
    },
    {
      month: "Nov/24",
      lives: 914,
      revenue: 191674,
      coparticipation: 34326,
      utilization: 338427,
      limit: 143756,
      sinistralidade: 158.66,
    },
    {
      month: "Dez/24",
      lives: 738,
      revenue: 191768,
      coparticipation: 27105,
      utilization: 297316,
      limit: 143826,
      sinistralidade: 140.91,
    },
    {
      month: "Jan/25",
      lives: 836,
      revenue: 188886,
      coparticipation: 33782,
      utilization: 179964,
      limit: 141665,
      sinistralidade: 77.39,
    },
    {
      month: "Fev/25",
      lives: 914,
      revenue: 195169,
      coparticipation: 37632,
      utilization: 240287,
      limit: 146377,
      sinistralidade: 103.84,
    },
    {
      month: "Mar/25",
      lives: 912,
      revenue: 376672,
      coparticipation: 34262,
      utilization: 229171,
      limit: 282504,
      sinistralidade: 51.75,
    },
  ]

  // Utilização por empresa (dados reais)
  const companyUtilization = [
    { company: "Euroville", cost: 628737.27, percentage: 22.43, activeLives: 268, totalLives: 268, utilization: 27.18 },
    {
      company: "Auto Japan Norte",
      cost: 546649.49,
      percentage: 19.5,
      activeLives: 53,
      totalLives: 141,
      utilization: 5.38,
    },
    {
      company: "Delta Filmes Ltda",
      cost: 347034.35,
      percentage: 12.38,
      activeLives: 114,
      totalLives: 115,
      utilization: 11.56,
    },
    {
      company: "BDG Autoville Veículos",
      cost: 278242.59,
      percentage: 9.92,
      activeLives: 123,
      totalLives: 91,
      utilization: 12.47,
    },
    {
      company: "BDG Serviços Financeiros",
      cost: 274231.06,
      percentage: 9.78,
      activeLives: 97,
      totalLives: 108,
      utilization: 9.84,
    },
    { company: "Euroville JF", cost: 269548.69, percentage: 9.61, activeLives: 40, totalLives: 70, utilization: 4.06 },
    {
      company: "Auto Japan Veículos",
      cost: 221047.68,
      percentage: 7.88,
      activeLives: 120,
      totalLives: 37,
      utilization: 12.17,
    },
    { company: "Euroville VLV", cost: 51766.03, percentage: 1.85, activeLives: 47, totalLives: 8, utilization: 4.77 },
  ]

  // Utilização por tipo de serviço (dados reais)
  const serviceUtilization = [
    { service: "Consulta Eletiva", cost: 335914, quantity: 2990, percentage: 11.98 },
    { service: "Consulta Pronto Socorro", cost: 120825, quantity: 1568, percentage: 4.31 },
    { service: "Internação", cost: 1352894, quantity: 123, percentage: 48.26 },
    { service: "Exames", cost: 455764, quantity: 14066, percentage: 16.26 },
    { service: "Terapias", cost: 60540, quantity: 1630, percentage: 2.16 },
    { service: "Procedimentos Ambulatoriais", cost: 477602, quantity: 5943, percentage: 17.04 },
  ]

  // Distribuição demográfica real
  const demographicData = {
    totalBeneficiaries: 987,
    holders: 675,
    dependents: 312,
    holderPercentage: 68.46,
    dependentPercentage: 31.54,
    maleHolders: 405,
    femaleHolders: 270,
    maleDependents: 114,
    femaleDependents: 198,
    dependentRatio: 0.46,
  }

  // Maiores usuários (dados reais)
  const topUsers = [
    {
      ranking: 1,
      company: "Auto Japan Norte",
      age: 31,
      gender: "M",
      cost: 469167,
      condition: "Politraumatismo (intervenções cirúrgicas ortopédicas)",
      chronic: true,
    },
    {
      ranking: 2,
      company: "Euroville",
      age: 43,
      gender: "F",
      cost: 161190,
      condition: "Tratamento oncológico – CA Mama",
      chronic: true,
    },
    {
      ranking: 3,
      company: "Delta Filmes",
      age: 41,
      gender: "M",
      cost: 98443,
      condition: "Neoplasia maligna do colón e pâncreas",
      chronic: true,
    },
    {
      ranking: 4,
      company: "Euroville JF",
      age: 37,
      gender: "M",
      cost: 81246,
      condition: "Tratamento oncológico – Neoplasia maligna do colón",
      chronic: true,
    },
    {
      ranking: 5,
      company: "BDG Serviços Finan.",
      age: 46,
      gender: "F",
      cost: 79486,
      condition: "Septicemia e cirurgia de ureterorrenolitotripsia",
      chronic: false,
    },
    {
      ranking: 6,
      company: "Euroville JF",
      age: 5,
      gender: "M",
      cost: 76531,
      condition: "Encefalomielite viral",
      chronic: true,
    },
    {
      ranking: 7,
      company: "Delta Filmes",
      age: 51,
      gender: "F",
      cost: 66140,
      condition: "Tratamento oncológico – CA Mama",
      chronic: true,
    },
    {
      ranking: 8,
      company: "BDG Serviços Finan.",
      age: 27,
      gender: "M",
      cost: 56664,
      condition: "Internação clínica psiquiátrica",
      chronic: true,
    },
    {
      ranking: 9,
      company: "BDG Autoville",
      age: 40,
      gender: "F",
      cost: 49075,
      condition: "Terapia com imunobiológico",
      chronic: true,
    },
    {
      ranking: 10,
      company: "Euroville Veículos",
      age: 81,
      gender: "F",
      cost: 41869,
      condition: "Internação em UTI + infecção respiratória grave",
      chronic: true,
    },
  ]

  // Exames preventivos (dados reais)
  const preventiveExams = {
    mammography: { coverage: 35.03, performed: 62, eligible: 177 },
    cytopathology: { coverage: 28.92, performed: 118, eligible: 408 },
    bloodOccult: { coverage: 6.86, performed: 7, eligible: 102 },
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análise Unimed-BH - Grupo Fedla</h2>
        <p className="text-muted-foreground">Relatório detalhado baseado em dados reais do período ABR/24 à MAR/25</p>
      </div>

      {/* Informações do Contrato */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Situação Crítica - Sinistralidade Elevada
          </CardTitle>
          <CardDescription>
            Contrato com sinistralidade de {contractInfo.accumulatedClaims}% - Reajuste de {contractInfo.adjustment}%
            aplicado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Beneficiários Ativos</p>
              <p className="text-2xl font-bold">{contractInfo.activeBeneficiaries.toLocaleString()}</p>
              <p className="text-xs text-green-600">Taxa de utilização: {contractInfo.utilizationRate}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Custo Total</p>
              <p className="text-2xl font-bold">R$ {(contractInfo.totalCost / 1000000).toFixed(2)}M</p>
              <p className="text-xs text-muted-foreground">Período de 12 meses</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sinistralidade</p>
              <p className="text-2xl font-bold text-red-600">{contractInfo.accumulatedClaims}%</p>
              <p className="text-xs text-red-600">Meta: 75%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reajuste Aplicado</p>
              <p className="text-2xl font-bold text-orange-600">{contractInfo.adjustment}%</p>
              <p className="text-xs text-muted-foreground">Vigência: {contractInfo.adjustmentMonth}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="companies">Por Empresa</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
          <TabsTrigger value="high-cost">Alto Custo</TabsTrigger>
          <TabsTrigger value="prevention">Prevenção</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Evolução Mensal da Sinistralidade */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução da Sinistralidade</CardTitle>
              <CardDescription>Variação mensal da sinistralidade - Dados reais Unimed-BH</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "sinistralidade" ? `${value}%` : `R$ ${value.toLocaleString()}`,
                      name === "sinistralidade"
                        ? "Sinistralidade"
                        : name === "utilization"
                          ? "Utilização"
                          : name === "revenue"
                            ? "Receita"
                            : name,
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="sinistralidade"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Sinistralidade %"
                  />
                  <Line type="monotone" dataKey="utilization" stroke="#3b82f6" strokeWidth={2} name="Utilização" />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Receita" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custo Médio por Vida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 2.941</div>
                <p className="text-xs text-muted-foreground">Por beneficiário/ano</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Internações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">123</div>
                <p className="text-xs text-muted-foreground">48.26% do custo total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Consultas Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.558</div>
                <p className="text-xs text-muted-foreground">2.990 eletivas + 1.568 PS</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Taxa Consulta/Usuário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.06</div>
                <p className="text-xs text-muted-foreground">Meta ANS: 6.00</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          {/* Utilização por Empresa */}
          <Card>
            <CardHeader>
              <CardTitle>Utilização por Empresa</CardTitle>
              <CardDescription>Distribuição de custos e utilização entre as empresas do Grupo Fedla</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companyUtilization.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{company.company}</h4>
                        <Badge
                          variant={
                            company.percentage > 15 ? "destructive" : company.percentage > 10 ? "secondary" : "default"
                          }
                        >
                          {company.percentage.toFixed(2)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Custo:</span>
                          <div className="font-medium">R$ {company.cost.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Vidas Ativas:</span>
                          <div className="font-medium">{company.activeLives}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Utilização:</span>
                          <div className="font-medium">{company.utilization.toFixed(2)}%</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Progress value={company.percentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de Distribuição */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Custos por Empresa</CardTitle>
              <CardDescription>Participação percentual no custo total</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={companyUtilization}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="percentage"
                    label={({ company, percentage }) => `${company}: ${percentage.toFixed(1)}%`}
                  >
                    {companyUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, "Participação"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          {/* Utilização por Tipo de Serviço */}
          <Card>
            <CardHeader>
              <CardTitle>Utilização por Tipo de Serviço</CardTitle>
              <CardDescription>Distribuição de custos e quantidade por categoria de atendimento</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" angle={-45} textAnchor="end" height={100} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "cost" ? `R$ ${value.toLocaleString()}` : value.toLocaleString(),
                      name === "cost" ? "Custo" : "Quantidade",
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="cost" fill="#8884d8" name="Custo" />
                  <Bar yAxisId="right" dataKey="quantity" fill="#82ca9d" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Análise de Eficiência */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custo Médio Internação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">R$ 11.007</div>
                <p className="text-xs text-muted-foreground">123 internações no período</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custo Médio Consulta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 100</div>
                <p className="text-xs text-muted-foreground">4.558 consultas no período</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custo Médio Exame</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">R$ 32</div>
                <p className="text-xs text-muted-foreground">14.066 exames no período</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          {/* Distribuição Demográfica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Titularidade</CardTitle>
                <CardDescription>Proporção entre titulares e dependentes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Titulares", value: demographicData.holderPercentage, count: demographicData.holders },
                        {
                          name: "Dependentes",
                          value: demographicData.dependentPercentage,
                          count: demographicData.dependents,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    >
                      <Cell fill="#0088FE" />
                      <Cell fill="#00C49F" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Sexo</CardTitle>
                <CardDescription>Divisão entre homens e mulheres por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Titulares</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{demographicData.maleHolders}</div>
                        <div className="text-sm text-blue-600">Homens</div>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded-lg">
                        <div className="text-2xl font-bold text-pink-600">{demographicData.femaleHolders}</div>
                        <div className="text-sm text-pink-600">Mulheres</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Dependentes</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{demographicData.maleDependents}</div>
                        <div className="text-sm text-blue-600">Homens</div>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded-lg">
                        <div className="text-2xl font-bold text-pink-600">{demographicData.femaleDependents}</div>
                        <div className="text-sm text-pink-600">Mulheres</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">{demographicData.dependentRatio}</div>
                    <div className="text-sm text-muted-foreground">Razão dependente por titular</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="high-cost" className="space-y-6">
          {/* Maiores Usuários */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Maiores Usuários</CardTitle>
              <CardDescription>
                Usuários com maior impacto financeiro - Total: R$ 1.179.811 (42% do custo total)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topUsers.map((user, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${user.chronic ? "border-l-4 border-l-red-500" : "border-l-4 border-l-yellow-500"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">#{user.ranking}</Badge>
                        <span className="font-medium">{user.company}</span>
                        <Badge variant={user.chronic ? "destructive" : "secondary"}>
                          {user.chronic ? "Crônico" : "Pontual"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">R$ {user.cost.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.age} anos - {user.gender}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.condition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Análise de Casos Crônicos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Casos Oncológicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">4</div>
                <p className="text-xs text-muted-foreground">R$ 406.619 em custos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Casos Crônicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">8</div>
                <p className="text-xs text-muted-foreground">80% dos top usuários</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Impacto Financeiro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">42%</div>
                <p className="text-xs text-muted-foreground">Do custo total (10 usuários)</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prevention" className="space-y-6">
          {/* Exames Preventivos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mamografia</CardTitle>
                <CardDescription>Mulheres entre 40-69 anos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600">{preventiveExams.mammography.coverage}%</div>
                  <p className="text-sm text-muted-foreground">Cobertura</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Realizados:</span>
                    <span className="font-medium">{preventiveExams.mammography.performed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Elegíveis:</span>
                    <span className="font-medium">{preventiveExams.mammography.eligible}</span>
                  </div>
                  <Progress value={preventiveExams.mammography.coverage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Citopatológico</CardTitle>
                <CardDescription>Mulheres entre 25-69 anos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600">{preventiveExams.cytopathology.coverage}%</div>
                  <p className="text-sm text-muted-foreground">Cobertura</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Realizados:</span>
                    <span className="font-medium">{preventiveExams.cytopathology.performed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Elegíveis:</span>
                    <span className="font-medium">{preventiveExams.cytopathology.eligible}</span>
                  </div>
                  <Progress value={preventiveExams.cytopathology.coverage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sangue Oculto</CardTitle>
                <CardDescription>Pessoas entre 50-69 anos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-red-600">{preventiveExams.bloodOccult.coverage}%</div>
                  <p className="text-sm text-muted-foreground">Cobertura CRÍTICA</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Realizados:</span>
                    <span className="font-medium">{preventiveExams.bloodOccult.performed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Elegíveis:</span>
                    <span className="font-medium">{preventiveExams.bloodOccult.eligible}</span>
                  </div>
                  <Progress value={preventiveExams.bloodOccult.coverage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendações Estratégicas */}
          <Card>
            <CardHeader>
              <CardTitle>Estratégias de Redução da Sinistralidade</CardTitle>
              <CardDescription>Recomendações baseadas na análise dos dados reais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-red-600 mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Ações Prioritárias
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Gestão de Crônicos</div>
                        <div className="text-muted-foreground">Foco nos 10 maiores usuários (R$ 1.18M)</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Campanhas de Rastreamento</div>
                        <div className="text-muted-foreground">Elevar cobertura de exames preventivos</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Controle de Internações</div>
                        <div className="text-muted-foreground">48% do custo em apenas 123 internações</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-green-600 mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Oportunidades
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Alta Adesão à Rede</div>
                        <div className="text-muted-foreground">97% de utilização - excelente engajamento</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Prevenção Direcionada</div>
                        <div className="text-muted-foreground">Foco em sangue oculto (6.86% cobertura)</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">Gestão por Empresa</div>
                        <div className="text-muted-foreground">Euroville concentra 22% dos custos</div>
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
