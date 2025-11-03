'use client'
import React, { useState } from 'react'

function page() {

  const [messages,setMessages]=useState<Message[]>([])
  const [isLoading,setIsLoading] useState(false)
  const [isSwitchLoading,setIsSwitchLoading]=useState(false)
  return (
    <div>
      Dashboard
    </div>
  )
}

export default page
