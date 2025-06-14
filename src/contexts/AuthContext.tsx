import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@vilarbucks.com',
    name: 'Demo User',
    balance: 150.75,
    totalEarned: 450.25,
    tasksCompleted: 23,
    joinedAt: new Date('2024-01-15'),
  },
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('vilarbucks_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple login for development - any email/password combination works
    if (email && password) {
      const existingUser = mockUsers.find(u => u.email === email);
      const userData = existingUser || {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        balance: 0,
        totalEarned: 0,
        tasksCompleted: 0,
        joinedAt: new Date(),
      };
      
      setUser(userData);
      localStorage.setItem('vilarbucks_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    if (email && password && name) {
      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
        balance: 0,
        totalEarned: 0,
        tasksCompleted: 0,
        joinedAt: new Date(),
      };
      
      setUser(userData);
      localStorage.setItem('vilarbucks_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vilarbucks_user');
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        balance: user.balance + amount,
        totalEarned: amount > 0 ? user.totalEarned + amount : user.totalEarned,
        tasksCompleted: amount > 0 ? user.tasksCompleted + 1 : user.tasksCompleted,
      };
      setUser(updatedUser);
      localStorage.setItem('vilarbucks_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};