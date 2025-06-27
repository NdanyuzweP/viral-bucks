import apiClient from './api';

export interface Subscription {
  id: number;
  name: string;
  level: number;
  price: number;
  features: string[];
  maxDailyOrders: number;
  maxOrderAmount: number;
  tradingFeeDiscount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class SubscriptionService {
  async getAllSubscriptions(): Promise<{ subscriptions: Subscription[] }> {
    const response = await apiClient.get('/subscriptions');
    return response.data;
  }

  async subscribe(subscriptionId: number): Promise<{ message: string; subscription: any }> {
    const response = await apiClient.post(`/subscriptions/${subscriptionId}/subscribe`);
    return response.data;
  }

  async getMySubscription(): Promise<{ subscription: Subscription | null }> {
    const response = await apiClient.get('/subscriptions/my-subscription');
    return response.data;
  }

  async createSubscription(subscriptionData: Partial<Subscription>): Promise<{ message: string; subscription: Subscription }> {
    const response = await apiClient.post('/subscriptions', subscriptionData);
    return response.data;
  }
}

export const subscriptionService = new SubscriptionService();