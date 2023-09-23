

import { NextRequest, NextResponse } from "next/server";
import { kv } from '@vercel/kv'
import { getIp } from "@/utils/getIp";

const VALIDITY_DURATION = 1000 * 60 * 60// 1 hour validity


export async function GET(request: Request): Promise<NextResponse> {

  // get search params
  const params = new URL(request.url).searchParams

  
  // get ip address of user
  const ip = getIp(request)
  
  if(!ip){
    return new NextResponse('No IP found', {status: 400})
  }
  
  // revoke access
  if(params.get('revoke')){
    await kv.set(ip, JSON.stringify({avatarIds: [], exp: 0}))
    return new NextResponse('Access revoked', {status: 200})
  }
  
  // get valid avatar ids and store validity time

  // randomly select 3 avatars
  const validAvatars = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)].map((id) => id.toString())
  const exp = Date.now() + VALIDITY_DURATION
  await kv.set(ip, JSON.stringify({avatarIds: validAvatars, exp}))

  return NextResponse.json({avatarIds: validAvatars, exp}, {status: 200})
} 