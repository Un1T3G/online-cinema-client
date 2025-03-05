import { NextResponse, type NextRequest } from 'next/server'
import { ACCESS_TOKEN_KEY, userService } from 'shared/api'

export async function middleware(request: NextRequest) {
  const isAdminPage = request.url.includes('manage')

  if (isAdminPage) {
    try {
      const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value

      if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

      const profile = await userService.getProfile(accessToken)

      if (profile.role === 'ADMIN') {
        return NextResponse.next()
      }

      return NextResponse.rewrite(new URL('/404', request.url))
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/manage/:path*'],
}
