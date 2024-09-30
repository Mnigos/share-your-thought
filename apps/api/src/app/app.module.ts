import { Module } from '@nestjs/common'
import { TRPCModule } from 'nestjs-trpc'
import { ConfigModule } from '@nestjs/config'

import { EnvModule, envSchema } from '~/config/env'
import { PrismaModule } from '~/config/prisma'
import { UsersModule } from '~/users'
import { ThoughtsModule } from '~/thoughts'

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: '.',
    }),
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    PrismaModule,
    UsersModule,
    ThoughtsModule,
  ],
})
export class AppModule {}
