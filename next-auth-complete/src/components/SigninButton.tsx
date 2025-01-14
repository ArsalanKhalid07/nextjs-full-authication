"use client"
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
    const {data: section} = useSession();
    return (
        <>
        {section && section.user ? 
        <>
        <Link href="/profile">{section.user.firstName + " " + section.user.lastName}</Link>
        <Link href={"/api/auth/signout"}>signout</Link>
        </>
        :
        <>
            <Button onClick={() => signIn()}>Sign in</Button>
            <Button as={Link} href="/auth/signup
            ">Sign up</Button>
        </>    
    }   
        </>
    )
}

export default SigninButton;