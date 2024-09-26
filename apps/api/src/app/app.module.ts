import { Module } from '@nestjs/common'
import { TRPCModule } from 'nestjs-trpc'
import { ConfigModule } from '@nestjs/config'

import { EnvModule, envSchema } from '../config/env'

import { AppRouter } from './app.router'

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
  ],
  providers: [AppRouter],
})
export class AppModule {}
