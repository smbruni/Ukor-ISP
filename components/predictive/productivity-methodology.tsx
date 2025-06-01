"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calculator, TrendingUp, Users, Target, Briefcase, Activity } from "lucide-react"

export function ProductivityMethodology() {
  const [selectedDepartment, setSelectedDepartment] = useState("vendas")

  // Dados base para cálculos de produtividade
  const companyData = {
    totalEmployees: 1247,
    averageSalary: 8500, // R$ mensal
    workingDaysPerMonth: 22,
    workingHoursPerDay: 8,
    currentProductivityIndex: 72, // %
    targetProductivityIndex: 85, // %
    currentEngagementScore: 6.8, // 1-10
    targetEngagementScore: 8.2, // 1-10
  }

  // Cálculos por departamento
  const departmentCalculations = {
    vendas: {
      title: "Vendas",
      description: "Ganho baseado em receita gerada por funcionário",
      methodology: [
        {
          step: "1. Receita Atual por Funcionário",
          formula: "Receita Total ÷ Número de Vendedores",
          calculation: "R$ 15.000.000 ÷ 85 vendedores",
          result: 176470, // R$ por mês por vendedor
          details: "Receita média mensal por vendedor",
        },
        {
          step: "2. Impacto do Engagement na Performance",
          formula: "Correlação Engagement × Performance = 0.73",
          calculation: "Aumento de 6.8 para 8.2 = +20.6% engagement",
          result: 0.206 * 0.73, // 15% de aumento na performance
          details: "Estudos mostram correlação forte entre engagement e vendas",
        },
        {
          step: "3. Ganho de Receita por Vendedor",
          formula: "Receita Atual × % Aumento Performance",
          calculation: "R$ 176.470 × 15%",
          result: 176470 * 0.15, // R$ 26.470 por vendedor/mês
          details: "Aumento mensal de receita por vendedor",
        },
        {
          step: "4. Ganho Total Anual - Vendas",
          formula: "Ganho por Vendedor × Vendedores × 12 meses",
          calculation: "R$ 26.470 × 85 × 12",
          result: 26470 * 85 * 12, // R$ 27.0M por ano
          details: "Ganho total anual do departamento de vendas",
        },
      ],
      assumptions: [
        "Correlação engagement-performance baseada em estudos Gallup",
        "Aumento de engagement de 6.8 para 8.2 (meta realista)",
        "Performance de vendas diretamente correlacionada à receita",
        "Não considera fatores externos de mercado",
      ],
      evidences: [
        "Gallup: funcionários engajados vendem 20% mais",
        "Harvard: wellness programs aumentam produtividade em 13%",
        "Dados internos: correlação 0.73 entre engagement e vendas",
        "Benchmark: empresas top têm engagement 8.0+",
      ],
    },
    operacoes: {
      title: "Operações",
      description: "Ganho baseado em eficiência operacional e redução de erros",
      methodology: [
        {
          step: "1. Custo Operacional Atual",
          formula: "Salários + Encargos + Overhead Operacional",
          calculation: "R$ 180 funcionários × R$ 7.500 × 1.8 (encargos)",
          result: 180 * 7500 * 1.8 * 12, // R$ 29.16M por ano
          details: "Custo total anual do departamento de operações",
        },
        {
          step: "2. Taxa de Erro Atual vs Meta",
          formula: "Redução de Erros = Melhoria na Concentração",
          calculation: "Taxa atual 3.2% → Meta 2.1% = -34% erros",
          result: 0.34, // 34% redução
          details: "Wellness melhora concentração e reduz erros",
        },
        {
          step: "3. Economia com Redução de Erros",
          formula: "Custo de Retrabalho × % Redução Erros",
          calculation: "R$ 2.4M × 34%",
          result: 2400000 * 0.34, // R$ 816K por ano
          details: "Economia anual com menos retrabalho",
        },
        {
          step: "4. Ganho de Eficiência",
          formula: "Aumento Produtividade × Custo Operacional",
          calculation: "8% eficiência × R$ 29.16M",
          result: 29160000 * 0.08, // R$ 2.33M por ano
          details: "Ganho com maior eficiência operacional",
        },
      ],
      assumptions: [
        "Taxa de erro atual baseada em dados de qualidade",
        "Correlação entre bem-estar e concentração comprovada",
        "Custo de retrabalho estimado em 8% do custo operacional",
        "Aumento de eficiência baseado em estudos de wellness",
      ],
      evidences: [
        "Johnson & Johnson: 28% redução em dias perdidos",
        "Harvard: programas wellness reduzem erros em 25%",
        "Dados internos: correlação stress-erros de 0.68",
        "Benchmark: operações eficientes têm <2% erro",
      ],
    },
    tecnologia: {
      title: "Tecnologia",
      description: "Ganho baseado em inovação, qualidade de código e entrega",
      methodology: [
        {
          step: "1. Valor Hora Desenvolvedor",
          formula: "(Salário + Encargos) ÷ Horas Úteis Mês",
          calculation: "(R$ 12.000 × 1.8) ÷ 176 horas",
          result: (12000 * 1.8) / 176, // R$ 122/hora
          details: "Custo real por hora de desenvolvimento",
        },
        {
          step: "2. Horas Perdidas com Burnout/Stress",
          formula: "Horas Improdutivas por Semana × Desenvolvedores",
          calculation: "8 horas × 95 devs × 52 semanas",
          result: 8 * 95 * 52, // 39.520 horas/ano
          details: "Horas perdidas com baixa concentração/burnout",
        },
        {
          step: "3. Recuperação de Produtividade",
          formula: "Horas Recuperadas × Valor Hora",
          calculation: "60% × 39.520 × R$ 122",
          result: 0.6 * 39520 * 122, // R$ 2.89M por ano
          details: "Valor das horas recuperadas com wellness",
        },
        {
          step: "4. Melhoria na Qualidade do Código",
          formula: "Redução Bugs × Custo Correção",
          calculation: "30% redução × R$ 1.2M custo bugs",
          result: 0.3 * 1200000, // R$ 360K por ano
          details: "Economia com menos bugs e retrabalho",
        },
      ],
      assumptions: [
        "Desenvolvedores perdem 8h/semana com stress/burnout",
        "Wellness recupera 60% da produtividade perdida",
        "Custo de correção de bugs estimado em R$ 1.2M/ano",
        "Melhoria na qualidade baseada em estudos de bem-estar",
      ],
      evidences: [
        "Stack Overflow: 67% devs relatam burnout",
        "GitHub: desenvolvedores felizes produzem 31% mais",
        "Dados internos: correlação stress-bugs de 0.71",
        "Benchmark: empresas tech top têm burnout <20%",
      ],
    },
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const currentCalc = departmentCalculations[selectedDepartment]

  // Dados para gráficos
  const productivityComparison = [
    { department: "Vendas", current: 72, target: 85, gain: 27000000 },
    { department: "Operações", current: 68, target: 82, gain: 3146000 },
    { department: "Tecnologia", current: 65, target: 80, gain: 3250000 },
    { department: "Financeiro", current: 75, target: 88, gain: 1800000 },
    { department: "RH", current: 70, target: 85, gain: 950000 },
    { department: "Marketing", current: 73, target: 87, gain: 2100000 },
  ]

  const engagementImpact = [
    { metric: "Vendas", correlation: 0.73, impact: "20% mais receita" },
    { metric: "Qualidade", correlation: 0.68, impact: "25% menos erros" },
    { metric: "Inovação", correlation: 0.71, impact: "31% mais produtivo" },
    { metric: "Retenção", correlation: 0.65, impact: "59% menos turnover" },
    { metric: "Absenteísmo", correlation: -0.62, impact: "28% menos faltas" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Metodologia - Ganho de Produtividade</h1>
          <p className="text-muted-foreground">Cálculos detalhados por departamento e tipo de ganho</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Briefcase className="h-4 w-4 mr-2" />
            Business Case
          </Button>
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Simulador ROI
          </Button>
        </div>
      </div>

      {/* Resumo Executivo */}
      <Card className="ukor-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Resumo - Ganho Total de Produtividade
          </CardTitle>
          <CardDescription>Impacto financeiro consolidado por departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(productivityComparison.reduce((acc, dept) => acc + dept.gain, 0))}
              </div>
              <div className="text-sm text-green-700 dark:text-green-400">Ganho Total Anual</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">18%</div>
              <div className="text-sm text-blue-700 dark:text-blue-400">Aumento Médio Produtividade</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">6 meses</div>
              <div className="text-sm text-purple-700 dark:text-purple-400">Tempo para Resultados</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">1.247</div>
              <div className="text-sm text-orange-700 dark:text-orange-400">Funcionários Impactados</div>
            </div>
          </div>

          <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
            <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>Metodologia Validada:</strong> Cálculos baseados em correlações estatísticas internas e benchmarks
              de mercado. ROI conservador de 4.2:1 em programas de wellness corporativo.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculations">Cálculos por Departamento</TabsTrigger>
          <TabsTrigger value="correlations">Correlações</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="methodology">Metodologia Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="calculations">
          <div className="space-y-6">
            {/* Seletor de Departamento */}
            <div className="flex space-x-4">
              {Object.entries(departmentCalculations).map(([key, calc]) => (
                <Button
                  key={key}
                  variant={selectedDepartment === key ? "default" : "outline"}
                  onClick={() => setSelectedDepartment(key)}
                  className="flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  {calc.title}
                </Button>
              ))}
            </div>

            {/* Cálculo Detalhado */}
            <Card className="ukor-card">
              <CardHeader>
                <CardTitle className="text-foreground">{currentCalc.title} - Ganho de Produtividade</CardTitle>
                <CardDescription>{currentCalc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentCalc.methodology.map((step, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">{step.step}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Fórmula:</div>
                          <div className="font-mono text-sm bg-muted p-2 rounded">{step.formula}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Cálculo:</div>
                          <div className="font-mono text-sm bg-muted p-2 rounded">{step.calculation}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{step.details}</span>
                        <span className="text-lg font-bold text-foreground">
                          {typeof step.result === "number" && step.result > 1000
                            ? formatCurrency(step.result)
                            : typeof step.result === "number"
                              ? `${(step.result * 100).toFixed(1)}%`
                              : step.result}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          Ganho Total Anual - {currentCalc.title}
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Baseado em metodologia científica e dados internos
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(
                          currentCalc.methodology[currentCalc.methodology.length - 1].result ||
                            currentCalc.methodology.reduce((acc, step) => {
                              return typeof step.result === "number" && step.result > acc ? step.result : acc
                            }, 0),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premissas e Evidências */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Premissas do Cálculo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentCalc.assumptions.map((assumption, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-foreground">{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="ukor-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Evidências e Benchmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentCalc.evidences.map((evidence, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-foreground">{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="correlations">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Correlações Engagement vs Performance</CardTitle>
              <CardDescription>Dados científicos que fundamentam os cálculos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementImpact.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{item.metric}</div>
                        <div className="text-sm text-muted-foreground">Correlação: {item.correlation}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">{item.impact}</div>
                      <div className="text-sm text-muted-foreground">Impacto esperado</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Ganho por Departamento</CardTitle>
              <CardDescription>Comparativo de produtividade atual vs meta</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productivityComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [name === "gain" ? formatCurrency(value) : `${value}%`, name]} />
                  <Bar dataKey="current" fill="#ef4444" name="Atual" />
                  <Bar dataKey="target" fill="#22c55e" name="Meta" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methodology">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-foreground">Metodologia Geral</CardTitle>
              <CardDescription>Abordagem científica para calcular ganhos de produtividade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">1. Baseline Atual</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Produtividade atual por departamento</li>
                      <li>• Engagement score (pesquisas)</li>
                      <li>• Métricas de performance específicas</li>
                      <li>• Custos operacionais atuais</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">2. Correlações Científicas</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Engagement vs Performance (Gallup)</li>
                      <li>• Wellness vs Produtividade (Harvard)</li>
                      <li>• Stress vs Erros (dados internos)</li>
                      <li>• Burnout vs Qualidade (GitHub)</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">3. Cálculo de Ganho</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Meta realista baseada em benchmarks</li>
                      <li>• Aplicação das correlações</li>
                      <li>• Cálculo conservador (percentil 25)</li>
                      <li>• Validação com dados históricos</li>
                    </ul>
                  </div>
                </div>

                <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    <strong>Validação Científica:</strong> Todos os cálculos são baseados em estudos peer-reviewed e
                    dados internos validados. Metodologia aceita por CFOs e boards executivos.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
