"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Users, Heart, Brain, ArrowRight, AlertCircle } from "lucide-react"

export function ExecutiveKPIs() {
  const kpis = [
    {
      title: "ROI em Saúde",
      value: "R$ 2.4M",
      change: "+18.2%",
      trend: "up",
      target: "R$ 3.0M",
      progress: 80,
      icon: DollarSign,
      color: "emerald",
      description: "Economia anual projetada",
      action: "Ver detalhes",
      priority: "high",
    },
    {
      title: "Sinistralidade",
      value: "68%",
      change: "-12.5%",
      trend: "down",
      target: "55%",
      progress: 65,
      icon: Heart,
      color: "blue",
      description: "Redução vs. ano anterior",
      action: "Analisar",
      priority: "medium",
    },
    {
      title: "Risco de Burnout",
      value: "23%",
      change: "+3.1%",
      trend: "up",
      target: "15%",
      progress: 35,
      icon: Brain,
      color: "red",
      description: "Colaboradores em risco",
      action: "Ação urgente",
      priority: "critical",
    },
    {
      title: "Engajamento",
      value: "76%",
      change: "+5.2%",
      trend: "up",
      target: "85%",
      progress: 89,
      icon: Users,
      color: "purple",
      description: "Índice de satisfação",
      action: "Manter foco",
      priority: "medium",
    },
  ]

  const getColorClasses = (color: string, priority: string) => {
    const colors = {
      emerald: "from-emerald-500 to-emerald-600 text-white",
      blue: "from-blue-500 to-blue-600 text-white",
      red: "from-red-500 to-red-600 text-white",
      purple: "from-purple-500 to-purple-600 text-white",
    }

    const borders = {
      critical: "border-red-500 shadow-red-500/20",
      high: "border-emerald-500 shadow-emerald-500/20",
      medium: "border-blue-500 shadow-blue-500/20",
    }

    return {
      gradient: colors[color] || colors.blue,
      border: borders[priority] || borders.medium,
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown
        const trendColor =
          kpi.trend === "up"
            ? kpi.title === "Risco de Burnout"
              ? "text-red-600"
              : "text-emerald-600"
            : kpi.title === "Sinistralidade"
              ? "text-emerald-600"
              : "text-red-600"

        const { gradient, border } = getColorClasses(kpi.color, kpi.priority)

        return (
          <Card
            key={index}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 ${border}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">{kpi.title}</CardTitle>
                {kpi.priority === "critical" && <AlertCircle className="h-4 w-4 text-red-500" />}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Valor Principal */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{kpi.description}</div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Tendência */}
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-1 ${trendColor} font-medium`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="text-sm">{kpi.change}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Meta: {kpi.target}</div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <Progress
                  value={kpi.progress}
                  className="h-2"
                  indicatorClassName={
                    kpi.priority === "critical"
                      ? "bg-red-500"
                      : kpi.priority === "high"
                        ? "bg-emerald-500"
                        : "bg-blue-500"
                  }
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Progresso</span>
                  <span>{kpi.progress}%</span>
                </div>
              </div>

              {/* Ação */}
              <Button
                variant={kpi.priority === "critical" ? "destructive" : "outline"}
                size="sm"
                className="w-full group"
              >
                {kpi.action}
                <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
