"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SinistralityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Sinistralidade</CardTitle>
        <CardDescription>Previsão de sinistralidade baseada em dados históricos e fatores de risco</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Gráfico Preditivo de Sinistralidade</p>
            <Badge variant="outline">Confiança: 94%</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
