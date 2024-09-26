import { Query, Router } from 'nestjs-trpc'

import { PrismaService } from '../config/prisma'

import { thoughtSchema } from './thought.schema'

@Router({ alias: 'thought' })
export class ThoughtsRouter {
  constructor(private readonly prisma: PrismaService) {}

  @Query({ output: thoughtSchema })
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
