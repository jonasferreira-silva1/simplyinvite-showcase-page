import { createClient } from '@supabase/supabase-js';

// Obtém as informações do dashboard do projeto Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️ Supabase URL ou Service Key não definidos. Configure as variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_KEY.');
}

export const supabase = createClient(
  supabaseUrl || 'https://your-project-url.supabase.co',
  supabaseServiceKey || 'your-service-key-from-supabase'
);

// Função auxiliar para verificar se o ambiente de autenticação está configurado
export const isSupabaseConfigured = (): boolean => {
  return !!supabaseUrl && !!supabaseServiceKey && 
    supabaseUrl !== 'https://your-project-url.supabase.co' && 
    supabaseServiceKey !== 'your-service-key-from-supabase';
};

// Função auxiliar para criar usuários de teste (para uso apenas em desenvolvimento)
export const setupDevelopmentUsers = async (): Promise<void> => {
  if (process.env.DEV && !isSupabaseConfigured()) {
    console.warn('⚠️ Usando modo de desenvolvimento com usuários de teste. NÃO use em produção!');
    console.info('📝 Usuários de teste disponíveis:');
    console.info('   - Talento: jovem@example.com / senha123');
    console.info('   - RH: rh@example.com / senha123');
    console.info('   - Gestor: gestor@example.com / senha123');
    
    // Simulação do processo de login sem backend real
    // Essa função só deve ser usada em ambiente de desenvolvimento!
    return;
  }
};
