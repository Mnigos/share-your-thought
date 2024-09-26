import { Module } from '@nestjs/common'
import { TRPCModule } from 'nestjs-trpc'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppRouter } from './app.router'

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: '.',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppRouter],
})
export class AppModule {}
