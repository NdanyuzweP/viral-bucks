import apiClient from './api';

export interface Order {
  id: number;
  userId: number;
  agentId?: number;
  currencyId: number;
  amount: number;
  price: number;
  totalValue: number;
  type: 'buy' | 'sell';
  status: 'pending' | 'matched' | 'confirmed' | 'completed' | 'cancelled';
  description?: string;
  createdAt: string;
  updatedAt: string;
  currency?: {
    id: number;
    name: string;
    symbol: string;
  };
  agent?: {
    id: number;
    username: string;
    role: string;
  };
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

export interface CreateOrderRequest {
  currencyId: number;
  amount: number;
  price: number;
  type: 'buy' | 'sell';
  description?: string;
}

class OrderService {
  async createOrder(orderData: CreateOrderRequest): Promise<{ message: string; order: Order }> {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  }

  async getUserOrders(params?: { status?: string; type?: string }): Promise<{ orders: Order[] }> {
    const response = await apiClient.get('/orders', { params });
    return response.data;
  }

  async getPendingOrders(): Promise<{ orders: Order[] }> {
    const response = await apiClient.get('/orders/pending');
    return response.data;
  }

  async matchOrder(orderId: number): Promise<{ message: string; order: Order }> {
    const response = await apiClient.patch(`/orders/${orderId}/match`);
    return response.data;
  }

  async confirmOrder(orderId: number): Promise<{ message: string; order: Order }> {
    const response = await apiClient.patch(`/orders/${orderId}/confirm`);
    return response.data;
  }

  async completeOrder(orderId: number): Promise<{ message: string; order: Order }> {
    const response = await apiClient.patch(`/orders/${orderId}/complete`);
    return response.data;
  }

  async cancelOrder(orderId: number): Promise<{ message: string; order: Order }> {
    const response = await apiClient.patch(`/orders/${orderId}/cancel`);
    return response.data;
  }
}

export const orderService = new OrderService();