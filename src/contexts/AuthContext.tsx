import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse, UserProfile } from '../services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  totalEarned: number;
  tasksCompleted: number;
  joinedAt: Date;
  referralCode?: string;
  referralCount?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('vilarbucks_token');
      if (token) {
        try {
          const response = await authService.getCurrentUser();
          const backendUser = response.user;
          
          // Transform backend user to frontend user format
          const frontendUser: User = {
            id: backendUser.id.toString(),
            email: backendUser.email,
            name: backendUser.username || backendUser.firstName || 'User',
            balance: backendUser.walletBalance || 0,
            totalEarned: backendUser.walletBalance || 0, // You might want to track this separately
            tasksCompleted: 0, // You might want to fetch this from tasks API
            joinedAt: new Date(), // You might want to add this to backend user model
            referralCode: `VLAR${backendUser.id}`,
            referralCount: 0
          };
          
          setUser(frontendUser);
          localStorage.setItem('vilarbucks_user', JSON.stringify(frontendUser));
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('vilarbucks_token');
          localStorage.removeItem('vilarbucks_user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response: AuthResponse = await authService.login({ email, password });
      
      // Store token
      localStorage.setItem('vilarbucks_token', response.token);
      
      // Transform backend user to frontend user format
      const frontendUser: User = {
        id: response.user.id.toString(),
        email: response.user.email,
        name: response.user.username || 'User',
        balance: response.user.walletBalance || 0,
        totalEarned: response.user.walletBalance || 0,
        tasksCompleted: 0,
        joinedAt: new Date(),
        referralCode: `VLAR${response.user.id}`,
        referralCount: 0
      };
      
      setUser(frontendUser);
      localStorage.setItem('vilarbucks_user', JSON.stringify(frontendUser));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response: AuthResponse = await authService.register({
        email,
        password,
        username: name,
        firstName: name,
        role: 'customer'
      });
      
      // Store token
      localStorage.setItem('vilarbucks_token', response.token);
      
      // Transform backend user to frontend user format
      const frontendUser: User = {
        id: response.user.id.toString(),
        email: response.user.email,
        name: response.user.username || name,
        balance: response.user.walletBalance || 0,
        totalEarned: 0,
        tasksCompleted: 0,
        joinedAt: new Date(),
        referralCode: `VLAR${response.user.id}`,
        referralCount: 0
      };
      
      setUser(frontendUser);
      localStorage.setItem('vilarbucks_user', JSON.stringify(frontendUser));
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
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
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};