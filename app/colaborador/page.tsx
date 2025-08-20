"use client"

import { useState } from "react"
import {
  Heart,
  Activity,
  Target,
  Bell,
  Settings,
  HelpCircle,
  BarChart3,
  Stethoscope,
  Shield,
  Menu,
  X,
  Home,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"

import { ColaboradorDashboard } from "@/components/colaborador/colaborador-dashboard"
import { MinhaSaude } from "@/components/colaborador/minha-saude"
import { MeusProgramas } from "@/components/colaborador/meus-programas"
import { MinhasAnalises } from "@/components/colaborador/minhas-analises"
import { MeusBeneficios } from "@/components/colaborador/meus-beneficios"
import { MeusExames } from "@/components/colaborador/meus-exames"
import { ConfiguracoesPessoais } from "@/components/colaborador/configuracoes-pessoais"

// Dados mockados do colaborador
const colaboradorData = {
  id: "COL001",
  nome: "Ana Paula Silva",
  cargo: "Analista de Marketing",
  departamento: "Marketing",
  dataAdmissao: "2022-03-15",
  email: "ana.silva@empresa.com",
  telefone: "(11) 99999-9999",
  avatar: "/placeholder.svg?height=100&width=100&text=APS",
  healthScore: 7.8,
  riskLevel: "Baixo",
  nextAppointment: "2024-04-25",
  activePrograms: 3,
  completedPrograms: 2,
}

function MobileHeader({ colaborador, notifications, onMenuClick }) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-2">
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">UHealth</h1>
            <p className="text-xs text-gray-500">Minha Saúde</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={colaborador.avatar || "/placeholder.svg"} alt={colaborador.nome} />
            <AvatarFallback>
              {colaborador.nome
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

function MobileSidebar({ activeSection, onSectionChange, colaborador, isOpen, onClose }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Início",
      icon: Home,
      badge: null,
      description: "Visão geral da minha saúde",
    },
    {
      id: "minha-saude",
      label: "Minha Saúde",
      icon: Heart,
      badge: "7.8",
      description: "Indicadores pessoais de saúde",
    },
    {
      id: "minhas-analises",
      label: "Minhas Análises",
      icon: BarChart3,
      badge: "3",
      description: "Análises preditivas pessoais",
    },
    {
      id: "meus-programas",
      label: "Meus Programas",
      icon: Activity,
      badge: "5",
      description: "Programas de bem-estar ativos",
    },
    {
      id: "meus-exames",
      label: "Meus Exames",
      icon: Stethoscope,
      badge: "2",
      description: "Histórico de exames e consultas",
    },
    {
      id: "meus-beneficios",
      label: "Meus Benefícios",
      icon: Shield,
      badge: null,
      description: "Plano de saúde e benefícios",
    },
    {
      id: "metas",
      label: "Minhas Metas",
      icon: Target,
      badge: "4",
      description: "Objetivos de saúde e bem-estar",
    },
  ]

  const bottomItems = [
    {
      id: "configuracoes",
      label: "Configurações",
      icon: Settings,
      description: "Configurações pessoais",
    },
    {
      id: "ajuda",
      label: "Ajuda",
      icon: HelpCircle,
      description: "Suporte e FAQ",
    },
  ]

  const MenuItem = ({ item }) => {
    const isActive = activeSection === item.id

    return (
      <button
        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
          isActive ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => {
          onSectionChange(item.id)
          onClose()
        }}
      >
        <div className="flex items-center space-x-3">
          <item.icon className={`h-5 w-5 ${isActive ? "text-blue-700" : "text-gray-500"}`} />
          <div>
            <div className="font-medium">{item.label}</div>
            <div className="text-xs text-gray-500">{item.description}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {item.badge && (
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={`text-xs ${item.badge === "7.8" ? "bg-green-100 text-green-800 border-green-200" : ""}`}
            >
              {item.badge}
            </Badge>
          )}
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </button>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header do Sidebar */}
          <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarImage src={colaborador.avatar || "/placeholder.svg"} alt={colaborador.nome} />
                  <AvatarFallback className="bg-white text-blue-600">
                    {colaborador.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <h3 className="font-semibold">{colaborador.nome}</h3>
                  <p className="text-xs text-blue-100">{colaborador.cargo}</p>
                  <p className="text-xs text-blue-100">{colaborador.departamento}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-800">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Status de Saúde */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Health Score</div>
                <div className="text-2xl font-bold text-green-600">{colaborador.healthScore}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Risco</div>
                <Badge className="bg-green-100 text-green-800 border-green-200">{colaborador.riskLevel}</Badge>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <nav className="py-2">
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </nav>
          </div>

          {/* Bottom Items */}
          <div className="border-t bg-gray-50">
            <nav className="py-2">
              {bottomItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function ColaboradorApp() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Consulta Agendada",
      message: "Check-up preventivo em 25/04",
      timestamp: Date.now() - 3600000,
      read: false,
    },
    {
      id: 2,
      title: "Meta Atingida",
      message: "Parabéns! Você completou 10.000 passos hoje",
      timestamp: Date.now() - 7200000,
      read: false,
    },
    {
      id: 3,
      title: "Programa Disponível",
      message: "Novo programa de nutrição disponível",
      timestamp: Date.now() - 86400000,
      read: true,
    },
  ])

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <ColaboradorDashboard colaborador={colaboradorData} />
      case "minha-saude":
        return <MinhaSaude colaborador={colaboradorData} />
      case "minhas-analises":
        return <MinhasAnalises colaborador={colaboradorData} />
      case "meus-programas":
        return <MeusProgramas colaborador={colaboradorData} />
      case "meus-exames":
        return <MeusExames colaborador={colaboradorData} />
      case "meus-beneficios":
        return <MeusBeneficios colaborador={colaboradorData} />
      case "configuracoes":
        return <ConfiguracoesPessoais colaborador={colaboradorData} />
      default:
        return <ColaboradorDashboard colaborador={colaboradorData} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader
        colaborador={colaboradorData}
        notifications={notifications}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <MobileSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        colaborador={colaboradorData}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pb-20">{renderContent()}</main>

      {/* Bottom Navigation para acesso rápido */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { id: "dashboard", icon: Home, label: "Início" },
            { id: "minha-saude", icon: Heart, label: "Saúde" },
            { id: "meus-programas", icon: Activity, label: "Programas" },
            { id: "meus-exames", icon: Stethoscope, label: "Exames" },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeSection === item.id ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
