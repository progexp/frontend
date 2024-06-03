import Cookies from 'js-cookie';
import { TOKENS } from '@/constants';

export function getAccessToken(): string | null {
    const accessToken: string | undefined = Cookies.get(TOKENS.ACCESS_TOKEN);
    return accessToken || null;
}

export function saveTokenStorage(accessToken: string): void {
    Cookies.set(TOKENS.ACCESS_TOKEN, accessToken, {
        domain: 'localhost',
        sameSite: 'strict',
        expires: 1
    });
}

export function removeFromStorage(): void {
    Cookies.remove(TOKENS.ACCESS_TOKEN);
}
