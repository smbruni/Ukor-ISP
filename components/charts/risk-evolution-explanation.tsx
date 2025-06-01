"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, TrendingUp, AlertTriangle, Users, Calendar } from "lucide-react"

export function RiskEvolutionExplanation() {
  const sampleData = {
    tech: [
      {
        month: "Jan",
        risk: 85,
        incidents: 12,
        trend: "up",
        details: {
          burnout: 35,
          absenteeism: 25,
          turnover: 15,
          healthIssues: 10,
        },
      },
      {
        month: "Fev",
        risk: 82,
        incidents: 10,
        trend: "down",
        details: {
          burnout: 32,
          absenteeism: 23,
          turnover: 15,
          healthIssues: 12,
        },
      },
      {
        month: "Mar",
        risk: 88,
        incidents: 15,
        trend: "up",
        details: {
          burnout: 38,
          absenteeism: 28,
          turnover: 12,
          healthIssues: 10,
        },
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card className="ukor-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <Info className="h-4 w-4 text-white" />
            </div>
            O que é a Evolução do Risco por Departamento?
          </CardTitle>
          <CardDescription>Explicação detalhada dos dados e metodologia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Definição */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📊 Definição</h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              É um <strong>índice composto</strong> que mede a probabilidade de problemas de saúde e performance em cada
              departamento ao longo do tempo. Varia de 0% (sem risco) a 100% (risco máximo).
            </p>
          </div>

          {/* Componentes do Risco */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Componentes do Índice de Risco
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded">
                  <span className="text-sm font-medium">Burnout</span>
                  <Badge variant="destructive">35%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <span className="text-sm font-medium">Absenteísmo</span>
                  <Badge variant="secondary">25%</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <span className="text-sm font-medium">Turnover</span>
                  <Badge variant="outline">15%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <span className="text-sm font-medium">Problemas de Saúde</span>
                  <Badge variant="outline">10%</Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Risco Total Calculado:</span>
                <Badge className="bg-red-100 text-red-800">85%</Badge>
              </div>
            </div>
          </div>

          {/* Fórmula de Cálculo */}
          <div>
            <h3 className="font-semibold mb-3">🧮 Fórmula de Cálculo</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
              <div className="space-y-2">
                <div>
                  <strong>Risco = </strong>
                </div>
                <div className="ml-4">• (Taxa Burnout × 0.4) +</div>
                <div className="ml-4">• (Taxa Absenteísmo × 0.3) +</div>
                <div className="ml-4">• (Taxa Turnover × 0.2) +</div>
                <div className="ml-4">• (Problemas Saúde × 0.1)</div>
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <strong>Exemplo Tecnologia:</strong>
                  <br />
                  (35 × 0.4) + (25 × 0.3) + (15 × 0.2) + (10 × 0.1) = <strong>85%</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Dados Mostrados */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              Dados Mostrados no Gráfico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Linha de Risco</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Evolução do índice de risco (0-100%) ao longo dos meses
                </p>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-3 h-3 text-red-500" />
                  <span className="font-medium">Tendência</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Direção do risco: melhorando, piorando ou estável
                </p>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                  <span className="font-medium">Incidentes</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Número de eventos registrados (afastamentos, reclamações, etc.)
                </p>
              </div>
            </div>
          </div>

          {/* Fontes dos Dados */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Fontes dos Dados
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">Sistema RH (Absenteísmo/Turnover)</span>
                <Badge variant="outline">Automático</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">Questionários de Bem-estar</span>
                <Badge variant="outline">Mensal</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">Dados Médicos (Afastamentos)</span>
                <Badge variant="outline">Automático</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm">Avaliações de Performance</span>
                <Badge variant="outline">Trimestral</Badge>
              </div>
            </div>
          </div>

          {/* Utilidade Prática */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">🎯 Para que serve?</h3>
            <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
              <li>
                • <strong>Antecipar problemas:</strong> Identificar departamentos em risco antes que explodam
              </li>
              <li>
                • <strong>Alocar recursos:</strong> Priorizar investimentos em wellness onde mais precisa
              </li>
              <li>
                • <strong>Medir eficácia:</strong> Ver se as ações estão funcionando ao longo do tempo
              </li>
              <li>
                • <strong>Benchmarking:</strong> Comparar performance entre departamentos
              </li>
              <li>
                • <strong>ROI:</strong> Correlacionar investimentos com redução de risco
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
