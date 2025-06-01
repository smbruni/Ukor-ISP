"use client"

// Algoritmos de cálculo baseados no relatório real da Ukor
export interface ISPPillarData {
  sleepHealth: number // Sono - 23%
  physicalHealth: number // Saúde Física - 20%
  mentalHealth: number // Saúde Mental - 18%
  nutritionalHealth: number // Saúde Nutricional - 16%
  engagement: number // Engajamento - 13%
  productivity: number // Produtividade - 10%
}

export interface ISPWeights {
  sleepHealth: number // 23%
  physicalHealth: number // 20%
  mentalHealth: number // 18%
  nutritionalHealth: number // Saúde Nutricional - 16%
  engagement: number // Engajamento - 13%
  productivity: number // 10%
}

// Pesos atualizados para somar 100%
export const DEFAULT_ISP_WEIGHTS: ISPWeights = {
  sleepHealth: 0.23, // 23% - Maior peso
  physicalHealth: 0.2, // 20%
  mentalHealth: 0.18, // 18%
  nutritionalHealth: 0.16, // 16%
  engagement: 0.13, // 13%
  productivity: 0.1, // 10%
}

// Cálculo do ISP ponderado
export function calculateWeightedISP(scores: ISPPillarData, weights: ISPWeights = DEFAULT_ISP_WEIGHTS): number {
  const weightedScore =
    scores.sleepHealth * weights.sleepHealth +
    scores.physicalHealth * weights.physicalHealth +
    scores.mentalHealth * weights.mentalHealth +
    scores.nutritionalHealth * weights.nutritionalHealth +
    scores.engagement * weights.engagement +
    scores.productivity * weights.productivity

  return Math.round(weightedScore)
}

// Cálculo do score de sono baseado nos dados do relatório
export function calculateSleepScore(sleepData: {
  sleepTime: { menor5h: number; h6: number; h7a8: number; h8a9: number; maior9h: number }
  sleepDifficulty: number
  workImpactOnSleep: number
  caffeineAbuse: number
  sleepMedication: { medicamentos: number; suplementos: number; nenhum: number }
}): number {
  let score = 100

  // Penalizar sono inadequado
  score -= sleepData.sleepTime.menor5h * 2 // -2 pontos por % com menos de 5h
  score -= sleepData.sleepTime.h6 * 1 // -1 ponto por % com 6h
  score += sleepData.sleepTime.h7a8 * 0.5 // +0.5 pontos por % com 7-8h (ideal)
  score += sleepData.sleepTime.h8a9 * 0.3 // +0.3 pontos por % com 8-9h
  score -= sleepData.sleepTime.maior9h * 0.5 // -0.5 pontos por % com mais de 9h

  // Penalizar dificuldades
  score -= sleepData.sleepDifficulty * 0.5
  score -= sleepData.workImpactOnSleep * 0.3
  score -= sleepData.caffeineAbuse * 0.2

  // Penalizar uso de medicamentos
  score -= sleepData.sleepMedication.medicamentos * 0.3
  score -= sleepData.sleepMedication.suplementos * 0.1

  return Math.max(0, Math.min(100, Math.round(score)))
}

// Cálculo do score de saúde física
export function calculatePhysicalHealthScore(physicalData: {
  sedentaryRisk: number
  healthProblems: number
  smokers: number
  recentCheckup: number
  alcoholismRisk: number
}): number {
  let score = 100

  // Penalizar fatores de risco
  score -= physicalData.sedentaryRisk * 0.8
  score -= physicalData.healthProblems * 0.6
  score -= physicalData.smokers * 1.5
  score -= physicalData.alcoholismRisk * 0.4

  // Bonificar check-ups
  score += physicalData.recentCheckup * 0.2

  return Math.max(0, Math.min(100, Math.round(score)))
}

