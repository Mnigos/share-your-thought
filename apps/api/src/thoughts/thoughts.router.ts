import { Query, Router } from 'nestjs-trpc'
import { z } from 'zod'

import { PrismaService } from '../config/prisma'

import { thoughtSchema } from './thought.schema'

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
    })
  }
}
