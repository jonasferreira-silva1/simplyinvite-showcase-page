export const API_BASE_URL = 'http://localhost:3001/api';

// Interfaces básicas
interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Cliente API para comunicação com o backend
export const apiClient = {
  /**
   * Realiza uma requisição GET
   */
  get: async <T>(endpoint: string, token?: string): Promise<ApiResponse<T>> => {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, { 
        method: 'GET',
        headers 
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.message || 'Erro desconhecido' };
      }
      
      return { data };
    } catch (error) {
      console.error('API Error (GET):', error);
      return { error: 'Erro de conexão com o servidor' };
    }
  },

  /**
   * Realiza uma requisição POST
   */
  post: async <T>(endpoint: string, body: any, token?: string): Promise<ApiResponse<T>> => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.message || 'Erro desconhecido' };
      }
      
      return { data };
    } catch (error) {
      console.error('API Error (POST):', error);
      return { error: 'Erro de conexão com o servidor' };
    }
  },

  /**
   * Realiza uma requisição PUT
   */
  put: async <T>(endpoint: string, body: any, token?: string): Promise<ApiResponse<T>> => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.message || 'Erro desconhecido' };
      }
      
      return { data };
    } catch (error) {
      console.error('API Error (PUT):', error);
      return { error: 'Erro de conexão com o servidor' };
    }
  },

  /**
   * Realiza uma requisição DELETE
   */
  delete: async <T>(endpoint: string, token?: string): Promise<ApiResponse<T>> => {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.message || 'Erro desconhecido' };
      }
      
      return { data };
    } catch (error) {
      console.error('API Error (DELETE):', error);
      return { error: 'Erro de conexão com o servidor' };
    }
  }
};

// Serviços específicos de autenticação
export const authService = {
  login: async (email: string, password: string, profileType: string) => {
    return apiClient.post<{user: any; profile: any; token: string}>('/auth/login', {
      email,
      password,
      profileType
    });
  },
  
  register: async (email: string, password: string, profileType: string, userData: any) => {
    return apiClient.post('/auth/register', {
      email,
      password,
      profileType,
      userData
    });
  },
  
  logout: async (token: string) => {
    return apiClient.post('/auth/logout', {}, token);
  },
  
  getProfile: async (token: string) => {
    return apiClient.get<{profile: any}>('/profile', token);
  },
  
  updateProfile: async (profileData: any, token: string) => {
    return apiClient.put('/profile', profileData, token);
  }
};

export default apiClient; 