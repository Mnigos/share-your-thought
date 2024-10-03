'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@repo/ui/components/form'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@repo/ui/components/input'

import { SubmitButton } from '../submit-button'

import { connect } from '~/server/actions/auth'

const loginSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required.',
    })
    .min(1, 'Name is required.'),
})

type LoginSchema = z.infer<typeof loginSchema>

export function ConnectForm() {
  const router = useRouter()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const [pending, startTransition] = useTransition()

  function onSubmit({ name }: LoginSchema) {
    startTransition(async () => {
      await connect(name)
    })

    router.push('/thoughts')
  }

  return (
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

                <SubmitButton
                  pending={pending}
                  texts={['Connect', 'Connecting...']}
                />
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
