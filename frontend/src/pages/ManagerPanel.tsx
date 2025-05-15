
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/panels/StatCard";
import { Star, Calendar, User, Search } from "lucide-react";
import { Link } from "react-router-dom";

const ManagerPanel = () => {
  // Mock data
  const recentTalents = [
    {
      id: "1",
      name: "Ana Silva",
      age: 17,
      city: "São Paulo",
      medal: "prata",
      project: "App Educacional",
      tags: ["UX/UI", "Frontend"]
    },
    {
      id: "2",
      name: "Pedro Almeida",
      age: 17,
      city: "Belo Horizonte",
      medal: "ouro",
      project: "App de Reciclagem",
      tags: ["Mobile", "React Native"]
    },
    {
      id: "3",
      name: "Julia Costa",
      age: 18,
      city: "Salvador",
      medal: "prata",
      project: "Plataforma de Estudos",
      tags: ["Educação", "Frontend"]
    }
  ];

  const upcomingInterviews = [
    {
      id: "1",
      candidate: "Ana Silva",
      date: "15/06/2023",
      time: "14:30",
      type: "online"
    },
    {
      id: "2",
      candidate: "Carlos Pereira",
      date: "18/06/2023",
      time: "10:00",
      type: "presencial"
    }
  ];

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
    <UserPanelLayout userName="Rodrigo Mendes" userType="manager">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Bem-vindo, Rodrigo!</h1>
          <Link to="/gestor/explorar">
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Explorar talentos
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard 
            title="Talentos Explorados"
            value="48"
            icon={<User className="h-4 w-4" />}
          />
          <StatCard 
            title="Talentos Favoritos"
            value="12"
            icon={<Star className="h-4 w-4" />}
          />
          <StatCard 
            title="Entrevistas"
            value="8"
            description="Agendadas"
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard 
            title="Novos Talentos"
            value="21"
            description="Em sua área"
          />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Talentos em Destaque</CardTitle>
            <Link to="/gestor/explorar">
              <Button variant="outline" size="sm">
                Ver mais
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTalents.map((talent) => (
                <div key={talent.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{talent.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {talent.age} anos • {talent.city}
                      </p>
                    </div>
                    <div>{getMedalBadge(talent.medal)}</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Projeto: </span>
                      <span>{talent.project}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {talent.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Link to="/gestor/explorar">
                      <Button variant="outline" size="sm">
                        Ver perfil
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Entrevistas Próximas</CardTitle>
              <Link to="/gestor/entrevistas">
                <Button variant="outline" size="sm">
                  Ver agenda
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.map((interview) => (
                <div 
                  key={interview.id}
                  className="mb-4 p-3 border rounded-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{interview.candidate}</h3>
                    <p className="text-sm text-muted-foreground">
                      {interview.date} às {interview.time}
                    </p>
                    <Badge 
                      variant="outline" 
                      className="mt-1"
                    >
                      {interview.type === "online" ? "Entrevista Online" : "Entrevista Presencial"}
                    </Badge>
                  </div>
                  <Link to="/gestor/entrevistas">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Ver detalhes
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Badge className="bg-green-100 text-green-800 h-6">✓</Badge>
                  <div className="space-y-1">
                    <p className="text-sm">
                      Entrevista agendada com <span className="font-medium">Ana Silva</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Há 2 horas</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Badge className="bg-blue-100 text-blue-800 h-6">★</Badge>
                  <div className="space-y-1">
                    <p className="text-sm">
                      Você adicionou <span className="font-medium">Pedro Almeida</span> aos favoritos
                    </p>
                    <p className="text-xs text-muted-foreground">Há 3 horas</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Badge className="bg-amber-100 text-amber-800 h-6">👁</Badge>
                  <div className="space-y-1">
                    <p className="text-sm">
                      Você visualizou 5 novos perfis
                    </p>
                    <p className="text-xs text-muted-foreground">Há 1 dia</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Badge className="bg-purple-100 text-purple-800 h-6">✉</Badge>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Julia Costa</span> aceitou seu convite para entrevista
                    </p>
                    <p className="text-xs text-muted-foreground">Há 2 dias</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserPanelLayout>
  );
};

export default ManagerPanel;
