
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let ip = request.ip ?? request.headers.get('x-real-ip')
  const forwardedFor = request.headers.get('x-forwarded-for')
  if(!ip && forwardedFor){
    ip = forwardedFor.split(',').at(0) ?? 'Unknown'
  }
  const requestHeaders = new Headers(request.headers)
  const response = NextResponse.next({
    request,
    headers: requestHeaders
  })
  response.headers.set('x-real-ip', ip ? ip : 'Unknown')
  return response;
}

export const config = {
  matcher: '/api/:path*'
}