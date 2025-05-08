
import React, { useState } from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Calendar, MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManagerExplore = () => {
  // Mock data
  const talents = [
    {
      id: "1",
      name: "Ana Silva",
      age: 17,
      city: "São Paulo",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      category: "Design",
      medal: "prata",
      project: "App Educacional",
      tags: ["UX/UI", "Frontend", "Design"]
    },
    {
      id: "2",
      name: "Carlos Pereira",
      age: 18,
      city: "Rio de Janeiro",
      image: "",
      category: "Desenvolvimento",
      medal: "ouro",
      project: "Plataforma de Mentoria",
      tags: ["Backend", "Node.js", "API"]
    },
    {
      id: "3",
      name: "Mariana Santos",
      age: 16,
      city: "Curitiba",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      category: "Design",
      medal: "bronze",
      project: "Website Portfolio",
      tags: ["Web Design", "HTML/CSS", "Responsivo"]
    },
    {
      id: "4",
      name: "Pedro Almeida",
      age: 17,
      city: "Belo Horizonte",
      image: "",
      category: "Impacto Social",
      medal: "ouro",
      project: "App de Reciclagem",
      tags: ["Mobile", "React Native", "Sustentabilidade"]
    },
    {
      id: "5",
      name: "Julia Costa",
      age: 18,
      city: "Salvador",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      category: "Educação",
      medal: "prata",
      project: "Plataforma de Estudos",
      tags: ["Educação", "Frontend", "JavaScript"]
    }
  ];

  const [filters, setFilters] = useState({
    medal: "",
    category: "",
    location: ""
  });

  const handleAddToFavorites = (id: string) => {
    console.log("Add to favorites", id);
  };

  const handleScheduleInterview = (id: string) => {
    console.log("Schedule interview", id);
  };

  const handleContact = (id: string) => {
    console.log("Contact", id);
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

  const getFilteredTalents = () => {
    return talents.filter(talent => {
      if (filters.medal && talent.medal !== filters.medal) return false;
      if (filters.category && talent.category !== filters.category) return false;
      if (filters.location && talent.city !== filters.location) return false;
      return true;
    });
  };

  const filteredTalents = getFilteredTalents();

  return (
    <UserPanelLayout userName="Rodrigo Mendes" userType="manager">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Explorar Talentos</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtrar Talentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-auto">
                <Select 
                  value={filters.medal} 
                  onValueChange={(value) => setFilters({...filters, medal: value})}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Medalha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="ouro">Ouro</SelectItem>
                    <SelectItem value="prata">Prata</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-auto">
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => setFilters({...filters, category: value})}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                    <SelectItem value="Impacto Social">Impacto Social</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-auto">
                <Select 
                  value={filters.location} 
                  onValueChange={(value) => setFilters({...filters, location: value})}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="São Paulo">São Paulo</SelectItem>
                    <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                    <SelectItem value="Curitiba">Curitiba</SelectItem>
                    <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
                    <SelectItem value="Salvador">Salvador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Input placeholder="Buscar por nome, habilidade..." />
              </div>

              <Button>
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTalents.map((talent) => (
            <Card key={talent.id} className="overflow-hidden">
              <div className="relative p-6 pb-0">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{talent.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {talent.age} anos • {talent.city}
                    </div>
                  </div>
                  <div>{getMedalBadge(talent.medal)}</div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-sm font-medium mb-1">Projeto em destaque:</div>
                  <div className="text-sm">{talent.project}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {talent.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="default" 
                    className="w-full" 
                    onClick={() => handleScheduleInterview(talent.id)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar Entrevista
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleAddToFavorites(talent.id)}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Favoritar
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleContact(talent.id)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contatar
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

export default ManagerExplore;
