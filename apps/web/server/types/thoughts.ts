import type { trpc } from '~/lib/trpc'

export type Thought = Awaited<
  ReturnType<typeof trpc.thoughts.all.query>
>[number]
