"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { DataContent } from "@/components/data/data-content"
import { RoiContent } from "@/components/roi/roi-content"
import { BenefitsContent } from "@/components/benefits/benefits-content"
import { WellnessProgramsContent } from "@/components/wellness/wellness-programs-content"
import { SinistralidadeReductionProgram } from "@/components/sinistralidade/reduction-program"
import { ExportData } from "@/components/export/export-data"
import { SettingsContent } from "@/components/settings/settings-content"
import { QuestionnairesContent } from "@/components/questionnaires/questionnaires-content"
import { ISPContent } from "@/components/isp/isp-content"
import { CareLinesContent } from "@/components/care-lines/care-lines-content"
import { PredictiveAnalysis } from "@/components/predictive/predictive-analysis"
import PerformanceEvaluation from "@/components/performance/performance-evaluation"
import { UnimedAnalysis } from "@/components/health-plans/unimed-analysis"
import { CareManagement } from "@/components/care/care-management"
import { EducationContent } from "@/components/education/education-content"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "unimed-analysis":
        return <UnimedAnalysis />
      case "care-lines":
        return <CareLinesContent />
      case "analytics":
        return <PredictiveAnalysis />
      case "performance":
        return <PerformanceEvaluation />
      case "isp":
        return <ISPContent />
      case "roi":
        return <RoiContent />
      case "questionnaires":
        return <QuestionnairesContent />
      case "data":
        return <DataContent />
      case "benefits":
        return <BenefitsContent />
      case "wellness":
        return <WellnessProgramsContent />
      case "sinistralidade":
        return <SinistralidadeReductionProgram />
      case "export":
        return <ExportData />
      case "care":
        return <CareManagement />
      case "education":
        return <EducationContent />
      case "settings":
        return <SettingsContent />
      case "help":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Ajuda & Suporte</h1>
            <p>Entre em contato com nossa equipe de suporte para assistência.</p>
          </div>
        )
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <div className="h-full overflow-auto p-6">{renderContent()}</div>
      </main>
    </div>
  )
}
