"use client"

import type React from "react"
import { Typography, List, ListItem, ListItemText } from "@material-ui/core"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { useTheme } from "@material-ui/core/styles"

const BenefitsContent: React.FC = () => {
  const theme = useTheme()

  const data = [
    { name: "Jan", Wellhub: 4000, Vittude: 2400, Zenklub: 2400 },
    { name: "Feb", Wellhub: 3000, Vittude: 1398, Zenklub: 2210 },
    { name: "Mar", Wellhub: 2000, Vittude: 9800, Zenklub: 2290 },
    { name: "Apr", Wellhub: 2780, Vittude: 3908, Zenklub: 2000 },
    { name: "May", Wellhub: 1890, Vittude: 4800, Zenklub: 2181 },
    { name: "Jun", Wellhub: 2390, Vittude: 3800, Zenklub: 2500 },
    { name: "Jul", Wellhub: 3490, Vittude: 4300, Zenklub: 2100 },
    { name: "Aug", Wellhub: 2490, Vittude: 3490, Zenklub: 2100 },
    { name: "Sep", Wellhub: 2490, Vittude: 3490, Zenklub: 2100 },
    { name: "Oct", Wellhub: 2490, Vittude: 3490, Zenklub: 2100 },
    { name: "Nov", Wellhub: 2490, Vittude: 3490, Zenklub: 2100 },
    { name: "Dec", Wellhub: 2490, Vittude: 3490, Zenklub: 2100 },
  ]

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <Typography variant="h4" gutterBottom>
        Academy - Seção de Cursos
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Cursos Disponíveis" secondary="Biblioteca completa de cursos de saúde corporativa" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Meus Cursos" secondary="Progresso individual e certificações" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Trilhas de Aprendizado" secondary="Caminhos estruturados por tema" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Relatórios" secondary="Analytics de engajamento e conclusão" />
        </ListItem>
      </List>

      <Typography variant="h4" gutterBottom style={{ marginTop: theme.spacing(4) }}>
        Benefícios - Análise Completa
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Parceiros de Bem-estar" secondary="Wellhub, Vittude, Zenklub com métricas de uso" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Benefícios Tradicionais" secondary="VA, VR, VT com análises financeiras" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Análise por Departamento" secondary="Custos e utilização segmentados" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Análise Preditiva" secondary="Projeções e otimizações de custos" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dashboards Interativos" secondary="Gráficos e KPIs em tempo real" />
        </ListItem>
      </List>

      <div style={{ marginTop: theme.spacing(4) }}>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Wellhub" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Vittude" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Zenklub" stroke="#ffc658" />
        </LineChart>
      </div>
    </div>
  )
}

export default BenefitsContent
