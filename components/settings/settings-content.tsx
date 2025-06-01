"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Shield, Database, Users } from "lucide-react"

export function SettingsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
          <p className="text-muted-foreground">Gerencie as configurações da plataforma UHealth</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações Gerais
          </CardTitle>
          <CardDescription>Configurações básicas da plataforma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input id="company-name" defaultValue="Ukor Health Analytics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select defaultValue="america-sao_paulo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-sao_paulo">América/São Paulo</SelectItem>
                  <SelectItem value="america-new_york">América/Nova York</SelectItem>
                  <SelectItem value="europe-london">Europa/Londres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-description">Descrição da Empresa</Label>
            <Textarea
              id="company-description"
              defaultValue="Empresa focada em análise preditiva de saúde corporativa e bem-estar dos colaboradores."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
          <CardDescription>Configure como e quando receber notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[
              {
                title: "Alertas de Burnout",
                description: "Notificar quando colaboradores apresentarem sinais de burnout",
                enabled: true,
              },
              {
                title: "Relatórios Semanais",
                description: "Enviar resumo semanal por email",
                enabled: true,
              },
              {
                title: "Metas Atingidas",
                description: "Notificar quando departamentos atingirem metas de ISP",
                enabled: false,
              },
              {
                title: "Sincronização de Dados",
                description: "Alertar sobre problemas na sincronização de wearables",
                enabled: true,
              },
              {
                title: "Novos Usuários",
                description: "Notificar quando novos colaboradores se cadastrarem",
                enabled: false,
              },
            ].map((notification, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
                <Switch defaultChecked={notification.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Segurança e Privacidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Segurança e Privacidade
          </CardTitle>
          <CardDescription>Configurações de segurança e proteção de dados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Autenticação de Dois Fatores</p>
                <p className="text-sm text-muted-foreground">Adicionar camada extra de segurança</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Criptografia de Dados</p>
                <p className="text-sm text-muted-foreground">Criptografar dados sensíveis de saúde</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                <Switch defaultChecked disabled />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Log de Auditoria</p>
                <p className="text-sm text-muted-foreground">Registrar todas as ações do sistema</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Anonimização de Dados</p>
                <p className="text-sm text-muted-foreground">Anonimizar dados para relatórios</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integração de Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Integração de Dados
          </CardTitle>
          <CardDescription>Configure as integrações com sistemas externos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Garmin Connect", status: "Conectado", users: 234 },
              { name: "WHOOP 4.0", status: "Conectado", users: 89 },
              { name: "Apple Health", status: "Conectado", users: 198 },
              { name: "Fitbit", status: "Conectado", users: 156 },
              { name: "Samsung Health", status: "Conectado", users: 78 },
              { name: "Google Fit", status: "Disponível", users: 0 },
              { name: "Polar Flow", status: "Disponível", users: 0 },
              { name: "Sistema RH", status: "Configurando", users: 0 },
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{integration.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {integration.users > 0 ? `${integration.users} usuários` : "Não configurado"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={integration.status === "Conectado" ? "default" : "outline"}
                    className={
                      integration.status === "Conectado"
                        ? "bg-green-100 text-green-800"
                        : integration.status === "Configurando"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                    }
                  >
                    {integration.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {integration.status === "Conectado" ? "Configurar" : "Conectar"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usuários e Permissões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Usuários e Permissões
          </CardTitle>
          <CardDescription>Gerencie usuários e níveis de acesso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">1.247</div>
              <p className="text-sm text-muted-foreground">Total de Usuários</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">15</div>
              <p className="text-sm text-muted-foreground">Administradores</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">89</div>
              <p className="text-sm text-muted-foreground">Gestores</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Configurações de Acesso</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Permitir auto-cadastro</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Aprovação manual de novos usuários</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Acesso a dados pessoais (gestores)</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
