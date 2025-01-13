import ResetPasswordForm from "@/components/ResetPasswordForm"
import { verifyJwt } from "@/lib/jwt"


interface Props {
    params:{
        jwt: string
    }
}

const page = ({params}:Props) => {

  const payload = verifyJwt(params.jwt)
    if(!payload) {
      return <div className="text-red-600">
        url not correct
      </div>
    }
  return (
    <div>
      <ResetPasswordForm jwtUserId={params.jwt} />
    </div>
  )
}

export default page