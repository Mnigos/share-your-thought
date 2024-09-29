import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '../../api'

import { env } from './env'

export const trpc = createTRPCReact<AppRouter>({
  links: [
    httpBatchLink({
      url: `${env.API_URL}/trpc`,
    }),
  ],
})

trpc.createClient(trpc)
