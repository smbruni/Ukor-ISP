"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Database, CheckCircle, AlertCircle } from "lucide-react"

export function HealthDataUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = () => {
    setIsUploading(true)
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

  const dataTypes = [
    {
      name: "Relatórios de Planos de Saúde",
      description: "Dados de sinistralidade e custos",
      format: "CSV, Excel, PDF",
      status: "Conectado",
      lastUpdate: "Hoje, 14:30",
    },
    {
      name: "Dados Suridata",
      description: "Biomarcadores e exames",
      format: "JSON, XML",
      status: "Conectado",
      lastUpdate: "Ontem, 18:45",
    },
    {
      name: "Questionários ISP",
      description: "Índice de Saúde e Performance",
      format: "JSON",
      status: "Ativo",
      lastUpdate: "Hoje, 09:15",
    },
    {
      name: "Dados de RH",
      description: "Absenteísmo e turnover",
      format: "CSV, Excel",
      status: "Pendente",
      lastUpdate: "3 dias atrás",
    },
  ]

  const recentUploads = [
    {
      file: "sinistralidade_q4_2024.xlsx",
      size: "2.4 MB",
      status: "Processado",
      records: "1,247 registros",
      time: "2h atrás",
    },
    {
      file: "biomarcadores_dezembro.json",
      size: "5.1 MB",
      status: "Processando",
      records: "3,891 registros",
      time: "4h atrás",
    },
    {
      file: "isp_responses_2024.csv",
      size: "1.8 MB",
      status: "Processado",
      records: "856 registros",
      time: "1 dia atrás",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Gestão de Dados de Saúde</h2>
        <p className="text-muted-foreground">Upload e integração de dados de saúde, planos médicos e biomarcadores</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload de Dados</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="processing">Processamento</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload de Arquivos</CardTitle>
                <CardDescription>
                  Faça upload de relatórios de planos de saúde, dados de exames e questionários
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Clique para fazer upload ou arraste arquivos aqui
                      </span>
                    </Label>
                    <Input id="file-upload" type="file" className="hidden" multiple />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">CSV, Excel, JSON, PDF até 50MB</p>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processando arquivo...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                <Button onClick={handleFileUpload} className="w-full" disabled={isUploading}>
                  {isUploading ? "Processando..." : "Iniciar Upload"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uploads Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUploads.map((upload, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium text-sm">{upload.file}</p>
                          <p className="text-xs text-muted-foreground">
                            {upload.size} • {upload.records}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={upload.status === "Processado" ? "default" : "secondary"}>
                          {upload.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{upload.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge variant={type.status === "Conectado" || type.status === "Ativo" ? "default" : "secondary"}>
                        {type.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Formato:</span>
                      <span className="text-sm font-medium">{type.format}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Última atualização:</span>
                      <span className="text-sm font-medium">{type.lastUpdate}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Configurar Integração
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Status do Processamento</CardTitle>
              <CardDescription>Acompanhe o processamento e validação dos dados carregados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Database className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">1,247,892</div>
                    <div className="text-sm text-muted-foreground">Registros Processados</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold">98.7%</div>
                    <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <AlertCircle className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                    <div className="text-2xl font-bold">1,623</div>
                    <div className="text-sm text-muted-foreground">Registros com Erro</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Processamento em Andamento</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Análise de Biomarcadores</p>
                        <p className="text-sm text-muted-foreground">3,891 registros</p>
                      </div>
                      <div className="text-right">
                        <Progress value={75} className="w-20 mb-1" />
                        <span className="text-sm">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Validação de Dados ISP</p>
                        <p className="text-sm text-muted-foreground">856 registros</p>
                      </div>
                      <div className="text-right">
                        <Progress value={45} className="w-20 mb-1" />
                        <span className="text-sm">45%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
