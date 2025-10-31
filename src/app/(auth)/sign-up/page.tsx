// "use client";

// import React, { useEffect, useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useDebounceValue } from "usehooks-ts";
// import { useRouter } from "next/navigation";
// import { signUpSchema } from "@/schema/signUpSchema";
// import axios, { AxiosError } from "axios";
// import { Apiresponse } from "@/types/ApiResponse";
// import { Loader2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Form } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { title } from "process";
// import { Button } from "@react-email/components";

// const Page = () => {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [debouncedUsername] = useDebounceValue(username, 300);
//   const { toast } = useToast();

//   const router = useRouter();

//   // zod implementation
//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       setIsCheckingUsername(true);
//       setUsernameMessage("");
//       try {
//         const response = await axios.get(`/api/check-username-unique?
//           username=${debouncedUsername}`);
//         console.log(response.data.message);
//         setUsernameMessage(response.data.message);
//       } catch (error) {
//         const axiosError = error as AxiosError<Apiresponse>;
//         setUsernameMessage(
//           axiosError.response?.data.message ?? "error checing username"
//         );
//       } finally {
//         setIsCheckingUsername(false);
//       }
//     };
//     checkUsernameUnique();
//   }, [debouncedUsername]);

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post<Apiresponse>("/api/sign-up", data);
//       toast({
//         title: "success",
//         description: response.data.message,
//       });
//       router.replace(`/verify/${username}`);
//       setIsSubmitting(false);
//     } catch (error) {
//       console.log("Error in signup of user", error);
//       const axiosError = error as AxiosError<Apiresponse>;
//       let errorMessage = axiosError.response?.data.message;
//       toast({
//         title: "signup failed",
//         description: errorMessage,
//         variant: "destructive",
//       });
//       setIsSubmitting(false);
//     }
//   };
//   return (
//     <div className=" flex justify-center items-center min-h-screen bg-gray-100">
//       <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className=" text-center">
//           <h1 className=" text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Join Mystery Message
//           </h1>
//         </div>
//         <form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
//             <FormField
//               control={form.control}
//               name="Username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="username"
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
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>email</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="email"
//                       {...field}
//                       // onChange={(e) => {
//                       //   field.onChange(e);
//                       //   setUsername(e.target.value);
//                       // }}
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
//                     <Input
//                       type="password"
//                       placeholder="password"
//                       {...field}
//                       // onChange={(e) => {
//                       //   field.onChange(e);
//                       //   setUsername(e.target.value);
//                       // }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Sign up"
//               )}
//             </Button>
//           </form>
//         </form>
//         <div className=" text-center mt-4">
//           <p>
//             Already a member?{""}
//             <Link
//               href={"/sign-in"}
//               className=" text-blue-600 hover:text-blue-800"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schema/signUpSchema";
import axios, { AxiosError } from "axios";
import { Apiresponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";
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

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedUsername] = useDebounceValue(username, 300);
  const router = useRouter();

  // Toast state
  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (!debouncedUsername) return;
      setIsCheckingUsername(true);
      setUsernameMessage("");

      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${debouncedUsername}`
        );
        let message = response.data.message;
        setUsernameMessage(message);
      } catch (error) {
        const axiosError = error as AxiosError<Apiresponse>;
        setUsernameMessage(
          axiosError.response?.data.message ?? "Error checking username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<Apiresponse>("/api/sign-up", data);

      // ✅ Success toast
      setToastTitle("Success");
      setToastMessage(response.data.message);
      setToastOpen(true);

      router.replace(`/verify/${data.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;

      // ❌ Error toast
      setToastTitle("Signup failed");
      setToastMessage(axiosError.response?.data.message ?? "Unknown error");
      setToastOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className=" animate-spin" />}

                  <FormMessage />
                  {isCheckingUsername && (
                    <p className="text-sm text-gray-500">Checking...</p>
                  )}
                  {usernameMessage && (
                    <p className="text-sm text-green-600">{usernameMessage}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ✅ Toast Component */}
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
