import apiClient from './api';

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  minOrderAmount: number;
  maxOrderAmount: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class CurrencyService {
  async getAllCurrencies(): Promise<{ currencies: Currency[] }> {
    const response = await apiClient.get('/currencies');
    return response.data;
  }

  async createCurrency(currencyData: Partial<Currency>): Promise<{ message: string; currency: Currency }> {
    const response = await apiClient.post('/currencies', currencyData);
    return response.data;
  }

  async updateCurrency(id: number, currencyData: Partial<Currency>): Promise<{ message: string; currency: Currency }> {
    const response = await apiClient.put(`/currencies/${id}`, currencyData);
    return response.data;
  }
}

export const currencyService = new CurrencyService();