import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    const ProtectedRoutes = ['/add', '/edit', '/profile'];

    if (ProtectedRoutes.includes(pathname) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname === '/about') {
        console.log(request.nextUrl.pathname === '/about');
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/about', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/add', '/edit/:path*', '/profile'],
};