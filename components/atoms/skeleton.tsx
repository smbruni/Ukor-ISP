"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
}

export function Skeleton({ className, variant = "rectangular", width, height }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-neutral-200 dark:bg-neutral-700"

  const variantClasses = {
    text: "rounded-md h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  }

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
      aria-label="Carregando conteúdo"
    />
  )
}
