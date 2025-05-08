
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FeedbackList from "@/components/panels/FeedbackList";
import { Medal } from "lucide-react";

const TalentFeedback = () => {
  // Mock data
  const feedbacks = [
    {
      id: "1",
      from: "Maria Silva (RH)",
      date: "12/05/2023",
      text: "Seu app tem uma interface muito intuitiva! Continue trabalhando na documentação do projeto.",
      category: "UX Design",
      isNew: true,
      medal: "prata"
    },
    {
      id: "2",
      from: "Carlos Mendes (RH)",
      date: "05/04/2023",
      text: "Bom trabalho na implementação do backend. Sugiro adicionar mais testes.",
      category: "Desenvolvimento",
      isNew: false,
      medal: "bronze"
    }
  ];

  const medals = [
    { type: "ouro", count: 0, label: "Ouro", color: "bg-yellow-400 text-black" },
    { type: "prata", count: 1, label: "Prata", color: "bg-gray-300 text-black" },
    { type: "bronze", count: 1, label: "Bronze", color: "bg-amber-700 text-white" }
  ];

  return (
    <UserPanelLayout userName="Ana Silva" userType="talent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Feedbacks Recebidos</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Medal className="mr-2 h-5 w-5" />
              Minhas Medalhas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              {medals.map((medal) => (
                <div key={medal.type} className="flex flex-col items-center p-4 rounded-lg border">
                  <div className={`rounded-full w-16 h-16 ${medal.color} flex items-center justify-center mb-2`}>
                    <span className="text-2xl font-bold">{medal.count}</span>
                  </div>
                  <p className="font-medium">{medal.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comentários dos Avaliadores</CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackList feedbacks={feedbacks} />
          </CardContent>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default TalentFeedback;
