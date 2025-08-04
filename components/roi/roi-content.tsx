"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Calculator, Target, BarChart3, PieChart, LineChart, ArrowUpRight } from "lucide-react"

export function RoiContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ROI & Economia</h1>
          <p className="text-gray-600 mt-1">Análise de retorno sobre investimento e economia gerada</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            ROI: 195%
          </Badge>
          <Badge variant="outline">Atualizado há 1h</Badge>
        </div>
      </div>

      {/* ROI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Total</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">195%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +15%
              </span>{" "}
              vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.1M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+8.5%</span> vs planejado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia Gerada</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 4.1M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +23%
              </span>{" "}
              vs projeção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payback</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8.2 meses</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-1.3 meses</span> vs projeção
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="programs">Por Programa</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
          <TabsTrigger value="analysis">Análise Detalhada</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Evolução do ROI
                </CardTitle>
                <CardDescription>Últimos 12 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Jan 2024</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-sm font-medium">170%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fev 2024</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                      <span className="text-sm font-medium">180%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mar 2024</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                      <span className="text-sm font-medium">190%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Abr 2024</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                      <span className="text-sm font-bold text-green-600">195%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribuição de Investimentos
                </CardTitle>
                <CardDescription>Alocação por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Programas Wellness</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">R$ 680K (32%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tecnologia & Analytics</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">R$ 520K (25%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Prevenção & Check-ups</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium">R$ 420K (20%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gestão de Cuidados</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">R$ 310K (15%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Outros</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-sm font-medium">R$ 170K (8%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Principais Fontes de Economia</CardTitle>
              <CardDescription>Onde estamos gerando mais valor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Redução de Internações</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">R$ 1.8M</div>
                  <p className="text-sm text-muted-foreground">-23% internações evitáveis</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Medicina Preventiva</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">R$ 1.2M</div>
                  <p className="text-sm text-muted-foreground">+45% adesão check-ups</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Otimização de Processos</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">R$ 1.1M</div>
                  <p className="text-sm text-muted-foreground">Automação e eficiência</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ROI por Programa</CardTitle>
                <CardDescription>Performance individual de cada iniciativa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">Programa de Prevenção Cardiovascular</h4>
                      <p className="text-sm text-muted-foreground">Investimento: R$ 280K</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">245%</div>
                      <p className="text-sm text-muted-foreground">Economia: R$ 686K</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">Check-ups Preventivos</h4>
                      <p className="text-sm text-muted-foreground">Investimento: R$ 420K</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">220%</div>
                      <p className="text-sm text-muted-foreground">Economia: R$ 924K</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">Programa Wellness Corporativo</h4>
                      <p className="text-sm text-muted-foreground">Investimento: R$ 680K</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">185%</div>
                      <p className="text-sm text-muted-foreground">Economia: R$ 1.26M</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">Gestão de Doenças Crônicas</h4>
                      <p className="text-sm text-muted-foreground">Investimento: R$ 310K</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">195%</div>
                      <p className="text-sm text-muted-foreground">Economia: R$ 605K</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">Plataforma de Analytics</h4>
                      <p className="text-sm text-muted-foreground">Investimento: R$ 520K</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">165%</div>
                      <p className="text-sm text-muted-foreground">Economia: R$ 858K</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Projeção ROI 2024-2027
                </CardTitle>
                <CardDescription>Estimativas baseadas em tendências atuais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">2024 (Atual)</p>
                      <p className="text-sm text-muted-foreground">ROI: 195%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">R$ 4.1M</p>
                      <p className="text-sm text-muted-foreground">economia</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">2025 (Projeção)</p>
                      <p className="text-sm text-muted-foreground">ROI: 225%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">R$ 5.4M</p>
                      <p className="text-sm text-muted-foreground">economia</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">2026 (Projeção)</p>
                      <p className="text-sm text-muted-foreground">ROI: 250%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">R$ 6.8M</p>
                      <p className="text-sm text-muted-foreground">economia</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">2027 (Projeção)</p>
                      <p className="text-sm text-muted-foreground">ROI: 275%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">R$ 8.2M</p>
                      <p className="text-sm text-muted-foreground">economia</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fatores de Crescimento</CardTitle>
                <CardDescription>Principais drivers do ROI futuro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Expansão Programas Preventivos</span>
                    <span className="font-medium text-green-600">+15% ROI</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Otimização por IA</span>
                    <span className="font-medium text-blue-600">+12% ROI</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Aumento Adesão Colaboradores</span>
                    <span className="font-medium text-purple-600">+10% ROI</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Redução Custos Operacionais</span>
                    <span className="font-medium text-orange-600">+8% ROI</span>
                  </div>
                  <Progress value={55} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise Detalhada de ROI</CardTitle>
                <CardDescription>Breakdown completo dos resultados financeiros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-lg">Investimentos (R$ 2.1M)</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Tecnologia e Plataformas</span>
                        <span className="text-sm font-medium">R$ 520K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Programas Wellness</span>
                        <span className="text-sm font-medium">R$ 680K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Check-ups e Prevenção</span>
                        <span className="text-sm font-medium">R$ 420K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Gestão de Cuidados</span>
                        <span className="text-sm font-medium">R$ 310K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Treinamento e Capacitação</span>
                        <span className="text-sm font-medium">R$ 170K</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-lg">Economia Gerada (R$ 4.1M)</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Redução Internações</span>
                        <span className="text-sm font-medium text-green-600">R$ 1.8M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Medicina Preventiva</span>
                        <span className="text-sm font-medium text-green-600">R$ 1.2M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Otimização Processos</span>
                        <span className="text-sm font-medium text-green-600">R$ 1.1M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Performance</CardTitle>
                <CardDescription>Indicadores chave de sucesso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">8.2</div>
                    <p className="text-sm text-muted-foreground">meses para payback</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">195%</div>
                    <p className="text-sm text-muted-foreground">ROI atual</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">275%</div>
                    <p className="text-sm text-muted-foreground">ROI projetado 2027</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
