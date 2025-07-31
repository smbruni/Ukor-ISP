"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Database, Activity, AlertCircle, CheckCircle, Clock, Download, RefreshCw, FileText } from "lucide-react"

export function DataContent() {
  const dataSources = [
    {
      name: "Unimed-BH API",
      status: "online",
      lastSync: "2 min atrás",
      records: "1.2M",
      quality: 98,
    },
    {
      name: "Sistema RH",
      status: "online",
      lastSync: "5 min atrás",
      records: "45K",
      quality: 95,
    },
    {
      name: "Plataforma Wellness",
      status: "warning",
      lastSync: "1h atrás",
      records: "230K",
      quality: 87,
    },
    {
      name: "Telemedicina",
      status: "online",
      lastSync: "1 min atrás",
      records: "89K",
      quality: 99,
    },
    {
      name: "Check-ups",
      status: "offline",
      lastSync: "3h atrás",
      records: "156K",
      quality: 92,
    },
  ]

  const qualityMetrics = [
    { metric: "Completude", value: 94, target: 95, status: "warning" },
    { metric: "Consistência", value: 98, target: 95, status: "good" },
    { metric: "Precisão", value: 96, target: 90, status: "good" },
    { metric: "Atualidade", value: 89, target: 85, status: "good" },
  ]

  const reports = [
    {
      name: "Relatório Executivo Mensal",
      type: "PDF",
      size: "2.3 MB",
      generated: "Hoje, 08:30",
      status: "ready",
    },
    {
      name: "Análise de Sinistralidade",
      type: "Excel",
      size: "5.1 MB",
      generated: "Ontem, 18:45",
      status: "ready",
    },
    {
      name: "Dashboard Interativo",
      type: "HTML",
      size: "890 KB",
      generated: "Hoje, 09:15",
      status: "processing",
    },
    {
      name: "Dados Brutos - Q4",
      type: "CSV",
      size: "45.2 MB",
      generated: "2 dias atrás",
      status: "ready",
    },
  ]

  const exportOptions = [
    {
      name: "Dados Completos",
      description: "Todos os dados disponíveis",
      format: "CSV/Excel",
      size: "~120 MB",
    },
    {
      name: "Relatório Executivo",
      description: "Resumo executivo com KPIs",
      format: "PDF",
      size: "~2 MB",
    },
    {
      name: "Dashboard Personalizado",
      description: "Visualizações interativas",
      format: "HTML",
      size: "~1 MB",
    },
    {
      name: "API Endpoints",
      description: "Acesso programático aos dados",
      format: "JSON",
      size: "Variável",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "offline":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getQualityColor = (value: number, target: number) => {
    if (value >= target) return "text-green-600"
    if (value >= target - 5) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Dados</h1>
          <p className="text-gray-600">Monitoramento e controle de qualidade dos dados de saúde</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Última atualização: há 2 min
          </Badge>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sincronizar
          </Button>
        </div>
      </div>

      {/* Data Sources Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Status das Fontes de Dados
          </CardTitle>
          <CardDescription>Monitoramento em tempo real das conexões e sincronizações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(source.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{source.name}</h3>
                    <p className="text-sm text-gray-600">Última sincronização: {source.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Registros</p>
                    <p className="font-semibold">{source.records}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Qualidade</p>
                    <p className={`font-semibold ${getQualityColor(source.quality, 90)}`}>{source.quality}%</p>
                  </div>
                  <Badge className={getStatusColor(source.status)}>
                    {source.status === "online" ? "Online" : source.status === "warning" ? "Atenção" : "Offline"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="quality" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quality">Qualidade</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="export">Exportar</TabsTrigger>
        </TabsList>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Qualidade dos Dados</CardTitle>
              <CardDescription>Indicadores de qualidade e integridade dos dados coletados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{metric.metric}</span>
                      <span className={`font-bold ${getQualityColor(metric.value, metric.target)}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Meta: {metric.target}%</span>
                      <span
                        className={
                          metric.value >= metric.target
                            ? "text-green-600"
                            : metric.value >= metric.target - 5
                              ? "text-yellow-600"
                              : "text-red-600"
                        }
                      >
                        {metric.value >= metric.target ? "✓ Atingida" : "⚠ Abaixo da meta"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Registros</p>
                    <p className="text-2xl font-bold text-gray-900">2.1M</p>
                  </div>
                  <Database className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center text-sm">
                    <Activity className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">+12% este mês</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Processados Hoje</p>
                    <p className="text-2xl font-bold text-gray-900">45.2K</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-blue-600">{"< 24h"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Erro</p>
                    <p className="text-2xl font-bold text-gray-900">0.3%</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">-0.2% vs mês anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">99.8%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center text-sm">
                    <Activity className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">Excelente</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Relatórios Disponíveis
              </CardTitle>
              <CardDescription>Relatórios gerados automaticamente e sob demanda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{report.name}</h3>
                        <p className="text-sm text-gray-600">
                          {report.type} • {report.size} • Gerado: {report.generated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          report.status === "ready" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {report.status === "ready" ? "Pronto" : "Processando"}
                      </Badge>
                      {report.status === "ready" && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Baixar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-green-500" />
                Exportar Dados
              </CardTitle>
              <CardDescription>Diferentes opções de exportação para análises externas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exportOptions.map((option, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{option.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      </div>
                      <Badge variant="outline">{option.format}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Tamanho: {option.size}</span>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
