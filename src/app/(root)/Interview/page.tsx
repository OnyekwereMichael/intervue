import Agents from '@/app/components/Agents'
import { getCurrentUser } from '@/lib/actions/Auth.action'
import React from 'react'

const page = async () => {
  const user = await getCurrentUser()
  return (
    <>
        <h3>Interview Generation</h3>

        <Agents userName={user?.username || 'Guest'} userId={user?.id} type='generate'/>
    </>
  )
}

export default page
