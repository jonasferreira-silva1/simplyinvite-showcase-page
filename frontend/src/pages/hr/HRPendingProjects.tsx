
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check, MessageSquare, User } from "lucide-react";
import ProjectCard from "@/components/panels/ProjectCard";

const HRPendingProjects = () => {
  // Mock data
  const pendingProjects = [
    {
      id: "1",
      title: "App Educacional",
      author: "Ana Silva",
      age: 17,
      city: "São Paulo",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Tecnologia",
      date: "10/05/2023"
    },
    {
      id: "2",
      title: "Projeto Social",
      author: "Carlos Pereira",
      age: 18,
      city: "Rio de Janeiro",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "Impacto Social",
      date: "08/05/2023"
    },
    {
      id: "3",
      title: "Website Portfolio",
      author: "Mariana Santos",
      age: 16,
      city: "Curitiba",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Design",
      date: "05/05/2023"
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

  const handleSendFeedback = (id: string) => {
    console.log("Send feedback", id);
  };

  const handleForwardToManager = (id: string) => {
    console.log("Forward to manager", id);
  };

  return (
    <UserPanelLayout userName="Roberto Gomes" userType="hr">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Projetos para Avaliar</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtrar Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
              <Input
                placeholder="Buscar por nome, cidade, categoria..."
                className="flex-1 min-w-[200px]"
              />
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Tecnologia</Button>
                <Button variant="outline" size="sm">Design</Button>
                <Button variant="outline" size="sm">Impacto Social</Button>
                <Button variant="outline" size="sm">São Paulo</Button>
              </div>
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pendingProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{project.author}, {project.age} anos</span>
                    <span className="mx-2">•</span>
                    <span>{project.city}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <span className="text-xs text-muted-foreground">{project.date}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleEvaluate(project.id)}>
                    <Check className="mr-2 h-4 w-4" />
                    Avaliar
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => handleSendFeedback(project.id)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Feedback
                    </Button>
                    <Button variant="outline" onClick={() => handleForwardToManager(project.id)}>
                      <User className="mr-2 h-4 w-4" />
                      Encaminhar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </UserPanelLayout>
  );
};

export default HRPendingProjects;
