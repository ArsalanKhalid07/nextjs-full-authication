"use client"
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
    const {data: section} = useSession();
    console.log("here a",section)
    return (
        <>
        {section && section.user ? 
        <>
        {section.user.firstName + " " + section.user.lastName}
        <Link href={"/api/auth/signout"}>signout</Link>
        </>
        :
        <>
            <Button as={Link} href="/api/auth/signin">Sign in</Button>
            <Button as={Link} href="/auth/signup
            ">Sign up</Button>
        </>    
    }   
        </>
    )
}

export default SigninButton;