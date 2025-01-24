import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth(middleware);

const publicRoutes = ['/login'];

const assetsRoute = ['/assets'];

async function middleware(req: NextRequest) {
  const session = await auth();

  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.find(route => path.startsWith(route));
  const isAssetsRoute = assetsRoute.find(route => path.startsWith(route));

  if (isAssetsRoute) {
    return NextResponse.next();
  }

  if ((!isPublicRoute && !session) || path === '/') {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && session && !path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
