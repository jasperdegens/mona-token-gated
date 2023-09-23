
function getIp(request: Request): string | undefined {
  // get ip address of user
  let ip: string | undefined = request.headers.get('x-real-ip') as string;
  const forwardedFor = request.headers.get('x-forwarded-for') as string
  if(!ip && forwardedFor){
    ip = forwardedFor?.split(",").at(0) ?? undefined;
  }
  console.log(ip)
  return ip
}

export {
  getIp
}