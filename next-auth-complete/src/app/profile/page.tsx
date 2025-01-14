import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

 const page = async () => {
    const section = await getServerSession(authOptions)
    const user = section?.user;
    // if(!section || !section.user  ) return redirect("/")
  return (
    <div>
        <img  src={user?.image??""}/>
        <div className='flex justify-center space-x-5'>
            <div>name:</div>
            <div>{user?.firstName}</div>
        </div>
        <div className='flex justify-center space-x-5'>
            <div>phone:</div>
            <div>{user?.phone}</div>
        </div>
        <div className='flex justify-center space-x-5'>
            <div>email:</div>
            <div>{user?.email}</div>
        </div>
    </div>
  )
}
export default page; 