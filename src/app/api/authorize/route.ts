

import { NextRequest, NextResponse } from "next/server";
import { kv } from '@vercel/kv'
import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'

const VALIDITY_DURATION = 1000 * 60 // 1 minute validity


export async function GET(request: Request): Promise<NextResponse> {

  // create jwt with avatarId encoded
  // @ts-ignore
  const t = jwt.sign({avatarId: 1}, process.env.JWT_SECRET, {expiresIn: "1m"})
  
  // set cookie on client
  cookies().set("mona-token-gater", t)
  // store ip in kv with exp timestamp

  return NextResponse.json(t)
} 