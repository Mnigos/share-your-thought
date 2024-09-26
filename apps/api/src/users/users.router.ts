import { Input, Query, Router } from 'nestjs-trpc'

import { PrismaService } from '../config/prisma'

import { createUserSchema, userSchema } from './user.schema'

@Router({ alias: 'users' })
export class UsersRouter {
  constructor(private readonly prisma: PrismaService) {}

  @Query({ input: createUserSchema, output: userSchema })
  async login(@Input('name') name: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        name,
      },
    })

    if (foundUser) return foundUser

    const createdUser = await this.prisma.user.create({
      data: {
        name,
      },
    })

    console.log(createdUser)

    return createdUser
  }
}
