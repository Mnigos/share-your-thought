import { Module } from '@nestjs/common'

import { ThoughtRouter } from './thought.router'
import { ThoughtsRouter } from './thoughts.router'

@Module({
  providers: [ThoughtsRouter, ThoughtRouter],
})
export class ThoughtsModule {}
