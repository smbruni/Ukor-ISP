"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Watch,
  Activity,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Wifi,
  Database,
  Shield,
  RefreshCw,
} from "lucide-react"
import { WearablesAnalytics } from "@/components/wearables/wearables-analytics"

export function WearablesIntegration() {
  const [connectedDevices, setConnectedDevices] = useState({
    garmin: true,
    whoop: true,
    appleHealth: true,
    googleFit: false,
    samsungHealth: true,
    fitbit: true,
    polar: false,
  })

  const [syncStatus, setSyncStatus] = useState({
    garmin: "syncing",
    whoop: "connected",
    appleHealth: "connected",
    googleFit: "disconnected",
    samsungHealth: "error",
    fitbit: "connected",
    polar: "disconnected",
  })

  const wearableProviders = [
    {
      id: "garmin",
      name: "Garmin Connect",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Relógios e dispositivos Garmin",
      metrics: ["Passos", "Sono", "FC", "Estresse", "VO2 Max", "Body Battery"],
      users: 234,
      status: "Conectado",
      color: "blue",
      apiVersion: "v2.1",
      dataFrequency: "Tempo Real",
      lastSync: "2 min atrás",
      dataPoints: 45892,
    },
    {
      id: "whoop",
      name: "WHOOP 4.0",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Pulseira de recuperação WHOOP",
      metrics: ["Sono", "FC", "HRV", "Recuperação", "Strain", "Calorias"],
      users: 89,
      status: "Conectado",
      color: "green",
      apiVersion: "v1.3",
      dataFrequency: "Tempo Real",
      lastSync: "1 min atrás",
      dataPoints: 23456,
    },
    {
      id: "appleHealth",
      name: "Apple Health",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Apple Watch e iPhone Health",
      metrics: ["Passos", "Sono", "FC", "Exercícios", "Mindfulness", "SpO2"],
      users: 198,
      status: "Conectado",
      color: "gray",
      apiVersion: "HealthKit",
      dataFrequency: "15 min",
      lastSync: "5 min atrás",
      dataPoints: 67234,
    },
    {
      id: "googleFit",
      name: "Google Fit",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Google Fit e Wear OS",
      metrics: ["Passos", "Atividade", "FC", "Peso", "Distância"],
      users: 67,
      status: "Disponível",
      color: "red",
      apiVersion: "v1",
      dataFrequency: "30 min",
      lastSync: "Nunca",
      dataPoints: 0,
    },
    {
      id: "samsungHealth",
      name: "Samsung Health",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Samsung Galaxy Watch e Health",
      metrics: ["Passos", "Sono", "FC", "Estresse", "SpO2", "Pressão"],
      users: 78,
      status: "Erro",
      color: "blue",
      apiVersion: "v6.0",
      dataFrequency: "20 min",
      lastSync: "2h atrás",
      dataPoints: 12890,
    },
    {
      id: "fitbit",
      name: "Fitbit",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Dispositivos Fitbit",
      metrics: ["Passos", "Sono", "FC", "Exercícios", "Zona Ativa", "Minutos Ativos"],
      users: 156,
      status: "Conectado",
      color: "green",
      apiVersion: "v1.2",
      dataFrequency: "15 min",
      lastSync: "3 min atrás",
      dataPoints: 34567,
    },
    {
      id: "polar",
      name: "Polar Flow",
      logo: "/placeholder.svg?height=40&width=40",
      description: "Relógios esportivos Polar",
      metrics: ["FC", "Treino", "Recuperação", "Sono", "Carga de Treino"],
      users: 25,
      status: "Disponível",
      color: "orange",
      apiVersion: "v3",
      dataFrequency: "Pós-treino",
      lastSync: "Nunca",
      dataPoints: 0,
    },
  ]

  const metricsMapping = [
    {
      wearableMetric: "Número de Passos",
      ispPillar: "Saúde Física",
      weight: "20%",
      calculation: "Média diária de passos → Score de atividade física",
      target: "≥ 8.000 passos/dia",
      impact: "Alto",
      description: "Indicador direto de sedentarismo vs atividade física",
      formula: "Score = min(100, (passos_diarios / 10000) * 100)",
    },
    {
      wearableMetric: "Duração do Sono",
      ispPillar: "Qualidade do Sono",
      weight: "23%",
      calculation: "Duração + Eficiência → Score de sono",
      target: "7-9h por noite",
      impact: "Muito Alto",
      description: "Maior peso no ISP - fundamental para recuperação",
      formula: "Score = (duracao_sono / 8) * eficiencia_sono * 100",
    },
    {
      wearableMetric: "Fases do Sono",
      ispPillar: "Qualidade do Sono",
      weight: "23%",
      calculation: "% Sono Profundo + REM → Qualidade do sono",
      target: "20% Profundo, 25% REM",
      impact: "Muito Alto",
      description: "Qualidade da recuperação noturna",
      formula: "Score = (sono_profundo * 0.4 + sono_rem * 0.6) * 100",
    },
    {
      wearableMetric: "FC em Repouso",
      ispPillar: "Saúde Física",
      weight: "20%",
      calculation: "FC Repouso → Condicionamento cardiovascular",
      target: "50-70 bpm",
      impact: "Alto",
      description: "Indicador de fitness cardiovascular",
      formula: "Score = max(0, 100 - ((fc_repouso - 50) * 2))",
    },
    {
      wearableMetric: "Minutos Ativos",
      ispPillar: "Saúde Física",
      weight: "20%",
      calculation: "Zonas de FC → Intensidade de exercícios",
      target: "150+ min/semana zona moderada",
      impact: "Alto",
      description: "Nível de atividade física regular",
      formula: "Score = min(100, (minutos_ativos_semana / 150) * 100)",
    },
    {
      wearableMetric: "Variabilidade FC (HRV)",
      ispPillar: "Gestão de Estresse",
      weight: "15%",
      calculation: "HRV → Score de recuperação e estresse",
      target: "Baseline individual + 10%",
      impact: "Médio",
      description: "Indicador de estresse e recuperação",
      formula: "Score = (hrv_atual / hrv_baseline) * 100",
    },
    {
      wearableMetric: "Nível de Estresse",
      ispPillar: "Gestão de Estresse",
      weight: "15%",
      calculation: "Score de estresse → Capacidade de gestão",
      target: "< 30 (escala 0-100)",
      impact: "Médio",
      description: "Medição direta do nível de estresse",
      formula: "Score = max(0, 100 - nivel_estresse)",
    },
    {
      wearableMetric: "Calorias Queimadas",
      ispPillar: "Saúde Nutricional",
      weight: "16%",
      calculation: "Gasto energético → Metabolismo ativo",
      target: "Meta individual baseada em TMB",
      impact: "Médio",
      description: "Indicador de metabolismo e atividade",
      formula: "Score = min(100, (calorias_queimadas / meta_calorias) * 100)",
    },
  ]

  const realTimeData = {
    totalConnected: 847,
    activeNow: 623,
    dataPointsToday: 156789,
    syncErrors: 12,
    avgLatency: "2.3s",
    uptime: "99.7%",
  }

  const toggleConnection = (deviceId) => {
    setConnectedDevices((prev) => ({
      ...prev,
      [deviceId]: !prev[deviceId],
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Conectado":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300"
      case "Disponível":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300"
      case "Erro":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getSyncStatusIcon = (status) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Integração com Wearables</h2>
        <p className="text-muted-foreground">
          Conecte dispositivos vestíveis para enriquecer os dados de saúde e performance
        </p>
      </div>

      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="mapping">Mapeamento ISP</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="realtime">Tempo Real</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="devices">
          <div className="space-y-6">
            {/* Status Geral */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-ukor-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{realTimeData.totalConnected}</div>
                  <div className="text-sm text-muted-foreground">Usuários Conectados</div>
                </CardContent>
              </Card>
              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{realTimeData.activeNow}</div>
                  <div className="text-sm text-muted-foreground">Ativos Agora</div>
                </CardContent>
              </Card>
              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Database className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">
                    {(realTimeData.dataPointsToday / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Dados Hoje</div>
                </CardContent>
              </Card>
              <Card className="ukor-card">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{realTimeData.uptime}</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Dispositivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wearableProviders.map((provider) => (
                <Card key={provider.id} className="ukor-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <Watch className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{provider.name}</CardTitle>
                          <CardDescription className="text-sm">{provider.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSyncStatusIcon(syncStatus[provider.id])}
                        <Badge className={getStatusColor(provider.status)}>{provider.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Métricas Disponíveis */}
                      <div>
                        <Label className="text-sm font-medium text-foreground">Métricas Disponíveis:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {provider.metrics.map((metric, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Estatísticas */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Usuários:</span>
                          <span className="ml-2 font-semibold text-foreground">{provider.users}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">API:</span>
                          <span className="ml-2 font-semibold text-foreground">{provider.apiVersion}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequência:</span>
                          <span className="ml-2 font-semibold text-foreground">{provider.dataFrequency}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Última Sync:</span>
                          <span className="ml-2 font-semibold text-foreground">{provider.lastSync}</span>
                        </div>
                      </div>

                      {/* Dados Coletados */}
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Pontos de dados coletados:</span>
                          <span className="font-semibold text-foreground">{provider.dataPoints.toLocaleString()}</span>
                        </div>
                        <Progress value={provider.status === "Conectado" ? 100 : 0} className="mt-2" />
                      </div>

                      {/* Controles */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={connectedDevices[provider.id]}
                            onCheckedChange={() => toggleConnection(provider.id)}
                          />
                          <Label className="text-sm text-foreground">Ativo</Label>
                        </div>
                        <Button
                          size="sm"
                          variant={provider.status === "Conectado" ? "outline" : "default"}
                          className="ukor-button-outline"
                        >
                          {provider.status === "Conectado" ? (
                            <>
                              <Settings className="w-4 h-4 mr-2" />
                              Configurar
                            </>
                          ) : (
                            <>
                              <Wifi className="w-4 h-4 mr-2" />
                              Conectar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mapping">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5 text-ukor-primary" />
                Mapeamento de Métricas para ISP
              </CardTitle>
              <CardDescription>Como os dados de wearables se integram aos pilares do ISP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metricsMapping.map((mapping, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:border-ukor-primary/20 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="font-medium text-ukor-primary">{mapping.wearableMetric}</Label>
                        <p className="text-sm text-muted-foreground mt-1">{mapping.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {mapping.impact} Impacto
                        </Badge>
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">Pilar ISP</Label>
                        <p className="text-sm text-foreground">{mapping.ispPillar}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          Peso: {mapping.weight}
                        </Badge>
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">Cálculo</Label>
                        <p className="text-sm text-muted-foreground">{mapping.calculation}</p>
                        <p className="text-xs text-muted-foreground mt-1 font-mono bg-muted p-1 rounded">
                          {mapping.formula}
                        </p>
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">Meta</Label>
                        <p className="text-sm text-foreground">{mapping.target}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-ukor-light dark:bg-ukor-primary/10 rounded-lg">
                <h4 className="font-semibold text-ukor-dark dark:text-ukor-primary mb-2">
                  Como Funciona a Integração:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-ukor-primary text-white flex items-center justify-center text-xs">
                        1
                      </div>
                      <span className="font-medium text-foreground">Coleta</span>
                    </div>
                    <p className="text-muted-foreground">Dados coletados automaticamente via APIs</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-ukor-primary text-white flex items-center justify-center text-xs">
                        2
                      </div>
                      <span className="font-medium text-foreground">Processamento</span>
                    </div>
                    <p className="text-muted-foreground">Algoritmos convertem métricas em scores</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-ukor-primary text-white flex items-center justify-center text-xs">
                        3
                      </div>
                      <span className="font-medium text-foreground">Ponderação</span>
                    </div>
                    <p className="text-muted-foreground">Aplicação de pesos específicos por pilar</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-ukor-primary text-white flex items-center justify-center text-xs">
                        4
                      </div>
                      <span className="font-medium text-foreground">ISP Final</span>
                    </div>
                    <p className="text-muted-foreground">Cálculo do ISP total ponderado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <WearablesAnalytics />
        </TabsContent>

        <TabsContent value="realtime">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Status de Sincronização</CardTitle>
                <CardDescription>Monitoramento em tempo real das conexões</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wearableProviders
                    .filter((p) => p.status === "Conectado")
                    .map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ukor-primary to-ukor-accent flex items-center justify-center text-white text-xs font-semibold">
                            {provider.name.substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{provider.name}</h4>
                            <p className="text-sm text-muted-foreground">{provider.users} usuários</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getSyncStatusIcon(syncStatus[provider.id])}
                          <span className="text-sm text-muted-foreground">{provider.lastSync}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Métricas de Performance</CardTitle>
                <CardDescription>Performance da infraestrutura de dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-foreground">{realTimeData.avgLatency}</div>
                      <div className="text-sm text-muted-foreground">Latência Média</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-foreground">{realTimeData.syncErrors}</div>
                      <div className="text-sm text-muted-foreground">Erros de Sync</div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">
                        Sistema Operacional
                      </span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                      Todos os serviços funcionando normalmente
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Configurações de Sincronização</CardTitle>
                <CardDescription>Ajuste a frequência e tipos de dados coletados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Frequência de Sincronização</Label>
                  <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                    <option value="realtime">Tempo Real</option>
                    <option value="5min">A cada 5 minutos</option>
                    <option value="15min">A cada 15 minutos</option>
                    <option value="30min">A cada 30 minutos</option>
                    <option value="1hour">A cada hora</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Retenção de Dados</Label>
                  <Input type="number" defaultValue="365" className="w-full" />
                  <p className="text-xs text-muted-foreground">Dias para manter dados históricos</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">Backup diário dos dados de wearables</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Privacidade e Segurança</CardTitle>
                <CardDescription>Configurações de proteção de dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Anonimização de Dados</Label>
                    <p className="text-sm text-muted-foreground">Remover identificadores pessoais</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Criptografia em Trânsito</Label>
                    <p className="text-sm text-muted-foreground">TLS 1.3 para todas as conexões</p>
                  </div>
                  <Switch defaultChecked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Auditoria de Acesso</Label>
                    <p className="text-sm text-muted-foreground">Log de todos os acessos aos dados</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Conformidade LGPD</span>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    Todas as configurações estão em conformidade com a LGPD
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
