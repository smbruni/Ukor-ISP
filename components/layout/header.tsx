"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Bell, Settings, User, LogOut, Moon, Sun, Download, Filter, Calendar, Clock } from "lucide-react"
import { useTheme } from "next-themes"

interface HeaderProps {
  notifications: any[]
  onClearNotifications: () => void
}

export function Header({ notifications, onClearNotifications }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar colaboradores, departamentos, métricas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border focus:border-primary"
            />
          </div>
          <Button variant="outline" size="sm" className="ukor-button-outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <Button variant="outline" size="sm" className="ukor-button-outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>

          <Button variant="outline" size="sm" className="ukor-button-outline">
            <Calendar className="h-4 w-4 mr-2" />
            Período
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Notificações</h4>
                <Button variant="ghost" size="sm" onClick={onClearNotifications}>
                  Limpar todas
                </Button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhuma notificação</p>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 rounded-lg border border-border hover:bg-muted cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === "warning"
                              ? "bg-amber-500"
                              : notification.type === "success"
                                ? "bg-emerald-500"
                                : "bg-primary"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@ukor.com.br</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
