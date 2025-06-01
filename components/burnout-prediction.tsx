"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BurnoutPrediction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predição de Burnout</CardTitle>
        <CardDescription>Modelo de IA para identificação precoce de risco de burnout</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Modelo Preditivo de Burnout</p>
            <Badge variant="outline">Precisão: 87%</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