// Cálculo do score de saúde mental
export function calculateMentalHealthScore(mentalData: {
  perception: number // 1-5 scale
  depressionSigns: number
  fatigue: number
  confirmedDiagnosis: number
  anxietyLevel: number // 1-5 scale
}): number {
  let score = 100

  // Converter percepção (1-5) para score (1=100, 5=20)
  score = (6 - mentalData.perception) * 20

  // Penalizar problemas específicos
  score -= mentalData.depressionSigns * 1.2
  score -= mentalData.fatigue * 0.5
  score -= mentalData.confirmedDiagnosis * 2.0
  score -= (mentalData.anxietyLevel - 1) * 15 // Ansiedade alta penaliza mais

  return Math.max(0, Math.min(100, Math.round(score)))
}

// Cálculo do score nutricional
export function calculateNutritionalScore(nutritionData: {
  perception: number
  idealWeight: { acimaIdeal: number; pertoIdeal: number; abaixoIdeal: number }
  fruitConsumption: { mais5vezes: number; entre4e5: number; vezes3: number; menos2: number }
  vegetableConsumption: { menos1vez: number; entre1e2: number; entre3e5: number; entre6e7: number }
  ultraProcessedConsumption: { menos1vez: number; entre1e2: number; entre3e5: number; entre6e7: number }
}): number {
  let score = nutritionData.perception

  // Ajustar baseado no peso
  score += nutritionData.idealWeight.pertoIdeal * 0.3
  score -= nutritionData.idealWeight.acimaIdeal * 0.2
  score -= nutritionData.idealWeight.abaixoIdeal * 0.1

  // Bonificar consumo de frutas e vegetais
  score += nutritionData.fruitConsumption.mais5vezes * 0.4
  score += nutritionData.fruitConsumption.entre4e5 * 0.3
  score += nutritionData.vegetableConsumption.entre6e7 * 0.4
  score += nutritionData.vegetableConsumption.entre3e5 * 0.3

  // Penalizar ultraprocessados
  score -= nutritionData.ultraProcessedConsumption.entre6e7 * 0.4
  score -= nutritionData.ultraProcessedConsumption.entre3e5 * 0.2

  return Math.max(0, Math.min(100, Math.round(score)))
}

// Cálculo do score de gestão de estresse
export function calculateStressManagementScore(stressData: {
  perception: number // 1-10 scale
  stressfulRoutine: number
  workCausedStress: number
  absenteeism: number
  dailyStressLevel: number // 1-5 scale
}): number {
  // Converter percepção de estresse (1-10) para score (1=100, 10=10)
  let score = (11 - stressData.perception) * 10

  // Penalizar fatores de estresse
  score -= stressData.stressfulRoutine * 0.3
  score -= stressData.workCausedStress * 0.4
  score -= stressData.absenteeism * 1.0
  score -= (stressData.dailyStressLevel - 1) * 10

  return Math.max(0, Math.min(100, Math.round(score)))
}

// Cálculo do score de produtividade
export function calculateProductivityScore(productivityData: {
  perception: number
  concentration: { muitaDificuldade: number; oscilaFrequencia: number; naoTemDificuldade: number }
  decisionMaking: number
}): number {
  let score = productivityData.perception

  // Ajustar baseado na concentração
  score += productivityData.concentration.naoTemDificuldade * 0.3
  score -= productivityData.concentration.oscilaFrequencia * 0.1
  score -= productivityData.concentration.muitaDificuldade * 0.3

  // Penalizar dificuldade em tomar decisões
  score -= productivityData.decisionMaking * 0.2

  return Math.max(0, Math.min(100, Math.round(score)))
}

// Cálculo do score de engajamento
export function calculateEngagementScore(engagementData: {
  jobSatisfaction: number // 1-10 scale
  workLifeBalance: number // 1-10 scale
  teamConnection: number // 1-10 scale
  companyAlignment: number // 1-10 scale
  careerDevelopment: number // 1-10 scale
  recognition: number // 1-10 scale
}): number {
  const avgScore =
    (engagementData.jobSatisfaction +
      engagementData.workLifeBalance +
      engagementData.teamConnection +
      engagementData.companyAlignment +
      engagementData.careerDevelopment +
      engagementData.recognition) /
    6

  // Converter escala 1-10 para 0-100
  return Math.round((avgScore - 1) * (100 / 9))
}

