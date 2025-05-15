import { createClient } from '@supabase/supabase-js';
import config from '../config.js';

// Usar configurações do arquivo config.js
const supabaseUrl = config.SUPABASE_URL;
const supabaseServiceKey = config.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️ Supabase URL ou Service Key não definidos. Configure as variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Função auxiliar para verificar se o ambiente de autenticação está configurado
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseServiceKey && 
    supabaseUrl !== 'https://your-project.supabase.co' && 
    supabaseServiceKey !== 'your-service-key-from-supabase';
};

// Função auxiliar para criar usuários de teste (para uso apenas em desenvolvimento)
export const setupDevelopmentUsers = async () => {
  if (config.IS_DEVELOPMENT && !isSupabaseConfigured()) {
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