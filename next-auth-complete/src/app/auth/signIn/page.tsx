import SignInForm from "@/components/SignInForm"
import Link from "next/link"

interface props {
  searchParams: {
    callbackUrl?: string
  }
}

const page = ({searchParams}:props) => {
  console.log("searchsearch",searchParams)
  return (
    <div>
            <SignInForm callBackUrl={searchParams.callbackUrl}/>
          <Link href="/auth/forget">if you forget password</Link>
    </div>
  )
}

export default page