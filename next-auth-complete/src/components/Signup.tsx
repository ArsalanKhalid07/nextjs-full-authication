import { Button, Checkbox, Input } from "@nextui-org/react"
import validator from "validator"
import { z } from "zod"


const formSchema = z.object({
    firstname: z.
    string()
    .min(2,"fisrt name should be min 2 character")
    .max(42,"fisrt name should be max 42 character")
    .regex(new RegExp("^[a-zA-Z]+$","no specail charater are allowed!")),

    lastname: z.
    string()
    .min(2,"last name should be min 2 character")
    .max(42,"last name should be max 42 character")
    .regex(new RegExp("^[a-zA-Z]+$","no specail charater are allowed!")),

    email:z.string().email("please enter a valid email"),

    phone:z.string().refine(validator.isMobilePhone,"plz provide the valid phone number"),

    password:z.string()
    .min(6,"password must be greater then 6 charater")
    .max(50,"passord must be less then 40 charater"),

    confrimPassword:z.string()
    .min(6,"password must be greater then 6 charater")
    .max(50,"passord must be less then 40 charater"),

    accepted: z.literal(true,{
        errorMap:() => ({
             message:"plz accept the terms and conditions"
        })
       
    })
}).refine(data => data.password === data.confrimPassword ,{
    message: "passord and confrim password not match",
    path:["password","confrimPassword"]
}
)

const Signup = () => {
  return (
    <form className="w-96 m-auto space-y-3 ">
        <Input type="text" label="first name" />
        <Input type="text" label="last name" />
        <Input type="email" label="email" />
        <Input type="text" label="phone number" />
        <Input type="password" label="password" />
        <Input type="password" label="confrim password" />
        <Checkbox> accpet the terms and conditions</Checkbox>
        <Button type="submit" className=" w-40  m-auto mb-10" > Submit</Button> 
        
        



    </form>
  )
}

export default Signup