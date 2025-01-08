

interface Props {
    params:{
        jwt: string
    }
}

const page = ({params}:Props) => {
  return (
    <div> Reset page{params.jwt}</div>
  )
}

export default page