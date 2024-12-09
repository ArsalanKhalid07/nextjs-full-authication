import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { z } from "zod"


interface Props {
    callBackUrl?: string
}

const formSchema = z.object({
    email:z.string().email("please provide the valide email"),
    password:z.string({
        required_error:"please provide the password"
    })
})

type inputform = z.infer<typeof formSchema>
const SignInForm = (props: Props) => {
const {} = useForm<inputform>({
    resolver:zodResolver(formSchema)
})

  return (
    <div>
      <form >
            <Input label="email" />
      </form>
    </div>
  )
}

export default SignInForm