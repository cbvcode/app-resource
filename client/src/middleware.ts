import type { NextRequest } from 'next/server'

import { middleware as paraglideMiddleware } from '@/core/lib/localization'

export async function middleware(request: NextRequest) {
  const lang = paraglideMiddleware.detectLanguage(request)

  return paraglideMiddleware.getResponse(request, lang)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|sitemap|image|favicon.ico|logo.png|robots.txt).*)'],
}
