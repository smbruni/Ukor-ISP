"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield } from "lucide-react"

export function RiskMatrix() {
  return (
    <Card className="ukor-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          Matriz de Risco
        </CardTitle>
        <CardDescription className="text-gray-600">Mapeamento de riscos por departamento e colaborador</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
          <div className="text-center z-10">
            <div className="p-3 rounded-full bg-white shadow-lg mb-3 mx-auto w-fit">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-gray-600 mb-2 font-medium">Matriz de Risco Interativa</p>
            <Badge className="bg-red-50 text-red-700 border-red-200">Atualização automática</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
