import apiClient from './api';

export interface Task {
  id: number;
  title: string;
  description: string;
  taskType: 'daily' | 'weekly' | 'monthly' | 'one-time';
  rewardAmount: number;
  rewardCurrencyId: number;
  requirements?: any;
  maxCompletions?: number;
  validUntil?: string;
  isActive: boolean;
  rewardCurrency?: {
    id: number;
    name: string;
    symbol: string;
  };
}

export interface UserTask {
  id: number;
  userId: number;
  taskId: number;
  completedAt: string;
  rewardClaimed: boolean;
  Task?: Task;
}

export interface TaskCompletionResponse {
  message: string;
  reward: {
    amount: number;
    currency: number;
  };
}

class TaskService {
  async getAvailableTasks(): Promise<{ tasks: Task[] }> {
    const response = await apiClient.get('/tasks');
    return response.data;
  }

  async completeTask(taskId: number): Promise<TaskCompletionResponse> {
    const response = await apiClient.post(`/tasks/${taskId}/complete`);
    return response.data;
  }

  async getMyCompletions(): Promise<{ completions: UserTask[] }> {
    const response = await apiClient.get('/tasks/my-completions');
    return response.data;
  }

  async createTask(taskData: Partial<Task>): Promise<{ message: string; task: Task }> {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  }
}

export const taskService = new TaskService();