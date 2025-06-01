import { RiskEvolutionExplanation } from "@/components/charts/risk-evolution-explanation"

export default function RiskMethodologyPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Metodologia: Evolução do Risco</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Entenda como calculamos e interpretamos os dados de risco por departamento
        </p>
      </div>

      <RiskEvolutionExplanation />
    </div>
  )
}
