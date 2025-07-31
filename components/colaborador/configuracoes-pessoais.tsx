"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Eye,
  Download,
  Upload,
  Edit,
  Save,
  Lock,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Volume2,
  Database,
  FileText,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Settings,
} from "lucide-react"

export function ConfiguracoesPessoais({ colaborador }) {
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
    nome: colaborador.nome,
    email: colaborador.email,
    telefone: colaborador.telefone,
    cargo: colaborador.cargo,
    departamento: colaborador.departamento,
    dataAdmissao: colaborador.dataAdmissao,
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

  const getStatusColor = (status) => {
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

  const getDeviceIcon = (type) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "desktop":
        return <Settings className="h-4 w-4" />
      case "tablet":
        return <Settings className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configurações Pessoais</h2>
        <p className="text-gray-600 mt-1">Gerencie suas informações pessoais e preferências</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 text-xs">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Foto e Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Informações Pessoais
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? <Save className="h-4 w-4 mr-1" /> : <Edit className="h-4 w-4 mr-1" />}
                  {isEditing ? "Salvar" : "Editar"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={colaborador.avatar || "/placeholder.svg"} alt={personalData.nome} />
                    <AvatarFallback className="text-lg">
                      {personalData.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{personalData.nome}</h3>
                  <p className="text-gray-600">{personalData.cargo}</p>
                  <p className="text-gray-500 text-sm">{personalData.departamento}</p>
                  <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                    Ativo desde {new Date(personalData.dataAdmissao).toLocaleDateString("pt-BR")}
                  </Badge>
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">{personalData.email}</div>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Telefone</div>
                    <div className="font-medium">{personalData.telefone}</div>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Endereço</div>
                    <div className="font-medium">
                      {personalData.endereco.rua}, {personalData.endereco.bairro}
                    </div>
                    <div className="text-sm text-gray-500">
                      {personalData.endereco.cidade}, {personalData.endereco.estado} - {personalData.endereco.cep}
                    </div>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato de Emergência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Contato de Emergência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <User className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Nome</div>
                    <div className="font-medium">{personalData.emergencia.nome}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <User className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Parentesco</div>
                    <div className="font-medium">{personalData.emergencia.parentesco}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Telefone</div>
                    <div className="font-medium">{personalData.emergencia.telefone}</div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <Button className="w-full mt-4">
                  <Save className="h-4 w-4 mr-1" />
                  Atualizar Contato de Emergência
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">CPF</div>
                    <div className="font-medium">{personalData.documentos.cpf}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">RG</div>
                    <div className="font-medium">{personalData.documentos.rg}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">PIS</div>
                    <div className="font-medium">{personalData.documentos.pis}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Configurações de Notificação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>Configure como você deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Canais de Notificação */}
                <div>
                  <h4 className="font-medium mb-4">Canais de Notificação</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Email</div>
                          <div className="text-sm text-gray-600">Receber notificações por email</div>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(value) => handleNotificationChange("email", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-gray-600">Notificações no aplicativo</div>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(value) => handleNotificationChange("push", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium">SMS</div>
                          <div className="text-sm text-gray-600">Mensagens de texto importantes</div>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(value) => handleNotificationChange("sms", value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Tipos de Notificação */}
                <div>
                  <h4 className="font-medium mb-4">Tipos de Notificação</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Lembretes de Saúde</div>
                        <div className="text-sm text-gray-600">Medicamentos, exercícios, hidratação</div>
                      </div>
                      <Switch
                        checked={notifications.healthReminders}
                        onCheckedChange={(value) => handleNotificationChange("healthReminders", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Lembretes de Consultas</div>
                        <div className="text-sm text-gray-600">Consultas e exames agendados</div>
                      </div>
                      <Switch
                        checked={notifications.appointmentReminders}
                        onCheckedChange={(value) => handleNotificationChange("appointmentReminders", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Atualizações de Programas</div>
                        <div className="text-sm text-gray-600">Novos programas e atividades</div>
                      </div>
                      <Switch
                        checked={notifications.programUpdates}
                        onCheckedChange={(value) => handleNotificationChange("programUpdates", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Atualizações de Benefícios</div>
                        <div className="text-sm text-gray-600">Mudanças nos planos e benefícios</div>
                      </div>
                      <Switch
                        checked={notifications.benefitsUpdates}
                        onCheckedChange={(value) => handleNotificationChange("benefitsUpdates", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Atualizações do Sistema</div>
                        <div className="text-sm text-gray-600">Novas funcionalidades e manutenções</div>
                      </div>
                      <Switch
                        checked={notifications.systemUpdates}
                        onCheckedChange={(value) => handleNotificationChange("systemUpdates", value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6">
                <Save className="h-4 w-4 mr-1" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>

          {/* Configurações de Aparência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-purple-600" />
                Aparência
              </CardTitle>
              <CardDescription>Personalize a aparência do aplicativo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Sun className="h-5 w-5 text-yellow-600" />
                    )}
                    <div>
                      <div className="font-medium">Modo Escuro</div>
                      <div className="text-sm text-gray-600">Tema escuro para reduzir o cansaço visual</div>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Sons de Notificação</div>
                      <div className="text-sm text-gray-600">Reproduzir sons para notificações</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          {/* Configurações de Privacidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Privacidade dos Dados
              </CardTitle>
              <CardDescription>Controle como seus dados são utilizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Compartilhamento de Dados de Saúde</div>
                    <div className="text-sm text-gray-600">Permitir análises agregadas para melhorar programas</div>
                  </div>
                  <Switch
                    checked={privacy.healthDataSharing}
                    onCheckedChange={(value) => handlePrivacyChange("healthDataSharing", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Análises de Uso</div>
                    <div className="text-sm text-gray-600">Ajudar a melhorar a experiência do aplicativo</div>
                  </div>
                  <Switch
                    checked={privacy.analyticsSharing}
                    onCheckedChange={(value) => handlePrivacyChange("analyticsSharing", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Emails de Marketing</div>
                    <div className="text-sm text-gray-600">Receber ofertas e promoções de parceiros</div>
                  </div>
                  <Switch
                    checked={privacy.marketingEmails}
                    onCheckedChange={(value) => handlePrivacyChange("marketingEmails", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Exportação de Dados</div>
                    <div className="text-sm text-gray-600">Permitir download dos seus dados pessoais</div>
                  </div>
                  <Switch
                    checked={privacy.dataExport}
                    onCheckedChange={(value) => handlePrivacyChange("dataExport", value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controle de Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-600" />
                Controle de Dados
              </CardTitle>
              <CardDescription>Gerencie seus dados pessoais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Estatísticas de Uso</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Total de logins:</span>
                      <div className="font-medium text-blue-800">{usageStats.totalLogins}</div>
                    </div>
                    <div>
                      <span className="text-blue-700">Tempo médio de sessão:</span>
                      <div className="font-medium text-blue-800">{usageStats.averageSessionTime}</div>
                    </div>
                    <div>
                      <span className="text-blue-700">Funcionalidade mais usada:</span>
                      <div className="font-medium text-blue-800">{usageStats.mostUsedFeature}</div>
                    </div>
                    <div>
                      <span className="text-blue-700">Dados gerados:</span>
                      <div className="font-medium text-blue-800">{usageStats.dataGenerated}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Exportar Dados
                  </Button>
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    Relatório de Privacidade
                  </Button>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Zona de Perigo
                  </h4>
                  <p className="text-sm text-red-700 mb-3">
                    Ações irreversíveis que afetam permanentemente seus dados.
                  </p>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir Conta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Configurações de Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-red-600" />
                Segurança da Conta
              </CardTitle>
              <CardDescription>Proteja sua conta com configurações de segurança</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Autenticação de Dois Fatores</div>
                    <div className="text-sm text-gray-600">
                      {securitySettings.twoFactorEnabled ? "Ativada" : "Desativada"}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {securitySettings.twoFactorEnabled && <CheckCircle className="h-5 w-5 text-green-600" />}
                    <Button variant="outline" size="sm">
                      {securitySettings.twoFactorEnabled ? "Desativar" : "Ativar"}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Senha</div>
                    <div className="text-sm text-gray-600">
                      Última alteração: {new Date(securitySettings.lastPasswordChange).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Lock className="h-4 w-4 mr-1" />
                    Alterar Senha
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dispositivos Conectados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
                Dispositivos Conectados
              </CardTitle>
              <CardDescription>Gerencie os dispositivos que acessam sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securitySettings.connectedDevices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getDeviceIcon(device.type)}
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-gray-600">
                          Último acesso: {new Date(device.lastAccess).toLocaleString("pt-BR")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {device.active ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
                      ) : (
                        <Badge variant="outline">Inativo</Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Login */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-600" />
                Histórico de Login
              </CardTitle>
              <CardDescription>Últimas atividades de login na sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securitySettings.loginHistory.map((login, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className={`h-4 w-4 ${getStatusColor(login.status)}`} />
                      <div>
                        <div className="font-medium">{login.device}</div>
                        <div className="text-sm text-gray-600">{login.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{new Date(login.date).toLocaleDateString("pt-BR")}</div>
                      <div className="text-xs text-gray-500">{new Date(login.date).toLocaleTimeString("pt-BR")}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                <Eye className="h-4 w-4 mr-1" />
                Ver Histórico Completo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
