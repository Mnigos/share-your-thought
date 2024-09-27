import type { trpc } from '../trpc'

export type User = Awaited<ReturnType<typeof trpc.user.byName.query>>
