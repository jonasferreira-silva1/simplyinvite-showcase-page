
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import StatCard from "@/components/panels/StatCard";
import ProjectCard from "@/components/panels/ProjectCard";
import { Search, Medal, User, Clock } from "lucide-react";

const EvaluationPanel = () => {
  // Mock data
  const pendingProjects = [
    {
      id: "1",
      title: "App Educacional",
      author: "Ana Silva",
      age: 17,
      city: "São Paulo",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Tecnologia"
    },
    {
      id: "2",
      title: "Projeto Social",
      author: "Carlos Pereira",
      age: 18,
      city: "Rio de Janeiro",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "Impacto Social"
    },
    {
      id: "3",
      title: "Website Portfolio",
      author: "Mariana Santos",
      age: 16,
      city: "Curitiba",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Design"
    }
  ];

  const evaluationHistory = [
    {
      id: "1",
      projectTitle: "App de Reciclagem",
      author: "Pedro Almeida",
      date: "12/05/2023",
      medal: "ouro",
      forwardedToManager: true
    },
    {
      id: "2",
      projectTitle: "Plataforma de Estudos",
      author: "Julia Costa",
      date: "08/05/2023",
      medal: "prata",
      forwardedToManager: true
    },
    {
      id: "3",
      projectTitle: "Blog de Viagens",
      author: "Rafael Souza",
      date: "02/05/2023",
      medal: "bronze",
      forwardedToManager: false
    }
  ];

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search");
  };

  const handleEvaluate = (id: string) => {
    console.log("Evaluate", id);
  };

  const handleForwardToManager = (id: string) => {
    console.log("Forward to manager", id);
  };

  const getMedalBadge = (medal: string) => {
    switch (medal) {
      case "ouro":
        return <Badge className="bg-yellow-400 text-black">Ouro</Badge>;
      case "prata":
        return <Badge className="bg-gray-300 text-black">Prata</Badge>;
      case "bronze":
        return <Badge className="bg-amber-700 text-white">Bronze</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  return (
    <UserPanelLayout userName="Roberto Gomes" userType="hr">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Painel de Avaliação</h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Projetos Avaliados"
            value="42"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatCard 
            title="Medalhas de Ouro"
            value="12"
            icon={<Medal className="h-4 w-4" />}
          />
          <StatCard 
            title="Medalhas de Prata"
            value="18"
            icon={<Medal className="h-4 w-4" />}
          />
          <StatCard 
            title="Medalhas de Bronze"
            value="12"
            icon={<Medal className="h-4 w-4" />}
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Projetos Pendentes para Avaliação</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
              <Input
                placeholder="Buscar por nome, cidade, categoria..."
                className="flex-1"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </form>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pendingProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={`${project.title} - ${project.author}`}
                  image={project.image}
                  onViewDetails={() => handleEvaluate(project.id)}
                  userType="hr"
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Avaliações</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Medalha</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluationHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.projectTitle}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{getMedalBadge(item.medal)}</TableCell>
                    <TableCell>
                      {item.forwardedToManager ? (
                        <Badge variant="outline" className="bg-green-50">Encaminhado</Badge>
                      ) : (
                        <Badge variant="outline">Pendente</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!item.forwardedToManager && (
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleForwardToManager(item.id)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Encaminhar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default EvaluationPanel;
