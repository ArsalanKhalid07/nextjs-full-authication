import SignInForm from "@/components/SignInForm"
import Link from "next/link"


const page = () => {
  return (
    <div>
            <SignInForm />
          <Link href="/auth/forget">if you forget password</Link>
    </div>
  )
}

export default page