"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExportData } from "@/components/export/export-data"
import { ExportPreview } from "@/components/export/export-preview"
import {
  AlertTriangle,
  ArrowUp,
  BarChart3,
  Brain,
  Calendar,
  ChevronRight,
  Download,
  FileText,
  Heart,
  Info,
  Lightbulb,
  LineChart,
  Printer,
  Share2,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function BrokerReport() {
  const [period, setPeriod] = useState("last12")
  const [reportType, setReportType] = useState("executive")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [activeTab, setActiveTab] = useState("configure")

  // Dados simulados para o relatório
  const companyData = {
    name: "Empresa ABC Ltda",
    industry: "Tecnologia",
    employees: 987,
    operator: "Unimed",
    plan: "Empresarial Executivo",
    broker: "Corretora XYZ",
    period: "Junho/2024 a Maio/2025",
    lossRatio: 110.04,
    lossRatioTarget: 75,
    totalCost: 2803651,
    premiumTotal: 2548000,
    utilizationRate: 97,
    hospitalizations: 123,
    chronicCases: 10,
    oncologyCases: 4,
    preventionRate: 6.86,
    reajusteAplicado: 25,
    reajusteMercado: 18,
  }

  // Dados de sinistralidade mensal
  const lossRatioData = [
    { month: "Jun/24", actual: 171.05, target: 75, market: 85 },
    { month: "Jul/24", actual: 86.21, target: 75, market: 83 },
    { month: "Ago/24", actual: 72.33, target: 75, market: 84 },
    { month: "Set/24", actual: 121.9, target: 75, market: 86 },
    { month: "Out/24", actual: 88.33, target: 75, market: 85 },
    { month: "Nov/24", actual: 85.9, target: 75, market: 87 },
    { month: "Dez/24", actual: 231.61, target: 75, market: 90 },
    { month: "Jan/25", actual: 158.66, target: 75, market: 88 },
    { month: "Fev/25", actual: 140.91, target: 75, market: 86 },
    { month: "Mar/25", actual: 77.39, target: 75, market: 84 },
    { month: "Abr/25", actual: 103.84, target: 75, market: 83 },
    { month: "Mai/25", actual: 51.75, target: 75, market: 82 },
  ]

  // Dados de utilização por categoria
  const utilizationByCategory = [
    { name: "Consultas", value: 45, cost: 125000, color: "#0088FE" },
    { name: "Exames", value: 30, cost: 89000, color: "#00C49F" },
    { name: "Internações", value: 15, cost: 1346000, color: "#FF8042" },
    { name: "Medicamentos", value: 25, cost: 67000, color: "#FFBB28" },
    { name: "Oncologia", value: 5, cost: 406000, color: "#8884D8" },
  ]

  // Top utilizadores
  const topUsers = [
    { id: "001", age: 54, gender: "M", cost: 280000, condition: "Oncologia", risk: "Alto" },
    { id: "002", age: 62, gender: "F", cost: 245000, condition: "Cardíaco", risk: "Alto" },
    { id: "003", age: 48, gender: "M", cost: 198000, condition: "Oncologia", risk: "Alto" },
    { id: "004", age: 57, gender: "F", cost: 176000, condition: "Diabetes", risk: "Médio" },
    { id: "005", age: 51, gender: "M", cost: 156000, condition: "Oncologia", risk: "Alto" },
    { id: "006", age: 44, gender: "F", cost: 125000, condition: "Ortopédico", risk: "Médio" },
    { id: "007", age: 59, gender: "M", cost: 112000, condition: "Cardíaco", risk: "Médio" },
    { id: "008", age: 38, gender: "F", cost: 98000, condition: "Oncologia", risk: "Alto" },
    { id: "009", age: 42, gender: "M", cost: 87000, condition: "Renal", risk: "Médio" },
    { id: "010", age: 49, gender: "F", cost: 83000, condition: "Pulmonar", risk: "Médio" },
  ]

  // Dados de previsão de sinistralidade
  const predictionData = [
    { month: "Jun/25", baseline: 110.04, withIntervention: 110.04 },
    { month: "Jul/25", baseline: 112.5, withIntervention: 105.8 },
    { month: "Ago/25", baseline: 115.2, withIntervention: 98.4 },
    { month: "Set/25", baseline: 118.1, withIntervention: 92.7 },
    { month: "Out/25", baseline: 120.5, withIntervention: 88.3 },
    { month: "Nov/25", baseline: 123.2, withIntervention: 84.5 },
    { month: "Dez/25", baseline: 125.8, withIntervention: 81.2 },
    { month: "Jan/26", baseline: 128.4, withIntervention: 78.6 },
    { month: "Fev/26", baseline: 131.2, withIntervention: 76.4 },
    { month: "Mar/26", baseline: 134.1, withIntervention: 75.0 },
    { month: "Abr/26", baseline: 137.2, withIntervention: 74.2 },
    { month: "Mai/26", baseline: 140.5, withIntervention: 73.8 },
  ]

  // Dados de intervenções recomendadas
  const interventions = [
    {
      name: "Gestão de Crônicos",
      impact: 18.5,
      roi: 350,
      timeframe: "3 meses",
      cost: 120000,
      savings: 420000,
    },
    {
      name: "Programa de Prevenção",
      impact: 12.3,
      roi: 450,
      timeframe: "6 meses",
      cost: 80000,
      savings: 360000,
    },
    {
      name: "Telemedicina",
      impact: 8.7,
      roi: 280,
      timeframe: "2 meses",
      cost: 50000,
      savings: 140000,
    },
    {
      name: "Rastreamento Oncológico",
      impact: 15.2,
      roi: 520,
      timeframe: "9 meses",
      cost: 90000,
      savings: 468000,
    },
    {
      name: "Saúde Mental",
      impact: 6.8,
      roi: 210,
      timeframe: "4 meses",
      cost: 60000,
      savings: 126000,
    },
  ]

  // Dados de benchmarking
  const benchmarkData = [
    { category: "Sinistralidade", client: 110.04, sector: 85.2, best: 72.5 },
    { category: "Custo per Capita", client: 2840, sector: 2100, best: 1850 },
    { category: "Internações", client: 12.5, sector: 8.7, best: 6.2 },
    { category: "Prevenção", client: 6.86, sector: 35.4, best: 68.2 },
    { category: "Crônicos", client: 42.1, sector: 28.6, best: 18.4 },
  ]

  // Dados de distribuição etária
  const ageDistribution = [
    { age: "18-25", count: 124, percentage: 12.6 },
    { age: "26-35", count: 287, percentage: 29.1 },
    { age: "36-45", count: 312, percentage: 31.6 },
    { age: "46-55", count: 186, percentage: 18.8 },
    { age: "56-65", count: 68, percentage: 6.9 },
    { age: "66+", count: 10, percentage: 1.0 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho do Relatório */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">XYZ</span>
              </div>
              <h1 className="text-2xl font-bold">Corretora XYZ</h1>
            </div>
            <h2 className="text-3xl font-bold mb-2">Relatório de Sinistralidade e Análise Preditiva</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-white border-white">
                {companyData.operator}
              </Badge>
              <span>•</span>
              <p>{companyData.name}</p>
              <span>•</span>
              <p>{companyData.period}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              <span>Gerado em: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

      {/* Configuração e Prévia do Relatório */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Relatório para Corretoras</h2>
          <p className="text-muted-foreground">
            Configure e exporte relatórios personalizados para apresentação a corretoras e clientes
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-lg font-medium mb-4">Configuração do Relatório</h3>
            <ExportData />
          </div>
          
          <div className="lg:w-1/2">
            <h3 className="text-lg font-medium mb-4">Prévia do Relatório</h3>
            <ExportPreview />
          </div>
        </div>
      </div>

      {/* Controles do Relatório */}
      <div className="bg-muted/50 border-b p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de Relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="executive">Sumário Executivo</SelectItem>
                <SelectItem value="detailed">Relatório Detalhado</SelectItem>
                <SelectItem value="predictive">Análise Preditiva</SelectItem>
                <SelectItem value="recommendations">Recomendações</SelectItem>
              </SelectContent>
            </Select>

            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last3">Últimos 3 meses</SelectItem>
                <SelectItem value="last6">Últimos 6 meses</SelectItem>
                <SelectItem value="last12">Últimos 12 meses</SelectItem>
                <SelectItem value="ytd">Ano até o momento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="ppt">PowerPoint</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo do Relatório */}
      <div className="container mx-auto py-8 px-4">
        {/* Sumário Executivo */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
            Sumário Executivo
          </h2>

          {/* Alerta de Sinistralidade */}
          <Card className="mb-6 border-l-4 border-l-red-500 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Alerta de Sinistralidade Crítica
              </CardTitle>
              <CardDescription className="text-red-700">
                A sinistralidade acumulada de {companyData.lossRatio}% está significativamente acima da meta de{" "}
                {companyData.lossRatioTarget}%, resultando em um reajuste aplicado de {companyData.reajusteAplicado}%
                (mercado: {companyData.reajusteMercado}%)
              </CardDescription>
            </CardHeader>
          </Card>

          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  Sinistralidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{companyData.lossRatio}%</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Meta: {companyData.lossRatioTarget}%</p>
                  <div className="flex items-center text-xs text-red-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>+{(companyData.lossRatio - companyData.lossRatioTarget).toFixed(1)}%</span>
                  </div>
                </div>
                <Progress
                  value={(companyData.lossRatioTarget / companyData.lossRatio) * 100}
                  className="h-1 mt-2"
                  indicatorClassName="bg-red-500"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  Custo vs Prêmio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {(companyData.totalCost / 1000000).toFixed(2)}M</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Prêmio: R$ {(companyData.premiumTotal / 1000000).toFixed(2)}M
                  </p>
                  <div className="flex items-center text-xs text-red-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>+R$ {((companyData.totalCost - companyData.premiumTotal) / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  Beneficiários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyData.employees}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {Math.round(companyData.employees * (companyData.utilizationRate / 100))} utilizaram
                  </p>
                  <div className="flex items-center text-xs text-amber-500">
                    <span>{companyData.utilizationRate}% de utilização</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                  Casos Críticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyData.chronicCases}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{companyData.oncologyCases} casos oncológicos</p>
                  <div className="flex items-center text-xs text-red-500">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span>42% do custo total</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Sinistralidade */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                Evolução da Sinistralidade
              </CardTitle>
              <CardDescription>Sinistralidade mensal vs meta e média do mercado</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={lossRatioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 250]} />
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} name="Sinistralidade Atual" />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#22c55e"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta"
                  />
                  <Line
                    type="monotone"
                    dataKey="market"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    name="Média do Mercado"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Utilização e Top Utilizadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilização por Categoria</CardTitle>
                <CardDescription>Distribuição dos custos por tipo de serviço</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={utilizationByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="cost"
                    >
                      {utilizationByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`R$ ${(value / 1000).toFixed(0)}K`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                <div className="w-full grid grid-cols-2 gap-2">
                  {utilizationByCategory.map((category, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span>
                        {category.name}: R$ {(category.cost / 1000).toFixed(0)}K
                      </span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 5 Utilizadores</CardTitle>
                <CardDescription>
                  Representam{" "}
                  {(
                    (topUsers.slice(0, 5).reduce((acc, user) => acc + user.cost, 0) / companyData.totalCost) *
                    100
                  ).toFixed(0)}
                  % do custo total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topUsers.slice(0, 5).map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">ID: {user.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.age} anos • {user.gender === "M" ? "Masculino" : "Feminino"} • {user.condition}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {(user.cost / 1000).toFixed(0)}K</p>
                        <Badge
                          variant={user.risk === "Alto" ? "destructive" : user.risk === "Médio" ? "default" : "outline"}
                          className="mt-1"
                        >
                          {user.risk}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Ver todos os 10 principais utilizadores
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Análise Preditiva */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-blue-600" />
            Análise Preditiva
          </h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-blue-600" />
                Projeção de Sinistralidade - Próximos 12 Meses
              </CardTitle>
              <CardDescription>
                Comparação entre cenário sem intervenção vs com programa de gestão de saúde
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 150]} />
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="baseline" stroke="#ef4444" strokeWidth={2} name="Sem Intervenção" />
                  <Line
                    type="monotone"
                    dataKey="withIntervention"
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Com Programa de Gestão"
                  />
                  <Line
                    type="monotone"
                    y={() => 75}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta (75%)"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span>Sem intervenção: +30.5% em 12 meses</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Com intervenção: -36.2% em 12 meses</span>
              </div>
            </CardFooter>
          </Card>

          {/* Intervenções Recomendadas */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Intervenções Recomendadas
              </CardTitle>
              <CardDescription>Estratégias com maior impacto na redução da sinistralidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interventions.map((intervention, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{intervention.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Implementação: {intervention.timeframe}</span>
                          <span>•</span>
                          <span>ROI: {intervention.roi}%</span>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Impacto: -{intervention.impact}%
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Investimento:</span>
                        <div className="font-medium">R$ {(intervention.cost / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Economia Projetada:</span>
                        <div className="font-medium text-green-600">R$ {(intervention.savings / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payback:</span>
                        <div className="font-medium text-blue-600">
                          {(intervention.cost / (intervention.savings / 12)).toFixed(1)} meses
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${Math.min(intervention.impact * 5, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benchmarking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Benchmarking de Mercado
              </CardTitle>
              <CardDescription>Comparação com média do setor e melhores práticas</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="client" fill="#ef4444" name="Sua Empresa" />
                  <Bar dataKey="sector" fill="#3b82f6" name="Média do Setor" />
                  <Bar dataKey="best" fill="#22c55e" name="Melhores Práticas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights e Recomendações */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-blue-600" />
            Insights e Recomendações
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Principais Insights</CardTitle>
                <CardDescription>Descobertas baseadas na análise de dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-blue-800">Concentração de Custos</h4>
                        <p className="text-sm text-blue-600">
                          10 beneficiários (1% do total) representam 42% dos custos totais, com 4 casos oncológicos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-red-800">Prevenção Crítica</h4>
                        <p className="text-sm text-red-600">
                          Apenas 6.86% de cobertura para exame de sangue oculto, muito abaixo da média do setor (35.4%).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-amber-800">Picos de Sinistralidade</h4>
                        <p className="text-sm text-amber-600">
                          Dezembro (231.61%) e Janeiro (158.66%) apresentam picos significativos, indicando
                          sazonalidade.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <div className="flex items-start">
                      <Heart className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-green-800">Potencial de Melhoria</h4>
                        <p className="text-sm text-green-600">
                          Redução de 36.2% na sinistralidade é possível em 12 meses com intervenções adequadas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plano de Ação Recomendado</CardTitle>
                <CardDescription>Próximos passos para redução da sinistralidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-red-100 text-red-800 h-8 w-8 rounded-full flex items-center justify-center font-medium">
                        1
                      </div>
                      <h4 className="font-medium">Ação Emergencial (0-30 dias)</h4>
                    </div>
                    <ul className="space-y-2 text-sm pl-11">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Implementar gestão de casos para os 10 principais utilizadores</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Iniciar programa de telemedicina para reduzir internações</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-amber-100 text-amber-800 h-8 w-8 rounded-full flex items-center justify-center font-medium">
                        2
                      </div>
                      <h4 className="font-medium">Curto Prazo (1-3 meses)</h4>
                    </div>
                    <ul className="space-y-2 text-sm pl-11">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Campanha de rastreamento oncológico (sangue oculto e mamografia)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Implementar protocolos clínicos para casos crônicos</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-100 text-green-800 h-8 w-8 rounded-full flex items-center justify-center font-medium">
                        3
                      </div>
                      <h4 className="font-medium">Médio Prazo (3-6 meses)</h4>
                    </div>
                    <ul className="space-y-2 text-sm pl-11">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Programa completo de prevenção e bem-estar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Implementar programa de saúde mental corporativo</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Solicitar Proposta Detalhada</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Tabs para Análises Adicionais */}
        <Tabs defaultValue="demographics" className="mt-10">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demographics">Demografia</TabsTrigger>
            <TabsTrigger value="utilization">Utilização Detalhada</TabsTrigger>
            <TabsTrigger value="providers">Rede Credenciada</TabsTrigger>
            <TabsTrigger value="financial">Análise Financeira</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição Etária</CardTitle>
                <CardDescription>Análise demográfica dos beneficiários</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip formatter={(value, name, props) => [props.payload.count, "Beneficiários"]} />
                    <Bar dataKey="percentage" fill="#3b82f6" name="Percentual">
                      {ageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 || index === 4 ? "#ef4444" : "#3b82f6"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span>25.7% dos beneficiários têm mais de 45 anos, grupo com maior risco de condições crônicas</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="utilization" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Utilização</CardTitle>
                <CardDescription>Detalhamento completo da utilização do plano</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Selecione "Análise Detalhada" para visualizar este relatório.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Rede Credenciada</CardTitle>
                <CardDescription>Utilização e custos por prestador</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Selecione "Análise Detalhada" para visualizar este relatório.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise Financeira Detalhada</CardTitle>
                <CardDescription>Breakdown completo de custos e tendências</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Selecione "Análise Detalhada" para visualizar este relatório.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rodapé do Relatório */}
      <footer className="bg-muted py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
              <div>
                <h3 className="font-bold">Ukor Health Analytics</h3>
                <p className="text-xs text-muted-foreground">Powered by IA Avançada</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                Relatório gerado em {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                © 2025 Ukor Health Analytics • Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )\
}
