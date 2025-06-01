"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, Clock, Users, Star, Brain, Heart, Apple, Moon, Zap, TrendingUp } from 'lucide-react'

export function EducationContent() {
  const categories = [
    {
      name: "Liderança",
      icon: TrendingUp,
      color: "blue",
      courses: 12,
      enrolled: 1247,
      description: "Desenvolvimento de habilidades de liderança",
    },
    {
      name: "Saúde Mental",
      icon: Brain,
      color: "blue",
      courses: 12,
      enrolled: 1247,
      description: "Gestão de estresse, ansiedade e burnout",
    },
    {
      name: "Sono e Recuperação",
      icon: Moon,
      color: "indigo",
      courses: 6,
      enrolled: 634,
      description: "Higiene do sono e recuperação",
    },
    {
      name: "Gestão de Estresse",
      icon: Zap,
      color: "yellow",
      courses: 10,
      enrolled: 1123,
      description: "Gestão de tempo e foco",
    },
    {
      name: "Saúde Nutricional",
      icon: Apple,
      color: "green",
      courses: 15,
      enrolled: 1456,
      description: "Alimentação saudável e performance",
    },
    {
      name: "Produtividade",
      icon: TrendingUp,
      color: "purple",
      courses: 10,
      enrolled: 1123,
      description: "Gestão de tempo e foco",
    },
  ]

  const featuredCourses = [
    {
      title: "Liderança de Alta Performance",
      instructor: "Dr. Carlos Mente",
      duration: "4h 30min",
      lessons: 12,
      rating: 4.9,
      category: "Liderança",
      progress: 0,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Gestão de Estresse no Trabalho",
      instructor: "Dr. Carlos Mente",
      duration: "4h 30min",
      lessons: 12,
      rating: 4.9,
      enrolled: 234,
      category: "Saúde Mental",
      progress: 0,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Nutrição para Alta Performance",
      instructor: "Dr. Ana Nutrição",
      duration: "3h 15min",
      lessons: 8,
      rating: 4.8,
      enrolled: 189,
      category: "Nutrição",
      progress: 45,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Exercícios para Escritório",
      instructor: "Prof. João Fitness",
      duration: "2h 45min",
      lessons: 6,
      rating: 4.7,
      enrolled: 156,
      category: "Saúde Física",
      progress: 0,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Otimização do Sono",
      instructor: "Dra. Luna Sono",
      duration: "3h 00min",
      lessons: 9,
      rating: 4.9,
      enrolled: 98,
      category: "Sono",
      progress: 78,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ]

  const learningPaths = [
    {
      title: "Programa Completo de Wellness",
      description: "Jornada completa de 12 semanas para transformação da saúde",
      courses: 5,
      duration: "20h",
      level: "Iniciante",
      completion: 23,
    },
    {
      title: "Liderança Saudável",
      description: "Para gestores que querem promover bem-estar em suas equipes",
      courses: 4,
      duration: "15h",
      level: "Intermediário",
      completion: 67,
    },
    {
      title: "Performance Mental",
      description: "Técnicas avançadas para otimização cognitiva",
      courses: 6,
      duration: "18h",
      level: "Avançado",
      completion: 12,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Plataforma Educacional Ukor</h2>
        <p className="text-muted-foreground">Conteúdo educacional integrado sobre saúde, bem-estar e performance</p>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="paths">Trilhas de Aprendizado</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="space-y-6">
            {/* Categorias */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div
                      className={`mx-auto w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-3`}
                    >
                      <category.icon className={`h-6 w-6 text-${category.color}-600`} />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{category.description}</p>
                    <div className="text-xs space-y-1">
                      <div>{category.courses} cursos</div>
                      <div>{category.enrolled} inscritos</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cursos em Destaque */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Cursos em Destaque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCourses.map((course, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video bg-gray-200 relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary">
                          <Play className="w-4 h-4 mr-2" />
                          Assistir
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {course.category}
                      </Badge>
                      <h4 className="font-semibold mb-2 line-clamp-2">{course.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>

                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                          </span>
                          <span className="flex items-center">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {course.lessons} aulas
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500" />
                            {course.rating}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {course.enrolled}
                          </span>
                        </div>
                      </div>

                      {course.progress > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progresso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      )}

                      <Button className="w-full mt-3" size="sm">
                        {course.progress > 0 ? "Continuar" : "Iniciar Curso"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="paths">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trilhas de Aprendizado</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-semibold">{path.courses}</div>
                          <div className="text-xs text-muted-foreground">Cursos</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{path.duration}</div>
                          <div className="text-xs text-muted-foreground">Duração</div>
                        </div>
                        <div>
                          <Badge variant="outline">{path.level}</Badge>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progresso</span>
                          <span>{path.completion}%</span>
                        </div>
                        <Progress value={path.completion} />
                      </div>

                      <Button className="w-full">{path.completion > 0 ? "Continuar Trilha" : "Iniciar Trilha"}</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Horas Estudadas</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,492</div>
                <p className="text-xs text-muted-foreground">+8% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73%</div>
                <p className="text-xs text-muted-foreground">+5% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">Avaliação média</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
