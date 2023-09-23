import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function GET(request: Request): Promise<NextResponse> {

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/\s*,\s*/)[0] : request.headers.get("cf-connecting-ip");
  console.log(ip)

  if(!ip) {
    return new NextResponse("No ip provided", {status: 400})
  }

  // check if authorized
  const authorized = await kv.get<{exp: number, ownedAvatars: string[]}>(ip)
  // check timestamp validity
  if(authorized && authorized.exp > Date.now()) {
    return new NextResponse(authorized.ownedAvatars.join(","), {status: 200})
  }

  return new NextResponse("No ip provided", {status: 400})


} 