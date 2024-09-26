import { Injectable, type OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { EnvService } from '../env'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly envService: EnvService) {
    const databaseName = envService.get('DATABASE_NAME')
    const databaseUser = envService.get('DATABASE_USERNAME')
    const databasePassword = envService.get('DATABASE_PASSWORD')
    const databaseHost = envService.get('DATABASE_HOST')
    const databasePort = envService.get('DATABASE_PORT')

    super({
      datasources: {
        db: {
          url: `postgresql://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`,
        },
      },
    })
  }

  async onModuleInit() {
    await this.$connect()
  }
}
