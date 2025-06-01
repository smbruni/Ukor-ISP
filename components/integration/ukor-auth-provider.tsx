"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ukorAPI, type UkorUser, type UkorCompany } from "@/lib/ukor-integration"

interface UkorAuthContextType {
  user: UkorUser | null
  company: UkorCompany | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
}

const UkorAuthContext = createContext<UkorAuthContextType | undefined>(undefined)

export function UkorAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UkorUser | null>(null)
  const [company, setCompany] = useState<UkorCompany | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const savedToken = localStorage.getItem("ukor_token")
    const savedUser = localStorage.getItem("ukor_user")

    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        // Aqui você carregaria os dados da empresa também
      } catch (err) {
        localStorage.removeItem("ukor_token")
        localStorage.removeItem("ukor_user")
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const { token, user: userData } = await ukorAPI.authenticate(email, password)

      // Salvar no localStorage
      localStorage.setItem("ukor_token", token)
      localStorage.setItem("ukor_user", JSON.stringify(userData))

      setUser(userData)

      // Carregar dados da empresa
      // const companyData = await ukorAPI.getCompany(userData.company_id)
      // setCompany(companyData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("ukor_token")
    localStorage.removeItem("ukor_user")
    setUser(null)
    setCompany(null)
  }

  const value = {
    user,
    company,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error,
  }

  return <UkorAuthContext.Provider value={value}>{children}</UkorAuthContext.Provider>
}

export function useUkorAuth() {
  const context = useContext(UkorAuthContext)
  if (context === undefined) {
    throw new Error("useUkorAuth must be used within a UkorAuthProvider")
  }
  return context
}
