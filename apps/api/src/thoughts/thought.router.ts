import type { Thought } from '@prisma/client'
import { Input, Mutation, Router } from 'nestjs-trpc'

import { PrismaService } from '../config/prisma'

import { createThoughtSchema, thoughtSchema } from './thought.schema'

@Router({ alias: 'thought' })
export class ThoughtRouter {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation({ input: createThoughtSchema, output: thoughtSchema })
  async create(
    @Input('content') content: Thought['content'],
    @Input('authorId') authorId: Thought['authorId']
  ) {
    const { id } = await this.prisma.thought.create({
      data: {
        content,
        authorId,
      },
    })

    return this.prisma.thought.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        content: true,
        author: true,
        createdAt: true,
      },
    })
  }
}
