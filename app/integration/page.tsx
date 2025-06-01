"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataSyncManager } from "@/components/integration/data-sync-manager"
import { MigrationWizard } from "@/components/integration/migration-wizard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, RefreshCw, Settings, CheckCircle, ExternalLink, Key, Shield } from "lucide-react"

export default function IntegrationPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Integração com Sistema Ukor</h1>
            <p className="text-muted-foreground">
              Conecte e migre dados do sistema existente da Ukor para a nova plataforma UHealth
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              API Conectada
            </Badge>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Acessar Ukor
            </Button>
          </div>
        </div>

        {/* Status da Integração */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status da API</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-muted-foreground">Latência: 120ms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dados Sincronizados</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">Usuários migrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Sincronização</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <p className="text-xs text-muted-foreground">atrás</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.2%</div>
              <p className="text-xs text-muted-foreground">Últimas 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Configuração da API */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Configuração da API Ukor
            </CardTitle>
            <CardDescription>Configurações de conexão com o sistema existente da Ukor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Endpoint Base</label>
                  <div className="mt-1 p-2 bg-muted rounded text-sm font-mono">https://app.ukor.com.br/api/v1</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Autenticação</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Bearer Token (OAuth 2.0)</span>
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Rate Limit</label>
                  <div className="mt-1 p-2 bg-muted rounded text-sm">1000 requisições/hora</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Timeout</label>
                  <div className="mt-1 p-2 bg-muted rounded text-sm">30 segundos</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Integração */}
        <Tabs defaultValue="sync" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sync">Sincronização de Dados</TabsTrigger>
            <TabsTrigger value="migration">Assistente de Migração</TabsTrigger>
          </TabsList>

          <TabsContent value="sync">
            <DataSyncManager />
          </TabsContent>

          <TabsContent value="migration">
            <MigrationWizard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
