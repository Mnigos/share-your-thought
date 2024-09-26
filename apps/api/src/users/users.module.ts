import { Module } from '@nestjs/common'

import { UsersRouter } from './users.router'

@Module({
  providers: [UsersRouter],
})
export class UsersModule {}
