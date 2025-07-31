"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Smartphone,
  Upload,
  Mail,
  Edit,
  Phone,
  MapPin,
} from "lucide-react"

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    healthReminders: true,
    appointmentReminders: true,
    programUpdates: true,
    benefitsUpdates: false,
    systemUpdates: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "company",
    healthDataSharing: true,
    analyticsSharing: true,
    marketingEmails: false,
    dataExport: true,
  })

  // Dados pessoais do colaborador
  const personalData = {
    nome: "Dr. Ana Silva",
    email: "ana.silva@ukor.com",
    telefone: "+55 11 99999-9999",
    cargo: "Gestora de Saúde",
    departamento: "Gestão de Saúde",
    dataAdmissao: "2022-03-15",
    endereco: {
      rua: "Rua das Flores, 123",
      bairro: "Vila Madalena",
      cidade: "São Paulo",
      estado: "SP",
      cep: "05435-000",
    },
    emergencia: {
      nome: "João Silva",
      parentesco: "Cônjuge",
      telefone: "(11) 98765-4321",
    },
    documentos: {
      cpf: "123.456.789-00",
      rg: "12.345.678-9",
      pis: "123.45678.90-1",
    },
  }

  // Configurações de segurança
  const securitySettings = {
    lastPasswordChange: "2024-02-15",
    twoFactorEnabled: true,
    loginHistory: [
      { date: "2024-04-20 08:30", device: "iPhone 13", location: "São Paulo, SP", status: "success" },
      { date: "2024-04-19 18:45", device: "MacBook Pro", location: "São Paulo, SP", status: "success" },
      { date: "2024-04-19 08:15", device: "iPhone 13", location: "São Paulo, SP", status: "success" },
      { date: "2024-04-18 19:20", device: "MacBook Pro", location: "São Paulo, SP", status: "success" },
    ],
    connectedDevices: [
      { name: "iPhone 13", type: "mobile", lastAccess: "2024-04-20 08:30", active: true },
      { name: "MacBook Pro", type: "desktop", lastAccess: "2024-04-19 18:45", active: true },
      { name: "iPad Air", type: "tablet", lastAccess: "2024-04-15 20:10", active: false },
    ],
  }

  // Dados de uso e estatísticas
  const usageStats = {
    totalLogins: 156,
    averageSessionTime: "25 min",
    mostUsedFeature: "Dashboard",
    dataGenerated: "2.3 GB",
    lastBackup: "2024-04-19",
    accountAge: "1 ano e 2 meses",
  }

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "desktop":
        return <Globe className="h-4 w-4" />
      case "tablet":
        return <Globe className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie empresas, colaboradores e configurações do sistema</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Administrador</div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Foto e Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>Dados principais da sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <img src="/placeholder.svg?height=100&width=100" alt="Dr. Ana Silva" />
                    <AvatarFallback className="text-lg">AS</AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Dr. Ana Silva</h3>
                  <p className="text-gray-600">Gestora de Saúde</p>
                  <p className="text-gray-500 text-sm">Gestão de Saúde</p>
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">ana.silva@ukor.com</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Telefone</div>
                    <div className="font-medium">+55 11 99999-9999</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Endereço</div>
                    <div className="font-medium">Rua das Flores, 123</div>
                    <div className="text-sm text-gray-500">Vila Madalena, São Paulo - SP, 05435-000</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>Configure como você deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alertas de Sistema</h4>
                    <p className="text-sm text-gray-600">Notificações sobre status do sistema e atualizações</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alertas de Saúde</h4>
                    <p className="text-sm text-gray-600">Notificações sobre riscos de saúde e casos críticos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Relatórios Automáticos</h4>
                    <p className="text-sm text-gray-600">Receber relatórios periódicos por email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações Push</h4>
                    <p className="text-sm text-gray-600">Notificações no navegador</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Frequência de Email</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="frequency" value="immediate" defaultChecked />
                    <span className="text-sm">Imediato</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="frequency" value="daily" />
                    <span className="text-sm">Resumo Diário</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="frequency" value="weekly" />
                    <span className="text-sm">Resumo Semanal</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança
              </CardTitle>
              <CardDescription>Gerencie suas configurações de segurança e privacidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Alterar Senha</h4>
                  <div className="space-y-2">
                    <Input type="password" placeholder="Senha atual" />
                    <Input type="password" placeholder="Nova senha" />
                    <Input type="password" placeholder="Confirmar nova senha" />
                  </div>
                  <Button className="mt-2">Atualizar Senha</Button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Autenticação de Dois Fatores</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Adicione uma camada extra de segurança à sua conta</p>
                    </div>
                    <Button variant="outline">Configurar 2FA</Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Sessões Ativas</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Chrome - Windows</p>
                        <p className="text-sm text-gray-600">São Paulo, Brasil • Ativo agora</p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Atual</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Safari - iPhone</p>
                        <p className="text-sm text-gray-600">São Paulo, Brasil • 2 horas atrás</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Encerrar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Integrações
              </CardTitle>
              <CardDescription>Gerencie conexões com sistemas externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Unimed-BH",
                    description: "Dados de sinistralidade e utilização",
                    status: "Conectado",
                    connected: true,
                  },
                  {
                    name: "Sistema RH",
                    description: "Informações de colaboradores",
                    status: "Conectado",
                    connected: true,
                  },
                  {
                    name: "Microsoft Teams",
                    description: "Notificações e comunicação",
                    status: "Desconectado",
                    connected: false,
                  },
                  {
                    name: "Google Workspace",
                    description: "Calendário e documentos",
                    status: "Desconectado",
                    connected: false,
                  },
                ].map((integration, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{integration.name}</h4>
                      <div
                        className={`bg-${integration.connected ? "green" : "red"}-100 text-${integration.connected ? "green" : "red"}-800 px-3 py-1 rounded-full`}
                      >
                        {integration.status}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                    <Button size="sm" variant={integration.connected ? "outline" : "default"}>
                      {integration.connected ? "Desconectar" : "Conectar"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>Personalize a aparência da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Tema</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="w-full h-16 bg-white border rounded mb-2"></div>
                    <p className="text-sm text-center">Claro</p>
                  </div>
                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="w-full h-16 bg-gray-900 border rounded mb-2"></div>
                    <p className="text-sm text-center">Escuro</p>
                  </div>
                  <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="w-full h-16 bg-gradient-to-r from-white to-gray-900 border rounded mb-2"></div>
                    <p className="text-sm text-center">Automático</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Cor Principal</h4>
                <div className="flex space-x-2">
                  {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-orange-500"].map(
                    (color, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${color} ${
                          index === 0 ? "border-gray-400" : "border-transparent"
                        }`}
                      ></div>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sidebar Compacta</h4>
                    <p className="text-sm text-gray-600">Reduzir o tamanho da barra lateral</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Animações</h4>
                    <p className="text-sm text-gray-600">Habilitar animações na interface</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>Configurações gerais da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <select id="language" className="w-full p-2 border rounded-md">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <select id="timezone" className="w-full p-2 border rounded-md">
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Europe/London">London (GMT+0)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Formato de Data</Label>
                  <select id="dateFormat" className="w-full p-2 border rounded-md">
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <select id="currency" className="w-full p-2 border rounded-md">
                    <option value="BRL">Real (R$)</option>
                    <option value="USD">Dólar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Backup e Exportação</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Backup Automático</p>
                      <p className="text-sm text-gray-600">Último backup: Hoje, 03:00</p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Exportar Dados</p>
                      <p className="text-sm text-gray-600">Baixar todos os dados da plataforma</p>
                    </div>
                    <Button variant="outline">Exportar</Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Informações do Sistema</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Versão:</p>
                    <p className="font-medium">v2.1.0</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Última Atualização:</p>
                    <p className="font-medium">15/04/2024</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Uptime:</p>
                    <p className="font-medium">99.9%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Usuários Ativos:</p>
                    <p className="font-medium">1,247</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
