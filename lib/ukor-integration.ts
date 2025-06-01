"use client"

// Configuração da API da Ukor
export const UKOR_API_CONFIG = {
  baseURL: "https://app.ukor.com.br/api",
  version: "v1",
  endpoints: {
    auth: "/auth",
    users: "/users",
    companies: "/companies",
    assessments: "/assessments",
    courses: "/courses",
    lessons: "/lessons",
    analytics: "/analytics",
    isp: "/isp",
    questionnaires: "/questionnaires",
    wearables: "/wearables",
  },
}

// Tipos para integração com Ukor
export interface UkorUser {
  id: string
  email: string
  name: string
  company_id: string
  department: string
  role: "admin" | "manager" | "employee"
  created_at: string
  updated_at: string
  profile: {
    birth_date?: string
    gender?: string
    position?: string
    hire_date?: string
  }
}

export interface UkorCompany {
  id: string
  name: string
  cnpj: string
  industry: string
  size: "small" | "medium" | "large"
  employees_count: number
  subscription_plan: string
  settings: {
    isp_enabled: boolean
    wearables_enabled: boolean
    ai_agents_enabled: boolean
    education_enabled: boolean
  }
}

export interface UkorISPData {
  user_id: string
  company_id: string
  assessment_date: string
  scores: {
    sleep_quality: number
    physical_health: number
    mental_health: number
    nutrition: number
    stress_management: number
    productivity: number
  }
  weighted_score: number
  risk_level: "low" | "medium" | "high"
  recommendations: string[]
  next_assessment_date: string
}

export interface UkorQuestionnaire {
  id: string
  name: string
  type: "phq9" | "psqi" | "pss10" | "sf36" | "nutrition" | "productivity"
  questions: UkorQuestion[]
  scoring_algorithm: string
  frequency: "weekly" | "monthly" | "quarterly"
  weight_in_isp: number
  active: boolean
}

export interface UkorQuestion {
  id: string
  text: string
  type: "scale" | "boolean" | "text" | "number" | "time"
  options?: { value: number; label: string }[]
  required: boolean
  order: number
}

export interface UkorCourse {
  id: string
  title: string
  description: string
  category: string
  instructor: string
  duration_minutes: number
  lessons_count: number
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  thumbnail_url: string
  enrollment_count: number
  rating: number
  active: boolean
  lessons: UkorLesson[]
}

export interface UkorLesson {
  id: string
  course_id: string
  title: string
  description: string
  content_type: "video" | "text" | "interactive" | "quiz"
  content_url: string
  duration_minutes: number
  order: number
  completed_by_user?: boolean
}

// Cliente da API Ukor
export class UkorAPIClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = `${UKOR_API_CONFIG.baseURL}/${UKOR_API_CONFIG.version}`
  }

  // Autenticação
  async authenticate(email: string, password: string): Promise<{ token: string; user: UkorUser }> {
    const response = await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.auth}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) throw new Error("Authentication failed")

    const data = await response.json()
    this.token = data.token
    return data
  }

  // Headers com autenticação
  private getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    }
  }

  // Usuários
  async getUsers(companyId: string): Promise<UkorUser[]> {
    const response = await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.users}?company_id=${companyId}`, {
      headers: this.getHeaders(),
    })
    return response.json()
  }

  async getUserProfile(userId: string): Promise<UkorUser> {
    const response = await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.users}/${userId}`, {
      headers: this.getHeaders(),
    })
    return response.json()
  }

  // ISP - Índice de Saúde e Performance
  async getISPData(userId: string, period?: string): Promise<UkorISPData[]> {
    const url = `${this.baseURL}${UKOR_API_CONFIG.endpoints.isp}/${userId}${period ? `?period=${period}` : ""}`
    const response = await fetch(url, { headers: this.getHeaders() })
    return response.json()
  }

  async calculateISP(userId: string, assessmentData: any): Promise<UkorISPData> {
    const response = await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.isp}/calculate`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ user_id: userId, ...assessmentData }),
    })
    return response.json()
  }

  async getCompanyISP(companyId: string): Promise<{ average: number; by_department: any[] }> {
    const response = await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.isp}/company/${companyId}`, {
      headers: this.getHeaders(),
    })
    return response.json()
  }

  // Questionários
  async getQuestionnaires(): Promise<UkorQuestionnaire[]> {
    const response = await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.questionnaires}`, {
      headers: this.getHeaders(),
    })
    return response.json()
  }

  async submitQuestionnaireResponse(questionnaireId: string, userId: string, responses: any): Promise<void> {
    await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.questionnaires}/${questionnaireId}/responses`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ user_id: userId, responses }),
    })
  }

  async getQuestionnaireResponses(userId: string, questionnaireId?: string): Promise<any[]> {
    const url = `${this.baseURL}${UKOR_API_CONFIG.endpoints.questionnaires}/responses/${userId}${questionnaireId ? `?questionnaire_id=${questionnaireId}` : ""}`
    const response = await fetch(url, { headers: this.getHeaders() })
    return response.json()
  }

  // Cursos e Educação
  async getCourses(category?: string): Promise<UkorCourse[]> {
    const url = `${this.baseURL}${UKOR_API_CONFIG.endpoints.courses}${category ? `?category=${category}` : ""}`
    const response = await fetch(url, { headers: this.getHeaders() })
    return response.json()
  }

  async getCourse(courseId: string): Promise<UkorCourse> {
    const response = await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.courses}/${courseId}`, {
      headers: this.getHeaders(),
    })
    return response.json()
  }

  async enrollInCourse(courseId: string, userId: string): Promise<void> {
    await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.courses}/${courseId}/enroll`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ user_id: userId }),
    })
  }

  async markLessonComplete(lessonId: string, userId: string): Promise<void> {
    await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.lessons}/${lessonId}/complete`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ user_id: userId }),
    })
  }

  async getUserProgress(userId: string, courseId?: string): Promise<any> {
    const url = `${this.baseURL}${UKOR_API_CONFIG.endpoints.courses}/progress/${userId}${courseId ? `?course_id=${courseId}` : ""}`
    const response = await fetch(url, { headers: this.getHeaders() })
    return response.json()
  }

  // Wearables
  async connectWearable(userId: string, deviceType: string, authData: any): Promise<void> {
    await fetch(`${this.baseURL}${UKOR_API_CONFIG.endpoints.wearables}/connect`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ user_id: userId, device_type: deviceType, auth_data: authData }),
    })
  }

  async getWearableData(userId: string, deviceType?: string, period?: string): Promise<any> {
    const url = `${this.baseURL}${UKOR_API_CONFIG.endpoints.wearables}/${userId}${deviceType ? `?device=${deviceType}` : ""}${period ? `&period=${period}` : ""}`
    const response = await fetch(url, { headers: this.getHeaders() })
    return response.json()
  }

  // Analytics
  async getCompanyAnalytics(companyId: string, period: string): Promise<any> {
    const response = await fetch(
      `${this.baseURL}${UKOR_API_CONFIG.endpoints.analytics}/company/${companyId}?period=${period}`,
      {
        headers: this.getHeaders(),
      },
    )
    return response.json()
  }

  async getPredictiveAnalytics(companyId: string, type: string): Promise<any> {
    const response = await fetch(
      `${this.baseURL}${UKOR_API_CONFIG.endpoints.analytics}/predictive/${companyId}?type=${type}`,
      {
        headers: this.getHeaders(),
      },
    )
    return response.json()
  }
}

// Singleton da API
export const ukorAPI = new UkorAPIClient()
