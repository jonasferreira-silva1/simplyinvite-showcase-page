import express from 'express';
import cors from 'cors';
import { supabase, setupDevelopmentUsers } from './database/supabase.js';
import { signInWithEmail, signUpWithEmail, signOut, resetPassword, updatePassword } from './auth/authService.js';
import { authenticateToken, authorizeProfile } from './auth/tokenService.js';
import config from './config.js';

const app = express();

// Middleware
app.use(cors({
  origin: config.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Verificação de configurações no início
config.checkRequiredConfigs();

// Configurar usuários de teste em ambiente de desenvolvimento
if (config.IS_DEVELOPMENT) {
  setupDevelopmentUsers().catch(console.error);
}

// Rota de teste
app.get('/api/ping', (req, res) => {
  res.json({ 
    message: 'API backend rodando!', 
    env: config.NODE_ENV,
    supabaseConfigured: supabase ? true : false
  });
});

// ==================== ROTAS DE AUTENTICAÇÃO ====================

// Rota de login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, profileType } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }
    
    const result = await signInWithEmail(email, password, profileType);
    
    if (result.error) {
      return res.status(401).json({ message: result.error });
    }
    
    res.json({
      user: result.user,
      profile: result.profile,
      token: result.token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Rota de cadastro
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, profileType, userData } = req.body;
    
    if (!email || !password || !profileType) {
      return res.status(400).json({ message: 'Email, senha e tipo de perfil são obrigatórios' });
    }
    
    const result = await signUpWithEmail(email, password, profileType, userData);
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    
    if (result.confirmationRequired) {
      return res.status(200).json({ message: result.message });
    }
    
    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: result.user,
      profile: result.profile
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Rota de logout
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    await signOut();
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Rota para solicitar redefinição de senha
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório' });
    }
    
    const result = await resetPassword(email);
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    
    res.json({ message: 'Email de redefinição de senha enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Rota para atualizar senha (protegida)
app.post('/api/auth/update-password', authenticateToken, async (req, res) => {
  try {
    const { newPassword } = req.body;
    
    if (!newPassword) {
      return res.status(400).json({ message: 'Nova senha é obrigatória' });
    }
    
    const result = await updatePassword(newPassword);
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    
    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Rota para verificar autenticação atual
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ==================== ROTAS DE PERFIL ====================

// Rota para buscar perfil do usuário (com token)
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.userId)
      .single();
      
    if (error) {
      return res.status(404).json({ message: error.message });
    }
    
    res.json({ profile: data });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Rota para atualizar perfil (com token)
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...req.body,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.user.userId);
      
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    res.json({ message: 'Perfil atualizado com sucesso', profile: data });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// ==================== ROTAS ESPECÍFICAS POR PERFIL ====================

// Exemplo de rota protegida para talentos
app.get('/api/talent/dashboard', authenticateToken, authorizeProfile('talent'), (req, res) => {
  res.json({ message: 'Dashboard do talento', data: {} });
});

// Exemplo de rota protegida para RH
app.get('/api/hr/dashboard', authenticateToken, authorizeProfile('hr'), (req, res) => {
  res.json({ message: 'Dashboard do RH', data: {} });
});

// Exemplo de rota protegida para gestores
app.get('/api/manager/dashboard', authenticateToken, authorizeProfile('manager'), (req, res) => {
  res.json({ message: 'Dashboard do gestor', data: {} });
});

// Iniciar servidor
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT} no ambiente ${config.NODE_ENV}`);
}); 