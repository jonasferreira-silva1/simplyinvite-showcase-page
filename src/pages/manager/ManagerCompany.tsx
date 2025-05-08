
import React, { useState } from "react";
import UserPanelLayout from "@/components/UserPanelLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, Building, Briefcase } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ManagerCompany = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState({
    name: "Tech Solutions",
    industry: "Tecnologia",
    size: "51-200",
    website: "www.techsolutions.com",
    about: "Tech Solutions é uma empresa de tecnologia focada em desenvolvimento de software e soluções digitais inovadoras. Estamos sempre em busca de novos talentos para compor nossa equipe diversa e dinâmica.",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    positions: ["Desenvolvedor Frontend", "Designer UX/UI", "Desenvolvedor Mobile", "Analista de Dados"],
    areas: ["Tecnologia", "Design", "Dados"]
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the company data
    console.log("Company saved:", company);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompany(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPosition = () => {
    setCompany(prev => ({
      ...prev,
      positions: [...prev.positions, "Nova Posição"]
    }));
  };

  const handlePositionChange = (index: number, value: string) => {
    const newPositions = [...company.positions];
    newPositions[index] = value;
    setCompany(prev => ({
      ...prev,
      positions: newPositions
    }));
  };

  const handleRemovePosition = (index: number) => {
    const newPositions = company.positions.filter((_, i) => i !== index);
    setCompany(prev => ({
      ...prev,
      positions: newPositions
    }));
  };

  return (
    <UserPanelLayout userName="Rodrigo Mendes" userType="manager">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Minha Empresa</h1>
          {!isEditing ? (
            <Button onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Editar Informações
            </Button>
          ) : (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informações da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome da Empresa</label>
                {isEditing ? (
                  <Input 
                    name="name" 
                    value={company.name} 
                    onChange={handleChange} 
                  />
                ) : (
                  <p>{company.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Setor</label>
                {isEditing ? (
                  <Select 
                    defaultValue={company.industry}
                    onValueChange={(value) => setCompany(prev => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Saúde">Saúde</SelectItem>
                      <SelectItem value="Educação">Educação</SelectItem>
                      <SelectItem value="Finanças">Finanças</SelectItem>
                      <SelectItem value="Varejo">Varejo</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p>{company.industry}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tamanho da Empresa</label>
                {isEditing ? (
                  <Select 
                    defaultValue={company.size}
                    onValueChange={(value) => setCompany(prev => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 funcionários</SelectItem>
                      <SelectItem value="11-50">11-50 funcionários</SelectItem>
                      <SelectItem value="51-200">51-200 funcionários</SelectItem>
                      <SelectItem value="201-500">201-500 funcionários</SelectItem>
                      <SelectItem value="501+">Mais de 500 funcionários</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p>{company.size} funcionários</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website</label>
                {isEditing ? (
                  <Input 
                    name="website" 
                    value={company.website} 
                    onChange={handleChange} 
                  />
                ) : (
                  <p>{company.website}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço</label>
                {isEditing ? (
                  <Input 
                    name="address" 
                    value={company.address} 
                    onChange={handleChange} 
                  />
                ) : (
                  <p>{company.address}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sobre a Empresa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição</label>
                  {isEditing ? (
                    <Textarea 
                      name="about" 
                      value={company.about} 
                      onChange={handleChange}
                      className="min-h-[150px]"
                    />
                  ) : (
                    <p className="text-sm">{company.about}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Áreas de Interesse</label>
                  {isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {company.areas.map((area, index) => (
                        <Badge key={index} className="bg-primary/10 text-primary">
                          {area}
                          <button 
                            className="ml-1 text-primary hover:text-primary/70"
                            onClick={() => setCompany(prev => ({
                              ...prev,
                              areas: prev.areas.filter((_, i) => i !== index)
                            }))}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCompany(prev => ({
                          ...prev,
                          areas: [...prev.areas, "Nova Área"]
                        }))}
                      >
                        + Adicionar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {company.areas.map((area, index) => (
                        <Badge key={index} variant="secondary">{area}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Vagas e Posições
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {company.positions.map((position, index) => (
                <div key={index} className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Input 
                        value={position} 
                        onChange={(e) => handlePositionChange(index, e.target.value)} 
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive" 
                        onClick={() => handleRemovePosition(index)}
                      >
                        ×
                      </Button>
                    </>
                  ) : (
                    <div className="p-3 border rounded-md w-full">
                      {position}
                    </div>
                  )}
                </div>
              ))}

              {isEditing && (
                <Button variant="outline" onClick={handleAddPosition}>
                  + Adicionar Nova Posição
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </UserPanelLayout>
  );
};

export default ManagerCompany;
