'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { login } from '../../actions/auth'
import { SubmitButton } from '../../components/submit-button'

const loginSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required.',
    })
    .min(1, 'Name is required.'),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginPage() {
  const pathname = usePathname()
  const router = useRouter()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const [pending, startTransition] = useTransition()

  function onSubmit({ name }: LoginSchema) {
    startTransition(async () => {
      await login(name)
    })

    router.push('/thoughts')
  }

  return (
    <Dialog
      defaultOpen={true}
      open={pathname === '/login'}
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

        <Form {...form}>
          <form
            className="flex w-full gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Name</FormLabel>

                  <div className="flex w-full gap-2">
                    <FormControl>
                      <Input {...field} placeholder="your nickname" />
                    </FormControl>

                    <SubmitButton pending={pending} />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
