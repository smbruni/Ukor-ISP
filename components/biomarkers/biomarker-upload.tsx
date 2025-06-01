"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, CheckCircle, AlertTriangle, Download, Eye, Trash2 } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "processing" | "completed" | "error"
  progress: number
  extractedData?: any
  errors?: string[]
}

export function BiomarkerUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "processing",
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simular processamento
    newFiles.forEach((file) => {
      simulateFileProcessing(file.id)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "text/csv": [".csv"],
    },
    multiple: true,
  })

  const simulateFileProcessing = (fileId: string) => {
    setIsProcessing(true)

    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + 10, 100)

            if (newProgress === 100) {
              clearInterval(interval)
              setIsProcessing(false)

              // Simular dados extraídos
              const extractedData = generateMockExtractedData(file.name)

              return {
                ...file,
                progress: newProgress,
                status: Math.random() > 0.1 ? "completed" : "error",
                extractedData: extractedData,
                errors: Math.random() > 0.1 ? [] : ["Erro ao processar biomarcador X", "Formato não reconhecido"],
              }
            }

            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 200)
  }

  const generateMockExtractedData = (fileName: string) => {
    return {
      patientInfo: {
        name: "João Silva",
        age: 42,
        gender: "M",
        date: "2024-01-15",
      },
      biomarkers: [
        { name: "Glicose", value: 105, unit: "mg/dL", reference: "70-99" },
        { name: "Colesterol Total", value: 220, unit: "mg/dL", reference: "<200" },
        { name: "HDL", value: 45, unit: "mg/dL", reference: ">40" },
        { name: "LDL", value: 140, unit: "mg/dL", reference: "<100" },
        { name: "Triglicerídeos", value: 180, unit: "mg/dL", reference: "<150" },
        { name: "Creatinina", value: 1.1, unit: "mg/dL", reference: "0.7-1.3" },
        { name: "Ureia", value: 35, unit: "mg/dL", reference: "15-40" },
        { name: "ALT", value: 28, unit: "U/L", reference: "<56" },
        { name: "AST", value: 22, unit: "U/L", reference: "<40" },
      ],
      riskFactors: ["Glicose ligeiramente elevada", "Colesterol total acima do ideal", "LDL elevado"],
      recommendations: [
        "Dieta com redução de carboidratos",
        "Exercícios cardiovasculares regulares",
        "Reavaliação em 3 meses",
      ],
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Upload de Biomarcadores</h2>
          <p className="text-muted-foreground">
            Faça upload de exames laboratoriais para análise integrada com dados de wearables
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Template de Exemplo
        </Button>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload de Arquivos</TabsTrigger>
          <TabsTrigger value="extracted">Dados Extraídos</TabsTrigger>
          <TabsTrigger value="validation">Validação</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Área de Upload */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Upload de Exames</CardTitle>
                <CardDescription>
                  Arraste arquivos ou clique para selecionar. Suporta PDF, imagens, Excel e CSV.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-ukor-primary bg-ukor-light" : "border-gray-300 hover:border-ukor-primary"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  {isDragActive ? (
                    <p className="text-ukor-primary font-medium">Solte os arquivos aqui...</p>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-2">Arraste exames laboratoriais aqui ou clique para selecionar</p>
                      <p className="text-sm text-gray-500">PDF, PNG, JPG, Excel, CSV até 10MB cada</p>
                    </div>
                  )}
                </div>

                {isProcessing && (
                  <Alert className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>Processando arquivos... Isso pode levar alguns minutos.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Tipos de Dados Suportados */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Dados Suportados</CardTitle>
                <CardDescription>Biomarcadores que podem ser extraídos automaticamente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Metabólicos</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Glicose</Badge>
                      <Badge variant="outline">HbA1c</Badge>
                      <Badge variant="outline">Insulina</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Cardiovasculares</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Colesterol Total</Badge>
                      <Badge variant="outline">LDL</Badge>
                      <Badge variant="outline">HDL</Badge>
                      <Badge variant="outline">Triglicerídeos</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Inflamatórios</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">PCR</Badge>
                      <Badge variant="outline">VHS</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Hormonais</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Cortisol</Badge>
                      <Badge variant="outline">TSH</Badge>
                      <Badge variant="outline">Testosterona</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Nutricionais</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Vitamina D</Badge>
                      <Badge variant="outline">B12</Badge>
                      <Badge variant="outline">Ferro</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Arquivos Carregados */}
          {uploadedFiles.length > 0 && (
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">Arquivos Carregados</CardTitle>
                <CardDescription>Status do processamento dos exames</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-ukor-primary/20 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(file.status)}
                        <div>
                          <h4 className="font-medium text-foreground">{file.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)} • {file.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {file.status === "processing" && (
                          <div className="w-32">
                            <Progress value={file.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">{file.progress}%</p>
                          </div>
                        )}
                        <Badge className={getStatusColor(file.status)}>
                          {file.status === "processing"
                            ? "Processando"
                            : file.status === "completed"
                              ? "Concluído"
                              : "Erro"}
                        </Badge>
                        <div className="flex space-x-2">
                          {file.status === "completed" && (
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => removeFile(file.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="extracted">
          <div className="space-y-6">
            {uploadedFiles
              .filter((file) => file.status === "completed" && file.extractedData)
              .map((file) => (
                <Card key={file.id} className="ukor-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Dados Extraídos - {file.name}</CardTitle>
                    <CardDescription>Biomarcadores identificados automaticamente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Informações do Paciente */}
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Informações do Paciente</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Nome:</span>
                            <span className="text-sm font-medium text-foreground">
                              {file.extractedData.patientInfo.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Idade:</span>
                            <span className="text-sm font-medium text-foreground">
                              {file.extractedData.patientInfo.age} anos
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Data do Exame:</span>
                            <span className="text-sm font-medium text-foreground">
                              {file.extractedData.patientInfo.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Fatores de Risco */}
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Fatores de Risco Identificados</h4>
                        <ul className="space-y-1">
                          {file.extractedData.riskFactors.map((risk: string, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-2 text-orange-500" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Biomarcadores */}
                    <div className="mt-6">
                      <h4 className="font-medium text-foreground mb-3">Biomarcadores</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 text-foreground">Biomarcador</th>
                              <th className="text-left py-2 text-foreground">Valor</th>
                              <th className="text-left py-2 text-foreground">Unidade</th>
                              <th className="text-left py-2 text-foreground">Referência</th>
                              <th className="text-left py-2 text-foreground">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {file.extractedData.biomarkers.map((biomarker: any, index: number) => (
                              <tr key={index} className="border-b">
                                <td className="py-2 text-foreground">{biomarker.name}</td>
                                <td className="py-2 font-medium text-foreground">{biomarker.value}</td>
                                <td className="py-2 text-muted-foreground">{biomarker.unit}</td>
                                <td className="py-2 text-muted-foreground">{biomarker.reference}</td>
                                <td className="py-2">
                                  <Badge
                                    variant={
                                      biomarker.value >
                                      Number.parseFloat(
                                        biomarker.reference.split("-")[1] || biomarker.reference.replace("<", ""),
                                      )
                                        ? "destructive"
                                        : "default"
                                    }
                                  >
                                    {biomarker.value >
                                    Number.parseFloat(
                                      biomarker.reference.split("-")[1] || biomarker.reference.replace("<", ""),
                                    )
                                      ? "Elevado"
                                      : "Normal"}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Recomendações */}
                    <div className="mt-6">
                      <h4 className="font-medium text-foreground mb-3">Recomendações</h4>
                      <ul className="space-y-1">
                        {file.extractedData.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="validation">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Validação dos Dados</CardTitle>
              <CardDescription>Revise e confirme os dados extraídos antes da integração</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Todos os biomarcadores foram extraídos com sucesso. Revise os dados abaixo e confirme para integrar
                    ao sistema.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-foreground">Status da Validação</h4>
                    <p className="text-sm text-muted-foreground">
                      {uploadedFiles.filter((f) => f.status === "completed").length} de {uploadedFiles.length} arquivos
                      processados
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline">Revisar Dados</Button>
                    <Button className="ukor-button">Confirmar e Integrar</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {uploadedFiles.reduce((acc, file) => acc + (file.extractedData?.biomarkers?.length || 0), 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Biomarcadores Extraídos</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {uploadedFiles.filter((f) => f.status === "completed").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Arquivos Processados</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {uploadedFiles.filter((f) => f.status === "error").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Erros Encontrados</div>
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
