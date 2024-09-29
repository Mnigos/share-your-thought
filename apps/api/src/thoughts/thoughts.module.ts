import { Module } from '@nestjs/common'

import { ThoughtRouter } from './routers/thought.router'
import { ThoughtsRouter } from './routers/thoughts.router'

@Module({
  providers: [ThoughtsRouter, ThoughtRouter],
})
export class ThoughtsModule {}
