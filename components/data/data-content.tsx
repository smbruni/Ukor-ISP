"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, FileText, Download, Upload, RefreshCw, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function DataContent() {
  const dataSources = [
    {
      name: "Unimed-BH",
      type: "Plano de Saúde",
      status: "connected",
      lastSync: "2 min atrás",
      records: "2.847.392",
      quality: 98,
    },
    {
      name: "Sistema RH",
      type: "Recursos Humanos",
      status: "connected",
      lastSync: "5 min atrás",
      records: "1.247",
      quality: 95,
    },
    {
      name: "Folha de Pagamento",
      type: "Financeiro",
      status: "warning",
      lastSync: "2 horas atrás",
      records: "1.247",
      quality: 87,
    },
    {
      name: "Sistema de Ponto",
      type: "Presença",
      status: "connected",
      lastSync: "1 min atrás",
      records: "45.892",
      quality: 99,
    },
    {
      name: "Pesquisas Internas",
      type: "Engajamento",
      status: "error",
      lastSync: "1 dia atrás",
      records: "892",
      quality: 72,
    },
  ]

  const dataMetrics = [
    {
      title: "Total de Registros",
      value: "2.9M",
      change: "+12%",
      trend: "up",
      icon: Database,
    },
    {
      title: "Qualidade Média",
      value: "91%",
      change: "+3%",
      trend: "up",
      icon: CheckCircle,
    },
    {
      title: "Fontes Ativas",
      value: "5",
      change: "0",
      trend: "stable",
      icon: RefreshCw,
    },
    {
      title: "Última Sincronização",
      value: "1 min",
      change: "-30s",
      trend: "up",
      icon: Clock,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Dados</h1>
          <p className="text-gray-600">Monitoramento e integração das fontes de dados de saúde</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            5 Fontes Ativas
          </Badge>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Importar Dados
          </Button>
        </div>
      </div>

      {/* Data Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-100">
                  <metric.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div
                  className={`flex items-center space-x-1 ${
                    metric.trend === "up"
                      ? "text-green-600"
                      : metric.trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Fontes de Dados Integradas
          </CardTitle>
          <CardDescription>Status em tempo real das conexões e qualidade dos dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(source.status)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{source.name}</h4>
                    <p className="text-sm text-gray-600">{source.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{source.records}</p>
                    <p className="text-xs text-gray-500">registros</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{source.quality}%</p>
                    <p className="text-xs text-gray-500">qualidade</p>
                    <Progress value={source.quality} className="w-16 h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">{source.lastSync}</p>
                    <Badge className={getStatusColor(source.status)} variant="outline">
                      {source.status === "connected" ? "Conectado" : source.status === "warning" ? "Atenção" : "Erro"}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Quality and Reports */}
      <Tabs defaultValue="quality" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quality">Qualidade dos Dados</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="exports">Exportações</TabsTrigger>
        </TabsList>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Qualidade dos Dados</CardTitle>
              <CardDescription>Métricas de integridade, consistência e completude</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Dados Completos</h4>
                    <p className="text-2xl font-bold text-green-700">94.2%</p>
                    <p className="text-sm text-green-600">Campos obrigatórios preenchidos</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Consistência</h4>
                    <p className="text-2xl font-bold text-blue-700">91.8%</p>
                    <p className="text-sm text-blue-600">Dados sem conflitos</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Atualização</h4>
                    <p className="text-2xl font-bold text-yellow-700">87.5%</p>
                    <p className="text-sm text-gray-600">Dados atualizados {"(< 24h)"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Problemas Identificados</h4>
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-l-red-500 bg-red-50 rounded-lg">
                      <h5 className="font-medium text-red-800">Dados Duplicados</h5>
                      <p className="text-sm text-red-600">
                        156 registros duplicados encontrados na base de colaboradores
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-l-yellow-500 bg-yellow-50 rounded-lg">
                      <h5 className="font-medium text-yellow-800">Campos Incompletos</h5>
                      <p className="text-sm text-yellow-600">23% dos registros de saúde sem data de nascimento</p>
                    </div>
                    <div className="p-3 border-l-4 border-l-blue-500 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-800">Sincronização Atrasada</h5>
                      <p className="text-sm text-blue-600">Sistema de pesquisas com 1 dia de atraso</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>Relatórios pré-configurados para análise de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Relatório de Sinistralidade",
                    description: "Análise completa dos custos médicos por departamento",
                    lastGenerated: "Hoje, 09:30",
                    format: "PDF",
                  },
                  {
                    name: "Dashboard Executivo",
                    description: "KPIs principais para tomada de decisão da liderança",
                    lastGenerated: "Hoje, 08:00",
                    format: "Excel",
                  },
                  {
                    name: "Análise de Absenteísmo",
                    description: "Padrões de ausências correlacionados com saúde",
                    lastGenerated: "Ontem, 17:45",
                    format: "PDF",
                  },
                  {
                    name: "Relatório de Bem-estar",
                    description: "Métricas de efetividade dos programas de saúde",
                    lastGenerated: "Ontem, 16:20",
                    format: "Excel",
                  },
                ].map((report, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{report.name}</h4>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Último: {report.lastGenerated}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports">
          <Card>
            <CardHeader>
              <CardTitle>Exportações de Dados</CardTitle>
              <CardDescription>Histórico e configuração de exportações personalizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Nova Exportação</h4>
                    <p className="text-sm text-gray-600">Configure uma nova exportação personalizada de dados</p>
                  </div>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Exportações Recentes</h4>
                  {[
                    {
                      name: "Dados Completos - Q1 2024",
                      date: "15/04/2024",
                      size: "2.3 GB",
                      status: "Concluído",
                    },
                    {
                      name: "Relatório Mensal - Março",
                      date: "01/04/2024",
                      size: "45 MB",
                      status: "Concluído",
                    },
                    {
                      name: "Análise Preditiva - Dados Históricos",
                      date: "28/03/2024",
                      size: "156 MB",
                      status: "Processando",
                    },
                  ].map((exportItem, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">{exportItem.name}</h5>
                        <p className="text-sm text-gray-600">
                          {exportItem.date} • {exportItem.size}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={exportItem.status === "Concluído" ? "default" : "secondary"}
                          className={exportItem.status === "Concluído" ? "bg-green-100 text-green-800" : ""}
                        >
                          {exportItem.status}
                        </Badge>
                        {exportItem.status === "Concluído" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