// Função principal para calcular todos os scores
export function calculateAllISPScores(reportData: any): ISPPillarData {
  return {
    sleepHealth: calculateSleepScore(reportData.sleepHealth),
    physicalHealth: calculatePhysicalHealthScore(reportData.physicalHealth),
    mentalHealth: calculateMentalHealthScore(reportData.mentalHealth),
    nutritionalHealth: calculateNutritionalScore(reportData.nutritionalHealth),
    engagement: calculateEngagementScore(reportData.engagement),
    productivity: calculateProductivityScore(reportData.productivity),
  }
}

// Classificação do ISP
export function getISPClassification(score: number): {
  level: string
  color: string
  description: string
} {
  if (score >= 80) {
    return {
      level: "Excelente",
      color: "green",
      description: "Saúde e performance otimizadas",
    }
  } else if (score >= 60) {
    return {
      level: "Atenção",
      color: "yellow",
      description: "Necessita melhorias pontuais",
    }
  } else {
    return {
      level: "Crítico",
      color: "red",
      description: "Intervenção urgente necessária",
    }
  }
}

// Recomendações baseadas nos scores
export function generateISPRecommendations(scores: ISPPillarData): string[] {
  const recommendations: string[] = []

  if (scores.sleepHealth < 60) {
    recommendations.push("Implementar programa de higiene do sono")
    recommendations.push("Reduzir consumo de cafeína após 14h")
    recommendations.push("Estabelecer rotina de relaxamento antes de dormir")
  }

  if (scores.physicalHealth < 60) {
    recommendations.push("Criar programa de pausas ativas")
    recommendations.push("Implementar ginástica laboral")
    recommendations.push("Incentivar check-ups médicos regulares")
  }

  if (scores.mentalHealth < 60) {
    recommendations.push("Disponibilizar apoio psicológico")
    recommendations.push("Implementar programa de mindfulness")
    recommendations.push("Criar grupos de apoio entre colaboradores")
  }

  if (scores.nutritionalHealth < 60) {
    recommendations.push("Oferecer orientação nutricional")
    recommendations.push("Melhorar opções do refeitório")
    recommendations.push("Criar campanhas de alimentação saudável")
  }

  if (scores.stressManagement < 60) {
    recommendations.push("Implementar técnicas de gestão de estresse")
    recommendations.push("Revisar carga de trabalho")
    recommendations.push("Criar espaços de relaxamento")
  }

  if (scores.productivity < 60) {
    recommendations.push("Otimizar processos de trabalho")
    recommendations.push("Implementar técnicas de foco")
    recommendations.push("Revisar ambiente de trabalho")
  }

  return recommendations
}

// Função para calcular o impacto do sono nos outros pilares
export function calculateSleepImpactOnPillars(sleepScore: number, basePillars: ISPPillarData): ISPPillarData {
  const sleepMultiplier = sleepScore / 100

  // Sono impacta todos os outros pilares
  const impactedPillars = {
    sleepHealth: sleepScore, // Sono não é afetado por si mesmo
    physicalHealth: Math.round(basePillars.physicalHealth * (0.85 + 0.15 * sleepMultiplier)),
    mentalHealth: Math.round(basePillars.mentalHealth * (0.8 + 0.2 * sleepMultiplier)),
    nutritionalHealth: Math.round(basePillars.nutritionalHealth * (0.9 + 0.1 * sleepMultiplier)),
    engagement: Math.round(basePillars.engagement * (0.85 + 0.15 * sleepMultiplier)),
    productivity: Math.round(basePillars.productivity * (0.75 + 0.25 * sleepMultiplier)),
  }

  return impactedPillars
}
