"use client"

// Tipos para biomarcadores
export interface Biomarker {
  id: string
  name: string
  value: number
  unit: string
  referenceRange: { min: number; max: number }
  category: "metabolic" | "cardiovascular" | "inflammatory" | "hormonal" | "nutritional" | "hepatic" | "renal"
  riskLevel: "low" | "medium" | "high" | "critical"
  date: string
  userId: string
}

export interface BiomarkerPanel {
  id: string
  userId: string
  date: string
  type: "routine" | "comprehensive" | "specialized"
  biomarkers: Biomarker[]
  overallRisk: "low" | "medium" | "high" | "critical"
  recommendations: string[]
}

// Biomarcadores padrão com valores de referência
export const STANDARD_BIOMARKERS = {
  // Metabólicos
  glucose: { name: "Glicose", unit: "mg/dL", range: { min: 70, max: 99 }, category: "metabolic" },
  hba1c: { name: "Hemoglobina Glicada", unit: "%", range: { min: 4.0, max: 5.6 }, category: "metabolic" },
  insulin: { name: "Insulina", unit: "μU/mL", range: { min: 2.6, max: 24.9 }, category: "metabolic" },

  // Cardiovasculares
  totalCholesterol: {
    name: "Colesterol Total",
    unit: "mg/dL",
    range: { min: 0, max: 200 },
    category: "cardiovascular",
  },
  ldl: { name: "LDL", unit: "mg/dL", range: { min: 0, max: 100 }, category: "cardiovascular" },
  hdl: { name: "HDL", unit: "mg/dL", range: { min: 40, max: 999 }, category: "cardiovascular" },
  triglycerides: { name: "Triglicerídeos", unit: "mg/dL", range: { min: 0, max: 150 }, category: "cardiovascular" },

  // Inflamatórios
  crp: { name: "Proteína C Reativa", unit: "mg/L", range: { min: 0, max: 3.0 }, category: "inflammatory" },
  esr: { name: "VHS", unit: "mm/h", range: { min: 0, max: 20 }, category: "inflammatory" },

  // Hormonais
  cortisol: { name: "Cortisol", unit: "μg/dL", range: { min: 6.2, max: 19.4 }, category: "hormonal" },
  tsh: { name: "TSH", unit: "μIU/mL", range: { min: 0.27, max: 4.2 }, category: "hormonal" },
  testosterone: { name: "Testosterona", unit: "ng/dL", range: { min: 300, max: 1000 }, category: "hormonal" },

  // Nutricionais
  vitaminD: { name: "Vitamina D", unit: "ng/mL", range: { min: 30, max: 100 }, category: "nutritional" },
  vitaminB12: { name: "Vitamina B12", unit: "pg/mL", range: { min: 200, max: 900 }, category: "nutritional" },
  iron: { name: "Ferro", unit: "μg/dL", range: { min: 60, max: 170 }, category: "nutritional" },

  // Hepáticos
  alt: { name: "ALT", unit: "U/L", range: { min: 0, max: 56 }, category: "hepatic" },
  ast: { name: "AST", unit: "U/L", range: { min: 0, max: 40 }, category: "hepatic" },

  // Renais
  creatinine: { name: "Creatinina", unit: "mg/dL", range: { min: 0.7, max: 1.3 }, category: "renal" },
  urea: { name: "Ureia", unit: "mg/dL", range: { min: 15, max: 40 }, category: "renal" },
}

