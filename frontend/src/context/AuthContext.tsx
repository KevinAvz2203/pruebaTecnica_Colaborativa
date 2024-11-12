"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define la estructura del usuario
interface User {
  username: string;
}

// Define la estructura del contexto
interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea el Provider para envolver tu aplicación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => setUser({ username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
