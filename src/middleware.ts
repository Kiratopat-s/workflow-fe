'use client';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const protectedRoutes = ["/", "/add", "/edit", "/approval"];
    const isAuthenticated = req.cookies.get('token');
    if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
    // if (isAuthenticated && req.nextUrl.pathname === "/login") {
    //     const absoluteURL = new URL("/", req.nextUrl.origin);
    //     return NextResponse.redirect(
    //         absoluteURL.toString()
    //     );
    // }
    return NextResponse.next();
}