'use client'

import { Button } from '@repo/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { login } from '../../actions/login'

export default function LoginPage() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(pathname === '/login')
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const name = formData.get('name')

    if (!name) return

    await login(name.toString())

    setIsOpen(false)

    redirect('/thoughts')
  }

  return (
    <Dialog
      defaultOpen={true}
      open={isOpen}
      onOpenChange={isOpen => {
        if (!isOpen) router.push('/')
      }}
    >
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader className="flex justify-center">
          <DialogTitle className="text-center text-3xl">
            Let&apos;s get started
          </DialogTitle>
        </DialogHeader>

        <form className="flex w-full items-end gap-2" action={handleSubmit}>
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input placeholder="your nickname" id="name" name="name" />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
