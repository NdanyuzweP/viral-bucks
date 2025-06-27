import apiClient from './api';

export interface PaymentMethod {
  id: number;
  userId: number;
  name: string;
  type: 'bank_transfer' | 'paypal' | 'crypto' | 'mobile_money' | 'cash';
  details: any;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentMethodRequest {
  name: string;
  type: 'bank_transfer' | 'paypal' | 'crypto' | 'mobile_money' | 'cash';
  details: any;
}

class PaymentService {
  async getPaymentMethods(): Promise<{ paymentMethods: PaymentMethod[] }> {
    const response = await apiClient.get('/payments/methods');
    return response.data;
  }

  async addPaymentMethod(methodData: CreatePaymentMethodRequest): Promise<{ message: string; paymentMethod: PaymentMethod }> {
    const response = await apiClient.post('/payments/methods', methodData);
    return response.data;
  }

  async updatePaymentMethod(id: number, methodData: Partial<CreatePaymentMethodRequest>): Promise<{ message: string; paymentMethod: PaymentMethod }> {
    const response = await apiClient.put(`/payments/methods/${id}`, methodData);
    return response.data;
  }

  async deletePaymentMethod(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete(`/payments/methods/${id}`);
    return response.data;
  }
}

export const paymentService = new PaymentService();