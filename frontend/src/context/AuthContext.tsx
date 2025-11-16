// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {apiFetch} from '../services/api';
import { setLogoutHandler } from '../events/authEvents';

interface User {
  id: number;
  name: string;
  email: string;
  // profile picture pero no se como se usa aún
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Configurar el manejador de logout para eventos externos
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  // Verificar si hay un token guardado al cargar la app
  useEffect(() => {
    const savedAccess = localStorage.getItem('accessToken');
    const savedRefresh = localStorage.getItem('refreshToken');
    const savedUser = localStorage.getItem('user');
    console.log("Saved user in localStorage:", savedUser);

    if (savedAccess && savedRefresh && savedUser) {
      setAccessToken(savedAccess);
      setRefreshToken(savedRefresh);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      console.log("Login response:", response);
      
      const { user, accessToken, refreshToken } = response;

      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

    } catch (error: any) {
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      const { user, accessToken, refreshToken } = response;

      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

    } catch (error: any) {
      throw new Error(error.message || 'Error al registrarse');
    }
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      if (!refreshToken) return false;

      const response = await apiFetch('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
      // La API debería devolver un nuevo accessToken
      if (!response || !response.accessToken) {
        throw new Error("No se recibió un nuevo access token");
      }
      const { accessToken: newAccessToken } = response;

      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);

      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    loading,
    login,
    register,
    logout,
    refreshAccessToken,
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
