import jwt from 'jsonwebtoken';
import config from '../config.js';

// Usar configurações do arquivo config.js
const JWT_SECRET = config.JWT_SECRET;
const TOKEN_EXPIRATION = config.TOKEN_EXPIRATION;

/**
 * Gera um novo token JWT com os dados fornecidos
 * @param {Object} payload - Dados a serem incluídos no token
 * @returns {string} Token JWT
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

/**
 * Verifica e decodifica um token JWT
 * @param {string} token - Token JWT a ser verificado
 * @returns {Object|null} Payload decodificado ou null se inválido
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Erro ao verificar token:', error.message);
    return null;
  }
};

/**
 * Middleware para proteger rotas que requerem autenticação
 */
export const authenticateToken = (req, res, next) => {
  // Obter o token do header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
  
  // Adicionar o payload decodificado ao objeto request
  req.user = payload;
  next();
};

/**
 * Middleware para verificar perfis específicos (talent, hr, manager)
 * @param {string|string[]} allowedProfiles - Perfil(s) permitido(s)
 */
export const authorizeProfile = (allowedProfiles) => {
  return (req, res, next) => {
    // authenticateToken já deve ser chamado antes deste middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    
    const profiles = Array.isArray(allowedProfiles) ? allowedProfiles : [allowedProfiles];
    
    if (!profiles.includes(req.user.profileType)) {
      return res.status(403).json({ 
        message: 'Acesso não autorizado para este tipo de perfil' 
      });
    }
    
    next();
  };
}; 