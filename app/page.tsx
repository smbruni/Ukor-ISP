"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import PerformanceEvaluation from "@/components/performance/performance-evaluation"
import { BenefitsContent } from "@/components/benefits/benefits-content"
import { CareManagement } from "@/components/care/care-management"
import { DataContent } from "@/components/data/data-content"
import { SettingsContent } from "@/components/settings/settings-content"
import { EducationContent } from "@/components/education/education-content"
import { ROIContent } from "@/components/roi/roi-content"
import { QuestionnairesContent } from "@/components/questionnaires/questionnaires-content"
import { ISPContent } from "@/components/isp/isp-content"
import { WellnessProgramsContent } from "@/components/wellness/wellness-programs-content"
import { CareLinesContent } from "@/components/care-lines/care-lines-content"
import { UnimedAnalysis } from "@/components/health-plans/unimed-analysis"
import { PredictiveAnalysis } from "@/components/predictive/predictive-analysis"
import { ExportData } from "@/components/export/export-data"
import { SinistralidadeReductionProgram } from "@/components/sinistralidade/reduction-program"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "performance":
        return <PerformanceEvaluation />
      case "benefits":
        return <BenefitsContent />
      case "care":
        return <CareManagement />
      case "data":
        return <DataContent />
      case "settings":
        return <SettingsContent />
      case "education":
        return <EducationContent />
      case "roi":
        return <ROIContent />
      case "questionnaires":
        return <QuestionnairesContent />
      case "isp":
        return <ISPContent />
      case "wellness":
        return <WellnessProgramsContent />
      case "care-lines":
        return <CareLinesContent />
      case "unimed-analysis":
        return <UnimedAnalysis />
      case "analytics":
        return <PredictiveAnalysis />
      case "export":
        return <ExportData />
      case "sinistralidade":
        return <SinistralidadeReductionProgram />
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
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
