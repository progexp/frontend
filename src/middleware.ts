import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TOKENS } from '@/constants';

export function middleware(request: NextRequest) {
    // const { url, cookies } = request;
    //
    // const refreshToken = cookies.get(TOKENS.ACCESS_TOKEN)?.value;

    // const isAuthPage = url.includes('/auth/login');

    // if (
    //     !refreshToken
    //     // && !isAuthPage
    // ) {
    //     return NextResponse.redirect(new URL('/auth/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    //     matcher: ['/']
};
