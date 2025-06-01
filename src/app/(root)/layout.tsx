import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import { isAuthenticated } from '@/lib/actions/Auth.action'

const RootLayout = async ({children}:{children: ReactNode}) => {
  const { isAuthenticated: auth } = await isAuthenticated();

  return (
    <div className='root-layout'>
      <Navbar isAuthenticated={auth} />
      {children}
    </div>
  )
}

export default RootLayout
