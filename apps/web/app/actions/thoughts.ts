'use server'

import { revalidateTag, unstable_cache } from 'next/cache'

import { trpc } from '../trpc'

import { getCurrentUser } from './users'

export const getThoughts = unstable_cache(() => trpc.thoughts.all.query(), [], {
  tags: ['thoughts'],
  revalidate: 60,
})

export async function createThought(content: string) {
  const { id: authorId } = await getCurrentUser()

  const newThought = await trpc.thought.create.query({
    content,
    authorId,
  })

  revalidateTag('thoughts')

  return newThought
}
