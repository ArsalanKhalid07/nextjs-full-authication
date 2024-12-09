"use client"
import { resgisterUser } from "@/lib/actions/authAction"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Input } from "@nextui-org/react"
import { passwordStrength } from "check-password-strength"
import React, { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import validator from "validator"
import { z } from "zod"


const formSchema = z.object({
    firstName: z.
    string()
    .min(2,"fisrt name should be min 2 character")
    .max(42,"fisrt name should be max 42 character")
    .regex(new RegExp("^[a-zA-Z]+$"),"no specail charater are allowed!"),

    lastName: z.
    string()
    .min(2,"last name should be min 2 character")
    .max(42,"last name should be max 42 character")
    .regex(new RegExp("^[a-zA-Z]+$"),"no specail charater are allowed!"),

    email:z.string().email("please enter a valid email"),

    phone:z.string().refine(validator.isMobilePhone,"plz provide the valid phone number"),

    password:z.string()
    .min(6,"password must be greater then 6 charater")
    .max(50,"passord must be less then 40 charater"),

    confrimPassword:z.string()
    .min(6,"password must be greater then 6 charater")
    .max(50,"passord must be less then 40 charater"),

    accepted: z.literal(true,{
        errorMap:() => ({
             message:"plz accept the terms and conditions"
        })
       
    })
}).refine(data => data.password === data.confrimPassword ,{
    message: "passord and confrim password not match",
    path:["confrimPassword"]
}
)


type inputType = z.infer<typeof formSchema>;
const Signup = () => {
  
   
    const {register,handleSubmit,reset,formState:{errors},watch} = useForm<inputType>(
        {resolver: zodResolver(formSchema),}
    );

    const [passStrength,setPassStrength] = React.useState(0)

    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id)
    },[watch().password])

    const saveData: SubmitHandler<inputType> = async (data) => {
        const {accepted,confrimPassword,...user} = data;
        try {
            const  result = await resgisterUser(user);
            toast.success("sucessfully added");
        }catch(err) {
            toast.error("some thing is wrong");
            console.error(err);
        }
    }

  return (
    <form className="w-96 m-auto space-y-3 " onSubmit={handleSubmit(saveData)}>
        <Input errorMessage={errors?.firstName?.message} isInvalid={!!errors.firstName} {...register("firstName")} type="text" label="first name" />
        <Input errorMessage={errors?.lastName?.message} isInvalid={!!errors.lastName} {...register("lastName")} type="text" label="last name" />
        <Input errorMessage={errors?.email?.message} isInvalid={!!errors.email} {...register("email")} type="email" label="email" />
        <Input  errorMessage={errors?.phone?.message} isInvalid={!!errors.phone} {...register("phone")} type="text" label="phone number" />
        <Input errorMessage={errors?.password?.message} isInvalid={!!errors.password} {...register("password")} type="password" label="password" />
        {passStrength == 3 ? "strong password" : passStrength == 1 ? "weak password" :  passStrength == 2 ? "medium password" : "" }
        <Input errorMessage={errors?.confrimPassword?.message} isInvalid={!!errors.confrimPassword} {...register("confrimPassword")} type="password" label="confrim password" />
        <Checkbox {...register("accepted")}  > accpet the terms and conditions</Checkbox>
        <p className="text-tiny text-danger">{errors?.accepted?.message}</p>
        <Button type="submit" className=" w-40  m-auto mb-10" > Submit</Button> 
        
        



    </form>
  )
}

export default Signup