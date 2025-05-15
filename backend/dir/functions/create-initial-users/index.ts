
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Obter o URL e a chave de serviço do Supabase das variáveis de ambiente
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    // Definir os usuários padrão
    const defaultUsers = [
      {
        email: "jovem@example.com",
        password: "senha123",
        profile_type: "talent",
        full_name: "João Talento",
        interest_area: "Programação",
        portfolio_link: "https://linkedin.com/joaotalento"
      },
      {
        email: "rh@example.com",
        password: "senha123",
        profile_type: "hr",
        full_name: "Maria RH",
        company: "TechRecruit",
        cnpj: "12.345.678/0001-90"
      },
      {
        email: "gestor@example.com",
        password: "senha123",
        profile_type: "manager",
        full_name: "Carlos Gestor",
        company: "TechInova",
        position: "CTO",
        talent_search_area: "Desenvolvimento Web"
      }
    ];

    // Criar os usuários
    for (const userData of defaultUsers) {
      // Primeiro, verificar se o usuário já existe
      const { data: existingUser } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", userData.email)
        .single();

      if (existingUser) {
        console.log(`Usuário ${userData.email} já existe. Pulando...`);
        continue;
      }

      // Criar usuário na auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true
      });

      if (authError) {
        throw new Error(`Erro ao criar usuário auth ${userData.email}: ${authError.message}`);
      }

      if (authData.user) {
        // Adicionar usuário à tabela users
        const { error: usersError } = await supabaseAdmin.from("users").insert({
          id: authData.user.id,
          email: userData.email,
          profile_type: userData.profile_type
        });

        if (usersError) {
          throw new Error(`Erro ao inserir na tabela users: ${usersError.message}`);
        }

        // Adicionar informações específicas do perfil
        switch (userData.profile_type) {
          case "talent": {
            const { error } = await supabaseAdmin.from("talent_profiles").insert({
              user_id: authData.user.id,
              full_name: userData.full_name,
              interest_area: userData.interest_area,
              portfolio_link: userData.portfolio_link
            });
            
            if (error) {
              throw new Error(`Erro ao inserir perfil de talento: ${error.message}`);
            }
            break;
          }
          case "hr": {
            const { error } = await supabaseAdmin.from("hr_profiles").insert({
              user_id: authData.user.id,
              full_name: userData.full_name,
              company: userData.company,
              cnpj: userData.cnpj
            });
            
            if (error) {
              throw new Error(`Erro ao inserir perfil de RH: ${error.message}`);
            }
            break;
          }
          case "manager": {
            const { error } = await supabaseAdmin.from("manager_profiles").insert({
              user_id: authData.user.id,
              full_name: userData.full_name,
              company: userData.company,
              position: userData.position,
              talent_search_area: userData.talent_search_area
            });
            
            if (error) {
              throw new Error(`Erro ao inserir perfil de gestor: ${error.message}`);
            }
            break;
          }
        }

        console.log(`Usuário ${userData.email} criado com sucesso como ${userData.profile_type}`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Usuários padrão criados com sucesso",
        users: defaultUsers.map(u => ({ email: u.email, password: u.password, tipo: u.profile_type }))
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Erro:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
        status: 400 
      }
    );
  }
});
