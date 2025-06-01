"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictiveAnalytics } from "@/components/predictive-analytics"
import { SleepBiomarkersDashboard } from "@/components/biomarkers/sleep-biomarkers-dashboard"

export function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Análises Preditivas</h1>
        <p className="text-muted-foreground">
          Modelos de IA para previsão de sinistralidade, burnout, custos e impacto do sono
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="sleep">Análise do Sono</TabsTrigger>
          <TabsTrigger value="detailed">Análise Detalhada</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6">
            <PredictiveAnalytics />
          </div>
        </TabsContent>

        <TabsContent value="sleep">
          <div className="grid grid-cols-1 gap-6">
            <SleepBiomarkersDashboard />
          </div>
        </TabsContent>

        <TabsContent value="detailed">
          <div className="grid grid-cols-1 gap-6">
            <PredictiveAnalytics />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
