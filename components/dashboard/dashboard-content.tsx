"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts"
import { ArrowUp, ArrowDown, AlertTriangle, Heart, Shield, Activity, DollarSign, FileText, Users } from "lucide-react"

export default function DashboardContent() {
  const healthPerformanceData = [
    { month: "Abr/24", absenteismo: 4.2, produtividade: 78, engajamento: 65 },
    { month: "Mai/24", absenteismo: 3.8, produtividade: 82, engajamento: 68 },
    { month: "Jun/24", absenteismo: 3.5, produtividade: 85, engajamento: 72 },
    { month: "Jul/24", absenteismo: 4.1, produtividade: 79, engajamento: 69 },
    { month: "Ago/24", absenteismo: 3.2, produtividade: 88, engajamento: 74 },
    { month: "Set/24", absenteismo: 2.9, produtividade: 91, engajamento: 78 },
    { month: "Out/24", absenteismo: 3.7, produtividade: 83, engajamento: 71 },
    { month: "Nov/24", absenteismo: 3.4, produtividade: 86, engajamento: 75 },
    { month: "Dez/24", absenteismo: 3.1, produtividade: 89, engajamento: 77 },
    { month: "Jan/25", absenteismo: 2.8, produtividade: 92, engajamento: 81 },
    { month: "Fev/25", absenteismo: 3.0, produtividade: 90, engajamento: 79 },
    { month: "Mar/25", absenteismo: 2.6, produtividade: 94, engajamento: 83 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Executivo - Saúde e Performance Corporativa</h2>
        <p className="text-muted-foreground">Indicadores integrados de bem-estar, produtividade e impacto financeiro</p>
      </div>

      {/* Alerta de Burnout Preditivo */}
      <Card className="border-l-4 border-l-amber-500 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            Alerta Preditivo - Risco de Burnout Elevado
          </CardTitle>
          <CardDescription className="text-amber-700">
            23 colaboradores com alto risco de burnout identificados pela IA - Intervenção recomendada
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absenteísmo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2.6%</div>
            <p className="text-xs text-muted-foreground">Meta: &lt;2.5%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-38% vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Presenteísmo</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">18%</div>
            <p className="text-xs text-muted-foreground">Produtividade reduzida</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>Estresse e dores</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sinistralidade</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">110.04%</div>
            <p className="text-xs text-muted-foreground">Meta: &lt;75%</p>
            <div className="mt-2 flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+35% acima da meta</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Turnover</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground">Meta: &lt;10%</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>Dentro da meta</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">83%</div>
            <p className="text-xs text-muted-foreground">eNPS: +45</p>
            <div className="mt-2 flex items-center text-xs text-blue-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+18% vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wellbeing Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7.8</div>
            <p className="text-xs text-muted-foreground">Escala 0-10</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+1.2 vs ano anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Evolução: Absenteísmo vs Produtividade vs Engajamento</CardTitle>
            <CardDescription>Correlação entre indicadores de saúde e performance organizacional</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={healthPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="absenteismo"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Absenteísmo %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="produtividade"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Produtividade %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="engajamento"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Engajamento %"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas e Insights</CardTitle>
            <CardDescription>Situações que requerem atenção imediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Risco de Burnout</h4>
                  <p className="text-xs text-muted-foreground">23 colaboradores em risco alto</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Heart className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Doenças Crônicas</h4>
                  <p className="text-xs text-muted-foreground">34% com hipertensão/diabetes</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Presenteísmo Elevado</h4>
                  <p className="text-xs text-muted-foreground">18% com produtividade reduzida</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <DollarSign className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">ROI Positivo</h4>
                  <p className="text-xs text-muted-foreground">R$ 2.4M economia em bem-estar</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nova seção com indicadores financeiros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Custo Afastamentos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 340K</div>
            <p className="text-xs text-muted-foreground">INSS + Plano de saúde</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-22% vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI Bem-Estar</CardTitle>
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">340%</div>
            <p className="text-xs text-muted-foreground">Retorno sobre investimento</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>R$ 3.40 para cada R$ 1</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Atestados/Colaborador</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1</div>
            <p className="text-xs text-muted-foreground">Por ano</p>
            <div className="mt-2 flex items-center text-xs text-green-500">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-0.8 vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Horas Extras</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">12%</div>
            <p className="text-xs text-muted-foreground">Acima da carga normal</p>
            <div className="mt-2 flex items-center text-xs text-amber-500">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>Risco de sobrecarga</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
