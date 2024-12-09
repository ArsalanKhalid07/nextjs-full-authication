"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcript from "bcrypt";

export async function resgisterUser(user: Omit<User,"id"|"emailVerified"|"image">) {
    const result = await prisma.user.create({
        data:{
            ...user,
            password: await bcript.hash(user.password,10)
        }
    })
}