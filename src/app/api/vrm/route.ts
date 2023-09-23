import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'

export async function GET(request: Request): Promise<NextResponse> {
  
  // get jwt from cookie
  const token = cookies().get("mona-token-gater")?.value
  // check if token is valid
  if(!token) {
    return new NextResponse("No token provided", {status: 400})
  }

  try {
    // @ts-ignore
    const validToken = jwt.decode(token, process.env.JWT_SECRET)
    if(!validToken || validToken.avatarId === undefined ) {
      return new NextResponse("No Valid Avatar Id", {status: 400})
    }
    return new NextResponse(validToken.avatarId, {status: 200})
  }
  catch(e) {
    console.log(e)
  }
  return new NextResponse("Invalid token", {status: 400})
  
  

} 