// Análise de risco baseada em biomarcadores
export function analyzeBiomarkerRisk(biomarker: Biomarker): {
  riskLevel: "low" | "medium" | "high" | "critical"
  riskScore: number
  description: string
} {
  const { value, referenceRange } = biomarker
  const { min, max } = referenceRange

  let riskScore = 0
  let riskLevel: "low" | "medium" | "high" | "critical" = "low"
  let description = ""

  if (value >= min && value <= max) {
    riskScore = 0
    riskLevel = "low"
    description = "Dentro da faixa normal"
  } else if (value < min) {
    const deviation = ((min - value) / min) * 100
    if (deviation <= 10) {
      riskScore = 25
      riskLevel = "medium"
      description = "Ligeiramente abaixo do normal"
    } else if (deviation <= 25) {
      riskScore = 50
      riskLevel = "high"
      description = "Significativamente abaixo do normal"
    } else {
      riskScore = 75
      riskLevel = "critical"
      description = "Criticamente baixo"
    }
  } else {
    const deviation = ((value - max) / max) * 100
    if (deviation <= 10) {
      riskScore = 25
      riskLevel = "medium"
      description = "Ligeiramente acima do normal"
    } else if (deviation <= 25) {
      riskScore = 50
      riskLevel = "high"
      description = "Significativamente acima do normal"
    } else {
      riskScore = 75
      riskLevel = "critical"
      description = "Criticamente alto"
    }
  }

  return { riskLevel, riskScore, description }
}

// Correlação entre biomarcadores e dados de wearables
export interface WearableCorrelation {
  biomarker: string
  wearableMetric: string
  correlation: number
  significance: "low" | "medium" | "high"
  insight: string
  recommendation: string
}

export function correlateBiomarkersWithWearables(biomarkers: Biomarker[], wearableData: any): WearableCorrelation[] {
  const correlations: WearableCorrelation[] = []

  // Glicose vs Passos e Sono
  const glucose = biomarkers.find((b) => b.name === "Glicose")
  if (glucose && wearableData.steps && wearableData.sleep) {
    const stepsCorrelation = calculateGlucoseStepsCorrelation(glucose.value, wearableData.steps.daily_average)
    const sleepCorrelation = calculateGlucoseSleepCorrelation(glucose.value, wearableData.sleep.duration_average)

    correlations.push({
      biomarker: "Glicose",
      wearableMetric: "Passos Diários",
      correlation: stepsCorrelation,
      significance: Math.abs(stepsCorrelation) > 0.6 ? "high" : Math.abs(stepsCorrelation) > 0.3 ? "medium" : "low",
      insight:
        stepsCorrelation < -0.3
          ? "Baixa atividade física pode estar contribuindo para glicose elevada"
          : "Atividade física adequada para controle glicêmico",
      recommendation:
        stepsCorrelation < -0.3
          ? "Aumentar atividade física para 8.000+ passos/dia"
          : "Manter nível atual de atividade",
    })

    correlations.push({
      biomarker: "Glicose",
      wearableMetric: "Qualidade do Sono",
      correlation: sleepCorrelation,
      significance: Math.abs(sleepCorrelation) > 0.6 ? "high" : Math.abs(sleepCorrelation) > 0.3 ? "medium" : "low",
      insight:
        sleepCorrelation < -0.3
          ? "Sono inadequado pode estar afetando controle glicêmico"
          : "Qualidade do sono adequada",
      recommendation:
        sleepCorrelation < -0.3 ? "Melhorar higiene do sono - 7-9h por noite" : "Manter rotina atual de sono",
    })
  }

  // Cortisol vs Estresse e HRV
  const cortisol = biomarkers.find((b) => b.name === "Cortisol")
  if (cortisol && wearableData.stress && wearableData.hrv) {
    const stressCorrelation = calculateCortisolStressCorrelation(cortisol.value, wearableData.stress.average_level)
    const hrvCorrelation = calculateCortisolHRVCorrelation(cortisol.value, wearableData.hrv.average)

    correlations.push({
      biomarker: "Cortisol",
      wearableMetric: "Nível de Estresse",
      correlation: stressCorrelation,
      significance: Math.abs(stressCorrelation) > 0.6 ? "high" : Math.abs(stressCorrelation) > 0.3 ? "medium" : "low",
      insight:
        stressCorrelation > 0.4
          ? "Alto estresse correlacionado com cortisol elevado"
          : "Níveis de estresse controlados",
      recommendation:
        stressCorrelation > 0.4 ? "Implementar técnicas de gestão de estresse" : "Manter estratégias atuais",
    })

    correlations.push({
      biomarker: "Cortisol",
      wearableMetric: "HRV",
      correlation: hrvCorrelation,
      significance: Math.abs(hrvCorrelation) > 0.6 ? "high" : Math.abs(hrvCorrelation) > 0.3 ? "medium" : "low",
      insight: hrvCorrelation < -0.3 ? "Baixa HRV indica possível estresse crônico" : "HRV adequada para recuperação",
      recommendation:
        hrvCorrelation < -0.3 ? "Focar em técnicas de relaxamento e recuperação" : "Continuar práticas atuais",
    })
  }

  // Colesterol vs Atividade Física
  const cholesterol = biomarkers.find((b) => b.name === "Colesterol Total")
  if (cholesterol && wearableData.activity) {
    const activityCorrelation = calculateCholesterolActivityCorrelation(
      cholesterol.value,
      wearableData.activity.weekly_minutes,
    )

    correlations.push({
      biomarker: "Colesterol Total",
      wearableMetric: "Minutos Ativos Semanais",
      correlation: activityCorrelation,
      significance:
        Math.abs(activityCorrelation) > 0.6 ? "high" : Math.abs(activityCorrelation) > 0.3 ? "medium" : "low",
      insight:
        activityCorrelation < -0.3
          ? "Exercício insuficiente pode estar afetando perfil lipídico"
          : "Atividade física adequada",
      recommendation:
        activityCorrelation < -0.3 ? "Aumentar para 150+ minutos de atividade moderada/semana" : "Manter rotina atual",
    })
  }

  return correlations
}

