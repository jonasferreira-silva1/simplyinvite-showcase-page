
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import StatCard from "@/components/panels/StatCard";
import ProjectCard from "@/components/panels/ProjectCard";
import { Search, Calendar, Star, User } from "lucide-react";

const ManagerPanel = () => {
  // Mock data
  const talentData = [
    {
      id: "1",
      name: "Ana Silva",
      age: 17,
      city: "São Paulo",
      projectTitle: "App Educacional",
      projectImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      medal: "prata" as const,
      category: "Desenvolvimento Mobile"
    },
    {
      id: "2",
      name: "Carlos Pereira",
      age: 18,
      city: "Rio de Janeiro",
      projectTitle: "Projeto Social",
      projectImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      medal: "ouro" as const,
      category: "Impacto Social"
    },
    {
      id: "3",
      name: "Mariana Santos",
      age: 16,
      city: "Curitiba",
      projectTitle: "Website Portfolio",
      projectImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      medal: "bronze" as const,
      category: "Design"
    },
    {
      id: "4",
      name: "Lucas Oliveira",
      age: 18,
      city: "Belo Horizonte",
      projectTitle: "App de Finanças",
      projectImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      medal: "prata" as const,
      category: "Finanças"
    }
  ];

  const scheduledInterviews = [
    {
      id: "1",
      name: "Carlos Pereira",
      projectTitle: "Projeto Social",
      date: "15/05/2023",
      time: "14:30"
    },
    {
      id: "2",
      name: "Mariana Santos",
      projectTitle: "Website Portfolio",
      date: "17/05/2023",
      time: "10:00"
    }
  ];

  const savedFavorites = [
    {
      id: "2",
      name: "Carlos Pereira",
      projectTitle: "Projeto Social",
      medal: "ouro" as const
    },
    {
      id: "4",
      name: "Lucas Oliveira",
      projectTitle: "App de Finanças",
      medal: "prata" as const
    }
  ];

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search");
  };

  const handleScheduleInterview = (id: string) => {
    console.log("Schedule interview", id);
  };

  const handleContactTalent = (id: string) => {
    console.log("Contact talent", id);
  };

  return (
    <UserPanelLayout userName="Gustavo Mendes" userType="manager">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Painel de Talentos</h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Talentos disponíveis"
            value="35"
            icon={<User className="h-4 w-4" />}
          />
          <StatCard 
            title="Entrevistas Agendadas"
            value="2"
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard 
            title="Talentos Favoritos"
            value="2"
            icon={<Star className="h-4 w-4" />}
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Talentos Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Buscar por nome ou projeto"
                  className="flex-1"
                />
                <Select>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Tipo de medalha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas medalhas</SelectItem>
                    <SelectItem value="gold">Ouro</SelectItem>
                    <SelectItem value="silver">Prata</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas categorias</SelectItem>
                    <SelectItem value="dev">Desenvolvimento</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="social">Impacto Social</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </form>
            
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {talentData.map((talent) => (
                <ProjectCard
                  key={talent.id}
                  title={`${talent.name}, ${talent.age} - ${talent.city}`}
                  image={talent.projectImage}
                  medalType={talent.medal}
                  onViewDetails={() => handleContactTalent(talent.id)}
                  userType="manager"
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Entrevistas Agendadas</CardTitle>
            </CardHeader>
            <CardContent>
              {scheduledInterviews.length > 0 ? (
                <div className="space-y-4">
                  {scheduledInterviews.map((interview) => (
                    <div key={interview.id} className="flex justify-between items-center border p-4 rounded-md">
                      <div>
                        <h3 className="font-medium">{interview.name}</h3>
                        <p className="text-sm text-muted-foreground">{interview.projectTitle}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{interview.date} às {interview.time}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhuma entrevista agendada.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Favoritos</CardTitle>
            </CardHeader>
            <CardContent>
              {savedFavorites.length > 0 ? (
                <div className="space-y-4">
                  {savedFavorites.map((favorite) => (
                    <div key={favorite.id} className="flex justify-between items-center border p-4 rounded-md">
                      <div>
                        <h3 className="font-medium">{favorite.name}</h3>
                        <p className="text-sm text-muted-foreground">{favorite.projectTitle}</p>
                        <Badge className={`mt-1 ${
                          favorite.medal === "ouro" 
                            ? "bg-yellow-400 text-black" 
                            : favorite.medal === "prata" 
                            ? "bg-gray-300 text-black"
                            : "bg-amber-700 text-white"
                        }`}>
                          Medalha {favorite.medal}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" onClick={() => handleScheduleInterview(favorite.id)}>
                          Agendar
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleContactTalent(favorite.id)}>
                          Contatar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhum favorito salvo.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </UserPanelLayout>
  );
};

export default ManagerPanel;
