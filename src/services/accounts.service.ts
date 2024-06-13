import { axiosClassic } from '@/interceptors';

import type { Profile } from '@shared/types';

export class AccountsService {
    static async getProfile(id: number) {
        const response = await axiosClassic.get(`/accounts/${id}`);

        return response.data as Profile;
    }
}
