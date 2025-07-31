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
    <div className="h-full flex flex-col bg-gray-50">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-2 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Dashboard Executivo</h1>
              <Badge variant="destructive" className="text-xs">
                Dados Reais Unimed-BH
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
              <Input placeholder="Buscar..." className="pl-7 w-48 h-8 bg-gray-50 border-gray-200 text-sm" />
            </div>
            <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                2
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Scrollable Content with Better Spacing */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* Alert */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Alerta Preditivo:</strong> 23 colaboradores com alto risco de burnout - Intervenção recomendada
            </AlertDescription>
          </Alert>

          {/* KPI Cards - More Compact */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Absenteísmo</span>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">2.6%</div>
                <div className="text-xs text-gray-500 mb-1">Meta: 2.5%</div>
                <div className="flex items-center">
                  {getTrendIcon("-38%")}
                  <span className={`text-xs ml-1 font-medium ${getTrendColor("-38%", false)}`}>
                    -38% vs ano anterior
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Presenteísmo</span>
                  <TrendingUp className="h-4 w-4 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-600">18%</div>
                <div className="text-xs text-gray-500 mb-1">Produtividade reduzida</div>
                <div className="flex items-center">
                  {getTrendIcon("+")}
                  <span className="text-xs ml-1 font-medium text-red-600">Estresse e dores</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-red-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Sinistralidade</span>
                  <DollarSign className="h-4 w-4 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-600">110.04%</div>
                <div className="text-xs text-gray-500 mb-1">Meta: 75%</div>
                <div className="flex items-center">
                  {getTrendIcon("+35%")}
                  <span className={`text-xs ml-1 font-medium ${getTrendColor("+35%", false)}`}>+35% acima da meta</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Turnover</span>
                  <Users className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">8.4%</div>
                <div className="text-xs text-gray-500 mb-1">Meta: 10%</div>
                <div className="flex items-center">
                  {getTrendIcon("-")}
                  <span className={`text-xs ml-1 font-medium ${getTrendColor("-", true)}`}>Dentro da meta</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Engajamento</span>
                  <Heart className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600">83%</div>
                <div className="text-xs text-gray-500 mb-1">eNPS: +45</div>
                <div className="flex items-center">
                  {getTrendIcon("+18%")}
                  <span className={`text-xs ml-1 font-medium ${getTrendColor("+18%", true)}`}>
                    +18% vs ano anterior
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-emerald-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Wellbeing Score</span>
                  <Activity className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">7.8</div>
                <div className="text-xs text-gray-500 mb-1">Escala 0-10</div>
                <div className="flex items-center">
                  {getTrendIcon("+12%")}
                  <span className={`text-xs ml-1 font-medium ${getTrendColor("+12%", true)}`}>
                    +12% vs ano anterior
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section - Reduced Height */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Correlation Chart */}
            <Card className="lg:col-span-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Evolução: Absenteísmo vs Produtividade vs Engajamento</CardTitle>
                <CardDescription>Correlação entre indicadores de saúde e performance organizacional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={correlationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        type="number"
                        dataKey="x"
                        name="Absenteísmo"
                        domain={[0, 8]}
                        tickFormatter={(value) => `${value}%`}
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
                                <p className="font-semibold text-gray-900">{data.name}</p>
                                <p className="text-sm text-red-600">Absenteísmo: {data.x}%</p>
                                <p className="text-sm text-blue-600">Produtividade: {data.y}/10</p>
                                <p className="text-sm text-green-600">Engajamento: {data.z}%</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter name="Absenteísmo" dataKey="x" fill="#ef4444" r={5} />
                      <Scatter name="Produtividade" dataKey="y" fill="#3b82f6" r={5} />
                      <Scatter name="Engajamento" dataKey="z" fill="#10b981" r={5} />
                      <Legend />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Alerts and Insights */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Alertas e Insights</CardTitle>
                <CardDescription>Situações que requerem atenção imediata</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Risco de Burnout</h4>
                    <p className="text-sm text-red-600">23 colaboradores em risco alto</p>
                    <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Doenças Crônicas</h4>
                    <p className="text-sm text-yellow-600">34% com hipertensão/diabetes</p>
                    <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                      Programas Preventivos
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Presenteísmo Elevado</h4>
                    <p className="text-sm text-blue-600">18% com produtividade reduzida</p>
                    <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                      Análise Detalhada
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800">ROI Positivo</h4>
                    <p className="text-sm text-green-600">R$ 2.4M economia em bem-estar</p>
                    <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                      Relatório ROI
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Metrics - Compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Custo Afastamentos</span>
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-xl font-bold text-gray-900">R$ 340K</div>
                <div className="text-xs text-gray-500 mb-1">INSS + Plano de saúde</div>
                <div className="flex items-center">
                  {getTrendIcon("-22%")}
                  <span className={`text-xs ml-1 font-medium ${getTrendColor("-22%", false)}`}>
                    -22% vs ano anterior
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">ROI Bem-Estar</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-xl font-bold text-green-600">340%</div>
                <div className="text-xs text-gray-500 mb-1">Retorno sobre investimento</div>
                <div className="flex items-center">
                  {getTrendIcon("+")}
                  <span className={`text-xs ml-1 font-medium ${getTrendColor("+", true)}`}>R$ 3.40 para cada R$ 1</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-gray-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Afastados/Colaborador</span>
                  <Users className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-xl font-bold text-gray-900">2.1</div>
                <div className="text-xs text-gray-500 mb-1">Por ano</div>
                <div className="flex items-center">
                  {getTrendIcon("-0.8")}
                  <span className={`text-xs ml-1 font-medium ${getTrendColor("-0.8", false)}`}>
                    -0.8 vs ano anterior
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Horas Extras</span>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="text-xl font-bold text-yellow-600">12%</div>
                <div className="text-xs text-gray-500 mb-1">Acima da carga normal</div>
                <div className="flex items-center">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs ml-1 font-medium text-yellow-600">Risco de sobrecarga</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
