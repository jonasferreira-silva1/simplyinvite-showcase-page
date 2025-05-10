
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

    // 1. Obter o ID do usuário RH
    const { data: hrUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", "rh@example.com")
      .single();

    if (!hrUser) {
      throw new Error("Usuário RH não encontrado. Execute a função create-initial-users primeiro.");
    }

    // 2. Obter o perfil do RH
    const { data: hrProfile } = await supabaseAdmin
      .from("hr_profiles")
      .select("*")
      .eq("user_id", hrUser.id)
      .single();

    if (!hrProfile) {
      throw new Error("Perfil de RH não encontrado.");
    }

    // 3. Criar uma empresa
    const { data: company, error: companyError } = await supabaseAdmin
      .from("companies")
      .insert({
        name: "TechRecruit",
        cnpj: "12.345.678/0001-90",
        description: "Empresa especializada em recrutamento para tecnologia.",
        industry: "Recrutamento e Seleção",
        size: "Média",
        website: "https://techrecruit.example.com"
      })
      .select()
      .single();

    if (companyError) {
      throw new Error(`Erro ao criar empresa: ${companyError.message}`);
    }

    // 4. Criar projetos de exemplo
    const projects = [
      {
        title: "Desenvolvedor Frontend React",
        description: "Buscamos um talento para desenvolvimento de interfaces modernas com React.",
        company_id: company.id,
        hr_id: hrProfile.id,
        requirements: "Conhecimento em React, TypeScript e Tailwind CSS.",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias a partir de agora
      },
      {
        title: "Desenvolvedor Backend Node.js",
        description: "Procuramos um desenvolvedor para trabalhar com APIs RESTful usando Node.js.",
        company_id: company.id,
        hr_id: hrProfile.id,
        requirements: "Experiência com Node.js, Express e bancos de dados SQL/NoSQL.",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString() // 45 dias a partir de agora
      },
      {
        title: "Designer UI/UX",
        description: "Oportunidade para designers criativos com foco em experiência do usuário.",
        company_id: company.id,
        hr_id: hrProfile.id,
        requirements: "Conhecimento em Figma, Adobe XD e princípios de UI/UX.",
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() // 60 dias a partir de agora
      }
    ];

    const { data: createdProjects, error: projectsError } = await supabaseAdmin
      .from("projects")
      .insert(projects)
      .select();

    if (projectsError) {
      throw new Error(`Erro ao criar projetos: ${projectsError.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Dados de exemplo criados com sucesso",
        company,
        projects: createdProjects
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
