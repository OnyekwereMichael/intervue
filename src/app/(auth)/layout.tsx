import { isAuthenticated } from '@/lib/actions/Auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const AuthLayout = async ({children}:{children: ReactNode}) => {
     const { isAuthenticated: auth } = await isAuthenticated()

  if (auth) redirect('/')

  return (
    <div className='auth-layout'>
       {children}
    </div>
  )
}

export default AuthLayout
