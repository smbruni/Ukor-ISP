"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Download, FileText, BarChart3, CalendarIcon, Settings, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function ExportData() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [exportFormat, setExportFormat] = useState("excel")
  const [exportStatus, setExportStatus] = useState<"idle" | "processing" | "completed">("idle")

  const availableReports = [
    {
      id: "dashboard",
      name: "Dashboard Executivo",
      description: "Métricas principais e KPIs",
      size: "2.3 MB",
      lastUpdate: "Hoje, 14:30",
      category: "Executivo",
    },
    {
      id: "sinistralidade",
      name: "Relatório de Sinistralidade",
      description: "Análise detalhada de custos médicos",
      size: "5.1 MB",
      lastUpdate: "Hoje, 12:15",
      category: "Financeiro",
    },
    {
      id: "care-lines",
      name: "Linhas de Cuidado",
      description: "Performance dos programas de saúde",
      size: "3.7 MB",
      lastUpdate: "Ontem, 18:45",
      category: "Clínico",
    },
    {
      id: "predictive",
      name: "Análises Preditivas",
      description: "Modelos de IA e previsões",
      size: "4.2 MB",
      lastUpdate: "Hoje, 09:20",
      category: "Analytics",
    },
    {
      id: "performance",
      name: "Avaliação de Desempenho",
      description: "Métricas de performance individual",
      size: "6.8 MB",
      lastUpdate: "Hoje, 16:10",
      category: "RH",
    },
    {
      id: "benefits",
      name: "Análise de Benefícios",
      description: "ROI e utilização de benefícios",
      size: "2.9 MB",
      lastUpdate: "Hoje, 11:30",
      category: "Financeiro",
    },
  ]

  const exportHistory = [
    {
      id: 1,
      name: "Dashboard Executivo - Março 2024",
      date: "20/03/2024 15:30",
      format: "Excel",
      status: "completed",
      size: "2.1 MB",
    },
    {
      id: 2,
      name: "Relatório Completo - Q1 2024",
      date: "18/03/2024 10:15",
      format: "PDF",
      status: "completed",
      size: "12.3 MB",
    },
    {
      id: 3,
      name: "Análise Preditiva - Fevereiro",
      date: "15/03/2024 14:20",
      format: "CSV",
      status: "processing",
      size: "4.7 MB",
    },
  ]

  const handleReportSelection = (reportId: string) => {
    setSelectedReports((prev) => (prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]))
  }

  const handleExport = () => {
    setExportStatus("processing")
    // Simular processamento
    setTimeout(() => {
      setExportStatus("completed")
      setTimeout(() => setExportStatus("idle"), 3000)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Executivo":
        return "bg-purple-100 text-purple-800"
      case "Financeiro":
        return "bg-green-100 text-green-800"
      case "Clínico":
        return "bg-blue-100 text-blue-800"
      case "Analytics":
        return "bg-orange-100 text-orange-800"
      case "RH":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exportar Dados</h1>
          <p className="text-gray-600 mt-1">Gere relatórios personalizados e exporte dados do sistema</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Novo
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seleção de Relatórios */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Selecionar Relatórios
              </CardTitle>
              <CardDescription>Escolha os relatórios que deseja exportar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableReports.map((report) => (
                  <div
                    key={report.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedReports.includes(report.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleReportSelection(report.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox checked={selectedReports.includes(report.id)} onChange={() => {}} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{report.name}</h3>
                          <Badge className={getCategoryColor(report.category)}>{report.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Tamanho: {report.size}</span>
                          <span>Atualizado: {report.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configurações de Exportação */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Formato */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Formato de Exportação</label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Período */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Período</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                            {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                          </>
                        ) : (
                          format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                        )
                      ) : (
                        "Selecionar período"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Botão de Exportação */}
              <Button
                onClick={handleExport}
                disabled={selectedReports.length === 0 || exportStatus === "processing"}
                className="w-full"
              >
                {exportStatus === "processing" ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : exportStatus === "completed" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Exportado!
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar ({selectedReports.length})
                  </>
                )}
              </Button>

              {selectedReports.length > 0 && (
                <div className="text-sm text-gray-600">
                  <p>Relatórios selecionados: {selectedReports.length}</p>
                  <p>Tamanho estimado: {(selectedReports.length * 3.5).toFixed(1)} MB</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Histórico de Exportações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Histórico
              </CardTitle>
              <CardDescription>Exportações recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {exportHistory.map((export_) => (
                  <div key={export_.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(export_.status)}
                      <div>
                        <div className="font-medium text-sm">{export_.name}</div>
                        <div className="text-xs text-gray-600">{export_.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-600">{export_.format}</div>
                      <div className="text-xs text-gray-500">{export_.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
