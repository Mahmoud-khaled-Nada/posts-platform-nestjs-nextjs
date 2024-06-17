"use client"
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { User } from '../types';

type AuthContextType = {
  user?: User;
  updateAuthUser: (data: User) => void;
};

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const updateAuthUser = (data: User) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, updateAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
