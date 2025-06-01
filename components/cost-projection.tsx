"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CostProjection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projeção de Custos</CardTitle>
        <CardDescription>Previsão de custos com saúde e potencial economia com intervenções</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Projeção de Custos e Economia</p>
            <Badge variant="outline">Horizonte: 24 meses</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
