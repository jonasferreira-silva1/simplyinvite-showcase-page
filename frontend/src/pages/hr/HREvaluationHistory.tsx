
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const HREvaluationHistory = () => {
  // Mock data
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
          <h1 className="text-2xl font-bold tracking-tight">Histórico de Avaliações</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Avaliações Realizadas</CardTitle>
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

export default HREvaluationHistory;
