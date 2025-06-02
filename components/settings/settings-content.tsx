"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Users,
  Building2,
  Settings,
  Shield,
  Database,
  Mail,
  Smartphone,
  Globe,
  UserPlus,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react"

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState("company")
  const [showPassword, setShowPassword] = useState(false)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")

  // Dados da empresa
  const companyData = {
    name: "Ukor Health Analytics",
    cnpj: "12.345.678/0001-90",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    phone: "(11) 3000-0000",
    email: "contato@ukor.com.br",
    website: "www.ukor.com.br",
    employees: 2340,
    departments: 12,
    plan: "Enterprise",
    status: "Ativo",
    contractStart: "2023-01-15",
    contractEnd: "2024-01-15",
  }

  // Dados dos colaboradores
  const employees = [
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@empresa.com",
      department: "TI",
      position: "Desenvolvedora Senior",
      phone: "(11) 99999-0001",
      cpf: "123.456.789-01",
      birthDate: "1990-05-15",
      hireDate: "2022-03-10",
      status: "Ativo",
      role: "Colaborador",
      manager: "Carlos Santos",
      wearableConnected: true,
      lastAccess: "2024-01-15 14:30",
    },
    {
      id: 2,
      name: "Carlos Santos",
      email: "carlos.santos@empresa.com",
      department: "TI",
      position: "Gerente de TI",
      phone: "(11) 99999-0002",
      cpf: "123.456.789-02",
      birthDate: "1985-08-22",
      hireDate: "2020-01-15",
      status: "Ativo",
      role: "Gestor",
      manager: null,
      wearableConnected: true,
      lastAccess: "2024-01-15 16:45",
    },
    {
      id: 3,
      name: "Maria Oliveira",
      email: "maria.oliveira@empresa.com",
      department: "RH",
      position: "Analista de RH",
      phone: "(11) 99999-0003",
      cpf: "123.456.789-03",
      birthDate: "1992-12-03",
      hireDate: "2021-07-20",
      status: "Ativo",
      role: "Colaborador",
      manager: "João Costa",
      wearableConnected: false,
      lastAccess: "2024-01-15 09:15",
    },
    {
      id: 4,
      name: "João Costa",
      email: "joao.costa@empresa.com",
      department: "RH",
      position: "Diretor de RH",
      phone: "(11) 99999-0004",
      cpf: "123.456.789-04",
      birthDate: "1980-04-18",
      hireDate: "2019-02-01",
      status: "Ativo",
      role: "Admin",
      manager: null,
      wearableConnected: true,
      lastAccess: "2024-01-15 17:20",
    },
    {
      id: 5,
      name: "Lucia Mendes",
      email: "lucia.mendes@empresa.com",
      department: "Marketing",
      position: "Coordenadora de Marketing",
      phone: "(11) 99999-0005",
      cpf: "123.456.789-05",
      birthDate: "1988-11-30",
      hireDate: "2021-09-15",
      status: "Inativo",
      role: "Colaborador",
      manager: "Pedro Lima",
      wearableConnected: false,
      lastAccess: "2024-01-10 11:30",
    },
  ]

  // Configurações do sistema
  const systemSettings = {
    notifications: {
      email: true,
      sms: false,
      push: true,
      realTimeAlerts: true,
      weeklyReports: true,
      monthlyReports: true,
    },
    security: {
      twoFactorAuth: true,
      passwordExpiry: 90,
      sessionTimeout: 30,
      ipRestriction: false,
      auditLog: true,
    },
    integrations: {
      wearables: true,
      healthPlans: true,
      hrSystems: true,
      emailProvider: "SendGrid",
      smsProvider: "Twilio",
    },
    dataRetention: {
      healthData: 24,
      auditLogs: 12,
      reports: 36,
      backupFrequency: "daily",
    },
  }

  // Filtrar colaboradores
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment

    return matchesSearch && matchesDepartment
  })

  const departments = ["TI", "RH", "Marketing", "Vendas", "Financeiro", "Operações"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configurações</h2>
        <p className="text-muted-foreground">Gerencie empresas, colaboradores e configurações do sistema</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="company">Empresa</TabsTrigger>
          <TabsTrigger value="employees">Colaboradores</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações da Empresa
              </CardTitle>
              <CardDescription>Dados principais da organização</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input id="companyName" defaultValue={companyData.name} />
                  </div>

                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue={companyData.cnpj} />
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Textarea id="address" defaultValue={companyData.address} />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue={companyData.phone} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue={companyData.email} />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue={companyData.website} />
                  </div>

                  <div>
                    <Label htmlFor="plan">Plano Contratado</Label>
                    <Select defaultValue={companyData.plan}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractStart">Início do Contrato</Label>
                      <Input id="contractStart" type="date" defaultValue={companyData.contractStart} />
                    </div>
                    <div>
                      <Label htmlFor="contractEnd">Fim do Contrato</Label>
                      <Input id="contractEnd" type="date" defaultValue={companyData.contractEnd} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas da Empresa */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total de Colaboradores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyData.employees}</div>
                <p className="text-xs text-muted-foreground">Ativos na plataforma</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Departamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyData.departments}</div>
                <p className="text-xs text-muted-foreground">Áreas cadastradas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Status do Contrato</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-green-100 text-green-800">{companyData.status}</Badge>
                <p className="text-xs text-muted-foreground mt-1">Renovação em 30 dias</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Plano Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyData.plan}</div>
                <p className="text-xs text-muted-foreground">Recursos ilimitados</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          {/* Filtros e Busca */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gerenciamento de Colaboradores
              </CardTitle>
              <CardDescription>Cadastre e gerencie colaboradores da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome, email ou departamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtrar por departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os departamentos</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Novo Colaborador
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Cadastrar Novo Colaborador</DialogTitle>
                      <DialogDescription>Preencha as informações do novo colaborador</DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="newName">Nome Completo</Label>
                        <Input id="newName" placeholder="Nome do colaborador" />
                      </div>
                      <div>
                        <Label htmlFor="newEmail">E-mail</Label>
                        <Input id="newEmail" type="email" placeholder="email@empresa.com" />
                      </div>
                      <div>
                        <Label htmlFor="newDepartment">Departamento</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="newPosition">Cargo</Label>
                        <Input id="newPosition" placeholder="Cargo do colaborador" />
                      </div>
                      <div>
                        <Label htmlFor="newPhone">Telefone</Label>
                        <Input id="newPhone" placeholder="(11) 99999-9999" />
                      </div>
                      <div>
                        <Label htmlFor="newCpf">CPF</Label>
                        <Input id="newCpf" placeholder="000.000.000-00" />
                      </div>
                      <div>
                        <Label htmlFor="newBirthDate">Data de Nascimento</Label>
                        <Input id="newBirthDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="newHireDate">Data de Admissão</Label>
                        <Input id="newHireDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="newRole">Perfil de Acesso</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o perfil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Colaborador">Colaborador</SelectItem>
                            <SelectItem value="Gestor">Gestor</SelectItem>
                            <SelectItem value="Admin">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="newManager">Gestor Direto</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o gestor" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees
                              .filter((emp) => emp.role === "Gestor" || emp.role === "Admin")
                              .map((manager) => (
                                <SelectItem key={manager.id} value={manager.name}>
                                  {manager.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setIsAddUserOpen(false)}>Cadastrar Colaborador</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Lista de Colaboradores */}
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-medium">{employee.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {employee.position} • {employee.department}
                        </p>
                        <p className="text-xs text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <Badge variant={employee.status === "Ativo" ? "default" : "secondary"}>{employee.status}</Badge>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant={
                              employee.role === "Admin"
                                ? "destructive"
                                : employee.role === "Gestor"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {employee.role}
                          </Badge>
                          {employee.wearableConnected && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              Wearable
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedUser(employee)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o colaborador {employee.name}? Esta ação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction>Excluir</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredEmployees.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nenhum colaborador encontrado</h3>
                  <p className="mt-2 text-muted-foreground">Tente ajustar os filtros de busca.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Modal de Detalhes do Colaborador */}
          {selectedUser && (
            <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Detalhes do Colaborador</DialogTitle>
                  <DialogDescription>Informações completas de {selectedUser.name}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome Completo</Label>
                    <p className="font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label>Departamento</Label>
                    <p className="font-medium">{selectedUser.department}</p>
                  </div>
                  <div>
                    <Label>Cargo</Label>
                    <p className="font-medium">{selectedUser.position}</p>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <Label>CPF</Label>
                    <p className="font-medium">{selectedUser.cpf}</p>
                  </div>
                  <div>
                    <Label>Data de Nascimento</Label>
                    <p className="font-medium">{new Date(selectedUser.birthDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <Label>Data de Admissão</Label>
                    <p className="font-medium">{new Date(selectedUser.hireDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <Label>Gestor Direto</Label>
                    <p className="font-medium">{selectedUser.manager || "Não informado"}</p>
                  </div>
                  <div>
                    <Label>Último Acesso</Label>
                    <p className="font-medium">{new Date(selectedUser.lastAccess).toLocaleString("pt-BR")}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge variant={selectedUser.status === "Ativo" ? "default" : "secondary"}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div>
                    <Label>Wearable Conectado</Label>
                    <Badge variant={selectedUser.wearableConnected ? "default" : "outline"}>
                      {selectedUser.wearableConnected ? "Sim" : "Não"}
                    </Badge>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedUser(null)}>
                    Fechar
                  </Button>
                  <Button>Editar Colaborador</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>Configurações gerais da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notificações */}
              <div>
                <h3 className="text-lg font-medium mb-4">Notificações</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por E-mail</Label>
                      <p className="text-sm text-muted-foreground">Receber alertas e relatórios por e-mail</p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.email} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por SMS</Label>
                      <p className="text-sm text-muted-foreground">Alertas críticos via SMS</p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.sms} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">Notificações no navegador</p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.push} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertas em Tempo Real</Label>
                      <p className="text-sm text-muted-foreground">Alertas instantâneos de saúde</p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.realTimeAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Relatórios Semanais</Label>
                      <p className="text-sm text-muted-foreground">Resumo semanal automático</p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.weeklyReports} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Relatórios Mensais</Label>
                      <p className="text-sm text-muted-foreground">Relatório executivo mensal</p>
                    </div>
                    <Switch defaultChecked={systemSettings.notifications.monthlyReports} />
                  </div>
                </div>
              </div>

              {/* Retenção de Dados */}
              <div>
                <h3 className="text-lg font-medium mb-4">Retenção de Dados</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="healthDataRetention">Dados de Saúde (meses)</Label>
                    <Input
                      id="healthDataRetention"
                      type="number"
                      defaultValue={systemSettings.dataRetention.healthData}
                    />
                  </div>
                  <div>
                    <Label htmlFor="auditLogsRetention">Logs de Auditoria (meses)</Label>
                    <Input
                      id="auditLogsRetention"
                      type="number"
                      defaultValue={systemSettings.dataRetention.auditLogs}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reportsRetention">Relatórios (meses)</Label>
                    <Input id="reportsRetention" type="number" defaultValue={systemSettings.dataRetention.reports} />
                  </div>
                  <div>
                    <Label htmlFor="backupFrequency">Frequência de Backup</Label>
                    <Select defaultValue={systemSettings.dataRetention.backupFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>Configurações de segurança e acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Autenticação */}
              <div>
                <h3 className="text-lg font-medium mb-4">Autenticação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">Exigir 2FA para todos os usuários</p>
                    </div>
                    <Switch defaultChecked={systemSettings.security.twoFactorAuth} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="passwordExpiry">Expiração de Senha (dias)</Label>
                      <Input id="passwordExpiry" type="number" defaultValue={systemSettings.security.passwordExpiry} />
                    </div>
                    <div>
                      <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                      <Input id="sessionTimeout" type="number" defaultValue={systemSettings.security.sessionTimeout} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controle de Acesso */}
              <div>
                <h3 className="text-lg font-medium mb-4">Controle de Acesso</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Restrição por IP</Label>
                      <p className="text-sm text-muted-foreground">Permitir acesso apenas de IPs autorizados</p>
                    </div>
                    <Switch defaultChecked={systemSettings.security.ipRestriction} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Log de Auditoria</Label>
                      <p className="text-sm text-muted-foreground">Registrar todas as ações dos usuários</p>
                    </div>
                    <Switch defaultChecked={systemSettings.security.auditLog} />
                  </div>
                </div>
              </div>

              {/* Políticas de Senha */}
              <div>
                <h3 className="text-lg font-medium mb-4">Política de Senhas</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minPasswordLength">Tamanho Mínimo</Label>
                      <Input id="minPasswordLength" type="number" defaultValue="8" />
                    </div>
                    <div>
                      <Label htmlFor="passwordComplexity">Complexidade</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baixa</SelectItem>
                          <SelectItem value="medium">Média</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="requireUppercase" defaultChecked />
                      <Label htmlFor="requireUppercase">Exigir letras maiúsculas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="requireNumbers" defaultChecked />
                      <Label htmlFor="requireNumbers">Exigir números</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="requireSpecialChars" defaultChecked />
                      <Label htmlFor="requireSpecialChars">Exigir caracteres especiais</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Integrações
              </CardTitle>
              <CardDescription>Configure integrações com sistemas externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Integrações de Saúde */}
              <div>
                <h3 className="text-lg font-medium mb-4">Dispositivos e Saúde</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Wearables</h4>
                        <p className="text-sm text-muted-foreground">Apple Watch, Fitbit, Garmin</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Database className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Planos de Saúde</h4>
                        <p className="text-sm text-muted-foreground">Unimed, Bradesco Saúde, SulAmérica</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Sistemas de RH</h4>
                        <p className="text-sm text-muted-foreground">SAP, Oracle HCM, Workday</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrações de Comunicação */}
              <div>
                <h3 className="text-lg font-medium mb-4">Comunicação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Provedor de E-mail</h4>
                        <p className="text-sm text-muted-foreground">SendGrid</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">Conectado</Badge>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Provedor de SMS</h4>
                        <p className="text-sm text-muted-foreground">Twilio</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Inativo</Badge>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* APIs e Webhooks */}
              <div>
                <h3 className="text-lg font-medium mb-4">APIs e Webhooks</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Chave da API</h4>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerar
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value="uk_live_1234567890abcdef1234567890abcdef"
                        readOnly
                      />
                      <Button variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Webhooks</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Alertas de Saúde</span>
                        <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Relatórios Gerados</span>
                        <Badge variant="outline">Inativo</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Novos Usuários</span>
                        <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup e Recuperação
              </CardTitle>
              <CardDescription>Gerencie backups e recuperação de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status do Backup */}
              <div>
                <h3 className="text-lg font-medium mb-4">Status dos Backups</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Último Backup</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Hoje às 03:00</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Backup completo realizado</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Próximo Backup</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Amanhã às 03:00</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Backup automático agendado</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Tamanho Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.4 GB</div>
                      <p className="text-xs text-muted-foreground">Todos os backups</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Histórico de Backups */}
              <div>
                <h3 className="text-lg font-medium mb-4">Histórico de Backups</h3>
                <div className="space-y-3">
                  {[
                    { date: "2024-01-15", time: "03:00", type: "Completo", size: "2.4 GB", status: "Sucesso" },
                    { date: "2024-01-14", time: "03:00", type: "Incremental", size: "156 MB", status: "Sucesso" },
                    { date: "2024-01-13", time: "03:00", type: "Incremental", size: "203 MB", status: "Sucesso" },
                    { date: "2024-01-12", time: "03:00", type: "Incremental", size: "89 MB", status: "Falha" },
                    { date: "2024-01-11", time: "03:00", type: "Incremental", size: "167 MB", status: "Sucesso" },
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${backup.status === "Sucesso" ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <div>
                          <p className="font-medium">
                            {backup.date} às {backup.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {backup.type} • {backup.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={backup.status === "Sucesso" ? "default" : "destructive"}>{backup.status}</Badge>
                        {backup.status === "Sucesso" && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configurações de Backup */}
              <div>
                <h3 className="text-lg font-medium mb-4">Configurações de Backup</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="backupFrequency">Frequência</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diário</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="backupTime">Horário</Label>
                      <Input id="backupTime" type="time" defaultValue="03:00" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="retentionPeriod">Período de Retenção (dias)</Label>
                    <Input id="retentionPeriod" type="number" defaultValue="30" />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipos de Dados para Backup</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backupHealthData" defaultChecked />
                        <Label htmlFor="backupHealthData">Dados de Saúde</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backupUserData" defaultChecked />
                        <Label htmlFor="backupUserData">Dados de Usuários</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backupReports" defaultChecked />
                        <Label htmlFor="backupReports">Relatórios</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backupSettings" defaultChecked />
                        <Label htmlFor="backupSettings">Configurações</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ações de Backup */}
              <div className="flex justify-between">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Restaurar Backup
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Backup Manual
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
