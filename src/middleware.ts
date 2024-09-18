import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const protectedPaths = ['/dashboard', '/add', '/update', '/profile'];

    if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/dashboard/:path*', '/add/:path*', '/update/:path*', '/profile/:path*'], // Match multiple paths including /login
};