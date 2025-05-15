import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";
import { ProfileType } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";

// Tipos para os diferentes perfis de usuário
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

type AuthFormProps = {
  userType: ProfileType;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  initialMode?: 'login' | 'register';
};

// Esquemas de validação
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

const registerCommonSchema = loginSchema.extend({
  fullName: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
});

const talentSchema = registerCommonSchema.extend({
  interestArea: z.string().min(2, { message: "Informe sua área de interesse" }),
  portfolioLink: z.string().optional(),
});

const hrSchema = registerCommonSchema.extend({
  company: z.string().min(2, { message: "Informe o nome da empresa" }),
  cnpj: z.string().min(14, { message: "CNPJ inválido" }),
});

const managerSchema = registerCommonSchema.extend({
  company: z.string().min(2, { message: "Informe o nome da empresa" }),
  position: z.string().min(2, { message: "Informe seu cargo" }),
  talentSearchArea: z.string().min(2, { message: "Informe a área de busca de talentos" }),
});

const AuthForm = ({ 
  userType, 
  isOpen, 
  onClose, 
  onSubmit,
  initialMode = 'login'
}: AuthFormProps) => {
  const [isLogin, setIsLogin] = React.useState(initialMode === 'login');
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Atualiza o estado isLogin quando initialMode mudar
  React.useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);
  
  // Define o esquema baseado no tipo de usuário e se é login ou registro
  const getSchema = () => {
    if (isLogin) {
      return loginSchema;
    }
    
    switch (userType) {
      case "talent":
        return talentSchema;
      case "hr":
        return hrSchema;
      case "manager":
        return managerSchema;
      default:
        return loginSchema;
    }
  };
  
  // Form setup com react-hook-form e zod
  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      interestArea: "",
      portfolioLink: "",
      company: "",
      cnpj: "",
      position: "",
      talentSearchArea: "",
    },
  });
  
  const handleSubmit = async (data: any) => {
    try {
      if (isLogin) {
        const result = await signIn(
          data.email,
          data.password,
          userType
        );
        if (!result.error) {
          if (onSubmit) onSubmit(data);
           
          // Redirecionamento após login bem-sucedido
          redirectToUserDashboard(userType);
        }
      } else {
        // Usar a opção autoLogin como true
        const { error } = await signUp(
          data.email, 
          data.password, 
          userType, 
          data, 
          true  // autoLogin = true
        );
        
        if (!error) {
          onClose();
          if (onSubmit) onSubmit(data);
          
          // O redirecionamento ocorre automaticamente após o login
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Ocorreu um erro. Tente novamente."
      });
    }
  };
  
  // Função para redirecionar para o dashboard correspondente
  const redirectToUserDashboard = (profileType: ProfileType) => {
    const redirectMap = {
      "talent": "/jovem",
      "hr": "/rh",
      "manager": "/gestor"
    };
    
    navigate(redirectMap[profileType]);
  };

  return (
    <>
      {isOpen ? (
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Campos comuns para todos os tipos de usuário */}
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
              {/* Campos específicos para cada tipo de usuário (apenas mostrados durante o registro) */}
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
        </div>
      ) : null}
    </>
  );
};

export default AuthForm;