// Funções auxiliares de correlação
function calculateGlucoseStepsCorrelation(glucose: number, steps: number): number {
  // Correlação negativa: mais passos = menor glicose
  const normalizedGlucose = (glucose - 85) / 15 // Normalizar em torno de 85mg/dL
  const normalizedSteps = (steps - 7000) / 3000 // Normalizar em torno de 7000 passos
  return Math.max(-1, Math.min(1, -0.6 * normalizedGlucose + 0.4 * normalizedSteps))
}

function calculateGlucoseSleepCorrelation(glucose: number, sleepHours: number): number {
  // Correlação negativa: melhor sono = menor glicose
  const normalizedGlucose = (glucose - 85) / 15
  const normalizedSleep = (sleepHours - 7.5) / 1.5 // Normalizar em torno de 7.5h
  return Math.max(-1, Math.min(1, -0.5 * normalizedGlucose + 0.3 * normalizedSleep))
}

function calculateCortisolStressCorrelation(cortisol: number, stressLevel: number): number {
  // Correlação positiva: mais estresse = mais cortisol
  const normalizedCortisol = (cortisol - 12) / 6 // Normalizar em torno de 12μg/dL
  const normalizedStress = (stressLevel - 5) / 3 // Normalizar em torno de 5/10
  return Math.max(-1, Math.min(1, 0.7 * normalizedCortisol + 0.6 * normalizedStress))
}

function calculateCortisolHRVCorrelation(cortisol: number, hrv: number): number {
  // Correlação negativa: mais cortisol = menor HRV
  const normalizedCortisol = (cortisol - 12) / 6
  const normalizedHRV = (hrv - 40) / 20 // Normalizar em torno de 40ms
  return Math.max(-1, Math.min(1, -0.6 * normalizedCortisol + 0.4 * normalizedHRV))
}

function calculateCholesterolActivityCorrelation(cholesterol: number, weeklyMinutes: number): number {
  // Correlação negativa: mais atividade = menor colesterol
  const normalizedCholesterol = (cholesterol - 180) / 40 // Normalizar em torno de 180mg/dL
  const normalizedActivity = (weeklyMinutes - 150) / 100 // Normalizar em torno de 150min/semana
  return Math.max(-1, Math.min(1, -0.5 * normalizedCholesterol + 0.4 * normalizedActivity))
}

