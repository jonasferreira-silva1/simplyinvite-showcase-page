// Serviço de autenticação simulado para desenvolvimento
import { generateToken } from '../auth/tokenService.js';

// Banco de dados em memória para usuários e perfis
const mockUsers = new Map();
const mockProfiles = new Map();

// Usuários de teste pré-configurados
const setupMockUsers = () => {
  // Usuário Talento
  const talentUser = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'jovem@example.com',
    password: 'senha123'
  };
  mockUsers.set(talentUser.email, talentUser);
  
  const talentProfile = {
    id: talentUser.id,
    email: talentUser.email,
    profile_type: 'talent',
    name: 'João Silva',
    bio: 'Desenvolvedor web em formação',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockProfiles.set(talentUser.id, talentProfile);
  
  // Usuário RH
  const hrUser = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'rh@example.com',
    password: 'senha123'
  };
  mockUsers.set(hrUser.email, hrUser);
  
  const hrProfile = {
    id: hrUser.id,
    email: hrUser.email,
    profile_type: 'hr',
    name: 'Ana RH',
    company: 'Empresa Teste',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockProfiles.set(hrUser.id, hrProfile);
  
  // Usuário Gestor
  const managerUser = {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'gestor@example.com',
    password: 'senha123'
  };
  mockUsers.set(managerUser.email, managerUser);
  
  const managerProfile = {
    id: managerUser.id,
    email: managerUser.email,
    profile_type: 'manager',
    name: 'Carlos Gestor',
    department: 'Tecnologia',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockProfiles.set(managerUser.id, managerProfile);
  
  console.log('🔧 Modo de desenvolvimento: Usuários de teste configurados');
  console.log('📝 Usuários disponíveis:');
  console.log('   - Talento: jovem@example.com / senha123');
  console.log('   - RH: rh@example.com / senha123');
  console.log('   - Gestor: gestor@example.com / senha123');
};

// Funções simuladas do serviço de autenticação
export const mockSignInWithEmail = async (email, password, expectedProfileType) => {
  console.log('🔧 [MOCK] Autenticando usuário:', { email, expectedProfileType });
  
  const user = mockUsers.get(email);
  if (!user) {
    return { error: 'Usuário não encontrado' };
  }
  
  if (user.password !== password) {
    return { error: 'Senha incorreta' };
  }
  
  const profile = mockProfiles.get(user.id);
  if (!profile) {
    return { error: 'Perfil não encontrado' };
  }
  
  if (expectedProfileType && profile.profile_type !== expectedProfileType) {
    return { error: `Tipo de perfil incompatível. Esperado: ${expectedProfileType}` };
  }
  
  const token = generateToken({
    userId: user.id,
    email: user.email,
    profileType: profile.profile_type
  });
  
  return {
    user: {
      id: user.id,
      email: user.email
    },
    profile,
    token
  };
};

export const mockSignUpWithEmail = async (email, password, profileType, userData) => {
  console.log('🔧 [MOCK] Registrando usuário:', { email, profileType });
  
  // Verificar se o usuário já existe
  if (mockUsers.has(email)) {
    return { error: 'Email já está em uso' };
  }
  
  // Criar novo usuário
  const userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const user = {
    id: userId,
    email,
    password
  };
  mockUsers.set(email, user);
  
  // Criar perfil
  const profile = {
    id: userId,
    email,
    profile_type: profileType,
    ...userData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockProfiles.set(userId, profile);
  
  return {
    user: {
      id: userId,
      email
    },
    profile
  };
};

export const mockSignOut = async () => {
  console.log('🔧 [MOCK] Realizando logout');
  return { success: true };
};

export const mockGetUserProfile = async (userId) => {
  console.log('🔧 [MOCK] Buscando perfil para usuário:', userId);
  return mockProfiles.get(userId) || null;
};

export const mockUpdateUserProfile = async (userId, profileData) => {
  console.log('🔧 [MOCK] Atualizando perfil para usuário:', userId);
  
  const profile = mockProfiles.get(userId);
  if (!profile) {
    return { error: 'Perfil não encontrado' };
  }
  
  const updatedProfile = {
    ...profile,
    ...profileData,
    updated_at: new Date().toISOString()
  };
  
  mockProfiles.set(userId, updatedProfile);
  
  return { success: true, profile: updatedProfile };
};

export const mockResetPassword = async (email) => {
  console.log('🔧 [MOCK] Solicitação de reset de senha para:', email);
  
  if (!mockUsers.has(email)) {
    return { error: 'Email não encontrado' };
  }
  
  return { success: true };
};

export const mockUpdatePassword = async (userId, newPassword) => {
  console.log('🔧 [MOCK] Atualizando senha para usuário:', userId);
  
  // Encontrar usuário pelo ID
  let targetUser = null;
  let targetEmail = null;
  
  for (const [email, user] of mockUsers.entries()) {
    if (user.id === userId) {
      targetUser = user;
      targetEmail = email;
      break;
    }
  }
  
  if (!targetUser) {
    return { error: 'Usuário não encontrado' };
  }
  
  // Atualizar senha
  targetUser.password = newPassword;
  mockUsers.set(targetEmail, targetUser);
  
  return { success: true };
};

// Inicializar mock DB
setupMockUsers();

export default {
  mockSignInWithEmail,
  mockSignUpWithEmail,
  mockSignOut,
  mockGetUserProfile,
  mockUpdateUserProfile,
  mockResetPassword,
  mockUpdatePassword
}; 