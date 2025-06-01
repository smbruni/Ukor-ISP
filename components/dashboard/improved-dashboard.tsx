"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/molecules/metric-card"
import { LoadingSpinner } from "@/components/atoms/loading-spinner"
import { Heart, Brain, Activity, Users, AlertTriangle, RefreshCw, Download, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LoadingState } from "@/lib/design-system"

export function ImprovedDashboard() {
  const [loadingState, setLoadingState] = useState<LoadingState>("loading")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  // Simular carregamento de dados (Heurística: Visibilidade do status do sistema)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState("success")
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = async () => {
    setLoadingState("loading")
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoadingState("success")
    setLastUpdated(new Date())
  }

  const healthMetrics = [
    {
      title: "Sono",
      value: "45",
      subtitle: "Score médio da empresa",
      trend: { value: "-8%", direction: "down" as const },
      status: "error" as const,
      icon: Brain,
      description: "Pilar central que impacta todos os outros indicadores",
    },
    {
      title: "Saúde Mental",
      value: "65",
      subtitle: "Índice de bem-estar",
      trend: { value: "+2%", direction: "up" as const },
      status: "warning" as const,
      icon: Heart,
      description: "Avaliação de stress e bem-estar psicológico",
    },
    {
      title: "Saúde Física",
      value: "72",
      subtitle: "Atividade e exames",
      trend: { value: "+3%", direction: "up" as const },
      status: "success" as const,
      icon: Activity,
      description: "Baseado em atividade física e resultados de exames",
    },
    {
      title: "Engajamento",
      value: "1,247",
      subtitle: "Usuários ativos",
      trend: { value: "+12%", direction: "up" as const },
      status: "success" as const,
      icon: Users,
      description: "Colaboradores engajados com o programa",
    },
  ]

  const criticalAlerts = [
    {
      id: 1,
      title: "Sono Crítico - TI",
      description: "23 colaboradores com menos de 5h de sono",
      severity: "high",
      timestamp: "2 min atrás",
    },
    {
      id: 2,
      title: "Estresse Elevado - Vendas",
      description: "Pico de estresse detectado em 15 colaboradores",
      severity: "medium",
      timestamp: "8 min atrás",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header com breadcrumb e ações (Heurística: Controle do usuário) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="text-sm text-muted-foreground mb-2">
            <span>Dashboard</span> / <span className="text-foreground">Visão Geral</span>
          </nav>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Executivo</h1>
          <p className="text-muted-foreground mt-1">Última atualização: {lastUpdated.toLocaleTimeString("pt-BR")}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loadingState === "loading"}
            className="gap-2"
          >
            <RefreshCw className={cn("h-4 w-4", loadingState === "loading" && "animate-spin")} />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Filtros de tempo (Heurística: Flexibilidade e eficiência) */}
      <div className="flex gap-2">
        {["24h", "7d", "30d", "90d"].map((range) => (
          <Button
            key={range}
            variant={selectedTimeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Alertas críticos (Heurística: Prevenção de erros) */}
      {criticalAlerts.length > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Alertas Críticos ({criticalAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-red-900 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-red-900 dark:text-red-100">{alert.title}</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">{alert.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                      {alert.severity === "high" ? "Alto" : "Médio"}
                    </Badge>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Métricas principais (Atomic Design + Nielsen) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            trend={metric.trend}
            status={metric.status}
            icon={metric.icon}
            loadingState={loadingState}
            onClick={() => {
              // Navegação contextual (Heurística: Correspondência entre sistema e mundo real)
              console.log(`Navegando para detalhes de ${metric.title}`)
            }}
            className="transform transition-all duration-200 hover:scale-[1.02]"
          />
        ))}
      </div>

      {/* Tabs com conteúdo detalhado (Heurística: Reconhecimento vs. Recall) */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="departments">Departamentos</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Executivo</CardTitle>
              <CardDescription>Principais insights e recomendações baseadas nos dados atuais</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingState === "loading" ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                      🎯 Foco Prioritário: Qualidade do Sono
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      O sono é o pilar central que está impactando negativamente todos os outros indicadores.
                      Recomendamos implementar um programa específico de higiene do sono.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">72%</div>
                      <p className="text-sm text-green-700 dark:text-green-300">Saúde Física</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Acima da meta</p>
                    </div>

                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">65%</div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Saúde Mental</p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">Atenção necessária</p>
                    </div>

                    <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">45%</div>
                      <p className="text-sm text-red-700 dark:text-red-300">Qualidade do Sono</p>
                      <p className="text-xs text-red-600 dark:text-red-400">Crítico</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Departamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Análise detalhada por área da empresa...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Evolução temporal dos indicadores...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Relatórios executivos e detalhados...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
