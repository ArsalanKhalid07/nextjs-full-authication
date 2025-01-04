"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcript from "bcrypt";
import { compileActivationTemplate, sendMail } from "../mail";
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
