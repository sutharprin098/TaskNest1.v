import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Handle admin subdomain routing
  if (hostname.includes('admin.princesite.in') || hostname.includes('admin.localhost')) {
    // If accessing admin subdomain but not on admin path, redirect to admin dashboard
    if (!url.pathname.startsWith('/admin')) {
      // If trying to access root, redirect to admin dashboard
      if (url.pathname === '/') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      // Otherwise redirect to admin version of the path
      return NextResponse.redirect(new URL(`/admin${url.pathname}`, request.url));
    }
  }

  // Handle main domain routing
  if (hostname.includes('tasknest.princesite.in') || (!hostname.includes('admin') && hostname.includes('princesite.in'))) {
    // If accessing admin routes from main domain, redirect to admin subdomain
    if (url.pathname.startsWith('/admin')) {
      const adminUrl = new URL(request.url);
      adminUrl.hostname = 'admin.princesite.in';
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
