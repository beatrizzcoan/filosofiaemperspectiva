import { apiClient } from './client';

export interface User {
  id: number;
  name: string;
  email: string;
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
  }
};
