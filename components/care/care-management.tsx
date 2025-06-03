"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Calendar, Phone, FileText, CheckCircle, Stethoscope, Zap } from "lucide-react"
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"

export function CareManagement() {
  const [activeTab, setActiveTab] = useState("clusters")
  const [selectedCluster, setSelectedCluster] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState(null)

  // Dados reais dos beneficiários com análise detalhada
  const beneficiarios = [
    // Cluster 1: Alto Risco Oncológico
    {
      id: "001",
      empresa: "Euroville",
      idade: 58,
      sexo: "M",
      cluster: "oncologico",
      risco_score: 95,
      custo_12m: 156780,
      patologias: ["Câncer de Próstata", "Hipertensão", "Diabetes"],
      historico: ["Cirurgia 03/2024", "Quimioterapia em curso", "PSA elevado"],
      linha_cuidado: "Oncologia Intensiva",
      profissional_designado: "Enfermeira Ana + Psicóloga Maria",
      proxima_consulta: "2025-04-15",
      status: "Ativo - Tratamento",
      medicamentos: ["Bicalutamida", "Metformina", "Losartana"],
      exames_pendentes: ["PSA", "Hemograma", "Função Renal"],
      familia_risco: true,
      tabagismo: false,
      comorbidades: 3,
      internacoes_12m: 2,
      consultas_12m: 24,
      aderencia_tratamento: 89,
    },
    {
      id: "002",
      empresa: "Auto Japan Norte",
      idade: 52,
      sexo: "F",
      cluster: "oncologico",
      risco_score: 88,
      custo_12m: 134560,
      patologias: ["Câncer de Mama", "Ansiedade"],
      historico: ["Mastectomia 01/2024", "Radioterapia concluída", "BRCA1 positivo"],
      linha_cuidado: "Oncologia + Saúde Mental",
      profissional_designado: "Enfermeira Ana + Psicóloga Maria",
      proxima_consulta: "2025-04-10",
      status: "Ativo - Seguimento",
      medicamentos: ["Tamoxifeno", "Escitalopram"],
      exames_pendentes: ["Mamografia", "Marcadores Tumorais"],
      familia_risco: true,
      tabagismo: false,
      comorbidades: 1,
      internacoes_12m: 1,
      consultas_12m: 18,
      aderencia_tratamento: 95,
    },

    // Cluster 2: Cardiovascular Alto Risco
    {
      id: "003",
      empresa: "Delta Filmes",
      idade: 61,
      sexo: "M",
      cluster: "cardiovascular",
      risco_score: 82,
      custo_12m: 89340,
      patologias: ["IAM Prévio", "Hipertensão", "Dislipidemia"],
      historico: ["Cateterismo 06/2024", "Stent implantado", "Reabilitação cardíaca"],
      linha_cuidado: "Cardiologia Preventiva",
      profissional_designado: "Enfermeira Carla",
      proxima_consulta: "2025-04-08",
      status: "Ativo - Prevenção",
      medicamentos: ["AAS", "Atorvastatina", "Metoprolol", "Enalapril"],
      exames_pendentes: ["ECG", "Ecocardiograma", "Perfil Lipídico"],
      familia_risco: true,
      tabagismo: true,
      comorbidades: 3,
      internacoes_12m: 1,
      consultas_12m: 12,
      aderencia_tratamento: 76,
    },
    {
      id: "004",
      empresa: "Euroville",
      idade: 55,
      sexo: "F",
      cluster: "cardiovascular",
      risco_score: 78,
      custo_12m: 67890,
      patologias: ["Hipertensão", "Diabetes", "Obesidade"],
      historico: ["HbA1c descontrolada", "PA sistólica >160", "IMC 34"],
      linha_cuidado: "Cardiometabólica",
      profissional_designado: "Enfermeira Carla",
      proxima_consulta: "2025-04-12",
      status: "Ativo - Controle",
      medicamentos: ["Metformina", "Glicazida", "Losartana", "Sinvastatina"],
      exames_pendentes: ["HbA1c", "Microalbuminúria", "Fundoscopia"],
      familia_risco: false,
      tabagismo: false,
      comorbidades: 3,
      internacoes_12m: 0,
      consultas_12m: 8,
      aderencia_tratamento: 68,
    },

    // Cluster 3: Saúde Mental
    {
      id: "005",
      empresa: "Auto Japan Norte",
      idade: 34,
      sexo: "F",
      cluster: "mental",
      risco_score: 74,
      custo_12m: 45670,
      patologias: ["Depressão Maior", "Ansiedade Generalizada", "Insônia"],
      historico: ["Episódio depressivo grave", "Afastamento trabalho", "Ideação suicida prévia"],
      linha_cuidado: "Saúde Mental Intensiva",
      profissional_designado: "Psicóloga Maria",
      proxima_consulta: "2025-04-05",
      status: "Ativo - Tratamento",
      medicamentos: ["Sertralina", "Clonazepam", "Zolpidem"],
      exames_pendentes: ["Avaliação Psiquiátrica", "Escalas de Depressão"],
      familia_risco: true,
      tabagismo: false,
      comorbidades: 0,
      internacoes_12m: 1,
      consultas_12m: 16,
      aderencia_tratamento: 82,
    },
    {
      id: "006",
      empresa: "Delta Filmes",
      idade: 42,
      sexo: "M",
      cluster: "mental",
      risco_score: 69,
      custo_12m: 38920,
      patologias: ["Transtorno Bipolar", "Abuso de Álcool"],
      historico: ["Episódio maníaco 2024", "Internação psiquiátrica", "Recaída etílica"],
      linha_cuidado: "Saúde Mental + Dependência",
      profissional_designado: "Psicóloga Maria",
      proxima_consulta: "2025-04-07",
      status: "Ativo - Estabilização",
      medicamentos: ["Lítio", "Quetiapina", "Naltrexona"],
      exames_pendentes: ["Litemia", "Função Hepática", "Avaliação Psicológica"],
      familia_risco: false,
      tabagismo: true,
      comorbidades: 1,
      internacoes_12m: 2,
      consultas_12m: 20,
      aderencia_tratamento: 71,
    },

    // Cluster 4: Crônicos Múltiplos
    {
      id: "007",
      empresa: "Euroville",
      idade: 67,
      sexo: "M",
      cluster: "cronicos",
      risco_score: 91,
      custo_12m: 178450,
      patologias: ["DPOC", "Diabetes", "Hipertensão", "Insuficiência Cardíaca"],
      historico: ["Exacerbação DPOC", "Descompensação cardíaca", "HbA1c 9.2%"],
      linha_cuidado: "Cuidados Complexos",
      profissional_designado: "Enfermeira Ana + Enfermeira Carla",
      proxima_consulta: "2025-04-06",
      status: "Ativo - Cuidado Intensivo",
      medicamentos: ["Insulina", "Furosemida", "Broncodilatadores", "Enalapril"],
      exames_pendentes: ["Espirometria", "Ecocardiograma", "HbA1c"],
      familia_risco: false,
      tabagismo: true,
      comorbidades: 4,
      internacoes_12m: 3,
      consultas_12m: 28,
      aderencia_tratamento: 65,
    },

    // Cluster 5: Prevenção Alto Risco
    {
      id: "008",
      empresa: "Auto Japan Norte",
      idade: 48,
      sexo: "M",
      cluster: "prevencao",
      risco_score: 65,
      custo_12m: 23450,
      patologias: ["Pré-diabetes", "Hipertensão Limítrofe", "Obesidade"],
      historico: ["Glicemia jejum 118", "PA 140/90", "Histórico familiar DM"],
      linha_cuidado: "Prevenção Primária",
      profissional_designado: "Enfermeira Carla",
      proxima_consulta: "2025-04-20",
      status: "Ativo - Prevenção",
      medicamentos: ["Metformina", "Mudança estilo vida"],
      exames_pendentes: ["TOTG", "Perfil Lipídico", "Microalbuminúria"],
      familia_risco: true,
      tabagismo: false,
      comorbidades: 0,
      internacoes_12m: 0,
      consultas_12m: 4,
      aderencia_tratamento: 78,
    },
  ]

  // Clusters de risco definidos
  const clusters = {
    oncologico: {
      nome: "Alto Risco Oncológico",
      cor: "#dc2626",
      pacientes: 4,
      custo_medio: 145670,
      profissional_principal: "Enfermeira Ana",
      profissional_apoio: "Psicóloga Maria",
      linha_cuidado: "Oncologia Intensiva",
      frequencia_consultas: "Quinzenal",
      prioridade: "Crítica",
      protocolos: ["Acompanhamento oncológico", "Suporte psicológico", "Manejo de efeitos colaterais"],
      kpis: { aderencia: 92, satisfacao: 4.8, reducao_internacao: 35 },
    },
    cardiovascular: {
      nome: "Alto Risco Cardiovascular",
      cor: "#ea580c",
      pacientes: 12,
      custo_medio: 78615,
      profissional_principal: "Enfermeira Carla",
      profissional_apoio: null,
      linha_cuidado: "Cardiologia Preventiva",
      frequencia_consultas: "Mensal",
      prioridade: "Alta",
      protocolos: ["Controle pressórico", "Manejo lipídico", "Cessação tabágica"],
      kpis: { aderencia: 72, satisfacao: 4.3, reducao_internacao: 28 },
    },
    mental: {
      nome: "Saúde Mental",
      cor: "#7c3aed",
      pacientes: 8,
      custo_medio: 42295,
      profissional_principal: "Psicóloga Maria",
      profissional_apoio: null,
      linha_cuidado: "Saúde Mental Integrada",
      frequencia_consultas: "Semanal/Quinzenal",
      prioridade: "Alta",
      protocolos: ["Psicoterapia", "Acompanhamento psiquiátrico", "Prevenção suicídio"],
      kpis: { aderencia: 76, satisfacao: 4.6, reducao_internacao: 42 },
    },
    cronicos: {
      nome: "Crônicos Múltiplos",
      cor: "#dc2626",
      pacientes: 6,
      custo_medio: 156890,
      profissional_principal: "Enfermeira Ana",
      profissional_apoio: "Enfermeira Carla",
      linha_cuidado: "Cuidados Complexos",
      frequencia_consultas: "Semanal",
      prioridade: "Crítica",
      protocolos: ["Gestão integrada", "Cuidados domiciliares", "Telemedicina"],
      kpis: { aderencia: 68, satisfacao: 4.2, reducao_internacao: 31 },
    },
    prevencao: {
      nome: "Prevenção Alto Risco",
      cor: "#059669",
      pacientes: 17,
      custo_medio: 28340,
      profissional_principal: "Enfermeira Carla",
      profissional_apoio: null,
      linha_cuidado: "Prevenção Primária",
      frequencia_consultas: "Trimestral",
      prioridade: "Média",
      protocolos: ["Mudança estilo vida", "Rastreamento", "Educação em saúde"],
      kpis: { aderencia: 81, satisfacao: 4.4, reducao_internacao: 15 },
    },
  }

  // Dados para o gráfico de dispersão (Risco vs Custo)
  const scatterData = beneficiarios.map((b) => ({
    x: b.risco_score,
    y: b.custo_12m,
    cluster: b.cluster,
    nome: `${b.empresa} - ${b.idade}a`,
    patologias: b.patologias.length,
  }))

  // Distribuição de profissionais
  const workloadData = [
    {
      profissional: "Enfermeira Ana",
      pacientes_ativos: 10,
      horas_semana: 32,
      clusters: ["oncologico", "cronicos"],
      capacidade: 85,
      proximas_consultas: 8,
      urgencias_pendentes: 2,
    },
    {
      profissional: "Enfermeira Carla",
      pacientes_ativos: 29,
      horas_semana: 38,
      clusters: ["cardiovascular", "prevencao", "cronicos"],
      capacidade: 95,
      proximas_consultas: 12,
      urgencias_pendentes: 1,
    },
    {
      profissional: "Psicóloga Maria",
      pacientes_ativos: 12,
      horas_semana: 24,
      clusters: ["mental", "oncologico"],
      capacidade: 60,
      proximas_consultas: 15,
      urgencias_pendentes: 3,
    },
  ]

  // Linhas de cuidado detalhadas
  const linhasCuidado = {
    "Oncologia Intensiva": {
      descricao: "Acompanhamento integral de pacientes oncológicos",
      protocolos: [
        "Consulta enfermagem pré-quimio",
        "Monitoramento efeitos colaterais",
        "Suporte nutricional",
        "Acompanhamento psicológico",
        "Educação familiar",
      ],
      frequencia: "A cada ciclo de tratamento",
      profissionais: ["Enfermeira Ana", "Psicóloga Maria"],
      tempo_consulta: 45,
      custo_reducao_estimado: 35,
    },
    "Cardiologia Preventiva": {
      descricao: "Prevenção secundária cardiovascular",
      protocolos: [
        "Controle rigoroso PA e glicemia",
        "Adesão medicamentosa",
        "Programa exercícios supervisionados",
        "Cessação tabágica",
        "Educação dietética",
      ],
      frequencia: "Mensal com telemedicina quinzenal",
      profissionais: ["Enfermeira Carla"],
      tempo_consulta: 30,
      custo_reducao_estimado: 28,
    },
    "Saúde Mental Integrada": {
      descricao: "Cuidado integral em saúde mental",
      protocolos: [
        "Psicoterapia individual",
        "Acompanhamento psiquiátrico",
        "Grupos terapêuticos",
        "Prevenção crise/suicídio",
        "Reabilitação psicossocial",
      ],
      frequencia: "Semanal inicial, quinzenal manutenção",
      profissionais: ["Psicóloga Maria"],
      tempo_consulta: 50,
      custo_reducao_estimado: 42,
    },
  }

  // Algoritmo de escalamento automático
  const escalarProfissional = (paciente) => {
    const { cluster, risco_score, patologias } = paciente

    let profissionais = []
    let prioridade = "Baixa"

    // Lógica de escalamento baseada em cluster e risco
    if (cluster === "oncologico") {
      profissionais = ["Enfermeira Ana", "Psicóloga Maria"]
      prioridade = "Crítica"
    } else if (cluster === "mental") {
      profissionais = ["Psicóloga Maria"]
      prioridade = risco_score > 70 ? "Crítica" : "Alta"
    } else if (cluster === "cardiovascular") {
      profissionais = ["Enfermeira Carla"]
      prioridade = risco_score > 80 ? "Alta" : "Média"
    } else if (cluster === "cronicos") {
      profissionais = ["Enfermeira Ana", "Enfermeira Carla"]
      prioridade = "Crítica"
    } else {
      profissionais = ["Enfermeira Carla"]
      prioridade = "Média"
    }

    // Ajustar baseado em comorbidades
    if (patologias.length >= 3) {
      prioridade = "Crítica"
    }

    return { profissionais, prioridade }
  }

  const COLORS = ["#dc2626", "#ea580c", "#7c3aed", "#dc2626", "#059669"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Gestão de Cuidados Individuais - Grupo Fedla</h2>
        <p className="text-muted-foreground">
          Sistema de clusterização de riscos e escalamento automático de profissionais
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="clusters">Clusters de Risco</TabsTrigger>
          <TabsTrigger value="pacientes">Pacientes Ativos</TabsTrigger>
          <TabsTrigger value="profissionais">Carga Profissionais</TabsTrigger>
          <TabsTrigger value="linhas">Linhas de Cuidado</TabsTrigger>
          <TabsTrigger value="escalamento">Escalamento IA</TabsTrigger>
        </TabsList>

        {/* Tab 1: Clusters de Risco */}
        <TabsContent value="clusters" className="space-y-6">
          {/* Visão Geral dos Clusters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">Em acompanhamento ativo</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custo Médio Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 90K</div>
                <p className="text-xs text-muted-foreground">Por cluster de alto risco</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Redução Esperada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32%</div>
                <p className="text-xs text-muted-foreground">Em internações evitáveis</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Dispersão Risco vs Custo */}
          <Card>
            <CardHeader>
              <CardTitle>Mapeamento de Risco vs Custo por Cluster</CardTitle>
              <CardDescription>Posicionamento dos pacientes por score de risco e custo anual</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={scatterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" name="Score de Risco" />
                  <YAxis dataKey="y" name="Custo Anual (R$)" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "x" ? value : `R$ ${value.toLocaleString()}`,
                      name === "x" ? "Score de Risco" : "Custo Anual",
                    ]}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return `${payload[0].payload.nome} - ${payload[0].payload.patologias} patologias`
                      }
                      return label
                    }}
                  />
                  {Object.keys(clusters).map((cluster, index) => (
                    <Scatter
                      key={cluster}
                      data={scatterData.filter((d) => d.cluster === cluster)}
                      fill={clusters[cluster].cor}
                      name={clusters[cluster].nome}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cards dos Clusters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(clusters).map(([key, cluster]) => (
              <Card
                key={key}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCluster(key)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cluster.nome}</CardTitle>
                    <Badge style={{ backgroundColor: cluster.cor, color: "white" }} className="border-0">
                      {cluster.prioridade}
                    </Badge>
                  </div>
                  <CardDescription>{cluster.linha_cuidado}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Pacientes:</span>
                        <div className="font-medium">{cluster.pacientes}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Custo Médio:</span>
                        <div className="font-medium">R$ {(cluster.custo_medio / 1000).toFixed(0)}K</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Profissional Principal:</span>
                      <div className="font-medium text-sm">{cluster.profissional_principal}</div>
                      {cluster.profissional_apoio && (
                        <div className="text-sm text-muted-foreground">+ {cluster.profissional_apoio}</div>
                      )}
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Frequência:</span>
                      <div className="font-medium text-sm">{cluster.frequencia_consultas}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Adesão ao Tratamento</span>
                        <span>{cluster.kpis.aderencia}%</span>
                      </div>
                      <Progress value={cluster.kpis.aderencia} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Redução Internações:</span>
                      <span className="font-medium text-green-600">{cluster.kpis.reducao_internacao}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: Pacientes Ativos */}
        <TabsContent value="pacientes" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {beneficiarios.map((paciente) => (
              <Card
                key={paciente.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedPatient(paciente)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">ID: {paciente.id}</Badge>
                      <span className="font-medium">{paciente.empresa}</span>
                      <Badge
                        style={{ backgroundColor: clusters[paciente.cluster].cor, color: "white" }}
                        className="border-0"
                      >
                        {clusters[paciente.cluster].nome}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color: clusters[paciente.cluster].cor }}>
                        {paciente.risco_score}
                      </div>
                      <div className="text-sm text-muted-foreground">Score Risco</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Dados Básicos</h4>
                      <div className="text-sm space-y-1">
                        <div>
                          {paciente.idade} anos - {paciente.sexo}
                        </div>
                        <div>Custo 12m: R$ {paciente.custo_12m.toLocaleString()}</div>
                        <div>Internações: {paciente.internacoes_12m}</div>
                        <div>Consultas: {paciente.consultas_12m}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Patologias Ativas</h4>
                      <div className="flex flex-wrap gap-1">
                        {paciente.patologias.map((patologia, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {patologia}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Cuidados</h4>
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>Linha:</strong> {paciente.linha_cuidado}
                        </div>
                        <div>
                          <strong>Profissional:</strong> {paciente.profissional_designado}
                        </div>
                        <div>
                          <strong>Próxima:</strong> {new Date(paciente.proxima_consulta).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Adesão:</strong> {paciente.aderencia_tratamento}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {paciente.exames_pendentes.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-medium text-sm text-yellow-800 mb-1">Exames Pendentes</h4>
                      <div className="text-sm text-yellow-700">{paciente.exames_pendentes.join(", ")}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Carga dos Profissionais */}
        <TabsContent value="profissionais" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workloadData.map((prof, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {prof.profissional.includes("Enfermeira") ? (
                      <Stethoscope className="h-5 w-5" />
                    ) : (
                      <Brain className="h-5 w-5" />
                    )}
                    {prof.profissional}
                  </CardTitle>
                  <CardDescription>{prof.clusters.map((c) => clusters[c].nome).join(" + ")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Pacientes Ativos:</span>
                        <div className="font-medium text-lg">{prof.pacientes_ativos}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Horas/Semana:</span>
                        <div className="font-medium text-lg">{prof.horas_semana}h</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Capacidade Utilizada</span>
                        <span>{prof.capacidade}%</span>
                      </div>
                      <Progress
                        value={prof.capacidade}
                        className={`h-3 ${prof.capacidade > 90 ? "bg-red-100" : prof.capacidade > 80 ? "bg-yellow-100" : "bg-green-100"}`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Próximas Consultas:</span>
                        <div className="font-medium">{prof.proximas_consultas}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Urgências:</span>
                        <div className="font-medium text-red-600">{prof.urgencias_pendentes}</div>
                      </div>
                    </div>

                    <Button size="sm" className="w-full" variant={prof.capacidade > 90 ? "destructive" : "default"}>
                      {prof.capacidade > 90 ? "Sobrecarga - Redistribuir" : "Ver Agenda"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Distribuição de Pacientes por Profissional */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Carga de Trabalho</CardTitle>
              <CardDescription>Pacientes ativos por profissional e cluster</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workloadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="profissional" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pacientes_ativos" fill="#8884d8" name="Pacientes Ativos" />
                  <Bar dataKey="urgencias_pendentes" fill="#ef4444" name="Urgências" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Linhas de Cuidado */}
        <TabsContent value="linhas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(linhasCuidado).map(([nome, linha]) => (
              <Card key={nome} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{nome}</CardTitle>
                  <CardDescription>{linha.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Protocolos Inclusos</h4>
                      <div className="space-y-1">
                        {linha.protocolos.map((protocolo, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {protocolo}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Frequência:</span>
                        <div className="font-medium">{linha.frequencia}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tempo/Consulta:</span>
                        <div className="font-medium">{linha.tempo_consulta} min</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Profissionais:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {linha.profissionais.map((prof, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {prof}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-800">Redução de Custos Estimada</div>
                      <div className="text-lg font-bold text-green-600">{linha.custo_reducao_estimado}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 5: Escalamento Automático */}
        <TabsContent value="escalamento" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Sistema de Escalamento Automático por IA
              </CardTitle>
              <CardDescription>
                Algoritmo que designa automaticamente profissionais baseado em cluster de risco, patologias e capacidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Regras de Escalamento</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Por Cluster:</h5>
                      <ul className="space-y-1 text-blue-700">
                        <li>• Oncológico: Enfermeira Ana + Psicóloga Maria</li>
                        <li>• Cardiovascular: Enfermeira Carla</li>
                        <li>• Saúde Mental: Psicóloga Maria</li>
                        <li>• Crônicos Múltiplos: Ambas enfermeiras</li>
                        <li>• Prevenção: Enfermeira Carla</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Por Prioridade:</h5>
                      <ul className="space-y-1 text-blue-700">
                        <li>• Score &gt; 85: Prioridade Crítica</li>
                        <li>• Score 70-85: Prioridade Alta</li>
                        <li>• 3+ Comorbidades: Upgrade para Crítica</li>
                        <li>• Internação Recente: Acompanhamento intensivo</li>
                        <li>• Baixa Adesão: Reforço educativo</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Simulação de Escalamento */}
                <div>
                  <h4 className="font-medium mb-3">Simulação de Novos Casos</h4>
                  <div className="space-y-3">
                    {[
                      {
                        nome: "João Silva",
                        idade: 45,
                        cluster: "cardiovascular",
                        risco: 78,
                        patologias: ["IAM", "Diabetes"],
                      },
                      {
                        nome: "Maria Santos",
                        idade: 38,
                        cluster: "mental",
                        risco: 82,
                        patologias: ["Depressão Grave"],
                      },
                      {
                        nome: "Carlos Oliveira",
                        idade: 62,
                        cluster: "oncologico",
                        risco: 91,
                        patologias: ["Câncer Pulmão", "DPOC"],
                      },
                    ].map((caso, index) => {
                      const escalamento = escalarProfissional(caso)
                      return (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-medium">{caso.nome}</span>
                              <div className="text-sm text-muted-foreground">{caso.idade} anos</div>
                            </div>
                            <Badge variant={escalamento.prioridade === "Crítica" ? "destructive" : "default"}>
                              {escalamento.prioridade}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Cluster:</span>
                              <div className="font-medium">{clusters[caso.cluster].nome}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Score Risco:</span>
                              <div className="font-medium">{caso.risco}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Profissionais Designados:</span>
                              <div className="font-medium">{escalamento.profissionais.join(" + ")}</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-sm text-muted-foreground">Patologias: </span>
                            {caso.patologias.map((pat, i) => (
                              <Badge key={i} variant="outline" className="text-xs mr-1">
                                {pat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas do Sistema */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Escalamentos Automáticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Acurácia do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">Escalamentos corretos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Tempo Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3s</div>
                <p className="text-xs text-muted-foreground">Para designação</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Redução de Custos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">31%</div>
                <p className="text-xs text-muted-foreground">Com gestão direcionada</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          Agendar Consultas em Lote
        </Button>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Relatório de Cuidados
        </Button>
        <Button variant="outline" className="gap-2">
          <Phone className="h-4 w-4" />
          Telemedicina Urgente
        </Button>
      </div>
    </div>
  )
}
