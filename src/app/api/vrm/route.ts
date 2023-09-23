import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function GET(request: NextRequest): Promise<NextResponse> {
  
  // get ip address of user
  let ip = request.headers.get('x-real-ip') as string;
  console.log(ip)
  const forwardedFor = request.headers.get('x-forwarded-for') as string
  console.log(forwardedFor)
  if(!ip && forwardedFor){
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }
  if(!ip){
    return new NextResponse("No IP found", {status: 400})
  }
  
  return NextResponse.json({ip})



} 