"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, BarChart3, PieChart, LineChart } from "lucide-react"

export function ROIContent() {
  const [period, setPeriod] = useState("6m")
  const [department, setDepartment] = useState("all")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ROI em Saúde</h2>
        <p className="text-muted-foreground">Análise de retorno sobre investimento em saúde corporativa</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ti">Tecnologia</SelectItem>
              <SelectItem value="rh">Recursos Humanos</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="operacoes">Operações</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">340%</div>
            <p className="text-xs text-muted-foreground">+12% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 720K</div>
            <p className="text-xs text-muted-foreground">Período de 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retorno Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.4M</div>
            <p className="text-xs text-muted-foreground">+18% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retorno Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 410K</div>
            <p className="text-xs text-muted-foreground">Média mensal</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="detailed">Análise Detalhada</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do ROI</CardTitle>
                <CardDescription>Comparativo entre investimento e retorno</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mb-2" />
                  <p>Gráfico de Evolução do ROI</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Impactos</CardTitle>
                <CardDescription>Áreas mais impactadas pelo programa</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <PieChart className="h-16 w-16 mb-2" />
                  <p>Gráfico de Distribuição de Impactos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Principais Indicadores</CardTitle>
              <CardDescription>Métricas de impacto financeiro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Redução de Absenteísmo</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Aumento de Produtividade</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Redução de Turnover</span>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Redução de Sinistralidade</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada por Departamento</CardTitle>
              <CardDescription>Comparativo de ROI entre departamentos</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mb-2" />
                <p>Gráfico de Análise Detalhada por Departamento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>Projeções Futuras</CardTitle>
              <CardDescription>Estimativa de ROI para os próximos 12 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center text-muted-foreground">
                <LineChart className="h-16 w-16 mb-2" />
                <p>Gráfico de Projeções Futuras</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
