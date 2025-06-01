"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, ArrowUp, Users, Briefcase, Brain, Activity, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DepartmentPerformance() {
  const departments = [
    {
      name: "Tecnologia",
      employees: 45,
      metrics: {
        isp: { value: 68, trend: -5, status: "Atenção" },
        productivity: { value: 82, trend: 3, status: "Bom" },
        engagement: { value: 75, trend: -2, status: "Bom" },
        burnout: { value: 32, trend: 8, status: "Crítico" },
      },
    },
    {
      name: "Vendas",
      employees: 32,
      metrics: {
        isp: { value: 72, trend: 4, status: "Bom" },
        productivity: { value: 88, trend: 6, status: "Excelente" },
        engagement: { value: 79, trend: 5, status: "Bom" },
        burnout: { value: 18, trend: -4, status: "Bom" },
      },
    },
    {
      name: "Marketing",
      employees: 28,
      metrics: {
        isp: { value: 75, trend: 2, status: "Bom" },
        productivity: { value: 80, trend: 1, status: "Bom" },
        engagement: { value: 85, trend: 7, status: "Excelente" },
        burnout: { value: 15, trend: -6, status: "Excelente" },
      },
    },
    {
      name: "RH",
      employees: 15,
      metrics: {
        isp: { value: 82, trend: 8, status: "Excelente" },
        productivity: { value: 78, trend: 3, status: "Bom" },
        engagement: { value: 88, trend: 5, status: "Excelente" },
        burnout: { value: 12, trend: -8, status: "Excelente" },
      },
    },
    {
      name: "Financeiro",
      employees: 22,
      metrics: {
        isp: { value: 70, trend: -2, status: "Bom" },
        productivity: { value: 85, trend: 4, status: "Excelente" },
        engagement: { value: 72, trend: -3, status: "Bom" },
        burnout: { value: 25, trend: 5, status: "Atenção" },
      },
    },
    {
      name: "Operações",
      employees: 38,
      metrics: {
        isp: { value: 62, trend: -7, status: "Atenção" },
        productivity: { value: 70, trend: -5, status: "Bom" },
        engagement: { value: 65, trend: -8, status: "Atenção" },
        burnout: { value: 35, trend: 12, status: "Crítico" },
      },
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Crítico":
        return "bg-red-500 text-white"
      case "Atenção":
        return "bg-yellow-500 text-black"
      case "Bom":
        return "bg-green-500 text-white"
      case "Excelente":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getProgressColor = (status) => {
    switch (status) {
      case "Crítico":
        return "bg-red-500"
      case "Atenção":
        return "bg-yellow-500"
      case "Bom":
        return "bg-green-500"
      case "Excelente":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTrendIcon = (trend) => {
    return trend >= 0 ? (
      <ArrowUp className={`h-4 w-4 ${trend >= 0 ? "text-green-500" : "text-red-500"}`} />
    ) : (
      <ArrowDown className={`h-4 w-4 ${trend >= 0 ? "text-green-500" : "text-red-500"}`} />
    )
  }

  const getTrendClass = (trend, metric) => {
    // Para burnout, tendência negativa é boa
    if (metric === "burnout") {
      return trend < 0 ? "text-green-500" : "text-red-500"
    }
    // Para outros, tendência positiva é boa
    return trend >= 0 ? "text-green-500" : "text-red-500"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Performance por Departamento
        </CardTitle>
        <CardDescription>Análise comparativa de métricas por departamento</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="isp" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="isp" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">ISP</span>
            </TabsTrigger>
            <TabsTrigger value="productivity" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Produtividade</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Engajamento</span>
            </TabsTrigger>
            <TabsTrigger value="burnout" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Burnout</span>
            </TabsTrigger>
          </TabsList>

          {["isp", "productivity", "engagement", "burnout"].map((metricKey) => (
            <TabsContent key={metricKey} value={metricKey} className="mt-4">
              <div className="space-y-4">
                {departments.map((dept, index) => {
                  const metric = dept.metrics[metricKey]
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32 font-medium truncate">{dept.name}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{metric.value}</span>
                            <div className={`flex items-center ${getTrendClass(metric.trend, metricKey)}`}>
                              {getTrendIcon(metric.trend)}
                              <span className="text-xs">{Math.abs(metric.trend)}%</span>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(metric.status)}`}>{metric.status}</Badge>
                        </div>
                        <Progress
                          value={metric.value}
                          max={100}
                          className="h-2"
                          indicatorClassName={getProgressColor(metric.status)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{departments.length}</span> departamentos analisados
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Crítico</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Atenção</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Bom</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Excelente</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
