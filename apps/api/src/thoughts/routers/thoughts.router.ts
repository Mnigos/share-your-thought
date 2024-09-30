import { Query, Router } from 'nestjs-trpc'
import { z } from 'zod'

import { thoughtSchema } from '../thought.schema'

import { PrismaService } from '~/config/prisma'

@Router({ alias: 'thoughts' })
export class ThoughtsRouter {
  constructor(private readonly prisma: PrismaService) {}

  @Query({ output: z.array(thoughtSchema) })
  all() {
    return this.prisma.thought.findMany({
      select: {
        id: true,
        content: true,
        author: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}
