"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download } from 'lucide-react'
import { SinistralityChart } from "@/components/sinistralidade-chart"
import { BurnoutPrediction } from "@/components/burnout-prediction"
import { CostProjection } from "@/components/cost-projection"
import { FinancialHealthAnalytics } from "@/components/financial-health-analytics"

export function PredictiveAnalytics() {
  const predictions = [
    {
      metric: "Sinistralidade",
      current: 68,
      predicted: 52,
      confidence: 94,
      timeframe: "6 meses",
      impact: "Alto",
      description: "Redução de 16 pontos percentuais na sinistralidade",
      financialImpact: "R$ 480K economia anual"
    },
    {
      metric: "Burnout",
      current: 23,
      predicted: 15,
      confidence: 87,
      timeframe: "3 meses",
      impact: "Médio",
      description: "Redução de 8 pontos percentuais no risco de burnout",
      financialImpact: "R$ 320K economia em turnover"
    },
    {
      metric: "Custos Saúde",
      current: 100,
      predicted: 78,
      confidence: 91,
      timeframe: "12 meses",
      impact: "Alto",
      description: "22% de redução nos custos totais com saúde",
      financialImpact: "R$ 1.4M economia + R$ 2.7M ganho produtividade"
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Análises Preditivas</h2>
          <p className="text-muted-foreground">Modelos de IA para previsão de sinistralidade, burnout e custos</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Resumo das Previsões */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictions.map((pred, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{pred.metric}</CardTitle>
              <CardDescription>Previsão para {pred.timeframe}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Atual</span>
                  <span className="font-semibold">{pred.current}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Previsto</span>
                  <span className="font-semibold text-green-600">{pred.predicted}%</span>
                </div>
                <Progress value={pred.confidence} className="h-2" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Confiança: {pred.confidence}%</span>
                  <Badge variant={pred.impact === "Alto" ? "destructive" : "secondary"}>{pred.impact}</Badge>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">{pred.description}</p>
                  <p className="text-sm font-semibold text-green-600">{pred.financialImpact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Análises Detalhadas */}
      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">Análise Financeira</TabsTrigger>
          <TabsTrigger value="sinistralidade">Sinistralidade</TabsTrigger>
          <TabsTrigger value="burnout">Burnout</TabsTrigger>
          <TabsTrigger value="custos">Projeção de Custos</TabsTrigger>
          <TabsTrigger value="roi">ROI Preditivo</TabsTrigger>
        </TabsList>

        <TabsContent value="financial">
          <FinancialHealthAnalytics />
        </TabsContent>

        <TabsContent value="sinistralidade">
          <SinistralityChart />
        </TabsContent>

        <TabsContent value="burnout">
          <BurnoutPrediction />
        </TabsContent>

        <TabsContent value="custos">
          <CostProjection />
        </TabsContent>

        <TabsContent value="roi">
          <Card>
            <CardHeader>
              <CardTitle>ROI Preditivo de Investimentos em Saúde</CardTitle>
              <CardDescription>Análise de retorno sobre investimento para diferentes estratégias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Programa de Wellness</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Investimento:</span>
                        <span className="font-medium">R$ 500K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ROI Previsto:</span>
                        <span className="font-medium text-green-600">320%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Payback:</span>
                        <span className="font-medium">8 meses</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Saúde Mental</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Investimento:</span>
                        <span className="font-medium">R$ 300K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ROI Previsto:</span>
                        <span className="font-medium text-green-600">450%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Payback:</span>
                        <span className="font-medium">6 meses</span>
                      </div>
                    </div>
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
