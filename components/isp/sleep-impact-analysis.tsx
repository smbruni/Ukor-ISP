"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Moon, Heart, Brain, Apple, Users, TrendingUp, AlertTriangle } from "lucide-react"

export function SleepImpactAnalysis() {
  const sleepScore = 45 // Score atual do sono

  const pillarImpacts = [
    {
      name: "Saúde Mental",
      icon: Brain,
      baseScore: 90,
      impactedScore: 72,
      impact: -20,
      color: "blue",
      description: "Sono ruim aumenta ansiedade e depressão",
    },
    {
      name: "Saúde Física",
      icon: Heart,
      baseScore: 100,
      impactedScore: 85,
      impact: -15,
      color: "red",
      description: "Afeta recuperação muscular e imunidade",
    },
    {
      name: "Saúde Nutricional",
      icon: Apple,
      baseScore: 78,
      impactedScore: 68,
      impact: -10,
      color: "green",
      description: "Influencia escolhas alimentares e metabolismo",
    },
    {
      name: "Engajamento",
      icon: Users,
      baseScore: 88,
      impactedScore: 75,
      impact: -15,
      color: "purple",
      description: "Reduz motivação e conexão com trabalho",
    },
    {
      name: "Produtividade",
      icon: TrendingUp,
      baseScore: 95,
      impactedScore: 78,
      impact: -25,
      color: "orange",
      description: "Maior impacto na concentração e foco",
    },
  ]

  const totalImpact = pillarImpacts.reduce((sum, pillar) => sum + Math.abs(pillar.impact), 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-100">
            <Moon className="h-5 w-5 text-indigo-600" />
          </div>
          Análise de Impacto do Sono
        </CardTitle>
        <CardDescription>
          Como a qualidade do sono (score: {sleepScore}) está afetando os outros pilares do ISP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Alerta Principal */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h4 className="font-semibold text-red-800">Sono Crítico Detectado</h4>
            </div>
            <p className="text-sm text-red-700">
              Score de sono de {sleepScore} está reduzindo o ISP total em aproximadamente {totalImpact} pontos.
              Prioridade máxima para intervenção.
            </p>
          </div>

          {/* Impactos por Pilar */}
          <div className="space-y-4">
            <h4 className="font-semibold">Impacto nos Outros Pilares</h4>
            {pillarImpacts.map((pillar, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${pillar.color}-100`}>
                      <pillar.icon className={`h-4 w-4 text-${pillar.color}-600`} />
                    </div>
                    <div>
                      <h5 className="font-medium">{pillar.name}</h5>
                      <p className="text-xs text-gray-500">{pillar.description}</p>
                    </div>
                  </div>
                  <Badge variant="destructive">{pillar.impact}%</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score sem impacto do sono:</span>
                    <span className="font-semibold text-green-600">{pillar.baseScore}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Score atual (com impacto):</span>
                    <span className="font-semibold text-red-600">{pillar.impactedScore}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">Potencial</div>
                      <Progress value={pillar.baseScore} className="h-2" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">Atual</div>
                      <Progress value={pillar.impactedScore} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Potencial de Melhoria */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">💡 Potencial de Melhoria</h4>
            <p className="text-sm text-green-700 mb-3">
              Melhorando o sono para score 80+, o ISP total poderia aumentar em até {totalImpact} pontos.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center p-2 bg-white rounded">
                <div className="font-semibold text-green-600">+{totalImpact}</div>
                <div className="text-xs text-gray-600">Pontos no ISP</div>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <div className="font-semibold text-green-600">R$ 2.8M</div>
                <div className="text-xs text-gray-600">Savings Anuais</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
