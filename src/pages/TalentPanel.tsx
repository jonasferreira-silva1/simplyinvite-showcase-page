
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Button } from "@/components/ui/button";
import ProfileSummary from "@/components/panels/ProfileSummary";
import ProjectCard from "@/components/panels/ProjectCard";
import VideoPlayer from "@/components/panels/VideoPlayer";
import FeedbackList from "@/components/panels/FeedbackList";
import StatCard from "@/components/panels/StatCard";
import { Plus, FileVideo, Medal } from "lucide-react";

const TalentPanel = () => {
  // Mock data
  const mockProjects = [
    {
      id: "1",
      title: "App Educacional",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      medalType: "prata" as const,
      hasFeedback: true
    },
    {
      id: "2",
      title: "Projeto Social",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      medalType: null,
      hasFeedback: false
    }
  ];

  const mockFeedbacks = [
    {
      id: "1",
      from: "Maria Silva (RH)",
      date: "12/05/2023",
      text: "Seu app tem uma interface muito intuitiva! Continue trabalhando na documentação do projeto.",
      category: "UX Design",
      isNew: true
    },
    {
      id: "2",
      from: "Carlos Mendes (RH)",
      date: "05/04/2023",
      text: "Bom trabalho na implementação do backend. Sugiro adicionar mais testes.",
      category: "Desenvolvimento",
      isNew: false
    }
  ];

  const mockInvites = [
    {
      id: "1",
      company: "Tech Solutions",
      date: "15/05/2023 às 14:30",
      type: "Entrevista Online"
    }
  ];

  // Handlers
  const handleNewProject = () => {
    console.log("New project");
  };

  const handleViewDetails = (id: string) => {
    console.log("View details", id);
  };

  const handleViewFeedback = (id: string) => {
    console.log("View feedback", id);
  };

  return (
    <UserPanelLayout userName="Ana Silva" userType="talent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Bem-vindo(a), Ana!</h1>
          <Button onClick={handleNewProject}>
            <Plus className="mr-2 h-4 w-4" />
            Enviar novo projeto
          </Button>
        </div>

        <ProfileSummary 
          name="Ana Silva"
          stats={[
            { label: "Projetos enviados", value: 2 },
            { label: "Feedbacks recebidos", value: 2 }
          ]}
          tags={["Design", "Frontend", "UX/UI"]}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard 
            title="Projetos Enviados"
            value="2"
            description="Continue compartilhando seu talento!"
            icon={<FileVideo className="h-4 w-4" />}
          />
          <StatCard 
            title="Medalhas Recebidas"
            value="1"
            description="Medalha de Prata obtida!"
            icon={<Medal className="h-4 w-4" />}
          />
          <StatCard 
            title="Convites de Entrevista"
            value="1"
            description="1 empresa quer te conhecer!"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Seus Projetos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                image={project.image}
                medalType={project.medalType}
                hasFeedback={project.hasFeedback}
                onViewDetails={() => handleViewDetails(project.id)}
                onViewFeedback={() => handleViewFeedback(project.id)}
                userType="talent"
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <VideoPlayer
            title="Seu Vídeo de Apresentação"
            videoUrl="https://example.com/video.mp4"
            onRecord={() => console.log("Record new video")}
          />

          <FeedbackList feedbacks={mockFeedbacks} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Convites Recebidos</h2>
          {mockInvites.length > 0 ? (
            <div className="rounded-md border">
              <div className="p-4">
                {mockInvites.map((invite) => (
                  <div key={invite.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{invite.company}</h3>
                      <p className="text-sm text-muted-foreground">{invite.date}</p>
                      <Badge className="mt-1">{invite.type}</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver detalhes
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 border rounded-md">
              <p className="text-muted-foreground">Nenhum convite recebido ainda.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Continue enviando projetos para aumentar suas chances!
              </p>
            </div>
          )}
        </div>
      </div>
    </UserPanelLayout>
  );
};

export default TalentPanel;
