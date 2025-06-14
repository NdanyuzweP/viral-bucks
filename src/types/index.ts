export interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  totalEarned: number;
  tasksCompleted: number;
  joinedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  category: 'social' | 'survey' | 'app' | 'video' | 'referral';
  timeToComplete: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
  completedAt?: Date;
  steps: string[];
}

export interface P2POrder {
  id: string;
  userId: string;
  userName: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  currency: string;
  paymentMethods: string[];
  minAmount: number;
  maxAmount: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Trade {
  id: string;
  buyerId: string;
  sellerId: string;
  orderId: string;
  amount: number;
  price: number;
  status: 'pending' | 'paid' | 'completed' | 'disputed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateBalance: (amount: number) => void;
}