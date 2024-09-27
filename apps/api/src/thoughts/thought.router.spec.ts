import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { mock } from 'vitest-mock-extended'
import type { Thought } from '@prisma/client'
import type { z } from 'zod'

import { PrismaService } from '../config/prisma'

import { ThoughtRouter } from './thought.router'
import type { thoughtSchema } from './thought.schema'

describe('ThoughtRouter', () => {
  let moduleRef: TestingModule
  let thoughtRouter: ThoughtRouter
  let prisma: PrismaService

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        ThoughtRouter,
        {
          provide: PrismaService,
          useValue: {
            thought: {
              create: vi.fn(),
              findUnique: vi.fn(),
              update: vi.fn(),
            },
          },
        },
      ],
    }).compile()

    thoughtRouter = moduleRef.get(ThoughtRouter)
    prisma = moduleRef.get(PrismaService)
  })

  afterAll(async () => {
    await moduleRef.close()
  })

  test('should be defined', () => {
    expect(thoughtRouter).toBeDefined()
  })

  describe('create', () => {
    test('should create', async () => {
      const id = 'id'
      const content = 'content'
      const authorId = 'authorId'
      const thoughtMock = mock<Thought>({
        id,
        content,
        authorId,
      })
      const thoughtWithAuthorMock = mock<z.infer<typeof thoughtSchema>>({
        id,
        content: content,
        author: {
          id: authorId,
        },
      })

      const thoughtCreateSpy = vi
        .spyOn(prisma.thought, 'create')
        .mockResolvedValue(thoughtMock)
      const thoughtFindUniqueSpy = vi
        .spyOn(prisma.thought, 'findUnique')
        .mockResolvedValue(thoughtWithAuthorMock as any)

      expect(await thoughtRouter.create(content, authorId)).toEqual(
        thoughtWithAuthorMock
      )

      expect(thoughtCreateSpy).toHaveBeenCalledWith({
        data: {
          content,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      })
      expect(thoughtFindUniqueSpy).toHaveBeenCalledWith({
        where: {
          id,
        },
        select: {
          id: true,
          content: true,
          author: true,
          createdAt: true,
        },
      })
    })
  })

  describe('edit', () => {
    test('should edit', async () => {
      const id = 'id'
      const content = 'content'
      const authorId = 'authorId'

      const thoughtWithAuthorMock = mock<z.infer<typeof thoughtSchema>>({
        id,
        content: content,
        author: {
          id: authorId,
        },
      })

      const thoughtUpdateSpy = vi
        .spyOn(prisma.thought, 'update')
        .mockResolvedValue(thoughtWithAuthorMock as any)

      expect(await thoughtRouter.edit(content, id)).toEqual(
        thoughtWithAuthorMock
      )

      expect(thoughtUpdateSpy).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: {
          content,
        },
        select: {
          id: true,
          content: true,
          author: true,
          createdAt: true,
        },
      })
    })
  })
})