// Análise preditiva baseada em biomarcadores + wearables
export interface PredictiveRisk {
  condition: string
  riskScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  timeframe: string
  confidence: number
  contributingFactors: string[]
  preventiveActions: string[]
  potentialSavings: {
    individual: number
    department: number
    company: number
  }
}

export function generatePredictiveRisks(
  biomarkers: Biomarker[],
  wearableData: any,
  demographicData: any,
): PredictiveRisk[] {
  const risks: PredictiveRisk[] = []

  // Risco de Diabetes Tipo 2
  const diabetesRisk = calculateDiabetesRisk(biomarkers, wearableData, demographicData)
  if (diabetesRisk.riskScore > 20) {
    risks.push(diabetesRisk)
  }

  // Risco Cardiovascular
  const cardioRisk = calculateCardiovascularRisk(biomarkers, wearableData, demographicData)
  if (cardioRisk.riskScore > 20) {
    risks.push(cardioRisk)
  }

  // Risco de Burnout
  const burnoutRisk = calculateBurnoutRisk(biomarkers, wearableData, demographicData)
  if (burnoutRisk.riskScore > 30) {
    risks.push(burnoutRisk)
  }

  return risks
}

function calculateDiabetesRisk(biomarkers: Biomarker[], wearableData: any, demographicData: any): PredictiveRisk {
  let riskScore = 0
  const contributingFactors: string[] = []

  // Biomarcadores
  const glucose = biomarkers.find((b) => b.name === "Glicose")
  const hba1c = biomarkers.find((b) => b.name === "Hemoglobina Glicada")

  if (glucose && glucose.value > 100) {
    riskScore += 25
    contributingFactors.push("Glicose elevada")
  }

  if (hba1c && hba1c.value > 5.7) {
    riskScore += 30
    contributingFactors.push("HbA1c elevada")
  }

  // Wearables
  if (wearableData.steps?.daily_average < 5000) {
    riskScore += 15
    contributingFactors.push("Sedentarismo")
  }

  if (wearableData.sleep?.duration_average < 6) {
    riskScore += 10
    contributingFactors.push("Sono insuficiente")
  }

  // Demografia
  if (demographicData.age > 45) {
    riskScore += 10
    contributingFactors.push("Idade avançada")
  }

  const riskLevel = riskScore > 60 ? "critical" : riskScore > 40 ? "high" : riskScore > 20 ? "medium" : "low"

  return {
    condition: "Diabetes Tipo 2",
    riskScore,
    riskLevel,
    timeframe: "2-5 anos",
    confidence: 85,
    contributingFactors,
    preventiveActions: [
      "Aumentar atividade física para 8.000+ passos/dia",
      "Melhorar qualidade do sono (7-9h/noite)",
      "Acompanhamento nutricional",
      "Monitoramento glicêmico regular",
    ],
    potentialSavings: {
      individual: 15000, // R$ por ano
      department: 45000,
      company: 180000,
    },
  }
}

function calculateCardiovascularRisk(biomarkers: Biomarker[], wearableData: any, demographicData: any): PredictiveRisk {
  let riskScore = 0
  const contributingFactors: string[] = []

  // Biomarcadores
  const cholesterol = biomarkers.find((b) => b.name === "Colesterol Total")
  const ldl = biomarkers.find((b) => b.name === "LDL")
  const crp = biomarkers.find((b) => b.name === "Proteína C Reativa")

  if (cholesterol && cholesterol.value > 240) {
    riskScore += 20
    contributingFactors.push("Colesterol total elevado")
  }

  if (ldl && ldl.value > 130) {
    riskScore += 25
    contributingFactors.push("LDL elevado")
  }

  if (crp && crp.value > 3.0) {
    riskScore += 15
    contributingFactors.push("Inflamação sistêmica")
  }

  // Wearables
  if (wearableData.resting_hr?.average > 80) {
    riskScore += 10
    contributingFactors.push("FC repouso elevada")
  }

  if (wearableData.activity?.weekly_minutes < 150) {
    riskScore += 15
    contributingFactors.push("Atividade física insuficiente")
  }

  const riskLevel = riskScore > 60 ? "critical" : riskScore > 40 ? "high" : riskScore > 20 ? "medium" : "low"

  return {
    condition: "Doença Cardiovascular",
    riskScore,
    riskLevel,
    timeframe: "5-10 anos",
    confidence: 78,
    contributingFactors,
    preventiveActions: [
      "Programa de exercícios cardiovasculares",
      "Dieta com redução de gorduras saturadas",
      "Controle do estresse",
      "Monitoramento regular da pressão arterial",
    ],
    potentialSavings: {
      individual: 25000,
      department: 75000,
      company: 300000,
    },
  }
}

