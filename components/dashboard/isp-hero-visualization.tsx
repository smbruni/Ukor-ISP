"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Info, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react"

// Dados simulados para o ISP
const ispData = {
  current: 68,
  previous: 65,
  target: 85,
  history: [62, 63, 65, 64, 65, 68],
  breakdown: [
    { name: "Sono", value: 58, weight: 23, status: "critical" },
    { name: "Saúde Mental", value: 65, weight: 18, status: "warning" },
    { name: "Saúde Física", value: 72, weight: 20, status: "good" },
    { name: "Engajamento", value: 76, weight: 15, status: "good" },
    { name: "Produtividade", value: 70, weight: 14, status: "good" },
    { name: "Ambiente", value: 68, weight: 10, status: "warning" },
  ],
  departments: [
    { name: "Tecnologia", value: 62, trend: -3 },
    { name: "Operações", value: 65, trend: -1 },
    { name: "Comercial", value: 72, trend: +2 },
    { name: "RH", value: 82, trend: +5 },
    { name: "Financeiro", value: 70, trend: 0 },
    { name: "Administrativo", value: 68, trend: +1 },
  ],
}

export function ISPHeroVisualization() {
  const [activeTab, setActiveTab] = useState("gauge")
  const [animatedValue, setAnimatedValue] = useState(0)
  const [showTooltip, setShowTooltip] = useState("")

  // Animação do valor do ISP
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(ispData.current)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Determina o status do ISP
  const getISPStatus = (value: number) => {
    if (value >= 80) return { label: "Excelente", color: "bg-emerald-500", textColor: "text-emerald-600" }
    if (value >= 70) return { label: "Bom", color: "bg-blue-500", textColor: "text-blue-600" }
    if (value >= 60) return { label: "Atenção", color: "bg-yellow-500", textColor: "text-yellow-600" }
    return { label: "Crítico", color: "bg-red-500", textColor: "text-red-600" }
  }

  const status = getISPStatus(ispData.current)
  const trend = ispData.current - ispData.previous
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown
  const trendColor = trend >= 0 ? "text-emerald-600" : "text-red-600"

  // Calcula o ângulo para o ponteiro do gauge
  const gaugeAngle = (ispData.current / 100) * 180 - 90

  // Calcula a cor do gradiente baseada no valor do ISP
  const getGradientColor = (value: number) => {
    if (value < 60) return "from-red-500 to-red-600"
    if (value < 70) return "from-yellow-500 to-yellow-600"
    if (value < 80) return "from-blue-500 to-blue-600"
    return "from-emerald-500 to-emerald-600"
  }

  const gradientColor = getGradientColor(ispData.current)

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-900 border shadow-xl">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Visualização Principal - Lado Esquerdo */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Índice de Saúde e Performance</h2>
                <p className="text-slate-600 dark:text-slate-300 mt-1">Indicador consolidado da saúde organizacional</p>
              </div>
              <Badge className={`${status.color} text-white px-4 py-1.5 text-sm font-semibold`}>{status.label}</Badge>
            </div>

            <Tabs defaultValue="gauge" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="gauge">Gauge</TabsTrigger>
                <TabsTrigger value="breakdown">Componentes</TabsTrigger>
                <TabsTrigger value="departments">Departamentos</TabsTrigger>
              </TabsList>

              {/* Visualização Gauge */}
              <TabsContent value="gauge" className="mt-0">
                <div className="flex flex-col items-center">
                  {/* Gauge Semicircular */}
                  <div className="relative w-64 h-32 mt-4">
                    {/* Fundo do Gauge */}
                    <div className="absolute w-full h-full bg-slate-200 dark:bg-slate-700 rounded-t-full"></div>

                    {/* Valor do Gauge */}
                    <div
                      className={`absolute w-full h-full bg-gradient-to-r ${gradientColor} rounded-t-full transition-all duration-1000 ease-out origin-bottom`}
                      style={{ transform: `rotate(${(animatedValue / 100) * 180}deg)` }}
                    ></div>

                    {/* Marcações */}
                    <div className="absolute w-full h-full">
                      {[0, 20, 40, 60, 80, 100].map((mark) => {
                        const angle = (mark / 100) * 180 - 90
                        const x = 32 + 32 * Math.cos((angle * Math.PI) / 180)
                        const y = 32 + 32 * Math.sin((angle * Math.PI) / 180)
                        return (
                          <div
                            key={mark}
                            className="absolute w-1 h-3 bg-white dark:bg-slate-800"
                            style={{
                              left: `${x}%`,
                              top: `${y}%`,
                              transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                            }}
                          ></div>
                        )
                      })}
                    </div>

                    {/* Ponteiro */}
                    <div
                      className="absolute bottom-0 left-1/2 w-1 h-32 bg-slate-900 dark:bg-white origin-bottom transition-transform duration-1000 ease-out"
                      style={{ transform: `translateX(-50%) rotate(${gaugeAngle}deg)` }}
                    ></div>

                    {/* Círculo central */}
                    <div className="absolute bottom-0 left-1/2 w-6 h-6 rounded-full bg-slate-900 dark:bg-white transform -translate-x-1/2 translate-y-1/2"></div>

                    {/* Valor numérico */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-center">
                      <div className="text-5xl font-bold text-slate-900 dark:text-white">{animatedValue}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">pontos</div>
                    </div>
                  </div>

                  {/* Informações adicionais */}
                  <div className="mt-16 grid grid-cols-3 gap-8 w-full">
                    <div className="text-center">
                      <div className="text-sm text-slate-600 dark:text-slate-300">Meta</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{ispData.target}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">pontos</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-slate-600 dark:text-slate-300">Tendência</div>
                      <div className={`text-2xl font-bold flex items-center justify-center ${trendColor}`}>
                        <TrendIcon className="h-5 w-5 mr-1" />
                        {trend > 0 ? "+" : ""}
                        {trend}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">vs. mês anterior</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-slate-600 dark:text-slate-300">Progresso</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {Math.round((ispData.current / ispData.target) * 100)}%
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">da meta</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Visualização Breakdown */}
              <TabsContent value="breakdown" className="mt-0">
                <div className="space-y-4">
                  {ispData.breakdown.map((item) => {
                    const itemStatus =
                      item.status === "critical"
                        ? "bg-red-500"
                        : item.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-emerald-500"

                    return (
                      <div key={item.name} className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${itemStatus} mr-2`}></div>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">{item.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">({item.weight}%)</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${itemStatus} transition-all duration-500`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}

                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="text-xs">
                      Ver análise detalhada
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Visualização Departamentos */}
              <TabsContent value="departments" className="mt-0">
                <div className="grid grid-cols-2 gap-4">
                  {ispData.departments.map((dept) => {
                    const deptStatus = getISPStatus(dept.value)
                    const deptTrend = dept.trend
                    const DeptTrendIcon = deptTrend >= 0 ? TrendingUp : TrendingDown
                    const deptTrendColor = deptTrend >= 0 ? "text-emerald-600" : "text-red-600"

                    return (
                      <div
                        key={dept.name}
                        className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-900 dark:text-white">{dept.name}</span>
                          <Badge className={`${deptStatus.color} text-white`}>{dept.value}</Badge>
                        </div>
                        <div className="flex items-center mt-2">
                          <DeptTrendIcon className={`h-4 w-4 ${deptTrendColor}`} />
                          <span className={`text-sm font-medium ${deptTrendColor} ml-1`}>
                            {deptTrend > 0 ? "+" : ""}
                            {deptTrend} pts
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Painel Lateral - Lado Direito */}
          <div className="lg:w-80 space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Insights Rápidos</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Sono é o componente mais crítico
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">58 pontos, 23% abaixo da meta</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      RH é o departamento com melhor desempenho
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">82 pontos, +5 este mês</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Tendência positiva nos últimos 3 meses
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">+6 pontos desde Março</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Ações Recomendadas</h3>

              <div className="space-y-2">
                <Button variant="destructive" size="sm" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Intervir no Depto. de Tecnologia
                </Button>

                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Info className="h-4 w-4 mr-2" />
                  Analisar programa de sono
                </Button>

                <Button variant="outline" size="sm" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Replicar práticas do RH
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Sobre o ISP</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                O Índice de Saúde e Performance (ISP) é um indicador composto que mede a saúde organizacional através de
                6 componentes principais, ponderados por sua importância relativa.
              </p>
              <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400 p-0 h-auto mt-2">
                Saiba mais sobre a metodologia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
