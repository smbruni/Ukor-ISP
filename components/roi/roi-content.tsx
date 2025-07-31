"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, DollarSign, Calculator, Clock, ArrowUp, ArrowDown, Download, Eye } from "lucide-react"

export function ROIContent() {
  // Dados de evolução do ROI
  const roiEvolutionData = [
    { month: "Jan", roi: 180, investimento: 250000, economia: 450000 },
    { month: "Fev", roi: 195, investimento: 280000, economia: 546000 },
    { month: "Mar", roi: 210, investimento: 300000, economia: 630000 },
    { month: "Abr", roi: 225, investimento: 320000, economia: 720000 },
    { month: "Mai", roi: 240, investimento: 340000, economia: 816000 },
    { month: "Jun", roi: 255, investimento: 360000, economia: 918000 },
    { month: "Jul", roi: 270, investimento: 380000, economia: 1026000 },
    { month: "Ago", roi: 285, investimento: 400000, economia: 1140000 },
    { month: "Set", roi: 300, investimento: 420000, economia: 1260000 },
    { month: "Out", roi: 315, investimento: 440000, economia: 1386000 },
    { month: "Nov", roi: 330, investimento: 460000, economia: 1518000 },
    { month: "Dez", roi: 347, investimento: 480000, economia: 1665600 },
  ]

  // Dados de distribuição da economia
  const economyDistributionData = [
    { name: "Redução Absenteísmo", value: 35, color: "#3b82f6" },
    { name: "Menor Turnover", value: 25, color: "#10b981" },
    { name: "Produtividade", value: 20, color: "#f59e0b" },
    { name: "Plano de Saúde", value: 15, color: "#ef4444" },
    { name: "Outros", value: 5, color: "#8b5cf6" },
  ]

  // Dados de projeção
  const projectionData = [
    { year: "2024", roi: 347, investimento: 2800000, economia: 9716000 },
    { year: "2025", roi: 385, investimento: 3200000, economia: 12320000 },
    { year: "2026", roi: 420, investimento: 3600000, economia: 15120000 },
    { year: "2027", roi: 450, investimento: 4000000, economia: 18000000 },
  ]

  // Dados de investimento por área
  const investmentAreas = [
    {
      area: "Programas de Bem-Estar",
      investimento: 850000,
      economia: 2975000,
      roi: 350,
      status: "excellent",
      description: "Ginástica laboral, mindfulness, nutrição",
    },
    {
      area: "Prevenção de Doenças",
      investimento: 650000,
      economia: 2275000,
      roi: 350,
      status: "excellent",
      description: "Check-ups, vacinas, exames preventivos",
    },
    {
      area: "Saúde Mental",
      investimento: 480000,
      economia: 1440000,
      roi: 300,
      status: "good",
      description: "Terapia, apoio psicológico, workshops",
    },
    {
      area: "Ergonomia e Segurança",
      investimento: 320000,
      economia: 896000,
      roi: 280,
      status: "good",
      description: "Equipamentos, treinamentos, adequações",
    },
    {
      area: "Tecnologia em Saúde",
      investimento: 280000,
      economia: 756000,
      roi: 270,
      status: "good",
      description: "Apps, wearables, telemedicina",
    },
    {
      area: "Comunicação e Engajamento",
      investimento: 220000,
      economia: 374000,
      roi: 170,
      status: "attention",
      description: "Campanhas, eventos, materiais educativos",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "attention":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "excellent":
        return "Excelente"
      case "good":
        return "Bom"
      case "attention":
        return "Atenção"
      default:
        return "N/A"
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ROI & Análise Econômica</h1>
            <p className="text-gray-600 mt-1">Retorno sobre investimento em saúde e bem-estar corporativo</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
            <Button size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Análise Detalhada
            </Button>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">+23%</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">ROI Total</p>
                  <p className="text-3xl font-bold text-gray-900">347%</p>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>+23% vs ano anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">+12%</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Investimento Total</p>
                  <p className="text-3xl font-bold text-gray-900">R$ 2.8M</p>
                  <div className="flex items-center text-sm text-blue-600">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>+12% vs planejado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Calculator className="h-6 w-6 text-emerald-600" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800">+34%</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Economia Gerada</p>
                  <p className="text-3xl font-bold text-gray-900">R$ 9.7M</p>
                  <div className="flex items-center text-sm text-emerald-600">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>+34% vs projeção</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">-2.1 meses</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Payback Period</p>
                  <p className="text-3xl font-bold text-gray-900">8.2 meses</p>
                  <div className="flex items-center text-sm text-orange-600">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span>-2.1 meses vs meta</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="areas" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm">
              <TabsTrigger value="areas" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                Por Área de Investimento
              </TabsTrigger>
              <TabsTrigger
                value="evolution"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Evolução Mensal
              </TabsTrigger>
              <TabsTrigger
                value="projections"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Projeções
              </TabsTrigger>
              <TabsTrigger
                value="benchmarks"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Benchmarks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="areas" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Análise por Área de Investimento</CardTitle>
                  <CardDescription>ROI detalhado por categoria de investimento em saúde e bem-estar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {investmentAreas.map((area, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{area.area}</h3>
                            <Badge className={getStatusColor(area.status)}>{getStatusText(area.status)}</Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{area.roi}%</p>
                            <p className="text-sm text-gray-500">ROI</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{area.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Investimento</p>
                            <p className="font-semibold">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(area.investimento)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Economia Gerada</p>
                            <p className="font-semibold text-green-600">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(area.economia)}
                            </p>
                          </div>
                        </div>
                        <Progress value={(area.roi / 400) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evolution" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Evolução do ROI</CardTitle>
                    <CardDescription>Crescimento mensal do retorno sobre investimento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={roiEvolutionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip
                            formatter={(value, name) => [
                              name === "roi" ? `${value}%` : `R$ ${value.toLocaleString()}`,
                              name === "roi" ? "ROI" : name === "investimento" ? "Investimento" : "Economia",
                            ]}
                          />
                          <Area type="monotone" dataKey="roi" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Distribuição da Economia</CardTitle>
                    <CardDescription>Origem dos benefícios econômicos por categoria</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={economyDistributionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {economyDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projections" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Projeções de ROI</CardTitle>
                  <CardDescription>Estimativas de crescimento para os próximos anos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "roi" ? `${value}%` : `R$ ${value.toLocaleString()}`,
                            name === "roi" ? "ROI" : name === "investimento" ? "Investimento" : "Economia",
                          ]}
                        />
                        <Legend />
                        <Bar dataKey="roi" fill="#3b82f6" name="ROI (%)" />
                        <Bar dataKey="investimento" fill="#10b981" name="Investimento" />
                        <Bar dataKey="economia" fill="#f59e0b" name="Economia" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {projectionData.map((year, index) => (
                      <div key={index} className="p-4 border rounded-lg text-center">
                        <h3 className="font-semibold text-lg text-gray-900">{year.year}</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-2">{year.roi}%</p>
                        <p className="text-sm text-gray-500 mt-1">ROI Projetado</p>
                        <div className="mt-3 space-y-1">
                          <p className="text-xs text-gray-600">
                            Investimento:{" "}
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              notation: "compact",
                            }).format(year.investimento)}
                          </p>
                          <p className="text-xs text-gray-600">
                            Economia:{" "}
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              notation: "compact",
                            }).format(year.economia)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benchmarks" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Benchmarks do Mercado</CardTitle>
                  <CardDescription>Comparação com padrões da indústria e oportunidades de melhoria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 border rounded-lg text-center">
                        <h3 className="font-semibold text-gray-900">Nossa Performance</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">347%</p>
                        <p className="text-sm text-gray-500">ROI Atual</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <h3 className="font-semibold text-gray-900">Média do Setor</h3>
                        <p className="text-3xl font-bold text-gray-600 mt-2">280%</p>
                        <p className="text-sm text-gray-500">ROI Médio</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <h3 className="font-semibold text-gray-900">Top 10% do Mercado</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">420%</p>
                        <p className="text-sm text-gray-500">ROI Excelência</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Oportunidades de Melhoria</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <h5 className="font-medium text-blue-900">Expansão de Programas Preventivos</h5>
                            <p className="text-sm text-blue-700">Potencial de +15% no ROI</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">Oportunidade</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <h5 className="font-medium text-green-900">Otimização de Custos Operacionais</h5>
                            <p className="text-sm text-green-700">Potencial de +8% no ROI</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Implementável</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <h5 className="font-medium text-yellow-900">Tecnologia e Automação</h5>
                            <p className="text-sm text-yellow-700">Potencial de +12% no ROI</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Médio Prazo</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
