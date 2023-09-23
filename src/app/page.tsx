'use client';

import { useCallback, useState } from "react";


export default function Home() {

  const [authorizingState, setAuthorizingState] = useState<'NONE' | 'AUTHORIZING' | 'AUTHORIZED' | 'ERROR'>('NONE')

  const authorizeIP = useCallback(async () => {
    setAuthorizingState('AUTHORIZING')
    const res = await fetch('/api/authorize')
    if (res.status === 200) {
      setAuthorizingState('AUTHORIZED')
    } else {
      setAuthorizingState('ERROR')
    }
  }, [setAuthorizingState])


  return (
    <main className='w-full h-full flex justify-center items-center'>

      <button
        className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-700"
        onClick={() => {
          authorizeIP()
        }}
        disabled={authorizingState === 'AUTHORIZING'}
        >{authorizingState === 'NONE' ? 'Authorize IP' : authorizingState === 'AUTHORIZING' ? 'Authrizing...' : authorizingState == 'AUTHORIZED' ? 'Authorized' : 'Error'}
      </button> 

    </main>
  )
}
