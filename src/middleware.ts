import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authMiddleware = NextAuth(authConfig).auth;

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // First run the auth middleware
    const authResult = await authMiddleware(request as any);

    // If auth middleware returned a response, use it
    if (authResult) {
        return authResult;
    }

    // Additional check for admin routes
    if (pathname.startsWith('/admin')) {
        // Get the session from the request
        const session = (request as any).auth;

        // Check if user is logged in
        if (!session || !session.user) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Check if user has admin role
        const userRole = (session.user as any).role;
        if (userRole !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
