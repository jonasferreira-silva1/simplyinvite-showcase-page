
import React from "react";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Types for the different user profiles
type CommonFields = {
  fullName: string;
  email: string;
  password: string;
};

type TalentFields = CommonFields & {
  interestArea: string;
  portfolioLink: string;
};

type HRFields = CommonFields & {
  company: string;
  cnpj: string;
};

type ManagerFields = CommonFields & {
  company: string;
  position: string;
  talentSearchArea: string;
};

type UserType = "talent" | "hr" | "manager";

type AuthFormProps = {
  userType: UserType;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

const AuthForm = ({ userType, isOpen, onClose, onSubmit }: AuthFormProps) => {
  const [isLogin, setIsLogin] = React.useState(true);
  
  // Form setup with react-hook-form
  const form = useForm();
  
  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  // Title and description based on user type
  const getTitleAndDescription = () => {
    switch (userType) {
      case "talent":
        return {
          title: "Área do Jovem Talento",
          description: isLogin 
            ? "Entre para acompanhar seus projetos e feedbacks." 
            : "Crie sua conta para começar a mostrar seu talento."
        };
      case "hr":
        return {
          title: "Área do Profissional de RH",
          description: isLogin 
            ? "Entre para avaliar e fornecer feedback aos jovens talentos." 
            : "Crie sua conta para começar a avaliar projetos."
        };
      case "manager":
        return {
          title: "Área do Gestor",
          description: isLogin 
            ? "Entre para buscar novos talentos para sua empresa." 
            : "Crie sua conta para começar a buscar talentos."
        };
    }
  };

  const { title, description } = getTitleAndDescription();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Common fields for all user types */}
            {!isLogin && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* User-type specific fields (only shown during registration) */}
            {!isLogin && userType === "talent" && (
              <>
                <FormField
                  control={form.control}
                  name="interestArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área de Interesse</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Design, Programação, Marketing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolioLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link de Portfólio/Vídeo</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Link para seu portfólio, LinkedIn ou vídeo de apresentação
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {!isLogin && userType === "hr" && (
              <>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input placeholder="XX.XXX.XXX/XXXX-XX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {!isLogin && userType === "manager" && (
              <>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu cargo na empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="talentSearchArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área de Busca de Talentos</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Design, Programação, Marketing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full">
                {isLogin ? "Entrar" : "Cadastrar"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Criar uma conta" : "Já tenho uma conta"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
