import { supabase } from '../database/supabase.js';
import { generateToken, verifyToken } from './tokenService.js';
import config from '../config.js';
import * as mockAuthService from '../utils/mockAuthService.js';

// Flag para usar autenticação simulada em desenvolvimento
const USE_MOCK_AUTH = config.IS_DEVELOPMENT;

/**
 * Registra um novo usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @param {Object} userData - Dados adicionais do usuário
 * @returns {Promise<Object>} Resultado da operação
 */
export const signUpWithEmail = async (email, password, profileType, userData) => {
  console.log(`🔑 Registrando usuário: ${email}, tipo: ${profileType}`);
  
  // Usar versão simulada se estiver em ambiente de desenvolvimento
  if (USE_MOCK_AUTH) {
    return mockAuthService.mockSignUpWithEmail(email, password, profileType, userData);
  }
  
  try {
    // Registrar usuário na autenticação do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Erro na API do Supabase (signUp):', authError);
      throw authError;
    }
    
    if (!authData.user) {
      // Em ambiente de produção do Supabase, signUp pode não retornar o usuário imediatamente
      return { 
        message: 'Verifique seu email para confirmar o cadastro.',
        confirmationRequired: true
      };
    }
    
    // Criar perfil específico para o usuário baseado no tipo (talent, hr, manager)
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email,
        profile_type: profileType,
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
    if (profileError) {
      console.error('Erro ao criar perfil no Supabase:', profileError);
      throw profileError;
    }
    
    return {
      user: authData.user,
      profile: {
        id: authData.user.id,
        email,
        profileType,
        ...userData
      }
    };
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return { error: error.message || 'Erro ao registrar usuário' };
  }
};

/**
 * Autentica um usuário existente
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @param {string} expectedProfileType - Tipo de perfil esperado
 * @returns {Promise<Object>} Resultado da operação
 */
export const signInWithEmail = async (email, password, expectedProfileType) => {
  console.log(`🔑 Autenticando usuário: ${email}, tipo esperado: ${expectedProfileType}`);
  
  // Usar versão simulada se estiver em ambiente de desenvolvimento
  if (USE_MOCK_AUTH) {
    return mockAuthService.mockSignInWithEmail(email, password, expectedProfileType);
  }
  
  try {
    // Login na autenticação do Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (authError) {
      console.error('Erro na API do Supabase (signInWithPassword):', authError);
      throw authError;
    }

    // Buscar perfil do usuário
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();
      
    if (profileError) {
      console.error('Erro ao buscar perfil do Supabase:', profileError);
      throw profileError;
    }
    
    // Verificar se o usuário tem o tipo de perfil esperado
    if (expectedProfileType && profileData.profile_type !== expectedProfileType) {
      throw new Error(`Tipo de perfil incompatível. Esperado: ${expectedProfileType}`);
    }
    
    // Gerar token JWT personalizado com informações do perfil
    const token = generateToken({
      userId: authData.user.id,
      email: authData.user.email,
      profileType: profileData.profile_type
    });
    
    return {
      user: authData.user,
      profile: profileData,
      token
    };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return { error: error.message || 'Erro ao fazer login' };
  }
};

/**
 * Realiza o logout do usuário
 * @returns {Promise<Object>} Resultado da operação
 */
export const signOut = async () => {
  // Usar versão simulada se estiver em ambiente de desenvolvimento
  if (USE_MOCK_AUTH) {
    return mockAuthService.mockSignOut();
  }
  
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { error: error.message || 'Erro ao fazer logout' };
  }
};

/**
 * Obtém a sessão atual do usuário
 * @returns {Promise<Object>} Sessão atual ou null
 */
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return null;
  }
};

/**
 * Obtém o perfil do usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise<Object>} Dados do perfil ou null
 */
export const getUserProfile = async (userId) => {
  if (!userId) return null;
  
  // Usar versão simulada se estiver em ambiente de desenvolvimento
  if (USE_MOCK_AUTH) {
    return mockAuthService.mockGetUserProfile(userId);
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    return null;
  }
};

/**
 * Cria ou atualiza o perfil de um usuário
 * @param {string} userId - ID do usuário
 * @param {Object} profileData - Dados do perfil
 * @returns {Promise<Object>} Resultado da operação
 */
export const updateUserProfile = async (userId, profileData) => {
  // Usar versão simulada se estiver em ambiente de desenvolvimento
  if (USE_MOCK_AUTH) {
    return mockAuthService.mockUpdateUserProfile(userId, profileData);
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
      
    if (error) throw error;
    return { success: true, profile: data };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { error: error.message || 'Erro ao atualizar perfil' };
  }
};

/**
 * Envia email para recuperação de senha
 * @param {string} email - Email do usuário
 * @returns {Promise<Object>} Resultado da operação
 */
export const resetPassword = async (email) => {
  // Usar versão simulada se estiver em ambiente de desenvolvimento
  if (USE_MOCK_AUTH) {
    return mockAuthService.mockResetPassword(email);
  }
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.PASSWORD_RESET_REDIRECT_URL,
    });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro ao solicitar reset de senha:', error);
    return { error: error.message || 'Erro ao solicitar reset de senha' };
  }
};

/**
 * Atualiza a senha do usuário
 * @param {string} newPassword - Nova senha
 * @returns {Promise<Object>} Resultado da operação
 */
export const updatePassword = async (newPassword) => {
  // Usar versão simulada se estiver em ambiente de desenvolvimento
  if (USE_MOCK_AUTH) {
    return mockAuthService.mockUpdatePassword(newPassword);
  }
  
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return { error: error.message || 'Erro ao atualizar senha' };
  }
}; 