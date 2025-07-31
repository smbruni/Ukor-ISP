"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, Users, Award, Clock, CheckCircle, Star, TrendingUp } from "lucide-react"

export function EducationContent() {
  const courses = [
    {
      id: 1,
      title: "Prevenção de Doenças Cardiovasculares",
      description: "Aprenda sobre fatores de risco e estratégias de prevenção",
      duration: "2h 30min",
      modules: 8,
      enrolled: 234,
      rating: 4.8,
      progress: 0,
      category: "Prevenção",
      level: "Básico",
      instructor: "Dr. Carlos Silva",
    },
    {
      id: 2,
      title: "Gestão de Estresse no Trabalho",
      description: "Técnicas para identificar e gerenciar o estresse ocupacional",
      duration: "1h 45min",
      modules: 6,
      enrolled: 189,
      rating: 4.9,
      progress: 65,
      category: "Bem-estar",
      level: "Intermediário",
      instructor: "Psic. Ana Costa",
    },
    {
      id: 3,
      title: "Nutrição e Alimentação Saudável",
      description: "Fundamentos de uma alimentação equilibrada e nutritiva",
      duration: "3h 15min",
      modules: 10,
      enrolled: 312,
      rating: 4.7,
      progress: 100,
      category: "Nutrição",
      level: "Básico",
      instructor: "Nut. Maria Santos",
    },
    {
      id: 4,
      title: "Primeiros Socorros no Ambiente Corporativo",
      description: "Procedimentos essenciais de primeiros socorros",
      duration: "4h 00min",
      modules: 12,
      enrolled: 156,
      rating: 4.9,
      progress: 25,
      category: "Segurança",
      level: "Avançado",
      instructor: "Enf. João Oliveira",
    },
  ]

  const learningPaths = [
    {
      name: "Gestor de Saúde Corporativa",
      description: "Trilha completa para gestores de saúde",
      courses: 12,
      duration: "40h",
      enrolled: 45,
      completion: 78,
    },
    {
      name: "Prevenção e Bem-estar",
      description: "Foco em prevenção de doenças e promoção da saúde",
      courses: 8,
      duration: "24h",
      enrolled: 123,
      completion: 65,
    },
    {
      name: "Análise de Dados em Saúde",
      description: "Interpretação de métricas e indicadores de saúde",
      courses: 6,
      duration: "18h",
      enrolled: 67,
      completion: 45,
    },
  ]

  const achievements = [
    {
      title: "Primeiro Curso Concluído",
      description: "Parabéns por completar seu primeiro curso!",
      icon: "🎓",
      earned: true,
      date: "15/03/2024",
    },
    {
      title: "Especialista em Prevenção",
      description: "Complete 5 cursos de prevenção",
      icon: "🛡️",
      earned: true,
      date: "22/03/2024",
    },
    {
      title: "Mentor da Comunidade",
      description: "Ajude 10 colegas com dúvidas",
      icon: "👥",
      earned: false,
      progress: 7,
    },
    {
      title: "Maratonista do Conhecimento",
      description: "Complete 20 horas de estudo em um mês",
      icon: "🏃",
      earned: false,
      progress: 15,
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      Prevenção: "bg-green-100 text-green-800",
      "Bem-estar": "bg-blue-100 text-blue-800",
      Nutrição: "bg-orange-100 text-orange-800",
      Segurança: "bg-red-100 text-red-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getLevelColor = (level: string) => {
    const colors = {
      Básico: "bg-green-100 text-green-800",
      Intermediário: "bg-yellow-100 text-yellow-800",
      Avançado: "bg-red-100 text-red-800",
    }
    return colors[level] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Educação em Saúde</h1>
          <p className="text-gray-600">Plataforma de aprendizado para profissionais de saúde corporativa</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            1,247 Usuários Ativos
          </Badge>
          <Button>
            <BookOpen className="h-4 w-4 mr-2" />
            Novo Curso
          </Button>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cursos Concluídos</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+15% este mês</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Horas de Estudo</p>
                <p className="text-2xl font-bold text-gray-900">127h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8h esta semana</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certificados</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-yellow-600">Média 4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ranking</p>
                <p className="text-2xl font-bold text-gray-900">#12</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">Top 5% da empresa</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="paths">Trilhas de Aprendizado</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="community">Comunidade</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <CardDescription className="mb-3">{course.description}</CardDescription>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(course.category)} variant="outline">
                          {course.category}
                        </Badge>
                        <Badge className={getLevelColor(course.level)} variant="outline">
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span>{course.modules} módulos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{course.enrolled} inscritos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {course.progress > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Progresso</span>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-600">Por {course.instructor}</span>
                      <div className="flex space-x-2">
                        {course.progress === 0 ? (
                          <Button size="sm">
                            <Play className="h-3 w-3 mr-1" />
                            Iniciar
                          </Button>
                        ) : course.progress === 100 ? (
                          <Button size="sm" variant="outline">
                            <Award className="h-3 w-3 mr-1" />
                            Certificado
                          </Button>
                        ) : (
                          <Button size="sm">
                            <Play className="h-3 w-3 mr-1" />
                            Continuar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paths">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{path.name}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Cursos:</span>
                        <div className="font-medium">{path.courses}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Duração:</span>
                        <div className="font-medium">{path.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Inscritos:</span>
                        <div className="font-medium">{path.enrolled}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Conclusão:</span>
                        <div className="font-medium">{path.completion}%</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Progresso da Trilha</span>
                        <span className="text-sm font-medium">{path.completion}%</span>
                      </div>
                      <Progress value={path.completion} className="h-2" />
                    </div>

                    <Button className="w-full">Ver Trilha</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-shadow ${achievement.earned ? "border-yellow-200 bg-yellow-50" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                      {achievement.earned ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">Conquistado em {achievement.date}</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Progresso</span>
                            <span className="text-sm font-medium">
                              {achievement.progress}/{achievement.title.includes("10") ? "10" : "20"}
                            </span>
                          </div>
                          <Progress
                            value={(achievement.progress / (achievement.title.includes("10") ? 10 : 20)) * 100}
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Discussões Recentes</CardTitle>
                <CardDescription>Participe das conversas da comunidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Dúvidas sobre prevenção cardiovascular",
                      author: "Dr. Silva",
                      replies: 12,
                      time: "2h atrás",
                      category: "Prevenção",
                    },
                    {
                      title: "Compartilhando experiências com gestão de estresse",
                      author: "Ana Costa",
                      replies: 8,
                      time: "4h atrás",
                      category: "Bem-estar",
                    },
                    {
                      title: "Novos protocolos de primeiros socorros",
                      author: "João Oliveira",
                      replies: 15,
                      time: "1 dia atrás",
                      category: "Segurança",
                    },
                  ].map((discussion, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{discussion.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Por {discussion.author}</span>
                            <span>{discussion.replies} respostas</span>
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(discussion.category)} variant="outline">
                          {discussion.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Contribuidores</CardTitle>
                <CardDescription>Membros mais ativos da comunidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Dr. Carlos Silva", points: 1250, badge: "🥇" },
                    { name: "Ana Costa", points: 980, badge: "🥈" },
                    { name: "João Oliveira", points: 875, badge: "🥉" },
                    { name: "Maria Santos", points: 720, badge: "⭐" },
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{contributor.badge}</span>
                        <div>
                          <p className="font-medium text-gray-900">{contributor.name}</p>
                          <p className="text-sm text-gray-600">{contributor.points} pontos</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
