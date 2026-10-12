import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Payload 3.88 rejects its own auth cookie on a same-origin navigation over
 * plain HTTP when browsers omit both Origin and Sec-Fetch-Site. This occurs
 * with the temporary IP-based CMS URL and sends authenticated users back to
 * /admin/login. Preserve a missing navigation context only for CMS routes;
 * requests that declare an origin or cross-site context remain untouched.
 */
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers)

  if (
    headers.has('cookie') &&
    !headers.has('origin') &&
    !headers.has('sec-fetch-site')
  ) {
    headers.set('sec-fetch-site', 'same-origin')
  }

  return NextResponse.next({
    request: { headers },
  })
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
