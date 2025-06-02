"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Play, Clock, CheckCircle, Star } from "lucide-react"

export function EducationContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Fundamentos de Saúde Corporativa",
      description: "Aprenda os princípios básicos para promover saúde no ambiente de trabalho.",
      image: "/placeholder.svg?height=200&width=300",
      category: "saude",
      duration: "4h 30min",
      lessons: 12,
      progress: 75,
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      title: "Gestão do Estresse no Trabalho",
      description: "Técnicas práticas para gerenciar o estresse e aumentar a produtividade.",
      image: "/placeholder.svg?height=200&width=300",
      category: "mental",
      duration: "3h 15min",
      lessons: 8,
      progress: 50,
      rating: 4.9,
      featured: true,
    },
    {
      id: 3,
      title: "Nutrição para Alta Performance",
      description: "Como a alimentação impacta sua energia e performance no trabalho.",
      image: "/placeholder.svg?height=200&width=300",
      category: "nutricao",
      duration: "5h 45min",
      lessons: 15,
      progress: 30,
      rating: 4.7,
      featured: false,
    },
    {
      id: 4,
      title: "Ergonomia e Postura no Home Office",
      description: "Organize seu espaço de trabalho para prevenir lesões e aumentar o conforto.",
      image: "/placeholder.svg?height=200&width=300",
      category: "fisica",
      duration: "2h 20min",
      lessons: 6,
      progress: 100,
      rating: 4.5,
      featured: false,
    },
    {
      id: 5,
      title: "Mindfulness para Profissionais",
      description: "Práticas de atenção plena para reduzir ansiedade e melhorar foco.",
      image: "/placeholder.svg?height=200&width=300",
      category: "mental",
      duration: "3h 50min",
      lessons: 10,
      progress: 0,
      rating: 4.9,
      featured: true,
    },
    {
      id: 6,
      title: "Sono e Produtividade",
      description: "Como otimizar seu sono para maximizar sua performance profissional.",
      image: "/placeholder.svg?height=200&width=300",
      category: "sono",
      duration: "4h 10min",
      lessons: 12,
      progress: 25,
      rating: 4.8,
      featured: false,
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "featured" && course.featured) ||
      (filter === "in-progress" && course.progress > 0 && course.progress < 100) ||
      (filter === "completed" && course.progress === 100) ||
      filter === course.category

    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Plataforma Educacional</h1>
          <p className="text-gray-500">Cursos e treinamentos para saúde e performance</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar cursos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="featured">Destaques</TabsTrigger>
            <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="saude">Saúde</TabsTrigger>
            <TabsTrigger value="mental">Mental</TabsTrigger>
            <TabsTrigger value="nutricao">Nutrição</TabsTrigger>
            <TabsTrigger value="fisica">Física</TabsTrigger>
            <TabsTrigger value="sono">Sono</TabsTrigger>
            <TabsTrigger value="roi">ROI em Saúde</TabsTrigger>
            <TabsTrigger value="questionarios">Questionários</TabsTrigger>
            <TabsTrigger value="dados">Dados de Saúde</TabsTrigger>
            <TabsTrigger value="academy">Academy</TabsTrigger>
            <TabsTrigger value="beneficios">Benefícios</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col">
            <div className="relative">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              {course.featured && <Badge className="absolute top-2 right-2 bg-yellow-500">Destaque</Badge>}
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{course.title}</CardTitle>
                <Badge variant="outline" className="capitalize">
                  {course.category === "saude"
                    ? "Saúde"
                    : course.category === "mental"
                      ? "Mental"
                      : course.category === "nutricao"
                        ? "Nutrição"
                        : course.category === "fisica"
                          ? "Física"
                          : course.category === "sono"
                            ? "Sono"
                            : course.category}
                </Badge>
              </div>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
                <span className="mx-2">•</span>
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.lessons} aulas</span>
                <span className="mx-2">•</span>
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span>{course.rating}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button className="w-full">
                {course.progress === 0 ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Iniciar Curso
                  </>
                ) : course.progress === 100 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Certificado
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Continuar
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">Nenhum curso encontrado</h3>
          <p className="mt-2 text-gray-500">Tente ajustar seus filtros ou termos de busca.</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Trilhas de Aprendizado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Saúde Integral</CardTitle>
              <CardDescription>Trilha completa para saúde física e mental</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Fundamentos de Saúde</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Nutrição Básica</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Gestão do Estresse</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Sono Reparador</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Continuar Trilha
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alta Performance</CardTitle>
              <CardDescription>Maximize sua produtividade e resultados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>20%</span>
                </div>
                <Progress value={20} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Fundamentos de Produtividade</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Gestão de Energia</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Foco e Concentração</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Hábitos de Alta Performance</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Continuar Trilha
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liderança em Saúde</CardTitle>
              <CardDescription>Para gestores e líderes de equipe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>0%</span>
                </div>
                <Progress value={0} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Cultura de Saúde</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Gestão de Equipes Saudáveis</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Métricas de Bem-estar</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">ROI em Saúde</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Iniciar Trilha
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ROI em Saúde</CardTitle>
              <CardDescription>Análises financeiras detalhadas da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>100%</span>
                </div>
                <Progress value={100} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Análises Financeiras</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Calculadora Interativa</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Métricas de Impacto</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Comparações com Benchmarks</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver Análises
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questionários</CardTitle>
              <CardDescription>Questionários validados de saúde mental, bem-estar e liderança</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>50%</span>
                </div>
                <Progress value={50} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Aplicação de Questionários</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Acompanhamento</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Análise de Resultados</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Relatórios Personalizados</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Responder Questionários
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados de Saúde</CardTitle>
              <CardDescription>Integração com planos de saúde e RH</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Integração com Planos de Saúde</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Conectores para Wearables</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Dashboard de Monitoramento</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Análises Preditivas</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver Dados
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academy</CardTitle>
              <CardDescription>Cursos especializados em saúde e bem-estar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>60%</span>
                </div>
                <Progress value={60} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Cursos Especializados</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Trilhas de Aprendizagem</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Certificações</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Conteúdo Baseado em Evidências</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Acessar Academy
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefícios</CardTitle>
              <CardDescription>Gestão completa de parceiros (Wellhub, Zenklub, etc.)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>30%</span>
                </div>
                <Progress value={30} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Gestão de Parceiros</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Análise de Custos</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Métricas de Satisfação</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-500">Otimização de Investimentos</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Gerenciar Benefícios
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
