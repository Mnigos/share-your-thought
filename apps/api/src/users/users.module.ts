import { Module } from '@nestjs/common'

import { UsersRouter } from './user.router'

@Module({
  providers: [UsersRouter],
})
export class UsersModule {}
