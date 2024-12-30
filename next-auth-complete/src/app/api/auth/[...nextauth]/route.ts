import prisma from "@/lib/prisma"
import NextAuth from "next-auth"
import { AuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials"
import  bcript from "bcrypt";
import { User } from "@prisma/client";


export const authOptions: AuthOptions = {
    pages:{
        signIn:"/auth/signIn"
    },
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials:{
            username : {
                label: "User Name",
                type: "text",
                placeholder: "Your User Name"
            },
            password:{
                label:"Password ",
                type: "password"
            }
        },
        async authorize(credentials) {
            const user = await prisma.user.findUnique({
                where:{
                    email:credentials?.username
                }
            })
            if(!user) throw new Error("user name or password is not correct");
               // this is naive way of comparing the password
                // const isPasswordCorrect = credentials?.password === user.password;
            if(!credentials?.password) throw new Error("please provide your password");
            const isPasswordCorrect =  await bcript.compare(credentials.password,user.password);
            if(!isPasswordCorrect) throw new Error("user name or password is not correct")
            const {password,...userWithoutPass} = user;
            return userWithoutPass;
            },  
    })
  ],
  callbacks:{
    async jwt({token,user}){
        if(user) token.user = user as User;
        return token
    },
    async session({token,session}){
        session.user = token.user;
        return session;
    }
  }
}
const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST};