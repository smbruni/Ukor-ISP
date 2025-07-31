"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Heart,
  Moon,
  Briefcase,
  Users,
  Shield,
  Activity,
  Stethoscope,
  Apple,
  Zap,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Target,
} from "lucide-react"

export function CareLinesContent() {
  const [activeLine, setActiveLine] = useState("mental-health")

  // Dados baseados na Unimed-BH
  const careLines = [
    {
      id: "mental-health",
      name: "Saúde Mental",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-purple-500",
      priority: "ALTA",
      conditions: ["Depressão", "Ansiedade", "Estresse", "Burnout"],
      interventions: ["Psicoterapia", "Psiquiatria", "Mindfulness", "Coaching"],
      programs: ["Bem-estar emocional", "Prevenção suicídio"],
      current_cost: 180000,
      affected_users: 156,
      potential_savings: 120000,
      roi: 167,
      impact_absenteeism: -35,
      impact_productivity: 28,
      implementation_time: "2-3 meses",
      protocols: [
        "Triagem psicológica anual",
        "Programa anti-burnout",
        "Suporte 24h psicológico",
        "Workshops mindfulness",
      ],
    },
    {
      id: "chronic-diseases",
      name: "Doenças Crônicas (DCNTs)",
      icon: <Heart className="h-6 w-6" />,
      color: "bg-red-500",
      priority: "CRÍTICA",
      conditions: ["Hipertensão", "Diabetes", "Obesidade", "Dislipidemia"],
      interventions: ["Monitoramento contínuo", "Educação em saúde", "Protocolos clínicos"],
      programs: ["Controle fatores de risco", "Alimentação", "Exercícios"],
      current_cost: 420000,
      affected_users: 234,
      potential_savings: 280000,
      roi: 267,
      impact_absenteeism: -45,
      impact_productivity: 32,
      implementation_time: "1-2 meses",
      protocols: [
        "Monitoramento glicemia/PA",
        "Consultas trimestrais",
        "Programa nutricional",
        "Exercícios supervisionados",
      ],
    },
    {
      id: "sleep-health",
      name: "Saúde do Sono",
      icon: <Moon className="h-6 w-6" />,
      color: "bg-indigo-500",
      priority: "ALTA",
      conditions: ["Insônia", "Apneia do sono", "Má qualidade do sono"],
      interventions: ["Polissonografia", "Reeducação do sono", "Higiene do sono"],
      programs: ["Intervenção cognitivo-comportamental"],
      current_cost: 95000,
      affected_users: 187,
      potential_savings: 85000,
      roi: 189,
      impact_absenteeism: -25,
      impact_productivity: 35,
      implementation_time: "1-2 meses",
      protocols: [
        "Questionário qualidade sono",
        "Polissonografia seletiva",
        "Programa higiene do sono",
        "CPAP quando necessário",
      ],
    },
    {
      id: "occupational-health",
      name: "Saúde do Trabalhador",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-orange-500",
      priority: "ALTA",
      conditions: ["LER/DORT", "Ergonomia", "Acidentes trabalho"],
      interventions: ["Avaliações periódicas", "Ergonomia", "Prevenção LER/DORT"],
      programs: ["Monitoramento absenteísmo", "Segurança corporativa"],
      current_cost: 145000,
      affected_users: 89,
      potential_savings: 95000,
      roi: 165,
      impact_absenteeism: -40,
      impact_productivity: 25,
      implementation_time: "2-4 meses",
      protocols: ["Avaliação ergonômica", "Ginástica laboral", "Exames periódicos", "Treinamento segurança"],
    },
    {
      id: "womens-health",
      name: "Saúde da Mulher",
      icon: <Users className="h-6 w-6" />,
      color: "bg-pink-500",
      priority: "MÉDIA",
      conditions: ["Ginecologia", "Saúde reprodutiva", "Gestação", "Menopausa"],
      interventions: ["Papanicolau", "Mamografia", "Pré-natal"],
      programs: ["Atenção saúde mental feminina"],
      current_cost: 125000,
      affected_users: 456,
      potential_savings: 75000,
      roi: 160,
      impact_absenteeism: -20,
      impact_productivity: 15,
      implementation_time: "1-3 meses",
      protocols: ["Papanicolau anual", "Mamografia 40+", "Acompanhamento gestacional", "Suporte menopausa"],
    },
    {
      id: "mens-health",
      name: "Saúde do Homem",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-blue-500",
      priority: "MÉDIA",
      conditions: ["Câncer próstata", "Disfunções metabólicas", "Cardiovascular"],
      interventions: ["PSA", "Incentivo adesão", "Enfrentamento negligência"],
      programs: ["Conscientização masculina"],
      current_cost: 98000,
      affected_users: 531,
      potential_savings: 65000,
      roi: 166,
      impact_absenteeism: -15,
      impact_productivity: 12,
      implementation_time: "2-4 meses",
      protocols: ["PSA anual 45+", "Campanha conscientização", "Check-up masculino", "Prevenção cardiovascular"],
    },
    {
      id: "oncology",
      name: "Oncologia",
      icon: <Activity className="h-6 w-6" />,
      color: "bg-red-600",
      priority: "CRÍTICA",
      conditions: ["Rastreamento", "Diagnóstico precoce", "Tratamento", "Reabilitação"],
      interventions: ["Navegação paciente", "Apoio psicológico", "Cuidados paliativos"],
      programs: ["Detecção precoce", "Suporte integral"],
      current_cost: 406000,
      affected_users: 4,
      potential_savings: 230000,
      roi: 157,
      impact_absenteeism: -60,
      impact_productivity: 45,
      implementation_time: "Imediato",
      protocols: [
        "Rastreamento sistemático",
        "Fast-track diagnóstico",
        "Navegador oncológico",
        "Suporte psico-oncológico",
      ],
    },
    {
      id: "cardiovascular",
      name: "Saúde Cardiovascular",
      icon: <Stethoscope className="h-6 w-6" />,
      color: "bg-red-500",
      priority: "ALTA",
      conditions: ["Infarto", "AVC", "Hipertensão", "Insuficiência cardíaca"],
      interventions: ["Acompanhamento clínico", "Reabilitação cardíaca"],
      programs: ["Prevenção primária e secundária"],
      current_cost: 285000,
      affected_users: 167,
      potential_savings: 185000,
      roi: 165,
      impact_absenteeism: -35,
      impact_productivity: 28,
      implementation_time: "1-3 meses",
      protocols: ["Estratificação risco", "Reabilitação cardíaca", "Controle pressórico", "Prevenção secundária"],
    },
    {
      id: "nutrition",
      name: "Saúde Nutricional",
      icon: <Apple className="h-6 w-6" />,
      color: "bg-green-500",
      priority: "MÉDIA",
      conditions: ["Transtornos alimentares", "Obesidade", "Desnutrição", "Síndrome metabólica"],
      interventions: ["Intervenção nutricional", "Educação alimentar", "Coaching nutricional"],
      programs: ["Alimentação personalizada"],
      current_cost: 78000,
      affected_users: 298,
      potential_savings: 65000,
      roi: 183,
      impact_absenteeism: -20,
      impact_productivity: 22,
      implementation_time: "1-2 meses",
      protocols: [
        "Avaliação nutricional",
        "Plano alimentar personalizado",
        "Acompanhamento mensal",
        "Educação nutricional",
      ],
    },
    {
      id: "rehabilitation",
      name: "Reabilitação e Dor",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-yellow-500",
      priority: "MÉDIA",
      conditions: ["Dores musculoesqueléticas", "Fibromialgia", "Pós-operatório"],
      interventions: ["Fisioterapia", "Reabilitação funcional", "Analgesia"],
      programs: ["Controle dor crônica"],
      current_cost: 156000,
      affected_users: 123,
      potential_savings: 89000,
      roi: 157,
      impact_absenteeism: -30,
      impact_productivity: 25,
      implementation_time: "2-3 meses",
      protocols: [
        "Avaliação funcional",
        "Fisioterapia direcionada",
        "Controle dor multimodal",
        "Reabilitação ocupacional",
      ],
    },
  ]

  const currentLine = careLines.find((line) => line.id === activeLine) || careLines[0]

  // Cálculos consolidados
  const totalCurrentCost = careLines.reduce((sum, line) => sum + line.current_cost, 0)
  const totalPotentialSavings = careLines.reduce((sum, line) => sum + line.potential_savings, 0)
  const totalAffectedUsers = careLines.reduce((sum, line) => sum + line.affected_users, 0)
  const averageROI = Math.round(careLines.reduce((sum, line) => sum + line.roi, 0) / careLines.length)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Linhas de Cuidado Estratégicas</h2>
        <p className="text-muted-foreground">
          Protocolos baseados nos dados reais da Unimed-BH para reduzir custos e melhorar indicadores
        </p>
      </div>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Custo Atual Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(totalCurrentCost / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Todas as linhas de cuidado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Economia Potencial</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {(totalPotentialSavings / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Com implementação completa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Usuários Impactados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAffectedUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalAffectedUsers / 987) * 100)}% dos beneficiários
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageROI}%</div>
            <p className="text-xs text-muted-foreground">Retorno sobre investimento</p>
          </CardContent>
        </Card>
      </div>

      {/* Seletor de Linhas de Cuidado */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {careLines.map((line) => (
          <Button
            key={line.id}
            variant={activeLine === line.id ? "default" : "outline"}
            onClick={() => setActiveLine(line.id)}
            className="h-auto p-3 flex flex-col items-center gap-2"
          >
            <div className={`p-2 rounded-full ${line.color} text-white`}>{line.icon}</div>
            <span className="text-xs text-center font-medium">{line.name}</span>
            <Badge
              variant={line.priority === "CRÍTICA" ? "destructive" : line.priority === "ALTA" ? "secondary" : "outline"}
              className="text-xs"
            >
              {line.priority}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Detalhes da Linha Selecionada */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${currentLine.color} text-white`}>{currentLine.icon}</div>
              <div>
                <CardTitle>{currentLine.name}</CardTitle>
                <CardDescription>
                  {currentLine.affected_users} usuários impactados • Implementação: {currentLine.implementation_time}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Indicadores Financeiros */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Custo Atual</span>
                <div className="text-lg font-bold text-red-600">R$ {(currentLine.current_cost / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Economia Potencial</span>
                <div className="text-lg font-bold text-green-600">
                  R$ {(currentLine.potential_savings / 1000).toFixed(0)}K
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">ROI</span>
                <div className="text-lg font-bold text-blue-600">{currentLine.roi}%</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Usuários</span>
                <div className="text-lg font-bold">{currentLine.affected_users}</div>
              </div>
            </div>

            {/* Impacto nos Indicadores */}
            <div>
              <h4 className="font-medium mb-3">Impacto nos Indicadores Estratégicos</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Redução Absenteísmo</span>
                    <span className="text-sm font-medium text-green-600">
                      {Math.abs(currentLine.impact_absenteeism)}%
                    </span>
                  </div>
                  <Progress value={Math.abs(currentLine.impact_absenteeism)} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Aumento Produtividade</span>
                    <span className="text-sm font-medium text-blue-600">{currentLine.impact_productivity}%</span>
                  </div>
                  <Progress value={currentLine.impact_productivity} className="h-2" />
                </div>
              </div>
            </div>

            {/* Condições e Intervenções */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-sm mb-2">Condições Principais:</h5>
                <div className="flex flex-wrap gap-1">
                  {currentLine.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-2">Intervenções:</h5>
                <div className="flex flex-wrap gap-1">
                  {currentLine.interventions.map((intervention, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {intervention}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protocolos e Ações */}
        <Card>
          <CardHeader>
            <CardTitle>Protocolos de Implementação</CardTitle>
            <CardDescription>Ações práticas para {currentLine.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentLine.protocols.map((protocol, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{protocol}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <h5 className="font-medium">Programas Complementares:</h5>
              {currentLine.programs.map((program, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {program}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priorização por Impacto */}
      <Card>
        <CardHeader>
          <CardTitle>Priorização por Impacto vs Investimento</CardTitle>
          <CardDescription>Linhas de cuidado ordenadas por potencial de retorno</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {careLines
              .sort((a, b) => b.roi - a.roi)
              .slice(0, 5)
              .map((line, index) => (
                <div key={line.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${line.color} text-white`}>{line.icon}</div>
                    <div>
                      <span className="font-medium">{line.name}</span>
                      <div className="text-sm text-muted-foreground">
                        {line.affected_users} usuários • {line.implementation_time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">ROI {line.roi}%</div>
                    <div className="text-sm text-muted-foreground">
                      R$ {(line.potential_savings / 1000).toFixed(0)}K economia
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button className="gap-2">
          <Target className="h-4 w-4" />
          Implementar Linha Prioritária
        </Button>
        <Button variant="outline" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          Calcular ROI Personalizado
        </Button>
        <Button variant="outline" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Definir Protocolos
        </Button>
      </div>
    </div>
  )
}
