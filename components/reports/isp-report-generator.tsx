"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  FileText,
  Users,
  Heart,
  Brain,
  Moon,
  Apple,
  Zap,
  TrendingUp,
  Building,
  Clock,
  Coffee,
  Activity,
} from "lucide-react"

// Importar o PDFGenerator no topo do arquivo
import { PDFGenerator } from "./pdf-generator"

export function ISPReportGenerator() {
  const [selectedPeriod, setSelectedPeriod] = useState("abril-2024")
  const [companyName, setCompanyName] = useState("NOME DA EMPRESA")

  // Dados do relatório baseados no documento real
  const reportData = {
    company: companyName,
    period: "Abril 2024",
    demographics: {
      gender: {
        mulher: 85,
        homem: 15,
        transgenero: 0,
        naoBinario: 0,
        outros: 0,
      },
      maritalStatus: {
        solteiro: 60,
        casado: 35,
        separado: 5,
        viuvo: 0,
      },
      race: {
        branca: 85,
        preta: 0,
        parda: 15,
        indigena: 0,
        amarela: 0,
      },
      ageRange: {
        menor18: 0,
        entre18e30: 35,
        entre31e45: 25,
        entre46e55: 35,
        entre56e77: 5,
        maior77: 0,
      },
    },
    workEnvironment: {
      workRegime: {
        presencial: 0,
        hibrido: 40,
        homeOffice: 60,
      },
      diversity: 60,
      workLifeBalance: 60,
      psychologicalSafety: 85,
      belongingSense: 85,
      stayIntention: 60,
      fairCompensation: 60,
      commutingTime: {
        ate30min: 35,
        aprox1h: 40,
        entre1h30e2h30: 5,
        mais2h30: 2,
      },
    },
    mentalHealth: {
      perception: 3, // escala 1-5
      depressionSigns: 5,
      fatigue: 55,
      confirmedDiagnosis: 10,
      anxietyLevel: 3, // escala 1-5
    },
    physicalHealth: {
      perception: 46, // percentual
      sedentaryRisk: 50,
      healthProblems: 50,
      smokers: 5,
      recentCheckup: 20,
      alcoholismRisk: 60,
    },
    sleepHealth: {
      perception: 54, // percentual
      sleepTime: {
        menor5h: 0,
        h6: 0,
        h7a8: 45,
        h8a9: 35,
        maior9h: 0,
      },
      sleepDifficulty: 30,
      workImpactOnSleep: 60,
      caffeineAbuse: 46,
      sleepMedication: {
        medicamentos: 12,
        suplementos: 34,
        nenhum: 54,
      },
    },
    nutritionalHealth: {
      perception: 54, // percentual
      idealWeight: {
        acimaIdeal: 54,
        pertoIdeal: 12,
        abaixoIdeal: 34,
      },
      adequateHydration: 60, // percentual estimado
      fruitConsumption: {
        mais5vezes: 10,
        entre4e5: 15,
        vezes3: 5,
        menos2: 70,
      },
      vegetableConsumption: {
        menos1vez: 8,
        entre1e2: 25,
        entre3e5: 0,
        entre6e7: 65,
      },
      ultraProcessedConsumption: {
        menos1vez: 8,
        entre1e2: 25,
        entre3e5: 0,
        entre6e7: 65,
      },
    },
    stressManagement: {
      perception: 7, // escala 1-10
      stressfulRoutine: 85, // percentual estimado
      workCausedStress: 70, // percentual estimado
      absenteeism: 15, // percentual estimado
      dailyStressLevel: 3, // escala 1-5
    },
    productivity: {
      perception: 54, // percentual
      concentration: {
        muitaDificuldade: 12,
        oscilaFrequencia: 34,
        naoTemDificuldade: 54,
      },
      decisionMaking: 46, // percentual com dificuldade
    },
  }

  const generateISPScore = () => {
    // Algoritmo simplificado baseado nos dados do relatório
    const weights = {
      sleepHealth: 0.23,
      physicalHealth: 0.2,
      mentalHealth: 0.17,
      nutritionalHealth: 0.16,
      stressManagement: 0.15,
      productivity: 0.09,
    }

    const scores = {
      sleepHealth: reportData.sleepHealth.perception,
      physicalHealth: reportData.physicalHealth.perception,
      mentalHealth: (5 - reportData.mentalHealth.perception) * 20, // Invertido pois 1 é melhor
      nutritionalHealth: reportData.nutritionalHealth.perception,
      stressManagement: (10 - reportData.stressManagement.perception) * 10, // Invertido
      productivity: reportData.productivity.perception,
    }

    const weightedScore = Object.entries(weights).reduce((total, [key, weight]) => {
      return total + scores[key] * weight
    }, 0)

    return Math.round(weightedScore)
  }

  const ispScore = generateISPScore()

  const exportToPDF = () => {
    // Implementar exportação para PDF
    console.log("Exportando relatório para PDF...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Relatório ISP</h1>
          <p className="text-muted-foreground">Índice de Saúde e Performance - {reportData.period}</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportToPDF} className="ukor-button">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" className="ukor-button-outline">
            <FileText className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
        </div>
      </div>

      {/* Cabeçalho do Relatório */}
      <Card className="ukor-card bg-gradient-to-r from-ukor-primary to-ukor-accent text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">ISP</h1>
            <h2 className="text-2xl mb-1">Índice de Saúde e Performance</h2>
            <h3 className="text-xl mb-4">{reportData.company}</h3>
            <p className="text-lg">{reportData.period}</p>
          </div>
          <div className="mt-8 text-center">
            <div className="text-6xl font-bold mb-2">{ispScore}</div>
            <p className="text-lg">Score ISP Geral</p>
          </div>
        </CardContent>
      </Card>

      {/* Introdução */}
      <Card className="ukor-card">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Transformando pessoas. Mais resultados para empresas.
          </h3>
          <p className="text-muted-foreground mb-4">
            Este relatório tem como objetivo apresentar o ISP Índice de Saúde e Performance, um indicador da performance
            da empresa baseado na saúde e bem-estar dos colaboradores.
          </p>
          <p className="text-muted-foreground mb-4">
            Funcionários saudáveis, felizes e motivados produzem resultados de alta qualidade e eficiência, refletindo
            diretamente nos resultados da empresa. Eles são geralmente mais produtivos e criativos, gerando ideias
            inovadoras e aumentando a eficiência geral.
          </p>
          <p className="text-muted-foreground">
            Use essas informações para otimizar suas decisões sempre que for preciso e usufrua do plano de ação da Ukor
            para alavancar a sua performance.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
          <TabsTrigger value="environment">Ambiente</TabsTrigger>
          <TabsTrigger value="mental">Mental</TabsTrigger>
          <TabsTrigger value="physical">Física</TabsTrigger>
          <TabsTrigger value="sleep">Sono</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrição</TabsTrigger>
          <TabsTrigger value="stress">Estresse</TabsTrigger>
          <TabsTrigger value="productivity">Produtividade</TabsTrigger>
        </TabsList>

        {/* Perfil Populacional */}
        <TabsContent value="demographics">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5" />
                Perfil Populacional
              </CardTitle>
              <CardDescription>Análise detalhada das características demográficas da força de trabalho</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Gênero */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Gênero</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Mulher</span>
                      <span className="font-semibold text-foreground">{reportData.demographics.gender.mulher}%</span>
                    </div>
                    <Progress value={reportData.demographics.gender.mulher} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Homem</span>
                      <span className="font-semibold text-foreground">{reportData.demographics.gender.homem}%</span>
                    </div>
                    <Progress value={reportData.demographics.gender.homem} className="h-2" />
                  </div>
                </div>

                {/* Estado Civil */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Estado Civil</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.demographics.maritalStatus).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Raça */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Raça</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.demographics.race).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Faixa Etária */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Faixa Etária</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">18-30</span>
                      <span className="font-semibold text-foreground">
                        {reportData.demographics.ageRange.entre18e30}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">31-45</span>
                      <span className="font-semibold text-foreground">
                        {reportData.demographics.ageRange.entre31e45}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">46-55</span>
                      <span className="font-semibold text-foreground">
                        {reportData.demographics.ageRange.entre46e55}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ambiente de Trabalho */}
        <TabsContent value="environment">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Building className="h-5 w-5" />
                Segurança Psicológica e Senso de Pertencimento
              </CardTitle>
              <CardDescription>Análise do ambiente de trabalho e fatores que impactam a performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Regime de Trabalho */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Regime de Trabalho</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Home Office</span>
                      <span className="font-semibold text-foreground">
                        {reportData.workEnvironment.workRegime.homeOffice}%
                      </span>
                    </div>
                    <Progress value={reportData.workEnvironment.workRegime.homeOffice} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Híbrido</span>
                      <span className="font-semibold text-foreground">
                        {reportData.workEnvironment.workRegime.hibrido}%
                      </span>
                    </div>
                    <Progress value={reportData.workEnvironment.workRegime.hibrido} className="h-2" />
                  </div>
                </div>

                {/* Métricas de Ambiente */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Segurança Psicológica</span>
                      <Badge className="bg-green-100 text-green-800">
                        {reportData.workEnvironment.psychologicalSafety}%
                      </Badge>
                    </div>
                    <Progress value={reportData.workEnvironment.psychologicalSafety} className="h-2" />
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Senso de Pertencimento</span>
                      <Badge className="bg-green-100 text-green-800">
                        {reportData.workEnvironment.belongingSense}%
                      </Badge>
                    </div>
                    <Progress value={reportData.workEnvironment.belongingSense} className="h-2" />
                  </div>
                </div>

                {/* Tempo de Deslocamento */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Tempo de Deslocamento</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.workEnvironment.commutingTime).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {key === "ate30min" && "Até 30 min"}
                          {key === "aprox1h" && "Aprox. 1h"}
                          {key === "entre1h30e2h30" && "1h30-2h30"}
                          {key === "mais2h30" && "Mais 2h30"}
                        </span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-300">Intenção de Permanência</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{reportData.workEnvironment.stayIntention}%</div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Pretendem continuar na empresa nos próximos 12 meses
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-300">Remuneração Justa</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {reportData.workEnvironment.fairCompensation}%
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">Acreditam que a remuneração é justa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saúde Mental */}
        <TabsContent value="mental">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Brain className="h-5 w-5" />
                Saúde Mental
              </CardTitle>
              <CardDescription>O ambiente de trabalho e a saúde mental estão diretamente relacionados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {reportData.mentalHealth.depressionSigns}%
                  </div>
                  <div className="text-sm text-muted-foreground">Sinais de Depressão</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">{reportData.mentalHealth.fatigue}%</div>
                  <div className="text-sm text-muted-foreground">Fadiga</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {reportData.mentalHealth.confirmedDiagnosis}%
                  </div>
                  <div className="text-sm text-muted-foreground">Diagnóstico Confirmado</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">{reportData.mentalHealth.perception}/5</div>
                  <div className="text-sm text-muted-foreground">Percepção de Saúde Mental</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saúde Física */}
        <TabsContent value="physical">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Activity className="h-5 w-5" />
                Saúde Física
              </CardTitle>
              <CardDescription>
                Condição geral do corpo, força muscular, flexibilidade e resistência cardiovascular
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Risco de Sedentarismo</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-lg font-bold text-red-600">{reportData.physicalHealth.sedentaryRisk}%</div>
                      <div className="text-xs text-red-700 dark:text-red-400">Sedentário</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {100 - reportData.physicalHealth.sedentaryRisk}%
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-400">Não Sedentário</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Problemas de Saúde</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">
                        {reportData.physicalHealth.healthProblems}%
                      </div>
                      <div className="text-xs text-yellow-700 dark:text-yellow-400">Possui</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {100 - reportData.physicalHealth.healthProblems}%
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-400">Não Possui</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Outros Indicadores</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tabagistas</span>
                      <span className="font-semibold text-foreground">{reportData.physicalHealth.smokers}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Check-up Recente</span>
                      <span className="font-semibold text-foreground">{reportData.physicalHealth.recentCheckup}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Risco de Alcoolismo</span>
                      <span className="font-semibold text-foreground">{reportData.physicalHealth.alcoholismRisk}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saúde do Sono */}
        <TabsContent value="sleep">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Moon className="h-5 w-5" />
                Saúde do Sono
              </CardTitle>
              <CardDescription>
                A qualidade do sono tem um grande impacto na saúde física e mental dos colaboradores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tempo de Sono */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Tempo de Sono</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.sleepHealth.sleepTime).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {key === "h7a8" && "7-8 horas"}
                          {key === "h8a9" && "8-9 horas"}
                          {key === "menor5h" && "< 5 horas"}
                          {key === "h6" && "6 horas"}
                          {key === "maior9h" && "> 9 horas"}
                        </span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medicamentos para Dormir */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Uso de Medicamentos/Suplementos</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.sleepHealth.sleepMedication).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Indicadores de Qualidade */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Coffee className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-foreground">Abuso de Cafeína</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-600">{reportData.sleepHealth.caffeineAbuse}%</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-foreground">Dificuldade para Dormir</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{reportData.sleepHealth.sleepDifficulty}%</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-foreground">Impacto do Trabalho</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {reportData.sleepHealth.workImpactOnSleep}%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saúde Nutricional */}
        <TabsContent value="nutrition">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Apple className="h-5 w-5" />
                Saúde Nutricional
              </CardTitle>
              <CardDescription>
                A saúde nutricional influencia diretamente os níveis de energia e funcionamento do corpo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Peso Ideal */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Peso Ideal</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.nutritionalHealth.idealWeight).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {key === "acimaIdeal" && "Acima do ideal"}
                          {key === "pertoIdeal" && "Perto do ideal"}
                          {key === "abaixoIdeal" && "Abaixo do ideal"}
                        </span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consumo de Frutas */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Consumo de Frutas (semanal)</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.nutritionalHealth.fruitConsumption).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {key === "mais5vezes" && "Mais de 5x"}
                          {key === "entre4e5" && "4-5x"}
                          {key === "vezes3" && "3x"}
                          {key === "menos2" && "Menos de 2x"}
                        </span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consumo de Vegetais */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Consumo de Vegetais (semanal)</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.nutritionalHealth.vegetableConsumption).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {key === "menos1vez" && "Menos de 1x"}
                          {key === "entre1e2" && "1-2x"}
                          {key === "entre3e5" && "3-5x"}
                          {key === "entre6e7" && "6-7x"}
                        </span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ultraprocessados */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Ultraprocessados (semanal)</h4>
                  <div className="space-y-2">
                    {Object.entries(reportData.nutritionalHealth.ultraProcessedConsumption).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {key === "menos1vez" && "Menos de 1x"}
                          {key === "entre1e2" && "1-2x"}
                          {key === "entre3e5" && "3-5x"}
                          {key === "entre6e7" && "6-7x"}
                        </span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestão de Estresse */}
        <TabsContent value="stress">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Zap className="h-5 w-5" />
                Gestão de Estresse
              </CardTitle>
              <CardDescription>A gestão de estresse é fundamental para a saúde e equilíbrio emocional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {reportData.stressManagement.perception}/10
                  </div>
                  <div className="text-sm text-muted-foreground">Nível de Estresse</div>
                  <div className="mt-2">{"⚡".repeat(reportData.stressManagement.perception)}</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {reportData.stressManagement.stressfulRoutine}%
                  </div>
                  <div className="text-sm text-muted-foreground">Rotina Estressante</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {reportData.stressManagement.workCausedStress}%
                  </div>
                  <div className="text-sm text-muted-foreground">Causa é o Trabalho</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {reportData.stressManagement.absenteeism}%
                  </div>
                  <div className="text-sm text-muted-foreground">Praticou Absenteísmo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Produtividade */}
        <TabsContent value="productivity">
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5" />
                Produtividade
              </CardTitle>
              <CardDescription>
                Ser produtivo é a chave para otimizar nosso tempo e maximizar nosso potencial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Concentração</h4>
                  <div className="space-y-3">
                    {Object.entries(reportData.productivity.concentration).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm text-muted-foreground">
                          {key === "muitaDificuldade" && "Muita dificuldade"}
                          {key === "oscilaFrequencia" && "Oscila com frequência"}
                          {key === "naoTemDificuldade" && "Não tem dificuldade"}
                        </span>
                        <span className="font-semibold text-foreground">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Percepção de Produtividade</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-1">{reportData.productivity.perception}%</div>
                    <Progress value={reportData.productivity.perception} className="h-3" />
                  </div>

                  <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                      Dificuldade em Tomar Decisões
                    </h4>
                    <div className="text-3xl font-bold text-amber-600 mb-1">
                      {reportData.productivity.decisionMaking}%
                    </div>
                    <Progress value={reportData.productivity.decisionMaking} className="h-3" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Geração de PDF */}
      <PDFGenerator reportData={reportData} companyName={companyName} period={reportData.period} />

      {/* Rodapé */}
      <Card className="ukor-card bg-gradient-to-r from-ukor-primary to-ukor-accent text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Transformando pessoas. Mais resultados para empresas.</h3>
          <p className="text-sm opacity-90">Acesse nossas redes</p>
        </CardContent>
      </Card>
    </div>
  )
}
