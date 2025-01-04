"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import Email from 'next-auth/providers/email'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'

const formType = z.object({
    email:z.string().email("please provide email") 
})

type inputType = z.infer<typeof formType>;

const page = () => {
    const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm<inputType>({
        resolver:zodResolver(formType)
    })

    const forgetSubmmited: SubmitHandler<inputType> = async (data) => {
            console.log("forget password:" , data)
    }
  return (
    <div>
        <h2>Forget password</h2>
        <form onSubmit={handleSubmit(forgetSubmmited)}>
            <Input label="Email" {...register("email")} errorMessage={errors.email?.message} 
            />
            <Button type='submit' disabled={isSubmitting}> {isSubmitting ? "Please Wait.." : "Submit"}</Button>
        </form>
    </div>
  )
}

export default page