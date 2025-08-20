"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Heart,
  Stethoscope,
  Car,
  Utensils,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Download,
  ExternalLink,
  Info,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts"

export function MeusBeneficios({ colaborador }) {
  const [activeTab, setActiveTab] = useState("health-plan")

  // Plano de Saúde
  const healthPlan = {
    provider: "Unimed",
    plan: "Unimed Nacional Executivo",
    cardNumber: "123456789012345",
    validity: "2024-12-31",
    dependents: [
      { name: "João Silva", relationship: "Cônjuge", age: 35 },
      { name: "Maria Silva", relationship: "Filha", age: 8 },
    ],
    coverage: {
      consultations: "Ilimitadas",
      hospitalizations: "Ilimitadas",
      exams: "Ilimitados",
      emergencies: "24h",
      maternity: "Incluída",
      dental: "Básico incluído",
    },
    network: {
      hospitals: 1247,
      clinics: 3456,
      laboratories: 892,
      pharmacies: 2134,
    },
    monthlyContribution: 450.0,
    companyContribution: 1350.0,
    totalCost: 1800.0,
  }

  // Utilização do Plano
  const planUsage = [
    { month: "Jan", consultas: 2, exames: 1, emergencia: 0, custo: 320 },
    { month: "Fev", consultas: 1, exames: 3, emergencia: 0, custo: 480 },
    { month: "Mar", consultas: 3, exames: 2, emergencia: 1, custo: 750 },
    { month: "Abr", consultas: 1, exames: 1, emergencia: 0, custo: 280 },
  ]

  // Plano Odontológico
  const dentalPlan = {
    provider: "Odontoprev",
    plan: "Plano Executivo",
    cardNumber: "987654321098765",
    validity: "2024-12-31",
    coverage: {
      preventive: "Ilimitado",
      restorative: "Até R$ 2.000/ano",
      orthodontics: "50% até R$ 3.000",
      prosthetics: "40% até R$ 1.500",
    },
    usedThisYear: {
      preventive: 280,
      restorative: 450,
      orthodontics: 0,
      prosthetics: 0,
    },
    monthlyContribution: 45.0,
    companyContribution: 135.0,
  }

  // Vale Refeição/Alimentação
  const mealBenefits = {
    mealVoucher: {
      provider: "Alelo",
      cardNumber: "**** **** **** 1234",
      monthlyValue: 600.0,
      currentBalance: 234.5,
      lastRecharge: "2024-04-01",
      usage: [
        { date: "2024-04-20", establishment: "Restaurante do João", value: 25.5 },
        { date: "2024-04-19", establishment: "Padaria Central", value: 12.8 },
        { date: "2024-04-18", establishment: "Lanchonete Express", value: 18.9 },
      ],
    },
    foodVoucher: {
      provider: "Alelo",
      cardNumber: "**** **** **** 5678",
      monthlyValue: 400.0,
      currentBalance: 156.3,
      lastRecharge: "2024-04-01",
      usage: [
        { date: "2024-04-20", establishment: "Supermercado Extra", value: 89.7 },
        { date: "2024-04-17", establishment: "Padaria do Bairro", value: 23.4 },
        { date: "2024-04-15", establishment: "Açougue Premium", value: 45.6 },
      ],
    },
  }

  // Vale Transporte
  const transportBenefit = {
    provider: "VT Corporativo",
    monthlyValue: 180.0,
    currentBalance: 45.2,
    route: "Casa → Trabalho → Casa",
    estimatedDailyUsage: 8.5,
    lastRecharge: "2024-04-01",
    usage: [
      { date: "2024-04-20", type: "Metrô", value: 4.4 },
      { date: "2024-04-20", type: "Ônibus", value: 4.1 },
      { date: "2024-04-19", type: "Metrô", value: 4.4 },
      { date: "2024-04-19", type: "Ônibus", value: 4.1 },
    ],
  }

  // Seguro de Vida
  const lifeInsurance = {
    provider: "MetLife",
    coverage: 500000.0,
    beneficiaries: [
      { name: "João Silva", relationship: "Cônjuge", percentage: 60 },
      { name: "Maria Silva", relationship: "Filha", percentage: 40 },
    ],
    monthlyPremium: 25.0,
    companyContribution: 75.0,
    features: ["Morte natural ou acidental", "Invalidez permanente total", "Auxílio funeral", "Assistência 24h"],
  }

  // Auxílio Creche/Educação
  const educationBenefit = {
    childcareAllowance: {
      eligibleChildren: 1,
      monthlyValue: 300.0,
      ageLimit: "até 6 anos",
      currentBeneficiary: "Maria Silva (8 anos) - Não elegível",
    },
    educationAllowance: {
      level: "Ensino Superior",
      monthlyValue: 500.0,
      coverage: "80% da mensalidade",
      maxValue: 1200.0,
      currentUsage: 0,
    },
  }

  // Dados para gráficos
  const benefitsCostData = [
    { name: "Plano de Saúde", value: 1800, color: "#3b82f6" },
    { name: "Plano Odontológico", value: 180, color: "#10b981" },
    { name: "Vale Refeição", value: 600, color: "#f59e0b" },
    { name: "Vale Alimentação", value: 400, color: "#ef4444" },
    { name: "Vale Transporte", value: 180, color: "#8b5cf6" },
    { name: "Seguro de Vida", value: 100, color: "#06b6d4" },
  ]

  const usageData = [
    { month: "Jan", saude: 320, odonto: 80, alimentacao: 580 },
    { month: "Fev", saude: 480, odonto: 120, alimentacao: 620 },
    { month: "Mar", saude: 750, odonto: 0, alimentacao: 590 },
    { month: "Abr", saude: 280, odonto: 45, alimentacao: 610 },
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getUsagePercentage = (used, total) => {
    return Math.round((used / total) * 100)
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Meus Benefícios</h2>
        <p className="text-gray-600 mt-1">Acompanhe seus benefícios corporativos e utilização</p>
      </div>

      {/* Resumo dos Benefícios */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(benefitsCostData.reduce((acc, item) => acc + item.value, 0))}
                </div>
                <div className="text-sm text-gray-600">Valor Total/Mês</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-sm text-gray-600">Benefícios Ativos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 text-xs">
          <TabsTrigger value="health-plan">Saúde</TabsTrigger>
          <TabsTrigger value="meal-transport">Alimentação</TabsTrigger>
          <TabsTrigger value="insurance">Seguros</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="health-plan" className="space-y-6">
          {/* Plano de Saúde */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Plano de Saúde
              </CardTitle>
              <CardDescription>
                {healthPlan.provider} - {healthPlan.plan}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-600">Carteirinha:</span>
                  <div className="font-mono text-sm">{healthPlan.cardNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Validade:</span>
                  <div className="font-medium">{new Date(healthPlan.validity).toLocaleDateString("pt-BR")}</div>
                </div>
              </div>

              {/* Dependentes */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Dependentes:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Ana Paula Silva (Titular)</div>
                      <div className="text-sm text-gray-600">Colaboradora</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Ativo</Badge>
                  </div>
                  {healthPlan.dependents.map((dependent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{dependent.name}</div>
                        <div className="text-sm text-gray-600">
                          {dependent.relationship} - {dependent.age} anos
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cobertura */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Cobertura:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(healthPlan.coverage).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rede Credenciada */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Rede Credenciada:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{healthPlan.network.hospitals}</div>
                    <div className="text-xs text-gray-600">Hospitais</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{healthPlan.network.clinics}</div>
                    <div className="text-xs text-gray-600">Clínicas</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{healthPlan.network.laboratories}</div>
                    <div className="text-xs text-gray-600">Laboratórios</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{healthPlan.network.pharmacies}</div>
                    <div className="text-xs text-gray-600">Farmácias</div>
                  </div>
                </div>
              </div>

              {/* Custos */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Custos Mensais:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Sua contribuição:</span>
                    <span className="font-medium text-blue-800">{formatCurrency(healthPlan.monthlyContribution)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Contribuição da empresa:</span>
                    <span className="font-medium text-blue-800">{formatCurrency(healthPlan.companyContribution)}</span>
                  </div>
                  <div className="border-t border-blue-300 pt-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-800">Custo total:</span>
                      <span className="font-bold text-blue-800">{formatCurrency(healthPlan.totalCost)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Portal do Beneficiário
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Carteirinha Digital
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plano Odontológico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                Plano Odontológico
              </CardTitle>
              <CardDescription>
                {dentalPlan.provider} - {dentalPlan.plan}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-600">Carteirinha:</span>
                  <div className="font-mono text-sm">{dentalPlan.cardNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Validade:</span>
                  <div className="font-medium">{new Date(dentalPlan.validity).toLocaleDateString("pt-BR")}</div>
                </div>
              </div>

              {/* Utilização Anual */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Utilização 2024:</h4>
                <div className="space-y-3">
                  {Object.entries(dentalPlan.coverage).map(([key, limit]) => {
                    const used = dentalPlan.usedThisYear[key] || 0
                    const limitValue = Number.parseFloat(limit.replace(/[^\d,]/g, "").replace(",", ".")) || 0
                    const percentage = limitValue > 0 ? (used / limitValue) * 100 : 0

                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span>{limit}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={percentage} className="flex-1 h-2" />
                          <span className="text-xs text-gray-500 w-16">
                            {limitValue > 0 ? `${formatCurrency(used)}` : "Usado"}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Custos */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                <h4 className="font-medium text-green-800 mb-3">Custos Mensais:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Sua contribuição:</span>
                    <span className="font-medium text-green-800">{formatCurrency(dentalPlan.monthlyContribution)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">Contribuição da empresa:</span>
                    <span className="font-medium text-green-800">{formatCurrency(dentalPlan.companyContribution)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <ExternalLink className="h-4 w-4 mr-1" />
                Portal Odontoprev
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meal-transport" className="space-y-6">
          {/* Vale Refeição */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-orange-600" />
                Vale Refeição
              </CardTitle>
              <CardDescription>Alelo - Cartão Refeição</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-600">Cartão:</span>
                  <div className="font-mono text-sm">{mealBenefits.mealVoucher.cardNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Última recarga:</span>
                  <div className="font-medium">
                    {new Date(mealBenefits.mealVoucher.lastRecharge).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>

              {/* Saldo e Utilização */}
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-orange-800">Saldo Atual:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {formatCurrency(mealBenefits.mealVoucher.currentBalance)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-orange-700">
                  <span>Valor mensal:</span>
                  <span>{formatCurrency(mealBenefits.mealVoucher.monthlyValue)}</span>
                </div>
                <Progress
                  value={getUsagePercentage(
                    mealBenefits.mealVoucher.monthlyValue - mealBenefits.mealVoucher.currentBalance,
                    mealBenefits.mealVoucher.monthlyValue,
                  )}
                  className="mt-2 h-2"
                />
                <div className="text-xs text-orange-600 mt-1">
                  {getUsagePercentage(
                    mealBenefits.mealVoucher.monthlyValue - mealBenefits.mealVoucher.currentBalance,
                    mealBenefits.mealVoucher.monthlyValue,
                  )}
                  % utilizado este mês
                </div>
              </div>

              {/* Últimas Transações */}
              <div className="mb-4">
                <h4 className="font-medium mb-3">Últimas Transações:</h4>
                <div className="space-y-2">
                  {mealBenefits.mealVoucher.usage.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{transaction.establishment}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-red-600">-{formatCurrency(transaction.value)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                <ExternalLink className="h-4 w-4 mr-1" />
                Ver Extrato Completo
              </Button>
            </CardContent>
          </Card>

          {/* Vale Alimentação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-green-600" />
                Vale Alimentação
              </CardTitle>
              <CardDescription>Alelo - Cartão Alimentação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-600">Cartão:</span>
                  <div className="font-mono text-sm">{mealBenefits.foodVoucher.cardNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Última recarga:</span>
                  <div className="font-medium">
                    {new Date(mealBenefits.foodVoucher.lastRecharge).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>

              {/* Saldo e Utilização */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-green-800">Saldo Atual:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(mealBenefits.foodVoucher.currentBalance)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-green-700">
                  <span>Valor mensal:</span>
                  <span>{formatCurrency(mealBenefits.foodVoucher.monthlyValue)}</span>
                </div>
                <Progress
                  value={getUsagePercentage(
                    mealBenefits.foodVoucher.monthlyValue - mealBenefits.foodVoucher.currentBalance,
                    mealBenefits.foodVoucher.monthlyValue,
                  )}
                  className="mt-2 h-2"
                />
                <div className="text-xs text-green-600 mt-1">
                  {getUsagePercentage(
                    mealBenefits.foodVoucher.monthlyValue - mealBenefits.foodVoucher.currentBalance,
                    mealBenefits.foodVoucher.monthlyValue,
                  )}
                  % utilizado este mês
                </div>
              </div>

              {/* Últimas Transações */}
              <div className="mb-4">
                <h4 className="font-medium mb-3">Últimas Transações:</h4>
                <div className="space-y-2">
                  {mealBenefits.foodVoucher.usage.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{transaction.establishment}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-red-600">-{formatCurrency(transaction.value)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                <ExternalLink className="h-4 w-4 mr-1" />
                Ver Extrato Completo
              </Button>
            </CardContent>
          </Card>

          {/* Vale Transporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-5 w-5 mr-2 text-purple-600" />
                Vale Transporte
              </CardTitle>
              <CardDescription>VT Corporativo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-600">Valor mensal:</span>
                  <div className="font-medium">{formatCurrency(transportBenefit.monthlyValue)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Saldo atual:</span>
                  <div className="font-medium">{formatCurrency(transportBenefit.currentBalance)}</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-6">
                <h4 className="font-medium text-purple-800 mb-2">Rota Cadastrada:</h4>
                <p className="text-sm text-purple-700">{transportBenefit.route}</p>
                <div className="flex justify-between text-sm text-purple-700 mt-2">
                  <span>Uso diário estimado:</span>
                  <span>{formatCurrency(transportBenefit.estimatedDailyUsage)}</span>
                </div>
              </div>

              {/* Últimas Transações */}
              <div className="mb-4">
                <h4 className="font-medium mb-3">Últimas Transações:</h4>
                <div className="space-y-2">
                  {transportBenefit.usage.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{transaction.type}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-red-600">-{formatCurrency(transaction.value)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                <ExternalLink className="h-4 w-4 mr-1" />
                Gerenciar VT
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-6">
          {/* Seguro de Vida */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Seguro de Vida
              </CardTitle>
              <CardDescription>{lifeInsurance.provider}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{formatCurrency(lifeInsurance.coverage)}</div>
                  <div className="text-sm text-blue-700">Cobertura Total</div>
                </div>
              </div>

              {/* Beneficiários */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Beneficiários:</h4>
                <div className="space-y-2">
                  {lifeInsurance.beneficiaries.map((beneficiary, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{beneficiary.name}</div>
                        <div className="text-sm text-gray-600">{beneficiary.relationship}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{beneficiary.percentage}%</div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(lifeInsurance.coverage * (beneficiary.percentage / 100))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coberturas */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Coberturas Incluídas:</h4>
                <div className="space-y-2">
                  {lifeInsurance.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custos */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                <h4 className="font-medium text-gray-800 mb-3">Custos Mensais:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Sua contribuição:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(lifeInsurance.monthlyPremium)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Contribuição da empresa:</span>
                    <span className="font-medium text-gray-800">
                      {formatCurrency(lifeInsurance.companyContribution)}
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <ExternalLink className="h-4 w-4 mr-1" />
                Portal MetLife
              </Button>
            </CardContent>
          </Card>

          {/* Auxílio Educação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
                Auxílio Educação
              </CardTitle>
              <CardDescription>Benefícios educacionais</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Auxílio Creche */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Auxílio Creche:</h4>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Não Elegível</span>
                  </div>
                  <p className="text-sm text-yellow-700">{educationBenefit.childcareAllowance.currentBeneficiary}</p>
                  <div className="mt-2 text-xs text-yellow-600">
                    Valor: {formatCurrency(educationBenefit.childcareAllowance.monthlyValue)} -{" "}
                    {educationBenefit.childcareAllowance.ageLimit}
                  </div>
                </div>
              </div>

              {/* Auxílio Educação Superior */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Auxílio Educação Superior:</h4>
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-indigo-700">Nível:</span>
                      <div className="font-medium text-indigo-800">{educationBenefit.educationAllowance.level}</div>
                    </div>
                    <div>
                      <span className="text-sm text-indigo-700">Cobertura:</span>
                      <div className="font-medium text-indigo-800">{educationBenefit.educationAllowance.coverage}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-indigo-700">Valor máximo:</span>
                      <div className="font-medium text-indigo-800">
                        {formatCurrency(educationBenefit.educationAllowance.maxValue)}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-indigo-700">Uso atual:</span>
                      <div className="font-medium text-indigo-800">
                        {educationBenefit.educationAllowance.currentUsage === 0
                          ? "Não utilizado"
                          : formatCurrency(educationBenefit.educationAllowance.currentUsage)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Info className="h-4 w-4 mr-1" />
                Solicitar Auxílio Educação
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Distribuição de Custos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Distribuição de Custos dos Benefícios
              </CardTitle>
              <CardDescription>Valor mensal por categoria</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={benefitsCostData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {benefitsCostData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Evolução de Uso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-green-600" />
                Evolução de Uso dos Benefícios
              </CardTitle>
              <CardDescription>Utilização mensal por categoria</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="saude" fill="#3b82f6" name="Saúde" />
                  <Bar dataKey="odonto" fill="#10b981" name="Odontológico" />
                  <Bar dataKey="alimentacao" fill="#f59e0b" name="Alimentação" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Resumo Financeiro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-purple-600" />
                Resumo Financeiro Anual
              </CardTitle>
              <CardDescription>Economia e investimento da empresa em seus benefícios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(
                        (healthPlan.companyContribution +
                          dentalPlan.companyContribution +
                          lifeInsurance.companyContribution) *
                          12,
                      )}
                    </div>
                    <div className="text-sm text-green-700">Investimento da Empresa/Ano</div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(
                        (healthPlan.monthlyContribution +
                          dentalPlan.monthlyContribution +
                          lifeInsurance.monthlyPremium) *
                          12,
                      )}
                    </div>
                    <div className="text-sm text-blue-700">Sua Contribuição/Ano</div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(
                        (mealBenefits.mealVoucher.monthlyValue +
                          mealBenefits.foodVoucher.monthlyValue +
                          transportBenefit.monthlyValue) *
                          12,
                      )}
                    </div>
                    <div className="text-sm text-purple-700">Benefícios Diretos/Ano</div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(benefitsCostData.reduce((acc, item) => acc + item.value, 0) * 12)}
                    </div>
                    <div className="text-sm text-orange-700">Valor Total/Ano</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Dica de Economia:</h4>
                <p className="text-sm text-blue-700">
                  Você está economizando aproximadamente <strong>{formatCurrency(18500)}</strong> por ano com os
                  benefícios oferecidos pela empresa. Isso representa uma economia de
                  <strong> 75%</strong> comparado aos custos no mercado privado.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
