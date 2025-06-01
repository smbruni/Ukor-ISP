"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp } from "lucide-react"

export function ROIChart() {
  return (
    <Card className="ukor-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          ROI em Saúde
        </CardTitle>
        <CardDescription className="text-gray-600">Retorno sobre investimento em programas de saúde</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5"></div>
          <div className="text-center z-10">
            <div className="p-3 rounded-full bg-white shadow-lg mb-3 mx-auto w-fit">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            </div>
            <p className="text-gray-600 mb-2 font-medium">Gráfico de ROI</p>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Projeção 12 meses</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
