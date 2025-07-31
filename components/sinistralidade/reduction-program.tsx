"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Stethoscope,
  Brain,
  Heart,
  Activity,
  FileText,
  Zap,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts"

export function SinistralidadeReductionProgram() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPriority, setSelectedPriority] = useState(null)

  // Meta: De 110.04% para 75% em 6 meses
  const currentSinistralidade = 110.04
  const targetSinistralidade = 75.0
  const reductionNeeded = currentSinistralidade - targetSinistralidade // 35.04%

  // Projeção mensal de redução
  const monthlyProjection = [
    { month: "Jun/25", atual: 110.04, meta: 104.0, real: null, acoes: "Início programa" },
    { month: "Jul/25", atual: 110.04, meta: 98.0, real: null, acoes: "Gestão crônicos + Prevenção" },
    { month: "Ago/25", atual: 110.04, meta: 92.0, real: null, acoes: "Telemedicina + Rastreamento" },
    { month: "Set/25", atual: 110.04, meta: 86.0, real: null, acoes: "Cuidados domiciliares" },
    { month: "Out/25", atual: 110.04, meta: 81.0, real: null, acoes: "Prevenção intensiva" },
    { month: "Nov/25", atual: 110.04, meta: 78.0, real: null, acoes: "Otimização completa" },
    { month: "Dez/25", atual: 110.04, meta: 75.0, real: null, acoes: "Meta atingida" },
  ]

  // Prioridades de linha de cuidado baseadas no impacto na sinistralidade
  const linhasPrioridade = [
    {
      id: 1,
      nome: "Gestão de Casos Crônicos",
      prioridade: "CRÍTICA",
      impacto_sinistralidade: 18.5, // Redução esperada em %
      pacientes_alvo: 10,
      custo_atual: 1180000, // 42% do custo total
      economia_estimada: 590000,
      prazo: "30 dias",
      status: "Não iniciado",
      profissionais_necessarios: [
        { tipo: "Enfermeira Especializada", quantidade: 1, perfil: "Gestão de crônicos", dedicacao: "40h/semana" },
        { tipo: "Médico Coordenador", quantidade: 1, perfil: "Clínica médica", dedicacao: "20h/semana" },
        { tipo: "Psicóloga", quantidade: 1, perfil: "Saúde mental", dedicacao: "16h/semana" },
      ],
      recursos_necessarios: [
        { item: "Telemedicina", descricao: "Plataforma para consultas remotas", custo: 15000 },
        { item: "Glicosímetros", descricao: "Monitoramento domiciliar", custo: 8000 },
        { item: "Oxímetros", descricao: "Para pacientes DPOC", custo: 3000 },
        { item: "Balança digital", descricao: "Controle peso domiciliar", custo: 2000 },
      ],
      protocolos: [
        "Consulta semanal enfermagem (presencial/remota)",
        "Monitoramento diário sinais vitais",
        "Acompanhamento psicológico quinzenal",
        "Revisão medicamentosa mensal",
        "Plano de cuidados individualizado",
        "Educação familiar",
      ],
      kpis: [
        { nome: "Redução internações", meta: 40, atual: 0 },
        { nome: "Adesão medicamentosa", meta: 90, atual: 65 },
        { nome: "Controle glicêmico", meta: 80, atual: 45 },
        { nome: "Satisfação paciente", meta: 4.5, atual: 3.8 },
      ],
    },
    {
      id: 2,
      nome: "Prevenção Oncológica Intensiva",
      prioridade: "CRÍTICA",
      impacto_sinistralidade: 12.3,
      pacientes_alvo: 68, // 6.86% fazem sangue oculto, expandir para todos elegíveis
      custo_atual: 406000, // 4 casos oncológicos
      economia_estimada: 203000,
      prazo: "45 dias",
      status: "Não iniciado",
      profissionais_necessarios: [
        { tipo: "Enfermeira Oncológica", quantidade: 1, perfil: "Oncologia", dedicacao: "30h/semana" },
        { tipo: "Médico Oncologista", quantidade: 1, perfil: "Consultoria", dedicacao: "8h/semana" },
        { tipo: "Técnico Enfermagem", quantidade: 2, perfil: "Coleta exames", dedicacao: "20h/semana" },
      ],
      recursos_necessarios: [
        { item: "Kits Sangue Oculto", descricao: "Para 900 beneficiários", custo: 27000 },
        { item: "Mamografias", descricao: "Rastreamento mulheres 40+", custo: 45000 },
        { item: "PSA", descricao: "Rastreamento homens 45+", custo: 18000 },
        { item: "Ultrassom móvel", descricao: "Para rastreamento", custo: 80000 },
      ],
      protocolos: [
        "Rastreamento sangue oculto anual (100% cobertura)",
        "Mamografia anual mulheres 40+",
        "PSA anual homens 45+",
        "Consulta preventiva semestral",
        "Educação sobre sinais de alerta",
        "Follow-up rigoroso exames alterados",
      ],
      kpis: [
        { nome: "Cobertura sangue oculto", meta: 95, atual: 6.86 },
        { nome: "Detecção precoce", meta: 80, atual: 25 },
        { nome: "Tempo diagnóstico", meta: 30, atual: 90 },
        { nome: "Adesão rastreamento", meta: 85, atual: 15 },
      ],
    },
    {
      id: 3,
      nome: "Programa Cardiovascular Preventivo",
      prioridade: "ALTA",
      impacto_sinistralidade: 8.7,
      pacientes_alvo: 193, // 19.55% acima de 50 anos
      custo_atual: 234000,
      economia_estimada: 140000,
      prazo: "60 dias",
      status: "Não iniciado",
      profissionais_necessarios: [
        { tipo: "Enfermeira Cardiológica", quantidade: 1, perfil: "Cardiologia", dedicacao: "35h/semana" },
        { tipo: "Cardiologista", quantidade: 1, perfil: "Consultoria", dedicacao: "12h/semana" },
        { tipo: "Educador Físico", quantidade: 1, perfil: "Reabilitação cardíaca", dedicacao: "25h/semana" },
        { tipo: "Nutricionista", quantidade: 1, perfil: "Cardiometabólica", dedicacao: "20h/semana" },
      ],
      recursos_necessarios: [
        { item: "ECG portátil", descricao: "Para consultas", custo: 12000 },
        { item: "MAPA", descricao: "Monitoramento pressórico", custo: 8000 },
        { item: "Esteira ergométrica", descricao: "Teste esforço", custo: 25000 },
        { item: "Kit medicamentos", descricao: "Emergência cardíaca", custo: 5000 },
      ],
      protocolos: [
        "Estratificação risco cardiovascular",
        "Controle rigoroso PA e glicemia",
        "Programa exercícios supervisionados",
        "Cessação tabágica estruturada",
        "Acompanhamento nutricional",
        "Telemedicina para ajuste medicação",
      ],
      kpis: [
        { nome: "Controle PA", meta: 80, atual: 45 },
        { nome: "Controle glicêmico", meta: 75, atual: 38 },
        { nome: "Cessação tabágica", meta: 60, atual: 15 },
        { nome: "Adesão exercícios", meta: 70, atual: 20 },
      ],
    },
    {
      id: 4,
      nome: "Saúde Mental Corporativa",
      prioridade: "ALTA",
      impacto_sinistralidade: 6.2,
      pacientes_alvo: 45, // Estimativa baseada em prevalência
      custo_atual: 156000,
      economia_estimada: 78000,
      prazo: "30 dias",
      status: "Não iniciado",
      profissionais_necessarios: [
        { tipo: "Psicóloga Clínica", quantidade: 1, perfil: "Saúde mental", dedicacao: "40h/semana" },
        { tipo: "Psiquiatra", quantidade: 1, perfil: "Consultoria", dedicacao: "16h/semana" },
        { tipo: "Terapeuta Ocupacional", quantidade: 1, perfil: "Reabilitação", dedicacao: "20h/semana" },
      ],
      recursos_necessarios: [
        { item: "Plataforma Terapia Online", descricao: "Atendimentos remotos", custo: 18000 },
        { item: "Escalas Psicométricas", descricao: "Avaliação padronizada", custo: 3000 },
        { item: "Sala Terapia Grupal", descricao: "Equipamento audiovisual", custo: 15000 },
        { item: "Material Psicoeducativo", descricao: "Cartilhas e vídeos", custo: 5000 },
      ],
      protocolos: [
        "Triagem saúde mental anual",
        "Psicoterapia individual/grupal",
        "Acompanhamento psiquiátrico",
        "Programa prevenção suicídio",
        "Grupos terapêuticos por empresa",
        "Capacitação lideranças",
      ],
      kpis: [
        { nome: "Detecção precoce", meta: 85, atual: 30 },
        { nome: "Adesão tratamento", meta: 80, atual: 55 },
        { nome: "Redução afastamentos", meta: 50, atual: 0 },
        { nome: "Satisfação terapia", meta: 4.6, atual: 3.9 },
      ],
    },
    {
      id: 5,
      nome: "Medicina Preventiva Empresarial",
      prioridade: "MÉDIA",
      impacto_sinistralidade: 4.8,
      pacientes_alvo: 987, // Todos os beneficiários
      custo_atual: 89000,
      economia_estimada: 134000,
      prazo: "90 dias",
      status: "Não iniciado",
      profissionais_necessarios: [
        { tipo: "Médico do Trabalho", quantidade: 1, perfil: "Medicina preventiva", dedicacao: "30h/semana" },
        { tipo: "Enfermeira do Trabalho", quantidade: 2, perfil: "Saúde ocupacional", dedicacao: "40h/semana" },
        { tipo: "Técnico Enfermagem", quantidade: 3, perfil: "Coleta/vacinação", dedicacao: "40h/semana" },
      ],
      recursos_necessarios: [
        { item: "Unidade Móvel", descricao: "Atendimento nas empresas", custo: 120000 },
        { item: "Equipamentos Exames", descricao: "Básicos para check-up", custo: 45000 },
        { item: "Vacinas", descricao: "Programa vacinação", custo: 25000 },
        { item: "Sistema Gestão", descricao: "Prontuário eletrônico", custo: 30000 },
      ],
      protocolos: [
        "Check-up anual completo",
        "Vacinação em dia",
        "Rastreamento por faixa etária",
        "Educação em saúde",
        "Programa antitabagismo",
        "Controle obesidade",
      ],
      kpis: [
        { nome: "Cobertura check-up", meta: 90, atual: 25 },
        { nome: "Vacinação em dia", meta: 95, atual: 60 },
        { nome: "Detecção precoce", meta: 75, atual: 30 },
        { nome: "Adesão programas", meta: 70, atual: 15 },
      ],
    },
  ]

  // Cronograma de implementação
  const cronograma = [
    {
      fase: "Fase 1 - Emergencial (0-30 dias)",
      periodo: "Jun-Jul/25",
      acoes: [
        "Implementar gestão de casos crônicos",
        "Iniciar programa saúde mental",
        "Contratar enfermeira especializada",
        "Implementar telemedicina",
      ],
      reducao_esperada: 6.0,
      investimento: 180000,
    },
    {
      fase: "Fase 2 - Preventiva (30-60 dias)",
      periodo: "Jul-Ago/25",
      acoes: [
        "Lançar prevenção oncológica",
        "Iniciar programa cardiovascular",
        "Expandir rastreamento",
        "Capacitar equipes",
      ],
      reducao_esperada: 12.0,
      investimento: 220000,
    },
    {
      fase: "Fase 3 - Consolidação (60-90 dias)",
      periodo: "Ago-Set/25",
      acoes: ["Implementar medicina preventiva", "Otimizar processos", "Avaliar resultados", "Ajustar estratégias"],
      reducao_esperada: 8.0,
      investimento: 150000,
    },
    {
      fase: "Fase 4 - Otimização (90-180 dias)",
      periodo: "Set-Dez/25",
      acoes: ["Refinar protocolos", "Expandir cobertura", "Monitorar KPIs", "Atingir meta 75%"],
      reducao_esperada: 9.04,
      investimento: 100000,
    },
  ]

  // Recursos humanos necessários
  const recursosHumanos = {
    enfermeiras: {
      atual: 2,
      necessario: 5,
      gap: 3,
      perfis: [
        { especialidade: "Gestão de Crônicos", urgencia: "Crítica", salario: 8500 },
        { especialidade: "Oncologia", urgencia: "Crítica", salario: 9000 },
        { especialidade: "Cardiologia", urgencia: "Alta", salario: 8000 },
      ],
    },
    medicos: {
      atual: 0,
      necessario: 4,
      gap: 4,
      perfis: [
        { especialidade: "Coordenador Clínico", urgencia: "Crítica", salario: 15000 },
        { especialidade: "Oncologista", urgencia: "Crítica", salario: 12000 },
        { especialidade: "Cardiologista", urgencia: "Alta", salario: 10000 },
        { especialidade: "Médico do Trabalho", urgencia: "Média", salario: 12000 },
      ],
    },
    outros: {
      atual: 1, // Psicóloga
      necessario: 6,
      gap: 5,
      perfis: [
        { especialidade: "Psiquiatra", urgencia: "Alta", salario: 14000 },
        { especialidade: "Educador Físico", urgencia: "Média", salario: 5000 },
        { especialidade: "Nutricionista", urgencia: "Média", salario: 6000 },
        { especialidade: "Terapeuta Ocupacional", urgencia: "Baixa", salario: 5500 },
        { especialidade: "Técnicos Enfermagem", urgencia: "Alta", salario: 3500 },
      ],
    },
  }

  // Investimento total necessário
  const investimentoTotal = {
    recursos_humanos: 650000, // 6 meses
    equipamentos: 220000,
    tecnologia: 63000,
    exames_preventivos: 90000,
    medicamentos: 45000,
    total: 1068000,
  }

  // ROI esperado
  const roiEsperado = {
    economia_anual: 1945000, // Redução de 35% na sinistralidade
    investimento: 1068000,
    roi_percentual: 82.1,
    payback_meses: 6.6,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Programa de Redução de Sinistralidade</h2>
        <p className="text-muted-foreground">Meta: Reduzir de 110.04% para 75% até dezembro de 2025 (6 meses)</p>
      </div>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Sinistralidade Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">110.04%</div>
            <p className="text-xs text-muted-foreground">35.04% acima da meta</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Meta Dezembro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">75.0%</div>
            <p className="text-xs text-muted-foreground">Redução de 35.04%</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Investimento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ 1.07M</div>
            <p className="text-xs text-muted-foreground">6 meses</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ROI Esperado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">82.1%</div>
            <p className="text-xs text-muted-foreground">Payback 6.6 meses</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="priorities">Prioridades</TabsTrigger>
          <TabsTrigger value="timeline">Cronograma</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="individual">Cuidado Individual</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        </TabsList>

        {/* Tab 1: Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          {/* Projeção de Redução */}
          <Card>
            <CardHeader>
              <CardTitle>Projeção de Redução da Sinistralidade</CardTitle>
              <CardDescription>Evolução mensal esperada com implementação do programa</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name === "atual" ? "Atual" : "Meta"]}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return `${label} - ${payload[0].payload.acoes}`
                      }
                      return label
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="atual"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Atual"
                    strokeDasharray="5 5"
                  />
                  <Line type="monotone" dataKey="meta" stroke="#22c55e" strokeWidth={3} name="Meta" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Resumo das Linhas de Cuidado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {linhasPrioridade.slice(0, 3).map((linha) => (
              <Card key={linha.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{linha.nome}</CardTitle>
                    <Badge variant={linha.prioridade === "CRÍTICA" ? "destructive" : "default"}>
                      {linha.prioridade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Impacto:</span>
                        <div className="font-bold text-green-600">-{linha.impacto_sinistralidade}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pacientes:</span>
                        <div className="font-medium">{linha.pacientes_alvo}</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Economia Estimada:</span>
                      <div className="font-bold text-lg">R$ {(linha.economia_estimada / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Prazo:</span>
                      <div className="font-medium">{linha.prazo}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Investimento vs Retorno */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição do Investimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Recursos Humanos</span>
                    <span className="font-bold">R$ 650K (61%)</span>
                  </div>
                  <Progress value={61} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Equipamentos</span>
                    <span className="font-bold">R$ 220K (21%)</span>
                  </div>
                  <Progress value={21} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Exames Preventivos</span>
                    <span className="font-bold">R$ 90K (8%)</span>
                  </div>
                  <Progress value={8} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Tecnologia</span>
                    <span className="font-bold">R$ 63K (6%)</span>
                  </div>
                  <Progress value={6} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Medicamentos</span>
                    <span className="font-bold">R$ 45K (4%)</span>
                  </div>
                  <Progress value={4} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retorno do Investimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">R$ 1.95M</div>
                    <div className="text-sm text-green-600">Economia Anual Estimada</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">82.1%</div>
                      <div className="text-sm text-blue-600">ROI</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">6.6</div>
                      <div className="text-sm text-purple-600">Meses Payback</div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Para cada R$ 1 investido, retorno de R$ 1.82 no primeiro ano
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Prioridades */}
        <TabsContent value="priorities" className="space-y-6">
          <div className="space-y-4">
            {linhasPrioridade.map((linha, index) => (
              <Card
                key={linha.id}
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedPriority === linha.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedPriority(selectedPriority === linha.id ? null : linha.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{linha.nome}</CardTitle>
                        <CardDescription>
                          {linha.pacientes_alvo} pacientes • Redução {linha.impacto_sinistralidade}% • {linha.prazo}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          linha.prioridade === "CRÍTICA"
                            ? "destructive"
                            : linha.prioridade === "ALTA"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {linha.prioridade}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        R$ {(linha.economia_estimada / 1000).toFixed(0)}K economia
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {selectedPriority === linha.id && (
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Profissionais Necessários */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Profissionais Necessários
                        </h4>
                        <div className="space-y-2">
                          {linha.profissionais_necessarios.map((prof, i) => (
                            <div key={i} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{prof.tipo}</div>
                                  <div className="text-sm text-muted-foreground">{prof.perfil}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">{prof.quantidade}x</div>
                                  <div className="text-sm text-muted-foreground">{prof.dedicacao}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recursos Necessários */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Recursos e Equipamentos
                        </h4>
                        <div className="space-y-2">
                          {linha.recursos_necessarios.map((recurso, i) => (
                            <div key={i} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{recurso.item}</div>
                                  <div className="text-sm text-muted-foreground">{recurso.descricao}</div>
                                </div>
                                <div className="font-medium text-green-600">R$ {recurso.custo.toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Protocolos */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Protocolos de Cuidado
                        </h4>
                        <div className="space-y-1">
                          {linha.protocolos.map((protocolo, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {protocolo}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* KPIs */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Indicadores de Sucesso
                        </h4>
                        <div className="space-y-3">
                          {linha.kpis.map((kpi, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{kpi.nome}</span>
                                <span>
                                  {kpi.atual} → {kpi.meta}
                                  {kpi.nome.includes("Tempo") ? " dias" : "%"}
                                </span>
                              </div>
                              <Progress value={(kpi.atual / kpi.meta) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Cronograma */}
        <TabsContent value="timeline" className="space-y-6">
          <div className="space-y-4">
            {cronograma.map((fase, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {fase.fase}
                      </CardTitle>
                      <CardDescription>{fase.periodo}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">-{fase.reducao_esperada}%</div>
                      <div className="text-sm text-muted-foreground">Redução esperada</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Ações Principais</h4>
                      <div className="space-y-2">
                        {fase.acoes.map((acao, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {acao}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Investimento</h4>
                      <div className="text-2xl font-bold text-blue-600">
                        R$ {(fase.investimento / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {((fase.investimento / investimentoTotal.total) * 100).toFixed(1)}% do total
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline Visual */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução da Sinistralidade por Fase</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { fase: "Atual", sinistralidade: 110.04, investimento: 0 },
                    { fase: "Fase 1", sinistralidade: 104.0, investimento: 180 },
                    { fase: "Fase 2", sinistralidade: 92.0, investimento: 400 },
                    { fase: "Fase 3", sinistralidade: 84.0, investimento: 550 },
                    { fase: "Fase 4", sinistralidade: 75.0, investimento: 650 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fase" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="sinistralidade"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.3}
                    name="Sinistralidade %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="investimento"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Investimento Acumulado (K)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Recursos */}
        <TabsContent value="resources" className="space-y-6">
          {/* Gap de Recursos Humanos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Enfermeiras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{recursosHumanos.enfermeiras.gap}</div>
                    <div className="text-sm text-muted-foreground">Profissionais necessárias</div>
                  </div>
                  <div className="space-y-2">
                    {recursosHumanos.enfermeiras.perfis.map((perfil, i) => (
                      <div key={i} className="p-2 border rounded">
                        <div className="font-medium text-sm">{perfil.especialidade}</div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{perfil.urgencia}</span>
                          <span>R$ {perfil.salario.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Médicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{recursosHumanos.medicos.gap}</div>
                    <div className="text-sm text-muted-foreground">Médicos necessários</div>
                  </div>
                  <div className="space-y-2">
                    {recursosHumanos.medicos.perfis.map((perfil, i) => (
                      <div key={i} className="p-2 border rounded">
                        <div className="font-medium text-sm">{perfil.especialidade}</div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{perfil.urgencia}</span>
                          <span>R$ {perfil.salario.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Outros Profissionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{recursosHumanos.outros.gap}</div>
                    <div className="text-sm text-muted-foreground">Profissionais necessários</div>
                  </div>
                  <div className="space-y-2">
                    {recursosHumanos.outros.perfis.map((perfil, i) => (
                      <div key={i} className="p-2 border rounded">
                        <div className="font-medium text-sm">{perfil.especialidade}</div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{perfil.urgencia}</span>
                          <span>R$ {perfil.salario.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plano de Contratação */}
          <Card>
            <CardHeader>
              <CardTitle>Plano de Contratação Prioritário</CardTitle>
              <CardDescription>Ordem de contratação baseada no impacto na redução da sinistralidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    posicao: "Enfermeira Gestão de Crônicos",
                    urgencia: "CRÍTICA",
                    prazo: "Imediato",
                    impacto: "18.5%",
                  },
                  { posicao: "Médico Coordenador Clínico", urgencia: "CRÍTICA", prazo: "15 dias", impacto: "15.2%" },
                  { posicao: "Enfermeira Oncológica", urgencia: "CRÍTICA", prazo: "30 dias", impacto: "12.3%" },
                  { posicao: "Psiquiatra", urgencia: "ALTA", prazo: "30 dias", impacto: "6.2%" },
                  { posicao: "Enfermeira Cardiológica", urgencia: "ALTA", prazo: "45 dias", impacto: "8.7%" },
                  { posicao: "Médico do Trabalho", urgencia: "MÉDIA", prazo: "60 dias", impacto: "4.8%" },
                ].map((contratacao, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{contratacao.posicao}</div>
                        <div className="text-sm text-muted-foreground">Prazo: {contratacao.prazo}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          contratacao.urgencia === "CRÍTICA"
                            ? "destructive"
                            : contratacao.urgencia === "ALTA"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {contratacao.urgencia}
                      </Badge>
                      <div className="text-sm text-green-600 font-medium">-{contratacao.impacto}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Cuidado Individual */}
        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modelo de Linha de Cuidado Individual</CardTitle>
              <CardDescription>Exemplo prático: Paciente com múltiplas comorbidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Perfil do Paciente */}
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                    <h4 className="font-medium text-red-800">Paciente Alto Risco</h4>
                    <div className="text-sm text-red-700 mt-2">
                      <div>João Silva, 67 anos, Euroville</div>
                      <div>Score de Risco: 91/100</div>
                      <div>Custo 12m: R$ 178.450</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Patologias Ativas</h4>
                    <div className="space-y-1">
                      {["DPOC Grave", "Diabetes Descompensado", "Hipertensão", "Insuficiência Cardíaca"].map(
                        (patologia, i) => (
                          <Badge key={i} variant="outline" className="mr-1 mb-1">
                            {patologia}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Fatores de Risco</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Tabagismo ativo (40 anos)</div>
                      <div>• HbA1c: 9.2% (descontrolado)</div>
                      <div>• 3 internações em 12 meses</div>
                      <div>• Baixa adesão medicamentosa (65%)</div>
                      <div>• Mora sozinho</div>
                    </div>
                  </div>
                </div>

                {/* Linha de Cuidado Personalizada */}
                <div className="space-y-4">
                  <h4 className="font-medium">Linha de Cuidado Personalizada</h4>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Enfermeira Ana (Principal)</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>• Consulta presencial semanal</div>
                        <div>• Telemedicina 2x/semana</div>
                        <div>• Monitoramento glicemia diário</div>
                        <div>• Controle medicação</div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-medium">Dr. Cardiologista</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>• Consulta mensal</div>
                        <div>• Ajuste medicação cardíaca</div>
                        <div>• Ecocardiograma trimestral</div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Pneumologista</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>• Consulta quinzenal</div>
                        <div>• Espirometria mensal</div>
                        <div>• Programa cessação tabágica</div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Psicóloga Maria</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>• Sessões quinzenais</div>
                        <div>• Apoio cessação tabágica</div>
                        <div>• Adesão ao tratamento</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cronograma de Cuidados */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Cronograma Semanal de Cuidados</h4>
                <div className="grid grid-cols-7 gap-2 text-sm">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia, i) => (
                    <div key={i} className="p-2 border rounded text-center">
                      <div className="font-medium">{dia}</div>
                      <div className="mt-1 space-y-1">
                        {i === 1 && <div className="text-xs bg-blue-100 p-1 rounded">Enfermeira</div>}
                        {i === 3 && <div className="text-xs bg-green-100 p-1 rounded">Telemedicina</div>}
                        {i === 5 && <div className="text-xs bg-purple-100 p-1 rounded">Psicóloga</div>}
                        {i === 6 && <div className="text-xs bg-red-100 p-1 rounded">Cardiologista</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metas Individuais */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3">Metas 3 Meses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>HbA1c</span>
                      <span>9.2% → 7.5%</span>
                    </div>
                    <Progress value={30} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Adesão Medicamentosa</span>
                      <span>65% → 90%</span>
                    </div>
                    <Progress value={72} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Cessação Tabágica</span>
                      <span>40 cig/dia → 0</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Impacto Esperado</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Redução Internações:</span>
                      <span className="font-bold text-green-600">60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Economia Anual:</span>
                      <span className="font-bold text-green-600">R$ 89K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Melhoria Qualidade Vida:</span>
                      <span className="font-bold text-blue-600">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 6: Monitoramento */}
        <TabsContent value="monitoring" className="space-y-6">
          {/* Dashboard de KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Sinistralidade Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">110.04%</div>
                <div className="text-xs text-muted-foreground">Meta mensal: -6%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pacientes em Programa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0/323</div>
                <div className="text-xs text-muted-foreground">Meta: 323 pacientes</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Profissionais Contratados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3/15</div>
                <div className="text-xs text-muted-foreground">20% da equipe</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Investimento Realizado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 0</div>
                <div className="text-xs text-muted-foreground">0% do orçamento</div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas e Próximas Ações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Alertas Críticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div className="font-medium text-red-800">Contratação Urgente</div>
                    <div className="text-sm text-red-700">Enfermeira de crônicos deve ser contratada em 7 dias</div>
                  </div>
                  <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                    <div className="font-medium text-orange-800">Orçamento Pendente</div>
                    <div className="text-sm text-orange-700">Aprovação de R$ 180K para Fase 1</div>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="font-medium text-yellow-800">Equipamentos</div>
                    <div className="text-sm text-yellow-700">Cotação de telemedicina em andamento</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Próximas Ações (7 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Contratar Enfermeira Crônicos</div>
                      <div className="text-xs text-muted-foreground">Prazo: 2 dias</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Aprovar orçamento Fase 1</div>
                      <div className="text-xs text-muted-foreground">Prazo: 3 dias</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Definir protocolos crônicos</div>
                      <div className="text-xs text-muted-foreground">Prazo: 5 dias</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Iniciar identificação pacientes</div>
                      <div className="text-xs text-muted-foreground">Prazo: 7 dias</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cronograma de Implementação */}
          <Card>
            <CardHeader>
              <CardTitle>Status de Implementação por Linha de Cuidado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {linhasPrioridade.map((linha, index) => (
                  <div key={linha.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{linha.nome}</span>
                      <Badge variant="outline">Não iniciado</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Início previsto: {linha.prazo} • Impacto: -{linha.impacto_sinistralidade}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button className="gap-2">
          <Zap className="h-4 w-4" />
          Iniciar Programa
        </Button>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Exportar Plano Completo
        </Button>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Agendar Reunião Aprovação
        </Button>
      </div>
    </div>
  )
}
