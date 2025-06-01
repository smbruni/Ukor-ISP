export const sampleReportData = {
  demographics: {
    gender: { mulher: 52, homem: 48 },
    maritalStatus: { solteiro: 35, casado: 58, separado: 7 },
    ageRange: { entre18e30: 28, entre31e45: 45, entre46e55: 27 },
  },
  workEnvironment: {
    workRegime: { homeOffice: 35, hibrido: 45, presencial: 20 },
  },
  mentalHealth: {
    perception: 3.2,
    depressionSigns: 23,
    fatigue: 45,
    confirmedDiagnosis: 12,
    anxietyLevel: 3.8,
  },
  physicalHealth: {
    sedentaryRisk: 67,
    healthProblems: 34,
    smokers: 8,
    recentCheckup: 72,
    alcoholismRisk: 15,
  },
  sleepHealth: {
    sleepTime: { menor5h: 15, h6: 25, h7a8: 35, h8a9: 20, maior9h: 5 },
    sleepDifficulty: 42,
    workImpactOnSleep: 38,
    caffeineAbuse: 28,
    sleepMedication: { medicamentos: 12, suplementos: 18, nenhum: 70 },
  },
  nutritionalHealth: {
    perception: 6.2,
    idealWeight: { acimaIdeal: 45, pertoIdeal: 38, abaixoIdeal: 17 },
    fruitConsumption: { mais5vezes: 22, entre4e5: 28, vezes3: 25, menos2: 25 },
    vegetableConsumption: { menos1vez: 18, entre1e2: 32, entre3e5: 35, entre6e7: 15 },
    ultraProcessedConsumption: { menos1vez: 25, entre1e2: 35, entre3e5: 28, entre6e7: 12 },
  },
  stressManagement: {
    perception: 7.2,
    stressfulRoutine: 58,
    workCausedStress: 45,
    absenteeism: 23,
    dailyStressLevel: 3.5,
  },
  productivity: {
    perception: 72,
    concentration: { muitaDificuldade: 18, oscilaFrequencia: 45, naoTemDificuldade: 37 },
    decisionMaking: 28,
  },
  engagement: {
    jobSatisfaction: 6.8,
    workLifeBalance: 5.9,
    teamConnection: 7.2,
    companyAlignment: 6.5,
    careerDevelopment: 5.8,
    recognition: 6.1,
  },
}
