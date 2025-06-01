"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Brain,
  Heart,
  Apple,
  Moon,
  Zap,
  TrendingUp,
  FileText,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

export function QuestionnaireManager() {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const questionnaires = [
    {
      id: "mental-health",
      name: "PHQ-9 - Questionário de Saúde Mental",
      category: "Saúde Mental",
      icon: Brain,
      color: "blue",
      description: "Patient Health Questionnaire - Avaliação de sintomas depressivos",
      questions: 9,
      duration: "5-7 min",
      frequency: "Mensal",
      weight: 17,
      status: "Ativo",
      lastUpdate: "Hoje",
      responses: 1247,
      questions_list: [
        {
          id: 1,
          text: "Pouco interesse ou prazer em fazer as coisas",
          type: "scale",
          options: [
            { value: 0, label: "Nenhuma vez" },
            { value: 1, label: "Vários dias" },
            { value: 2, label: "Mais da metade dos dias" },
            { value: 3, label: "Quase todos os dias" },
          ],
        },
        {
          id: 2,
          text: "Sentir-se desanimado, deprimido ou sem esperança",
          type: "scale",
          options: [
            { value: 0, label: "Nenhuma vez" },
            { value: 1, label: "Vários dias" },
            { value: 2, label: "Mais da metade dos dias" },
            { value: 3, label: "Quase todos os dias" },
          ],
        },
        {
          id: 3,
          text: "Dificuldade para adormecer, continuar dormindo ou dormir demais",
          type: "scale",
          options: [
            { value: 0, label: "Nenhuma vez" },
            { value: 1, label: "Vários dias" },
            { value: 2, label: "Mais da metade dos dias" },
            { value: 3, label: "Quase todos os dias" },
          ],
        },
      ],
    },
    {
      id: "sleep-quality",
      name: "PSQI - Índice de Qualidade do Sono",
      category: "Qualidade do Sono",
      icon: Moon,
      color: "indigo",
      description: "Pittsburgh Sleep Quality Index - Avaliação da qualidade do sono",
      questions: 19,
      duration: "8-10 min",
      frequency: "Mensal",
      weight: 23,
      status: "Ativo",
      lastUpdate: "Ontem",
      responses: 892,
      questions_list: [
        {
          id: 1,
          text: "Durante o último mês, que horas você foi dormir à noite?",
          type: "time",
          placeholder: "Ex: 23:00",
        },
        {
          id: 2,
          text: "Durante o último mês, quantos minutos você demorou para adormecer?",
          type: "number",
          placeholder: "Minutos",
        },
        {
          id: 3,
          text: "Durante o último mês, que horas você acordou de manhã?",
          type: "time",
          placeholder: "Ex: 07:00",
        },
      ],
    },
    {
      id: "stress-management",
      name: "PSS-10 - Escala de Estresse Percebido",
      category: "Gestão de Estresse",
      icon: Zap,
      color: "yellow",
      description: "Perceived Stress Scale - Avaliação do nível de estresse percebido",
      questions: 10,
      duration: "3-5 min",
      frequency: "Quinzenal",
      weight: 15,
      status: "Ativo",
      lastUpdate: "2 dias atrás",
      responses: 1156,
      questions_list: [
        {
          id: 1,
          text: "No último mês, com que frequência você ficou aborrecido por causa de algo que aconteceu inesperadamente?",
          type: "scale",
          options: [
            { value: 0, label: "Nunca" },
            { value: 1, label: "Quase nunca" },
            { value: 2, label: "Às vezes" },
            { value: 3, label: "Frequentemente" },
            { value: 4, label: "Muito frequentemente" },
          ],
        },
        {
          id: 2,
          text: "No último mês, com que frequência você se sentiu incapaz de controlar as coisas importantes da sua vida?",
          type: "scale",
          options: [
            { value: 0, label: "Nunca" },
            { value: 1, label: "Quase nunca" },
            { value: 2, label: "Às vezes" },
            { value: 3, label: "Frequentemente" },
            { value: 4, label: "Muito frequentemente" },
          ],
        },
      ],
    },
    {
      id: "physical-health",
      name: "SF-36 - Questionário de Saúde Física",
      category: "Saúde Física",
      icon: Heart,
      color: "red",
      description: "Short Form Health Survey - Avaliação do estado de saúde física",
      questions: 36,
      duration: "10-15 min",
      frequency: "Trimestral",
      weight: 20,
      status: "Ativo",
      lastUpdate: "1 semana atrás",
      responses: 634,
      questions_list: [
        {
          id: 1,
          text: "Em geral, você diria que sua saúde é:",
          type: "scale",
          options: [
            { value: 5, label: "Excelente" },
            { value: 4, label: "Muito boa" },
            { value: 3, label: "Boa" },
            { value: 2, label: "Ruim" },
            { value: 1, label: "Muito ruim" },
          ],
        },
        {
          id: 2,
          text: "Comparada há um ano atrás, como você classificaria sua saúde em geral, agora?",
          type: "scale",
          options: [
            { value: 5, label: "Muito melhor" },
            { value: 4, label: "Um pouco melhor" },
            { value: 3, label: "Quase a mesma" },
            { value: 2, label: "Um pouco pior" },
            { value: 1, label: "Muito pior" },
          ],
        },
      ],
    },
    {
      id: "nutrition",
      name: "Questionário de Hábitos Alimentares",
      category: "Saúde Nutricional",
      icon: Apple,
      color: "green",
      description: "Avaliação de padrões alimentares e hábitos nutricionais",
      questions: 25,
      duration: "8-12 min",
      frequency: "Mensal",
      weight: 16,
      status: "Ativo",
      lastUpdate: "3 dias atrás",
      responses: 789,
      questions_list: [
        {
          id: 1,
          text: "Quantas refeições você faz por dia?",
          type: "scale",
          options: [
            { value: 1, label: "1-2 refeições" },
            { value: 2, label: "3 refeições" },
            { value: 3, label: "4-5 refeições" },
            { value: 4, label: "6 ou mais refeições" },
          ],
        },
        {
          id: 2,
          text: "Com que frequência você consome frutas e vegetais?",
          type: "scale",
          options: [
            { value: 4, label: "Diariamente" },
            { value: 3, label: "4-6 vezes por semana" },
            { value: 2, label: "2-3 vezes por semana" },
            { value: 1, label: "Raramente ou nunca" },
          ],
        },
      ],
    },
    {
      id: "productivity",
      name: "WPAI - Questionário de Produtividade",
      category: "Produtividade",
      icon: TrendingUp,
      color: "purple",
      description: "Work Productivity and Activity Impairment - Avaliação de produtividade no trabalho",
      questions: 6,
      duration: "3-5 min",
      frequency: "Mensal",
      weight: 9,
      status: "Ativo",
      lastUpdate: "Hoje",
      responses: 1023,
      questions_list: [
        {
          id: 1,
          text: "Você está atualmente empregado (trabalhando por pagamento)?",
          type: "boolean",
          options: [
            { value: 1, label: "Sim" },
            { value: 0, label: "Não" },
          ],
        },
        {
          id: 2,
          text: "Durante as últimas sete semanas, quantas horas você perdeu do trabalho devido a problemas de saúde?",
          type: "number",
          placeholder: "Horas perdidas",
        },
      ],
    },
    {
      id: "happiness-approaches",
      name: "Abordagens à Felicidade",
      category: "Bem-Estar Psicológico",
      icon: Brain,
      color: "pink",
      description: "Questionário da Universidade da Pensilvânia sobre diferentes abordagens à felicidade",
      questions: 18,
      duration: "5-8 min",
      frequency: "Trimestral",
      weight: 15,
      status: "Ativo",
      lastUpdate: "Hoje",
      responses: 0,
      questions_list: [
        {
          id: 1,
          text: "Independentemente do que eu esteja fazendo, o tempo passa muito rápido.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Neutro" },
            { value: 4, label: "Concordo" },
            { value: 5, label: "Concordo totalmente" },
          ],
        },
        {
          id: 2,
          text: "Minha vida serve a um propósito maior que eu mesmo.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Neutro" },
            { value: 4, label: "Concordo" },
            { value: 5, label: "Concordo totalmente" },
          ],
        },
        {
          id: 3,
          text: "A vida é curta demais para adiar os prazeres que ela pode proporcionar.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Neutro" },
            { value: 4, label: "Concordo" },
            { value: 5, label: "Concordo totalmente" },
          ],
        },
        {
          id: 4,
          text: "Busco situações que desafiam minhas habilidades e capacidades.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Neutro" },
            { value: 4, label: "Concordo" },
            { value: 5, label: "Concordo totalmente" },
          ],
        },
        {
          id: 5,
          text: "Ao escolher o que fazer, sempre levo em conta se isso beneficiará outras pessoas.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Neutro" },
            { value: 4, label: "Concordo" },
            { value: 5, label: "Concordo totalmente" },
          ],
        },
        {
          id: 6,
          text: "Para mim, uma vida boa é agradável, não necessariamente cheia de significado.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Neutro" },
            { value: 4, label: "Concordo" },
            { value: 5, label: "Concordo totalmente" },
          ],
        },
      ],
    },
    {
      id: "optimism-test",
      name: "Teste de Otimismo",
      category: "Psicologia Positiva",
      icon: TrendingUp,
      color: "orange",
      description: "Questionário da Universidade da Pensilvânia sobre otimismo em relação ao futuro",
      questions: 10,
      duration: "3-5 min",
      frequency: "Trimestral",
      weight: 12,
      status: "Ativo",
      lastUpdate: "Hoje",
      responses: 0,
      questions_list: [
        {
          id: 1,
          text: "Em momentos de incerteza, geralmente espero que aconteça o melhor.",
          type: "scale",
          options: [
            { value: 0, label: "Discordo totalmente" },
            { value: 1, label: "Discordo" },
            { value: 2, label: "Neutro" },
            { value: 3, label: "Concordo" },
            { value: 4, label: "Concordo totalmente" },
          ],
        },
        {
          id: 2,
          text: "É fácil para mim relaxar.",
          type: "scale",
          options: [
            { value: 0, label: "Discordo totalmente" },
            { value: 1, label: "Discordo" },
            { value: 2, label: "Neutro" },
            { value: 3, label: "Concordo" },
            { value: 4, label: "Concordo totalmente" },
          ],
        },
        {
          id: 3,
          text: "Se algo pode dar errado para mim, certamente dará.",
          type: "scale",
          options: [
            { value: 4, label: "Discordo totalmente" },
            { value: 3, label: "Discordo" },
            { value: 2, label: "Neutro" },
            { value: 1, label: "Concordo" },
            { value: 0, label: "Concordo totalmente" },
          ],
        },
        {
          id: 4,
          text: "Sou sempre otimista sobre meu futuro.",
          type: "scale",
          options: [
            { value: 0, label: "Discordo totalmente" },
            { value: 1, label: "Discordo" },
            { value: 2, label: "Neutro" },
            { value: 3, label: "Concordo" },
            { value: 4, label: "Concordo totalmente" },
          ],
        },
        {
          id: 5,
          text: "Gosto muito dos meus amigos.",
          type: "scale",
          options: [
            { value: 0, label: "Discordo totalmente" },
            { value: 1, label: "Discordo" },
            { value: 2, label: "Neutro" },
            { value: 3, label: "Concordo" },
            { value: 4, label: "Concordo totalmente" },
          ],
        },
        {
          id: 6,
          text: "É importante para mim manter-me ocupado.",
          type: "scale",
          options: [
            { value: 0, label: "Discordo totalmente" },
            { value: 1, label: "Discordo" },
            { value: 2, label: "Neutro" },
            { value: 3, label: "Concordo" },
            { value: 4, label: "Concordo totalmente" },
          ],
        },
      ],
    },
    {
      id: "well-being-survey",
      name: "Pesquisa de Bem-Estar",
      category: "Qualidade de Vida",
      icon: Heart,
      color: "green",
      description: "Questionário da Universidade da Pensilvânia sobre bem-estar geral",
      questions: 15,
      duration: "5-7 min",
      frequency: "Mensal",
      weight: 18,
      status: "Ativo",
      lastUpdate: "Hoje",
      responses: 0,
      questions_list: [
        {
          id: 1,
          text: "Na maioria dos aspectos, minha vida está próxima do meu ideal.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Discordo ligeiramente" },
            { value: 4, label: "Neutro" },
            { value: 5, label: "Concordo ligeiramente" },
            { value: 6, label: "Concordo" },
            { value: 7, label: "Concordo totalmente" },
          ],
        },
        {
          id: 2,
          text: "As condições da minha vida são excelentes.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Discordo ligeiramente" },
            { value: 4, label: "Neutro" },
            { value: 5, label: "Concordo ligeiramente" },
            { value: 6, label: "Concordo" },
            { value: 7, label: "Concordo totalmente" },
          ],
        },
        {
          id: 3,
          text: "Estou satisfeito com minha vida.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Discordo ligeiramente" },
            { value: 4, label: "Neutro" },
            { value: 5, label: "Concordo ligeiramente" },
            { value: 6, label: "Concordo" },
            { value: 7, label: "Concordo totalmente" },
          ],
        },
        {
          id: 4,
          text: "Até agora, consegui as coisas importantes que quero na vida.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Discordo ligeiramente" },
            { value: 4, label: "Neutro" },
            { value: 5, label: "Concordo ligeiramente" },
            { value: 6, label: "Concordo" },
            { value: 7, label: "Concordo totalmente" },
          ],
        },
        {
          id: 5,
          text: "Se eu pudesse viver minha vida novamente, não mudaria quase nada.",
          type: "scale",
          options: [
            { value: 1, label: "Discordo totalmente" },
            { value: 2, label: "Discordo" },
            { value: 3, label: "Discordo ligeiramente" },
            { value: 4, label: "Neutro" },
            { value: 5, label: "Concordo ligeiramente" },
            { value: 6, label: "Concordo" },
            { value: 7, label: "Concordo totalmente" },
          ],
        },
        {
          id: 6,
          text: "Em geral, considero-me uma pessoa:",
          type: "scale",
          options: [
            { value: 1, label: "Nada feliz" },
            { value: 2, label: "Não muito feliz" },
            { value: 3, label: "Um pouco infeliz" },
            { value: 4, label: "Nem feliz nem infeliz" },
            { value: 5, label: "Um pouco feliz" },
            { value: 6, label: "Muito feliz" },
            { value: 7, label: "Extremamente feliz" },
          ],
        },
      ],
    },
    {
      id: "stress-empathy",
      name: "Questionário de Estresse e Empatia",
      category: "Saúde Mental",
      icon: Zap,
      color: "purple",
      description: "Questionário da Universidade da Pensilvânia sobre estresse, empatia e saúde geral",
      questions: 12,
      duration: "4-6 min",
      frequency: "Mensal",
      weight: 16,
      status: "Ativo",
      lastUpdate: "Hoje",
      responses: 0,
      questions_list: [
        {
          id: 1,
          text: "No último mês, com que frequência você se sentiu nervoso e estressado?",
          type: "scale",
          options: [
            { value: 0, label: "Nunca" },
            { value: 1, label: "Quase nunca" },
            { value: 2, label: "Às vezes" },
            { value: 3, label: "Com bastante frequência" },
            { value: 4, label: "Muito frequentemente" },
          ],
        },
        {
          id: 2,
          text: "No último mês, com que frequência você sentiu que estava lidando bem com mudanças importantes em sua vida?",
          type: "scale",
          options: [
            { value: 4, label: "Nunca" },
            { value: 3, label: "Quase nunca" },
            { value: 2, label: "Às vezes" },
            { value: 1, label: "Com bastante frequência" },
            { value: 0, label: "Muito frequentemente" },
          ],
        },
        {
          id: 3,
          text: "Consigo facilmente dizer se alguém quer participar de uma conversa.",
          type: "scale",
          options: [
            { value: 0, label: "Discordo totalmente" },
            { value: 1, label: "Discordo" },
            { value: 2, label: "Neutro" },
            { value: 3, label: "Concordo" },
            { value: 4, label: "Concordo totalmente" },
          ],
        },
        {
          id: 4,
          text: "Acho difícil explicar para os outros coisas que eu entendo facilmente, quando eles não entendem da primeira vez.",
          type: "scale",
          options: [
            { value: 4, label: "Discordo totalmente" },
            { value: 3, label: "Discordo" },
            { value: 2, label: "Neutro" },
            { value: 1, label: "Concordo" },
            { value: 0, label: "Concordo totalmente" },
          ],
        },
        {
          id: 5,
          text: "Como você classificaria sua saúde geral atualmente?",
          type: "scale",
          options: [
            { value: 1, label: "Ruim" },
            { value: 2, label: "Regular" },
            { value: 3, label: "Boa" },
            { value: 4, label: "Muito boa" },
            { value: 5, label: "Excelente" },
          ],
        },
        {
          id: 6,
          text: "Comparado a um ano atrás, como você classificaria sua saúde em geral agora?",
          type: "scale",
          options: [
            { value: 1, label: "Muito pior" },
            { value: 2, label: "Um pouco pior" },
            { value: 3, label: "Aproximadamente igual" },
            { value: 4, label: "Um pouco melhor" },
            { value: 5, label: "Muito melhor" },
          ],
        },
      ],
    },
  ]

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < selectedQuestionnaire.questions_list.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitQuestionnaire = () => {
    // Lógica para submeter o questionário
    console.log("Respostas:", answers)
    alert("Questionário enviado com sucesso!")
    setSelectedQuestionnaire(null)
    setCurrentQuestion(0)
    setAnswers({})
  }

  const renderQuestion = (question) => {
    switch (question.type) {
      case "scale":
        return (
          <RadioGroup
            value={answers[question.id]?.toString()}
            onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`q${question.id}_${option.value}`} />
                <Label htmlFor={`q${question.id}_${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "boolean":
        return (
          <RadioGroup
            value={answers[question.id]?.toString()}
            onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`q${question.id}_${option.value}`} />
                <Label htmlFor={`q${question.id}_${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "number":
        return (
          <Input
            type="number"
            placeholder={question.placeholder}
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        )
      case "time":
        return (
          <Input
            type="time"
            placeholder={question.placeholder}
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        )
      case "text":
        return (
          <Textarea
            placeholder={question.placeholder}
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        )
      default:
        return null
    }
  }

  if (selectedQuestionnaire) {
    const currentQ = selectedQuestionnaire.questions_list[currentQuestion]
    const progress = ((currentQuestion + 1) / selectedQuestionnaire.questions_list.length) * 100

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{selectedQuestionnaire.name}</h2>
            <p className="text-muted-foreground">{selectedQuestionnaire.description}</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedQuestionnaire(null)}>
            Voltar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Questão {currentQuestion + 1} de {selectedQuestionnaire.questions_list.length}
              </CardTitle>
              <Badge variant="outline">{Math.round(progress)}% concluído</Badge>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-lg font-medium">{currentQ.text}</Label>
              <div className="mt-4">{renderQuestion(currentQ)}</div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                Anterior
              </Button>

              {currentQuestion === selectedQuestionnaire.questions_list.length - 1 ? (
                <Button onClick={submitQuestionnaire}>Finalizar Questionário</Button>
              ) : (
                <Button onClick={nextQuestion}>Próxima</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Questionários de Avaliação</h2>
        <p className="text-muted-foreground">Questionários padronizados para alimentar os índices do ISP</p>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Disponíveis</TabsTrigger>
          <TabsTrigger value="responses">Respostas</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionnaires.map((questionnaire) => (
              <Card key={questionnaire.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-${questionnaire.color}-100`}>
                      <questionnaire.icon className={`h-5 w-5 text-${questionnaire.color}-600`} />
                    </div>
                    <Badge variant="outline">{questionnaire.status}</Badge>
                  </div>
                  <CardTitle className="text-lg">{questionnaire.name}</CardTitle>
                  <CardDescription>{questionnaire.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{questionnaire.questions} questões</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{questionnaire.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{questionnaire.frequency}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{questionnaire.responses} respostas</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">Última atualização: {questionnaire.lastUpdate}</div>

                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedQuestionnaire(questionnaire)
                        setCurrentQuestion(0)
                        setAnswers({})
                      }}
                    >
                      Iniciar Questionário
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="responses">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Respostas Recentes</h3>
            <div className="space-y-3">
              {[
                { user: "Ana Silva", questionnaire: "PHQ-9", score: 8, status: "Atenção", time: "2h atrás" },
                { user: "Carlos Santos", questionnaire: "PSQI", score: 12, status: "Crítico", time: "4h atrás" },
                { user: "Maria Costa", questionnaire: "PSS-10", score: 15, status: "Bom", time: "1 dia atrás" },
              ].map((response, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{response.user}</h4>
                        <p className="text-sm text-muted-foreground">{response.questionnaire}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{response.score}</div>
                        <Badge
                          variant={
                            response.status === "Crítico"
                              ? "destructive"
                              : response.status === "Atenção"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {response.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{response.time}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Respostas</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,741</div>
                <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+3% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.2 min</div>
                <p className="text-xs text-muted-foreground">-0.5 min vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">-8 vs mês anterior</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
