'use client';

import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { useDebounceValue } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { signUpSchema } from '@/schema/signUpSchema'
import axios, { AxiosError } from 'axios'
import { Apiresponse } from '@/types/ApiResponse'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Form } from 'react-hook-form';

const Page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [debouncedUsername] = useDebounceValue(username, 300)
  const {toast} =useToast()

  const router =useRouter();

  // zod implementation
  const form =useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      password:'',
    }
  })

  useEffect (() => {
    const checkUsernameUnique =async ()=>{
      setIsCheckingUsername(true)
      setUsernameMessage('')
      try {
       const response = await axios.get(`/api/check-username-unique?
          username=${debouncedUsername}`)
          console.log(response.data.message)
          setUsernameMessage(response.data.message)
      } catch (error) {

        const axiosError = error as AxiosError<Apiresponse>;
        setUsernameMessage(axiosError.response?.data.message ?? "error checing username")

        
      } finally {
        setIsCheckingUsername(false)

      }

    }
    checkUsernameUnique()

  },[debouncedUsername])

  const onSubmit ="hello"
  return (
    <div className=' flex justify-center items-center min-h-screen bg-gray-100'>
     <div className=' w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
      <div className=' text-center'>
        <h1 className=' text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
          Join Mystery Message
        </h1>
      </div>
      <form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className=' space-y-6'>

          <FormField>
            control ={form.control}
            name="username"
            render ={({field}) =(
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
           
                </FormControl>
                <FormDescription>
                  This 
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}

          </FormField>

        </form>

      </form>
     </div>
    </div>
  )
}

export default Page