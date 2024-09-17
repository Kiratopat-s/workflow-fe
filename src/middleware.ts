import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token'); // Read token from cookies

    const { pathname } = req.nextUrl;

    // If the user is trying to access /login and is already authenticated, redirect to /dashboard
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    const protectedPaths = ['/dashboard', '/add', '/update', '/profile'];

    // Redirect to /login if user is trying to access protected paths without a token
    if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next(); // Allow access if no redirects are needed
}

export const config = {
    matcher: ['/login', '/dashboard/:path*', '/add/:path*', '/update/:path*', '/profile/:path*'], // Match multiple paths including /login
};