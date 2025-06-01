"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, TrendingUp } from "lucide-react"
import { useState } from "react"

export function DepartmentRiskMatrix() {
  const [hoveredDept, setHoveredDept] = useState(null)

  const departments = [
    { name: "Tecnologia", risk: "Alto", impact: "Alto", employees: 45, x: 80, y: 85, trend: "down", riskValue: 72 },
    { name: "Vendas", risk: "Médio", impact: "Alto", employees: 32, x: 50, y: 80, trend: "down", riskValue: 55 },
    { name: "Marketing", risk: "Baixo", impact: "Médio", employees: 28, x: 25, y: 50, trend: "down", riskValue: 25 },
    { name: "RH", risk: "Médio", impact: "Médio", employees: 15, x: 45, y: 55, trend: "down", riskValue: 44 },
    { name: "Financeiro", risk: "Baixo", impact: "Baixo", employees: 22, x: 30, y: 25, trend: "down", riskValue: 20 },
    { name: "Operações", risk: "Alto", impact: "Médio", employees: 38, x: 75, y: 45, trend: "down", riskValue: 65 },
  ]

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Alto":
        return "bg-red-500 hover:bg-red-600"
      case "Médio":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Baixo":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case "Alto":
        return "bg-red-100 text-red-800 border-red-200"
      case "Médio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Baixo":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIndicator = (trend) => {
    if (trend === "down") {
      return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    }
    return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
  }

  return (
    <Card className="ukor-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          Matriz de Risco por Departamento
        </CardTitle>
        <CardDescription>Mapeamento de risco vs impacto organizacional (dados atuais)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 overflow-visible">
          {/* Eixos */}
          <div className="absolute bottom-4 left-4 right-4 h-px bg-gray-300 dark:bg-gray-600"></div>
          <div className="absolute bottom-4 left-4 top-4 w-px bg-gray-300 dark:bg-gray-600"></div>

          {/* Labels dos eixos */}
          <div className="absolute bottom-1 right-1/2 transform translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
            Probabilidade de Risco →
          </div>
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 dark:text-gray-400">
            Impacto Organizacional ↑
          </div>

          {/* Quadrantes */}
          <div className="absolute top-4 left-4 w-1/2 h-1/2 bg-green-50 dark:bg-green-900/20 rounded opacity-30"></div>
          <div className="absolute top-4 right-4 w-1/2 h-1/2 bg-yellow-50 dark:bg-yellow-900/20 rounded opacity-30"></div>
          <div className="absolute bottom-4 left-4 w-1/2 h-1/2 bg-yellow-50 dark:bg-yellow-900/20 rounded opacity-30"></div>
          <div className="absolute bottom-4 right-4 w-1/2 h-1/2 bg-red-50 dark:bg-red-900/20 rounded opacity-30"></div>

          {/* Departamentos */}
          {departments.map((dept, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${4 + (dept.x / 100) * 88}%`,
                bottom: `${4 + (dept.y / 100) * 88}%`,
              }}
              onMouseEnter={() => setHoveredDept(dept)}
              onMouseLeave={() => setHoveredDept(null)}
            >
              <div className="relative">
                <div
                  className={`w-6 h-6 rounded-full ${getRiskColor(dept.risk)} transition-all duration-200 shadow-lg border-3 border-white dark:border-gray-700 cursor-pointer ${
                    hoveredDept?.name === dept.name ? "scale-125 shadow-xl" : ""
                  }`}
                ></div>
                {/* Indicador de tendência */}
                <div className="absolute -top-1 -right-1">{getTrendIndicator(dept.trend)}</div>
              </div>
            </div>
          ))}

          {/* Tooltip fixo no canto */}
          {hoveredDept && (
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-600 p-4 z-30 min-w-[220px]">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${getRiskColor(hoveredDept.risk).split(" ")[0]}`}></div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{hoveredDept.name}</h4>
                {getTrendIndicator(hoveredDept.trend)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{hoveredDept.employees} colaboradores</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUp className="h-4 w-4" />
                  <span>Impacto: {hoveredDept.impact}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Risco atual: {hoveredDept.riskValue}%</span>
                </div>

                <div className="pt-2 flex gap-2">
                  <Badge className={`${getRiskBadgeColor(hoveredDept.risk)} text-xs font-medium`}>
                    Risco {hoveredDept.risk}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {hoveredDept.trend === "down" ? "↓ Melhorando" : "↑ Piorando"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legenda */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Alto Risco</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Médio Risco</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Baixo Risco</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Melhorando</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Users className="h-3 w-3" />
            <span>Total: {departments.reduce((sum, dept) => sum + dept.employees, 0)} colaboradores</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
