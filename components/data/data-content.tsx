"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  BarChart3,
  FileText,
  Activity,
  Shield,
} from "lucide-react"

export function DataContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Dados</h1>
          <p className="text-gray-600 mt-1">Monitoramento e análise de qualidade dos dados corporativos</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">5 Fontes Ativas</Badge>
          <Badge variant="secondary">Última sincronização: há 5 min</Badge>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Unimed-BH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Online</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">2.847 registros</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-500" />
              RH System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Online</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">2.847 colaboradores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-500" />
              Wellness App
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-600">Sincronizando</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">2.078 usuários ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" />
              Financeiro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Online</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Custos atualizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-500" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Online</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Processando dados</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="quality" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quality">Qualidade</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="export">Exportar</TabsTrigger>
        </TabsList>

        <TabsContent value="quality" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Qualidade dos Dados</CardTitle>
                <CardDescription>Métricas de integridade e completude</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completude dos Dados</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Consistência</span>
                    <span className="font-medium">97.8%</span>
                  </div>
                  <Progress value={97.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Atualização</span>
                    <span className="font-medium">91.5%</span>
                  </div>
                  <Progress value={91.5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Validação</span>
                    <span className="font-medium">98.9%</span>
                  </div>
                  <Progress value={98.9} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas de Qualidade</CardTitle>
                <CardDescription>Problemas identificados nos dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-700">Dados duplicados</p>
                    <p className="text-xs text-red-600">47 registros duplicados encontrados</p>
                  </div>
                  <Badge variant="destructive">Crítico</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-700">Dados desatualizados</p>
                    <p className="text-xs text-orange-600">156 registros com mais de 30 dias</p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    Médio
                  </Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-700">Campos incompletos</p>
                    <p className="text-xs text-yellow-600">23 registros com campos obrigatórios vazios</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    Baixo
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">847.293</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.3%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Processamento Diário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.847</div>
                <p className="text-xs text-muted-foreground">registros/dia em média</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Erro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">0.12%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">-0.05%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2s</div>
                <p className="text-xs text-muted-foreground">tempo médio de consulta</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Volume de Dados por Fonte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Unimed-BH</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">342.1K (40.4%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">RH System</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">198.7K (23.5%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wellness App</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium">156.2K (18.4%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Financeiro</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">89.4K (10.6%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Analytics</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                      <span className="text-sm font-medium">60.8K (7.1%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Network I/O</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Disponíveis</CardTitle>
                <CardDescription>Relatórios pré-configurados para download</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Relatório de Qualidade Mensal</p>
                    <p className="text-sm text-muted-foreground">Análise completa da qualidade dos dados</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Dashboard Executivo</p>
                    <p className="text-sm text-muted-foreground">KPIs e métricas principais</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Análise de Performance</p>
                    <p className="text-sm text-muted-foreground">Performance do sistema e APIs</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Relatório de Integração</p>
                    <p className="text-sm text-muted-foreground">Status das integrações e APIs</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Relatórios</CardTitle>
                <CardDescription>Relatórios gerados recentemente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Relatório Mensal - Janeiro 2024</p>
                    <p className="text-sm text-muted-foreground">Gerado em 01/02/2024</p>
                  </div>
                  <Badge variant="secondary">Concluído</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Dashboard Semanal - Sem 5</p>
                    <p className="text-sm text-muted-foreground">Gerado em 29/01/2024</p>
                  </div>
                  <Badge variant="secondary">Concluído</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Análise Trimestral - Q4 2023</p>
                    <p className="text-sm text-muted-foreground">Gerado em 15/01/2024</p>
                  </div>
                  <Badge variant="secondary">Concluído</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Exportação de Dados</CardTitle>
                <CardDescription>Exporte dados em diferentes formatos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">CSV</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">Excel</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">JSON</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <Database className="h-6 w-6" />
                    <span className="text-sm">SQL</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Exportação</CardTitle>
                <CardDescription>Personalize sua exportação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Último mês</option>
                    <option>Últimos 3 meses</option>
                    <option>Último ano</option>
                    <option>Personalizado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fonte de Dados</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Todas as fontes</option>
                    <option>Unimed-BH</option>
                    <option>RH System</option>
                    <option>Wellness App</option>
                    <option>Financeiro</option>
                  </select>
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Dados
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
