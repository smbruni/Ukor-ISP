"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Calculator, Target, BarChart3, PieChart } from "lucide-react"

export function ROIContent() {
  const roiData = [
    { month: "Jan", investimento: 280000, economia: 420000, roi: 150 },
    { month: "Fev", investimento: 295000, economia: 465000, roi: 158 },
    { month: "Mar", investimento: 310000, economia: 520000, roi: 168 },
    { month: "Abr", investimento: 285000, economia: 485000, roi: 170 },
    { month: "Mai", investimento: 320000, economia: 580000, roi: 181 },
    { month: "Jun", investimento: 298000, economia: 545000, roi: 183 },
    { month: "Jul", investimento: 315000, economia: 610000, roi: 194 },
    { month: "Ago", investimento: 305000, economia: 595000, roi: 195 },
    { month: "Set", investimento: 325000, economia: 650000, roi: 200 },
    { month: "Out", investimento: 340000, economia: 720000, roi: 212 },
    { month: "Nov", investimento: 355000, economia: 780000, roi: 220 },
    { month: "Dez", investimento: 370000, economia: 850000, roi: 230 },
  ]

  const investmentAreas = [
    {
      area: "Programas de Prevenção",
      investimento: 1200000,
      economia: 2800000,
      roi: 233,
      impacto: "Redução de 35% em internações evitáveis",
      status: "excellent",
    },
    {
      area: "Gestão de Crônicos",
      investimento: 800000,
      economia: 1600000,
      roi: 200,
      impacto: "Controle de 89% dos casos de diabetes",
      status: "good",
    },
    {
      area: "Saúde Mental",
      investimento: 600000,
      economia: 1080000,
      roi: 180,
      impacto: "Redução de 42% em afastamentos por estresse",
      status: "good",
    },
    {
      area: "Telemedicina",
      investimento: 400000,
      economia: 640000,
      roi: 160,
      impacto: "28% das consultas realizadas remotamente",
      status: "attention",
    },
    {
      area: "Programas de Bem-estar",
      investimento: 500000,
      economia: 750000,
      roi: 150,
      impacto: "Melhoria de 25% no engajamento",
      status: "attention",
    },
  ]

  const projectedROI = [
    { year: "2024", atual: 195, projetado: 195 },
    { year: "2025", atual: null, projetado: 245 },
    { year: "2026", atual: null, projetado: 280 },
    { year: "2027", atual: null, projetado: 320 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "border-l-green-500 bg-green-50"
      case "good":
        return "border-l-blue-500 bg-blue-50"
      case "attention":
        return "border-l-yellow-500 bg-yellow-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ROI em Saúde</h1>
          <p className="text-gray-600">Análise do retorno sobre investimento em programas de saúde corporativa</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            ROI Atual: 195%
          </Badge>
          <Button>
            <Calculator className="h-4 w-4 mr-2" />
            Calculadora ROI
          </Button>
        </div>
      </div>

      {/* ROI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ROI Total</p>
                <p className="text-2xl font-bold text-green-600">195%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+15% vs ano anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Investimento Total</p>
                <p className="text-2xl font-bold text-gray-900">R$ 3.5M</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-blue-600">+8% vs planejado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Economia Gerada</p>
                <p className="text-2xl font-bold text-purple-600">R$ 6.8M</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-purple-600">+22% vs meta</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Payback Period</p>
                <p className="text-2xl font-bold text-orange-600">8.2 meses</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-orange-600">-2.1 meses vs meta</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Areas Analysis */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Análise por Área de Investimento</h2>
            <Button variant="outline" size="sm">
              <PieChart className="h-4 w-4 mr-2" />
              Ver Gráfico
            </Button>
          </div>
          <div className="space-y-4">
            {investmentAreas.map((area, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${getStatusColor(area.status)}`}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">{area.area}</h3>
                    <p className="text-sm text-gray-600">{area.impacto}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Investimento</p>
                    <p className="font-semibold">{formatCurrency(area.investimento)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Economia</p>
                    <p className="font-semibold text-green-600">{formatCurrency(area.economia)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">ROI</p>
                    <p className="font-semibold text-blue-600">{area.roi}%</p>
                  </div>
                  <div className="text-center">
                    <Badge
                      variant={
                        area.status === "excellent" ? "default" : area.status === "good" ? "secondary" : "outline"
                      }
                      className={
                        area.status === "excellent"
                          ? "bg-green-100 text-green-800"
                          : area.status === "good"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {area.status === "excellent" ? "Excelente" : area.status === "good" ? "Bom" : "Atenção"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Projection */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Projeção de ROI</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {projectedROI.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">{item.year}</p>
                {item.atual ? (
                  <div>
                    <p className="text-2xl font-bold text-green-600">{item.atual}%</p>
                    <p className="text-xs text-gray-500">Atual</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{item.projetado}%</p>
                    <p className="text-xs text-gray-500">Projetado</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly ROI Trend */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Evolução Mensal do ROI</h2>
          <div className="space-y-3">
            {roiData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900 w-12">{item.month}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-sm text-gray-600">Investimento: </span>
                        <span className="font-medium">{formatCurrency(item.investimento)}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Economia: </span>
                        <span className="font-medium text-green-600">{formatCurrency(item.economia)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{item.roi}%</p>
                  <p className="text-xs text-gray-500">ROI</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
