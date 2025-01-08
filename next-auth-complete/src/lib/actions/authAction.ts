"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcript from "bcrypt";
import { compileResetTemplate, compileActivationTemplate, sendMail } from "../mail";
import { signJwt, verifyJwt } from "../jwt";
import { data } from "framer-motion/client";

export async function resgisterUser(user: Omit<User,"id"|"emailVerified"|"image">) {
    const result = await prisma.user.create({
        data:{
            ...user,
            password: await bcript.hash(user.password,10)
        }
    })

    const jwtSignId = signJwt({
        id:result.id
    })
    const activationUrl =`${process.env.NEXTAUTH_URL}/auth/activation/${jwtSignId}`
    const body = compileActivationTemplate(user.firstName,activationUrl)
    await sendMail({to:user.email,subject:"Activate your account",body})
    return result;
}


type ActivateUserFun = (jwtUserId: string) => Promise<"userNotExit" | "alreadyVerify" | "sucess">;


export const  UseraActivation: ActivateUserFun = async (jwtUserID) => {
    const payload = verifyJwt(jwtUserID);
    const userId = payload?.id;
    const user = await prisma.user.findUnique({
        where: {
            id:userId
        }
    });
    if(!user) return "userNotExit";
    if(user.emailVerified) return "alreadyVerify";
    const result = await prisma.user.update({
        where: {
            id:userId
        },
        data:{
            emailVerified: new Date()
        }
    });

    return "sucess";
} 

export const forgetPassword = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
    });

    if(!user) throw new Error("the user does not exist!")
        const jwtUserId = signJwt({
            id:user.id
        })
      
     const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`   

     const body = compileResetTemplate(user.firstName,resetPassUrl);
     const sendResult = await sendMail({to:user.email,subject:"reset your password",body:body});
     return sendResult;
} 