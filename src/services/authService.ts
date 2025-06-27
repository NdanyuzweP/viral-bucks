import apiClient from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: 'customer' | 'agent';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
    isActive: boolean;
    walletBalance: number;
  };
}

export interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  walletBalance: number;
  subscriptionId?: number;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  }

  async getCurrentUser(): Promise<{ user: UserProfile }> {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  async updateProfile(profileData: Partial<UserProfile>): Promise<{ message: string; user: UserProfile }> {
    const response = await apiClient.put('/users/profile', profileData);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('vilarbucks_token');
    localStorage.removeItem('vilarbucks_user');
  }
}

export const authService = new AuthService();