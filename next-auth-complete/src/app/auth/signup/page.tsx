
import Signup from '@/components/Signup'
import { Link } from '@nextui-org/react'
import React from 'react'

const page = () => {
  return (
    <div className="formstyle">
         <Signup />
    <div className="flex justify-center">
        <p>already signup ?</p>
        <Link href="/auth/signin">sign in</Link>
    </div>
 
    </div>
  )
}

export default page