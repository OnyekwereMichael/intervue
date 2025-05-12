import  { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import { isAuthenticated } from '@/lib/actions/Auth.action';
import { redirect } from 'next/navigation';

const RootLayout = async ({children}:{children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
   if(!isUserAuthenticated) {
  redirect('/sign-in')
   }
  return (
    <div className='root-layout'>
      <Navbar />
       {children}
    </div>
  )
}

export default RootLayout
