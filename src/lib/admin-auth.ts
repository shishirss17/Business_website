import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function requireAdmin() {
    const session = await auth();

    if (!session || !session.user) {
        return {
            authorized: false,
            response: NextResponse.json(
                { error: 'Unauthorized - Please log in' },
                { status: 401 }
            ),
        };
    }

    const userRole = (session.user as any).role;

    if (userRole !== 'admin') {
        return {
            authorized: false,
            response: NextResponse.json(
                { error: 'Forbidden - Admin access required' },
                { status: 403 }
            ),
        };
    }

    return {
        authorized: true,
        user: session.user,
    };
}

export async function isAdmin(): Promise<boolean> {
    const session = await auth();
    if (!session || !session.user) return false;
    return (session.user as any).role === 'admin';
}
