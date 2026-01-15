import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protection des routes admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // TODO: Vérifier l'authentification
    // Pour l'instant, on laisse passer
    // const token = request.cookies.get('auth-token');
    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
