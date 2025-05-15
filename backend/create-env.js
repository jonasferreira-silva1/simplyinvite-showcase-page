import fs from 'fs';
import path from 'path';

const envContent = `# Configurações de ambiente
NODE_ENV=development
PORT=3001

# Configurações do Supabase
SUPABASE_URL=https://rdirchsevphtxshxgmva.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkaXJjaHNldnBodHhzaHhnbXZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzM0ODA5OSwiZXhwIjoyMDYyOTI0MDk5fQ.koCi-rVwTWuTUBXt7-bZ_R3XspxeNle-Ul58DUncaas

# Configurações de autenticação
JWT_SECRET=quedetudocerto-jwt-secret-token-2025
TOKEN_EXPIRATION=24h
PASSWORD_RESET_REDIRECT_URL=http://localhost:8080/redefinir-senha

# Configurações de banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=jonas1385
DB_NAME=simplyinvite

# Configurações gerais
CORS_ORIGIN=*`;

try {
  fs.writeFileSync(path.join(process.cwd(), '.env'), envContent);
  console.log('✅ Arquivo .env criado com sucesso!');
} catch (err) {
  console.error('❌ Erro ao criar arquivo .env:', err);
} 