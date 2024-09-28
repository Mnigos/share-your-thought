import type { Thought } from '@prisma/client'
import { Input, Query, Router } from 'nestjs-trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import { PrismaService } from '../config/prisma'

import {
  createThoughtSchema,
  editThoughtSchema,
  thoughtSchema,
} from './thought.schema'

@Router({ alias: 'thought' })
export class ThoughtRouter {
  constructor(private readonly prisma: PrismaService) {}

  @Query({ input: createThoughtSchema, output: thoughtSchema })
  async create(
    @Input('content') content: Thought['content'],
    @Input('authorId') authorId: Thought['authorId']
  ) {
    const { id } = await this.prisma.thought.create({
      data: {
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
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

  @Query({
    input: editThoughtSchema,
    output: thoughtSchema,
  })
  edit(
    @Input('content') content: Thought['content'],
    @Input('id') id: Thought['id']
  ) {
    return this.prisma.thought.update({
      where: {
        id,
      },
      data: {
        content,
      },
      select: {
        id: true,
        content: true,
        author: true,
        createdAt: true,
      },
    })
  }

  @Query({ input: z.string(), output: thoughtSchema })
  async byId(@Input() id: string) {
    const foundThought = await this.prisma.thought.findUnique({
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

    if (!foundThought) throw new TRPCError({ code: 'NOT_FOUND' })

    return foundThought
  }
}
