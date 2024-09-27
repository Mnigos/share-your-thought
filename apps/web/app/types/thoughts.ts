import type { trpc } from '../trpc'

export type Thought = Awaited<
  ReturnType<typeof trpc.thoughts.all.query>
>[number]
