"use client";
import { forgetPassword } from '@/lib/actions/authAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod'

const formType = z.object({
    email:z.string().email("please provide email"),
})

type inputType = z.infer<typeof formType>;

const page = () => {
    const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm<inputType>({
        resolver:zodResolver(formType)
    })

    const forgetSubmmited: SubmitHandler<inputType> = async (data) => {
           try {
                const result = await forgetPassword(data.email);
                toast.success("reset password email send");
                console.log(result)
                reset();
           }catch(e) {
                console.error(e);
                toast.error("something wrong");
           }
    }
  return (
    <div>
        <h2>Forget password</h2>
        <form onSubmit={handleSubmit(forgetSubmmited)}>
            <Input label="Email" {...register("email")} errorMessage={errors?.email?.message} 
            />
            {errors?.email?.message}
            <Button type='submit' > {isSubmitting ? "Please Wait.." : "Submit"}</Button>
        </form>
    </div>
  )
}

export default page