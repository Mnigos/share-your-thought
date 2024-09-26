import { Query, Router } from 'nestjs-trpc'
import { z } from 'zod'

@Router({ alias: 'hello' })
export class AppRouter {
  @Query({ output: z.string() })
  getHello() {
    return 'Hello world!'
  }
}
