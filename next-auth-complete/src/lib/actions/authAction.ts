"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcript from "bcrypt";
import { compileActivationTemplate, sendMail } from "../mail";

export async function resgisterUser(user: Omit<User,"id"|"emailVerified"|"image">) {
    const result = await prisma.user.create({
        data:{
            ...user,
            password: await bcript.hash(user.password,10)
        }
    })

    const activationUrl =`${process.env.NEXTAUTH_URL}/auth/activation/${result.id}`
    const body = compileActivationTemplate(user.firstName,activationUrl)
    await sendMail({to:user.email,subject:"Activate your account",body})
    return result;
}