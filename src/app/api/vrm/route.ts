import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getIp } from "@/utils/getIp";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const ip = getIp(request)

  if(!ip){
    return new NextResponse('No IP found', {status: 400})
  }

  // get avatar ids from kv store
  const user = await kv.get<{avatarIds: string[], exp: number}>(ip)

  // validate expiry
  if(!user){
    return new NextResponse('No user with this IP found', {status: 400})
  }

  if(user.exp < Date.now()){
    return new NextResponse('IP has expired', {status: 400})
  }
  
  if(!user.avatarIds){
    return new NextResponse('No avatar ids found', {status: 400})
  }

  return new NextResponse(user.avatarIds.join(','), {status: 200})



} 