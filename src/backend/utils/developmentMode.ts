
import { ProfileType } from '../types/profiles';

// Mock de dados para ambiente de desenvolvimento
const mockUserData = {
  talent: {
    id: 'dev-talent-id',
    email: 'jovem@example.com',
    profile: {
      id: 'dev-talent-profile-id',
      user_id: 'dev-talent-id',
      full_name: 'Jovem de Teste',
      interest_area: 'Desenvolvimento Web',
      portfolio_link: 'https://example.com/portfolio',
      created_at: new Date().toISOString()
    }
  },
  hr: {
    id: 'dev-hr-id',
    email: 'rh@example.com',
    profile: {
      id: 'dev-hr-profile-id',
      user_id: 'dev-hr-id',
      full_name: 'RH de Teste',
      company: 'Empresa Teste',
      cnpj: '12.345.678/0001-90',
      created_at: new Date().toISOString()
    }
  },
  manager: {
    id: 'dev-manager-id',
    email: 'gestor@example.com',
    profile: {
      id: 'dev-manager-profile-id',
      user_id: 'dev-manager-id',
      full_name: 'Gestor de Teste',
      company: 'Empresa Teste',
      position: 'Diretor de Inovação',
      talent_search_area: 'Tecnologia',
      created_at: new Date().toISOString()
    }
  }
};

export const simulateAuth = (email: string, profileType: ProfileType) => {
  const mockUser = mockUserData[profileType];
  if (mockUser && mockUser.email === email) {
    return {
      user: {
        id: mockUser.id,
        email: mockUser.email,
        profile_type: profileType
      },
      profile: mockUser.profile
    };
  }
  return null;
};

export const simulateGetProfile = (userId: string, profileType: ProfileType) => {
  const mockUser = mockUserData[profileType];
  if (mockUser && mockUser.id === userId) {
    return { data: mockUser.profile, error: null };
  }
  return { data: null, error: new Error('Usuário não encontrado') };
};
