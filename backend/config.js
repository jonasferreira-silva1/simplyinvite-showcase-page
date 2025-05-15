import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Log para depuração
console.log("Carregando variáveis de ambiente:", {
  NODE_ENV: process.env.NODE_ENV,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY_PRESENT: !!process.env.SUPABASE_SERVICE_KEY,
  SUPABASE_KEY_LENGTH: process.env.SUPABASE_SERVICE_KEY ? process.env.SUPABASE_SERVICE_KEY.length : 0,
  JWT_SECRET: process.env.JWT_SECRET ? '***' + process.env.JWT_SECRET.substr(-8) : undefined
});

// Configurações de ambiente
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3001;
export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_DEVELOPMENT = NODE_ENV === 'development';

// Configurações do Supabase
export const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'your-service-key-from-supabase';

// Configurações de autenticação
export const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-segura';
export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '24h';
export const PASSWORD_RESET_REDIRECT_URL = process.env.PASSWORD_RESET_REDIRECT_URL || 'http://localhost:8080/redefinir-senha';

// Configurações de banco de dados
export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'jonas1385',
  database: process.env.DB_NAME || 'simplyinvite',
};

// Configurações gerais da aplicação
export const API_PREFIX = '/api';
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Verificar e avisar sobre configurações ausentes ou padrão
export const checkRequiredConfigs = () => {
  const warnings = [];
  
  if (JWT_SECRET === 'sua-chave-secreta-muito-segura') {
    warnings.push('⚠️ JWT_SECRET está usando valor padrão, o que é inseguro para ambientes de produção');
  }
  
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    warnings.push('⚠️ Configurações do Supabase não definidas. Autenticação não funcionará corretamente.');
  }
  
  if (DB_CONFIG.password === 'jonas1385' && IS_PRODUCTION) {
    warnings.push('⚠️ Senha do banco de dados usando valor padrão em ambiente de produção');
  }
  
  if (warnings.length > 0) {
    console.warn('AVISOS DE CONFIGURAÇÃO:');
    warnings.forEach(warning => console.warn(warning));
  }
  
  return warnings.length === 0;
};

export default {
  NODE_ENV,
  PORT,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  JWT_SECRET,
  TOKEN_EXPIRATION,
  PASSWORD_RESET_REDIRECT_URL,
  DB_CONFIG,
  API_PREFIX,
  CORS_ORIGIN,
  checkRequiredConfigs
}; 