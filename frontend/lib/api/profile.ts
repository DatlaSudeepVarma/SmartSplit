import { apiRequest } from './client';
import { UserProfileData } from './types';

export function getUserProfileData(_userId: string) {
    return apiRequest<UserProfileData>('/me/profile', { method: 'GET' });
}

export function updateProfileData(data: any) {
    return apiRequest<void>('/me/profile', { 
        method: 'PUT',
        body: data
    });
}
