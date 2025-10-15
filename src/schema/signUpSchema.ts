import { z} from "zod";

export const usernameValidation =z
.string()
.min(2,"Username must be at Least 2 charcters")
.max(20,"Username must be at Most 20 characters")
.regex(/^\S+@\S+\.\S+$/,"Username must not conatain special charcters")


export const signUpSchema = z.object({
    username: usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password must be at Least 6 characters"})
})