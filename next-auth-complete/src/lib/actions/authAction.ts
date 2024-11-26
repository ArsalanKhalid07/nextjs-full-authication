"use server";

import { User } from "@prisma/client"
import prisma from "../prisma"

export async function resgisterUser(user: Omit<User,"id"|"emailVerified"|"image">) {
    const result = await prisma.user.create({
        data:user
    })
}