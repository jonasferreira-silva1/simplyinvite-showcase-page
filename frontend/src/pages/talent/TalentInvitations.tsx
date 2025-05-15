
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Calendar, Building, User } from "lucide-react";

const TalentInvitations = () => {
  // Mock data
  const invites = [
    {
      id: "1",
      company: "Tech Solutions",
      date: "15/05/2023",
      time: "14:30",
      type: "Entrevista Online",
      contact: "Maria Oliveira (RH)",
      position: "Desenvolvedor Frontend Junior",
      status: "pendente"
    },
    {
      id: "2",
      company: "Creative Studio",
      date: "18/05/2023",
      time: "10:00",
      type: "Entrevista Presencial",
      contact: "João Silva (Gestor)",
      position: "Designer UX/UI",
      status: "aceito"
    }
  ];

  const handleAccept = (id: string) => {
    console.log("Accepted invite", id);
  };

  const handleDecline = (id: string) => {
    console.log("Declined invite", id);
  };

  return (
    <UserPanelLayout userName="Ana Silva" userType="talent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Convites Recebidos</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrevistas Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            {invites.length > 0 ? (
              <div className="space-y-4">
                {invites.map((invite) => (
                  <div 
                    key={invite.id} 
                    className="border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{invite.company}</h3>
                        <p className="text-muted-foreground">{invite.position}</p>
                      </div>
                      <Badge 
                        className={
                          invite.status === "aceito" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {invite.status === "aceito" ? "Confirmado" : "Pendente"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {invite.date} às {invite.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{invite.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{invite.contact}</span>
                      </div>
                    </div>

                    {invite.status === "pendente" && (
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDecline(invite.id)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Recusar
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => handleAccept(invite.id)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Aceitar
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Nenhum convite recebido ainda.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Continue enviando projetos para aumentar suas chances!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default TalentInvitations;
