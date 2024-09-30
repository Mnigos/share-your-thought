import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { mock } from 'vitest-mock-extended'
import type { Thought } from '@prisma/client'
import type { z } from 'zod'
import type { MockInstance } from 'vitest'

import type { thoughtSchema } from '../thought.schema'

import { ThoughtRouter } from './thought.router'

import { PrismaService } from '~/config/prisma'

describe('ThoughtRouter', () => {
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

  let moduleRef: TestingModule
  let thoughtRouter: ThoughtRouter
  let prisma: PrismaService

  let thoughtFindUniqueSpy: MockInstance

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

    thoughtFindUniqueSpy = vi.spyOn(prisma.thought, 'findUnique')
  })

  afterAll(async () => {
    await moduleRef.close()
  })

  test('should be defined', () => {
    expect(thoughtRouter).toBeDefined()
  })

  describe('create', () => {
    test('should create', async () => {
      const thoughtCreateSpy = vi
        .spyOn(prisma.thought, 'create')
        .mockResolvedValue(thoughtMock)
      thoughtFindUniqueSpy.mockResolvedValue(thoughtWithAuthorMock as any)

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
        select: expect.anything(),
      })
    })
  })

  describe('edit', () => {
    test('should edit', async () => {
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
        select: expect.anything(),
      })
    })
  })

  describe('byId', () => {
    test('should return found thought', async () => {
      thoughtFindUniqueSpy.mockResolvedValue(thoughtMock)

      expect(await thoughtRouter.byId(id)).toEqual(thoughtMock)

      expect(thoughtFindUniqueSpy).toHaveBeenCalledWith({
        where: {
          id,
        },
        select: expect.anything(),
      })
    })

    test('should throw not found error', async () => {
      thoughtFindUniqueSpy.mockResolvedValue(null)

      await expect(thoughtRouter.byId(id)).rejects.toThrowError('NOT_FOUND')

      expect(thoughtFindUniqueSpy).toHaveBeenCalledWith({
        where: {
          id,
        },
        select: expect.anything(),
      })
    })
  })
})
