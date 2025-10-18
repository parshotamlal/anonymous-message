import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { Apiresponse } from "@/types/ApiResponse";

export async function  sendVerificationEmail(
email:string,
username:string,
verifyCode:string,
):Promise<Apiresponse> {
    try{
        await resend.emails.send({
  from: 'parshotamworks@gmail.com',
  to: 'email',
  subject: 'Verification code',
  react: VerificationEmail({username,otp:verifyCode}),
});
        return {success:true,message:"Verification email send successfully "}

    } catch (emailError) {
        console.log("Error sending verification email",emailError);
        return {success:false,message:"Falied to send verification email"}


    }
}
    
