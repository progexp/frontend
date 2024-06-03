import { removeFromStorage, saveTokenStorage } from './auth-token.service';
import type { AuthForm, AuthResponse } from '@/interfaces';
import { axiosClassic } from '@/interceptors';

export const postService = {
    async getAll() {
        return await axiosClassic.get<AuthResponse>('/post');
    },

    async logout() {
        const response = await axiosClassic.post<boolean>('/auth/logout');

        if (response.data) removeFromStorage();

        return response;
    }
};
