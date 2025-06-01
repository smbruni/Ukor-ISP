import {
  Crown,
  BarChart3,
  Users,
  Settings,
  Database,
  Brain,
  Activity,
  Heart,
  Shield,
  Calculator,
  FileText,
  Stethoscope,
  GraduationCap,
  Bot,
  Zap,
} from "lucide-react"

interface SidebarItem {
  id: string
  label: string
  icon: any
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    id: "executivo",
    label: "Dashboard Executivo",
    icon: Crown,
    href: "/?tab=executivo",
  },
  {
    id: "gerencial",
    label: "Dashboard Gerencial",
    icon: BarChart3,
    href: "/?tab=gerencial",
  },
  {
    id: "usuarios",
    label: "Usuários",
    icon: Users,
    href: "/?tab=usuarios",
  },
  {
    id: "configuracoes",
    label: "Configurações",
    icon: Settings,
    href: "/?tab=configuracoes",
  },
  {
    id: "banco_de_dados",
    label: "Banco de Dados",
    icon: Database,
    href: "/?tab=banco_de_dados",
  },
  {
    id: "ia",
    label: "Inteligência Artificial",
    icon: Brain,
    href: "/?tab=ia",
  },
  {
    id: "atividades",
    label: "Atividades",
    icon: Activity,
    href: "/?tab=atividades",
  },
  {
    id: "saude",
    label: "Saúde",
    icon: Heart,
    href: "/?tab=saude",
  },
  {
    id: "seguranca",
    label: "Segurança",
    icon: Shield,
    href: "/?tab=seguranca",
  },
  {
    id: "calculadora",
    label: "Calculadora",
    icon: Calculator,
    href: "/?tab=calculadora",
  },
  {
    id: "documentos",
    label: "Documentos",
    icon: FileText,
    href: "/?tab=documentos",
  },
  {
    id: "medicina",
    label: "Medicina",
    icon: Stethoscope,
    href: "/?tab=medicina",
  },
  {
    id: "educacao",
    label: "Educação",
    icon: GraduationCap,
    href: "/?tab=educacao",
  },
  {
    id: "bots",
    label: "Bots",
    icon: Bot,
    href: "/?tab=bots",
  },
  {
    id: "acoes",
    label: "Ações",
    icon: Zap,
    href: "/?tab=acoes",
  },
]

export default sidebarItems
