import type { trpc } from '~/lib/trpc'

export type User = Awaited<ReturnType<typeof trpc.user.byName.query>>
