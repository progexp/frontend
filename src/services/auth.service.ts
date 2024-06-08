import { removeFromStorage, saveTokenStorage } from './auth-token.service';
import { axiosClassic } from '@/interceptors';

export const authService = {
    async tryLogin(login: string, password: string, isRemember: boolean) {
        const response = await axiosClassic.post('/auth/login', {
            login: login,
            password: password,
            isRemember: isRemember
        });

        if (response.data.accessToken) {
            saveTokenStorage(response.data.accessToken);
        }

        return response;
    },

    async tryRegister(login: string, email: string, password: string, passwordConfirm: string) {
        const response = await axiosClassic.post('/auth/register', {
            login: login,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        });

        if (response.data.accessToken) {
            saveTokenStorage(response.data.accessToken);
        }

        return response;
    },

    async getNewTokens() {
        const response = await axiosClassic.post('/auth/login/access-token');

        if (response.data.accessToken) {
            saveTokenStorage(response.data.accessToken);
        }

        return response;
    },

    async logout() {
        const response = await axiosClassic.post<boolean>('/auth/logout');

        if (response.data) {
            removeFromStorage();
        }

        return response;
    }
};
