// Export all services from a central location
export { authService } from './authService';
export { taskService } from './taskService';
export { orderService } from './orderService';
export { walletService } from './walletService';
export { currencyService } from './currencyService';
export { messageService } from './messageService';
export { subscriptionService } from './subscriptionService';
export { kycService } from './kycService';
export { paymentService } from './paymentService';

// Export types
export type { LoginRequest, RegisterRequest, AuthResponse, UserProfile } from './authService';
export type { Task, UserTask, TaskCompletionResponse } from './taskService';
export type { Order, CreateOrderRequest } from './orderService';
export type { Wallet, Transaction, CreateDepositRequest, DepositPayment } from './walletService';
export type { Currency } from './currencyService';
export type { Message, SendMessageRequest, Conversation } from './messageService';
export type { Subscription } from './subscriptionService';
export type { KYCSubmission, KYCStatus, KYCRecord } from './kycService';
export type { PaymentMethod, CreatePaymentMethodRequest } from './paymentService';