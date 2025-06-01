"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

interface ISPThermometerProps {
  currentISP: number
  previousISP: number
  target: number
}

export function ISPThermometer({ currentISP = 68, previousISP = 72, target = 85 }: ISPThermometerProps) {
  const trend = currentISP - previousISP
  const progressToTarget = (currentISP / target) * 100

  const getISPStatus = (isp: number) => {
    if (isp >= 80) return { label: "Excelente", color: "bg-emerald-500", textColor: "text-emerald-700" }
    if (isp >= 70) return { label: "Bom", color: "bg-blue-500", textColor: "text-blue-700" }
    if (isp >= 60) return { label: "Atenção", color: "bg-yellow-500", textColor: "text-yellow-700" }
    return { label: "Crítico", color: "bg-red-500", textColor: "text-red-700" }
  }

  const status = getISPStatus(currentISP)
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown
  const trendColor = trend >= 0 ? "text-emerald-600" : "text-red-600"

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-2 shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Índice de Saúde e Performance</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Indicador consolidado da organização</p>
          </div>
          <Badge className={`${status.color} text-white px-4 py-2 text-sm font-semibold`}>{status.label}</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Termômetro Visual */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-64 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
              {/* Fundo do termômetro */}
              <div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-red-500 via-yellow-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                style={{ height: `${progressToTarget}%` }}
              ></div>

              {/* Marcações */}
              <div className="absolute inset-0 flex flex-col justify-between py-4 px-2">
                {[100, 80, 60, 40, 20, 0].map((mark) => (
                  <div key={mark} className="flex items-center justify-between w-full">
                    <div className="w-3 h-0.5 bg-slate-400"></div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{mark}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Valor atual */}
            <div className="mt-4 text-center">
              <div className="text-4xl font-bold text-slate-900 dark:text-white">{currentISP}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Pontos ISP</div>
            </div>
          </div>

          {/* Métricas e Tendência */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <TrendIcon className={`h-5 w-5 ${trendColor}`} />
                <span className={`font-semibold ${trendColor}`}>
                  {trend > 0 ? "+" : ""}
                  {trend} pontos
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">vs. mês anterior</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Meta Anual</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{target}</span>
                </div>
                <Progress value={progressToTarget} className="h-3" />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {Math.round(progressToTarget)}% da meta atingida
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">1.247</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Colaboradores</div>
                </div>
                <div className="text-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">6</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Departamentos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Ações Recomendadas</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Tecnologia em risco crítico</p>
                  <p className="text-xs text-red-600 dark:text-red-300 mt-1">32% burnout detectado</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Operações precisa atenção</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">Engajamento em queda</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">RH performance excelente</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1">+8 pontos este mês</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
