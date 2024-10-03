import { Test, type TestingModule } from '@nestjs/testing'
import type { User } from '@prisma/client'
import { mock } from 'vitest-mock-extended'
import type { MockInstance } from 'vitest'

import { UsersRouter } from './user.router'

import { PrismaService } from '~/config/prisma'

describe('UserRouter', () => {
  const name = 'test'
  const userMock = mock<User>({
    name,
  })

  let moduleReference: TestingModule
  let usersRouter: UsersRouter
  let prisma: PrismaService

  let userFindUniqueSpy: MockInstance

  beforeAll(async () => {
    moduleReference = await Test.createTestingModule({
      providers: [
        UsersRouter,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: vi.fn(),
              findUnique: vi.fn(),
            },
          },
        },
      ],
    }).compile()

    usersRouter = moduleReference.get(UsersRouter)
    prisma = moduleReference.get(PrismaService)

    userFindUniqueSpy = vi.spyOn(prisma.user, 'findUnique')
  })

  afterAll(async () => {
    await moduleReference.close()
  })

  test('should be defined', () => {
    expect(usersRouter).toBeDefined()
  })

  describe('connect', () => {
    let userCreateSpy: MockInstance

    beforeEach(() => {
      userCreateSpy = vi.spyOn(prisma.user, 'create')
    })

    test('should return found user', async () => {
      userFindUniqueSpy.mockResolvedValue(userMock)

      expect(await usersRouter.connect(name)).toEqual(userMock)

      expect(userFindUniqueSpy).toHaveBeenCalledWith({
        where: {
          name,
        },
      })
      expect(userCreateSpy).not.toHaveBeenCalled()
    })

    test('should create account if not found', async () => {
      userFindUniqueSpy.mockResolvedValue(null)
      userCreateSpy.mockResolvedValue(userMock)

      expect(await usersRouter.connect(name)).toEqual(userMock)

      expect(userFindUniqueSpy).toHaveBeenCalledWith({
        where: {
          name,
        },
      })
      expect(userCreateSpy).toHaveBeenCalledWith({
        data: {
          name,
        },
      })
    })
  })

  describe('byName', () => {
    test('should return found user', async () => {
      userFindUniqueSpy.mockResolvedValue(userMock)

      expect(await usersRouter.byName(name)).toEqual(userMock)

      expect(userFindUniqueSpy).toHaveBeenCalledWith({
        where: {
          name,
        },
      })
    })

    test('should throw not found error', async () => {
      userFindUniqueSpy.mockResolvedValue(null)

      await expect(usersRouter.byName(name)).rejects.toThrowError('NOT_FOUND')

      expect(userFindUniqueSpy).toHaveBeenCalledWith({
        where: {
          name,
        },
      })
    })
  })
})
