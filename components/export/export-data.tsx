"use client"

import { useState } from "react"
import {
  Download,
  FileText,
  FileSpreadsheet,
  FilePieChart,
  Calendar,
  Filter,
  Settings,
  Share2,
  Printer,
  ChevronRight,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

export function ExportData() {
  const [reportType, setReportType] = useState("sinistralidade")
  const [period, setPeriod] = useState("last12")
  const [format, setFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("executive")
  const [customLogo, setCustomLogo] = useState(false)
  const [selectedSections, setSelectedSections] = useState([
    "summary",
    "lossRatio",
    "utilization",
    "topUsers",
    "predictive",
    "recommendations",
  ])

  const handleSectionToggle = (section) => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter((s) => s !== section))
    } else {
      setSelectedSections([...selectedSections, section])
    }
  }

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulando o tempo de geração do relatório
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Relatório gerado com sucesso",
        description: "O relatório foi gerado e está pronto para download.",
      })
    }, 2500)
  }

  const reportTemplates = [
    {
      id: "executive",
      name: "Sumário Executivo",
      description: "Visão geral com KPIs principais e recomendações",
      icon: FileText,
    },
    {
      id: "detailed",
      name: "Relatório Detalhado",
      description: "Análise completa com todos os dados e gráficos",
      icon: FileSpreadsheet,
    },
    {
      id: "predictive",
      name: "Análise Preditiva",
      description: "Foco em projeções e cenários futuros",
      icon: FilePieChart,
    },
    {
      id: "broker",
      name: "Relatório para Corretora",
      description: "Formatado para apresentação a corretoras",
      icon: Share2,
    },
  ]

  const availableSections = [
    { id: "summary", name: "Sumário Executivo", default: true },
    { id: "lossRatio", name: "Análise de Sinistralidade", default: true },
    { id: "utilization", name: "Utilização por Categoria", default: true },
    { id: "topUsers", name: "Top Utilizadores", default: true },
    { id: "predictive", name: "Análise Preditiva", default: true },
    { id: "recommendations", name: "Recomendações", default: true },
    { id: "benchmarking", name: "Benchmarking", default: false },
    { id: "demographics", name: "Demografia", default: false },
    { id: "providers", name: "Rede Credenciada", default: false },
    { id: "financial", name: "Análise Financeira", default: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Exportação de Dados</h2>
        <p className="text-muted-foreground">Gere relatórios personalizados e exporte dados para análise externa</p>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="raw-data">Dados Brutos</TabsTrigger>
          <TabsTrigger value="scheduled">Agendados</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6 mt-6">
          {/* Seleção de Relatório */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Selecione o Tipo de Relatório
              </CardTitle>
              <CardDescription>Escolha o tipo de relatório que deseja gerar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTemplate === template.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-full ${
                          selectedTemplate === template.id
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <template.icon className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="ml-auto">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configurações do Relatório */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Configurações do Relatório
              </CardTitle>
              <CardDescription>Personalize as opções do seu relatório</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Período de Análise</Label>
                    <Select value={period} onValueChange={setPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last3">Últimos 3 meses</SelectItem>
                        <SelectItem value="last6">Últimos 6 meses</SelectItem>
                        <SelectItem value="last12">Últimos 12 meses</SelectItem>
                        <SelectItem value="ytd">Ano até o momento</SelectItem>
                        <SelectItem value="custom">Período personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {period === "custom" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Data Inicial</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Data Final</Label>
                        <Input type="date" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Formato de Exportação</Label>
                    <RadioGroup value={format} onValueChange={setFormat} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pdf" id="pdf" />
                        <Label htmlFor="pdf">PDF</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="excel" id="excel" />
                        <Label htmlFor="excel">Excel</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ppt" id="ppt" />
                        <Label htmlFor="ppt">PowerPoint</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="customLogo" checked={customLogo} onCheckedChange={setCustomLogo} />
                    <Label htmlFor="customLogo">Usar logo personalizada</Label>
                  </div>

                  {customLogo && (
                    <div className="space-y-2">
                      <Label>Upload de Logo</Label>
                      <Input type="file" accept="image/*" />
                      <p className="text-xs text-muted-foreground">
                        Recomendado: PNG ou SVG com fundo transparente, 300x100px
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="block mb-3">Seções do Relatório</Label>
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                    {availableSections.map((section) => (
                      <div key={section.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={section.id}
                          checked={selectedSections.includes(section.id)}
                          onCheckedChange={() => handleSectionToggle(section.id)}
                        />
                        <Label htmlFor={section.id}>{section.name}</Label>
                        {section.default && (
                          <Badge variant="outline" className="ml-auto text-xs">
                            Recomendado
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prévia e Geração */}
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Prévia do Relatório
                </CardTitle>
                <CardDescription>Visualize como ficará seu relatório</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">Clique em "Visualizar" para ver uma prévia do relatório</p>
                  <Button variant="outline" className="mt-4">
                    Visualizar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full md:w-80">
              <CardHeader>
                <CardTitle>Gerar Relatório</CardTitle>
                <CardDescription>Exporte o relatório no formato selecionado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tipo:</span>
                    <span className="text-sm font-medium">
                      {reportTemplates.find((t) => t.id === selectedTemplate)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Período:</span>
                    <span className="text-sm font-medium">
                      {period === "last3"
                        ? "Últimos 3 meses"
                        : period === "last6"
                          ? "Últimos 6 meses"
                          : period === "last12"
                            ? "Últimos 12 meses"
                            : period === "ytd"
                              ? "Ano até o momento"
                              : "Personalizado"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Formato:</span>
                    <span className="text-sm font-medium uppercase">{format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Seções:</span>
                    <span className="text-sm font-medium">{selectedSections.length}</span>
                  </div>
                </div>

                <Separator />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <span className="animate-pulse">Gerando...</span>
                          <Progress value={45} className="h-1 w-full absolute bottom-0 left-0" />
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Gerar Relatório
                        </>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Relatório Gerado com Sucesso</DialogTitle>
                      <DialogDescription>Seu relatório está pronto para download</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center justify-between text-sm">
                        <span>Nome:</span>
                        <span className="font-medium">Relatório_Sinistralidade_Jun2025.pdf</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span>Tamanho:</span>
                        <span className="font-medium">2.4 MB</span>
                      </div>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" className="sm:flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartilhar
                      </Button>
                      <Button className="sm:flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="raw-data" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exportação de Dados Brutos</CardTitle>
              <CardDescription>Exporte dados não processados para análise externa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Conjunto de Dados</Label>
                    <Select defaultValue="claims">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o conjunto de dados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="claims">Sinistros</SelectItem>
                        <SelectItem value="members">Beneficiários</SelectItem>
                        <SelectItem value="providers">Prestadores</SelectItem>
                        <SelectItem value="utilization">Utilização</SelectItem>
                        <SelectItem value="costs">Custos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Formato</Label>
                    <Select defaultValue="csv">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Período</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" placeholder="Data inicial" />
                    <Input type="date" placeholder="Data final" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Filtros</Label>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      <Filter className="h-3 w-3 mr-1" />
                      Adicionar Filtro
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 text-center text-muted-foreground text-sm">
                    Nenhum filtro aplicado
                  </div>
                </div>

                <div className="pt-2">
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Relatórios Agendados
              </CardTitle>
              <CardDescription>Configure relatórios para serem gerados automaticamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Relatório Mensal de Sinistralidade</h4>
                      <p className="text-sm text-muted-foreground">Enviado todo dia 5 • PDF • Últimos 30 dias</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Análise Semanal de Utilização</h4>
                      <p className="text-sm text-muted-foreground">Enviado toda segunda • Excel • 7 dias</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dashboard Executivo Trimestral</h4>
                      <p className="text-sm text-muted-foreground">Primeiro dia do trimestre • PowerPoint</p>
                    </div>
                    <Badge variant="outline">Pausado</Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Novo Relatório
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Templates de Relatório */}
      <div>
        <h3 className="text-lg font-medium mb-4">Templates Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Relatório Executivo</CardTitle>
              <CardDescription>Visão geral para diretoria</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground/50" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <ChevronRight className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Relatório para Corretora</CardTitle>
              <CardDescription>Análise completa para corretoras</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground/50" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <ChevronRight className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Relatório de Prevenção</CardTitle>
              <CardDescription>Foco em ações preventivas</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground/50" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <ChevronRight className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
