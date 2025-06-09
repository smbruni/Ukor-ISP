"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Shield,
  Activity,
  Calendar,
  FileText,
  TrendingUp,
  Eye,
  Stethoscope,
  Brain,
  Target,
} from "lucide-react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

export function PediatricAnalysis() {
  const [activeTab, setActiveTab] = useState("overview")

  // Dados do exame da Maria Eduarda
  const patientData = {
    nome: "Maria Eduarda Arilla Bruni",
    idade: "6 anos e 7 meses",
    dataNascimento: "18/10/2018",
    dataExame: "04/06/2025",
    laboratorio: "Fleury",
    medico: "CRM 900959",
  }

  // Análise detalhada dos resultados
  const examResults = {
    hemograma: {
      status: "NORMAL",
      alertas: [],
      resultados: [
        { parametro: "Eritrócitos", valor: 4.79, unidade: "milhões/mm³", referencia: "4,10-5,20", status: "normal" },
        { parametro: "Hemoglobina", valor: 13.6, unidade: "g/dL", referencia: "11,5-14,3", status: "normal" },
        { parametro: "Hematócrito", valor: 39.4, unidade: "%", referencia: "34,0-42,0", status: "normal" },
        { parametro: "VCM", valor: 82.3, unidade: "fL", referencia: "77,8-91,1", status: "normal" },
        { parametro: "HCM", valor: 28.4, unidade: "pg", referencia: "27,0-33,0", status: "normal" },
        { parametro: "CHCM", valor: 34.5, unidade: "g/dL", referencia: "32,0-36,0", status: "normal" },
        { parametro: "RDW", valor: 12.6, unidade: "%", referencia: "11,4-13,5", status: "normal" },
        { parametro: "Leucócitos", valor: 8160, unidade: "/mm³", referencia: "3.800-10.400", status: "normal" },
        { parametro: "Plaquetas", valor: 302000, unidade: "/mm³", referencia: "187.000-400.000", status: "normal" },
      ],
    },
    ferro: {
      status: "NORMAL",
      alertas: [],
      resultados: [
        { parametro: "Ferritina", valor: 61, unidade: "mcg/L", referencia: "10-150", status: "normal" },
        { parametro: "Ferro sérico", valor: 93, unidade: "mcg/dL", referencia: "50-120", status: "normal" },
        { parametro: "Saturação transferrina", valor: 28, unidade: "%", referencia: "15-50", status: "normal" },
      ],
    },
    lipidograma: {
      status: "ATENÇÃO",
      alertas: ["Colesterol total elevado"],
      resultados: [
        { parametro: "Colesterol total", valor: 190, unidade: "mg/dL", referencia: "<170", status: "elevado" },
        { parametro: "LDL-colesterol", valor: 102, unidade: "mg/dL", referencia: "<110", status: "normal" },
        { parametro: "HDL-colesterol", valor: 74, unidade: "mg/dL", referencia: ">45", status: "excelente" },
        { parametro: "Triglicerídeos", valor: 55, unidade: "mg/dL", referencia: "<75", status: "normal" },
        { parametro: "Não-HDL colesterol", valor: 116, unidade: "mg/dL", referencia: "<120", status: "normal" },
      ],
    },
    metabolismo: {
      status: "NORMAL",
      alertas: [],
      resultados: [
        { parametro: "Glicose", valor: 83, unidade: "mg/dL", referencia: "70-99", status: "normal" },
        { parametro: "HbA1c", valor: 4.9, unidade: "%", referencia: "<5,7", status: "excelente" },
        { parametro: "Vitamina D", valor: 32, unidade: "ng/mL", referencia: ">20", status: "adequado" },
      ],
    },
    tireoide: {
      status: "ATENÇÃO",
      alertas: ["Anti-TPO elevado"],
      resultados: [
        { parametro: "TSH", valor: 3.2, unidade: "mUI/L", referencia: "0,70-6,0", status: "normal" },
        { parametro: "T4 total", valor: 9.6, unidade: "ug/dL", referencia: "5,9-14,7", status: "normal" },
        { parametro: "T3 total", valor: 221, unidade: "ng/dL", referencia: "92-248", status: "normal" },
        { parametro: "Anti-TPO", valor: 59, unidade: "U/mL", referencia: "<34", status: "elevado" },
        { parametro: "TRAb", valor: "<1,0", unidade: "U/L", referencia: "<1,0", status: "normal" },
      ],
    },
    alergia: {
      status: "ATENÇÃO",
      alertas: ["IgE total elevada"],
      resultados: [{ parametro: "IgE total", valor: 147, unidade: "kU/L", referencia: "<90", status: "elevado" }],
    },
    funcaoRenal: {
      status: "NORMAL",
      alertas: [],
      resultados: [
        { parametro: "Creatinina", valor: 0.44, unidade: "mg/dL", referencia: "0,30-0,70", status: "normal" },
        { parametro: "Ureia", valor: 32, unidade: "mg/dL", referencia: "10-50", status: "normal" },
        { parametro: "Urina I", valor: "Normal", unidade: "", referencia: "Normal", status: "normal" },
      ],
    },
    minerais: {
      status: "ATENÇÃO",
      alertas: ["Fósforo discretamente elevado"],
      resultados: [
        { parametro: "Cálcio", valor: 10.1, unidade: "mg/dL", referencia: "8,8-10,8", status: "normal" },
        { parametro: "Cálcio ionizado", valor: 1.31, unidade: "mmol/L", referencia: "1,11-1,40", status: "normal" },
        { parametro: "Fósforo", valor: 5.6, unidade: "mg/dL", referencia: "4,5-5,5", status: "discretamente_elevado" },
        { parametro: "Magnésio", valor: 2.2, unidade: "mg/dL", referencia: "1,7-2,3", status: "normal" },
        { parametro: "PTH", valor: 20, unidade: "pg/mL", referencia: "11-60", status: "normal" },
        { parametro: "Fosfatase alcalina", valor: 294, unidade: "U/L", referencia: "142-335", status: "normal" },
      ],
    },
  }

  // Pontos de atenção identificados
  const pontosAtencao = [
    {
      categoria: "Lipídico",
      problema: "Colesterol Total Elevado",
      valor: "190 mg/dL",
      referencia: "<170 mg/dL",
      risco: "MÉDIO",
      impacto: "Risco cardiovascular futuro",
      acao: "Avaliação nutricional e mudanças dietéticas",
    },
    {
      categoria: "Imunológico",
      problema: "Anti-TPO Elevado",
      valor: "59 U/mL",
      referencia: "<34 U/mL",
      risco: "MÉDIO",
      impacto: "Possível predisposição à tireoidite autoimune",
      acao: "Monitoramento anual da função tireoidiana",
    },
    {
      categoria: "Alérgico",
      problema: "IgE Total Elevada",
      valor: "147 kU/L",
      referencia: "<90 kU/L",
      risco: "BAIXO",
      impacto: "Predisposição alérgica",
      acao: "Investigação de alérgenos específicos se sintomas",
    },
    {
      categoria: "Mineral",
      problema: "Fósforo Discretamente Elevado",
      valor: "5,6 mg/dL",
      referencia: "4,5-5,5 mg/dL",
      risco: "BAIXO",
      impacto: "Variação fisiológica em crescimento",
      acao: "Reavaliação em 6 meses",
    },
  ]

  // Plano de ação detalhado
  const planoAcao = {
    imediato: [
      {
        acao: "Consulta com Nutricionista Pediátrica",
        prazo: "15 dias",
        objetivo: "Adequação dietética para redução do colesterol",
        responsavel: "Nutricionista especializada em pediatria",
      },
      {
        acao: "Avaliação Cardiológica Pediátrica",
        prazo: "30 dias",
        objetivo: "Estratificação de risco cardiovascular familiar",
        responsavel: "Cardiologista pediátrico",
      },
    ],
    curto_prazo: [
      {
        acao: "Repetir Lipidograma",
        prazo: "3 meses",
        objetivo: "Avaliar resposta às mudanças dietéticas",
        responsavel: "Pediatra assistente",
      },
      {
        acao: "Investigação Alérgica Específica",
        prazo: "2 meses",
        objetivo: "RAST para alérgenos comuns (se sintomas)",
        responsavel: "Alergista pediátrico",
      },
    ],
    medio_prazo: [
      {
        acao: "Monitoramento Tireoidiano",
        prazo: "6 meses",
        objetivo: "TSH, T4L e Anti-TPO de controle",
        responsavel: "Endocrinologista pediátrico",
      },
      {
        acao: "Avaliação Nutricional Completa",
        prazo: "6 meses",
        objetivo: "Adequação do crescimento e desenvolvimento",
        responsavel: "Nutricionista + Pediatra",
      },
    ],
    longo_prazo: [
      {
        acao: "Check-up Anual Completo",
        prazo: "12 meses",
        objetivo: "Monitoramento global da saúde",
        responsavel: "Pediatra assistente",
      },
      {
        acao: "Educação em Saúde Familiar",
        prazo: "Contínuo",
        objetivo: "Hábitos saudáveis e prevenção",
        responsavel: "Equipe multidisciplinar",
      },
    ],
  }

  // Evolução temporal (comparação com exame anterior)
  const evolucaoTemporal = [
    {
      parametro: "Hemoglobina",
      anterior: 13.9,
      atual: 13.6,
      tendencia: "estavel",
      data_anterior: "02/03/2020",
    },
    {
      parametro: "Leucócitos",
      anterior: 13710,
      atual: 8160,
      tendencia: "melhora",
      data_anterior: "02/03/2020",
    },
    {
      parametro: "TSH",
      anterior: 4.4,
      atual: 3.2,
      tendencia: "melhora",
      data_anterior: "02/03/2020",
    },
    {
      parametro: "Vitamina D",
      anterior: 46,
      atual: 32,
      tendencia: "atencao",
      data_anterior: "02/03/2020",
    },
  ]

  // Recomendações preventivas
  const prevencao = {
    nutricional: [
      "Reduzir alimentos ricos em gordura saturada",
      "Aumentar consumo de fibras (frutas, verduras, cereais integrais)",
      "Limitar doces e alimentos processados",
      "Incentivar consumo de peixes ricos em ômega-3",
      "Manter hidratação adequada",
    ],
    atividade_fisica: [
      "Mínimo 60 minutos de atividade física diária",
      "Esportes em grupo para socialização",
      "Reduzir tempo de tela (<2h/dia)",
      "Atividades ao ar livre para síntese de vitamina D",
    ],
    monitoramento: [
      "Acompanhamento pediátrico regular (6/6 meses)",
      "Controle de peso e crescimento",
      "Monitoramento da função tireoidiana anual",
      "Avaliação oftalmológica anual",
      "Avaliação odontológica semestral",
    ],
  }

  // Score de risco pediátrico
  const riskScore = {
    cardiovascular: 25, // Baixo-médio devido ao colesterol
    metabolico: 10, // Baixo
    autoimune: 35, // Médio devido ao Anti-TPO
    alergico: 30, // Baixo-médio devido ao IgE
    geral: 25, // Baixo-médio
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
      case "excelente":
        return "text-green-600"
      case "elevado":
      case "discretamente_elevado":
        return "text-orange-600"
      case "critico":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "NORMAL":
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>
      case "ATENÇÃO":
        return <Badge className="bg-orange-100 text-orange-800">Atenção</Badge>
      case "CRÍTICO":
        return <Badge className="bg-red-100 text-red-800">Crítico</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análise Pediátrica Detalhada</h2>
        <p className="text-muted-foreground">Análise completa dos exames laboratoriais - {patientData.nome}</p>
      </div>

      {/* Informações do Paciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dados do Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Nome:</span>
              <div className="font-medium">{patientData.nome}</div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Idade:</span>
              <div className="font-medium">{patientData.idade}</div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Data do Exame:</span>
              <div className="font-medium">{patientData.dataExame}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="detailed">Resultados Detalhados</TabsTrigger>
          <TabsTrigger value="alerts">Pontos de Atenção</TabsTrigger>
          <TabsTrigger value="action-plan">Plano de Ação</TabsTrigger>
          <TabsTrigger value="evolution">Evolução</TabsTrigger>
          <TabsTrigger value="prevention">Prevenção</TabsTrigger>
        </TabsList>

        {/* Tab 1: Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          {/* Status Geral por Sistema */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Hemograma
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getStatusBadge(examResults.hemograma.status)}
                <p className="text-xs text-muted-foreground mt-1">Série vermelha e branca normais</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Lipídico
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getStatusBadge(examResults.lipidograma.status)}
                <p className="text-xs text-muted-foreground mt-1">Colesterol total elevado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Tireoide
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getStatusBadge(examResults.tireoide.status)}
                <p className="text-xs text-muted-foreground mt-1">Anti-TPO elevado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Alergia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getStatusBadge(examResults.alergia.status)}
                <p className="text-xs text-muted-foreground mt-1">IgE total elevada</p>
              </CardContent>
            </Card>
          </div>

          {/* Score de Risco */}
          <Card>
            <CardHeader>
              <CardTitle>Score de Risco Pediátrico</CardTitle>
              <CardDescription>Avaliação de riscos por sistema</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={Object.entries(riskScore).map(([key, value]) => ({ subject: key, score: value }))}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Risco" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Resumo Executivo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Resumo Executivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-medium text-green-800">✅ Aspectos Positivos</h4>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>• Hemograma completamente normal</li>
                    <li>• Função renal excelente</li>
                    <li>• Metabolismo glicídico perfeito (HbA1c 4,9%)</li>
                    <li>• HDL-colesterol excelente (74 mg/dL)</li>
                    <li>• Função hepática normal</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-medium text-orange-800">⚠️ Pontos de Atenção</h4>
                  <ul className="text-sm text-orange-700 mt-2 space-y-1">
                    <li>• Colesterol total elevado (190 mg/dL) - requer intervenção nutricional</li>
                    <li>• Anti-TPO elevado (59 U/mL) - monitoramento tireoidiano necessário</li>
                    <li>• IgE total elevada (147 kU/L) - investigar alergias se sintomas</li>
                    <li>• Fósforo discretamente elevado - acompanhar evolução</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-800">📋 Recomendações Principais</h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Consulta nutricional urgente para adequação dietética</li>
                    <li>• Monitoramento anual da função tireoidiana</li>
                    <li>• Repetir lipidograma em 3 meses</li>
                    <li>• Manter acompanhamento pediátrico regular</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Resultados Detalhados */}
        <TabsContent value="detailed" className="space-y-6">
          {Object.entries(examResults).map(([sistema, dados]) => (
            <Card key={sistema}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="capitalize">{sistema.replace("_", " ")}</span>
                  {getStatusBadge(dados.status)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dados.resultados.map((resultado, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <span className="font-medium">{resultado.parametro}</span>
                        <div className="text-sm text-muted-foreground">Referência: {resultado.referencia}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${getStatusColor(resultado.status)}`}>
                          {resultado.valor} {resultado.unidade}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {resultado.status.replace("_", " ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Tab 3: Pontos de Atenção */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pontosAtencao.map((ponto, index) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{ponto.problema}</span>
                    <Badge
                      variant={
                        ponto.risco === "ALTO" ? "destructive" : ponto.risco === "MÉDIO" ? "secondary" : "outline"
                      }
                    >
                      {ponto.risco}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{ponto.categoria}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Valor encontrado:</span>
                        <div className="font-medium text-orange-600">{ponto.valor}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Referência:</span>
                        <div className="font-medium">{ponto.referencia}</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Impacto:</span>
                      <div className="text-sm">{ponto.impacto}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Ação recomendada:</span>
                      <div className="text-sm font-medium">{ponto.acao}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 4: Plano de Ação */}
        <TabsContent value="action-plan" className="space-y-6">
          {Object.entries(planoAcao).map(([prazo, acoes]) => (
            <Card key={prazo}>
              <CardHeader>
                <CardTitle className="capitalize flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {prazo.replace("_", " ")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {acoes.map((acao, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{acao.acao}</h4>
                        <Badge variant="outline">{acao.prazo}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Objetivo:</span>
                          <div>{acao.objetivo}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Responsável:</span>
                          <div className="font-medium">{acao.responsavel}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Tab 5: Evolução */}
        <TabsContent value="evolution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Temporal dos Parâmetros</CardTitle>
              <CardDescription>Comparação com exame anterior (02/03/2020)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evolucaoTemporal.map((param, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">{param.parametro}</span>
                      <div className="text-sm text-muted-foreground">
                        {param.data_anterior} → {patientData.dataExame}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span>{param.anterior}</span>
                        <span>→</span>
                        <span className="font-bold">{param.atual}</span>
                        {param.tendencia === "melhora" && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {param.tendencia === "atencao" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                        {param.tendencia === "estavel" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">{param.tendencia}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 6: Prevenção */}
        <TabsContent value="prevention" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Orientações Nutricionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {prevencao.nutricional.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Atividade Física
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {prevencao.atividade_fisica.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Monitoramento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {prevencao.monitoramento.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Gerar Relatório Completo
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Agendar Consultas
        </Button>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          Definir Lembretes
        </Button>
      </div>
    </div>
  )
}
