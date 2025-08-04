"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  TrendingUp,
  DollarSign,
  Heart,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  ArrowUpRight,
} from "lucide-react"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Executivo</h1>
          <p className="text-gray-600 mt-1">Visão geral da saúde corporativa e performance</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Sistema Online
          </Badge>
          <Badge variant="outline">Atualizado há 5min</Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +2.5%
              </span>{" "}
              vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Índice de Saúde</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +1.2%
              </span>{" "}
              vs trimestre anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia Gerada</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 2.1M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +18.7%
              </span>{" "}
              vs projeção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Programas</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">195%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +15%
              </span>{" "}
              vs meta anual
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="health">Saúde</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Distribuição por Faixa Etária
                </CardTitle>
                <CardDescription>Perfil demográfico dos colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">18-25 anos</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="text-sm font-medium">1,927</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">26-35 anos</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                      <span className="text-sm font-medium">4,496</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">36-45 anos</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <span className="text-sm font-medium">3,854</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">46-55 anos</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="text-sm font-medium">1,927</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">55+ anos</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                      <span className="text-sm font-medium">643</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Status de Saúde Geral
                </CardTitle>
                <CardDescription>Classificação por risco</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Baixo Risco
                    </span>
                    <span className="text-sm font-medium">8,462 (65.9%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      Risco Moderado
                    </span>
                    <span className="text-sm font-medium">3,213 (25.0%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      Alto Risco
                    </span>
                    <span className="text-sm font-medium">899 (7.0%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      Risco Crítico
                    </span>
                    <span className="text-sm font-medium">273 (2.1%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Principais Indicadores de Performance</CardTitle>
              <CardDescription>Métricas chave do último trimestre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Adesão Check-ups</span>
                    <span className="font-medium text-green-600">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground">Meta: 75%</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Participação Programas</span>
                    <span className="font-medium text-blue-600">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground">Meta: 60%</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Satisfação Geral</span>
                    <span className="font-medium text-purple-600">4.2/5</span>
                  </div>
                  <Progress value={84} className="h-2" />
                  <p className="text-xs text-muted-foreground">Meta: 4.0/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Condições Crônicas Prevalentes</CardTitle>
                <CardDescription>Top 5 condições identificadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Hipertensão</span>
                    <Badge variant="outline">1,247 casos</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Diabetes Tipo 2</span>
                    <Badge variant="outline">892 casos</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Obesidade</span>
                    <Badge variant="outline">1,156 casos</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Ansiedade/Depressão</span>
                    <Badge variant="outline">743 casos</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Dislipidemia</span>
                    <Badge variant="outline">634 casos</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Programas de Prevenção Ativos</CardTitle>
                <CardDescription>Status e participação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <span className="font-medium">Programa Cardiovascular</span>
                      <p className="text-sm text-muted-foreground">2,341 participantes</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Ativo</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <span className="font-medium">Controle de Diabetes</span>
                      <p className="text-sm text-muted-foreground">892 participantes</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Ativo</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div>
                      <span className="font-medium">Saúde Mental</span>
                      <p className="text-sm text-muted-foreground">1,567 participantes</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">Ativo</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Produtividade</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">+12.5%</div>
                <p className="text-sm text-muted-foreground">vs período anterior</p>
                <Progress value={85} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Absenteísmo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">-8.3%</div>
                <p className="text-sm text-muted-foreground">redução significativa</p>
                <Progress value={75} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Engajamento</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">87.2%</div>
                <p className="text-sm text-muted-foreground">índice de satisfação</p>
                <Progress value={87} className="mt-4" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-red-900">Alto Risco Cardiovascular</h4>
                    <p className="text-sm text-red-700 mt-1">
                      127 colaboradores identificados com risco elevado. Intervenção imediata recomendada.
                    </p>
                    <p className="text-xs text-red-600 mt-2">Há 2 horas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-yellow-900">Check-ups Pendentes</h4>
                    <p className="text-sm text-yellow-700 mt-1">1,247 colaboradores com check-ups anuais em atraso.</p>
                    <p className="text-xs text-yellow-600 mt-2">Há 4 horas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900">Meta Atingida</h4>
                    <p className="text-sm text-green-700 mt-1">Programa de vacinação atingiu 95% de cobertura.</p>
                    <p className="text-xs text-green-600 mt-2">Há 6 horas</p>
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
