"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/atoms/skeleton"
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LoadingState } from "@/lib/design-system"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    direction: "up" | "down" | "stable"
  }
  status?: "success" | "warning" | "error" | "neutral"
  icon?: React.ComponentType<{ className?: string }>
  loadingState?: LoadingState
  onClick?: () => void
  className?: string
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  status = "neutral",
  icon: Icon,
  loadingState = "idle",
  onClick,
  className,
}: MetricCardProps) {
  const statusColors = {
    success: "border-l-green-500 bg-green-50 dark:bg-green-950",
    warning: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950",
    error: "border-l-red-500 bg-red-50 dark:bg-red-950",
    neutral: "border-l-blue-500 bg-blue-50 dark:bg-blue-950",
  }

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }

  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    stable: "text-neutral-600 dark:text-neutral-400",
  }

  if (loadingState === "loading") {
    return (
      <Card className={cn("border-l-4", statusColors[status], className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton variant="circular" width={20} height={20} />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    )
  }

  if (loadingState === "error") {
    return (
      <Card className={cn("border-l-4 border-l-red-500", className)}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">Erro ao carregar dados</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const TrendIcon = trend ? trendIcons[trend.direction] : null

  return (
    <Card
      className={cn(
        "border-l-4 transition-all duration-200 hover:shadow-md",
        statusColors[status],
        onClick && "cursor-pointer hover:scale-[1.02]",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span>{title}</span>
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {trend && TrendIcon && (
            <div className={cn("flex items-center space-x-1", trendColors[trend.direction])}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{trend.value}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
