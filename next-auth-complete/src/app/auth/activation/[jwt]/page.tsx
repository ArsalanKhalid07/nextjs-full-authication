import { UseraActivation } from '@/lib/actions/authAction'
import React from 'react'

interface props {
    params:{
        jwt:string
    }
}

const page = async ({params}:props) => {
  const result = await UseraActivation(params.jwt);
  return (
    <div>
      {
        result == "userNotExit" ? <p>no user found</p> : 
        result == "alreadyVerify" ? <p>user already verified</p> : 
        result == "sucess" ? <p>user now activated</p> :
        <p>opps some thingh wrong</p> 

      }
    </div>
  )
}

export default page