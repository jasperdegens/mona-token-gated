

import { NextRequest, NextResponse } from "next/server";
import { kv } from '@vercel/kv'
import { getIp } from "@/utils/getIp";

const VALIDITY_DURATION = 1000 * 60 * 60// 1 hour validity


export async function GET(request: Request): Promise<NextResponse> {

  // get ip address of user
  const ip = getIp(request)

  if(!ip){
    return new NextResponse('No IP found', {status: 400})
  }

  // get valid avatar ids and store validity time
  const validAvatars = ['1', '2', '3']
  const exp = Date.now() + VALIDITY_DURATION
  await kv.set(ip, JSON.stringify({avatarIds: validAvatars, exp}))

  return NextResponse.json({avatarIds: validAvatars, exp}, {status: 200})
} 