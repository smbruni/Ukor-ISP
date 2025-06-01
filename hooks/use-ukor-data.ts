"use client"

import { useState, useEffect, useCallback } from "react"
import {
  ukorAPI,
  type UkorUser,
  type UkorISPData,
  type UkorCourse,
  type UkorQuestionnaire,
} from "@/lib/ukor-integration"

// Hook para dados do usuário
export function useUkorUser(userId: string) {
  const [user, setUser] = useState<UkorUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const userData = await ukorAPI.getUserProfile(userId)
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar usuário")
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  return { user, loading, error }
}

// Hook para dados ISP
export function useUkorISP(userId: string, period?: string) {
  const [ispData, setISPData] = useState<UkorISPData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshISP = useCallback(async () => {
    try {
      setLoading(true)
      const data = await ukorAPI.getISPData(userId, period)
      setISPData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados ISP")
    } finally {
      setLoading(false)
    }
  }, [userId, period])

  useEffect(() => {
    if (userId) {
      refreshISP()
    }
  }, [userId, refreshISP])

  const calculateNewISP = useCallback(
    async (assessmentData: any) => {
      try {
        const newISP = await ukorAPI.calculateISP(userId, assessmentData)
        setISPData((prev) => [newISP, ...prev])
        return newISP
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao calcular ISP")
        throw err
      }
    },
    [userId],
  )

  return { ispData, loading, error, refreshISP, calculateNewISP }
}

// Hook para cursos
export function useUkorCourses(category?: string) {
  const [courses, setCourses] = useState<UkorCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        const coursesData = await ukorAPI.getCourses(category)
        setCourses(coursesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar cursos")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [category])

  const enrollInCourse = useCallback(async (courseId: string, userId: string) => {
    try {
      await ukorAPI.enrollInCourse(courseId, userId)
      // Atualizar lista de cursos ou estado de inscrição
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao inscrever no curso")
      throw err
    }
  }, [])

  return { courses, loading, error, enrollInCourse }
}

// Hook para questionários
export function useUkorQuestionnaires() {
  const [questionnaires, setQuestionnaires] = useState<UkorQuestionnaire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuestionnaires() {
      try {
        setLoading(true)
        const data = await ukorAPI.getQuestionnaires()
        setQuestionnaires(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar questionários")
      } finally {
        setLoading(false)
      }
    }

    fetchQuestionnaires()
  }, [])

  const submitResponse = useCallback(async (questionnaireId: string, userId: string, responses: any) => {
    try {
      await ukorAPI.submitQuestionnaireResponse(questionnaireId, userId, responses)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar respostas")
      throw err
    }
  }, [])

  return { questionnaires, loading, error, submitResponse }
}

// Hook para analytics da empresa
export function useUkorCompanyAnalytics(companyId: string, period: string) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true)
        const data = await ukorAPI.getCompanyAnalytics(companyId, period)
        setAnalytics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar analytics")
      } finally {
        setLoading(false)
      }
    }

    if (companyId) {
      fetchAnalytics()
    }
  }, [companyId, period])

  return { analytics, loading, error }
}

// Hook para dados de wearables
export function useUkorWearables(userId: string, deviceType?: string, period?: string) {
  const [wearableData, setWearableData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWearableData() {
      try {
        setLoading(true)
        const data = await ukorAPI.getWearableData(userId, deviceType, period)
        setWearableData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar dados de wearables")
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchWearableData()
    }
  }, [userId, deviceType, period])

  const connectDevice = useCallback(
    async (deviceType: string, authData: any) => {
      try {
        await ukorAPI.connectWearable(userId, deviceType, authData)
        // Refresh data after connecting
        const data = await ukorAPI.getWearableData(userId, deviceType, period)
        setWearableData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao conectar dispositivo")
        throw err
      }
    },
    [userId, period],
  )

  return { wearableData, loading, error, connectDevice }
}
