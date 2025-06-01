// Design System baseado nos 10 Princípios de Dieter Rams
export const designTokens = {
  // Cores com significado semântico (Princípio: Bom design é honesto)
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      900: "#1e3a8a",
    },
    success: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a",
    },
    warning: {
      50: "#fffbeb",
      500: "#f59e0b",
      600: "#d97706",
    },
    error: {
      50: "#fef2f2",
      500: "#ef4444",
      600: "#dc2626",
    },
    neutral: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      500: "#6b7280",
      700: "#374151",
      900: "#111827",
    },
  },

  // Tipografia com hierarquia clara (Princípio: Bom design enfatiza a utilidade)
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  // Espaçamento consistente (Princípio: Bom design é minimalista)
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  // Bordas e sombras (Princípio: Bom design é estético)
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
}

// Estados de loading e feedback (Princípio de Nielsen: Visibilidade do status)
export const loadingStates = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
} as const

export type LoadingState = (typeof loadingStates)[keyof typeof loadingStates]

// Breakpoints mobile-first (Luke Wroblewski)
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}
