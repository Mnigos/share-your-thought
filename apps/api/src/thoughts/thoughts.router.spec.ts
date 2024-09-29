import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { mock } from 'vitest-mock-extended'
import type { z } from 'zod'

import { PrismaService } from '../config/prisma'

import type { thoughtSchema } from './thought.schema'
import { ThoughtsRouter } from './thoughts.router'

describe('ThoughtsRouter', () => {
  let moduleRef: TestingModule
  let thoughtsRouter: ThoughtsRouter
  let prisma: PrismaService

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        ThoughtsRouter,
        {
          provide: PrismaService,
          useValue: {
            thought: {
              findMany: vi.fn(),
            },
          },
        },
      ],
    }).compile()

    thoughtsRouter = moduleRef.get(ThoughtsRouter)
    prisma = moduleRef.get(PrismaService)
  })

  afterAll(async () => {
    await moduleRef.close()
  })

  test('should be defined', () => {
    expect(thoughtsRouter).toBeDefined()
  })

  describe('all', () => {
    test('should return all thoughts', async () => {
      const thoughtMock = mock<z.infer<typeof thoughtSchema>>({
        id: 'id',
        content: 'content',
        author: {
          id: 'authorId',
        },
        createdAt: new Date(),
      })

      const thoughtFindManySpy = vi
        .spyOn(prisma.thought, 'findMany')
        .mockResolvedValue([thoughtMock] as any)

      expect(await thoughtsRouter.all()).toEqual([thoughtMock])

      expect(thoughtFindManySpy).toHaveBeenCalledWith({
        select: {
          id: true,
          content: true,
          author: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    })
  })
})
