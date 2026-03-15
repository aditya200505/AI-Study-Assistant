"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  googleLogin: (tokenId: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: any) => {
    const { data } = await api.post('/auth/login', credentials);
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    router.push('/dashboard');
  };

  const register = async (credentials: any) => {
    const { data } = await api.post('/auth/register', credentials);
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    router.push('/dashboard');
  };

  const googleLogin = async (tokenId: string) => {
    const { data } = await api.post('/auth/google', { tokenId });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
