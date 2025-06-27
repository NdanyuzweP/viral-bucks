import apiClient from './api';

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  orderId?: number;
  content: string;
  messageType: 'text' | 'image' | 'file';
  isRead: boolean;
  createdAt: string;
  sender?: {
    id: number;
    username: string;
    role: string;
  };
  receiver?: {
    id: number;
    username: string;
    role: string;
  };
}

export interface SendMessageRequest {
  receiverId: number;
  orderId?: number;
  content: string;
  messageType?: 'text' | 'image' | 'file';
}

export interface Conversation {
  otherUser: number;
  lastMessage: Message;
  unreadCount: number;
}

class MessageService {
  async sendMessage(messageData: SendMessageRequest): Promise<{ message: string; data: Message }> {
    const response = await apiClient.post('/messages', messageData);
    return response.data;
  }

  async getMessages(params?: { orderId?: number; withUserId?: number }): Promise<{ messages: Message[] }> {
    const response = await apiClient.get('/messages', { params });
    return response.data;
  }

  async markAsRead(messageId: number): Promise<{ message: string }> {
    const response = await apiClient.patch(`/messages/${messageId}/read`);
    return response.data;
  }

  async getConversations(): Promise<{ conversations: Conversation[] }> {
    const response = await apiClient.get('/messages/conversations');
    return response.data;
  }
}

export const messageService = new MessageService();