import apiClient from './api';

export interface Wallet {
  id: number;
  userId: number;
  currencyId: number;
  balance: number;
  address?: string;
  isActive: boolean;
  currency?: {
    id: number;
    name: string;
    symbol: string;
  };
}

export interface Transaction {
  id: number;
  userId: number;
  walletId: number;
  amount: number;
  type: 'credit' | 'debit';
  category: 'deposit' | 'withdrawal' | 'trade' | 'reward' | 'fee';
  description?: string;
  referenceId?: string;
  metadata?: any;
  createdAt: string;
}

export interface CreateDepositRequest {
  amount: number;
  currency: string;
  payCurrency?: string;
}

export interface DepositPayment {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id: string;
  order_description: string;
  created_at: string;
  updated_at: string;
}

class WalletService {
  async getUserWallets(): Promise<{ wallets: Wallet[] }> {
    const response = await apiClient.get('/wallets');
    return response.data;
  }

  async createWallet(currencyId: number): Promise<{ message: string; wallet: Wallet }> {
    const response = await apiClient.post('/wallets/create', { currencyId });
    return response.data;
  }

  async getWalletBalance(currencyId: number): Promise<{ balance: number }> {
    const response = await apiClient.get(`/wallets/balance/${currencyId}`);
    return response.data;
  }

  async getTransactionHistory(limit = 50, offset = 0): Promise<{ transactions: Transaction[] }> {
    const response = await apiClient.get('/wallets/transactions', {
      params: { limit, offset }
    });
    return response.data;
  }

  async createDeposit(depositData: CreateDepositRequest): Promise<{ message: string; payment: DepositPayment }> {
    const response = await apiClient.post('/wallets/deposit/create', depositData);
    return response.data;
  }
}

export const walletService = new WalletService();