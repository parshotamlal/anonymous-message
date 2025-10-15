import {z} from "zod";


export const signInSchema = z.object({

    content:z
    .string()
    .min(10,{message:"Content must be at least  od 10 characters"})
    .max(300,{message:"content must be no least 300 charcters "}) 

})