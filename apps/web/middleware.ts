import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Auth } from '@auth/core';
import { createSessionConfig } from '@/lib/session-config';

const publicRoutes = new Set([
  '/',
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/products',
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.has(pathname)) return NextResponse.next();

  const isApiAuthRoute = pathname.startsWith('/api/auth');
  const isProtectedRoute =
    pathname.startsWith('/account') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/orders');

  if (!isProtectedRoute && !isApiAuthRoute) return NextResponse.next();

  const url = new URL('/api/auth/session', request.url);
  const sessionRequest = new Request(url, {
    headers: { cookie: request.headers.get('cookie') ?? '' },
  });

  try {
    const response = await Auth(sessionRequest, createSessionConfig());
    const session = response.ok ? await response.json().catch(() => null) : null;

    if (!session?.user && isProtectedRoute) {
      const signInUrl = new URL('/auth/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (session?.user && isApiAuthRoute) return NextResponse.next();

    return NextResponse.next();
  } catch {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
