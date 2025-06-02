"use client"

import { useState } from "react"
import {
  Upload,
  FileText,
  Activity,
  Database,
  Heart,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Eye,
  Trash2,
  Plus,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function DataContent() {
  const [selectedTab, setSelectedTab] = useState("health-data")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Dados simulados para os gráficos
  const healthMetricsData = [
    { month: "Jan", imc: 24.5, pressao: 120, colesterol: 180 },
    { month: "Fev", imc: 24.3, pressao: 118, colesterol: 175 },
    { month: "Mar", imc: 24.1, pressao: 122, colesterol: 170 },
    { month: "Abr", imc: 23.9, pressao: 119, colesterol: 165 },
    { month: "Mai", imc: 23.7, pressao: 121, colesterol: 160 },
    { month: "Jun", imc: 23.5, pressao: 117, colesterol: 158 },
  ]

  const claimsData = [
    { category: "Consultas", value: 45, cost: 125000 },
    { category: "Exames", value: 30, cost: 89000 },
    { category: "Internações", value: 15, cost: 245000 },
    { category: "Medicamentos", value: 25, cost: 67000 },
    { category: "Emergência", value: 20, cost: 156000 },
  ]

  const wearableData = [
    { day: "Seg", steps: 8500, sleep: 7.2, heartRate: 72 },
    { day: "Ter", steps: 9200, sleep: 6.8, heartRate: 75 },
    { day: "Qua", steps: 7800, sleep: 7.5, heartRate: 70 },
    { day: "Qui", steps: 10200, sleep: 7.0, heartRate: 73 },
    { day: "Sex", steps: 9800, sleep: 6.5, heartRate: 76 },
    { day: "Sab", steps: 12000, sleep: 8.2, heartRate: 68 },
    { day: "Dom", steps: 6500, sleep: 8.5, heartRate: 65 },
  ]

  const hrData = [
    { department: "TI", performance: 85, satisfaction: 78, turnover: 12 },
    { department: "Marketing", performance: 82, satisfaction: 85, turnover: 8 },
    { department: "Vendas", performance: 88, satisfaction: 72, turnover: 15 },
    { department: "RH", performance: 90, satisfaction: 92, turnover: 5 },
    { department: "Financeiro", performance: 87, satisfaction: 80, turnover: 7 },
  ]

  const biomarkersData = [
    { test: "Glicose", value: 95, reference: "70-100", status: "normal" },
    { test: "Colesterol Total", value: 185, reference: "<200", status: "normal" },
    { test: "HDL", value: 45, reference: ">40", status: "normal" },
    { test: "LDL", value: 120, reference: "<130", status: "normal" },
    { test: "Triglicerídeos", value: 150, reference: "<150", status: "borderline" },
    { test: "Hemoglobina", value: 14.2, reference: "12-16", status: "normal" },
  ]

  const recentFiles = [
    {
      name: "relatorio_sinistralidade_junho.pdf",
      type: "PDF",
      size: "2.4 MB",
      date: "2024-06-15",
      status: "processed",
    },
    { name: "dados_wearables_maio.csv", type: "CSV", size: "1.8 MB", date: "2024-06-10", status: "processing" },
    { name: "exames_colaboradores_q2.xlsx", type: "Excel", size: "5.2 MB", date: "2024-06-08", status: "processed" },
    { name: "pesquisa_satisfacao_2024.json", type: "JSON", size: "890 KB", date: "2024-06-05", status: "processed" },
  ]

  const handleFileUpload = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsUploading(true)
      setUploadProgress(0)

      // Simular upload
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dados de Saúde</h2>
        <p className="text-muted-foreground">Integração e análise de dados de múltiplas fontes</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="health-data">Dados de Saúde</TabsTrigger>
          <TabsTrigger value="health-plans">Planos de Saúde</TabsTrigger>
          <TabsTrigger value="wearables">Wearables</TabsTrigger>
          <TabsTrigger value="hr-systems">Sistemas RH</TabsTrigger>
          <TabsTrigger value="biomarkers">Biomarcadores</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="health-data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,847</div>
                <p className="text-xs text-muted-foreground">Registros de saúde</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Hoje</div>
                <p className="text-xs text-muted-foreground">15:30 - Sincronização automática</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Fontes Ativas</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Sistemas integrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Qualidade dos Dados</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">Completude e precisão</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Saúde - Evolução</CardTitle>
                <CardDescription>Principais indicadores ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="imc" stroke="#8884d8" strokeWidth={2} name="IMC" />
                    <Line type="monotone" dataKey="pressao" stroke="#82ca9d" strokeWidth={2} name="Pressão" />
                    <Line type="monotone" dataKey="colesterol" stroke="#ffc658" strokeWidth={2} name="Colesterol" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registros Recentes</CardTitle>
                <CardDescription>Últimas atualizações de dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">Exames Cardiológicos</p>
                        <p className="text-sm text-muted-foreground">45 novos registros</p>
                      </div>
                    </div>
                    <Badge>Hoje</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Dados de Atividade</p>
                        <p className="text-sm text-muted-foreground">1,247 registros sincronizados</p>
                      </div>
                    </div>
                    <Badge variant="outline">Ontem</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Questionários</p>
                        <p className="text-sm text-muted-foreground">89 respostas processadas</p>
                      </div>
                    </div>
                    <Badge variant="outline">2 dias</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health-plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sinistralidade</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.5%</div>
                <p className="text-xs text-muted-foreground">Meta: 75%</p>
                <Progress value={68.5} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Custo Médio</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 2,847</div>
                <p className="text-xs text-muted-foreground">Por colaborador/mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Utilização</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Dos beneficiários ativos</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilização por Categoria</CardTitle>
                <CardDescription>Distribuição dos custos por tipo de serviço</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={claimsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {claimsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custos por Categoria</CardTitle>
                <CardDescription>Valores em reais por tipo de serviço</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={claimsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Custo"]} />
                    <Bar dataKey="cost" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wearables" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Dispositivos Conectados</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Ativos nos últimos 7 dias</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Passos Médios</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9,156</div>
                <p className="text-xs text-muted-foreground">Por dia por usuário</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sono Médio</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.2h</div>
                <p className="text-xs text-muted-foreground">Duração por noite</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">FC Média</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72 bpm</div>
                <p className="text-xs text-muted-foreground">Frequência cardíaca</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Semanal</CardTitle>
                <CardDescription>Dados agregados dos wearables</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wearableData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="#8884d8" name="Passos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dispositivos por Marca</CardTitle>
                <CardDescription>Distribuição dos wearables conectados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Apple Watch</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">456</div>
                      <div className="text-xs text-muted-foreground">36.6%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Fitbit</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">342</div>
                      <div className="text-xs text-muted-foreground">27.4%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Samsung Galaxy</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">289</div>
                      <div className="text-xs text-muted-foreground">23.2%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Garmin</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">160</div>
                      <div className="text-xs text-muted-foreground">12.8%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hr-systems" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Correlação Saúde x Performance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.78</div>
                <p className="text-xs text-muted-foreground">Coeficiente de correlação</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Absenteísmo</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">Taxa mensal média</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Turnover</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.4%</div>
                <p className="text-xs text-muted-foreground">Taxa anual</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance por Departamento</CardTitle>
              <CardDescription>Correlação entre saúde e indicadores de RH</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hrData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="performance" fill="#8884d8" name="Performance %" />
                  <Bar dataKey="satisfaction" fill="#82ca9d" name="Satisfação %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biomarkers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Exames Realizados</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Resultados Normais</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Dentro dos parâmetros</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Alertas</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Valores alterados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tendência</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Melhora</div>
                <p className="text-xs text-muted-foreground">Geral dos indicadores</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Biomarcadores - Últimos Resultados</CardTitle>
              <CardDescription>Principais exames laboratoriais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {biomarkersData.map((marker, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{marker.test}</span>
                        <Badge
                          variant={
                            marker.status === "normal"
                              ? "default"
                              : marker.status === "borderline"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {marker.status === "normal"
                            ? "Normal"
                            : marker.status === "borderline"
                              ? "Limítrofe"
                              : "Alterado"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">Referência: {marker.reference}</span>
                        <span className="font-medium">{marker.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Arquivos</CardTitle>
              <CardDescription>Faça upload de dados de saúde, relatórios e documentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Arraste arquivos aqui ou clique para selecionar</p>
                    <p className="text-sm text-muted-foreground">
                      Suporte para CSV, Excel, PDF, JSON (máx. 50MB por arquivo)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".csv,.xlsx,.xls,.pdf,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="mt-4" asChild>
                      <span>Selecionar Arquivos</span>
                    </Button>
                  </label>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fazendo upload...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <FileText className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                      <h3 className="font-medium">Relatórios de Saúde</h3>
                      <p className="text-sm text-muted-foreground">PDF, Word</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Database className="mx-auto h-8 w-8 text-green-500 mb-2" />
                      <h3 className="font-medium">Dados Estruturados</h3>
                      <p className="text-sm text-muted-foreground">CSV, Excel, JSON</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Activity className="mx-auto h-8 w-8 text-purple-500 mb-2" />
                      <h3 className="font-medium">Dados de Wearables</h3>
                      <p className="text-sm text-muted-foreground">Fitbit, Apple Health</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Arquivos Recentes</CardTitle>
              <CardDescription>Últimos uploads e processamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.type} • {file.size} • {file.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={file.status === "processed" ? "default" : "secondary"}>
                        {file.status === "processed" ? "Processado" : "Processando"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Importação Automática</CardTitle>
              <CardDescription>Configure integrações para importação automática de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Sistema de RH</p>
                      <p className="text-sm text-muted-foreground">Sincronização diária às 06:00</p>
                    </div>
                    <Badge>Ativo</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Plano de Saúde</p>
                      <p className="text-sm text-muted-foreground">Relatórios mensais</p>
                    </div>
                    <Badge>Ativo</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Wearables API</p>
                      <p className="text-sm text-muted-foreground">Tempo real</p>
                    </div>
                    <Badge variant="secondary">Configurar</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Integração
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Configurar Filtros
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Histórico de Importações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
