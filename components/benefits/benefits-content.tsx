"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Car, Utensils, DollarSign } from "lucide-react"

export function BenefitsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Benefícios</h1>
          <p className="text-gray-600">
            Análise completa dos benefícios oferecidos e sua correlação com saúde e performance
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          987 Beneficiários Ativos
        </Badge>
      </div>

      {/* Visão Geral dos Benefícios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plano de Saúde</CardTitle>
            <Heart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.8M</div>
            <p className="text-xs text-blue-500">Custo anual total</p>
            <Progress value={110} className="mt-2" />
            <p className="text-xs text-red-500 mt-1">Sinistralidade: 110%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vale Refeição</CardTitle>
            <Utensils className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 420K</div>
            <p className="text-xs text-green-500">R$ 35/dia por colaborador</p>
            <Progress value={95} className="mt-2" />
            <p className="text-xs text-green-500 mt-1">95% de utilização</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vale Transporte</CardTitle>
            <Car className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 180K</div>
            <p className="text-xs text-purple-500">Custo anual</p>
            <Progress value={78} className="mt-2" />
            <p className="text-xs text-purple-500 mt-1">78% dos colaboradores</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Benefícios Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.4M</div>
            <p className="text-xs text-orange-500">Investimento total anual</p>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-orange-500 mt-1">ROI: 2.3:1</p>
          </CardContent>
        </Card>
      </div>

      {/* Análise Detalhada por Tabs */}
      <Tabs defaultValue="saude" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="saude">Plano de Saúde</TabsTrigger>
          <TabsTrigger value="tradicionais">Benefícios Tradicionais</TabsTrigger>
          <TabsTrigger value="correlacao">Correlação Performance</TabsTrigger>
          <TabsTrigger value="otimizacao">Otimização</TabsTrigger>
        </TabsList>

        <TabsContent value="saude">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Custos por Departamento</CardTitle>
                <CardDescription>Distribuição dos custos de saúde por área</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tecnologia (120 colaboradores)</span>
                    <span className="font-semibold">R$ 890K</span>
                  </div>
                  <Progress value={32} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Operações (200 colaboradores)</span>
                    <span className="font-semibold">R$ 680K</span>
                  </div>
                  <Progress value={24} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vendas (150 colaboradores)</span>
                    <span className="font-semibold">R$ 520K</span>
                  </div>
                  <Progress value={19} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Administrativo (100 colaboradores)</span>
                    <span className="font-semibold">R$ 380K</span>
                  </div>
                  <Progress value={14} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">RH/Financeiro (80 colaboradores)</span>
                    <span className="font-semibold">R$ 330K</span>
                  </div>
                  <Progress value={11} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 10 Usuários por Custo</CardTitle>
                <CardDescription>Colaboradores com maior utilização</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { nome: "Colaborador A", dept: "Tecnologia", custo: "R$ 145K", status: "Oncológico" },
                    { nome: "Colaborador B", dept: "Operações", custo: "R$ 132K", status: "Crônico" },
                    { nome: "Colaborador C", dept: "Vendas", custo: "R$ 128K", status: "Oncológico" },
                    { nome: "Colaborador D", dept: "Tecnologia", custo: "R$ 115K", status: "Crônico" },
                    { nome: "Colaborador E", dept: "Administrativo", custo: "R$ 98K", status: "Oncológico" },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{user.nome}</p>
                        <p className="text-sm text-gray-600">{user.dept}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{user.custo}</p>
                        <Badge variant={user.status === "Oncológico" ? "destructive" : "secondary"} className="text-xs">
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tradicionais">
          <Card>
            <CardHeader>
              <CardTitle>Benefícios Tradicionais (VA, VR, VT)</CardTitle>
              <CardDescription>Análise consolidada dos benefícios básicos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Vale Alimentação</h4>
                  <p className="text-2xl font-bold text-green-600">R$ 420K</p>
                  <p className="text-sm text-gray-600">95% utilização</p>
                  <Progress value={95} className="mt-2" />
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Vale Refeição</h4>
                  <p className="text-2xl font-bold text-blue-600">R$ 280K</p>
                  <p className="text-sm text-gray-600">87% utilização</p>
                  <Progress value={87} className="mt-2" />
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Vale Transporte</h4>
                  <p className="text-2xl font-bold text-purple-600">R$ 180K</p>
                  <p className="text-sm text-gray-600">78% utilização</p>
                  <Progress value={78} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlacao">
          <Card>
            <CardHeader>
              <CardTitle>Correlação com Performance</CardTitle>
              <CardDescription>Impacto dos benefícios na produtividade e saúde</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Impacto Positivo</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Plano de saúde reduz absenteísmo em 23%</li>
                    <li>• Vale refeição melhora satisfação em 18%</li>
                    <li>• Benefícios completos reduzem turnover em 31%</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">ROI Financeiro</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Cada R$ 1 investido retorna R$ 2.3</li>
                    <li>• Economia de R$ 1.2M em custos evitados</li>
                    <li>• Redução de 15% em custos de recrutamento</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="otimizacao">
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades de Otimização</CardTitle>
              <CardDescription>Sugestões para melhorar eficiência dos benefícios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800">Renegociação Plano de Saúde</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Sinistralidade de 110% indica necessidade de renegociação ou mudança de operadora
                  </p>
                  <p className="text-xs text-yellow-600 mt-2">Economia potencial: R$ 420K/ano</p>
                </div>
                <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Flexibilização de Benefícios</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Implementar sistema de benefícios flexíveis para melhor adequação às necessidades
                  </p>
                  <p className="text-xs text-blue-600 mt-2">Melhoria esperada: +15% satisfação</p>
                </div>
                <div className="p-4 border-l-4 border-l-green-500 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Programas de Wellness</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Adicionar benefícios de bem-estar pode reduzir custos médicos em 25%
                  </p>
                  <p className="text-xs text-green-600 mt-2">ROI esperado: 3.5:1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
