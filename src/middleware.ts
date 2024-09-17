// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token'); // Read token from cookies

    // Define paths to protect
    const protectedPaths = ['/dashboard', '/add', '/update', '/profile'];

    if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path)) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/add/:path*', '/update/:path*', '/profile/:path*'], // Match multiple paths
};