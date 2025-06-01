"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowRight,
  Database,
  AlertTriangle,
  Users,
  FileText,
  BookOpen,
  Activity,
  Settings,
  Download,
} from "lucide-react"

interface MigrationStep {
  id: string
  title: string
  description: string
  icon: any
  status: "pending" | "running" | "completed" | "error"
  progress: number
  estimatedTime: string
  dependencies?: string[]
  critical: boolean
}

export function MigrationWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [migrationSteps, setMigrationSteps] = useState<MigrationStep[]>([
    {
      id: "backup",
      title: "Backup dos Dados Atuais",
      description: "Criar backup completo dos dados existentes na Ukor",
      icon: Database,
      status: "pending",
      progress: 0,
      estimatedTime: "5 min",
      critical: true,
    },
    {
      id: "users",
      title: "Migração de Usuários",
      description: "Importar perfis de colaboradores e estrutura organizacional",
      icon: Users,
      status: "pending",
      progress: 0,
      estimatedTime: "10 min",
      dependencies: ["backup"],
      critical: true,
    },
    {
      id: "questionnaires",
      title: "Questionários e Avaliações",
      description: "Migrar questionários existentes e histórico de respostas",
      icon: FileText,
      status: "pending",
      progress: 0,
      estimatedTime: "15 min",
      dependencies: ["users"],
      critical: true,
    },
    {
      id: "courses",
      title: "Conteúdo Educacional",
      description: "Importar cursos, aulas e progresso dos usuários",
      icon: BookOpen,
      status: "pending",
      progress: 0,
      estimatedTime: "20 min",
      dependencies: ["users"],
      critical: false,
    },
    {
      id: "isp_setup",
      title: "Configuração do ISP",
      description: "Configurar algoritmos e pesos do Índice de Saúde e Performance",
      icon: Activity,
      status: "pending",
      progress: 0,
      estimatedTime: "8 min",
      dependencies: ["questionnaires"],
      critical: true,
    },
    {
      id: "integration",
      title: "Integração de APIs",
      description: "Configurar conexões com wearables e sistemas externos",
      icon: Settings,
      status: "pending",
      progress: 0,
      estimatedTime: "12 min",
      dependencies: ["users"],
      critical: false,
    },
  ])

  const [selectedSteps, setSelectedSteps] = useState<string[]>(
    migrationSteps.filter((step) => step.critical).map((step) => step.id),
  )

  const updateStepStatus = (stepId: string, updates: Partial<MigrationStep>) => {
    setMigrationSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, ...updates } : step)))
  }

  const runMigrationStep = async (stepId: string) => {
    const step = migrationSteps.find((s) => s.id === stepId)
    if (!step) return

    updateStepStatus(stepId, { status: "running", progress: 0 })

    try {
      // Simular progresso da migração
      for (let i = 0; i <= 100; i += 5) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        updateStepStatus(stepId, { progress: i })
      }

      // Simular lógica específica de cada step
      switch (stepId) {
        case "backup":
          console.log("Criando backup dos dados...")
          break
        case "users":
          console.log("Migrando usuários...")
          break
        case "questionnaires":
          console.log("Migrando questionários...")
          break
        case "courses":
          console.log("Migrando cursos...")
          break
        case "isp_setup":
          console.log("Configurando ISP...")
          break
        case "integration":
          console.log("Configurando integrações...")
          break
      }

      updateStepStatus(stepId, { status: "completed", progress: 100 })
    } catch (error) {
      updateStepStatus(stepId, {
        status: "error",
        progress: 0,
      })
    }
  }

  const runFullMigration = async () => {
    for (const stepId of selectedSteps) {
      await runMigrationStep(stepId)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const canRunStep = (step: MigrationStep) => {
    if (!selectedSteps.includes(step.id)) return false
    if (!step.dependencies) return true
    return step.dependencies.every((dep) => {
      const depStep = migrationSteps.find((s) => s.id === dep)
      return depStep?.status === "completed"
    })
  }

  const totalEstimatedTime = migrationSteps
    .filter((step) => selectedSteps.includes(step.id))
    .reduce((total, step) => total + Number.parseInt(step.estimatedTime), 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Assistente de Migração Ukor</h2>
        <p className="text-muted-foreground">
          Migre dados e configurações do sistema existente para a nova plataforma UHealth
        </p>
      </div>

      {/* Resumo da Migração */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Migração</CardTitle>
          <CardDescription>Selecione os componentes que deseja migrar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{selectedSteps.length}</div>
              <div className="text-sm text-muted-foreground">Etapas Selecionadas</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">~{totalEstimatedTime} min</div>
              <div className="text-sm text-muted-foreground">Tempo Estimado</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {migrationSteps.filter((s) => s.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Etapas Concluídas</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Baixar Relatório
            </Button>
            <Button onClick={runFullMigration} disabled={selectedSteps.length === 0}>
              Iniciar Migração Completa
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Etapas de Migração */}
      <div className="space-y-4">
        {migrationSteps.map((step, index) => (
          <Card key={step.id} className={`${!selectedSteps.includes(step.id) ? "opacity-50" : ""}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedSteps.includes(step.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSteps((prev) => [...prev, step.id])
                      } else {
                        setSelectedSteps((prev) => prev.filter((id) => id !== step.id))
                      }
                    }}
                    disabled={step.critical}
                  />
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {step.title}
                      {step.critical && (
                        <Badge variant="destructive" className="text-xs">
                          Crítico
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">~{step.estimatedTime}</div>
                    <Badge className={getStatusColor(step.status)}>
                      {step.status === "running"
                        ? "Executando"
                        : step.status === "completed"
                          ? "Concluído"
                          : step.status === "error"
                            ? "Erro"
                            : "Pendente"}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => runMigrationStep(step.id)}
                    disabled={!canRunStep(step) || step.status === "running"}
                  >
                    {step.status === "completed" ? "Reexecutar" : "Executar"}
                  </Button>
                </div>
              </div>
            </CardHeader>

            {step.status === "running" && (
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{step.progress}%</span>
                  </div>
                  <Progress value={step.progress} />
                </div>
              </CardContent>
            )}

            {step.dependencies && step.dependencies.length > 0 && (
              <CardContent>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Dependências:{" "}
                    {step.dependencies
                      .map((dep) => {
                        const depStep = migrationSteps.find((s) => s.id === dep)
                        return depStep?.title
                      })
                      .join(", ")}
                  </AlertDescription>
                </Alert>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
