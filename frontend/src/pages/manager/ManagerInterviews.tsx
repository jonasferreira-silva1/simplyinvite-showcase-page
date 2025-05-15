
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Edit, Trash2, Video, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManagerInterviews = () => {
  // Mock data
  const interviews = [
    {
      id: "1",
      candidate: "Ana Silva",
      date: "15/06/2023",
      time: "14:30",
      type: "online",
      position: "Designer UX/UI",
      status: "agendado"
    },
    {
      id: "2",
      candidate: "Carlos Pereira",
      date: "18/06/2023",
      time: "10:00",
      type: "presencial",
      location: "Sede da Empresa - São Paulo",
      position: "Desenvolvedor Frontend",
      status: "confirmado"
    },
    {
      id: "3",
      candidate: "Pedro Almeida",
      date: "20/06/2023",
      time: "15:45",
      type: "online",
      position: "Desenvolvedor Mobile",
      status: "pendente"
    }
  ];

  const handleReschedule = (id: string) => {
    console.log("Reschedule", id);
  };

  const handleCancel = (id: string) => {
    console.log("Cancel", id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "agendado":
        return <Badge variant="outline" className="bg-blue-50">Agendado</Badge>;
      case "confirmado":
        return <Badge variant="outline" className="bg-green-50">Confirmado</Badge>;
      case "pendente":
        return <Badge variant="outline" className="bg-amber-50">Aguardando Confirmação</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  // Get dates for the calendar view
  const today = new Date();
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    return {
      day: weekdays[date.getDay()],
      date: date.getDate(),
      month: date.getMonth() + 1,
      full: `${date.getDate()}/${date.getMonth() + 1}`,
      isToday: i === 0
    };
  });

  // Filter interviews for today
  const todayFormatted = `${today.getDate()}/${today.getMonth() + 1}/2023`;
  const todayInterviews = interviews.filter(interview => interview.date === "15/06/2023"); // Using mock date instead

  return (
    <UserPanelLayout userName="Rodrigo Mendes" userType="manager">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Entrevistas Agendadas</h1>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Entrevistas</SelectItem>
              <SelectItem value="upcoming">Próximas</SelectItem>
              <SelectItem value="confirmed">Confirmadas</SelectItem>
              <SelectItem value="pending">Aguardando</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Calendário de Entrevistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto pb-2 mb-4">
              {weekDates.map((day, i) => (
                <div 
                  key={i}
                  className={`flex-shrink-0 w-20 h-24 border rounded-lg flex flex-col items-center justify-center mx-1 cursor-pointer hover:bg-muted/50 ${
                    day.isToday ? "border-primary bg-primary/10" : ""
                  }`}
                >
                  <div className="text-sm font-medium">{day.day}</div>
                  <div className={`text-2xl font-bold ${day.isToday ? "text-primary" : ""}`}>{day.date}</div>
                  <div className="text-xs text-muted-foreground">{day.month < 10 ? `0${day.month}` : day.month}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Hoje, 15/06</h3>
              
              {todayInterviews.length > 0 ? (
                todayInterviews.map((interview) => (
                  <div 
                    key={interview.id}
                    className="flex items-center p-3 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{interview.candidate}</h4>
                      <div className="text-sm text-muted-foreground">
                        {interview.time} - {interview.position}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(interview.status)}
                      {interview.type === "online" ? (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Video className="h-3 w-3" /> Online
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> Presencial
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 border rounded-lg bg-muted/10">
                  <p className="text-muted-foreground">Nenhuma entrevista para hoje</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Todas as Entrevistas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviews.map((interview) => (
                <div key={interview.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium text-lg">{interview.candidate}</h3>
                        {getStatusBadge(interview.status)}
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{interview.date} às {interview.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          {interview.type === "online" ? (
                            <>
                              <Video className="h-4 w-4 text-muted-foreground" />
                              <span>Entrevista Online</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{interview.location}</span>
                            </>
                          )}
                        </div>
                        
                        <div className="text-sm">
                          <span className="text-muted-foreground">Cargo: </span>
                          <span>{interview.position}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 min-w-[200px]">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleReschedule(interview.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Reagendar
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 text-destructive hover:text-destructive"
                        onClick={() => handleCancel(interview.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default ManagerInterviews;
