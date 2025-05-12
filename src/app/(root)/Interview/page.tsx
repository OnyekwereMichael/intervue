import Agents from '@/app/components/Agents'
import React from 'react'

const page = () => {
  return (
    <>
        <p>Interview Generation</p>

        <Agents userName='You' userId='user1' type='generate'/>
    </>
  )
}

export default page
