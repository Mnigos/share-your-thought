import { TRPCError } from '@trpc/server'
import { Input, Query, Router } from 'nestjs-trpc'

import { PrismaService } from '../config/prisma'

import { createUserSchema, userSchema } from './user.schema'

@Router({ alias: 'user' })
export class UsersRouter {
  constructor(private readonly prisma: PrismaService) {}

  @Query({ input: createUserSchema, output: userSchema })
  async login(@Input('name') name: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        name,
      },
    })

    if (foundUser) return foundUser

    return this.prisma.user.create({
      data: {
        name,
      },
    })
  }

  @Query({ input: createUserSchema, output: userSchema })
  async byName(@Input('name') name: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        name,
      },
    })

    if (!foundUser) throw new TRPCError({ code: 'NOT_FOUND' })

    return foundUser
  }
}
