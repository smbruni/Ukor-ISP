"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import {
  BarChart3,
  Users,
  Heart,
  Database,
  FileText,
  Settings,
  HelpCircle,
  Shield,
  Stethoscope,
  Brain,
  Download,
  LayoutDashboard,
  TrendingUp,
  Gift,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  children?: MenuItem[]
  badge?: string
}

const menuItems: MenuItem[] = [
  {
    id: "analytics",
    label: "Analytics & Insights",
    icon: BarChart3,
    children: [
      { id: "dashboard", label: "Dashboard Executivo", icon: BarChart3 },
      { id: "unimed-analysis", label: "Análise Unimed", icon: LayoutDashboard },
      { id: "care-lines", label: "Linhas de Cuidado", icon: Heart },
      { id: "analytics", label: "Analytics Preditivo", icon: Brain },
      { id: "ukor-insight-decoder", label: "Ukor Insight Decoder", icon: Brain, badge: "Assessment" },
      { id: "isp", label: "ISP - Índice Saúde Performance", icon: TrendingUp },
    ],
  },
  {
    id: "management",
    label: "Gestão & Operações",
    icon: Users,
    children: [
      { id: "roi", label: "ROI & Impacto", icon: LayoutDashboard },
      { id: "questionnaires", label: "Questionários", icon: FileText },
      { id: "data", label: "Gestão de Dados", icon: Database },
      { id: "benefits", label: "Benefícios", icon: Gift },
      { id: "wellness", label: "Programas Wellness", icon: Heart },
      { id: "sinistralidade", label: "Redução Sinistralidade", icon: Shield },
      { id: "export", label: "Exportar Dados", icon: Download },
    ],
  },
  {
    id: "system",
    label: "Sistema & Suporte",
    icon: Settings,
    children: [
      { id: "care", label: "Gestão de Cuidados", icon: Stethoscope },
      { id: "settings", label: "Configurações", icon: Settings },
      { id: "help", label: "Ajuda", icon: HelpCircle },
    ],
  },
]

export function Sidebar({ activeSection, onSectionChange, collapsed, onToggleCollapse }: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["analytics", "management", "system"])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const isGroupExpanded = (groupId: string) => expandedGroups.includes(groupId)

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">UKor</h1>
              <p className="text-xs text-red-600 font-medium">v168 - Dados Reais Unimed-BH</p>
            </div>
          </div>
        )}
        <button onClick={onToggleCollapse} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((group) => (
            <div key={group.id} className="space-y-1">
              {/* Group Header */}
              <button
                onClick={() => !collapsed && toggleGroup(group.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <group.icon className="h-5 w-5 text-gray-600" />
                  {!collapsed && <span className="text-sm font-medium text-gray-700">{group.label}</span>}
                </div>
                {!collapsed && group.children && (
                  <div className="flex-shrink-0">
                    {isGroupExpanded(group.id) ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                )}
              </button>

              {/* Group Items */}
              {group.children && (isGroupExpanded(group.id) || collapsed) && (
                <div className={`space-y-1 ${collapsed ? "" : "ml-4"}`}>
                  {group.children.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSectionChange(item.id)}
                      className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } ${collapsed ? "justify-center" : ""}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="text-sm font-medium truncate">
                          {item.label}
                          {item.badge && (
                            <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        {!collapsed && (
          <div className="text-xs text-gray-500 text-center">
            <p>UKor Health Analytics</p>
            <p>v168 - Deployed</p>
          </div>
        )}
      </div>
    </div>
  )
}
