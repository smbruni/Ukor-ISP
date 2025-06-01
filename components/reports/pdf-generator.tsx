"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Loader2 } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface PDFGeneratorProps {
  reportData: any
  companyName: string
  period: string
}

export function PDFGenerator({ reportData, companyName, period }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      // Criar um elemento temporário com o conteúdo do relatório
      const reportElement = document.createElement("div")
      reportElement.style.width = "210mm" // A4 width
      reportElement.style.backgroundColor = "white"
      reportElement.style.padding = "20mm"
      reportElement.style.fontFamily = "Arial, sans-serif"
      reportElement.style.color = "#000"

      // HTML do relatório completo
      reportElement.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 40px; border-radius: 12px; margin-bottom: 30px;">
            <h1 style="font-size: 48px; font-weight: bold; margin: 0 0 10px 0;">ISP</h1>
            <h2 style="font-size: 24px; margin: 0 0 5px 0;">Índice de Saúde e Performance</h2>
            <h3 style="font-size: 20px; margin: 0 0 20px 0;">${companyName}</h3>
            <p style="font-size: 18px; margin: 0;">${period}</p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #10B981; font-size: 20px; margin-bottom: 15px;">Transformando pessoas. Mais resultados para empresas.</h3>
          <p style="line-height: 1.6; margin-bottom: 15px;">
            Este relatório apresenta o ISP baseado em 6 pilares fundamentais: Sono (23%), Saúde Física (20%), 
            Saúde Mental (18%), Saúde Nutricional (16%), Engajamento (13%) e Produtividade (10%).
          </p>
          <p style="line-height: 1.6; margin-bottom: 15px;">
            Funcionários saudáveis, felizes e motivados produzem resultados de alta qualidade e eficiência, refletindo 
            diretamente nos resultados da empresa. Eles são geralmente mais produtivos e criativos, gerando ideias 
            inovadoras e aumentando a eficiência geral.
          </p>
          <p style="line-height: 1.6;">
            Use essas informações para otimizar suas decisões sempre que for preciso e usufrua do plano de ação da Ukor 
            para alavancar a sua performance.
          </p>
        </div>

        <div style="page-break-before: always;">
          <h2 style="color: #10B981; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            📊 Perfil Populacional
          </h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Gênero</h4>
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>Mulher</span>
                  <span style="font-weight: bold;">${reportData.demographics.gender.mulher}%</span>
                </div>
                <div style="background: #e5e7eb; height: 8px; border-radius: 4px;">
                  <div style="background: #10B981; height: 8px; border-radius: 4px; width: ${reportData.demographics.gender.mulher}%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>Homem</span>
                  <span style="font-weight: bold;">${reportData.demographics.gender.homem}%</span>
                </div>
                <div style="background: #e5e7eb; height: 8px; border-radius: 4px;">
                  <div style="background: #10B981; height: 8px; border-radius: 4px; width: ${reportData.demographics.gender.homem}%;"></div>
                </div>
              </div>
            </div>

            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Estado Civil</h4>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Solteiro</span>
                <span style="font-weight: bold;">${reportData.demographics.maritalStatus.solteiro}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Casado</span>
                <span style="font-weight: bold;">${reportData.demographics.maritalStatus.casado}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Separado</span>
                <span style="font-weight: bold;">${reportData.demographics.maritalStatus.separado}%</span>
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Regime de Trabalho</h4>
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>Home Office</span>
                  <span style="font-weight: bold;">${reportData.workEnvironment.workRegime.homeOffice}%</span>
                </div>
                <div style="background: #e5e7eb; height: 8px; border-radius: 4px;">
                  <div style="background: #10B981; height: 8px; border-radius: 4px; width: ${reportData.workEnvironment.workRegime.homeOffice}%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>Híbrido</span>
                  <span style="font-weight: bold;">${reportData.workEnvironment.workRegime.hibrido}%</span>
                </div>
                <div style="background: #e5e7eb; height: 8px; border-radius: 4px;">
                  <div style="background: #10B981; height: 8px; border-radius: 4px; width: ${reportData.workEnvironment.workRegime.hibrido}%;"></div>
                </div>
              </div>
            </div>

            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Faixa Etária</h4>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>18-30 anos</span>
                <span style="font-weight: bold;">${reportData.demographics.ageRange.entre18e30}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>31-45 anos</span>
                <span style="font-weight: bold;">${reportData.demographics.ageRange.entre31e45}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>46-55 anos</span>
                <span style="font-weight: bold;">${reportData.demographics.ageRange.entre46e55}%</span>
              </div>
            </div>
          </div>
        </div>

        <div style="page-break-before: always;">
          <h2 style="color: #10B981; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            🧠 Saúde Mental
          </h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            O ambiente de trabalho e a saúde mental estão diretamente relacionados — influenciando significativamente no negócio. 
            Problemas de saúde mental aumentam os custos com assistência à saúde, absenteísmo e a taxa de turnover.
          </p>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                ${reportData.mentalHealth.depressionSigns}%
              </div>
              <div style="font-size: 12px; color: #6b7280;">Sinais de Depressão</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                ${reportData.mentalHealth.fatigue}%
              </div>
              <div style="font-size: 12px; color: #6b7280;">Fadiga</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                ${reportData.mentalHealth.confirmedDiagnosis}%
              </div>
              <div style="font-size: 12px; color: #6b7280;">Diagnóstico Confirmado</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                ${reportData.mentalHealth.perception}/5
              </div>
              <div style="font-size: 12px; color: #6b7280;">Percepção de Saúde Mental</div>
            </div>
          </div>
        </div>

        <div style="page-break-before: always;">
          <h2 style="color: #10B981; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            💪 Saúde Física
          </h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            Cuidar da saúde física vai além de tratar doenças. Envolve a condição geral do corpo, incluindo força muscular, 
            flexibilidade, resistência cardiovascular e a ausência de doenças ou problemas crônicos.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Risco de Sedentarismo</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div style="text-align: center; padding: 15px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
                  <div style="font-size: 18px; font-weight: bold; color: #dc2626;">${reportData.physicalHealth.sedentaryRisk}%</div>
                  <div style="font-size: 12px; color: #991b1b;">Sedentário</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
                  <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${100 - reportData.physicalHealth.sedentaryRisk}%</div>
                  <div style="font-size: 12px; color: #15803d;">Não Sedentário</div>
                </div>
              </div>
            </div>

            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Outros Indicadores</h4>
              <div style="space-y: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Tabagistas</span>
                  <span style="font-weight: bold;">${reportData.physicalHealth.smokers}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Check-up Recente</span>
                  <span style="font-weight: bold;">${reportData.physicalHealth.recentCheckup}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Risco de Alcoolismo</span>
                  <span style="font-weight: bold;">${reportData.physicalHealth.alcoholismRisk}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="page-break-before: always;">
          <h2 style="color: #10B981; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            😴 Saúde do Sono
          </h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            A qualidade do sono tem um grande impacto na saúde física e mental dos colaboradores. Dormir bem é fundamental 
            para manter a produtividade, foco e o bem-estar no trabalho.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Tempo de Sono</h4>
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>7-8 horas</span>
                  <span style="font-weight: bold;">${reportData.sleepHealth.sleepTime.h7a8}%</span>
                </div>
                <div style="background: #e5e7eb; height: 8px; border-radius: 4px;">
                  <div style="background: #10B981; height: 8px; border-radius: 4px; width: ${reportData.sleepHealth.sleepTime.h7a8}%;"></div>
                </div>
              </div>
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>8-9 horas</span>
                  <span style="font-weight: bold;">${reportData.sleepHealth.sleepTime.h8a9}%</span>
                </div>
                <div style="background: #e5e7eb; height: 8px; border-radius: 4px;">
                  <div style="background: #10B981; height: 8px; border-radius: 4px; width: ${reportData.sleepHealth.sleepTime.h8a9}%;"></div>
                </div>
              </div>
            </div>

            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Indicadores de Qualidade</h4>
              <div style="margin-bottom: 15px; padding: 15px; background: #fef3c7; border-radius: 8px;">
                <div style="font-size: 18px; font-weight: bold; color: #d97706; margin-bottom: 5px;">
                  ${reportData.sleepHealth.caffeineAbuse}%
                </div>
                <div style="font-size: 12px; color: #92400e;">☕ Abuso de Cafeína</div>
              </div>
              <div style="margin-bottom: 15px; padding: 15px; background: #fef2f2; border-radius: 8px;">
                <div style="font-size: 18px; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                  ${reportData.sleepHealth.sleepDifficulty}%
                </div>
                <div style="font-size: 12px; color: #991b1b;">🕐 Dificuldade para Dormir</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style="font-weight: bold; margin-bottom: 15px;">Uso de Medicamentos/Suplementos para Dormir</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
              <div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                <div style="font-size: 18px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                  ${reportData.sleepHealth.sleepMedication.medicamentos}%
                </div>
                <div style="font-size: 12px; color: #6b7280;">Medicamentos</div>
              </div>
              <div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                <div style="font-size: 18px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                  ${reportData.sleepHealth.sleepMedication.suplementos}%
                </div>
                <div style="font-size: 12px; color: #6b7280;">Suplementos</div>
              </div>
              <div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                <div style="font-size: 18px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                  ${reportData.sleepHealth.sleepMedication.nenhum}%
                </div>
                <div style="font-size: 12px; color: #6b7280;">Nenhum</div>
              </div>
            </div>
          </div>
        </div>

        <div style="page-break-before: always;">
          <h2 style="color: #10B981; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            🥗 Saúde Nutricional
          </h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            A saúde nutricional influencia diretamente os níveis de energia, o funcionamento correto do corpo e a prevenção 
            de doenças. Também afeta a produtividade, motivação e bem-estar no trabalho.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Peso Ideal</h4>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                <div style="text-align: center; padding: 12px; background: #fef2f2; border-radius: 8px;">
                  <div style="font-size: 16px; font-weight: bold; color: #dc2626;">${reportData.nutritionalHealth.idealWeight.acimaIdeal}%</div>
                  <div style="font-size: 10px; color: #991b1b;">Acima</div>
                </div>
                <div style="text-align: center; padding: 12px; background: #f0fdf4; border-radius: 8px;">
                  <div style="font-size: 16px; font-weight: bold; color: #16a34a;">${reportData.nutritionalHealth.idealWeight.pertoIdeal}%</div>
                  <div style="font-size: 10px; color: #15803d;">Ideal</div>
                </div>
                <div style="text-align: center; padding: 12px; background: #fefce8; border-radius: 8px;">
                  <div style="font-size: 16px; font-weight: bold; color: #ca8a04;">${reportData.nutritionalHealth.idealWeight.abaixoIdeal}%</div>
                  <div style="font-size: 10px; color: #a16207;">Abaixo</div>
                </div>
              </div>
            </div>

            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Consumo de Frutas (semanal)</h4>
              <div style="space-y: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Mais de 5 vezes</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.fruitConsumption.mais5vezes}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>4-5 vezes</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.fruitConsumption.entre4e5}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>3 vezes</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.fruitConsumption.vezes3}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Menos de 2 vezes</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.fruitConsumption.menos2}%</span>
                </div>
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Consumo de Vegetais (semanal)</h4>
              <div style="space-y: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>6-7 vezes</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.vegetableConsumption.entre6e7}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>1-2 vezes</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.vegetableConsumption.entre1e2}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Menos de 1 vez</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.vegetableConsumption.menos1vez}%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Consumo de Ultraprocessados (semanal)</h4>
              <div style="space-y: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>6-7 vezes</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.ultraProcessedConsumption.entre6e7}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>1-2 vezes</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.ultraProcessedConsumption.entre1e2}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Menos de 1 vez</span>
                  <span style="font-weight: bold;">${reportData.nutritionalHealth.ultraProcessedConsumption.menos1vez}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="page-break-before: always;">
          <h2 style="color: #10B981; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            ⚡ Gestão de Estresse
          </h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            A gestão de estresse é fundamental para a saúde, permitindo o equilíbrio emocional e a adaptação a desafios 
            do cotidiano. Uma gestão adequada do estresse aumenta o bem-estar dos colaboradores.
          </p>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                ${reportData.stressManagement.perception}/10
              </div>
              <div style="font-size: 12px; color: #6b7280;">Nível de Estresse</div>
              <div style="margin-top: 8px; font-size: 16px;">⚡⚡⚡⚡⚡⚡⚡</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                ${reportData.stressManagement.stressfulRoutine}%
              </div>
              <div style="font-size: 12px; color: #6b7280;">Rotina Estressante</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                ${reportData.stressManagement.workCausedStress}%
              </div>
              <div style="font-size: 12px; color: #6b7280;">Causa é o Trabalho</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 5px;">
                ${reportData.stressManagement.absenteeism}%
              </div>
              <div style="font-size: 12px; color: #6b7280;">Praticou Absenteísmo</div>
            </div>
          </div>
        </div>

        <div style="page-break-before: always;">
          <h2 style="color: #10B981; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            🎯 Produtividade
          </h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            Ser produtivo é a chave para otimizar nosso tempo, realizar tarefas com eficiência e maximizar nosso potencial. 
            Quanto mais eficiente for o tempo de trabalho, maior será a contribuição para os objetivos da empresa.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
              <h4 style="font-weight: bold; margin-bottom: 15px;">Concentração</h4>
              <div style="space-y: 12px;">
                <div style="padding: 15px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #15803d;">Não tem dificuldade</span>
                    <span style="font-weight: bold; color: #16a34a;">${reportData.productivity.concentration.naoTemDificuldade}%</span>
                  </div>
                </div>
                <div style="padding: 15px; background: #fefce8; border-radius: 8px; border: 1px solid #fde047;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #a16207;">Oscila com frequência</span>
                    <span style="font-weight: bold; color: #ca8a04;">${reportData.productivity.concentration.oscilaFrequencia}%</span>
                  </div>
                </div>
                <div style="padding: 15px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #991b1b;">Muita dificuldade</span>
                    <span style="font-weight: bold; color: #dc2626;">${reportData.productivity.concentration.muitaDificuldade}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style="margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #dbeafe, #bfdbfe); border-radius: 12px;">
                <h4 style="font-weight: bold; color: #1e40af; margin-bottom: 10px;">Percepção de Produtividade</h4>
                <div style="font-size: 32px; font-weight: bold; color: #2563eb; margin-bottom: 8px;">
                  ${reportData.productivity.perception}%
                </div>
                <div style="background: #e5e7eb; height: 12px; border-radius: 6px;">
                  <div style="background: #2563eb; height: 12px; border-radius: 6px; width: ${reportData.productivity.perception}%;"></div>
                </div>
              </div>

              <div style="padding: 20px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 12px;">
                <h4 style="font-weight: bold; color: #92400e; margin-bottom: 10px;">Dificuldade em Tomar Decisões</h4>
                <div style="font-size: 32px; font-weight: bold; color: #d97706; margin-bottom: 8px;">
                  ${reportData.productivity.decisionMaking}%
                </div>
                <div style="background: #e5e7eb; height: 12px; border-radius: 6px;">
                  <div style="background: #d97706; height: 12px; border-radius: 6px; width: ${reportData.productivity.decisionMaking}%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="page-break-before: always;">
          <h2 style="color: #10B981; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            👥 Engajamento
          </h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            O engajamento dos colaboradores é fundamental para a produtividade e retenção de talentos. 
            Colaboradores engajados são mais produtivos, criativos e comprometidos com os objetivos da empresa.
          </p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                ${reportData.engagement.jobSatisfaction}/10
              </div>
              <div style="font-size: 12px; color: #6b7280;">Satisfação no Trabalho</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                ${reportData.engagement.workLifeBalance}/10
              </div>
              <div style="font-size: 12px; color: #6b7280;">Equilíbrio Vida-Trabalho</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px;">
              <div style="font-size: 24px; font-weight: bold; color: #10B981; margin-bottom: 5px;">
                ${reportData.engagement.teamConnection}/10
              </div>
              <div style="font-size: 12px; color: #6b7280;">Conexão com a Equipe</div>
            </div>
          </div>
        </div>

        <div style="page-break-before: always; text-align: center; padding: 40px;">
          <div style="background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 40px; border-radius: 12px;">
            <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
              Transformando pessoas. Mais resultados para empresas.
            </h3>
            <p style="font-size: 16px; opacity: 0.9;">Acesse nossas redes</p>
            <div style="margin-top: 20px; font-size: 14px;">
              <p>www.ukor.com.br</p>
              <p>contato@ukor.com.br</p>
            </div>
          </div>
        </div>
      `

      // Adicionar ao DOM temporariamente
      document.body.appendChild(reportElement)

      // Configurar o PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Converter para canvas e adicionar ao PDF
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Adicionar primeira página
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Adicionar páginas adicionais se necessário
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Remover elemento temporário
      document.body.removeChild(reportElement)

      // Fazer download do PDF
      pdf.save(`Relatorio_ISP_${companyName.replace(/\s+/g, "_")}_${period.replace(/\s+/g, "_")}.pdf`)
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      alert("Erro ao gerar PDF. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="ukor-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5" />
          Geração de Relatório PDF
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Relatório ISP - {companyName}</h4>
            <p className="text-sm text-muted-foreground mb-3">Período: {period}</p>
            <p className="text-sm text-muted-foreground">
              O relatório será gerado com todas as seções: Demografia, Saúde Mental, Física, Sono, Nutrição, Estresse e
              Produtividade.
            </p>
          </div>

          <Button onClick={generatePDF} disabled={isGenerating} className="w-full ukor-button" size="lg">
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório PDF
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Processando dados e formatando relatório...</p>
              <p>Isso pode levar alguns segundos.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
