// @ts-ignore - Ignore React type issues
import React, { useState } from "react";
// @ts-ignore - Ignore Router type issues
import { useNavigate, Link } from "react-router-dom";
// @ts-ignore - Ignore form type issues
import { useForm } from "react-hook-form";
// @ts-ignore - Ignore zod type issues
import { z } from "zod";
// @ts-ignore - Ignore resolver type issues
import { zodResolver } from "@hookform/resolvers/zod";
// @ts-ignore - Ignore lucide type issues
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, ProfileType } from "@/contexts/AuthContext";

// Schema de validação do formulário
const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  profileType: z.enum(["talent", "hr", "manager"] as const),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  defaultProfileType?: ProfileType;
  onSuccess?: () => void;
  showRegisterLink?: boolean;
  registerLinkUrl?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  defaultProfileType = "talent",
  onSuccess,
  showRegisterLink = true,
  registerLinkUrl = "/cadastro",
}) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      profileType: defaultProfileType,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      setFormError(null);
      
      const { error } = await signIn(
        values.email,
        values.password,
        values.profileType
      );

      if (error) {
        setFormError(typeof error === 'string' ? error : 'Erro ao fazer login');
        return;
      }

      // Redirecionar com base no tipo de perfil
      const redirectMap = {
        talent: "/jovem",
        hr: "/rh",
        manager: "/gestor",
      };

      const redirectUrl = redirectMap[values.profileType] || "/";

      if (onSuccess) {
        onSuccess();
      } else {
        navigate(redirectUrl);
      }
    } catch (error: any) {
      setFormError(error.message || 'Ocorreu um erro ao fazer login');
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Acesse sua conta no SimplyInvite
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu.email@exemplo.com"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
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
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entrar como</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu tipo de acesso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="talent">Jovem Talento</SelectItem>
                      <SelectItem value="hr">Profissional RH</SelectItem>
                      <SelectItem value="manager">Gestor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formError && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {formError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full items-center space-y-2">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Esqueci minha senha
          </a>
          {showRegisterLink && (
            <p className="text-sm">
              Não tem uma conta?{" "}
              <Link
                to={registerLinkUrl}
                className="text-blue-600 hover:text-blue-800"
              >
                Cadastre-se agora
              </Link>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm; 