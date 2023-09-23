

import { NextRequest, NextResponse } from "next/server";
import { kv } from '@vercel/kv'

const VALIDITY_DURATION = 1000 * 60 // 1 minute validity


export async function GET(request: Request): Promise<NextResponse> {

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/\s*,\s*/)[0] : request.headers.get("cf-connecting-ip");
  if(!ip) {
    return new NextResponse("No ip provided", {status: 400})

  }
  // store ip in kv with exp timestamp
  const exp = Date.now() + VALIDITY_DURATION
  const ownedAvatars = [1, 2, 3, 4, 5]
  await kv.set(ip, {exp: exp, ownedAvatars: ownedAvatars})

  return NextResponse.json({ip: ip, exp: exp})
} 