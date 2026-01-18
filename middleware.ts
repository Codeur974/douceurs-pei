import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne pas protéger les pages de login et les API
  if (
    pathname === '/admin/login' ||
    pathname === '/client/login' ||
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next();
  }

  // Protection des routes admin
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token');

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protection des routes client
  if (pathname.startsWith('/client')) {
    const token = request.cookies.get('client-token');

    if (!token) {
      return NextResponse.redirect(new URL('/client/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
};
