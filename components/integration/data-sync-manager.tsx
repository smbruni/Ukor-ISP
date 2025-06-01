"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  RefreshCw,
  Database,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText,
  BookOpen,
  Activity,
  Download,
  Upload,
} from "lucide-react"

interface SyncStatus {
  entity: string
  status: "pending" | "syncing" | "completed" | "error"
  progress: number
  lastSync?: Date
  recordsCount?: number
  error?: string
}

export function DataSyncManager() {
  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>([
    { entity: "users", status: "pending", progress: 0 },
    { entity: "questionnaires", status: "pending", progress: 0 },
    { entity: "courses", status: "pending", progress: 0 },
    { entity: "isp_data", status: "pending", progress: 0 },
    { entity: "wearables", status: "pending", progress: 0 },
    { entity: "analytics", status: "pending", progress: 0 },
  ])

  const [isFullSyncRunning, setIsFullSyncRunning] = useState(false)
  const [lastFullSync, setLastFullSync] = useState<Date | null>(null)

  const entityConfig = {
    users: {
      name: "Usuários",
      icon: Users,
      description: "Colaboradores e perfis",
    },
    questionnaires: {
      name: "Questionários",
      icon: FileText,
      description: "PHQ-9, PSQI, PSS-10, etc.",
    },
    courses: {
      name: "Cursos",
      icon: BookOpen,
      description: "Conteúdo educacional",
    },
    isp_data: {
      name: "Dados ISP",
      icon: Activity,
      description: "Índices de saúde e performance",
    },
    wearables: {
      name: "Wearables",
      icon: Database,
      description: "Dados de dispositivos vestíveis",
    },
    analytics: {
      name: "Analytics",
      icon: RefreshCw,
      description: "Métricas e relatórios",
    },
  }

  const updateSyncStatus = (entity: string, updates: Partial<SyncStatus>) => {
    setSyncStatuses((prev) => prev.map((status) => (status.entity === entity ? { ...status, ...updates } : status)))
  }

  const syncEntity = async (entity: string) => {
    updateSyncStatus(entity, { status: "syncing", progress: 0 })

    try {
      // Simular sincronização com progresso
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        updateSyncStatus(entity, { progress: i })
      }

      // Aqui você faria a sincronização real com a API da Ukor
      let recordsCount = 0
      switch (entity) {
        case "users":
          // const users = await ukorAPI.getUsers(companyId)
          recordsCount = Math.floor(Math.random() * 500) + 100
          break
        case "questionnaires":
          // const questionnaires = await ukorAPI.getQuestionnaires()
          recordsCount = Math.floor(Math.random() * 20) + 5
          break
        case "courses":
          // const courses = await ukorAPI.getCourses()
          recordsCount = Math.floor(Math.random() * 100) + 20
          break
        case "isp_data":
          // const ispData = await ukorAPI.getCompanyISP(companyId)
          recordsCount = Math.floor(Math.random() * 1000) + 200
          break
        case "wearables":
          // const wearableData = await ukorAPI.getWearableData(userId)
          recordsCount = Math.floor(Math.random() * 50000) + 10000
          break
        case "analytics":
          // const analytics = await ukorAPI.getCompanyAnalytics(companyId, 'month')
          recordsCount = Math.floor(Math.random() * 100) + 10
          break
      }

      updateSyncStatus(entity, {
        status: "completed",
        progress: 100,
        lastSync: new Date(),
        recordsCount,
      })
    } catch (error) {
      updateSyncStatus(entity, {
        status: "error",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }
  }

  const runFullSync = async () => {
    setIsFullSyncRunning(true)

    for (const status of syncStatuses) {
      await syncEntity(status.entity)
    }

    setLastFullSync(new Date())
    setIsFullSyncRunning(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "syncing":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "syncing":
        return RefreshCw
      case "error":
        return AlertTriangle
      default:
        return Database
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sincronização com Ukor</h2>
          <p className="text-muted-foreground">Integração e sincronização de dados com o sistema existente da Ukor</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={runFullSync} disabled={isFullSyncRunning}>
            {isFullSyncRunning ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Sincronização Completa
          </Button>
        </div>
      </div>

      {lastFullSync && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Última sincronização completa: {lastFullSync.toLocaleString("pt-BR")}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {syncStatuses.map((syncStatus) => {
          const config = entityConfig[syncStatus.entity]
          const StatusIcon = getStatusIcon(syncStatus.status)

          return (
            <Card key={syncStatus.entity}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <config.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                      <CardDescription>{config.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(syncStatus.status)}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {syncStatus.status === "syncing"
                      ? "Sincronizando"
                      : syncStatus.status === "completed"
                        ? "Concluído"
                        : syncStatus.status === "error"
                          ? "Erro"
                          : "Pendente"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syncStatus.status === "syncing" && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso</span>
                        <span>{syncStatus.progress}%</span>
                      </div>
                      <Progress value={syncStatus.progress} />
                    </div>
                  )}

                  {syncStatus.status === "completed" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Registros:</span>
                        <span className="font-semibold">{syncStatus.recordsCount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Última sync:</span>
                        <span>{syncStatus.lastSync?.toLocaleTimeString("pt-BR")}</span>
                      </div>
                    </div>
                  )}

                  {syncStatus.status === "error" && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">{syncStatus.error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => syncEntity(syncStatus.entity)}
                    disabled={syncStatus.status === "syncing" || isFullSyncRunning}
                  >
                    {syncStatus.status === "syncing" ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Sincronizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Configurações de Integração */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Integração</CardTitle>
          <CardDescription>Configure como os dados são sincronizados com o sistema Ukor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Frequência de Sincronização</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dados de usuários</span>
                  <Badge variant="outline">Diária</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Respostas de questionários</span>
                  <Badge variant="outline">Tempo real</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dados de wearables</span>
                  <Badge variant="outline">A cada 15 min</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Analytics</span>
                  <Badge variant="outline">Semanal</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Status da API</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Endpoint principal</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Autenticação</span>
                  <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rate limit</span>
                  <Badge variant="outline">1000/hora</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Latência média</span>
                  <Badge variant="outline">120ms</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
