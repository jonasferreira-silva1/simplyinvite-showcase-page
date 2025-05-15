
import React, { useState } from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MessageSquare, 
  Star, 
  Trash2, 
  CheckCircle, 
  Clock, 
  MessageCircle 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManagerFavorites = () => {
  // Mock data
  const favorites = [
    {
      id: "1",
      name: "Ana Silva",
      age: 17,
      city: "São Paulo",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      category: "Design",
      medal: "prata",
      project: "App Educacional",
      status: "avaliando",
      dateAdded: "12/05/2023"
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
      status: "em contato",
      dateAdded: "10/05/2023"
    },
    {
      id: "3",
      name: "Pedro Almeida",
      age: 17,
      city: "Belo Horizonte",
      image: "",
      category: "Impacto Social",
      medal: "ouro",
      project: "App de Reciclagem",
      status: "convidado",
      dateAdded: "08/05/2023"
    }
  ];

  const [statusFilter, setStatusFilter] = useState("");

  const handleScheduleInterview = (id: string) => {
    console.log("Schedule interview", id);
  };

  const handleContact = (id: string) => {
    console.log("Contact", id);
  };

  const handleRemove = (id: string) => {
    console.log("Remove from favorites", id);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "avaliando":
        return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Avaliando</Badge>;
      case "em contato":
        return <Badge variant="outline" className="bg-blue-50 flex items-center gap-1"><MessageCircle className="h-3 w-3" /> Em Contato</Badge>;
      case "convidado":
        return <Badge variant="outline" className="bg-green-50 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Convidado</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const filteredFavorites = statusFilter 
    ? favorites.filter(fav => fav.status === statusFilter)
    : favorites;

  return (
    <UserPanelLayout userName="Rodrigo Mendes" userType="manager">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Favoritos</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtrar por status:</span>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="avaliando">Avaliando</SelectItem>
                <SelectItem value="em contato">Em Contato</SelectItem>
                <SelectItem value="convidado">Convidado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredFavorites.length > 0 ? (
          <div className="space-y-4">
            {filteredFavorites.map((favorite) => (
              <Card key={favorite.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{favorite.name}</h3>
                        <div className="flex items-center gap-2">
                          {getMedalBadge(favorite.medal)}
                          {getStatusBadge(favorite.status)}
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        {favorite.age} anos • {favorite.city} • {favorite.category}
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Projeto: </span>
                        {favorite.project}
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-1">
                        Adicionado em {favorite.dateAdded}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <Button 
                        variant="default"
                        onClick={() => handleScheduleInterview(favorite.id)}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar Entrevista
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => handleContact(favorite.id)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contatar
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleRemove(favorite.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <Star className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum favorito encontrado</h3>
              {statusFilter ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Nenhum talento com o status selecionado.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  Comece adicionando talentos aos seus favoritos na seção Explorar.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </UserPanelLayout>
  );
};

export default ManagerFavorites;
