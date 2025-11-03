// "use client";

// import React, {  useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useRouter } from "next/navigation";
// import { signInSchema } from "@/schema/signInSchema";


// import ToastDemo from "@/components/ui/ToastDemo";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth/react";
// const Page = () => {

  
//   const router = useRouter();

//   // Toast state
//   const [toastOpen, setToastOpen] = useState(false);
//   const [toastTitle, setToastTitle] = useState("");
//   const [toastMessage, setToastMessage] = useState("");

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       identifier: "",
//       password: "",
//     },
//   });


 
//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    


//     const result =  await  signIn ('credentials',{
//         identifier:data.identifier,
//         password:data.password,
//       })

//       if(result?.error) {
//         if(result.error=='CredentialsSignin') {
//           setToastTitle("Login Failed");
//           setToastOpen(true);
//         }
//         else {
//           setToastTitle("Login Failed");
//           setToastOpen(true);
//            setToastMessage(result.message)

//         }
     
//       }
      
//       if(result?.url) {  
//         router.replace('/dashboard')

//       }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Join Mystery Message
//           </h1>
//           <p className=" mb-4">Sign in to start your anaonymous adventure</p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="identifier"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username/Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="username/email"
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(e);
//                         setUsername(e.target.value);
//                       }}
//                     />
//                   </FormControl>
                
//                   <FormMessage />
                
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//            <Button type="submit">Signin</Button>
//           </form>
//         </Form>

      
//       </div>

//       <ToastDemo
//         title={toastTitle}
//         message={toastMessage}
//         open={toastOpen}
//         setOpen={setToastOpen}
//       />
//     </div>
//   )
// }
// export default Page;


"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schema/signInSchema";
import ToastDemo from "@/components/ui/ToastDemo";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const Page = () => {
  const router = useRouter();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      setToastTitle("Login Failed");
      setToastMessage(result.error);
      setToastOpen(true);
      return;
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username/Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username/email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Signin</Button>
          </form>
        </Form>
      </div>

      <ToastDemo
        title={toastTitle}
        message={toastMessage}
        open={toastOpen}
        setOpen={setToastOpen}
      />
    </div>
  );
};

export default Page;
