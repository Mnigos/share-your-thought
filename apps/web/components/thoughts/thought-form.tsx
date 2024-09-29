'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/components/form'
import { Textarea } from '@repo/ui/components/textarea'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SubmitButton } from '../submit-button'

import { createThought, editThought } from '~/server/actions/thoughts'
import type { Thought } from '~/server/types/thoughts'

const thoughtSchema = z.object({
  content: z
    .string({
      required_error: 'Content is required.',
    })
    .min(5, 'Content must have at least 5 characters.'),
})

type ThoughtSchema = z.infer<typeof thoughtSchema>

namespace ThoughtForm {
  export type Props = Readonly<{
    thought?: Pick<Thought, 'content' | 'id'>
  }>
}

function ThoughtForm({ thought }: ThoughtForm.Props) {
  const router = useRouter()
  const form = useForm<ThoughtSchema>({
    resolver: zodResolver(thoughtSchema),
    defaultValues: {
      content: thought?.content ?? '',
    },
  })
  const [pending, startTransition] = useTransition()

  function onSubmit({ content }: ThoughtSchema) {
    startTransition(async () => {
      await (thought
        ? editThought(content, thought.id)
        : createThought(content))
    })

    form.reset()

    if (thought) router.push('/thoughts')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormControl>
                <Textarea {...field} placeholder="Write your thought..." />
              </FormControl>

              <div className="flex justify-between">
                <div>
                  <FormMessage />
                </div>

                <SubmitButton pending={pending} />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export { ThoughtForm }
