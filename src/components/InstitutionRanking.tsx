import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ChartBar, ChartPie, ChartLine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell, 
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface Institution {
  id: number;
  name: string;
  type: "Pública" | "Privada";
  hires: number;
  location: string;
  rating: number;
  yearlyHires?: { year: string; hires: number }[];
}

const InstitutionRanking = () => {
  const [activeTab, setActiveTab] = useState("table");
  
  // Mock data - em um ambiente real, isso viria da API
  const institutions: Institution[] = [
    { 
      id: 1, 
      name: "UFPE", 
      type: "Pública", 
      hires: 187, 
      location: "Recife, PE", 
      rating: 4.8,
      yearlyHires: [
        { year: "2020", hires: 120 },
        { year: "2021", hires: 145 },
        { year: "2022", hires: 160 },
        { year: "2023", hires: 187 }
      ]
    },
    { 
      id: 2, 
      name: "UNINASSAU", 
      type: "Privada", 
      hires: 156, 
      location: "Recife, PE", 
      rating: 4.5,
      yearlyHires: [
        { year: "2020", hires: 90 },
        { year: "2021", hires: 110 },
        { year: "2022", hires: 130 },
        { year: "2023", hires: 156 }
      ]
    },
    { 
      id: 3, 
      name: "Universidade Católica de Pernambuco", 
      type: "Privada", 
      hires: 142, 
      location: "Recife, PE", 
      rating: 4.7,
      yearlyHires: [
        { year: "2020", hires: 85 },
        { year: "2021", hires: 100 },
        { year: "2022", hires: 125 },
        { year: "2023", hires: 142 }
      ]
    },
    { 
      id: 4, 
      name: "IFPE", 
      type: "Pública", 
      hires: 134, 
      location: "Recife, PE", 
      rating: 4.6,
      yearlyHires: [
        { year: "2020", hires: 80 },
        { year: "2021", hires: 95 },
        { year: "2022", hires: 115 },
        { year: "2023", hires: 134 }
      ]
    },
    { 
      id: 5, 
      name: "UPE", 
      type: "Pública", 
      hires: 128, 
      location: "Recife, PE", 
      rating: 4.5,
      yearlyHires: [
        { year: "2020", hires: 75 },
        { year: "2021", hires: 90 },
        { year: "2022", hires: 110 },
        { year: "2023", hires: 128 }
      ]
    },
    { 
      id: 6, 
      name: "Faculdade Senac", 
      type: "Privada", 
      hires: 115, 
      location: "Recife, PE", 
      rating: 4.2,
      yearlyHires: [
        { year: "2020", hires: 65 },
        { year: "2021", hires: 80 },
        { year: "2022", hires: 100 },
        { year: "2023", hires: 115 }
      ]
    }
  ];

  // Preparar dados para os gráficos
  const top5Institutions = institutions.slice(0, 5);
  
  // Dados para o gráfico de barras
  const barChartData = top5Institutions.map(inst => ({
    name: inst.name,
    contratações: inst.hires,
    fill: inst.type === "Pública" ? "#9b87f5" : "#0EA5E9"
  }));
  
  // Dados para o gráfico de pizza
  const pieChartData = [
    { name: "Públicas", value: institutions.filter(i => i.type === "Pública").reduce((acc, curr) => acc + curr.hires, 0), fill: "#9b87f5" },
    { name: "Privadas", value: institutions.filter(i => i.type === "Privada").reduce((acc, curr) => acc + curr.hires, 0), fill: "#0EA5E9" }
  ];
  
  // Dados para o gráfico de linha - evolução anual das contratações
  const years = ["2020", "2021", "2022", "2023"];
  const lineChartData = years.map(year => {
    const dataPoint: any = { year };
    top5Institutions.forEach(inst => {
      const yearData = inst.yearlyHires?.find(yh => yh.year === year);
      dataPoint[inst.name] = yearData?.hires || 0;
    });
    return dataPoint;
  });

  const COLORS = ["#9b87f5", "#0EA5E9", "#F97316", "#D946EF", "#8B5CF6"];

  return (
    <section id="ranking" className="py-20 bg-gray-50">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-si-blue mb-4">
            Ranking de Instituições
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Instituições que mais preparam talentos para o mercado de trabalho, com base em contratações reais feitas por meio da nossa plataforma.
          </p>
        </div>

        <Tabs defaultValue="table" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="table" className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                Tabela
              </TabsTrigger>
              <TabsTrigger value="bar" className="flex items-center gap-1">
                <ChartBar className="w-4 h-4" />
                Gráfico de Barras
              </TabsTrigger>
              <TabsTrigger value="pie" className="flex items-center gap-1">
                <ChartPie className="w-4 h-4" />
                Gráfico de Pizza
              </TabsTrigger>
              <TabsTrigger value="line" className="flex items-center gap-1">
                <ChartLine className="w-4 h-4" />
                Evolução Anual
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="table">
            <Card className="shadow-lg">
              <CardHeader className="bg-si-blue text-white">
                <CardTitle className="flex items-center justify-center text-center">
                  <Trophy className="mr-2 h-6 w-6" />
                  Instituições com Mais Contratações
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-center">Posição</TableHead>
                        <TableHead>Instituição</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Contratações</TableHead>
                        <TableHead>Localização</TableHead>
                        <TableHead className="text-center">Avaliação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {institutions.map((institution, index) => (
                        <TableRow key={institution.id} className={index < 3 ? "bg-yellow-50" : ""}>
                          <TableCell className="text-center font-bold">
                            {index === 0 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white">1</span>
                            ) : index === 1 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white">2</span>
                            ) : index === 2 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700 text-white">3</span>
                            ) : (
                              index + 1
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{institution.name}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              institution.type === "Pública" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {institution.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{institution.hires}</TableCell>
                          <TableCell>{institution.location}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(institution.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="ml-1 text-xs font-medium">{institution.rating.toFixed(1)}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bar">
            <Card className="shadow-lg">
              <CardHeader className="bg-si-blue text-white">
                <CardTitle className="flex items-center justify-center text-center">
                  <ChartBar className="mr-2 h-6 w-6" />
                  Top 5 Instituições por Contratações
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[400px] w-full">
                  <ChartContainer 
                    config={{
                      "Públicas": { color: "#9b87f5" },
                      "Privadas": { color: "#0EA5E9" }
                    }}
                  >
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis label={{ value: 'Contratações', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent />
                        }
                      />
                      <Legend />
                      <Bar dataKey="contratações" fill="#9b87f5">
                        {barChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pie">
            <Card className="shadow-lg">
              <CardHeader className="bg-si-blue text-white">
                <CardTitle className="flex items-center justify-center text-center">
                  <ChartPie className="mr-2 h-6 w-6" />
                  Contratações por Tipo de Instituição
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="line">
            <Card className="shadow-lg">
              <CardHeader className="bg-si-blue text-white">
                <CardTitle className="flex items-center justify-center text-center">
                  <ChartLine className="mr-2 h-6 w-6" />
                  Evolução Anual de Contratações
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Contratações', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
                      <Tooltip />
                      <Legend />
                      {top5Institutions.map((inst, index) => (
                        <Line 
                          key={inst.id}
                          type="monotone" 
                          dataKey={inst.name} 
                          stroke={COLORS[index % COLORS.length]} 
                          activeDot={{ r: 8 }} 
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InstitutionRanking;
