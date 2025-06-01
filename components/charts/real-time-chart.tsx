"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

export function RealTimeChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    // Simular dados em tempo real
    const interval = setInterval(() => {
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100),
        timestamp: Date.now(),
      }

      setData((prev) => [...prev.slice(-20), newPoint]) // Manter apenas os últimos 20 pontos
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="ukor-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-ukor-primary to-ukor-accent">
            <Activity className="h-4 w-4 text-white" />
          </div>
          Métricas em Tempo Real
        </CardTitle>
        <CardDescription>Monitoramento contínuo dos indicadores de saúde</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gradient-to-br from-ukor-light to-white rounded-xl border border-ukor-primary/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ukor-primary/5 to-ukor-accent/5"></div>

          {/* Simulação de gráfico de linha */}
          <div className="w-full h-full p-4 relative">
            <div className="flex items-end justify-between h-full space-x-1">
              {data.slice(-15).map((point, index) => (
                <div
                  key={point.timestamp}
                  className="bg-gradient-to-t from-ukor-primary to-ukor-accent rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  style={{
                    height: `${point.value}%`,
                    width: "6%",
                    minHeight: "4px",
                  }}
                />
              ))}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-gray-500">
              <span>-30min</span>
              <span>-15min</span>
              <span>Agora</span>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <Badge className="ukor-badge animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              Ao vivo
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold text-ukor-primary">87%</div>
            <div className="text-xs text-gray-500">Disponibilidade</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">+12%</div>
            <div className="text-xs text-gray-500">Tendência</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">2.3s</div>
            <div className="text-xs text-gray-500">Latência</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
