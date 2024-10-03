import { Module } from '@nestjs/common'
import { TRPCModule } from 'nestjs-trpc'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'

import { EnvModule, envSchema } from '~/config/env'
import { PrismaModule } from '~/config/prisma'
import { UsersModule } from '~/users'
import { ThoughtsModule } from '~/thoughts'

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: './@generated',
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
  controllers: [AppController],
})
export class AppModule {}
