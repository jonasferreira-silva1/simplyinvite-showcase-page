
import { createClient } from '@supabase/supabase-js';

// Obtém as informações do dashboard do projeto Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Em ambiente de desenvolvimento, permitimos valores padrão para facilitar testes locais
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase URL ou Anon Key não definidos. Usando valores de demonstração para desenvolvimento.');
}

export const supabase = createClient(
  supabaseUrl || 'https://your-project-url.supabase.co', 
  supabaseAnonKey || 'your-anon-key-from-supabase'
);

// Função auxiliar para verificar se o ambiente de autenticação está configurado
export const isSupabaseConfigured = (): boolean => {
  return !!supabaseUrl && !!supabaseAnonKey && 
    supabaseUrl !== 'https://your-project-url.supabase.co' && 
    supabaseAnonKey !== 'your-anon-key-from-supabase';
};

// Função auxiliar para criar usuários de teste (para uso apenas em desenvolvimento)
export const setupDevelopmentUsers = async (): Promise<void> => {
  if (import.meta.env.DEV && !isSupabaseConfigured()) {
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
