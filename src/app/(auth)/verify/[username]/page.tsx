// 'use client'
// import { verifySchema } from '@/schema/verifySchema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Resolver } from 'dns'
// import { useParams, useRouter } from "next/navigation";
// import React, { useState } from 'react'
// import z from 'zod'
// import { useForm } from 'react-hook-form'
// import ToastDemo from '@/components/ui/ToastDemo'
// import { AxiosError } from 'axios'
// import { Apiresponse } from '@/types/ApiResponse'
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Form } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import axios from 'axios'

// const page=()=> {

    
//       // Toast state
//       const [toastOpen, setToastOpen] = useState(false);
//       const [toastTitle, setToastTitle] = useState("");
//       const [toastMessage, setToastMessage] = useState("");
//     const router =useRouter()
    
//     const params = useParams<{ username: string }>();

//      const form = useForm<z.infer<typeof verifySchema>>({
//     resolver: zodResolver(verifySchema),
//   });


 
//     const onSubmit =async(data:z.infer<typeof verifySchema>) =>{
//     try{
//     const response =   await axios.post(`/api/verify-code`,{
//     username:params.username,
//     code:data.code

  


//      })
//     setToastTitle("Success");
//     setToastMessage(response.data.message);
//     setToastOpen(true);
//     router.replace('sign-in')
    


//     }catch(error) {

//         console.error("Error in signup of user",error)
//         const axiosError = error as AxiosError<Apiresponse>;
//         } 

//     setToastTitle("Signup Failed");
//     setToastOpen(true);

//     }
// }

//   return (
//     <div className=' flex justify-center items-center min-h-screen bg-gray-100'>
//       <div className=' w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
//         <div className=' text-center'>
//              <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Verification Code</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="code"
//                       {...field}
                      
//                     />
//                   </FormControl>
                 

//                   <FormMessage />
                
                
//                 </FormItem>
//               )}
//             />

           


//             <Button type="submit" >Submit  </Button>
//           </form>
//         </Form>

//         </div>

//       </div>
//     </div>
//   )

// export default page


"use client";

import { verifySchema } from "@/schema/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import ToastDemo from "@/components/ui/ToastDemo";
import axios, { AxiosError } from "axios";
import { Apiresponse } from "@/types/ApiResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const router = useRouter();
  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      setToastTitle("Success");
      setToastMessage(response.data.message);
      setToastOpen(true);

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in verifying code", error);
      const axiosError = error as AxiosError<Apiresponse>;

      setToastTitle("Verification Failed");
      setToastMessage(axiosError.response?.data?.message ?? "Something went wrong");
      setToastOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>

      <ToastDemo
        open={toastOpen}
        setOpen={setToastOpen}
        title={toastTitle}
        description={toastMessage}
      />
    </div>
  );
};

export default Page;
