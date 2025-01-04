import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { activateEmail } from "./emailTemplate/activate";

export const sendMail = async ({to,subject,body}:{to:string,subject:string,body:string}) => {
    const {SMPT_EMAIL,SMPT_EMAIL_PASS} = process.env;
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:SMPT_EMAIL,
            pass:SMPT_EMAIL_PASS
        },
    });
    try {
        const testResult = await transport.verify();
        console.log("testResult of transport::",testResult)
    }catch(e) {
        console.log(e);
    }
    try {
        const sendResult = transport.sendMail({
            from:SMPT_EMAIL,
            to,
            subject,
            html:body,
        })

        console.log("sendResult transport here::",sendResult)
    } catch(e) {
        console.log(e);
    }
}

export const compileActivationTemplate = (name:string,url:string) => {
    const template = Handlebars.compile(activateEmail);
    const htmlBody = template({
        name,
        url,
    });
    return htmlBody;
}