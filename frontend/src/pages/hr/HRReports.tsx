
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/panels/StatCard";
import { Medal, Clock, FileText, Calendar, ChartPie } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
// You would normally import these from recharts
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from "recharts";

const HRReports = () => {
  // Mock data atualizado para incluir 2024 e 2025
  const evaluationData = [
    { name: "Jan", total: 12 },
    { name: "Fev", total: 18 },
    { name: "Mar", total: 15 },
    { name: "Abr", total: 22 },
    { name: "Mai", total: 28 },
    { name: "Jun", total: 24 },
  ];

  const medalData = [
    { name: "Ouro", value: 12, color: "#FFCD29" },
    { name: "Prata", value: 18, color: "#BFBFBF" },
    { name: "Bronze", value: 12, color: "#B87333" },
  ];

  const categoryData = [
    { name: "Tecnologia", total: 24 },
    { name: "Design", total: 18 },
    { name: "Impacto Social", total: 15 },
    { name: "Educação", total: 12 },
    { name: "Saúde", total: 8 },
  ];
  
  // Dados atualizados para evolução anual incluindo 2024 e 2025
  const yearlyData = [
    { year: "2020", total: 75 },
    { year: "2021", total: 120 },
    { year: "2022", total: 155 },
    { year: "2023", total: 180 },
    { year: "2024", total: 210 },
    { year: "2025", total: 240 },
  ];

  return (
    <UserPanelLayout userName="Roberto Gomes" userType="hr">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard 
            title="Projetos Avaliados"
            value="42"
            description="Total do mês atual"
            icon={<FileText className="h-4 w-4" />}
          />
          <StatCard 
            title="Tempo Médio"
            value="15min"
            description="Por avaliação"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatCard 
            title="Medalhas"
            value="42"
            description="Distribuídas"
            icon={<Medal className="h-4 w-4" />}
          />
          <StatCard 
            title="Convites"
            value="8"
            description="Para entrevistas"
            icon={<Calendar className="h-4 w-4" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações Mensais</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evaluationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Projetos Avaliados" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartPie className="h-5 w-5" />
                Distribuição de Medalhas
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={medalData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {medalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Projetos por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Quantidade" fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Evolução Anual de Contratações (2020-2025)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  name="Total de Contratações" 
                  stroke="#9b87f5" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default HRReports;
