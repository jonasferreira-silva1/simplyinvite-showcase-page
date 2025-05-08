
import React from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/panels/ProjectCard";
import VideoPlayer from "@/components/panels/VideoPlayer";

const TalentSubmissions = () => {
  // Mock data
  const projects = [
    {
      id: "1",
      title: "App Educacional",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      medalType: "prata" as const,
      hasFeedback: true,
      status: "avaliado",
      date: "12/05/2023"
    },
    {
      id: "2",
      title: "Projeto Social",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      medalType: null,
      hasFeedback: false,
      status: "em avaliação",
      date: "02/06/2023"
    }
  ];

  const handleViewDetails = (id: string) => {
    console.log("View details", id);
  };

  const handleViewFeedback = (id: string) => {
    console.log("View feedback", id);
  };

  const handleUploadVideo = () => {
    console.log("Upload video");
  };

  const handleUploadProject = () => {
    console.log("Upload project");
  };

  return (
    <UserPanelLayout userName="Ana Silva" userType="talent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Meus Envios</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meu Vídeo de Apresentação</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoPlayer
              title="Seu Vídeo de Apresentação"
              videoUrl="https://example.com/video.mp4"
              onRecord={handleUploadVideo}
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={handleUploadVideo}>
                <Video className="mr-2 h-4 w-4" />
                Atualizar Vídeo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Meus Projetos</CardTitle>
            <Button onClick={handleUploadProject}>
              <Plus className="mr-2 h-4 w-4" />
              Enviar Novo Projeto
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  image={project.image}
                  medalType={project.medalType}
                  hasFeedback={project.hasFeedback}
                  onViewDetails={() => handleViewDetails(project.id)}
                  onViewFeedback={() => handleViewFeedback(project.id)}
                  userType="talent"
                  additionalInfo={
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant={project.status === "avaliado" ? "default" : "outline"}>
                        {project.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{project.date}</span>
                    </div>
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enviar Novo Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <FileText size={48} className="text-muted-foreground" />
              <div className="text-center">
                <h3 className="text-lg font-medium">Arraste seu projeto ou clique para enviar</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Suporta arquivos PDF, PPT, DOC ou ZIP (máximo 20MB)
                </p>
              </div>
              <Button onClick={handleUploadProject}>Selecionar Arquivo</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default TalentSubmissions;
