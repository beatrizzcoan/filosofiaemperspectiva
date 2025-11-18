import { apiClient } from './client';

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export interface LoginResponse {
  token: string;
}

export const AuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', { email, password });
  },

  async register(name: string, email: string, password: string): Promise<User> {
    return apiClient.post<User>('/auth/register', { name, email, password });
  },

  async getMe(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  async updateProfile(data: { name?: string; avatarUrl?: string }): Promise<User> {
    return apiClient.patch<User>('/auth/me', data);
  },

  async changePassword(oldPassword: string, newPassword: string): Promise<{ message: string }> {
    return apiClient.put<{ message: string }>('/auth/change-password', { oldPassword, newPassword });
  }
};
