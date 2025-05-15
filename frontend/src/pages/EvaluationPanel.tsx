
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import StatCard from "@/components/panels/StatCard";
import ProjectCard from "@/components/panels/ProjectCard";
import { Clock, Medal, User, Search } from "lucide-react";

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
    }
  ];

  // Handlers
  const handleEvaluate = (id: string) => {
    console.log("Evaluate", id);
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
          <h1 className="text-2xl font-bold tracking-tight">Olá, Roberto!</h1>
          <Link to="/rh/projetos-pendentes">
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Ver todos projetos
            </Button>
          </Link>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Projetos Pendentes para Avaliação</CardTitle>
            <Link to="/rh/projetos-pendentes">
              <Button variant="outline" size="sm">
                Ver todos
              </Button>
            </Link>
          </CardHeader>
          <CardContent>            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pendingProjects.slice(0, 3).map((project) => (
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Avaliações Recentes</CardTitle>
            <Link to="/rh/historico">
              <Button variant="outline" size="sm">
                Ver histórico completo
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evaluationHistory.slice(0, 2).map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.projectTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.author} • {item.date}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      {getMedalBadge(item.medal)}
                      {item.forwardedToManager ? (
                        <Badge variant="outline" className="bg-green-50">Encaminhado</Badge>
                      ) : (
                        <Badge variant="outline">Pendente</Badge>
                      )}
                    </div>
                  </div>
                  <Link to="/rh/historico">
                    <Button variant="outline" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      Detalhes
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default EvaluationPanel;
