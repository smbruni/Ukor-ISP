"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  AlertTriangle,
  Heart,
  Clock,
  CheckCircle,
  Search,
  Bell,
  User,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

export function DashboardContent() {
  // Dados do gráfico de correlação
  const correlationData = [
    { x: 4, y: 6, z: 50, name: "Abr/24", absenteismo: 4, produtividade: 6, engajamento: 50 },
    { x: 5, y: 6, z: 60, name: "Mai/24", absenteismo: 5, produtividade: 6, engajamento: 60 },
    { x: 6, y: 7, z: 65, name: "Jun/24", absenteismo: 6, produtividade: 7, engajamento: 65 },
    { x: 4, y: 8, z: 70, name: "Jul/24", absenteismo: 4, produtividade: 8, engajamento: 70 },
    { x: 3, y: 8, z: 75, name: "Ago/24", absenteismo: 3, produtividade: 8, engajamento: 75 },
    { x: 2, y: 9, z: 80, name: "Set/24", absenteismo: 2, produtividade: 9, engajamento: 80 },
    { x: 3, y: 8, z: 75, name: "Out/24", absenteismo: 3, produtividade: 8, engajamento: 75 },
    { x: 4, y: 7, z: 70, name: "Nov/24", absenteismo: 4, produtividade: 7, engajamento: 70 },
    { x: 3, y: 8, z: 75, name: "Dez/24", absenteismo: 3, produtividade: 8, engajamento: 75 },
    { x: 2, y: 9, z: 85, name: "Jan/25", absenteismo: 2, produtividade: 9, engajamento: 85 },
    { x: 3, y: 8, z: 80, name: "Fev/25", absenteismo: 3, produtividade: 8, engajamento: 80 },
    { x: 2, y: 9, z: 90, name: "Mar/25", absenteismo: 2, produtividade: 9, engajamento: 90 },
  ]

  const getTrendIcon = (trend: string) => {
    if (trend.startsWith("+")) return <ArrowUp className="h-3 w-3 text-red-500" />
    if (trend.startsWith("-")) return <ArrowDown className="h-3 w-3 text-green-500" />
    return <Minus className="h-3 w-3 text-gray-500" />
  }

  const getTrendColor = (trend: string, isPositive = false) => {
    if (trend.startsWith("+")) return isPositive ? "text-green-600" : "text-red-600"
    if (trend.startsWith("-")) return isPositive ? "text-red-600" : "text-green-600"
    return "text-gray-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ukor Health Analytics</h1>
            <Badge variant="destructive" className="mt-1">
              Dados Reais Unimed-BH
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar..." className="pl-10 w-64 bg-gray-50 border-gray-200" />
            </div>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                2
              </Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Executivo - Saúde e Performance Corporativa</h2>
          <p className="text-gray-600 mt-1">Indicadores integrados de bem-estar, produtividade e impacto financeiro</p>
        </div>

        {/* Alert */}
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Alerta Preditivo - Risco de Burnout Elevado</strong>
            <br />
            23 colaboradores com alto risco de burnout identificados pela IA - Intervenção recomendada
          </AlertDescription>
        </Alert>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Absenteísmo</span>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2.6%</div>
              <div className="text-xs text-gray-500">Meta: 2.5%</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("-38%")}
                <span className={`text-xs ml-1 ${getTrendColor("-38%", false)}`}>-38% vs ano anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Presenteísmo</span>
                <TrendingUp className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">18%</div>
              <div className="text-xs text-gray-500">Produtividade reduzida</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("+")}
                <span className="text-xs ml-1 text-red-600">Estresse e dores</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Sinistralidade</span>
                <DollarSign className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">110.04%</div>
              <div className="text-xs text-gray-500">Meta: 75%</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("+35%")}
                <span className={`text-xs ml-1 ${getTrendColor("+35%", false)}`}>+35% acima da meta</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Turnover</span>
                <Users className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">8.4%</div>
              <div className="text-xs text-gray-500">Meta: 10%</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("-")}
                <span className={`text-xs ml-1 ${getTrendColor("-", true)}`}>Dentro da meta</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Engajamento</span>
                <Heart className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">83%</div>
              <div className="text-xs text-gray-500">eNPS: +45</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("+18%")}
                <span className={`text-xs ml-1 ${getTrendColor("+18%", true)}`}>+18% vs ano anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Wellbeing Score</span>
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">7.8</div>
              <div className="text-xs text-gray-500">Escala 0-10</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("+12%")}
                <span className={`text-xs ml-1 ${getTrendColor("+12%", true)}`}>+12 vs ano anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Correlation Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Evolução: Absenteísmo vs Produtividade vs Engajamento</CardTitle>
              <CardDescription>Correlação entre indicadores de saúde e performance organizacional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="Absenteísmo"
                      domain={[0, 8]}
                      tickFormatter={(value) => `${value}`}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Produtividade"
                      domain={[0, 10]}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-semibold">{data.name}</p>
                              <p className="text-sm">Absenteísmo: {data.x}%</p>
                              <p className="text-sm">Produtividade: {data.y}/10</p>
                              <p className="text-sm">Engajamento: {data.z}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter name="Absenteísmo" dataKey="x" fill="#ef4444" r={4} />
                    <Scatter name="Produtividade" dataKey="y" fill="#3b82f6" r={4} />
                    <Scatter name="Engajamento" dataKey="z" fill="#10b981" r={4} />
                    <Legend />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Alerts and Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas e Insights</CardTitle>
              <CardDescription>Situações que requerem atenção imediata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800">Risco de Burnout</h4>
                  <p className="text-sm text-red-600">23 colaboradores em risco alto</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Doenças Crônicas</h4>
                  <p className="text-sm text-yellow-600">34% com hipertensão/diabetes</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Presenteísmo Elevado</h4>
                  <p className="text-sm text-blue-600">18% com produtividade reduzida</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800">ROI Positivo</h4>
                  <p className="text-sm text-green-600">R$ 2.4M economia em bem-estar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Custo Afastamentos</span>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">R$ 340K</div>
              <div className="text-xs text-gray-500">INSS + Plano de saúde</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("-22%")}
                <span className={`text-xs ml-1 ${getTrendColor("-22%", false)}`}>-22% vs ano anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">ROI Bem-Estar</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">340%</div>
              <div className="text-xs text-gray-500">Retorno sobre investimento</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("+")}
                <span className={`text-xs ml-1 ${getTrendColor("+", true)}`}>R$ 3.40 para cada R$ 1</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Afastados/Colaborador</span>
                <Users className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2.1</div>
              <div className="text-xs text-gray-500">Por ano</div>
              <div className="flex items-center mt-1">
                {getTrendIcon("-0.8")}
                <span className={`text-xs ml-1 ${getTrendColor("-0.8", false)}`}>-0.8 vs ano anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Horas Extras</span>
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-600">12%</div>
              <div className="text-xs text-gray-500">Acima da carga normal</div>
              <div className="flex items-center mt-1">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span className="text-xs ml-1 text-yellow-600">Risco de sobrecarga</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
