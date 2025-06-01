"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp } from "lucide-react"

export function HealthMetricsChart() {
  return (
    <Card className="ukor-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <div className="p-2 rounded-lg bg-gradient-to-r from-ukor-primary to-ukor-accent">
            <Activity className="h-4 w-4 text-white" />
          </div>
          Métricas de Saúde
        </CardTitle>
        <CardDescription className="text-gray-600">Evolução dos indicadores de saúde dos colaboradores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gradient-to-br from-ukor-light to-white rounded-xl border border-ukor-primary/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ukor-primary/5 to-ukor-accent/5"></div>
          <div className="text-center z-10">
            <div className="p-3 rounded-full bg-white shadow-ukor mb-3 mx-auto w-fit">
              <TrendingUp className="h-6 w-6 text-ukor-primary" />
            </div>
            <p className="text-gray-600 mb-2 font-medium">Gráfico de Métricas de Saúde</p>
            <Badge className="ukor-badge">Dados em tempo real</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
