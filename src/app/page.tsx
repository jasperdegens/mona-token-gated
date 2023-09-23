'use client';

import { useCallback, useState } from "react";


export default function Home() {

  const [authorizingState, setAuthorizingState] = useState<'NONE' | 'AUTHORIZING' | 'AUTHORIZED' | 'ERROR'>('NONE')
  const [authResponse, setAuthResponse] = useState<{avatarIds: string[], ip: string} | undefined>(undefined)

  const authorizeIP = useCallback(async () => {
    setAuthorizingState('AUTHORIZING')
    const res = await fetch('/api/authorize')
    if (res.status === 200) {
      setAuthorizingState('AUTHORIZED')
      setAuthResponse(await res.json())
    } else {
      setAuthorizingState('ERROR')
    }
  }, [setAuthorizingState, setAuthResponse])

  const revoke = async () => {
    await fetch('/api/authorize?revoke=true')
  }


  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <div className="bg-white rounded-lg shadow p-12 space-y-6 max-w-lg">
        <h1 className="text-2xl">Welcome to the MonaGater!</h1>
        {!authResponse && (<><p>This service is a propotype for token gating content within Mona virtual spaces. Currently, we use your IP address to assign authorized avatars, but in the future would love to use your wallet address so we can validate ownership of specific NFTs in targeted collections.</p>
        <p>To try it out, press the authorize IP button below, where you will be assigned several avatars you can access. Then enter the Mona playground, and swap the avatars freely!</p></>)}
        {authResponse && <div className='mt-4'>
        <div className='text-lg font-bold'>{`Your IP ${authResponse.ip} is Authorized!`}</div>
        <div className='text-sm'>{`Authorized avatars are: ${authResponse.avatarIds.join(",")}`}</div>
      </div>}
        <div className="w-full mx-auto text-center">
      <button
        className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 w-full max-w-sm"
        onClick={() => {
          authorizeIP()
        }}
        disabled={authorizingState === 'AUTHORIZING'}
        >{authorizingState === 'NONE' ? 'Authorize IP' : authorizingState === 'AUTHORIZING' ? 'Authrizing...' : authorizingState == 'AUTHORIZED' ? 'Authorized' : 'Error'}
      </button> 
      <button
        className="mt-4 px-8 py-4 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 w-full max-w-sm"
        onClick={() => {
          revoke()
        }}
        >Revoke Access
      </button> 
      </div>
      
      </div>



    </main>
  )
}
