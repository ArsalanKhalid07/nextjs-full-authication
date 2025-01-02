import React from 'react'

interface props {
    params:{
        id:string
    }
}

const page = ({params}:props) => {
  return (
    <div>{params.id}</div>
  )
}

export default page