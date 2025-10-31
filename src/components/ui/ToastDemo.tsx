"use client"

import * as React from "react"
import * as Toast from "@radix-ui/react-toast"
import { Button } from "@/components/ui/button"

export default function ToastDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <Toast.Provider>
      <Button onClick={() => setOpen(true)}>Show Toast</Button>

      <Toast.Root
        className="bg-gray-900 text-white px-4 py-3 rounded shadow-lg"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="font-bold">Success!</Toast.Title>
        <Toast.Description className="text-sm">
          Your action completed successfully.
        </Toast.Description>
        <Toast.Action
          asChild
          altText="Dismiss"
        >
          <button
            className="ml-4 text-blue-400 hover:text-blue-300"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 w-[300px]" />
    </Toast.Provider>
  )
}
