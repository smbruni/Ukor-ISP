"use client"

import { useState } from "react"
import {
  Download,
  FileText,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  LineChart,
  PieChart,
  Users,
  Heart,
  AlertTriangle,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

export function ExportPreview() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 8

  // Dados simulados para o relatório
  const lossRatioData = [
    { month: "Jun/24", actual: 171.05, target: 75, market: 85 },
    { month: "Jul/24", actual: 86.21, target: 75, market: 83 },
    { month: "Ago/24", actual: 72.33, target: 75, market: 84 },
    { month: "Set/24", actual: 121.9, target: 75, market: 86 },
    { month: "Out/24", actual: 88.33, target: 75, market: 85 },
    { month: "Nov/24", actual: 85.9, target: 75, market: 87 },
    { month: "Dez/24", actual: 231.61, target: 75, market: 90 },
    { month: "Jan/25", actual: 158.66, target: 75, market: 88 },
    { month: "Fev/25", actual: 140.91, target: 75, market: 86 },
    { month: "Mar/25", actual: 77.39, target: 75, market: 84 },
    { month: "Abr/25", actual: 103.84, target: 75, market: 83 },
    { month: "Mai/25", actual: 51.75, target: 75, market: 82 },
  ]

  // Dados de utilização por categoria
  const utilizationByCategory = [
    { name: "Consultas", value: 45, cost: 125000, color: "#0088FE" },
    { name: "Exames", value: 30, cost: 89000, color: "#00C49F" },
    { name: "Internações", value: 15, cost: 1346000, color: "#FF8042" },
    { name: "Medicamentos", value: 25, cost: 67000, color: "#FFBB28" },
    { name: "Oncologia", value: 5, cost: 406000, color: "#8884D8" },
  ]

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Barra de ferramentas do relatório */}
      <div className="bg-muted/50 border-b p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Conteúdo do relatório */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        {currentPage === 1 && (
          <div className="space-y-6">
            {/* Cabeçalho do Relatório */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">U</span>
                    </div>
                    <h1 className="text-2xl font-bold">Ukor Health Analytics</h1>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Relatório de Sinistralidade</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-white border-white">
                      Unimed
                    </Badge>
                    <span>•</span>
                    <p>Empresa ABC Ltda</p>
                    <span>•</span>
                    <p>Junho/2024 a Maio/2025</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Gerado em: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sumário Executivo */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                Sumário Executivo
              </h2>

              {/* Alerta de Sinistralidade */}
              <Card className="mb-6 border-l-4 border-l-red-500 bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                    Alerta de Sinistralidade Crítica
                  </CardTitle>
                  <CardDescription className="text-red-700">
                    A sinistralidade acumulada de 110.04% está significativamente acima da meta de 75%, resultando em um
                    reajuste aplicado de 25% (mercado: 18%)
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* KPIs Principais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <LineChart className="h-4 w-4 mr-2 text-muted-foreground" />
                      Sinistralidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">110.04%</div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Meta: 75%</p>
                      <div className="flex items-center text-xs text-red-500">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>+35.04%</span>
                      </div>
                    </div>
                    <Progress value={(75 / 110.04) * 100} className="h-1 mt-2" indicatorClassName="bg-red-500" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      Beneficiários
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">987</div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">957 utilizaram</p>
                      <div className="flex items-center text-xs text-amber-500">
                        <span>97% utilização</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                      Casos Críticos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">10</div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">4 casos oncológicos</p>
                      <div className="flex items-center text-xs text-red-500">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>42% do custo</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Gráfico de Sinistralidade */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                  Evolução da Sinistralidade
                </CardTitle>
                <CardDescription>Sinistralidade mensal vs meta e média do mercado</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={lossRatioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 250]} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Sinistralidade Atual"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#22c55e"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Meta"
                    />
                    <Line
                      type="monotone"
                      dataKey="market"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      name="Média do Mercado"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Utilização por Categoria */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-blue-600" />
                  Utilização por Categoria
                </CardTitle>
                <CardDescription>Distribuição dos custos por tipo de serviço</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={utilizationByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="cost"
                    >
                      {utilizationByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`R$ ${(value / 1000).toFixed(0)}K`, ""]} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {currentPage === 2 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
              <h3 className="text-lg font-medium mt-4">Página 2: Análise Detalhada</h3>
              <p className="text-muted-foreground mt-2">
                Esta é uma prévia do relatório. O relatório completo incluirá análises detalhadas.
              </p>
            </div>
          </div>
        )}

        {currentPage > 2 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
              <h3 className="text-lg font-medium mt-4">Página {currentPage}</h3>
              <p className="text-muted-foreground mt-2">
                Esta é uma prévia do relatório. O relatório completo incluirá mais seções.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé do relatório */}
      <div className="bg-muted/50 border-t p-3 flex items-center justify-between text-xs text-muted-foreground">
        <div>Ukor Health Analytics • Relatório de Sinistralidade</div>
        <div>
          Página {currentPage} de {totalPages}
        </div>
      </div>
    </div>
  )
}
