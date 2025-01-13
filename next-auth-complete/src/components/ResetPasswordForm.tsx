"use client"
import { ResetpasswordAction } from "@/lib/actions/authAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

interface Props {
    jwtUserId: string
}

const formType = z.object({
    password: z.string()
    .min(6,"please enter password more then 6 charter")
    .max(30,"please enter password more then 30 charter"),
    confrimPassword:z.string()
}).refine(data => data.password === data.confrimPassword,{
    message:"Password does not match",
    path:["confrimPassword"]
});

type inputField = z.infer<typeof formType>
const ResetPasswordForm = ({jwtUserId}: Props) => {

    const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm<inputField>({
        resolver: zodResolver(formType)
    })

    const resetPass:SubmitHandler<inputField> = async (data ) => {
        try {
                const result = await ResetpasswordAction(jwtUserId,data.password);
                if(result === "success") {
                    toast.success("your password reset sucessfully")
                } 
        }catch(err) {
            toast.error("some thing wrong")
            console.log(err);
        }
    }
  return (
    <>
        <h2>Reset Password Form</h2>
        <form onSubmit={handleSubmit(resetPass)}>
            <Input label="password" {...register("password")} errorMessage={errors.password?.message} /> 
            {errors.password?.message}
            <Input label="confrim password" {...register("confrimPassword")} errorMessage={errors.confrimPassword?.message} /> 
            {errors.confrimPassword?.message}
            <Button type="submit"  isDisabled={isSubmitting}>{isSubmitting ? "Please wait..." : "submit"} </Button>
        </form>
    </>
  )
}

export default ResetPasswordForm