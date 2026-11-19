// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const cookieName = process.env.COOKIE_SECRET_NAME || 'admin_session_token';
    const cookieValue = process.env.COOKIE_SECRET_VALUE || 'secure_auth_token_value';
    const adminSession = request.cookies.get(cookieName);
    if (!adminSession || adminSession.value !== cookieValue) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
