"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, TrendingUp, AlertCircle, Brain, Heart, Utensils, Shield, Zap, Activity } from "lucide-react"

export function ISPCalculator() {
  const [scores, setScores] = useState({
    saudeMental: "",
    sono: "",
    saudeNutricional: "",
    gestaoEstresse: "",
    produtividade: "",
    saudeFisica: "",
  })

  const [results, setResults] = useState<{
    ispScore: number
    category: string
    recommendations: string[]
    breakdown: { [key: string]: number }
  } | null>(null)

  const calculateISP = () => {
    const values = {
      saudeMental: Number.parseFloat(scores.saudeMental) || 0,
      sono: Number.parseFloat(scores.sono) || 0,
      saudeNutricional: Number.parseFloat(scores.saudeNutricional) || 0,
      gestaoEstresse: Number.parseFloat(scores.gestaoEstresse) || 0,
      produtividade: Number.parseFloat(scores.produtividade) || 0,
      saudeFisica: Number.parseFloat(scores.saudeFisica) || 0,
    }

    // Validar se todos os valores estão entre 0 e 100
    const isValid = Object.values(values).every((value) => value >= 0 && value <= 100)
    if (!isValid) {
      alert("Todos os valores devem estar entre 0 e 100")
      return
    }

    // Pesos para cada pilar do ISP
    const weights = {
      sono: 0.23, // 23% - Sono é o pilar central
      saudeMental: 0.18, // 18%
      saudeFisica: 0.2, // 20%
      saudeNutricional: 0.15, // 15%
      gestaoEstresse: 0.12, // 12%
      produtividade: 0.12, // 12%
    }

    // Calcular ISP ponderado
    const ispScore = Math.round(
      values.sono * weights.sono +
        values.saudeMental * weights.saudeMental +
        values.saudeFisica * weights.saudeFisica +
        values.saudeNutricional * weights.saudeNutricional +
        values.gestaoEstresse * weights.gestaoEstresse +
        values.produtividade * weights.produtividade,
    )

    // Categorizar resultado
    let category = ""
    let recommendations: string[] = []

    if (ispScore >= 80) {
      category = "Excelente"
      recommendations = [
        "Manter os hábitos saudáveis atuais",
        "Continuar monitoramento regular",
        "Ser exemplo para outros colaboradores",
      ]
    } else if (ispScore >= 65) {
      category = "Bom"
      recommendations = [
        "Focar nos pilares com menor pontuação",
        "Implementar melhorias graduais",
        "Manter acompanhamento mensal",
      ]
    } else if (ispScore >= 50) {
      category = "Atenção"
      recommendations = [
        "Priorizar sono e gestão de estresse",
        "Buscar orientação profissional",
        "Implementar programa de melhoria",
      ]
    } else {
      category = "Crítico"
      recommendations = [
        "Intervenção imediata necessária",
        "Acompanhamento médico recomendado",
        "Programa intensivo de recuperação",
      ]
    }

    setResults({
      ispScore,
      category,
      recommendations,
      breakdown: values,
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 65) return "text-blue-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Excelente":
        return "bg-green-100 text-green-800 border-green-200"
      case "Bom":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Atenção":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Crítico":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const pillars = [
    { key: "sono", label: "Sono", icon: Brain, weight: "23%", description: "Qualidade e quantidade do sono" },
    {
      key: "saudeMental",
      label: "Saúde Mental",
      icon: Heart,
      weight: "18%",
      description: "Bem-estar psicológico e emocional",
    },
    {
      key: "saudeFisica",
      label: "Saúde Física",
      icon: Activity,
      weight: "20%",
      description: "Condicionamento e saúde corporal",
    },
    {
      key: "saudeNutricional",
      label: "Saúde Nutricional",
      icon: Utensils,
      weight: "15%",
      description: "Qualidade da alimentação",
    },
    {
      key: "gestaoEstresse",
      label: "Gestão de Estresse",
      icon: Shield,
      weight: "12%",
      description: "Capacidade de lidar com pressão",
    },
    {
      key: "produtividade",
      label: "Produtividade",
      icon: Zap,
      weight: "12%",
      description: "Eficiência e performance no trabalho",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="ukor-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calculator className="h-5 w-5" />
            Calculadora ISP (Índice de Saúde e Performance)
          </CardTitle>
          <CardDescription className="text-white/80">
            Avalie cada pilar de 0 a 100 para calcular seu ISP personalizado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div key={pillar.key} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={pillar.key} className="text-white font-medium">
                        {pillar.label}
                      </Label>
                      <div className="text-sm text-white/70">
                        Peso: {pillar.weight} • {pillar.description}
                      </div>
                    </div>
                  </div>
                  <Input
                    id={pillar.key}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    value={scores[pillar.key as keyof typeof scores]}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [pillar.key]: e.target.value,
                      }))
                    }
                    className="bg-background/50 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              )
            })}
          </div>

          <Button onClick={calculateISP} className="w-full ukor-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcular ISP
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resultado Principal */}
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-white">Resultado ISP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(results.ispScore)}`}>{results.ispScore}</div>
                <div className="text-white/80 mt-2">Pontuação ISP</div>
                <Badge className={`mt-3 ${getCategoryColor(results.category)}`}>{results.category}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/80">
                  <span>Progresso</span>
                  <span>{results.ispScore}/100</span>
                </div>
                <Progress value={results.ispScore} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Breakdown por Pilar */}
          <Card className="ukor-card">
            <CardHeader>
              <CardTitle className="text-white">Detalhamento por Pilar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pillars.map((pillar) => {
                const score = results.breakdown[pillar.key as keyof typeof results.breakdown]
                const Icon = pillar.icon
                return (
                  <div key={pillar.key} className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-white font-medium">{pillar.label}</div>
                        <div className="text-xs text-white/60">Peso: {pillar.weight}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${getScoreColor(score)}`}>{score}</div>
                      <div className="text-xs text-white/60">/100</div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <Card className="ukor-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5" />
              Recomendações Personalizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-white">{rec}</span>
                </li>
              ))}
            </ul>

            {results.category === "Crítico" && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                  <AlertCircle className="h-5 w-5" />
                  Atenção Especial Necessária
                </div>
                <p className="text-white text-sm">
                  Seu ISP indica necessidade de intervenção imediata. Recomendamos buscar acompanhamento profissional e
                  implementar um programa estruturado de melhoria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
