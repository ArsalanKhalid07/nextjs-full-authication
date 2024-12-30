"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input,Link } from "@nextui-org/react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
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
  const router: any = useRouter();
  const [visible,setVisible] = useState(false)
  const visi = () => {
    setVisible(!visible);
  }
const {handleSubmit,register,formState:{errors, isSubmitting}} = useForm<inputform>({
    resolver:zodResolver(formSchema)
})
const onSubmit : SubmitHandler<inputform> = async (data) => {
    const result = await signIn("credentials",{
      redirect:false,
      username: data.email,
      password:data.password
    });
    if(!result?.ok) {
      toast.error(result?.error);
      return;
    } 

    router.push(props.callBackUrl ? props.callBackUrl : "/");
}

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 " >
            <Input label="email" {...register("email")} errorMessage={errors.email?.message}/>
            <Input label="password" type={visible ? "text" : "password"} {...register("password")} errorMessage={errors.password?.message} endContent={<div onClick={() => visi()}>see pass</div>}/>
            <div className="flex items-center justify-center">
              <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>{isSubmitting ? "singin..." : "Sign in"}</Button>
              <Button as={Link} href="/auth/signup">Sign up</Button>
            </div>
      </form>
    </div>
  )
}

export default SignInForm