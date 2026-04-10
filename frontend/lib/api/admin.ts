import { apiRequest } from './client';
import { UserData } from '../../types';

export const adminApi = {
  getUsers: async (): Promise<UserData[]> => {
    return apiRequest<UserData[]>('/admin/users');
  },
  deleteUser: async (userId: string): Promise<void> => {
    return apiRequest<void>(`/admin/users/${userId}`, { method: 'DELETE' });
  },
};
