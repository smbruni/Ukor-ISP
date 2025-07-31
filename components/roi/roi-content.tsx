"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  Calculator,
  Target,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  Download,
  Lightbulb,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
} from "recharts"

export function ROIContent() {
  const [period, setPeriod] = useState("6m")
  const [department, setDepartment] = useState("all")

  // Estados para a calculadora
  const [employees, setEmployees] = useState(1000)
  const [avgSalary, setAvgSalary] = useState(8000)
  const [absenteeismRate, setAbsenteeismRate] = useState([4.5])
  const [turnoverRate, setTurnoverRate] = useState([15])
  const [healthPlanCost, setHealthPlanCost] = useState(450)
  const [investmentAmount, setInvestmentAmount] = useState(500000)

  // Dados para gráficos
  const roiEvolutionData = [
    { month: "Jan", investimento: 120, retorno: 85, roi: 71 },
    { month: "Fev", investimento: 120, retorno: 145, roi: 121 },
    { month: "Mar", investimento: 120, retorno: 198, roi: 165 },
    { month: "Abr", investimento: 120, retorno: 267, roi: 223 },
    { month: "Mai", investimento: 120, retorno: 342, roi: 285 },
    { month: "Jun", investimento: 120, retorno: 408, roi: 340 },
  ]

  const impactDistributionData = [
    { name: "Redução Absenteísmo", value: 35, color: "#22c55e" },
    { name: "Aumento Produtividade", value: 28, color: "#3b82f6" },
    { name: "Redução Turnover", value: 22, color: "#f59e0b" },
    { name: "Redução Sinistralidade", value: 15, color: "#ef4444" },
  ]

  const departmentROIData = [
    { dept: "TI", investimento: 85, retorno: 312, roi: 367, employees: 145 },
    { dept: "Vendas", investimento: 67, retorno: 198, roi: 295, employees: 89 },
    { dept: "Marketing", investimento: 45, retorno: 156, roi: 347, employees: 67 },
    { dept: "RH", investimento: 28, retorno: 98, roi: 350, employees: 23 },
    { dept: "Financeiro", investimento: 38, retorno: 124, roi: 326, employees: 34 },
    { dept: "Operações", investimento: 92, retorno: 287, roi: 312, employees: 156 },
  ]

  const financialImpactsData = [
    {
      category: "Redução de Custos",
      items: [
        { name: "Absenteísmo", before: 450000, after: 306000, savings: 144000, percentage: 32 },
        { name: "Turnover", before: 890000, after: 676000, savings: 214000, percentage: 24 },
        { name: "Sinistralidade", before: 2100000, after: 1785000, savings: 315000, percentage: 15 },
        { name: "Horas Extras", before: 320000, after: 224000, savings: 96000, percentage: 30 },
      ],
    },
    {
      category: "Aumento de Receita",
      items: [
        { name: "Produtividade", before: 12500000, after: 14750000, savings: 2250000, percentage: 18 },
        { name: "Qualidade", before: 8900000, after: 10235000, savings: 1335000, percentage: 15 },
        { name: "Inovação", before: 1200000, after: 1560000, savings: 360000, percentage: 30 },
      ],
    },
  ]

  // Cálculos da calculadora
  const calculateROI = () => {
    const totalSalaryBudget = employees * avgSalary * 12
    const absenteeismCost = totalSalaryBudget * (absenteeismRate[0] / 100)
    const turnoverCost = employees * (turnoverRate[0] / 100) * avgSalary * 3 // 3 meses para substituir
    const healthPlanTotal = employees * healthPlanCost * 12

    // Reduções esperadas com investimento em saúde
    const absenteeismReduction = absenteeismCost * 0.32 // 32% redução
    const turnoverReduction = turnoverCost * 0.24 // 24% redução
    const healthPlanReduction = healthPlanTotal * 0.15 // 15% redução sinistralidade
    const productivityGain = totalSalaryBudget * 0.18 // 18% aumento produtividade

    const totalSavings = absenteeismReduction + turnoverReduction + healthPlanReduction + productivityGain
    const roi = ((totalSavings - investmentAmount) / investmentAmount) * 100

    return {
      totalSavings,
      roi,
      absenteeismReduction,
      turnoverReduction,
      healthPlanReduction,
      productivityGain,
      paybackPeriod: investmentAmount / (totalSavings / 12),
    }
  }

  const calculatedROI = calculateROI()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ROI em Saúde</h2>
        <p className="text-muted-foreground">Análise completa de retorno sobre investimento em saúde corporativa</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ti">Tecnologia</SelectItem>
              <SelectItem value="rh">Recursos Humanos</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="operacoes">Operações</SelectItem>
              <SelectItem value="vendas">Vendas</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calculator className="h-4 w-4" />
            Calculadora ROI
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">340%</div>
            <p className="text-xs text-muted-foreground">+12% vs período anterior</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>Tendência positiva</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 720K</div>
            <p className="text-xs text-muted-foreground">Período de 6 meses</p>
            <div className="mt-2 text-xs text-blue-600">R$ 120K/mês médio</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retorno Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 2.4M</div>
            <p className="text-xs text-muted-foreground">+18% vs período anterior</p>
            <div className="mt-2 text-xs text-green-600">Payback em 4.2 meses</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Economia Mensal</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 410K</div>
            <p className="text-xs text-muted-foreground">Média mensal</p>
            <div className="mt-2 text-xs text-purple-600">R$ 329 por funcionário</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analysis">Análise Detalhada</TabsTrigger>
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="impacts">Impactos Financeiros</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do ROI</CardTitle>
                <CardDescription>Investimento vs Retorno ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={roiEvolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `R$ ${value}K`,
                        name === "investimento" ? "Investimento" : name === "retorno" ? "Retorno" : "ROI %",
                      ]}
                    />
                    <Line type="monotone" dataKey="investimento" stroke="#ef4444" strokeWidth={2} name="Investimento" />
                    <Line type="monotone" dataKey="retorno" stroke="#22c55e" strokeWidth={2} name="Retorno" />
                    <Line type="monotone" dataKey="roi" stroke="#3b82f6" strokeWidth={3} name="ROI %" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Impactos</CardTitle>
                <CardDescription>Principais fontes de retorno</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={impactDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {impactDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Principais Indicadores de Impacto</CardTitle>
              <CardDescription>Métricas que geram maior retorno financeiro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Redução Absenteísmo</span>
                    <Badge variant="default">32%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-600">R$ 144K</div>
                  <p className="text-xs text-muted-foreground">Economia anual</p>
                  <div className="w-full bg-secondary h-2 rounded-full mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Aumento Produtividade</span>
                    <Badge variant="default">18%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">R$ 2.25M</div>
                  <p className="text-xs text-muted-foreground">Receita adicional</p>
                  <div className="w-full bg-secondary h-2 rounded-full mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Redução Turnover</span>
                    <Badge variant="default">24%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">R$ 214K</div>
                  <p className="text-xs text-muted-foreground">Economia anual</p>
                  <div className="w-full bg-secondary h-2 rounded-full mt-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Redução Sinistralidade</span>
                    <Badge variant="default">15%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">R$ 315K</div>
                  <p className="text-xs text-muted-foreground">Economia anual</p>
                  <div className="w-full bg-secondary h-2 rounded-full mt-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ROI por Departamento</CardTitle>
              <CardDescription>Análise comparativa de retorno entre departamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentROIData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dept" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "roi" ? `${value}%` : `R$ ${value}K`,
                        name === "investimento" ? "Investimento" : name === "retorno" ? "Retorno" : "ROI",
                      ]}
                    />
                    <Bar dataKey="investimento" fill="#ef4444" name="Investimento" />
                    <Bar dataKey="retorno" fill="#22c55e" name="Retorno" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentROIData.map((dept) => (
                  <Card key={dept.dept} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{dept.dept}</h3>
                      <Badge variant={dept.roi >= 350 ? "default" : dept.roi >= 300 ? "secondary" : "outline"}>
                        {dept.roi}% ROI
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investimento:</span>
                        <span className="font-medium">R$ {dept.investimento}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Retorno:</span>
                        <span className="font-medium text-green-600">R$ {dept.retorno}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Funcionários:</span>
                        <span className="font-medium">{dept.employees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ROI por pessoa:</span>
                        <span className="font-medium">
                          R$ {Math.round(((dept.retorno - dept.investimento) * 1000) / dept.employees)}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculadora de ROI em Saúde
              </CardTitle>
              <CardDescription>
                Simule diferentes cenários e calcule o retorno esperado do seu investimento em saúde
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Parâmetros da Empresa</h3>

                  <div className="space-y-2">
                    <Label htmlFor="employees">Número de Funcionários</Label>
                    <Input
                      id="employees"
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avgSalary">Salário Médio Mensal (R$)</Label>
                    <Input
                      id="avgSalary"
                      type="number"
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Taxa de Absenteísmo Atual: {absenteeismRate[0]}%</Label>
                    <Slider
                      value={absenteeismRate}
                      onValueChange={setAbsenteeismRate}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Taxa de Turnover Atual: {turnoverRate[0]}%</Label>
                    <Slider
                      value={turnoverRate}
                      onValueChange={setTurnoverRate}
                      max={30}
                      min={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="healthPlan">Custo Plano de Saúde/Funcionário/Mês (R$)</Label>
                    <Input
                      id="healthPlan"
                      type="number"
                      value={healthPlanCost}
                      onChange={(e) => setHealthPlanCost(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investment">Investimento Anual em Saúde (R$)</Label>
                    <Input
                      id="investment"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Resultados Calculados</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <Card className="p-4 bg-green-50 border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-green-800">ROI Projetado</h4>
                          <p className="text-2xl font-bold text-green-600">{calculatedROI.roi.toFixed(1)}%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                    </Card>

                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-blue-800">Economia Total Anual</h4>
                          <p className="text-2xl font-bold text-blue-600">
                            R$ {(calculatedROI.totalSavings / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <DollarSign className="h-8 w-8 text-blue-600" />
                      </div>
                    </Card>

                    <Card className="p-4 bg-purple-50 border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-purple-800">Payback</h4>
                          <p className="text-2xl font-bold text-purple-600">
                            {calculatedROI.paybackPeriod.toFixed(1)} meses
                          </p>
                        </div>
                        <Target className="h-8 w-8 text-purple-600" />
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Detalhamento das Economias</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Redução Absenteísmo (32%):</span>
                        <span className="font-medium">
                          R$ {(calculatedROI.absenteeismReduction / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Redução Turnover (24%):</span>
                        <span className="font-medium">R$ {(calculatedROI.turnoverReduction / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Redução Sinistralidade (15%):</span>
                        <span className="font-medium">R$ {(calculatedROI.healthPlanReduction / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Ganho Produtividade (18%):</span>
                        <span className="font-medium">R$ {(calculatedROI.productivityGain / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Simulação
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impacts" className="space-y-4">
          {financialImpactsData.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
                <CardDescription>Impacto financeiro detalhado - {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.name} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge
                          variant={item.percentage >= 25 ? "default" : item.percentage >= 15 ? "secondary" : "outline"}
                        >
                          {item.percentage >= 0 ? "+" : ""}
                          {item.percentage}%
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Antes:</span>
                          <div className="font-medium">R$ {(item.before / 1000).toFixed(0)}K</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Depois:</span>
                          <div className="font-medium">R$ {(item.after / 1000).toFixed(0)}K</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            {category.category === "Redução de Custos" ? "Economia:" : "Ganho:"}
                          </span>
                          <div className="font-medium text-green-600">R$ {(item.savings / 1000).toFixed(0)}K</div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              category.category === "Redução de Custos" ? "bg-red-500" : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(item.percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-800">Total {category.category}</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        R$ {(category.items.reduce((sum, item) => sum + item.savings, 0) / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600">Impacto anual</p>
                      <p className="text-xs text-blue-500">{category.items.length} indicadores</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Insights Principais
                </CardTitle>
                <CardDescription>Descobertas importantes da análise de ROI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-green-800">ROI Excepcional</h4>
                        <p className="text-sm text-green-600">
                          O ROI de 340% está 40% acima da média do mercado (250%), indicando excelente eficiência do
                          programa.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-blue-800">Tendência Crescente</h4>
                        <p className="text-sm text-blue-600">
                          ROI cresceu 269% nos últimos 6 meses, mostrando que os benefícios se acumulam ao longo do
                          tempo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-purple-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-purple-800">Impacto por Funcionário</h4>
                        <p className="text-sm text-purple-600">
                          Cada R$ 1 investido por funcionário gera R$ 3,40 de retorno, com payback médio de 4,2 meses.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                    <div className="flex items-start">
                      <Target className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-orange-800">Departamentos de Destaque</h4>
                        <p className="text-sm text-orange-600">
                          RH (350% ROI) e Marketing (347% ROI) lideram, enquanto Operações tem maior potencial de
                          melhoria.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Recomendações Estratégicas
                </CardTitle>
                <CardDescription>Ações para maximizar o ROI em saúde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">🎯 Prioridade Alta</h4>
                    <ul className="text-sm space-y-1 text-red-600">
                      <li>• Expandir programa para Operações (+R$ 89K ROI potencial)</li>
                      <li>• Implementar métricas de produtividade em tempo real</li>
                      <li>• Criar incentivos para redução de absenteísmo</li>
                    </ul>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">📈 Oportunidades</h4>
                    <ul className="text-sm space-y-1 text-orange-600">
                      <li>• Aumentar investimento em 20% pode gerar ROI de 420%</li>
                      <li>• Focar em prevenção pode reduzir sinistralidade em 25%</li>
                      <li>• Programas de bem-estar mental têm ROI de 450%</li>
                    </ul>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">✅ Manter</h4>
                    <ul className="text-sm space-y-1 text-green-600">
                      <li>• Programas atuais de RH e Marketing</li>
                      <li>• Investimento mensal de R$ 120K está otimizado</li>
                      <li>• Estratégia de comunicação está efetiva</li>
                    </ul>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">🔮 Projeções</h4>
                    <ul className="text-sm space-y-1 text-blue-600">
                      <li>• ROI pode chegar a 450% em 12 meses</li>
                      <li>• Economia total projetada: R$ 3.2M no próximo ano</li>
                      <li>• Break-even de novos investimentos: 3.8 meses</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Benchmarking de Mercado</CardTitle>
              <CardDescription>Comparação com empresas similares do setor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Sua Empresa</h4>
                  <div className="text-3xl font-bold text-green-600">340%</div>
                  <p className="text-sm text-muted-foreground">ROI em Saúde</p>
                  <Badge className="mt-2">Excelente</Badge>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Média do Setor</h4>
                  <div className="text-3xl font-bold text-blue-600">250%</div>
                  <p className="text-sm text-muted-foreground">ROI em Saúde</p>
                  <Badge variant="secondary" className="mt-2">
                    Bom
                  </Badge>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Top 10% Mercado</h4>
                  <div className="text-3xl font-bold text-purple-600">420%</div>
                  <p className="text-sm text-muted-foreground">ROI em Saúde</p>
                  <Badge variant="outline" className="mt-2">
                    Meta
                  </Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Posicionamento Competitivo</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sua posição no ranking:</span>
                    <span className="font-medium">Top 25% do mercado</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diferença vs média:</span>
                    <span className="font-medium text-green-600">+90 pontos percentuais</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Potencial de crescimento:</span>
                    <span className="font-medium text-blue-600">+80 pontos até top 10%</span>
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
