"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Moon, Heart, Brain, Apple, Users, TrendingUp, AlertTriangle } from "lucide-react"

export function ISPOverviewChart() {
  const ispPillars = [
    {
      name: "Sono",
      icon: Moon,
      score: 45,
      weight: 23,
      status: "Crítico",
      color: "red",
      impact: "Alto",
      description: "Qualidade e duração do sono dos colaboradores",
    },
    {
      name: "Saúde Física",
      icon: Heart,
      score: 85,
      weight: 20,
      status: "Excelente",
      color: "green",
      impact: "Baixo",
      description: "Condicionamento físico e saúde geral",
    },
    {
      name: "Saúde Mental",
      icon: Brain,
      score: 72,
      weight: 18,
      status: "Bom",
      color: "yellow",
      impact: "Médio",
      description: "Bem-estar psicológico e emocional",
    },
    {
      name: "Nutrição",
      icon: Apple,
      score: 68,
      weight: 16,
      status: "Atenção",
      color: "yellow",
      impact: "Médio",
      description: "Hábitos alimentares e nutricionais",
    },
    {
      name: "Engajamento",
      icon: Users,
      score: 75,
      weight: 13,
      status: "Bom",
      color: "green",
      impact: "Baixo",
      description: "Motivação e conexão com o trabalho",
    },
    {
      name: "Produtividade",
      icon: TrendingUp,
      score: 78,
      weight: 10,
      status: "Bom",
      color: "green",
      impact: "Baixo",
      description: "Eficiência e resultados no trabalho",
    },
  ]

  const totalISP = Math.round(ispPillars.reduce((sum, pillar) => sum + (pillar.score * pillar.weight) / 100, 0))

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Crítico":
        return {
          bg: "bg-red-500",
          text: "text-white",
          border: "border-red-500",
          cardBg: "bg-red-50 dark:bg-red-950/20",
        }
      case "Atenção":
        return {
          bg: "bg-amber-500",
          text: "text-white",
          border: "border-amber-500",
          cardBg: "bg-amber-50 dark:bg-amber-950/20",
        }
      case "Bom":
        return {
          bg: "bg-emerald-500",
          text: "text-white",
          border: "border-emerald-500",
          cardBg: "bg-emerald-50 dark:bg-emerald-950/20",
        }
      case "Excelente":
        return {
          bg: "bg-blue-500",
          text: "text-white",
          border: "border-blue-500",
          cardBg: "bg-blue-50 dark:bg-blue-950/20",
        }
      default:
        return {
          bg: "bg-gray-500",
          text: "text-white",
          border: "border-gray-500",
          cardBg: "bg-gray-50 dark:bg-gray-950/20",
        }
    }
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-blue-500"
    if (score >= 70) return "bg-emerald-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">ISP - Índice de Saúde e Performance</div>
            <div className="text-sm font-normal text-gray-600 dark:text-gray-300 mt-1">
              6 Pilares Fundamentais para o Bem-estar Corporativo
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ISP Total - Destaque Principal */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-8 text-white shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium opacity-90 mb-2">ISP Total da Empresa</div>
                <div className="text-6xl font-black mb-2">{totalISP}</div>
                <div className="text-lg font-medium opacity-90">de 100 pontos</div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-3">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">+5 pts este mês</span>
                </div>
                <div className="text-sm opacity-90">Tendência Positiva</div>
              </div>
            </div>

            {/* Barra de Progresso Customizada */}
            <div className="mt-6">
              <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${totalISP}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Elementos Decorativos */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Pilares Individuais - Design Limpo e Claro */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Componentes do ISP</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">(ordenados por peso no cálculo)</div>
          </div>

          {ispPillars.map((pillar, index) => {
            const styles = getStatusStyles(pillar.status)
            const isHighPriority = pillar.status === "Crítico" || pillar.status === "Atenção"

            return (
              <div
                key={index}
                className={`
                  relative rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg
                  ${styles.cardBg} ${styles.border}
                  ${isHighPriority ? "ring-2 ring-offset-2 ring-red-200 dark:ring-red-800" : ""}
                `}
              >
                {/* Indicador de Prioridade */}
                {isHighPriority && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-red-500 text-white rounded-full p-2 shadow-lg">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {/* Lado Esquerdo - Informações */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-4 rounded-xl ${styles.bg} shadow-lg`}>
                      <pillar.icon className="h-8 w-8 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{pillar.name}</h4>
                        <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                          Peso: {pillar.weight}%
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{pillar.description}</p>

                      {/* Barra de Progresso */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProgressColor(pillar.score)}`}
                          style={{ width: `${pillar.score}%` }}
                        ></div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">{pillar.score}% de performance</div>
                    </div>
                  </div>

                  {/* Lado Direito - Score e Status */}
                  <div className="text-right ml-6">
                    <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">{pillar.score}</div>

                    <Badge
                      className={`
                        ${styles.bg} ${styles.text} text-sm font-bold px-4 py-2 rounded-full
                        shadow-lg border-0
                      `}
                    >
                      {pillar.status}
                    </Badge>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Impacto: {pillar.impact}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Resumo Estatístico */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-xl">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">1</div>
            <div className="text-sm font-medium text-red-700 dark:text-red-300">Crítico</div>
          </div>
          <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">1</div>
            <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Atenção</div>
          </div>
          <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">4</div>
            <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Bom/Excelente</div>
          </div>
        </div>

        {/* Alerta Crítico - Sono */}
        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">Atenção: Sono em Estado Crítico</h4>
              <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                O pilar <strong>Sono (23% do ISP)</strong> está com score crítico de 45 pontos, impactando negativamente
                todos os outros componentes.
                <strong> Ação imediata recomendada.</strong>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
