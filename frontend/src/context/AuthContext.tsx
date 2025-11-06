// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authAPI from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un token guardado al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      const savedAccess = localStorage.getItem('accessToken');
      const savedRefresh = localStorage.getItem('refreshToken');
      
      if (savedAccess) {
        setAccessToken(savedAccess);
        if (savedRefresh) setRefreshToken(savedRefresh);
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.user);
        } catch (error) {
          console.error('Token inválido:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setAccessToken(null);
          setRefreshToken(null);
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    try {
      const response = await authAPI.login({ email, password, rememberMe });
      
      setUser(response.user);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
      if (response.refreshToken) localStorage.setItem('refreshToken', response.refreshToken);
    } catch (error: any) {
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authAPI.register({ name, email, password });
      
      setUser(response.user);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
      if (response.refreshToken) localStorage.setItem('refreshToken', response.refreshToken);
    } catch (error: any) {
      throw new Error(error.message || 'Error al registrarse');
    }
  };

  const logout = async () => {
    try {
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (e) {
      // Silenciar error de logout para asegurar limpieza local
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