function calculateBurnoutRisk(biomarkers: Biomarker[], wearableData: any, demographicData: any): PredictiveRisk {
  let riskScore = 0
  const contributingFactors: string[] = []

  // Biomarcadores
  const cortisol = biomarkers.find((b) => b.name === "Cortisol")
  const vitaminD = biomarkers.find((b) => b.name === "Vitamina D")

  if (cortisol && cortisol.value > 20) {
    riskScore += 30
    contributingFactors.push("Cortisol cronicamente elevado")
  }

  if (vitaminD && vitaminD.value < 20) {
    riskScore += 10
    contributingFactors.push("Deficiência de Vitamina D")
  }

  // Wearables
  if (wearableData.stress?.average_level > 7) {
    riskScore += 25
    contributingFactors.push("Alto nível de estresse")
  }

  if (wearableData.hrv?.average < 30) {
    riskScore += 20
    contributingFactors.push("Baixa variabilidade cardíaca")
  }

  if (wearableData.sleep?.efficiency < 80) {
    riskScore += 15
    contributingFactors.push("Sono de baixa qualidade")
  }

  const riskLevel = riskScore > 70 ? "critical" : riskScore > 50 ? "high" : riskScore > 30 ? "medium" : "low"

  return {
    condition: "Burnout",
    riskScore,
    riskLevel,
    timeframe: "6-18 meses",
    confidence: 82,
    contributingFactors,
    preventiveActions: [
      "Técnicas de gestão de estresse",
      "Melhoria da qualidade do sono",
      "Pausas regulares durante o trabalho",
      "Suporte psicológico preventivo",
    ],
    potentialSavings: {
      individual: 8000,
      department: 24000,
      company: 96000,
    },
  }
}

// Cálculo de savings financeiros
export interface FinancialSavings {
  prevention: {
    individual: number
    department: number
    company: number
  }
  treatment: {
    individual: number
    department: number
    company: number
  }
  productivity: {
    individual: number
    department: number
    company: number
  }
  total: {
    individual: number
    department: number
    company: number
  }
}

export function calculateFinancialSavings(
  risks: PredictiveRisk[],
  departmentSize: number,
  companySize: number,
): FinancialSavings {
  const totalRiskSavings = risks.reduce(
    (acc, risk) => ({
      individual: acc.individual + risk.potentialSavings.individual,
      department: acc.department + risk.potentialSavings.department,
      company: acc.company + risk.potentialSavings.company,
    }),
    { individual: 0, department: 0, company: 0 },
  )

  // Savings adicionais por produtividade
  const productivitySavings = {
    individual: 5000, // R$ por ano por pessoa
    department: 5000 * departmentSize,
    company: 5000 * companySize,
  }

  return {
    prevention: totalRiskSavings,
    treatment: {
      individual: totalRiskSavings.individual * 0.3,
      department: totalRiskSavings.department * 0.3,
      company: totalRiskSavings.company * 0.3,
    },
    productivity: productivitySavings,
    total: {
      individual: totalRiskSavings.individual + productivitySavings.individual,
      department: totalRiskSavings.department + productivitySavings.department,
      company: totalRiskSavings.company + productivitySavings.company,
    },
  }
}
